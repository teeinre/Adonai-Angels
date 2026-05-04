import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import { motion } from "motion/react";
import { CheckCircle, Download, Share2, Heart, Home, ArrowRight } from "lucide-react";
import { supabase, type Donation } from "../../lib/supabase";
import { verifyFlutterwavePayment, verifyPaystackPayment } from "../../lib/paymentService";

export function ThankYou() {
  const [searchParams] = useSearchParams();
  const [donation, setDonation] = useState<Donation | null>(null);
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    verifyPayment();
  }, []);

  const verifyPayment = async () => {
    try {
      // Get payment reference from URL
      const reference = searchParams.get("reference") || searchParams.get("tx_ref");
      const transactionId = searchParams.get("transaction_id");
      const status = searchParams.get("status");

      if (!reference) {
        setLoading(false);
        return;
      }

      // Fetch donation
      const { data: donationData } = await supabase
        .from("donations")
        .select("*")
        .eq("reference", reference)
        .single();

      if (donationData) {
        setDonation(donationData);

        // Verify payment if not already verified
        if (donationData.status === "pending") {
          let isVerified = false;

          if (donationData.gateway === "flutterwave" && transactionId) {
            isVerified = await verifyFlutterwavePayment(transactionId);
          } else if (donationData.gateway === "paystack") {
            isVerified = await verifyPaystackPayment(reference);
          }

          if (isVerified) {
            setVerified(true);
            // Refresh donation data
            const { data: updated } = await supabase
              .from("donations")
              .select("*")
              .eq("reference", reference)
              .single();
            if (updated) setDonation(updated);
          }
        } else if (donationData.status === "successful") {
          setVerified(true);
        }
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: currency || "NGN",
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const shareOnSocial = (platform: string) => {
    const text = `I just donated ${formatCurrency(
      Number(donation?.amount),
      donation?.currency || "NGN"
    )} to Adonai Angels Co! Join me in making a difference.`;
    const url = window.location.origin;

    const shareUrls: { [key: string]: string } = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (!donation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Transaction Found</h1>
          <p className="text-gray-600 mb-8">
            We couldn't find your donation transaction. Please contact support if you've been charged.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-shadow"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const isSuccessful = donation.status === "successful";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Success Header */}
          <div className={`p-8 text-center ${isSuccessful ? "bg-gradient-to-r from-green-500 to-emerald-500" : "bg-gradient-to-r from-yellow-500 to-orange-500"} text-white`}>
            {isSuccessful ? (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <CheckCircle className="w-24 h-24 mx-auto mb-4" />
                </motion.div>
                <h1 className="text-4xl font-bold mb-2">Thank You!</h1>
                <p className="text-xl opacity-90">Your donation was successful</p>
              </>
            ) : (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </motion.div>
                <h1 className="text-4xl font-bold mb-2">Payment Pending</h1>
                <p className="text-xl opacity-90">We're still processing your payment</p>
              </>
            )}
          </div>

          {/* Donation Details */}
          <div className="p-8">
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Donation Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-bold text-gray-900">
                    {formatCurrency(Number(donation.amount), donation.currency)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reference:</span>
                  <span className="font-mono text-sm text-gray-900">{donation.reference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="text-gray-900 capitalize">{donation.gateway}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="text-gray-900">{formatDate(donation.created_at)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      isSuccessful
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {donation.status}
                  </span>
                </div>
              </div>
            </div>

            {isSuccessful && (
              <>
                {/* Impact Message */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 mb-8">
                  <div className="flex items-start gap-4">
                    <Heart className="w-12 h-12 text-purple-600 flex-shrink-0" fill="currentColor" />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Your Impact</h3>
                      <p className="text-gray-700">
                        Your generous donation of{" "}
                        <span className="font-bold">
                          {formatCurrency(Number(donation.amount), donation.currency)}
                        </span>{" "}
                        will help us continue our mission of transforming lives and building stronger
                        communities across Nigeria. Thank you for being a part of the change!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    Download Receipt
                  </button>
                  <button
                    onClick={() => shareOnSocial("twitter")}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                    Share on Social
                  </button>
                </div>
              </>
            )}

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
              <Link
                to="/donor/dashboard"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
              >
                View Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-gray-600">
          <p className="mb-2">
            A receipt has been sent to your email address.
          </p>
          <p className="text-sm">
            Need help? Contact us at{" "}
            <a href="mailto:info@adonaiangels.org" className="text-purple-600 hover:underline">
              info@adonaiangels.org
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
