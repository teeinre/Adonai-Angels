import { motion } from "motion/react";
import { Quote, TrendingUp, Award } from "lucide-react";

export function Impact() {
  const stories = [
    {
      name: "Aisha Mohammed",
      location: "Kano State",
      story: "Thanks to Adonai Angels' scholarship program, I was able to complete my secondary education and I'm now studying Medicine at the university. They didn't just give me money - they gave me hope and a future.",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop",
      program: "Education Initiative",
    },
    {
      name: "Emeka Okonkwo",
      location: "Enugu State",
      story: "The clean water project transformed our village. Before, we walked 5km daily for water. Now we have clean water right in our community. Our children are healthier and have more time for school.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      program: "Clean Water Project",
    },
    {
      name: "Blessing Adeyemi",
      location: "Lagos State",
      story: "The women empowerment program taught me tailoring and business skills. I now run my own fashion business and employ three other women. I'm proud to support my family and give back to my community.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
      program: "Women Empowerment",
    },
    {
      name: "David Eze",
      location: "Abuja",
      story: "After completing the youth tech training program, I got a job as a web developer. This program changed my life trajectory completely. I went from unemployment to supporting my entire family.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      program: "Youth Development",
    },
  ];

  const achievements = [
    {
      year: "2014",
      title: "Foundation Established",
      description: "Adonai Angels Co was founded with a mission to transform lives",
    },
    {
      year: "2016",
      title: "First School Built",
      description: "Constructed our first school serving 500 students in rural Lagos",
    },
    {
      year: "2018",
      title: "Healthcare Initiative Launched",
      description: "Introduced mobile medical clinics reaching 10,000+ patients annually",
    },
    {
      year: "2020",
      title: "Clean Water Milestone",
      description: "Provided clean water access to 25,000 people across 50 communities",
    },
    {
      year: "2022",
      title: "Women Empowerment Expansion",
      description: "Empowered 3,000 women through microfinance and training programs",
    },
    {
      year: "2026",
      title: "50,000 Lives Impacted",
      description: "Reached our milestone of transforming 50,000+ lives across Nigeria",
    },
  ];

  const metrics = [
    { value: "50,000+", label: "Lives Transformed", change: "+15% this year" },
    { value: "15,000+", label: "Students Educated", change: "+20% this year" },
    { value: "25,000+", label: "Clean Water Access", change: "+25% this year" },
    { value: "100+", label: "Communities Served", change: "+10 new communities" },
    { value: "500+", label: "Active Volunteers", change: "+100 this year" },
    { value: "₦2.5B", label: "Programs Investment", change: "+30% this year" },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1770842655322-bcfd1c4be229?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGFmcmljYW4lMjBjaGlsZHJlbiUyMGNvbW11bml0eXxlbnwxfHx8fDE3NzMyNDA4MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Our impact"
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Impact</h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Real stories, real change - transforming lives across Nigeria
            </p>
          </motion.div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Impact by Numbers</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Measurable results that demonstrate our commitment to creating lasting change
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
                  {metric.value}
                </div>
                <div className="text-gray-900 font-semibold mb-2">{metric.label}</div>
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  {metric.change}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from the people whose lives have been transformed by our programs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {stories.map((story, index) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl relative"
              >
                <Quote className="absolute top-4 right-4 w-12 h-12 text-purple-200" />
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">{story.name}</h3>
                    <p className="text-sm text-gray-600">{story.location}</p>
                    <span className="inline-block mt-1 text-xs bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full">
                      {story.program}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">{story.story}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Major milestones in our mission to transform lives
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-600 to-pink-600" />

            <div className="space-y-12">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg inline-block max-w-md">
                      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
                        {achievement.year}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{achievement.title}</h3>
                      <p className="text-gray-600">{achievement.description}</p>
                    </div>
                  </div>

                  <div className="hidden md:flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex-shrink-0 z-10">
                    <Award className="w-8 h-8 text-white" />
                  </div>

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
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
              Be Part of Our Impact Story
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join us in creating more success stories and transforming more lives.
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
