'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { productsData } from '../data/products';
import Button from './Button';

export default function ProductsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalCards = productsData.length;

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % totalCards);
  };

  const prevCard = () => {
    setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
  };

  // Auto-rotate desktop 3D stage every 1 second (1,000ms)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextCard();
    }, 1000);

    return () => clearInterval(interval);
  }, [activeIndex, isPaused]);

  return (
    <section
      id="products"
      className="scroll-mt-16 sm:scroll-mt-20 pt-4 sm:pt-10 pb-8 sm:pb-20 relative w-full bg-[#f8fafc] dark:bg-[#02050e] overflow-hidden transition-colors duration-500"
    >
      {/* ============================================================== */}
      {/* 1. ANIMATED AMBIENT BACKGROUND ORBS & GLOW CURVES              */}
      {/* ============================================================== */}

      {/* Left Ambient Glow Orb */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500/25 via-blue-500/15 to-transparent rounded-full blur-[120px] pointer-events-none"
      />

      {/* Right Ambient Glow Orb */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-gradient-to-tl from-indigo-500/25 via-purple-500/15 to-transparent rounded-full blur-[120px] pointer-events-none"
      />

      {/* Central Erupting Energy Glow */}
      <motion.div
        animate={{
          y: [-10, -40, -10],
          opacity: [0.25, 0.5, 0.25],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-cyan-500/20 via-blue-600/15 to-transparent rounded-full blur-3xl pointer-events-none"
      />

      {/* ============================================================== */}
      {/* 2. MAIN CONTENT CONTAINER                                      */}
      {/* ============================================================== */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">

        {/* Clean Header Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '200px 0px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-6 sm:mb-16"
        >
          <span className="text-[13px] sm:text-sm font-black tracking-widest uppercase text-cyan-600 dark:text-cyan-400 mb-3 block">
            OUR ECOSYSTEM
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 dark:text-white leading-tight">
            Products We&apos;ve Built & Are Building
          </h2>
        </motion.div>

        {/* ============================================================== */}
        {/* MOBILE VIEW (ONE BY ONE STACKED CARDS - NO AUTO ROTATION)       */}
        {/* ============================================================== */}
        <div className="block md:hidden flex flex-col gap-6 sm:gap-12 w-full max-w-lg mx-auto pt-1 pb-2 px-1">
          {productsData.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <ProductCard product={product} isActive={true} isMobileLayout={true} />
            </motion.div>
          ))}
        </div>

        {/* ============================================================== */}
        {/* DESKTOP / TABLET VIEW (3D PERSPECTIVE AUTO-ROTATING STAGE)      */}
        {/* ============================================================== */}
        <div className="hidden md:block">
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="relative w-full h-[480px] lg:h-[440px] flex items-center justify-center [perspective:1200px] overflow-visible my-4 px-4"
          >
            {productsData.map((product, idx) => {
              let offset = (idx - activeIndex + totalCards) % totalCards;
              if (offset > totalCards / 2) offset -= totalCards;

              const isActive = offset === 0;

              const xPos = isActive ? 0 : offset > 0 ? 320 : -320;
              const zDepth = isActive ? 0 : -200;
              const yRotation = isActive ? 0 : offset > 0 ? -14 : 14;
              const scaleVal = isActive ? 1.0 : 0.78;
              const opacityVal = isActive ? 1.0 : 0.35;
              const zIndexVal = isActive ? 30 : 20 - Math.abs(offset) * 5;

              return (
                <motion.div
                  key={product.id}
                  onClick={() => {
                    setActiveIndex(idx);
                    setIsPaused(true);
                  }}
                  initial={false}
                  animate={{
                    x: xPos,
                    z: zDepth,
                    rotateY: yRotation,
                    scale: scaleVal,
                    opacity: opacityVal,
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
                  className={`w-[92%] lg:w-[85%] max-w-4xl sm:max-w-5xl cursor-pointer ${
                    isActive ? 'pointer-events-auto' : 'pointer-events-auto hover:opacity-75'
                  }`}
                >
                  <ProductCard product={product} isActive={isActive} isMobileLayout={false} />
                </motion.div>
              );
            })}
          </div>

          {/* DESKTOP CAROUSEL CONTROLS & PAGINATION DOTS */}
          <div className="flex items-center justify-center gap-4 mt-8 relative z-30">
            <button
              type="button"
              onClick={prevCard}
              aria-label="Previous product"
              suppressHydrationWarning
              className="w-10 h-10 rounded-full bg-white dark:bg-[#0c102a] border border-slate-300 dark:border-cyan-500/30 text-slate-800 dark:text-cyan-300 flex items-center justify-center shadow-md hover:bg-slate-100 dark:hover:bg-cyan-950/50 hover:scale-105 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {productsData.map((p, idx) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to product ${idx + 1}`}
                  suppressHydrationWarning
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeIndex === idx
                      ? 'w-8 bg-[#1e56d8] dark:bg-cyan-400'
                      : 'w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={nextCard}
              aria-label="Next product"
              suppressHydrationWarning
              className="w-10 h-10 rounded-full bg-white dark:bg-[#0c102a] border border-slate-300 dark:border-cyan-500/30 text-slate-800 dark:text-cyan-300 flex items-center justify-center shadow-md hover:bg-slate-100 dark:hover:bg-cyan-950/50 hover:scale-105 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

// ====================================================================
// PRODUCT CARD SUB-COMPONENT
// ====================================================================
function ProductCard({ product, isActive, isMobileLayout = false }) {
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 180, damping: 22 });
  const mouseY = useSpring(y, { stiffness: 180, damping: 22 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-5deg', '5deg']);

  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!isActive || isMobileLayout) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    x.set(mouseXPos / width - 0.5);
    y.set(mouseYPos / height - 0.5);

    setCursorPos({
      x: (mouseXPos / width) * 100,
      y: (mouseYPos / height) * 100,
    });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      style={{
        rotateX: isActive && !isMobileLayout ? rotateX : 0,
        rotateY: isActive && !isMobileLayout ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => isActive && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full max-w-3xl ${
        isMobileLayout ? 'ml-3 sm:ml-5' : 'ml-5 sm:ml-10 lg:ml-14'
      } transition-all duration-300 group select-none ${
        isActive ? 'opacity-100' : 'opacity-80'
      }`}
    >
      {/* 1. LEFT SOLID BLUE ORBIT DIAL SPHERE HOUSING */}
      <motion.div
        style={{ transform: isActive && !isMobileLayout ? 'translateZ(30px)' : 'none' }}
        className={`absolute ${
          isMobileLayout
            ? '-left-4 sm:-left-6 top-1/2 -translate-y-1/2 w-20 h-20 sm:w-28 sm:h-28'
            : '-left-6 sm:-left-12 lg:-left-16 top-1/2 -translate-y-1/2 w-24 h-24 sm:w-36 sm:h-36 lg:w-44 lg:h-44'
        } rounded-full bg-[#1e56d8] dark:bg-blue-600 border-4 border-white dark:border-slate-900 shadow-2xl flex items-center justify-center z-20 pointer-events-none transition-all duration-300`}
      >
        {/* Central Glossy 3D Blue Sphere Logo Badge */}
        <div
          className={`relative z-20 ${
            isMobileLayout
              ? 'w-14 h-14 sm:w-20 sm:h-20'
              : 'w-16 h-16 sm:w-24 sm:h-24 lg:w-28 lg:h-28'
          } rounded-full bg-gradient-to-tr from-blue-950 via-blue-700 to-cyan-400 border-2 border-white flex items-center justify-center shadow-lg overflow-hidden shrink-0`}
        >
          {product.imageSrc ? (
            <Image
              src={product.imageSrc}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out p-1"
              sizes="(max-width: 768px) 100vw, 140px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white font-black text-lg sm:text-2xl lg:text-3xl">
              {product.title[0]}
            </div>
          )}
        </div>
      </motion.div>

      {/* 2. RIGHT INTEGRATED CARD CONTAINER */}
      <div
        className={`relative bg-white dark:bg-[#0c102a] rounded-[24px] sm:rounded-[32px] lg:rounded-[36px] ${
          isMobileLayout
            ? 'pl-16 sm:pl-24 pr-5 sm:pr-8 py-5 sm:py-7 min-h-[240px]'
            : 'pl-20 sm:pl-28 lg:pl-36 pr-6 sm:pr-10 lg:pr-12 py-6 sm:py-8 lg:py-10 min-h-[260px] sm:min-h-[290px] lg:min-h-[320px]'
        } border-4 border-slate-900 dark:border-cyan-500/40 shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between h-full ${
          isActive ? 'border-slate-900 dark:border-cyan-400' : 'opacity-90'
        }`}
      >
        {/* Dynamic Spotlight Follower for Active Card */}
        {isActive && !isMobileLayout && (
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(350px circle at ${cursorPos.x}% ${cursorPos.y}%, rgba(6, 182, 212, 0.15), transparent 80%)`,
            }}
          />
        )}

        {/* FAR RIGHT CURVED BLUE ACCENT SHIELD WING */}
        <div
          className={`absolute right-0 top-0 bottom-0 ${
            isMobileLayout ? 'w-5 sm:w-8' : 'w-6 sm:w-10 lg:w-12'
          } bg-[#1e56d8] dark:bg-blue-600 rounded-r-[24px] sm:rounded-r-[32px] lg:rounded-r-[36px] rounded-l-[50%] pointer-events-none z-10 shadow-md`}
        />

        {/* Top Right Badge */}
        <div className="flex justify-end mb-2 relative z-20">
          {product.badgeType === 'new' ? (
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest px-3 sm:px-3.5 py-1 rounded-full text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-500/40 shadow-sm">
              {product.badgeText}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-black uppercase tracking-widest px-3 sm:px-3.5 py-1 rounded-full text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/40 shadow-sm">
              {product.badgeText}
            </span>
          )}
        </div>

        {/* Title & Description */}
        <div className="my-auto relative z-20">
          <h3 className="text-lg sm:text-2xl lg:text-3xl font-black text-slate-950 dark:text-white tracking-tight mb-1.5 sm:mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
            {product.title}
          </h3>
          <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed mb-4 sm:mb-5 max-w-md">
            {product.description}
          </p>
        </div>

        {/* CTA Pill Button */}
        <div className="relative z-20 w-full sm:w-auto">
          <Button
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            icon={ExternalLink}
          >
            CHECK WEBSITE
          </Button>
        </div>

      </div>
    </motion.div>
  );
}
