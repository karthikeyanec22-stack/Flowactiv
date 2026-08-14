'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Building2, Users, TrendingUp, BarChart3, Globe2 } from 'lucide-react';

export default function GlobalRecognition() {
  const stats = [
    {
      id: 'projects',
      value: '100+',
      title: 'Projects',
      icon: Building2,
      position: 'top-left',
    },
    {
      id: 'clients',
      value: '50+',
      title: 'Happy Clients',
      icon: Users,
      position: 'top-right',
    },
    {
      id: 'experience',
      value: '8+',
      title: 'Years Experience',
      icon: TrendingUp,
      position: 'bottom-left',
    },
    {
      id: 'industries',
      value: '20+',
      title: 'Industries Served',
      icon: BarChart3,
      position: 'bottom-right',
    },
  ];

  return (
    <section
      id="recognition"
      className="scroll-mt-16 sm:scroll-mt-20 pt-10 sm:pt-14 pb-16 sm:pb-24 relative w-full bg-[#f8fafc] dark:bg-[#181a20] text-slate-950 dark:text-white transition-colors duration-500 overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Background Ambient Light Beams */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-blue-400/15 via-cyan-400/10 to-transparent dark:from-white/10 dark:via-cyan-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-400/15 via-blue-500/10 to-transparent dark:from-blue-600/15 dark:via-cyan-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">

        {/* TOP SECTION HEADER (BADGE & TITLE) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-6 sm:mb-8 relative z-20 flex flex-col items-center"
        >
          <span className="text-[13px] sm:text-sm font-black tracking-widest uppercase text-cyan-600 dark:text-cyan-400 mb-3 block">
            GLOBAL RECOGNITION
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 dark:text-white leading-tight">
            Globally Trusted Digital Partner
          </h2>
        </motion.div>

        {/* 3D GLOBE ORBIT STAGE WITH FLOATING STAT CARDS */}
        <div className="relative w-full max-w-4xl h-[380px] sm:h-[460px] lg:h-[500px] flex items-center justify-center my-2">

          {/* Natural 3D Perspective Glowing Orbit Plates around Globe */}
          {/* 1. Primary Orbit Ring Plate */}
          <div
            className="absolute w-[360px] sm:w-[580px] lg:w-[660px] h-[360px] sm:h-[580px] lg:h-[660px] pointer-events-none z-[5]"
            style={{
              transform: 'perspective(1000px) rotateX(74deg) rotateZ(-15deg)',
            }}
          >
            <div className="w-full h-full rounded-full border-2 border-cyan-500/40 dark:border-cyan-400/50 shadow-[0_0_35px_rgba(6,182,212,0.35)] relative flex items-center justify-center">
              {/* Ring Soft Ambient Glow */}
              <div className="absolute inset-0 rounded-full border border-cyan-400/30 blur-sm pointer-events-none" />
            </div>
          </div>

          {/* 2. Secondary Outer Orbit Ring Plate */}
          <div
            className="absolute w-[420px] sm:w-[660px] lg:w-[760px] h-[420px] sm:h-[660px] lg:h-[760px] pointer-events-none z-[4]"
            style={{
              transform: 'perspective(1000px) rotateX(70deg) rotateZ(20deg)',
            }}
          >
            <div className="w-full h-full rounded-full border border-dashed border-cyan-500/40 dark:border-cyan-300/40 relative flex items-center justify-center" />
          </div>

          {/* 3D Glowing Globe Centerpiece Image Wrapper */}
          <motion.div
            animate={{
              y: [-10, 10, -10],
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative w-56 h-56 sm:w-80 sm:h-80 lg:w-[340px] lg:h-[340px] rounded-full z-10 group cursor-pointer"
          >
            {/* Glowing Outer Ring Accent */}
            <div className="absolute -inset-1 rounded-full border-2 border-cyan-500/60 dark:border-cyan-400/60 shadow-[0_0_50px_rgba(6,182,212,0.5)] z-20 pointer-events-none" />

            {/* Glowing Backdrop Aura */}
            <div className="absolute inset-0 rounded-full bg-cyan-400/20 dark:bg-cyan-400/25 blur-2xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />

            {/* Perfect Circular Mask Container */}
            <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl flex items-center justify-center bg-slate-900 dark:bg-[#071328]">
              <Image
                src="/images/global.png"
                alt="Global Digital Network Globe"
                fill
                className="object-cover scale-110 transition-transform duration-700 group-hover:scale-115 relative z-10"
                priority
              />
            </div>
          </motion.div>

          {/* FLOATING 3D STAT CARDS (CLONED 1:1 FROM USER'S REFERENCE SCREENSHOT) */}

          {/* 1. TOP LEFT CARD: 100+ Projects Delivered */}
          <motion.div
            initial={{ opacity: 0, x: -50, y: -30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            animate={{
              y: [-8, 8, -8],
              rotate: [-3, -1, -3],
            }}
            transition={{
              initial: { duration: 0.8 },
              animate: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
            }}
            whileHover={{ scale: 1.08, zIndex: 40 }}
            className="absolute left-1 sm:left-4 lg:left-8 top-2 sm:top-6 lg:top-8 z-20 bg-white dark:bg-[#0c122d] text-slate-950 dark:text-white border-2 border-slate-200/90 dark:border-cyan-500/40 rounded-2xl p-4 sm:p-5 shadow-[0_15px_35px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.35)] flex flex-col justify-between w-52 sm:w-64 lg:w-72 cursor-pointer transform -rotate-3 overflow-hidden group"
          >
            {/* Top-Left Glowing Corner Aura */}
            <div className="absolute top-0 left-0 w-12 h-12 bg-cyan-400/20 rounded-tl-2xl blur-md pointer-events-none group-hover:scale-150 transition-transform duration-500" />

            <div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-none mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                100+
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-800 dark:text-slate-100 mb-2">
                Projects Delivered
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                Successfully Completed Diverse Digital Solutions For Modern Businesses.
              </p>
            </div>
          </motion.div>

          {/* 2. TOP RIGHT CARD: 50+ Happy Clients */}
          <motion.div
            initial={{ opacity: 0, x: 50, y: -30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            animate={{
              y: [8, -8, 8],
              rotate: [3, 1, 3],
            }}
            transition={{
              initial: { duration: 0.8 },
              animate: { duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 },
            }}
            whileHover={{ scale: 1.08, zIndex: 40 }}
            className="absolute right-1 sm:right-4 lg:right-8 top-2 sm:top-6 lg:top-8 z-20 bg-white dark:bg-[#0c122d] text-slate-950 dark:text-white border-2 border-slate-200/90 dark:border-cyan-500/40 rounded-2xl p-4 sm:p-5 shadow-[0_15px_35px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.35)] flex flex-col justify-between w-52 sm:w-64 lg:w-72 cursor-pointer transform rotate-3 overflow-hidden group"
          >
            {/* Top-Left Glowing Corner Aura */}
            <div className="absolute top-0 left-0 w-12 h-12 bg-cyan-400/20 rounded-tl-2xl blur-md pointer-events-none group-hover:scale-150 transition-transform duration-500" />

            <div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-none mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                50+
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-800 dark:text-slate-100 mb-2">
                Happy Clients
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                Trusted By Companies Worldwide For Reliable Development Services.
              </p>
            </div>
          </motion.div>

          {/* 3. BOTTOM LEFT CARD: 20+ Industries Served */}
          <motion.div
            initial={{ opacity: 0, x: -50, y: 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            animate={{
              y: [6, -6, 6],
              rotate: [2, 0, 2],
            }}
            transition={{
              initial: { duration: 0.8 },
              animate: { duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 },
            }}
            whileHover={{ scale: 1.08, zIndex: 40 }}
            className="absolute left-1 sm:left-6 lg:left-12 bottom-2 sm:bottom-6 lg:bottom-8 z-20 bg-white dark:bg-[#0c122d] text-slate-950 dark:text-white border-2 border-slate-200/90 dark:border-cyan-500/40 rounded-2xl p-4 sm:p-5 shadow-[0_15px_35px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.35)] flex flex-col justify-between w-52 sm:w-64 lg:w-72 cursor-pointer transform rotate-2 overflow-hidden group"
          >
            {/* Top-Left Glowing Corner Aura */}
            <div className="absolute top-0 left-0 w-12 h-12 bg-cyan-400/20 rounded-tl-2xl blur-md pointer-events-none group-hover:scale-150 transition-transform duration-500" />

            <div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-none mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                20+
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-800 dark:text-slate-100 mb-2">
                Industries Served
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                Providing Tailored Solutions Across Multiple Business Sectors.
              </p>
            </div>
          </motion.div>

          {/* 4. BOTTOM RIGHT CARD: 8+ Years Experience */}
          <motion.div
            initial={{ opacity: 0, x: 50, y: 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            animate={{
              y: [-6, 6, -6],
              rotate: [-2, 0, -2],
            }}
            transition={{
              initial: { duration: 0.8 },
              animate: { duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 },
            }}
            whileHover={{ scale: 1.08, zIndex: 40 }}
            className="absolute right-1 sm:right-6 lg:right-12 bottom-2 sm:bottom-6 lg:bottom-8 z-20 bg-white dark:bg-[#0c122d] text-slate-950 dark:text-white border-2 border-slate-200/90 dark:border-cyan-500/40 rounded-2xl p-4 sm:p-5 shadow-[0_15px_35px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.35)] flex flex-col justify-between w-52 sm:w-64 lg:w-72 cursor-pointer transform -rotate-2 overflow-hidden group"
          >
            {/* Top-Left Glowing Corner Aura */}
            <div className="absolute top-0 left-0 w-12 h-12 bg-cyan-400/20 rounded-tl-2xl blur-md pointer-events-none group-hover:scale-150 transition-transform duration-500" />

            <div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-none mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                8+
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-800 dark:text-slate-100 mb-2">
                Years Experience
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                Extensive Experience Delivering Innovative Digital Products.
              </p>
            </div>
          </motion.div>

        </div>

        {/* BOTTOM CONTENT AREA (CLONED 1:1 FROM REFERENCE IMAGE) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center max-w-3xl mx-auto mt-4 sm:mt-6"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-snug mb-4">
            Numbers That Reflect <span className="text-slate-950 dark:text-white font-black underline decoration-slate-950 dark:decoration-white decoration-4 underline-offset-4">Our Commitment</span> To Delivering Reliable Digital Solutions Worldwide.
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto">
            We Build Scalable Digital Products And Intelligent Systems For Businesses Across The Globe. Our Team Focuses On Delivering High-Performance Applications, Modern User Experiences, And Reliable Technology Solutions That Help Companies Grow Faster And Operate Smarter.
          </p>
        </motion.div>

      </div>
    </section>
  );
}