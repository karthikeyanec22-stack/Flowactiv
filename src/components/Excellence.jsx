'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Cpu, ExternalLink, Sparkles, Check, Monitor, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import Button from './Button';

// ==============================================================
// 1. FALLING TECH STACK ORBS JAR (FOR MODERN TECH STACK CARD)
// ==============================================================
function FallingTechStackJar() {
  const [resetKey, setResetKey] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const techLogos = [
    { name: 'Python', icon: 'python', color: '3776AB', size: 'w-8 h-8', landingY: 30, landingX: -35, rotate: 10 },
    { name: 'Docker', icon: 'docker', color: '2496ED', size: 'w-8 h-8', landingY: 32, landingX: 0, rotate: -12 },
    { name: 'TypeScript', icon: 'typescript', color: '3178C6', size: 'w-8 h-8', landingY: 28, landingX: 35, rotate: 6 },
    { name: 'React', icon: 'react', color: '61DAFB', size: 'w-8 h-8', landingY: -5, landingX: -22, rotate: 5 },
    { name: 'Kubernetes', icon: 'kubernetes', color: '326CE5', size: 'w-8 h-8', landingY: -3, landingX: 22, rotate: 8 },
    { name: 'Next.js', icon: 'nextdotjs', color: '000000', size: 'w-7 h-7', landingY: -36, landingX: -10, rotate: 6 },
    { name: 'Node.js', icon: 'nodedotjs', color: '5FA04E', size: 'w-8 h-8', landingY: -32, landingX: 15, rotate: -10 },
  ];

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setResetKey((prev) => prev + 1);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(6,182,212,0.25)_0%,transparent_75%)] pointer-events-none" />

      {/* Falling White Orbs */}
      <div key={resetKey} className="relative w-full h-full flex items-center justify-center pointer-events-none">
        {techLogos.map((tech, idx) => (
          <motion.div
            key={`${tech.name}-${idx}`}
            initial={{ y: -120, opacity: 0, rotate: tech.rotate * 2 }}
            animate={{
              y: tech.landingY,
              x: tech.landingX,
              opacity: 1,
              rotate: tech.rotate,
            }}
            transition={{
              type: 'spring',
              stiffness: 50,
              damping: 12,
              mass: 1.2,
              delay: idx * 0.12,
            }}
            className="absolute pointer-events-auto cursor-pointer"
            whileHover={{ scale: 1.2, zIndex: 50 }}
          >
            <div className={`relative ${tech.size} rounded-full bg-white border border-slate-200 dark:border-cyan-400/60 shadow-[0_4px_12px_rgba(6,182,212,0.3)] flex items-center justify-center p-1.5 transition-transform`}>
              <img
                src={`https://cdn.simpleicons.org/${tech.icon}/${tech.color}`}
                alt={tech.name}
                className="w-full h-full object-contain filter drop-shadow-sm"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ==============================================================
// 2. MAIN EXCELLENCE BENTO SECTION WITH 2x2 CENTERED GRID
// ==============================================================
export default function Excellence() {
  const [isLidOpen, setIsLidOpen] = useState(false);
  const [isSpread, setIsSpread] = useState(false);
  const isTriggeredRef = useRef(false);
  const autoTimerRef = useRef(null);
  const spreadTimerRef = useRef(null);

  // Immediate trigger: First opens cards out of box -> 650ms later folder disappears & cards spread to fixed places
  const triggerOpenSequence = () => {
    isTriggeredRef.current = true;
    setIsLidOpen(true);
    if (spreadTimerRef.current) clearTimeout(spreadTimerRef.current);
    spreadTimerRef.current = setTimeout(() => {
      setIsSpread(true);
    }, 650);
  };

  // Core function to start auto-open timer (triggers once when user scrolls to section)
  const startAutoOpenTimer = () => {
    if (isTriggeredRef.current) return;
    isTriggeredRef.current = true;

    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    autoTimerRef.current = setTimeout(() => {
      triggerOpenSequence();
    }, 350);
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
      if (spreadTimerRef.current) clearTimeout(spreadTimerRef.current);
    };
  }, []);

  // Viewport Enter: Triggers auto-open sequence only on first enter
  const handleViewportEnter = () => {
    startAutoOpenTimer();
  };

  return (
    <section
      id="excellence"
      className="scroll-mt-16 sm:scroll-mt-20 pt-4 sm:pt-8 pb-8 sm:pb-20 relative w-full bg-[#f8fafc] dark:bg-[#02050e] text-slate-950 dark:text-white transition-colors duration-500 overflow-hidden flex flex-col justify-center"
    >
      {/* Background Ambient Glow Orb */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[400px] bg-gradient-to-r from-cyan-500/20 via-blue-600/15 to-indigo-600/20 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          onViewportEnter={handleViewportEnter}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-4 sm:mb-6"
        >
          <span className="text-[13px] sm:text-sm font-black tracking-widest uppercase text-cyan-600 dark:text-cyan-400 mb-3 block">
            EXCELLENCE IN DIGITAL ENGINEERING
          </span>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 dark:text-white max-w-4xl mx-auto leading-tight">
            Powering Businesses With Modern Technology, And Scalable Digital Solutions.
          </h2>
        </motion.div>

        {/* CENTERPIECE: STABLE OVERLAY STACK CONTAINER (ZERO DOWNWARD LAYOUT SHIFT) */}
        <div className="relative w-full min-h-[480px] flex items-center justify-center">

          {/* 3D Blue Tech Folder Container Box (.holder-box) */}
          <AnimatePresence>
            {!isSpread && (
              <motion.div
                onClick={triggerOpenSequence}
                initial={{ opacity: 1, scale: 1 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.4 } }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="holder-box absolute z-30 w-full max-w-md mx-auto cursor-pointer group transition-all duration-500"
              >
                {/* Top Left Folder Tab */}
                <div className="w-36 h-7 bg-[#0055d4] rounded-t-2xl ml-0 border-t-2 border-l-2 border-r-2 border-blue-400/50 shadow-md relative z-10" />

                {/* Main 3D Blue Folder Body */}
                <div className="relative w-full bg-gradient-to-br from-[#0066ff] via-[#0052cc] to-[#003d99] rounded-2xl rounded-tl-none p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,82,204,0.45)] border-2 border-blue-400/50 backdrop-blur-xl">
                  {/* Top Left Small Horizontal Pill Accent Line */}
                  <div className="w-10 h-2 bg-blue-300/60 rounded-full mb-4 shadow-inner" />

                  {/* Inner Inset Glass Screen Window with Stacked Cards (Cloned 1:1 from reference image) */}
                  <div className="relative w-full h-48 sm:h-56 bg-[#445299]/70 dark:bg-[#344180]/80 rounded-xl border border-indigo-300/30 p-3 flex flex-col justify-between overflow-visible shadow-inner">
                    {/* Glow Beam when Opening */}
                    {isLidOpen && (
                      <motion.div
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 bg-gradient-to-t from-cyan-400/60 via-blue-500/30 to-transparent rounded-xl blur-md pointer-events-none z-20 animate-pulse"
                      />
                    )}

                    {/* Animated Luminous EXCELLENCE Header Line */}
                    <div className="flex justify-between items-center z-20 px-2 pt-1">
                      <motion.h3
                        animate={{
                          scale: [1, 1.05, 1],
                          opacity: [0.9, 1, 0.9],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className="text-sm sm:text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-100 tracking-[0.2em] uppercase drop-shadow-[0_0_12px_rgba(6,182,212,0.85)]"
                      >
                        EXCELLENCE
                      </motion.h3>
                      <Monitor className="w-4 h-4 text-cyan-300/70" />
                    </div>

                    {/* 4 STACKED MINI PREVIEW CARDS (SAME WHITE / LIGHT GLASS STYLING AS ACTUAL CARDS) */}
                    <div className="relative w-full h-36 flex items-center justify-center pointer-events-none mt-1">
                      {/* Mini Card 1: Smarter IT */}
                      <motion.div
                        animate={{
                          y: isLidOpen ? -220 : -10,
                          x: isLidOpen ? -90 : -20,
                          rotate: isLidOpen ? -22 : -10,
                          scale: isLidOpen ? 1.25 : 0.92,
                        }}
                        transition={{ type: 'spring', stiffness: 180, damping: 18 }}
                        className="absolute w-44 sm:w-48 h-20 rounded-xl bg-white/95 dark:bg-[#0c122d] text-slate-950 dark:text-white border-2 border-slate-300 dark:border-cyan-500/50 p-2.5 shadow-2xl flex flex-col justify-between z-10"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black tracking-wider text-slate-950 dark:text-white">Smarter IT</span>
                          <Cpu className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                        </div>
                        <div className="flex justify-end">
                          <Button href="#services" className="!px-2.5 !py-1 !text-[8px] !shadow-none pointer-events-none" showArrow={true}>
                            LEARN MORE
                          </Button>
                        </div>
                      </motion.div>

                      {/* Mini Card 2: Modern Tech Stack */}
                      <motion.div
                        animate={{
                          y: isLidOpen ? -190 : -2,
                          x: isLidOpen ? 85 : 18,
                          rotate: isLidOpen ? 20 : 8,
                          scale: isLidOpen ? 1.25 : 0.92,
                        }}
                        transition={{ type: 'spring', stiffness: 180, damping: 18, delay: 0.05 }}
                        className="absolute w-44 sm:w-48 h-20 rounded-xl bg-white/95 dark:bg-[#0c122d] text-slate-950 dark:text-white border-2 border-cyan-400/60 p-2.5 shadow-xl flex flex-col justify-between z-0"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black tracking-wider text-slate-950 dark:text-white">Modern Tech Stack</span>
                          <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                        </div>
                        <div className="flex justify-end">
                          <Button href="#services" className="!px-2.5 !py-1 !text-[8px] !shadow-none pointer-events-none" icon={ExternalLink}>
                            CHECK WEBSITE
                          </Button>
                        </div>
                      </motion.div>

                      {/* Mini Card 3: Security-First */}
                      <motion.div
                        animate={{
                          y: isLidOpen ? -160 : 12,
                          x: isLidOpen ? -60 : -8,
                          rotate: isLidOpen ? -14 : -4,
                          scale: isLidOpen ? 1.25 : 0.92,
                        }}
                        transition={{ type: 'spring', stiffness: 180, damping: 18, delay: 0.1 }}
                        className="absolute w-44 sm:w-48 h-20 rounded-xl bg-white/95 dark:bg-[#0c122d] text-slate-950 dark:text-white border-2 border-slate-300 dark:border-cyan-500/50 p-2.5 shadow-xl flex flex-col justify-between z-[5]"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black tracking-wider text-slate-950 dark:text-white">Security-First</span>
                          <Check className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 stroke-[3]" />
                        </div>
                        <div className="flex justify-end">
                          <Button href="#services" className="!px-2.5 !py-1 !text-[8px] !shadow-none pointer-events-none" showArrow={true}>
                            LEARN MORE
                          </Button>
                        </div>
                      </motion.div>

                      {/* Mini Card 4: Trusted By Growing Businesses */}
                      <motion.div
                        animate={{
                          y: isLidOpen ? -130 : 20,
                          x: isLidOpen ? 50 : 8,
                          rotate: isLidOpen ? 12 : 3,
                          scale: isLidOpen ? 1.25 : 0.92,
                        }}
                        transition={{ type: 'spring', stiffness: 180, damping: 18, delay: 0.15 }}
                        className="absolute w-44 sm:w-48 h-20 rounded-xl bg-white/95 dark:bg-[#0c122d] text-slate-950 dark:text-white border-2 border-slate-300 dark:border-cyan-500/50 p-2.5 shadow-xl flex flex-col justify-between z-[2]"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black tracking-wider text-slate-950 dark:text-white">Trusted Growth</span>
                          <Shield className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                        </div>
                        <div className="flex justify-end">
                          <Button href="#services" className="!px-2.5 !py-1 !text-[8px] !shadow-none pointer-events-none" icon={ExternalLink}>
                            CHECK WEBSITE
                          </Button>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ============================================================== */}
          {/* 2x2 GRID OF 4 CUSTOM SHAPED CARDS (ZERO LAYOUT DISPLACEMENT)  */}
          {/* ============================================================== */}
          <div className={`w-full max-w-5xl mx-auto z-20 transition-opacity duration-500 ${!isSpread ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* CARD 1 (Top Left): Chamfered Card with 3D Faceted Blue Hexagonal Crystal Gemstone */}
              <motion.div
                initial={{ y: 0, scale: 0.9, opacity: 0 }}
                animate={{
                  y: 0,
                  scale: isSpread ? 1 : 0.9,
                  opacity: isSpread ? 1 : 0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  delay: isSpread ? 0.04 : 0,
                }}
                className={`relative bg-white/95 dark:bg-[#0c122d] border-2 border-slate-300 dark:border-cyan-500/40 rounded-tl-3xl rounded-br-3xl rounded-tr-md rounded-bl-md p-6 sm:p-7 shadow-xl flex items-center gap-5 group hover:border-cyan-400 transition-all ${
                  !isSpread ? 'pointer-events-none' : 'w-full'
                }`}
              >
                {/* 3D Faceted Translucent Blue Hexagonal Gemstone Graphic */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 flex items-center justify-center pointer-events-none group-hover:scale-105 transition-transform duration-500">
                  <svg viewBox="0 0 120 120" className="w-full h-full filter drop-shadow-[0_12px_25px_rgba(6,182,212,0.45)]">
                    <defs>
                      <linearGradient id="gemTop" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#0284c7" />
                      </linearGradient>
                      <linearGradient id="gemLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0369a1" />
                        <stop offset="100%" stopColor="#075985" />
                      </linearGradient>
                      <linearGradient id="gemRight" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="#2563eb" />
                      </linearGradient>
                      <linearGradient id="gemCenter" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#7dd3fc" />
                        <stop offset="100%" stopColor="#0284c7" />
                      </linearGradient>
                    </defs>
                    <polygon points="30,10 90,10 115,60 90,110 30,110 5,60" fill="url(#gemLeft)" stroke="#e0f2fe" strokeWidth="1.5" />
                    <polygon points="42,25 78,25 95,60 78,95 42,95 25,60" fill="url(#gemCenter)" stroke="#bae6fd" strokeWidth="1.5" />
                    <polygon points="30,10 90,10 78,25 42,25" fill="url(#gemTop)" opacity="0.85" />
                    <polygon points="90,10 115,60 95,60 78,25" fill="url(#gemRight)" opacity="0.9" />
                    <polygon points="115,60 90,110 78,95 95,60" fill="url(#gemLeft)" opacity="0.75" />
                    <polygon points="90,110 30,110 42,95 78,95" fill="url(#gemTop)" opacity="0.6" />
                    <polygon points="30,110 5,60 25,60 42,95" fill="url(#gemRight)" opacity="0.8" />
                    <polygon points="5,60 30,10 42,25 25,60" fill="url(#gemCenter)" opacity="0.7" />
                  </svg>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight mb-2">
                      Smarter IT
                    </h3>
                    <p className="text-xs sm:text-xs font-medium text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      We integrate intelligent automation into your workflows — enabling predictive monitoring, faster issue resolution, and smarter system management.
                    </p>
                  </div>
                  <Button href="#services" showArrow={true}>
                    LEARN MORE
                  </Button>
                </div>
              </motion.div>

              {/* CARD 2 (Top Right): Glassmorphic Card with Falling Tech Orbs Jar */}
              <motion.div
                initial={{ y: 0, scale: 0.9, opacity: 0 }}
                animate={{
                  y: 0,
                  scale: isSpread ? 1 : 0.9,
                  opacity: isSpread ? 1 : 0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  delay: isSpread ? 0.08 : 0,
                }}
                className={`relative bg-white/80 dark:bg-[#0c122d]/80 backdrop-blur-xl border-2 border-cyan-400/60 rounded-3xl p-6 sm:p-7 shadow-xl flex items-center gap-5 group hover:border-cyan-300 transition-all ${
                  !isSpread ? 'pointer-events-none' : 'w-full'
                }`}
              >
                {/* Left Falling Tech Stack Orbs Container */}
                <div className="w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-2xl bg-slate-100/90 dark:bg-[#070a19]/90 border border-cyan-500/40 shadow-inner relative overflow-hidden flex items-center justify-center">
                  <FallingTechStackJar />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between h-full w-full">
                  <div className="flex justify-end mb-1">
                    <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-500/40">
                      Live Tech Stack
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight mb-2">
                      Modern Tech Stack
                    </h3>
                    <p className="text-xs sm:text-xs font-medium text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      A glassmorphic tech suite powered by Next.js, React, Node.js, and cloud-native microservices.
                    </p>
                  </div>
                  <Button href="#services" icon={ExternalLink}>
                    CHECK WEBSITE
                  </Button>
                </div>
              </motion.div>

              {/* CARD 3 (Bottom Left): 3D Shield Emblem Card with White Checkmark */}
              <motion.div
                initial={{ y: 0, scale: 0.9, opacity: 0 }}
                animate={{
                  y: 0,
                  scale: isSpread ? 1 : 0.9,
                  opacity: isSpread ? 1 : 0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  delay: isSpread ? 0.12 : 0,
                }}
                className={`relative bg-white/95 dark:bg-[#0c122d] border-2 border-slate-300 dark:border-cyan-500/40 rounded-3xl p-6 sm:p-7 shadow-xl flex items-center gap-5 group hover:border-cyan-400 transition-all ${
                  !isSpread ? 'pointer-events-none' : 'w-full'
                }`}
              >
                {/* 3D Layered White/Blue Security Shield Badge with Checkmark */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white via-slate-100 to-slate-200 border-2 border-slate-300 dark:border-cyan-400/40 shadow-[0_12px_25px_rgba(0,0,0,0.15)] dark:shadow-[0_12px_25px_rgba(6,182,212,0.3)] flex items-center justify-center p-2.5">
                    <div className="w-full h-full rounded-xl bg-gradient-to-tr from-blue-900 via-blue-600 to-cyan-400 border border-cyan-200 flex items-center justify-center shadow-inner relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
                      <Check className="w-10 h-10 sm:w-11 sm:h-11 text-white stroke-[3.5] filter drop-shadow-md relative z-10" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight mb-2">
                      Security-First
                    </h3>
                    <p className="text-xs sm:text-xs font-medium text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      Security is built into every layer of our development process, ensuring protected and future-ready applications.
                    </p>
                  </div>
                  <Button href="#services" showArrow={true}>
                    LEARN MORE
                  </Button>
                </div>
              </motion.div>

              {/* CARD 4 (Bottom Right): Side-Notched Ticket Card with 3D Growth Chart Emblem */}
              <motion.div
                initial={{ y: 0, scale: 0.9, opacity: 0 }}
                animate={{
                  y: 0,
                  scale: isSpread ? 1 : 0.9,
                  opacity: isSpread ? 1 : 0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  delay: isSpread ? 0.16 : 0,
                }}
                className={`relative bg-white/95 dark:bg-[#0c122d] border-2 border-slate-300 dark:border-cyan-500/40 rounded-3xl p-6 sm:p-7 shadow-xl flex items-center gap-5 group hover:border-cyan-400 transition-all overflow-hidden ${
                  !isSpread ? 'pointer-events-none' : 'w-full'
                }`}
              >
                {/* Semi-circle Side Ticket Notches */}
                <div className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#f8fafc] dark:bg-[#02050e] border border-slate-300 dark:border-cyan-500/40" />
                <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#f8fafc] dark:bg-[#02050e] border border-slate-300 dark:border-cyan-500/40" />

                {/* 3D Layered Growth Trend Emblem Badge */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white via-slate-100 to-slate-200 border-2 border-slate-300 dark:border-cyan-400/40 shadow-[0_12px_25px_rgba(0,0,0,0.15)] dark:shadow-[0_12px_25px_rgba(6,182,212,0.3)] flex items-center justify-center p-2.5">
                    <div className="w-full h-full rounded-xl bg-gradient-to-tr from-indigo-950 via-blue-700 to-cyan-400 border border-cyan-200 flex items-center justify-center shadow-inner relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
                      <TrendingUp className="w-10 h-10 sm:w-11 sm:h-11 text-white stroke-[3] filter drop-shadow-md relative z-10" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between h-full w-full">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight mb-2">
                      Trusted By Growing Businesses
                    </h3>
                    <p className="text-xs sm:text-xs font-medium text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      Companies trust FlowActive to deliver scalable digital solutions that improve efficiency, enhance user experiences, and accelerate growth.
                    </p>
                  </div>
                  <Button href="#services" icon={ExternalLink}>
                    CHECK WEBSITE
                  </Button>
                </div>
              </motion.div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}