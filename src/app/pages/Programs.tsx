import { motion } from "motion/react";
import { GraduationCap, Heart, Droplet, Users, Briefcase, Sprout } from "lucide-react";

export function Programs() {
  const programs = [
    {
      icon: GraduationCap,
      title: "Education Initiative",
      description: "Providing quality education and learning materials to underprivileged children across Nigeria.",
      image: "https://images.unsplash.com/photo-1666281269793-da06484657e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBhZnJpY2FuJTIwc2Nob29sfGVufDF8fHx8MTc3MzI0MDgxN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      details: [
        "School construction and renovation",
        "Scholarship programs for talented students",
        "Teacher training and support",
        "Learning materials and textbook distribution",
        "After-school tutoring programs",
      ],
      impact: "15,000+ students educated",
      color: "from-blue-600 to-cyan-600",
    },
    {
      icon: Heart,
      title: "Healthcare Access",
      description: "Ensuring communities have access to quality healthcare services and medical supplies.",
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwbWVkaWNhbCUyMGFmcmljYXxlbnwxfHx8fDE3NzMyNDA4MTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      details: [
        "Mobile medical clinics in rural areas",
        "Free health screenings and vaccinations",
        "Maternal and child health programs",
        "Health education and awareness campaigns",
        "Emergency medical assistance",
      ],
      impact: "30,000+ patients treated",
      color: "from-red-600 to-pink-600",
    },
    {
      icon: Droplet,
      title: "Clean Water Project",
      description: "Building wells and water infrastructure to provide clean, safe drinking water.",
      image: "https://images.unsplash.com/photo-1561476287-3cea3b9d4e79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMHdhdGVyJTIwYWZyaWNhfGVufDF8fHx8MTc3MzI0MDgxOHww&ixlib=rb-4.1.0&q=80&w=1080",
      details: [
        "Borehole drilling and maintenance",
        "Water purification systems installation",
        "Community water management training",
        "Rainwater harvesting systems",
        "Hygiene and sanitation education",
      ],
      impact: "25,000+ people with clean water access",
      color: "from-cyan-600 to-blue-600",
    },
    {
      icon: Users,
      title: "Women Empowerment",
      description: "Empowering women through skills training, microfinance, and entrepreneurship programs.",
      image: "https://images.unsplash.com/photo-1610626295085-aa8d6ae8daec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwd29tZW4lMjBlbXBvd2VybWVudHxlbnwxfHx8fDE3NzMyNDA4MTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      details: [
        "Vocational skills training programs",
        "Microfinance and small business loans",
        "Business development workshops",
        "Mentorship and networking opportunities",
        "Leadership development training",
      ],
      impact: "5,000+ women empowered",
      color: "from-purple-600 to-pink-600",
    },
    {
      icon: Briefcase,
      title: "Youth Development",
      description: "Equipping young people with skills and opportunities for a brighter future.",
      image: "https://images.unsplash.com/photo-1770842655322-bcfd1c4be229?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGFmcmljYW4lMjBjaGlsZHJlbiUyMGNvbW11bml0eXxlbnwxfHx8fDE3NzMyNDA4MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      details: [
        "Digital literacy and tech training",
        "Apprenticeship placement programs",
        "Career counseling and guidance",
        "Sports and recreational activities",
        "Life skills and personal development",
      ],
      impact: "8,000+ youth trained",
      color: "from-orange-600 to-red-600",
    },
    {
      icon: Sprout,
      title: "Agricultural Support",
      description: "Supporting farmers with modern techniques and resources for sustainable farming.",
      image: "https://images.unsplash.com/photo-1721929178169-4eb6f456e93d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBkZXZlbG9wbWVudCUyMG5pZ2VyaWF8ZW58MXx8fHwxNzczMjQwODE4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      details: [
        "Modern farming techniques training",
        "Seeds and equipment distribution",
        "Market access and linkage programs",
        "Cooperative formation and support",
        "Climate-smart agriculture education",
      ],
      impact: "3,000+ farmers supported",
      color: "from-green-600 to-emerald-600",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1661335910769-793adfc7870e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdlcmlhbiUyMHZvbHVudGVlcnMlMjBoZWxwaW5nfGVufDF8fHx8MTc3MzI0MDgxN3ww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Our programs"
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Programs</h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Comprehensive initiatives designed to create lasting impact in communities
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {programs.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <div className="relative h-[400px] rounded-2xl overflow-hidden group">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${program.color} opacity-40`} />
                  </div>
                </div>

                <div className={index % 2 === 1 ? "md:order-1" : ""}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${program.color} rounded-2xl mb-6`}>
                    <program.icon className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{program.title}</h2>
                  <p className="text-lg text-gray-600 mb-6">{program.description}</p>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">What We Do:</h3>
                    <ul className="space-y-2">
                      {program.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${program.color} mt-2 flex-shrink-0`} />
                          <span className="text-gray-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={`inline-block bg-gradient-to-r ${program.color} text-white px-6 py-3 rounded-full font-semibold`}>
                    {program.impact}
                  </div>
                </div>
              </motion.div>
            ))}
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
              Want to Support Our Programs?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Your contribution helps us expand our reach and impact more lives.
            </p>
            <a
              href="/get-involved"
              className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-shadow"
            >
              Get Involved Today
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
