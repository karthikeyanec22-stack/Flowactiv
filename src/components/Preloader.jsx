'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide preloader after intro animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const brandText = 'FLOWACTIV';
  const letters = brandText.split('');

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            transition: { duration: 0.75, ease: [0.25, 1, 0.5, 1] },
          }}
          className="fixed inset-0 z-[9999] bg-[#02050e] flex flex-col items-center justify-center overflow-hidden pointer-events-none select-none px-4"
        >
          {/* Cyan/Purple Radial Ambient Glow */}
          <motion.div
            animate={{
              scale: [0.9, 1.3, 0.9],
              opacity: [0.3, 0.65, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-[500px] sm:w-[600px] h-[500px] sm:h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.25)_0%,rgba(147,51,234,0.15)_50%,transparent_80%)] blur-3xl pointer-events-none"
          />

          {/* Glowing Animated Typography "FLOWACTIV" */}
          <div className="relative z-10 flex items-center justify-center gap-0.5 sm:gap-1.5 lg:gap-2 max-w-full overflow-hidden">
            {letters.map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 35, filter: 'blur(12px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.85,
                  delay: index * 0.07,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                className="text-[9.5vw] sm:text-7xl lg:text-9xl font-black tracking-tight sm:tracking-tighter bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(6,182,212,0.6)] shrink-0"
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Glowing Animated Dotted Loading Below FLOWACTIV */}
          <div className="flex items-center justify-center gap-2.5 mt-6 sm:mt-8 relative z-10">
            {[0, 1, 2, 3].map((dotIdx) => (
              <motion.div
                key={dotIdx}
                animate={{
                  scale: [0.8, 1.4, 0.8],
                  opacity: [0.3, 1, 0.3],
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: dotIdx * 0.18,
                  ease: 'easeInOut',
                }}
                className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_15px_#06b6d4]"
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
