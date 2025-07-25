import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FluidLoader from './FluidLoader';  // Adjust path if needed

const LoaderWrapper = ({ children }) => {
  const [loading, setLoading] = useState(true);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.5 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <FluidLoader onComplete={() => setLoading(false)} />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {children}  
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoaderWrapper;
