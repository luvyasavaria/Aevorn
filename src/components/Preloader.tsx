import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000); // exactly 4 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            filter: "blur(20px)",
            scale: 1.05,
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-[99999] bg-[#080a0c] flex flex-col items-center justify-center pointer-events-auto"
        >
          {/* Main loader design container */}
          <div className="flex flex-col items-center justify-center">
            {/* Hand tap-speed animated container */}
            <div className="hand-loader mb-12">
              <div className="finger-loader"></div>
              <div className="finger-loader"></div>
              <div className="finger-loader"></div>
              <div className="finger-loader"></div>
              <div className="palm-loader"></div>
              <div className="thumb-loader"></div>
            </div>

            {/* Subtle cinematic label to complement the Aevorn brand */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-xs uppercase tracking-[0.3em] font-mono text-[#f5f5f5]"
            >
              Aligning with stillness...
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
