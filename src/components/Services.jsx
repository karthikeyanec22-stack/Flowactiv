'use client';

import { useState, useEffect } from 'react';
import { Code2, Smartphone, Palette, Cloud, Cpu, Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
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

  const nextService = () => {
    setActiveIndex((prev) => (prev + 1) % totalCards);
  };

  const prevService = () => {
    setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
  };

  // 1.0s show time per card auto-scroll
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalCards);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, totalCards]);

  const [touchStartX, setTouchStartX] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 40) {
      nextService();
    } else if (diff < -40) {
      prevService();
    }
    setTouchStartX(null);
  };

  return (
    <section
      id="services"
      className="scroll-mt-16 sm:scroll-mt-20 pt-4 sm:pt-10 pb-8 sm:pb-20 relative w-full bg-[#f4f6fa] dark:bg-[#02050e] text-slate-900 dark:text-white overflow-hidden transition-colors duration-500"
    >
      {/* AMBIENT BACKGROUND GLOW ORBS */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.25, 0.55, 0.25],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 -left-32 w-[550px] h-[550px] bg-gradient-to-tr from-cyan-500/20 via-blue-500/15 to-transparent rounded-full blur-[130px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.25, 0.55, 0.25],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-10 -right-32 w-[550px] h-[550px] bg-gradient-to-tl from-purple-500/20 via-indigo-500/15 to-transparent rounded-full blur-[130px] pointer-events-none"
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white max-w-3xl mx-auto leading-tight mb-4">
            Services We Provide To Accelerate Your Business
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            From concept to execution, we deliver end-to-end digital engineering services tailored to modern performance standards.
          </p>
        </motion.div>

        {/* UNIFIED SMOOTH CONTINUOUS SLIDING CAROUSEL STAGE FOR MOBILE & DESKTOP */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full h-[380px] sm:h-[450px] md:h-[480px] flex items-center justify-center [perspective:1200px] overflow-hidden mb-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            let offset = index - activeIndex;

            // Handle shortest circular wrapping distance
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
                className={`w-[280px] sm:w-[340px] md:w-[360px] h-[350px] sm:h-[380px] md:h-[400px] group relative overflow-visible transform-gpu ${
                  index === activeIndex
                    ? 'pointer-events-auto cursor-default'
                    : 'pointer-events-auto cursor-pointer'
                }`}
              >
                {/* Speech Bubble SVG Frame */}
                <svg
                  viewBox="0 0 360 400"
                  className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-0"
                  preserveAspectRatio="none"
                >
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

                {/* Card Content Overlay */}
                <div className="relative z-10 px-6 sm:px-8 pt-5 sm:pt-7 pb-7 flex flex-col justify-between h-[330px] sm:h-[356px]">
                  <div
                    className={`absolute -top-12 -right-12 w-44 h-44 bg-gradient-to-br ${service.glow} rounded-full blur-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  />

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
                      className="inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase text-slate-900 dark:text-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors cursor-pointer"
                    >
                      <span>LEARN MORE</span>
                      <ArrowRight className="w-4 h-4 text-slate-900 dark:text-cyan-400 transform group-hover:translate-x-2 transition-transform duration-300 ease-out" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation Controls (Chevrons & Dot Indicators) */}
        <div className="flex items-center justify-between max-w-md mx-auto pt-4 border-t border-slate-200/80 dark:border-white/10 relative z-20 px-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevService}
            suppressHydrationWarning
            className="p-2.5 sm:p-3 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-500 transition-colors shadow-md cursor-pointer"
            aria-label="Previous service"
          >
            <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5" />
          </motion.button>

          <div className="flex items-center gap-2">
            {services.map((_, idx) => (
              <button
                key={idx}
                onClick={() => triggerTransitionSequence(idx)}
                suppressHydrationWarning
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx
                    ? 'w-8 bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_10px_#06b6d4]'
                    : 'w-2.5 bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/40'
                }`}
                aria-label={`Go to service ${idx + 1}`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextService}
            suppressHydrationWarning
            className="p-2.5 sm:p-3 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-500 transition-colors shadow-md cursor-pointer"
            aria-label="Next service"
          >
            <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}