'use client';

import { useState, useEffect } from 'react';
import { Code2, Smartphone, Palette, Cloud, Cpu, Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { scrollToContact } from '@/utils/scrollToContact';

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const services = [
    {
      icon: Code2,
      title: 'Web Application Development',
      description: 'High-performance, scalable web applications built using Next.js, React, and modern full-stack architectures.',
      glow: 'from-blue-500/25 to-indigo-500/25',
      iconColor: 'text-blue-500 dark:text-blue-400',
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'Cross-platform iOS & Android mobile solutions delivering seamless performance, offline capabilities, and native feel.',
      glow: 'from-cyan-500/25 to-blue-500/25',
      iconColor: 'text-cyan-500 dark:text-cyan-400',
    },
    {
      icon: Palette,
      title: 'UI/UX & Product Design',
      description: 'User-centered digital experiences, wireframing, high-fidelity prototypes, and cohesive design systems.',
      glow: 'from-purple-500/25 to-pink-500/25',
      iconColor: 'text-purple-500 dark:text-purple-400',
    },
    {
      icon: Cloud,
      title: 'Cloud Infrastructure & DevOps',
      description: 'Reliable cloud deployments, CI/CD pipelines, containerization (Docker/Kubernetes), and serverless architecture.',
      glow: 'from-emerald-500/25 to-teal-500/25',
      iconColor: 'text-emerald-500 dark:text-emerald-400',
    },
    {
      icon: Cpu,
      title: 'AI & Workflow Automation',
      description: 'Integrating intelligent AI models, automated workflows, predictive analytics, and custom API integrations.',
      glow: 'from-amber-500/25 to-orange-500/25',
      iconColor: 'text-amber-500 dark:text-amber-400',
    },
    {
      icon: Sparkles,
      title: 'Custom Enterprise Software',
      description: 'Tailor-made software systems designed to streamline internal operations, enhance security, and scale rapidly.',
      glow: 'from-indigo-500/25 to-purple-500/25',
      iconColor: 'text-indigo-500 dark:text-indigo-400',
    },
  ];

  const totalCards = services.length;

  // Auto-scroll interval for desktop & mobile (0.5s move speed, 2s show time, zero blink)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalCards);
      setActiveMobileIdx((prev) => (prev + 1) % totalCards);
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused, totalCards]);

  const handlePrevMobile = () => {
    setActiveMobileIdx((prev) => (prev === 0 ? totalCards - 1 : prev - 1));
  };

  const handleNextMobile = () => {
    setActiveMobileIdx((prev) => (prev + 1) % totalCards);
  };

  return (
    <section
      id="services"
      className="scroll-mt-16 sm:scroll-mt-20 pt-4 sm:pt-10 pb-8 sm:pb-20 relative w-full bg-[#f4f6fa] dark:bg-[#02050e] text-slate-900 dark:text-white overflow-hidden transition-colors duration-500"
    >
      {/* ============================================================== */}
      {/* THICK CHEVRON BAND INFINITE DOWNWARD MOTION (MATCHES FEATURES) */}
      {/* ============================================================== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{ y: [0, 240] }}
          transition={{
            duration: 6,
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
            {[...Array(12)].map((_, i) => (
              <path
                key={i}
                d={`M -100 ${i * 240 - 100} L 600 ${i * 240 + 100} L 1300 ${i * 240 - 100} L 1300 ${i * 240 + 20} L 600 ${i * 240 + 220} L -100 ${i * 240 + 20} Z`}
                className="fill-slate-300/40 dark:fill-[#0e1326]"
              />
            ))}
          </svg>
        </motion.div>
      </div>

      {/* Central Radial Mask Overlay for Soft Edge Fading */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#f4f6fa_85%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_20%,#02050e_85%)] pointer-events-none z-0" />

      {/* AMBIENT BACKGROUND GLOW ORBS */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.25, 0.55, 0.25],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 -left-32 w-[550px] h-[550px] bg-gradient-to-tr from-cyan-500/20 via-blue-500/15 to-transparent rounded-full blur-[130px] pointer-events-none z-0"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.25, 0.55, 0.25],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-10 -right-32 w-[550px] h-[550px] bg-gradient-to-tl from-purple-500/20 via-indigo-500/15 to-transparent rounded-full blur-[130px] pointer-events-none z-0"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '200px 0px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-6 sm:mb-16"
        >
          <span className="text-[13px] sm:text-sm font-black tracking-widest uppercase text-cyan-600 dark:text-cyan-400 mb-3 block">
            OUR SERVICES
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 dark:text-white max-w-3xl mx-auto leading-tight mb-4">
            Services We Provide To Accelerate Your Business
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            From concept to execution, we deliver end-to-end digital engineering services tailored to modern performance standards.
          </p>
        </motion.div>

        {/* ============================================================== */}
        {/* MOBILE SLIDER (ULTRA-SMOOTH CONTINUOUS HORIZONTAL TRACK)        */}
        {/* ============================================================== */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="w-full md:hidden flex flex-col items-center justify-center py-2 relative z-10"
        >
          {/* Horizontal Track Viewport Window */}
          <div className="relative w-full max-w-[340px] h-[315px] mx-auto overflow-hidden">
            <motion.div
              className="flex w-full h-full"
              animate={{ x: `-${activeMobileIdx * 100}%` }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            >
              {services.map((service, idx) => {
                const Icon = service.icon;

                return (
                  <div
                    key={idx}
                    className="w-full h-full shrink-0 flex items-center justify-center p-2 select-none"
                  >
                    <div className="relative w-[320px] h-[300px] overflow-visible group">
                      {/* Speech Bubble SVG Frame & Clip Defs */}
                      <svg
                        viewBox="0 0 320 300"
                        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-0"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <clipPath id={`mobileServiceClip-${idx}`}>
                            <path d="M 24 4 H 296 A 22 22 0 0 1 316 26 V 238 A 22 22 0 0 1 296 260 H 90 L 35 295 L 35 260 H 24 A 22 22 0 0 1 4 238 V 26 A 22 22 0 0 1 24 4 Z" />
                          </clipPath>
                        </defs>
                        <path
                          d="M 24 4 H 296 A 22 22 0 0 1 316 26 V 238 A 22 22 0 0 1 296 260 H 90 L 35 295 L 35 260 H 24 A 22 22 0 0 1 4 238 V 26 A 22 22 0 0 1 24 4 Z"
                          className="fill-white dark:fill-[#0c122c] stroke-slate-900 dark:stroke-cyan-400 transition-colors duration-300"
                          strokeWidth="3.5"
                          strokeLinejoin="round"
                        />
                      </svg>

                      {/* Clipped Background Glow Shade */}
                      <div
                        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
                        style={{ clipPath: `url(#mobileServiceClip-${idx})` }}
                      >
                        <div
                          className={`absolute -top-12 -right-12 w-44 h-44 bg-gradient-to-br ${service.glow} rounded-full blur-2xl opacity-50 pointer-events-none`}
                        />
                      </div>

                      {/* Card Content Container */}
                      <div className="relative z-10 w-full h-[260px] p-6 flex flex-col justify-between">
                        <div>
                          <div className="w-12 h-12 rounded-2xl bg-cyan-50/90 dark:bg-cyan-950/60 border-2 border-cyan-200 dark:border-cyan-500/40 flex items-center justify-center mb-3 shadow-sm">
                            <Icon className="w-6 h-6 text-slate-800 dark:text-cyan-300" />
                          </div>

                          <h3 className="text-lg font-black text-slate-950 dark:text-cyan-400 tracking-tight mb-1.5">
                            {service.title}
                          </h3>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                            {service.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-200/80 dark:border-white/10 flex justify-between items-center">
                          <Link
                            href="#contact"
                            onClick={scrollToContact}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-[11px] font-extrabold tracking-wider uppercase text-white bg-slate-950 dark:bg-gradient-to-r dark:from-cyan-500 dark:via-blue-600 dark:to-indigo-600 dark:hover:from-cyan-400 dark:hover:to-indigo-500 border border-cyan-500/40 shadow-md dark:shadow-[0_0_15px_rgba(6,182,212,0.35)] active:scale-95 transition-all duration-300 cursor-pointer group/btn"
                          >
                            <span>LEARN MORE</span>
                            <ArrowRight className="w-3.5 h-3.5 text-white group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">
                            0{idx + 1} / 0{services.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* CHEVRON NAVIGATION CONTROLS & PAGINATION DOTS BELOW CAROUSEL */}
          <div className="flex items-center justify-center gap-4 mt-5 z-20">
            {/* Left Chevron Button */}
            <button
              type="button"
              onClick={handlePrevMobile}
              aria-label="Previous service"
              suppressHydrationWarning
              className="w-10 h-10 rounded-full bg-white dark:bg-[#121638] border-2 border-cyan-500/50 text-slate-800 dark:text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              {services.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveMobileIdx(idx)}
                  suppressHydrationWarning
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    idx === activeMobileIdx
                      ? 'w-6 h-2 bg-gradient-to-r from-cyan-400 to-blue-600'
                      : 'w-2 h-2 bg-slate-300 dark:bg-slate-700'
                  }`}
                  aria-label={`Go to service ${idx + 1}`}
                />
              ))}
            </div>

            {/* Right Chevron Button */}
            <button
              type="button"
              onClick={handleNextMobile}
              aria-label="Next service"
              suppressHydrationWarning
              className="w-10 h-10 rounded-full bg-white dark:bg-[#121638] border-2 border-cyan-500/50 text-slate-800 dark:text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* DESKTOP 3D FLOATING CAROUSEL STAGE (MD AND LARGER)             */}
        {/* ============================================================== */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="hidden md:flex relative w-full h-[450px] lg:h-[480px] items-center justify-center [perspective:1200px] overflow-hidden mb-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            let offset = index - activeIndex;

            if (offset > totalCards / 2) offset -= totalCards;
            if (offset < -totalCards / 2) offset += totalCards;

            let xVal = 0;
            let yVal = 0;
            let scaleVal = 1;
            let opacityVal = 1;
            let rotateZVal = 0;
            let zIndexVal = 10;

            if (index === activeIndex) {
              xVal = 0;
              yVal = 0;
              scaleVal = 1.0;
              opacityVal = 1.0;
              rotateZVal = 0;
              zIndexVal = 30;
            } else {
              xVal = offset * 260;
              yVal = Math.abs(offset) * 12;
              scaleVal = Math.max(0.72, 1 - Math.abs(offset) * 0.22);
              opacityVal = Math.abs(offset) === 1 ? 0.35 : 0;
              rotateZVal = offset * -2;
              zIndexVal = 20 - Math.abs(offset);
            }

            return (
              <motion.div
                key={index}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onClick={() => {
                  setActiveIndex(index);
                  setIsPaused(true);
                }}
                animate={{
                  x: xVal,
                  y: yVal,
                  scale: scaleVal,
                  opacity: opacityVal,
                  rotateZ: rotateZVal,
                  zIndex: zIndexVal,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                style={{
                  position: 'absolute',
                  transformStyle: 'preserve-3d',
                }}
                className={`w-[340px] lg:w-[360px] h-[380px] lg:h-[400px] group relative overflow-visible transform-gpu ${
                  index === activeIndex
                    ? 'pointer-events-auto cursor-default'
                    : 'pointer-events-auto cursor-pointer'
                }`}
              >
                {/* Speech Bubble SVG Frame & Clip Defs */}
                <svg
                  viewBox="0 0 360 400"
                  className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-0"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <clipPath id={`serviceCardClip-${index}`}>
                      <path d="M 32 4 H 328 A 28 28 0 0 1 356 32 V 328 A 28 28 0 0 1 328 356 H 110 L 45 396 L 45 356 H 32 A 28 28 0 0 1 4 328 V 32 A 28 28 0 0 1 32 4 Z" />
                    </clipPath>
                  </defs>
                  <path
                    d="M 32 4 H 328 A 28 28 0 0 1 356 32 V 328 A 28 28 0 0 1 328 356 H 110 L 45 396 L 45 356 H 32 A 28 28 0 0 1 4 328 V 32 A 28 28 0 0 1 32 4 Z"
                    className={`fill-white dark:fill-[#0c122c] transition-colors duration-300 ${
                      index === activeIndex
                        ? 'stroke-slate-900 dark:stroke-cyan-400'
                        : 'stroke-slate-300 dark:stroke-cyan-500/30 group-hover:stroke-slate-900 dark:group-hover:stroke-cyan-400'
                    }`}
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Clipped Background Glow Shade (Strictly Contained Within Card Border) */}
                <div
                  className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
                  style={{ clipPath: `url(#serviceCardClip-${index})` }}
                >
                  <div
                    className={`absolute -top-12 -right-12 w-44 h-44 bg-gradient-to-br ${service.glow} rounded-full blur-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                </div>

                {/* Card Content Overlay */}
                <div className="relative z-10 px-6 sm:px-8 pt-5 sm:pt-7 pb-7 flex flex-col justify-between h-[330px] sm:h-[356px]">

                  <div>
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 6 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 15 }}
                      className="w-11 sm:w-13 h-11 sm:h-13 rounded-2xl bg-cyan-50/90 dark:bg-cyan-950/60 border-2 border-cyan-200 dark:border-cyan-500/40 flex items-center justify-center mb-3 sm:mb-4 shadow-sm group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300"
                    >
                      <Icon className="w-5.5 sm:w-6.5 h-5.5 sm:h-6.5 text-slate-800 dark:text-cyan-300 transition-transform duration-300" />
                    </motion.div>

                    <h3 className="text-lg sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight mb-1.5 sm:mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium mb-3 sm:mb-4">
                      {service.description}
                    </p>
                  </div>

                  <div className="pb-1">
                    <Link
                      href="#contact"
                      onClick={scrollToContact}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-black tracking-wider uppercase text-white bg-slate-950 dark:bg-gradient-to-r dark:from-cyan-500 dark:via-blue-600 dark:to-indigo-600 dark:hover:from-cyan-400 dark:hover:to-indigo-500 border border-cyan-500/40 shadow-md dark:shadow-[0_0_18px_rgba(6,182,212,0.4)] hover:shadow-cyan-500/50 active:scale-95 transition-all duration-300 cursor-pointer group/btn"
                    >
                      <span>LEARN MORE</span>
                      <ArrowRight className="w-4 h-4 text-white group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}