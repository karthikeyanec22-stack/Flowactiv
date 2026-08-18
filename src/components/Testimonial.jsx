'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Testimonial() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: 'Samantha Nguyen',
      role: 'Founder of Dane Technologies',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
      rating: 5,
      review:
        'They transformed our legacy infrastructure into a high-speed Next.js app in record time. Our platform performance increased drastically, and user engagement shot up by 40% in the first month.',
    },
    {
      id: 2,
      name: 'David Chen',
      role: 'Head of Product at CloudScale AI',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      rating: 5,
      review:
        'The attention to detail in UI/UX and cross-platform mobile performance is unmatched. Their engineering team felt like an indispensable extension of our own internal company.',
    },
    {
      id: 3,
      name: 'Elena Rostova',
      role: 'Co-Founder of Apex Digital',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300',
      rating: 5,
      review:
        'Delivered a rock-solid enterprise backend with automated CI/CD DevOps pipelines. Scalability and system security concerns are now completely off our plate thanks to their expertise.',
    },
    {
      id: 4,
      name: 'Marcus Vance',
      role: 'VP of Engineering at SwiftPay',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
      rating: 5,
      review:
        'Working with them was a breeze from day one. The custom workflow automations they developed saved our team hundreds of manual data-processing hours every week.',
    },
    {
      id: 5,
      name: 'Priya Patel',
      role: 'Founder of HealthPulse AI',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=300',
      rating: 5,
      review:
        'From concept wireframes to production release, they executed flawlessly. Their AI model integrations gave our core software product a huge competitive market advantage.',
    },
    {
      id: 6,
      name: 'Liam Gallagher',
      role: 'CTO at Horizon FinTech',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
      rating: 5,
      review:
        'Outstanding communication, clean modular code standards, and top-tier execution. I highly recommend them to any enterprise looking to build scalable software solutions fast.',
    },
  ];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-scroll every 3 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  return (
    <section
      id="testimonials"
      className="scroll-mt-16 sm:scroll-mt-20 pt-4 sm:pt-10 pb-8 sm:pb-20 relative w-full bg-[#f8fafc] dark:bg-[#02050e] text-slate-950 dark:text-white overflow-hidden transition-colors duration-500"
    >
      {/* AMBIENT BACKGROUND GLOW ORBS */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.2, 0.45, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-cyan-500/15 via-blue-600/15 to-purple-600/15 rounded-full blur-[140px] pointer-events-none z-0"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER SECTION */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '200px 0px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="text-[13px] sm:text-sm font-black tracking-widest uppercase text-cyan-600 dark:text-cyan-400 mb-3 block">
            TESTIMONIALS
          </span>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 dark:text-white leading-tight">
            What Our Clients Say
          </h2>
        </motion.div>
      </div>

      {/* ============================================================== */}
      {/* AUTO-SCROLL CAROUSEL STAGE                                    */}
      {/* ============================================================== */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className="relative w-full max-w-4xl mx-auto px-4 overflow-hidden py-2 z-10 select-none"
      >
        <div className="relative w-full overflow-hidden rounded-3xl">
          <motion.div
            className="flex w-full"
            animate={{ x: `-${activeIdx * 100}%` }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          >
            {testimonials.map((item) => (
              <div key={item.id} className="w-full shrink-0 p-2">
                <div className="group relative bg-white dark:bg-[#0c102b] border-2 border-slate-200/90 dark:border-indigo-900/40 rounded-3xl p-6 sm:p-10 flex flex-col justify-between overflow-hidden shadow-md dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:border-cyan-500/50 dark:hover:border-cyan-400/50 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-bl-full blur-2xl pointer-events-none" />

                  <div>
                    {/* User Profile Header */}
                    <div className="flex items-center gap-4 sm:gap-5 mb-5 sm:mb-6">
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-cyan-400/80 dark:border-cyan-400/60 shadow-md shrink-0">
                        <Image
                          src={item.avatar}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="64px"
                        />
                      </div>

                      <div className="text-left">
                        <h3 className="text-lg sm:text-xl font-bold text-[#0b0e1e] dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                          {item.role}
                        </p>
                      </div>
                    </div>

                    {/* 5 Stars */}
                    <div className="flex items-center gap-1.5 mb-4 sm:mb-5">
                      {[...Array(item.rating)].map((_, starIdx) => (
                        <Star
                          key={starIdx}
                          className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                        />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-normal text-left max-w-3xl">
                      &ldquo;{item.review}&rdquo;
                    </p>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-slate-300 dark:text-white/10 group-hover:text-cyan-500/30 transition-colors duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* CHEVRON NAVIGATION CONTROLS & PAGINATION DOTS BELOW CAROUSEL */}
        <div className="flex items-center justify-center gap-4 mt-6 z-20">
          {/* Left Chevron Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous testimonial"
            suppressHydrationWarning
            className="w-10 h-10 rounded-full bg-white dark:bg-[#121638] border-2 border-cyan-500/50 dark:border-purple-500/60 text-slate-800 dark:text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
          </button>

          {/* Pagination Dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIdx(idx)}
                suppressHydrationWarning
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === activeIdx
                    ? 'w-6 h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_8px_#06b6d4]'
                    : 'w-2 h-2 bg-slate-300 dark:bg-slate-700'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

          {/* Right Chevron Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next testimonial"
            suppressHydrationWarning
            className="w-10 h-10 rounded-full bg-white dark:bg-[#121638] border-2 border-cyan-500/50 dark:border-purple-500/60 text-slate-800 dark:text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
          </button>
        </div>
      </div>
    </section>
  );
}