import { Link } from "react-router";
import { Heart, Users, GraduationCap, Droplet, TrendingUp, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export function Home() {
  const stats = [
    { icon: Users, label: "Lives Impacted", value: "50,000+" },
    { icon: GraduationCap, label: "Students Educated", value: "15,000+" },
    { icon: Droplet, label: "Clean Water Access", value: "25,000+" },
    { icon: Heart, label: "Volunteers", value: "500+" },
  ];

  const programs = [
    {
      title: "Education Initiative",
      description: "Providing quality education and learning materials to underprivileged children across Nigeria.",
      image: "https://images.unsplash.com/photo-1666281269793-da06484657e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBhZnJpY2FuJTIwc2Nob29sfGVufDF8fHx8MTc3MzI0MDgxN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Healthcare Access",
      description: "Ensuring communities have access to quality healthcare services and medical supplies.",
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwbWVkaWNhbCUyMGFmcmljYXxlbnwxfHx8fDE3NzMyNDA4MTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-red-500 to-pink-500",
    },
    {
      title: "Clean Water Project",
      description: "Building wells and water infrastructure to provide clean, safe drinking water.",
      image: "https://images.unsplash.com/photo-1561476287-3cea3b9d4e79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMHdhdGVyJTIwYWZyaWNhfGVufDF8fHx8MTc3MzI0MDgxOHww&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "Women Empowerment",
      description: "Empowering women through skills training, microfinance, and entrepreneurship programs.",
      image: "https://images.unsplash.com/photo-1610626295085-aa8d6ae8daec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwd29tZW4lMjBlbXBvd2VybWVudHxlbnwxfHx8fDE3NzMyNDA4MTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1770842655322-bcfd1c4be229?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGFmcmljYW4lMjBjaGlsZHJlbiUyMGNvbW11bml0eXxlbnwxfHx8fDE3NzMyNDA4MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Happy children"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Transforming Lives,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Building Hope
              </span>
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Join us in our mission to create sustainable change in Nigerian communities through education, healthcare, and empowerment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/donate"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-shadow inline-flex items-center justify-center gap-2"
              >
                Get Involved
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/programs"
                className="bg-white/10 backdrop-blur-md text-white border-2 border-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-colors inline-flex items-center justify-center"
              >
                Our Programs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Adonai Angels Co is dedicated to transforming lives and building sustainable communities across Nigeria. We believe that every individual deserves access to quality education, healthcare, and opportunities for growth.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Through collaborative partnerships and community-driven initiatives, we work tirelessly to create lasting positive change that empowers individuals and strengthens communities.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:gap-3 transition-all"
              >
                Learn More About Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1661335910769-793adfc7870e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdlcmlhbiUyMHZvbHVudGVlcnMlMjBoZWxwaW5nfGVufDF8fHx8MTc3MzI0MDgxN3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Volunteers helping"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-xl shadow-xl">
                <TrendingUp className="w-8 h-8 mb-2" />
                <div className="text-2xl font-bold">12+</div>
                <div className="text-sm">Years of Impact</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Programs</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We run comprehensive programs designed to address the most pressing needs in our communities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative h-64 rounded-xl overflow-hidden mb-4">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${program.color} opacity-60`} />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{program.title}</h3>
                  </div>
                </div>
                <p className="text-gray-600">{program.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-shadow"
            >
              View All Programs
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Together, We Can Make a Difference
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Your support helps us continue our mission of transforming lives and building stronger communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/donate"
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-shadow inline-flex items-center justify-center"
              >
                Donate Now
              </Link>
              <Link
                to="/contact"
                className="bg-white/10 backdrop-blur-md border-2 border-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-colors inline-flex items-center justify-center"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
