import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Settings, Key, Save, Eye, EyeOff } from "lucide-react";
import { supabase } from "../../../lib/supabase";

interface PaymentConfig {
  gateway: string;
  public_key: string;
  secret_key: string;
  is_active: boolean;
  test_mode: boolean;
}

export function AdminPanel() {
  const [paymentConfigs, setPaymentConfigs] = useState<PaymentConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showSecrets, setShowSecrets] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    loadConfigs();
  }, []);

  const loadConfigs = async () => {
    try {
      const { data, error } = await supabase
        .from("payment_config")
        .select("*")
        .order("gateway");

      if (error) throw error;
      setPaymentConfigs(data || []);
    } catch (error) {
      console.error("Error loading configs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfigChange = (gateway: string, field: string, value: any) => {
    setPaymentConfigs(
      paymentConfigs.map((config) =>
        config.gateway === gateway ? { ...config, [field]: value } : config
      )
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      // Update each payment config
      for (const config of paymentConfigs) {
        const { error } = await supabase
          .from("payment_config")
          .update({
            public_key: config.public_key,
            secret_key: config.secret_key,
            is_active: config.is_active,
            test_mode: config.test_mode,
          })
          .eq("gateway", config.gateway);

        if (error) throw error;
      }

      setMessage({ type: "success", text: "Configuration saved successfully!" });
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Failed to save configuration" });
    } finally {
      setSaving(false);
    }
  };

  const toggleSecretVisibility = (gateway: string) => {
    setShowSecrets({
      ...showSecrets,
      [gateway]: !showSecrets[gateway],
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading configuration...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-3 rounded-xl">
              <Settings className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-gray-600">Manage payment gateways and site configuration</p>
            </div>
          </div>
        </motion.div>

        {/* Messages */}
        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-red-50 border border-red-200 text-red-700"
            }`}
          >
            {message.text}
          </motion.div>
        )}

        {/* Payment Gateway Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Key className="w-6 h-6 text-purple-600" />
            Payment Gateway Configuration
          </h2>

          <div className="space-y-8">
            {paymentConfigs.map((config) => (
              <div key={config.gateway} className="border-b border-gray-200 pb-8 last:border-0">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 capitalize">
                    {config.gateway}
                  </h3>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.test_mode}
                        onChange={(e) =>
                          handleConfigChange(config.gateway, "test_mode", e.target.checked)
                        }
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">Test Mode</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.is_active}
                        onChange={(e) =>
                          handleConfigChange(config.gateway, "is_active", e.target.checked)
                        }
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm font-semibold text-gray-900">Active</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Public Key
                    </label>
                    <input
                      type="text"
                      value={config.public_key}
                      onChange={(e) =>
                        handleConfigChange(config.gateway, "public_key", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none font-mono text-sm"
                      placeholder={
                        config.gateway === "flutterwave"
                          ? "FLWPUBK-xxxxx"
                          : "pk_test_xxxxx or pk_live_xxxxx"
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Secret Key
                    </label>
                    <div className="relative">
                      <input
                        type={showSecrets[config.gateway] ? "text" : "password"}
                        value={config.secret_key}
                        onChange={(e) =>
                          handleConfigChange(config.gateway, "secret_key", e.target.value)
                        }
                        className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none font-mono text-sm"
                        placeholder={
                          config.gateway === "flutterwave"
                            ? "FLWSECK-xxxxx"
                            : "sk_test_xxxxx or sk_live_xxxxx"
                        }
                      />
                      <button
                        type="button"
                        onClick={() => toggleSecretVisibility(config.gateway)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showSecrets[config.gateway] ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-red-600 mt-1">
                      ⚠️ Keep this secret! Never share or commit to version control.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Configuration
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-blue-50 border border-blue-200 rounded-xl p-6"
        >
          <h3 className="font-bold text-blue-900 mb-3">📝 Instructions</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>
              • <strong>Paystack:</strong> Get your keys from{" "}
              <a
                href="https://dashboard.paystack.com/#/settings/developers"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Paystack Dashboard → Settings → API Keys
              </a>
            </li>
            <li>
              • <strong>Flutterwave:</strong> Get your keys from{" "}
              <a
                href="https://dashboard.flutterwave.com/settings/apis"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Flutterwave Dashboard → Settings → API
              </a>
            </li>
            <li>• Use <strong>Test Mode</strong> for development and <strong>Live Mode</strong> for production</li>
            <li>• Enable the gateway by checking the <strong>Active</strong> checkbox</li>
            <li>• Always save after making changes</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
