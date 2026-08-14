'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Button({
  children,
  href,
  onClick,
  type = 'button',
  variant = 'primary', // 'primary' | 'secondary' | 'outline'
  showArrow = false,
  icon: Icon,
  className = '',
  target,
  rel,
  disabled = false,
}) {
  const baseStyles =
    'relative inline-flex items-center justify-center rounded-full font-extrabold text-xs uppercase tracking-wider transition-all duration-300 overflow-hidden group cursor-pointer shadow-md select-none shrink-0';

  const sizeStyles = 'px-7 py-3.5';

  const variants = {
    primary:
      'bg-[#050714] text-white hover:bg-cyan-500 hover:text-slate-950 dark:bg-gradient-to-r dark:from-indigo-600 dark:via-purple-600 dark:to-blue-600 dark:hover:from-indigo-500 dark:hover:to-blue-500 dark:text-white border border-cyan-500/30 hover:border-cyan-400 shadow-indigo-500/20 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]',
    secondary:
      'bg-white/90 dark:bg-white/10 text-slate-900 dark:text-white border border-slate-300 dark:border-white/20 hover:bg-white dark:hover:bg-white/20 shadow-sm backdrop-blur-md',
    outline:
      'border-2 border-slate-900 dark:border-cyan-400 text-slate-900 dark:text-cyan-300 hover:bg-slate-950 hover:text-white dark:hover:bg-cyan-500 dark:hover:text-slate-950',
  };

  const content = (
    <>
      {/* Water / Light Shimmer Flare */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
        {Icon && <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />}
        {showArrow && !Icon && (
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 font-black text-sm">
            &rarr;
          </span>
        )}
      </span>
    </>
  );

  // Filter display/layout classes for outer motion wrapper so background styling applies ONLY to the button element
  const outerDisplayClasses = className
    .split(' ')
    .filter((c) => c.includes('hidden') || c.includes('block') || c.includes('flex') || c.includes('grid'))
    .join(' ');

  const hasCustomBg = className.includes('bg-');
  const activeVariant = variants[variant] || variants.primary;
  const finalVariant = hasCustomBg
    ? activeVariant.replace(/bg-\[[^\]]+\]|bg-[a-z0-9\/-]+/gi, '').trim()
    : activeVariant;

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className={`inline-block ${outerDisplayClasses}`.trim()}>
        <Link
          href={href}
          onClick={onClick}
          target={target}
          rel={rel}
          suppressHydrationWarning
          className={`${baseStyles} ${sizeStyles} ${finalVariant} ${className}`}
        >
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className={`inline-block ${outerDisplayClasses}`.trim()}>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        suppressHydrationWarning
        className={`${baseStyles} ${sizeStyles} ${finalVariant} ${className}`}
      >
        {content}
      </button>
    </motion.div>
  );
}
