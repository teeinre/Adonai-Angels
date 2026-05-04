import { motion } from "motion/react";
import { Heart, Users, Handshake, DollarSign, Calendar, Gift } from "lucide-react";
import { Link } from "react-router";

export function GetInvolved() {
  const ways = [
    {
      icon: DollarSign,
      title: "Make a Donation",
      description: "Your financial contribution helps us expand our programs and reach more communities in need.",
      color: "from-green-600 to-emerald-600",
      actions: [
        "One-time donation",
        "Monthly recurring support",
        "Sponsor a child's education",
        "Fund a water project",
      ],
    },
    {
      icon: Users,
      title: "Volunteer Your Time",
      description: "Join our team of dedicated volunteers and make a direct impact in communities.",
      color: "from-blue-600 to-cyan-600",
      actions: [
        "Field work in communities",
        "Skills-based volunteering",
        "Event organization",
        "Mentorship programs",
      ],
    },
    {
      icon: Handshake,
      title: "Partner With Us",
      description: "Collaborate with us as a corporate partner or organization to amplify our impact.",
      color: "from-purple-600 to-pink-600",
      actions: [
        "Corporate social responsibility",
        "Sponsorship opportunities",
        "In-kind donations",
        "Technical partnerships",
      ],
    },
    {
      icon: Gift,
      title: "Fundraise for Us",
      description: "Organize a fundraising event or campaign to support our mission.",
      color: "from-orange-600 to-red-600",
      actions: [
        "Birthday fundraisers",
        "Community events",
        "Social media campaigns",
        "Workplace giving",
      ],
    },
  ];

  const donationLevels = [
    {
      amount: "₦10,000",
      title: "Hope Builder",
      description: "Provides school supplies for 5 children",
      benefits: ["Impact report", "Thank you certificate"],
    },
    {
      amount: "₦50,000",
      title: "Change Maker",
      description: "Supports healthcare services for a community",
      benefits: ["Quarterly updates", "Recognition on website", "Impact report"],
      featured: true,
    },
    {
      amount: "₦100,000",
      title: "Life Transformer",
      description: "Funds a clean water project",
      benefits: ["Personal project updates", "Site visit opportunity", "Recognition plaque"],
    },
    {
      amount: "Custom",
      title: "Partner",
      description: "Create a custom partnership package",
      benefits: ["Tailored engagement", "Strategic collaboration", "Maximum impact"],
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1661335910769-793adfc7870e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdlcmlhbiUyMHZvbHVudGVlcnMlMjBoZWxwaW5nfGVufDF8fHx8MTc3MzI0MDgxN3ww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Get involved"
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get Involved</h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Join us in our mission to transform lives and build stronger communities
            </p>
          </motion.div>
        </div>
      </section>

      {/* Ways to Help */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ways to Help</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              There are many ways you can support our mission and make a difference
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {ways.map((way, index) => (
              <motion.div
                key={way.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${way.color} rounded-2xl mb-6`}>
                  <way.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{way.title}</h3>
                <p className="text-gray-600 mb-6">{way.description}</p>
                <ul className="space-y-2 mb-6">
                  {way.actions.map((action, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${way.color}`} />
                      {action}
                    </li>
                  ))}
                </ul>
                <Link
                  to={way.title === "Make a Donation" ? "/donate" : "/contact"}
                  className={`w-full bg-gradient-to-r ${way.color} text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow block text-center`}
                >
                  {way.title === "Make a Donation" ? "Donate Now" : "Learn More"}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Levels */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Donation Levels</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose a giving level that works for you - every contribution makes a difference
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {donationLevels.map((level, index) => (
              <motion.div
                key={level.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-2xl p-6 ${
                  level.featured
                    ? "ring-2 ring-purple-600 shadow-xl scale-105"
                    : "border border-gray-200 hover:shadow-lg"
                } transition-all`}
              >
                {level.featured && (
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
                    MOST POPULAR
                  </div>
                )}
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
                  {level.amount}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{level.title}</h3>
                <p className="text-gray-600 mb-6">{level.description}</p>
                <ul className="space-y-2 mb-6">
                  {level.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <Heart className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/donate"
                  className={`w-full py-3 rounded-lg font-semibold transition-all block text-center ${
                    level.featured
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  Donate Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Application */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 md:p-12"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Become a Volunteer</h2>
              <p className="text-lg text-gray-600">
                Fill out our volunteer application and join our team of change-makers
              </p>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
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
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                    placeholder="+234 800 000 0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    State *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                  >
                    <option value="">Select your state</option>
                    <option>Lagos</option>
                    <option>Abuja</option>
                    <option>Kano</option>
                    <option>Rivers</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Area of Interest *
                </label>
                <select
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                >
                  <option value="">Select a program</option>
                  <option>Education</option>
                  <option>Healthcare</option>
                  <option>Clean Water</option>
                  <option>Women Empowerment</option>
                  <option>Youth Development</option>
                  <option>General Support</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Why do you want to volunteer? *
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none resize-none"
                  placeholder="Tell us about your motivation and any relevant skills or experience..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-semibold hover:shadow-xl transition-shadow"
              >
                Submit Application
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Corporate Partnership */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Handshake className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Corporate Partnership Opportunities
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Partner with us to create meaningful corporate social responsibility programs that make a real difference.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-shadow"
            >
              Discuss Partnership
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
