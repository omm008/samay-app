import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import MainRoutes from '../routes/MainRoutes';  // Adjust path if needed

const AnimatedContent = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <MainRoutes />
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedContent;
