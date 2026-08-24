'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Minus,
  X,
  Calendar,
  Clock,
  User,
  Mail,
  MessageSquare,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import Button from './Button';
import Portal from './Portal';
import { scrollToContact } from '@/utils/scrollToContact';

export default function FaqSection() {
  // Accordion open index
  const [openIndex, setOpenIndex] = useState(0);

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    topic: '',
  });

  const faqs = [
    {
      question: 'What is FlowActiv Private Limited?',
      answer:
        'FlowActiv Private Limited is a Coimbatore-based organization building technology-driven businesses and digital solutions across areas including education and business technology.',
    },
    {
      question: 'What businesses operate under FlowActiv?',
      answer:
        'The current FlowActiv ecosystem includes GetAir1 (an AI-powered learning and competitive-exam preparation platform) and Shrewd Business Solutions (a business and technology solutions company).',
    },
    {
      question: 'How are GetAir1 and Shrewd connected to FlowActiv?',
      answer:
        'GetAir1 and Shrewd Business Solutions operate as specialized business divisions within the broader FlowActiv ecosystem, focusing on different customer needs while sharing the organization’s technology and innovation-driven approach.',
    },
    {
      question: 'What is GetAir1 and who is it for?',
      answer:
        'GetAir1 is an AI-powered learning and preparation platform designed to help competitive-exam aspirants learn, practice, and prepare through mock tests, live practice, and analytics. It supports competitive examinations including TNPSC.',
    },
    {
      question: 'What services does Shrewd Business Solutions provide?',
      answer:
        'Shrewd Business Solutions provides high-performance website development (React, PHP, Laravel, WordPress, Shopify, WooCommerce), mobile app development (iOS & Android), ERP & CRM software, cloud services, QA testing, digital marketing, and graphic design.',
    },
    {
      question: 'Who can work with Shrewd Business Solutions?',
      answer:
        'Shrewd Business Solutions works with SMEs, enterprises, startups, and organizations across sectors including Healthcare, Real Estate, Retail & FMCG, Education, Hospitality, and Architecture to improve their digital presence and operations.',
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsModalOpen(false);
      setFormData({ name: '', email: '', date: '', time: '', topic: '' });
    }, 2800);
  };

  return (
    <section
      id="faq"
      className="scroll-mt-16 sm:scroll-mt-20 pt-4 sm:pt-10 pb-8 sm:pb-20 relative w-full bg-[#f8fafc] dark:bg-[#02050e] text-slate-950 dark:text-white overflow-hidden transition-colors duration-500"
    >


      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '200px 0px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-6 sm:mb-12"
        >
          <span className="text-[13px] sm:text-sm font-black tracking-widest uppercase text-cyan-600 dark:text-cyan-400 mb-3 block">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 dark:text-white leading-tight">
            Find Answers To Common Questions
          </h2>
        </motion.div>

        {/* Accordion Container */}
        <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-16">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                  ? 'bg-white dark:bg-[#0c102e] border-cyan-500/60 dark:border-cyan-500/40 shadow-lg dark:shadow-[0_10px_30px_rgba(6,182,212,0.15)]'
                  : 'bg-white/80 dark:bg-[#07091c]/80 border-slate-200/90 dark:border-indigo-900/30 hover:border-cyan-400/50 dark:hover:border-cyan-500/30'
                  }`}
              >
                {/* Accordion Header Button */}
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  suppressHydrationWarning
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none cursor-pointer select-none"
                >
                  <span className="text-base sm:text-lg font-bold text-[#0b0e1e] dark:text-white tracking-tight">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-700 dark:text-slate-300">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                    ) : (
                      <Plus className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Animated Expandable Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.35,
                        ease: [0.21, 0.47, 0.32, 0.98],
                      }}
                    >
                      <div className="px-6 pb-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal border-t border-slate-100 dark:border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Banner with White Theme Support */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[28px] bg-white dark:bg-[#07091c] border-2 border-slate-200/90 dark:border-indigo-900/50 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-2xl transition-colors duration-500"
        >
          {/* Soft Ambient Glow Flare Background */}
          <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-cyan-400/20 dark:bg-cyan-500/30 rounded-full blur-3xl pointer-events-none" />

          {/* Banner Text */}
          <div className="text-center md:text-left z-10">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-950 dark:text-white tracking-tight mb-2">
              Ready to Build Your Next Digital Product?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
              We&apos;re the team that delivers next gen IT Solution.
            </p>
          </div>

          {/* Banner Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 z-10 w-full md:w-auto">
            <Button href="#contact" onClick={scrollToContact}>
              START YOUR PROJECT
            </Button>

            {/* SCHEDULE CALL BUTTON - OPENS MODAL */}
            <Button
              variant="secondary"
              onClick={() => setIsModalOpen(true)}
            >
              SCHEDULE CALL
            </Button>
          </div>
        </motion.div>
      </div>

      {/* ============================================================== */}
      {/* SCHEDULE A CALL FORM MODAL                                     */}
      {/* ============================================================== */}
      <Portal>
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              {/* Modal Backdrop Blur */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
              />

              {/* Modal Card Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="relative w-full max-w-lg bg-white text-slate-950 border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-2xl text-left z-10 overflow-y-auto max-h-[85vh] sm:max-h-[90vh]"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  suppressHydrationWarning
                  className="absolute top-5 right-5 p-2 rounded-full text-slate-500 hover:text-slate-950 hover:bg-slate-100 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Form Content */}
                {!isSubmitted ? (
                  <>
                    <div className="mb-4">
                      <span className="text-[11px] font-extrabold uppercase tracking-widest text-cyan-600 mb-1 block">
                        FREE CONSULTATION
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                        Schedule a Discovery Call
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5 font-medium">
                        Pick a time with our technical team to discuss your project requirements.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Your Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="e.g. Karthikeyan M"
                            className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-cyan-600 transition-colors placeholder:text-slate-400"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Work Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="karthikeyan@shrewdbs.com"
                            className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-cyan-600 transition-colors placeholder:text-slate-400"
                          />
                        </div>
                      </div>

                      {/* Date & Time Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Preferred Date Field */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                            Preferred Date
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
                            <input
                              type="date"
                              name="date"
                              required
                              min={new Date().toISOString().split('T')[0]}
                              value={formData.date}
                              onChange={handleInputChange}
                              onClick={(e) => e.target.showPicker && e.target.showPicker()}
                              className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-cyan-600 transition-colors cursor-pointer font-medium"
                            />
                          </div>
                        </div>

                        {/* Preferred Time Field (12-Hour AM/PM Format) */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                            Preferred Time (AM/PM)
                          </label>
                          <div className="relative">
                            <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
                            <select
                              name="time"
                              required
                              value={formData.time}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-8 py-3 text-sm rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-cyan-600 transition-colors cursor-pointer appearance-none font-medium"
                            >
                              <option value="" disabled>Select Time (AM/PM)</option>
                              <option value="09:00 AM">09:00 AM</option>
                              <option value="10:00 AM">10:00 AM</option>
                              <option value="11:00 AM">11:00 AM</option>
                              <option value="12:00 PM">12:00 PM (Noon)</option>
                              <option value="01:00 PM">01:00 PM</option>
                              <option value="02:00 PM">02:00 PM</option>
                              <option value="03:00 PM">03:00 PM</option>
                              <option value="04:00 PM">04:00 PM</option>
                              <option value="05:00 PM">05:00 PM</option>
                              <option value="06:00 PM">06:00 PM</option>
                              <option value="07:00 PM">07:00 PM</option>
                            </select>
                            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                              ▼
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Topic/Notes */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Project Overview / Topic
                        </label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                          <textarea
                            name="topic"
                            rows="3"
                            value={formData.topic}
                            onChange={handleInputChange}
                            placeholder="Tell us briefly about what you're building..."
                            className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-cyan-600 transition-colors resize-none placeholder:text-slate-400"
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        suppressHydrationWarning
                        className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer"
                      >
                        Confirm Schedule Request
                      </button>
                    </form>
                  </>
                ) : (
                  /* Success Confirmation View */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 text-center flex flex-col items-center"
                  >
                    <CheckCircle2 className="w-16 h-16 text-cyan-600 mb-4 animate-bounce" />
                    <h3 className="text-xl font-extrabold text-slate-950 mb-2">
                      Discovery Call Requested!
                    </h3>
                    <p className="text-xs text-slate-600 max-w-xs font-medium">
                      Our engineering team will review your project details and send a calendar invitation to {formData.email}.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </Portal>
    </section>
  );
}