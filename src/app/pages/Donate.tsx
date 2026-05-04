import { useState } from "react";
import { motion } from "motion/react";
import { DollarSign, CreditCard, Heart, Loader2 } from "lucide-react";
import {
  initializeFlutterwavePayment,
  initializePaystackPayment,
  type DonationData,
} from "../../lib/paymentService";

export function Donate() {
  const [formData, setFormData] = useState<DonationData>({
    amount: 0,
    currency: "NGN",
    email: "",
    name: "",
    phone: "",
    gateway: "paystack",
  });
  const [customAmount, setCustomAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const presetAmounts = [5000, 10000, 25000, 50000, 100000, 250000];

  const handlePresetAmount = (amount: number) => {
    setFormData({ ...formData, amount });
    setCustomAmount("");
  };

  const handleCustomAmount = (value: string) => {
    setCustomAmount(value);
    const amount = parseFloat(value);
    if (!isNaN(amount)) {
      setFormData({ ...formData, amount });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (formData.amount < 100) {
        throw new Error("Minimum donation amount is ₦100");
      }

      let result;
      if (formData.gateway === "flutterwave") {
        result = await initializeFlutterwavePayment(formData);
      } else {
        result = await initializePaystackPayment(formData);
      }

      if (result.success && result.authorizationUrl) {
        // Redirect to payment page
        window.location.href = result.authorizationUrl;
      } else {
        throw new Error(result.error || "Failed to initialize payment");
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1770842655322-bcfd1c4be229?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGFmcmljYW4lMjBjaGlsZHJlbiUyMGNvbW11bml0eXxlbnwxfHx8fDE3NzMyNDA4MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Make a donation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-pink-900/80" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Make a Donation</h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Your support transforms lives and builds stronger communities
            </p>
          </motion.div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Amount Selection */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Amount</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {presetAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handlePresetAmount(amount)}
                      className={`p-4 rounded-xl border-2 font-semibold transition-all ${
                        formData.amount === amount && !customAmount
                          ? "border-purple-600 bg-purple-50 text-purple-600"
                          : "border-gray-300 hover:border-purple-300"
                      }`}
                    >
                      {formatCurrency(amount)}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={(e) => handleCustomAmount(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">Minimum amount: ₦100</p>
              </div>

              {/* Payment Gateway */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Payment Method *
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, gateway: "paystack" })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.gateway === "paystack"
                        ? "border-purple-600 bg-purple-50"
                        : "border-gray-300 hover:border-purple-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-6 h-6 text-purple-600" />
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">Paystack</div>
                        <div className="text-xs text-gray-600">Card, Bank, USSD</div>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, gateway: "flutterwave" })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.gateway === "flutterwave"
                        ? "border-purple-600 bg-purple-50"
                        : "border-gray-300 hover:border-purple-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-6 h-6 text-purple-600" />
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">Flutterwave</div>
                        <div className="text-xs text-gray-600">Card, Bank, Mobile Money</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Personal Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                      placeholder="+234 800 000 0000"
                    />
                  </div>
                </div>
              </div>

              {/* Summary */}
              {formData.amount > 0 && (
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <Heart className="w-8 h-8 text-purple-600 flex-shrink-0" fill="currentColor" />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-2">Donation Summary</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">You're donating:</span>
                        <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                          {formatCurrency(formData.amount)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || formData.amount < 100}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-semibold hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5" fill="currentColor" />
                    Complete Donation
                  </>
                )}
              </button>
            </form>

            {/* Security Note */}
            <div className="mt-6 text-center text-sm text-gray-600">
              <p>🔒 Your payment is secure and encrypted</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
