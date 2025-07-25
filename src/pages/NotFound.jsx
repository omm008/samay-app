import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-red-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl">♟️</div>
        <div className="absolute top-20 right-20 text-4xl">🎤</div>
        <div className="absolute bottom-20 left-20 text-5xl">♜</div>
        <div className="absolute bottom-10 right-10 text-3xl">😂</div>
        <div className="absolute top-1/2 left-1/4 text-7xl">♛</div>
        <div className="absolute top-1/3 right-1/3 text-4xl">🎭</div>
      </div>

      <div className="text-center z-10 px-4 max-w-4xl mx-auto">
        {/* Animated Chess Board */}
        <ChessboardAnimation />
        
        {/* Error Message */}
        <ErrorMessage />
        
        {/* Navigation Buttons */}
        <NavigationButtons />
      </div>
    </div>
  )
}

// Chess Board Animation Component
const ChessboardAnimation = () => {
  const squares = Array.from({ length: 64 }, (_, i) => i);
  
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 1, type: "spring", stiffness: 100 }}
      className="mb-8 mx-auto w-64 h-64 relative"
    >
      <div className="grid grid-cols-8 gap-0 w-full h-full rounded-2xl overflow-hidden border-4 border-yellow-400 shadow-2xl">
        {squares.map((square, index) => {
          const row = Math.floor(index / 8);
          const col = index % 8;
          const isLight = (row + col) % 2 === 0;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.01, duration: 0.3 }}
              className={`w-8 h-8 flex items-center justify-center text-lg ${
                isLight ? 'bg-yellow-100' : 'bg-red-800'
              }`}
            >
              {/* Add some chess pieces */}
              {index === 0 && '♜'}
              {index === 7 && '♜'}
              {index === 56 && '♖'}
              {index === 63 && '♖'}
              {index === 27 && '♛'}
              {index === 36 && '♔'}
            </motion.div>
          );
        })}
      </div>
      
      {/* Floating "404" */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute -top-8 -right-8 bg-red-600 text-white px-4 py-2 rounded-full font-bold text-2xl shadow-lg"
      >
        404
      </motion.div>
    </motion.div>
  );
};

// Error Message Component
const ErrorMessage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="mb-12"
    >
      <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 font-custom">
        <span className="text-red-400">Check</span>
        <span className="text-yellow-400">mate!</span>
      </h1>
      
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-red-700/30 mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          Oops! This page got captured! 
        </h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          Looks like you've wandered into uncharted territory. Even Samay's chess skills 
          can't help you here! The page you're looking for seems to have made an illegal move.
        </p>
      </div>

      {/* Samay's Quote */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="bg-gradient-to-r from-red-600/20 to-yellow-400/20 backdrop-blur-sm rounded-2xl p-6 border border-yellow-400/30"
      >
        <p className="text-yellow-300 text-xl italic mb-2">
          "In chess, as in comedy, timing is everything. Looks like this page's timing was off!"
        </p>
        <p className="text-gray-400">- Samay Raina</p>
      </motion.div>
    </motion.div>
  );
};

// Navigation Buttons Component
const NavigationButtons = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.6 }}
      className="flex flex-wrap justify-center gap-4"
    >
      <Link to="/">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        >
          <span>🏠</span>
          Back to Home
        </motion.button>
      </Link>
      
      <Link to="/about">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        >
          <span>🎭</span>
          About Samay
        </motion.button>
      </Link>
      
      <Link to="/products">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        >
          <span>🛍️</span>
          Shop Merch
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default NotFound
