import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Heart, DollarSign, Calendar, Download, LogOut, TrendingUp } from "lucide-react";
import { authService, dbService } from "../../../lib/supabaseServices";
import type { Donation } from "../../../lib/supabase";

export function Dashboard() {
  const navigate = useNavigate();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    total: 0,
    count: 0,
    lastDonation: null as Date | null,
  });

  useEffect(() => {
    const init = async () => {
      await checkUser();
      await loadDonations();
    };
    init();
  }, []);

  const checkUser = async () => {
    try {
      const user = await authService.getUser();
      if (!user) {
        navigate("/auth/login");
        return;
      }
      setUser(user);
    } catch (error) {
      navigate("/auth/login");
    }
  };

  const loadDonations = async () => {
    try {
      const user = await authService.getUser();
      if (!user) return;

      const data = await dbService.getDonorDonations(user.id);
      setDonations(data || []);

      // Calculate stats
      const successful = data?.filter((d) => d.status === "successful") || [];
      const total = successful.reduce((sum, d) => sum + Number(d.amount), 0);
      const lastDonation = successful.length > 0 ? new Date(successful[0].created_at) : null;

      setStats({
        total,
        count: successful.length,
        lastDonation,
      });
    } catch (error) {
      console.error("Error loading donations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await authService.signOut();
    navigate("/");
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
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "successful":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-lg">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <div>
                <span className="font-bold text-xl text-gray-900">Donor Dashboard</span>
                <span className="block text-xs text-gray-600">Adonai Angels Co</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.user_metadata?.full_name || "Donor"}!
          </h1>
          <p className="text-gray-600">
            Thank you for your continued support in transforming lives
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-3 rounded-xl">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Total Donations</h3>
            <p className="text-3xl font-bold text-gray-900">
              {formatCurrency(stats.total, "NGN")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-3 rounded-xl">
                <Heart className="w-6 h-6 text-purple-600" fill="currentColor" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Number of Donations</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.count}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-3 rounded-xl">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Last Donation</h3>
            <p className="text-lg font-bold text-gray-900">
              {stats.lastDonation
                ? stats.lastDonation.toLocaleDateString("en-NG", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "No donations yet"}
            </p>
          </motion.div>
        </div>

        {/* Donation History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Donation History</h2>
          </div>

          {donations.length === 0 ? (
            <div className="p-12 text-center">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No donations yet</p>
              <a
                href="/get-involved"
                className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-shadow"
              >
                Make Your First Donation
              </a>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Reference
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Gateway
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {donations.map((donation, index) => (
                    <tr key={donation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(donation.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                        {donation.reference}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {formatCurrency(Number(donation.amount), donation.currency)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">
                        {donation.gateway}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            donation.status
                          )}`}
                        >
                          {donation.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {donation.status === "successful" && (
                          <button className="text-purple-600 hover:text-purple-700 flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            Receipt
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center text-white"
        >
          <h2 className="text-2xl font-bold mb-4">Continue Making a Difference</h2>
          <p className="text-lg mb-6 opacity-90">
            Your support helps us transform lives and build stronger communities
          </p>
          <a
            href="/get-involved"
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-shadow"
          >
            Donate Again
          </a>
        </motion.div>
      </div>
    </div>
  );
}
