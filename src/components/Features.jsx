'use client';

import { motion } from 'framer-motion';

export default function Features() {
  return (
    <section className="relative w-full min-h-[400px] sm:min-h-[520px] bg-[#f8fafc] dark:bg-[#090b14] flex items-center justify-center overflow-hidden py-24 transition-colors duration-500">
      
      {/* ============================================================== */}
      {/* 1. THICK CHEVRON BAND INFINITE DOWNWARD MOTION (VIDEO MATCH)   */}
      {/* ============================================================== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{ y: [0, 240] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -top-60 left-0 w-full h-[160%] flex flex-col justify-around pointer-events-none"
        >
          <svg
            viewBox="0 0 1200 1200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            {[...Array(10)].map((_, i) => (
              <path
                key={i}
                d={`M -100 ${i * 240 - 100} L 600 ${i * 240 + 100} L 1300 ${i * 240 - 100} L 1300 ${i * 240 + 20} L 600 ${i * 240 + 220} L -100 ${i * 240 + 20} Z`}
                className="fill-slate-300/40 dark:fill-[#171a29]"
              />
            ))}
          </svg>
        </motion.div>
      </div>

      {/* Central Radial Mask Overlay for Soft Edge Fading */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#f8fafc_90%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_30%,#090b14_90%)] pointer-events-none z-0" />

      {/* Center Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-cyan-400/20 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none z-0" />

      {/* ============================================================== */}
      {/* 2. MAIN CONTENT TEXT                                          */}
      {/* ============================================================== */}
      <div className="relative z-10 px-6 text-center max-w-5xl mx-auto flex items-center justify-center">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-tight drop-shadow-md">
          Creating The Next Generation Of Digital Products
        </h2>
      </div>

    </section>
  );
}