import { supabase } from './supabase';

export interface DonationData {
  amount: number;
  currency: string;
  email: string;
  name: string;
  phone?: string;
  gateway: 'flutterwave' | 'paystack';
}

export interface PaymentResponse {
  success: boolean;
  reference: string;
  authorizationUrl?: string;
  error?: string;
}

// Generate unique reference
export function generateReference(): string {
  return `DON-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

// Initialize Flutterwave payment
export async function initializeFlutterwavePayment(
  data: DonationData
): Promise<PaymentResponse> {
  try {
    // Get payment config
    const { data: config } = await supabase
      .from('payment_config')
      .select('public_key, is_active')
      .eq('gateway', 'flutterwave')
      .single();

    if (!config || !config.is_active) {
      throw new Error('Flutterwave payment gateway is not configured');
    }

    const reference = generateReference();

    // Create donation record
    await supabase.from('donations').insert({
      amount: data.amount,
      currency: data.currency,
      gateway: 'flutterwave',
      status: 'pending',
      reference,
      metadata: {
        email: data.email,
        name: data.name,
        phone: data.phone,
      },
    });

    // Initialize Flutterwave payment
    const response = await fetch('https://api.flutterwave.com/v3/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.public_key}`,
      },
      body: JSON.stringify({
        tx_ref: reference,
        amount: data.amount,
        currency: data.currency,
        redirect_url: `${window.location.origin}/thank-you`,
        customer: {
          email: data.email,
          name: data.name,
          phonenumber: data.phone,
        },
        customizations: {
          title: 'Adonai Angels Co',
          description: 'Donation to Adonai Angels Co',
          logo: 'https://your-logo-url.com/logo.png',
        },
      }),
    });

    const result = await response.json();

    if (result.status === 'success') {
      return {
        success: true,
        reference,
        authorizationUrl: result.data.link,
      };
    }

    throw new Error(result.message || 'Payment initialization failed');
  } catch (error: any) {
    console.error('Flutterwave error:', error);
    return {
      success: false,
      reference: '',
      error: error.message,
    };
  }
}

// Initialize Paystack payment
export async function initializePaystackPayment(
  data: DonationData
): Promise<PaymentResponse> {
  try {
    // Get payment config
    const { data: config } = await supabase
      .from('payment_config')
      .select('public_key, is_active')
      .eq('gateway', 'paystack')
      .single();

    if (!config || !config.is_active) {
      throw new Error('Paystack payment gateway is not configured');
    }

    const reference = generateReference();

    // Create donation record
    await supabase.from('donations').insert({
      amount: data.amount,
      currency: data.currency,
      gateway: 'paystack',
      status: 'pending',
      reference,
      metadata: {
        email: data.email,
        name: data.name,
        phone: data.phone,
      },
    });

    // Initialize Paystack payment
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.public_key}`,
      },
      body: JSON.stringify({
        email: data.email,
        amount: data.amount * 100, // Paystack uses kobo (smallest currency unit)
        currency: data.currency,
        reference,
        callback_url: `${window.location.origin}/thank-you`,
        metadata: {
          custom_fields: [
            {
              display_name: 'Donor Name',
              variable_name: 'donor_name',
              value: data.name,
            },
            {
              display_name: 'Phone Number',
              variable_name: 'phone',
              value: data.phone || 'N/A',
            },
          ],
        },
      }),
    });

    const result = await response.json();

    if (result.status) {
      return {
        success: true,
        reference,
        authorizationUrl: result.data.authorization_url,
      };
    }

    throw new Error(result.message || 'Payment initialization failed');
  } catch (error: any) {
    console.error('Paystack error:', error);
    return {
      success: false,
      reference: '',
      error: error.message,
    };
  }
}

// Verify Flutterwave payment
export async function verifyFlutterwavePayment(transactionId: string): Promise<boolean> {
  try {
    const { data: config } = await supabase
      .from('payment_config')
      .select('secret_key')
      .eq('gateway', 'flutterwave')
      .single();

    const response = await fetch(
      `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
      {
        headers: {
          Authorization: `Bearer ${config?.secret_key}`,
        },
      }
    );

    const result = await response.json();

    if (result.status === 'success' && result.data.status === 'successful') {
      // Update donation record
      await supabase
        .from('donations')
        .update({
          status: 'successful',
          transaction_id: transactionId,
        })
        .eq('reference', result.data.tx_ref);

      return true;
    }

    return false;
  } catch (error) {
    console.error('Verification error:', error);
    return false;
  }
}

// Verify Paystack payment
export async function verifyPaystackPayment(reference: string): Promise<boolean> {
  try {
    const { data: config } = await supabase
      .from('payment_config')
      .select('secret_key')
      .eq('gateway', 'paystack')
      .single();

    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${config?.secret_key}`,
        },
      }
    );

    const result = await response.json();

    if (result.status && result.data.status === 'success') {
      // Update donation record
      await supabase
        .from('donations')
        .update({
          status: 'successful',
          transaction_id: result.data.id.toString(),
        })
        .eq('reference', reference);

      return true;
    }

    return false;
  } catch (error) {
    console.error('Verification error:', error);
    return false;
  }
}
