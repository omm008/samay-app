import React from 'react'
import { motion } from 'framer-motion'
import HeroSection from '../components/HeroSection'
import { useApp } from '../contexts/AppContext'

const About = () => {
  const { name } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-900 to-black">
      <HeroSection />
      
      {/* Biography Section */}
      <BiographySection />
      
      {/* Career Highlights */}
      <CareerHighlights />
      
      {/* Achievements Timeline */}
      <AchievementsTimeline />
      
      {/* Personal Interests */}
      <PersonalInterests />
    </div>
  )
}

// Biography Section Component
const BiographySection = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold text-white mb-6 font-custom">
            The Man Behind the <span className="text-red-400">Laughter</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-yellow-400 mx-auto mb-8"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-red-700/30">
              <h3 className="text-2xl font-bold text-red-400 mb-4">Early Life</h3>
              <p className="text-gray-200 leading-relaxed">
                Born on October 5, 1997, in Jammu, India, Samay Raina grew up with a passion for both 
                intellectual pursuits and making people laugh. His journey from a chemical engineering 
                student to India's most beloved chess-comedy creator is nothing short of extraordinary.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-red-700/30">
              <h3 className="text-2xl font-bold text-red-400 mb-4">The Turning Point</h3>
              <p className="text-gray-200 leading-relaxed">
                What started as casual chess streams during college transformed into a revolutionary 
                approach to content creation. Samay discovered his unique ability to blend strategic 
                gameplay with spontaneous humor, creating a new genre of entertainment.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 bg-gradient-to-br from-red-600 to-black p-8 rounded-3xl border-4 border-yellow-400">
              <img 
                src="./src/assets/images/samay.png" 
                alt="Samay Raina" 
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-black px-4 py-2 rounded-full font-bold text-sm">
                Chess Grandmaster of Comedy
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-yellow-400/20 rounded-3xl blur-xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Career Highlights Component
const CareerHighlights = () => {
  const highlights = [
    {
      year: "2019",
      title: "Comedy Debut",
      description: "Started stand-up comedy while pursuing engineering",
      icon: "🎤"
    },
    {
      year: "2020",
      title: "Chess Streaming Pioneer",
      description: "Began streaming chess with comedy commentary",
      icon: "♟️"
    },
    {
      year: "2021",
      title: "Viral Sensation",
      description: "Chess streams gained millions of views",
      icon: "🚀"
    },
    {
      year: "2022",
      title: "Celebrity Collaborations",
      description: "Played chess with Bollywood stars and cricketers",
      icon: "⭐"
    },
    {
      year: "2023",
      title: "YouTube Milestone",
      description: "Crossed 1 million subscribers",
      icon: "🏆"
    },
    {
      year: "2024",
      title: "Comedy Specials",
      description: "Released multiple successful comedy specials",
      icon: "🎭"
    }
  ];

  return (
    <section className="py-16 px-4 bg-black/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold text-white mb-6 font-custom">
            Career <span className="text-yellow-400">Highlights</span>
          </h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            From engineering student to entertainment icon - a journey of passion, creativity, and checkmates
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-red-900/50 to-black/50 backdrop-blur-sm rounded-2xl p-6 border border-red-700/30 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105"
            >
              <div className="text-4xl mb-4">{highlight.icon}</div>
              <div className="text-yellow-400 font-bold text-lg mb-2">{highlight.year}</div>
              <h3 className="text-white font-bold text-xl mb-3">{highlight.title}</h3>
              <p className="text-gray-300">{highlight.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Achievements Timeline Component
const AchievementsTimeline = () => {
  const achievements = [
    {
      title: "Collaboration with Viswanathan Anand",
      description: "Historic chess match with the legendary grandmaster",
      date: "2021"
    },
    {
      title: "Celebrity Chess Tournament",
      description: "Organized India's biggest celebrity chess tournament",
      date: "2022"
    },
    {
      title: "Comedy Special Success",
      description: "Multiple sold-out shows across major Indian cities",
      date: "2023"
    },
    {
      title: "Digital Creator Award",
      description: "Recognized as India's top gaming content creator",
      date: "2024"
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold text-white mb-6 font-custom">
            Major <span className="text-red-400">Achievements</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-600 to-yellow-400"></div>

          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                <div className="bg-gradient-to-br from-red-900/80 to-black/80 backdrop-blur-sm rounded-2xl p-6 border border-red-700/30">
                  <div className="text-yellow-400 font-bold text-sm mb-2">{achievement.date}</div>
                  <h3 className="text-white font-bold text-xl mb-3">{achievement.title}</h3>
                  <p className="text-gray-300">{achievement.description}</p>
                </div>
              </div>
              
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-yellow-400 rounded-full border-4 border-red-600 z-10"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Personal Interests Component
const PersonalInterests = () => {
  const interests = [
    {
      title: "Chess Strategy",
      description: "Passionate about chess theory and innovative gameplay",
      icon: "♟️",
      color: "from-blue-600 to-blue-800"
    },
    {
      title: "Stand-up Comedy",
      description: "Crafting jokes and perfecting comedic timing",
      icon: "🎤",
      color: "from-yellow-600 to-orange-600"
    },
    {
      title: "Content Creation",
      description: "Always exploring new formats and creative ideas",
      icon: "🎬",
      color: "from-purple-600 to-pink-600"
    },
    {
      title: "Gaming Culture",
      description: "Promoting chess and gaming in Indian youth",
      icon: "🎮",
      color: "from-green-600 to-teal-600"
    }
  ];

  return (
    <section className="py-16 px-4 bg-black/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold text-white mb-6 font-custom">
            Personal <span className="text-yellow-400">Interests</span>
          </h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            Beyond the camera and stage, discover what drives Samay's creativity and passion
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {interests.map((interest, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className={`bg-gradient-to-br ${interest.color} p-8 rounded-3xl text-center transform group-hover:scale-105 transition-all duration-300 shadow-2xl`}>
                <div className="text-6xl mb-4">{interest.icon}</div>
                <h3 className="text-white font-bold text-xl mb-3">{interest.title}</h3>
                <p className="text-white/80 text-sm">{interest.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-red-600 to-yellow-400 p-8 rounded-3xl max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-black mb-4">
              Join the Chess Comedy Revolution!
            </h3>
            <p className="text-black/80 text-lg mb-6">
              Follow Samay's journey and be part of India's most entertaining chess community
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors">
                Subscribe to YouTube
              </button>
              <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
                Follow on Instagram
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
