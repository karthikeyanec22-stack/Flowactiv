'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import Button from './Button';

export default function Navbar() {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'PRODUCTS', badge: 'NEW', href: '#products' },
    { name: 'SERVICES', href: '#services' },
    { name: 'OUR EXCELLENCE', href: '#excellence' },
    { name: 'GLOBAL RECOGNITION', href: '#recognition' },
    { name: 'CASE STUDIES', href: '#case-studies' },
    { name: 'TESTIMONIALS', href: '#testimonials' },
    { name: "FAQ'S", href: '#faq' },
  ];

  const handleMobileNavClick = (idx) => {
    setActiveIdx(idx);
    setMobileMenuOpen(false);
  };

  const handleContactClick = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (mobileMenuOpen) setMobileMenuOpen(false);

    const targetEl = document.getElementById('contact-wrapper') || document.getElementById('contact') || document.getElementById('footer');
    if (targetEl) {
      const topPos = targetEl.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: topPos,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#02050e]/85 backdrop-blur-md border-b border-slate-200/80 dark:border-white/5 transition-colors duration-300 will-change-transform">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">

        {/* Brand Logo */}
        <Link href="/" className="flex flex-col items-center leading-none group shrink-0">
          <div className="relative w-16 sm:w-20 h-7 flex items-center justify-center overflow-hidden">
            <Image
              src="/images/logo-transparent.png"
              alt="Flowactiv Icon"
              width={64}
              height={28}
              className="w-full h-auto group-hover:scale-105 transition-transform duration-300 invert dark:invert-0"
              priority
            />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-950 dark:text-white transition-colors duration-300 -mt-0.5">
            flowactiv
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden lg:flex items-center gap-1"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          {navLinks.map((link, idx) => {
            const isActive = activeIdx === idx;
            const isHovered = hoveredIdx === idx;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setActiveIdx(idx)}
                onMouseEnter={() => setHoveredIdx(idx)}
                className="relative px-3.5 py-2.5 text-[11px] font-extrabold tracking-wider transition-colors duration-300 flex items-center gap-1.5 uppercase cursor-pointer"
              >
                <motion.div
                  whileTap={{ scale: 0.96 }}
                  className="relative flex items-center gap-1.5 z-10 pointer-events-none"
                >
                  <span
                    className={`transition-all duration-200 ${isActive
                      ? 'text-cyan-700 dark:text-cyan-400 font-black drop-shadow-sm'
                      : isHovered
                      ? 'text-cyan-600 dark:text-cyan-300'
                      : 'text-slate-800 dark:text-slate-400'
                      }`}
                  >
                    {link.name}
                  </span>

                  {link.badge && (
                    <span className="bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-400 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-widest border border-emerald-600/30 dark:border-emerald-500/30">
                      {link.badge}
                    </span>
                  )}
                </motion.div>

                {/* Animated Active Underline Bar ONLY */}
                {isActive && (
                  <motion.div
                    layoutId="nav-active-line"
                    className="absolute bottom-0 left-1 right-1 h-[2.5px] bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 dark:from-cyan-400 dark:via-blue-400 dark:to-cyan-300 rounded-full shadow-[0_0_10px_#06b6d4] z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}

                {/* Subtle Hover Underline Bar for Inactive Items */}
                {isHovered && !isActive && (
                  <motion.div
                    layoutId="nav-hover-line"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-cyan-500/50 dark:bg-cyan-400/50 rounded-full z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Area */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Button
            href="#contact"
            onClick={handleContactClick}
            showArrow={true}
            className="hidden sm:inline-flex"
          >
            CONTACT US
          </Button>

          {/* Mobile 3-Line Options Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            suppressHydrationWarning
            className="lg:hidden p-2.5 rounded-xl text-slate-800 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Responsive Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-white/95 dark:bg-[#050714]/95 border-b border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-2xl"
          >
            <div className="px-6 pt-4 pb-8 space-y-2 flex flex-col">
              {navLinks.map((link, idx) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => handleMobileNavClick(idx)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-black tracking-widest uppercase transition-all duration-200 ${activeIdx === idx
                    ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-400/30'
                    : 'text-slate-900 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-cyan-600 dark:hover:text-cyan-400'
                    }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-400 text-[10px] px-2 py-0.5 rounded font-black uppercase tracking-widest border border-emerald-600/30 dark:border-emerald-500/30">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}

              <div className="pt-4 flex justify-center">
                <Button
                  href="#contact"
                  onClick={handleContactClick}
                  showArrow={true}
                  className="w-full"
                >
                  CONTACT US
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}