import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import PocketChess from '../components/PocketChess';
import FeaturedVideos from '../components/FeaturedVideos';
import FloatingChessboard from '../components/FloatingChessboard';
import PatternBackground from '../components/PatternBackground';

const Home = () => {
  // Get scroll progress (0 at top, 1 at bottom)
  const { scrollYProgress } = useScroll()
  const x = useTransform(scrollYProgress, [0,0.3], [-100, 0])
  const x2 = useTransform(scrollYProgress, [0,0.3], [100, 0])

  return (
    <>
      {/* Top section with PatternBackground */}
      <div className="relative overflow-hidden " style={{ minHeight: "120vh" }}>
      <PatternBackground />
        
          <div className="relative z-10  text-5xl flex flex-col items-center justify-center h-screen">
            {/* Animated "SAMAY RAINA" name synced with scroll position */}
            <motion.div
              id="naam"
              className="absolute z-0 text-[11rem] flex flex-row"
            >
              <motion.span
                className="text-white font-custom"
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: -20, opacity: 1 }}
                transition={{ type: "spring", stiffness: 60, damping: 12, delay: 1 }}
              >
                SAMAY&nbsp;
              </motion.span>
              <motion.span
                className="text-white font-custom"
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 20, opacity: 1 }}
                transition={{ type: "spring", stiffness: 60, damping: 12, delay: 1 }}
              >
                RAINA
              </motion.span>
            </motion.div>

            {/* Centered Samay image */}
            <img className='relative z-1 translate-y-28  w-[28rem]' src="./src/assets/images/samay.png" alt="" />

            <section className="py-16 translate-y-28  mb-10">
              <div className="max-w-4xl font-custom mx-auto px-4">
                <motion.h2
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl font-bold mb-8 text-center"
                >
                  <span className='px-4  py-2 border-4 text-red-600 bg-black  border-white '>
                    Comedy, Chess, Chaos
                  </span>
                </motion.h2>
              </div>
            </section>
          </div>
          <div className=" p-10 mt-10 bg-black">
          {/* About Samay Raina - Birth and Background */}
          <section className="relative bg-gradient-to-b from-red-700 via-red-900 to-black p-6 min-h-[28rem] flex left-[15%] items-center justify-center w-[70%] rounded-3xl shadow-lg shadow-gray-900 overflow-hidden select-none">
            {/* Glass BG Overlay + Animation Particles (optional for extra flair) */}
            <div className="absolute inset-0 bg-white/5  backdrop-blur-sm z-0" />

            <div className="relative z-10 flex flex-col  md:flex-row items-center gap-10 w-full max-w-5xl px-4 py-8">
              {/* Left Card: Title & Accent */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, type: "spring" }}
                className="flex-1 hover:shadow-md shadow-red-400 flex flex-col items-center md:items-start justify-center py-8 px-6 md:px-10 bg-white/10 rounded-2xl border-4 border-red-700 hover:bg-red-700/80 hover:border-white transition-all duration-300"
              >
                <h2 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-400 to-red-700 tracking-wide">
                  About <span className="text-black drop-shadow-lg">Samay Raina</span>
                </h2>
                <div className="w-16 h-1 rounded bg-gradient-to-r from-red-600 to-white mb-4" />
                <p className="hidden md:block text-lg text-gray-200 mt-2">
                  Stand-Up | Streaming | Chess
                </p>
              </motion.div>

              {/* Right Card: Bio */}
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, type: "spring" }}
                className="flex-1 hover:shadow-md shadow-red-400 bg-white/10 rounded-2xl border-4 border-gray-100  px-6 md:px-10 py-8 flex flex-col justify-center hover:bg-black/70 transition-all duration-300 h-full"
              >
                <div className="text-lg md:text-xl text-gray-100 leading-relaxed">
                  <span className="font-semibold text-red-400">Samay Raina</span> (born <span className="font-semibold">October 5, 1997</span> in Jammu, India) is a multi-talented <span className="text-red-300 font-semibold">stand-up comedian</span>, <span className="text-yellow-200 font-semibold">YouTuber</span>, and <span className="text-red-400 font-semibold">chess promoter</span>.
                  <br /><br />
                  After completing his degree in chemical engineering, Samay gained nationwide popularity by blending comedy with chess on digital platforms—collaborating with legends like <span className="text-yellow-300 font-semibold">Vishwanathan Anand</span> and inspiring a new wave of content creators.
                </div>
                {/* Subtle underline accent */}
                <div className="w-14 h-1 mt-6 bg-gradient-to-r from-gray-100 to-red-700 opacity-60 rounded" />
              </motion.div>
            </div>
          </section>
        </div>
      </div>
      {/* Now, below this, place FeaturedVideos and the rest */}
      <FeaturedVideos />


      <div className='flex relative flex-row gap-2 bg-linear-to-b from-red-600 to-black h-[50rem]'>
        <div className="w-full">
          <PocketChess />
        </div>
        
      </div>

      {/* Testimonials */}
      <section className="py-16 text-black">
  <div className="max-w-4xl mx-auto px-4">
    <motion.h2
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-4xl font-bold mb-8 text-center"
    >
      What People Say
    </motion.h2>
    <div className="space-y-8">
      <motion.blockquote
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="italic text-lg"
      >
        "Samay is a genius at blending comedy and chess. Hilarious!" - Vishwanathan Anand
      </motion.blockquote>
      <motion.blockquote
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="italic text-lg"
      >
        "His streams are addictive. Best mix of humor and strategy." - Fan Testimonial
      </motion.blockquote>
      <motion.blockquote
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="italic text-lg"
      >
        "Samay's energy is unmatched. Inspiring comedian!" - Virat Kohli (paraphrased from known interactions)
      </motion.blockquote>
    </div>
    {/* Integrated Chessboard with animation */}
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="mt-8 flex justify-center"
    >
      
    </motion.div>
  </div>
</section>



      {/* Social Links */}
      <section className="py-16  text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-8"
          >
            Connect with Samay
          </motion.h2>
          <div className="flex justify-center space-x-8">
            <motion.a
              href="https://www.youtube.com/@samayraina"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl hover:text-yellow-400"
            >
              YouTube
            </motion.a>
            <motion.a
              href="https://www.instagram.com/samayraina_"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl hover:text-yellow-400"
            >
              Instagram
            </motion.a>
            <motion.a
              href="https://twitter.com/ReheSamay"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-2xl hover:text-yellow-400"
            >
              Twitter
            </motion.a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home
