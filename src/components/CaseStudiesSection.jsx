'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sparkles, ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';
import { scrollToContact } from '@/utils/scrollToContact';

export default function CaseStudiesSection() {
  const [selectedCase, setSelectedCase] = useState(null);
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const caseStudies = [
    {
      id: 1,
      badgeText: 'MOBILE CREATIVITY APP',
      title: 'AI Mobile Creativity App',
      subtitle: 'Unleash Your Creativity',
      category: 'iOS & Android App',
      metric: '4.9 ★ (120k Downloads)',
      imageSrc: '/images/case1.png',
      link: '#',
      description: 'An AI-powered mobile creative suite designed to generate high-resolution artistic assets and 3D visual content on-the-go.',
    },
    {
      id: 2,
      badgeText: 'SMART AI PLATFORM',
      title: 'Smart AI Everyday Needs',
      subtitle: 'Growth: +340%',
      category: 'SaaS AI Platform',
      metric: '+340% User Growth',
      imageSrc: '/images/case2.png',
      link: '#',
      description: 'A comprehensive conversational AI ecosystem helping users automate routine tasks, calendar scheduling, and daily workflow management.',
    },
    {
      id: 3,
      badgeText: 'MOBILE APP',
      title: 'Personal Fitness & Health Engine',
      subtitle: 'Accuracy: 99.8%',
      category: 'Mobile App',
      metric: '99.8% Accuracy',
      imageSrc: '/images/case3.png',
      link: '#',
      description: 'Real-time biometric analytics platform connecting wearable sensors to provide tailored workout recovery and nutrition recommendations.',
    },
    {
      id: 4,
      badgeText: 'AI RESEARCH & AI ENGINE',
      title: 'AI Research & Business Analysis Tool',
      subtitle: 'Insights: 10x Faster',
      category: 'Enterprise AI Engine',
      metric: '10x Faster Insights',
      imageSrc: '/images/case4.jpg',
      link: '#',
      description: 'Advanced NLP research engine that aggregates market intelligence data, financial filings, and competitor metrics into actionable reports.',
    },
  ];

  // Smooth 2s auto-scroll effect for mobile view
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveMobileIdx((prev) => (prev + 1) % caseStudies.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused, caseStudies.length]);

  const handlePrevMobile = () => {
    setActiveMobileIdx((prev) => (prev === 0 ? caseStudies.length - 1 : prev - 1));
  };

  const handleNextMobile = () => {
    setActiveMobileIdx((prev) => (prev + 1) % caseStudies.length);
  };

  return (
    <section
      id="case-studies"
      className="scroll-mt-16 sm:scroll-mt-20 pt-4 sm:pt-10 pb-8 sm:pb-24 relative w-full bg-[#f8fafc] dark:bg-[#02050e] text-slate-950 dark:text-white overflow-hidden transition-colors duration-500"
    >
      {/* AMBIENT PURPLE & CYAN NEURAL ATMOSPHERE GLOW */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.45, 0.2],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[750px] bg-gradient-to-tr from-purple-600/20 via-cyan-500/15 to-blue-600/20 rounded-full blur-[140px] pointer-events-none"
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
            CASE STUDIES
          </span>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 dark:text-white max-w-4xl mx-auto leading-tight">
            Innovative Digital Solutions <br /> We&apos;ve Designed And Built
          </h2>
        </motion.div>

        {/* HUB & CIRCULATION STAGE */}
        <div className="relative w-full py-2 sm:py-10 flex flex-col items-center justify-center">

          {/* BACKGROUND DIAGONAL LASER CONNECTOR LINES (DESKTOP ONLY) */}
          <div className="absolute inset-0 pointer-events-none hidden md:block opacity-70 z-0">
            <svg viewBox="0 0 1000 600" className="w-full h-full text-cyan-400 stroke-current" fill="none">
              <line x1="280" y1="160" x2="500" y2="300" strokeWidth="2" strokeDasharray="5 5" />
              <line x1="720" y1="160" x2="500" y2="300" strokeWidth="2" strokeDasharray="5 5" />
              <line x1="280" y1="440" x2="500" y2="300" strokeWidth="2" strokeDasharray="5 5" />
              <line x1="720" y1="440" x2="500" y2="300" strokeWidth="2" strokeDasharray="5 5" />
            </svg>
          </div>

          {/* CENTRAL 3D DIAMOND CRYSTAL PRISM HUB ("CASE HUB" DESKTOP ONLY) */}
          <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 hidden md:block">
            <motion.div
              animate={{ scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center cursor-pointer group"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 via-purple-500 to-indigo-600 rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-full h-full bg-gradient-to-tr from-cyan-300 via-purple-400 to-indigo-600 rounded-3xl p-1.5 shadow-2xl flex items-center justify-center">
                <div className="w-full h-full bg-[#090c24] rounded-2xl flex flex-col items-center justify-center text-center p-3 border border-purple-400/60">
                  <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-cyan-200 to-white tracking-widest italic">
                    CASE
                  </span>
                  <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-widest mt-1">
                    HUB
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ============================================================== */}
          {/* MOBILE SLIDER (ULTRA-SMOOTH CONTINUOUS HORIZONTAL TRACK, NO BLINK) */}
          {/* ============================================================== */}
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            className="w-full md:hidden flex flex-col items-center justify-center py-2 relative z-10"
          >
            {/* Horizontal Track Viewport Window */}
            <div className="relative w-full max-w-[340px] aspect-[4/3.4] mx-auto overflow-hidden rounded-3xl">
              <motion.div
                className="flex w-full h-full"
                animate={{ x: `-${activeMobileIdx * 100}%` }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              >
                {caseStudies.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedCase(item)}
                    className="w-full h-full shrink-0 group cursor-pointer flex items-center justify-center p-1 select-none"
                  >
                    {/* Outer Square Glass Backing Plate */}
                    <div className="relative w-full h-full p-1 bg-gradient-to-tr from-purple-600/40 via-cyan-400/30 to-indigo-600/40 shadow-2xl backdrop-blur-xl rounded-3xl flex items-center justify-center">

                      {/* Inner Dark Surface */}
                      <div className="w-full h-full bg-gradient-to-br from-[#121638] via-[#090d26] to-[#1c123d] rounded-[22px] flex items-center justify-center p-2.5 relative overflow-hidden">

                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-cyan-400/20 blur-xl opacity-60" />

                        {/* Smartphone Preview Mockup */}
                        <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-slate-900/90 dark:border-purple-400/50 shadow-2xl bg-slate-950 flex flex-col justify-between z-10">
                          {item.imageSrc ? (
                            <Image
                              src={item.imageSrc}
                              alt={item.title}
                              fill
                              className="object-cover"
                              sizes="100vw"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-950 to-slate-950 p-4 text-center">
                              <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest">
                                {item.title}
                              </span>
                            </div>
                          )}

                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-slate-950/40 pointer-events-none" />

                          <div className="relative z-10 p-3 text-center">
                            <span className="text-[10px] font-extrabold text-cyan-300 uppercase tracking-widest block opacity-90">
                              {item.badgeText}
                            </span>
                            <h4 className="text-xs font-black text-white leading-tight drop-shadow-md mt-1">
                              {item.title}
                            </h4>
                          </div>

                          <div className="relative z-10 p-3 flex justify-end">
                            <div className="w-9 h-9 rounded-full bg-[#27154d]/90 border border-purple-400/80 text-white flex items-center justify-center shadow-xl">
                              <ArrowUpRight className="w-4 h-4" />
                            </div>
                          </div>

                        </div>

                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* CHEVRON NAVIGATION CONTROLS & DOTS BELOW CAROUSEL */}
            <div className="flex items-center justify-center gap-4 mt-5 z-20">
              {/* Left Chevron Button */}
              <button
                type="button"
                onClick={handlePrevMobile}
                aria-label="Previous case study"
                suppressHydrationWarning
                className="w-10 h-10 rounded-full bg-white dark:bg-[#121638] border-2 border-purple-500/50 text-slate-800 dark:text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 text-purple-600 dark:text-cyan-400" />
              </button>

              {/* Pagination Dots */}
              <div className="flex items-center gap-2">
                {caseStudies.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveMobileIdx(idx)}
                    suppressHydrationWarning
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      idx === activeMobileIdx
                        ? 'w-6 h-2 bg-gradient-to-r from-cyan-400 to-purple-500'
                        : 'w-2 h-2 bg-slate-300 dark:bg-slate-700'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Right Chevron Button */}
              <button
                type="button"
                onClick={handleNextMobile}
                aria-label="Next case study"
                suppressHydrationWarning
                className="w-10 h-10 rounded-full bg-white dark:bg-[#121638] border-2 border-purple-500/50 text-slate-800 dark:text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 text-purple-600 dark:text-cyan-400" />
              </button>
            </div>
          </div>

          {/* ============================================================== */}
          {/* DESKTOP 2x2 GRID LAYOUT (MD AND LARGER)                       */}
          {/* ============================================================== */}
          <div className="hidden md:grid grid-cols-2 gap-8 sm:gap-12 lg:gap-16 w-full max-w-5xl mx-auto relative z-10">
            {caseStudies.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.03 }}
                onClick={() => setSelectedCase(item)}
                className="relative group cursor-pointer transition-all duration-300 flex flex-col items-center w-full"
              >
                {/* 1. OUTER SQUARE GLASS BACKING PLATE */}
                <div className="relative w-full aspect-[4/3.2] max-w-md p-1 bg-gradient-to-tr from-purple-600/40 via-cyan-400/30 to-indigo-600/40 group-hover:from-purple-500 group-hover:to-cyan-300 shadow-2xl backdrop-blur-xl rounded-3xl flex items-center justify-center">

                  {/* Inner Dark Surface */}
                  <div className="w-full h-full bg-gradient-to-br from-[#121638] via-[#090d26] to-[#1c123d] rounded-[22px] flex items-center justify-center p-3 sm:p-4 relative overflow-hidden">

                    {/* Background Radial Purple Glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-cyan-400/20 blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />

                    {/* 2. INNER SMARTPHONE / SCREEN PREVIEW MOCKUP */}
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-slate-900/90 dark:border-purple-400/50 shadow-2xl bg-slate-950 flex flex-col justify-between z-10">
                      {item.imageSrc ? (
                        <Image
                          src={item.imageSrc}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-950 to-slate-950 p-4 text-center">
                          <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest">
                            {item.title}
                          </span>
                        </div>
                      )}

                      {/* Dark Vignette Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-slate-950/40 pointer-events-none" />

                      {/* Top Header Text inside Screen */}
                      <div className="relative z-10 p-3 sm:p-4 text-center">
                        <span className="text-[10px] font-extrabold text-cyan-300 uppercase tracking-widest block opacity-90">
                          {item.badgeText}
                        </span>
                        <h4 className="text-xs sm:text-sm font-black text-white leading-tight drop-shadow-md mt-1">
                          {item.title}
                        </h4>
                      </div>

                      {/* Bottom Floating Circular Arrow Button */}
                      <div className="relative z-10 p-3 sm:p-4 flex justify-end">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#27154d]/90 border border-purple-400/80 text-white flex items-center justify-center shadow-xl group-hover:bg-purple-600 group-hover:scale-110 transition-all duration-300">
                          <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                        </div>
                      </div>

                    </div>

                  </div>
                </div>

              </motion.div>
            ))}
          </div>

          {/* BOTTOM CENTER ACTION BUTTON (1:1 REFERENCE MATCH) */}
          <div className="mt-14 relative z-20">
            <Button href="#contact" onClick={scrollToContact}>
              EXPLORE ALL CASES
            </Button>
          </div>

        </div>

      </div>

      {/* CASE STUDY DETAIL MODAL DIALOG */}
      <AnimatePresence>
        {selectedCase && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCase(null)}
              className="fixed inset-0 bg-slate-950/70 dark:bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#070b1e] rounded-3xl border-2 border-purple-500/50 p-6 sm:p-8 shadow-2xl z-10 overflow-hidden text-slate-950 dark:text-white"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedCase(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:text-purple-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-xs font-black uppercase tracking-widest text-purple-600 dark:text-purple-400 mb-2 block">
                {selectedCase.badgeText}
              </span>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white mb-3">
                {selectedCase.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium mb-6">
                {selectedCase.description}
              </p>

              {/* Metric Card Highlight */}
              <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/30 mb-6 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Key Result Metric
                </span>
                <span className="text-sm font-black text-purple-700 dark:text-cyan-300">
                  {selectedCase.metric}
                </span>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="secondary" onClick={() => setSelectedCase(null)}>
                  Close
                </Button>
                <Button href="#contact" icon={ExternalLink} onClick={(e) => { setSelectedCase(null); scrollToContact(e); }}>
                  Request Demo
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}