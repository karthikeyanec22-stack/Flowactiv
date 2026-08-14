'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export default function Testimonial() {
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

  // Grid Stagger Container Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  // Card Reveal Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 35, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  };

  // 5 Stars Move Up Variants
  const starVariants = {
    hidden: { opacity: 0, y: 28, scale: 0.4 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 280,
        damping: 14,
        delay: 0.2 + i * 0.09,
      },
    }),
  };

  return (
    <section
      id="testimonials"
      className="scroll-mt-16 sm:scroll-mt-20 pt-6 sm:pt-10 pb-16 sm:pb-20 relative w-full bg-[#f8fafc] dark:bg-[#02050e] text-slate-950 dark:text-white overflow-hidden transition-colors duration-500"
    >
      {/* ============================================================== */}
      {/* AMBIENT BACKGROUND GLOW ORBS                                   */}
      {/* ============================================================== */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.2, 0.45, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-cyan-500/15 via-blue-600/15 to-purple-600/15 rounded-full blur-[140px] pointer-events-none z-0"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ============================================================== */}
        {/* HEADER SECTION                                                 */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '200px 0px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="text-[13px] sm:text-sm font-black tracking-widest uppercase text-cyan-600 dark:text-cyan-400 mb-3 block">
            TESTIMONIALS
          </span>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 dark:text-white leading-tight">
            What Our Clients Say
          </h2>
        </motion.div>

        {/* ============================================================== */}
        {/* 2x3 TESTIMONIAL GRID                                          */}
        {/* ============================================================== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {testimonials.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.015 }}
              className="group relative bg-white dark:bg-[#0c102b] border border-slate-200/90 dark:border-indigo-900/30 rounded-3xl p-7 sm:p-8 flex flex-col justify-between overflow-hidden shadow-sm dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:border-cyan-500/50 dark:hover:border-cyan-400/50 hover:shadow-xl dark:hover:shadow-[0_15px_35px_rgba(6,182,212,0.15)] transition-all duration-300"
            >
              {/* Subtle Card Corner Glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-bl-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div>
                {/* Top User Profile Header */}
                <div className="flex items-center gap-4 mb-6">
                  {/* Avatar Container with Ring Effect */}
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-cyan-400/80 dark:border-cyan-400/60 shadow-md flex-shrink-0">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="56px"
                    />
                  </div>

                  {/* Name and Role */}
                  <div className="text-left">
                    <h3 className="text-base font-bold text-[#0b0e1e] dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {item.role}
                    </p>
                  </div>
                </div>

                {/* 5 Stars: Move Up Staggered Animation */}
                <div className="flex items-center gap-1.5 mb-4">
                  {[...Array(item.rating)].map((_, starIdx) => (
                    <motion.div
                      key={starIdx}
                      custom={starIdx}
                      variants={starVariants}
                    >
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                    </motion.div>
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal text-left relative z-10">
                  &ldquo;{item.review}&rdquo;
                </p>
              </div>

              {/* Decorative Accent Quote Mark */}
              <div className="mt-6 flex justify-end">
                <Quote className="w-6 h-6 text-slate-300 dark:text-white/10 group-hover:text-cyan-500/30 transition-colors duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}