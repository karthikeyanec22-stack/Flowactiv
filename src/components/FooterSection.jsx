'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Share2,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Send,
  CheckCircle2,
} from 'lucide-react';

// ==============================================================
// CUSTOM SOCIAL BRAND SVG ICONS (Guarantees zero undefined imports)
// ==============================================================

function FacebookIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function XIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function InstagramIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function WhatsappIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ==============================================================
// MAIN FOOTER COMPONENT WITH PARALLAX CURTAIN REVEAL ANIMATION
// ==============================================================

export default function FooterSection() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const leftLinks = [
    { name: 'Products', href: '#products' },
    { name: 'Services', href: '#services' },
    { name: 'Our Excellence', href: '#recognition' },
  ];

  const rightLinks = [
    { name: 'Global Recognition', href: '#recognition' },
    { name: 'Casestudies', href: '#case-studies' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: "FAQ's", href: '#faq' },
  ];

  const socialPlatforms = [
    { name: 'Facebook', icon: FacebookIcon, href: 'https://facebook.com' },
    { name: 'X (Twitter)', icon: XIcon, href: 'https://x.com' },
    { name: 'LinkedIn', icon: LinkedinIcon, href: 'https://linkedin.com' },
    { name: 'Instagram', icon: InstagramIcon, href: 'https://instagram.com' },
    { name: 'WhatsApp', icon: WhatsappIcon, href: 'https://whatsapp.com' },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail('');
    }, 3500);
  };

  return (
    <div id="contact-wrapper" className="relative w-full h-auto lg:h-[100vh] [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)]">
      <div className="relative lg:fixed lg:bottom-0 lg:left-0 w-full h-auto lg:h-[100vh] z-0 flex flex-col justify-between bg-[#030612] border-t border-indigo-500/20 text-white overflow-hidden transition-colors duration-500">
        <footer
          id="contact"
          className="relative w-full h-full pt-10 sm:pt-14 pb-0 flex flex-col justify-between"
        >
          <div id="footer" className="scroll-mt-16 sm:scroll-mt-20" />

          {/* Full-Width Edge-to-Edge Container */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            {/* ============================================================== */}
            {/* TOP SECTION: NAVIGATION + EXPLORE + ADDRESS + FOLLOW US       */}
            {/* ============================================================== */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-start mb-2 sm:mb-2.5 relative z-10">
              
              {/* Column 1: NAVIGATION */}
              <div className="col-span-1">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-cyan-400 mb-4 sm:mb-5 block">
                  NAVIGATION
                </span>
                <ul className="space-y-3 sm:space-y-3.5">
                  {leftLinks.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center text-sm sm:text-base font-bold text-white hover:text-cyan-300 transition-colors"
                      >
                        <span>{link.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-2 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-cyan-400" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: EXPLORE (Positioned to the right of NAVIGATION on mobile) */}
              <div className="col-span-1">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-cyan-400 mb-4 sm:mb-5 block">
                  EXPLORE
                </span>
                <ul className="space-y-3 sm:space-y-3.5">
                  {rightLinks.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center text-sm sm:text-base font-bold text-white hover:text-cyan-300 transition-colors"
                      >
                        <span>{link.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-2 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-cyan-400" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: ADDRESS */}
              <div className="col-span-2 sm:col-span-1">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-cyan-400 mb-4 sm:mb-5 block">
                  ADDRESS
                </span>
                <h4 className="text-sm font-bold text-white mb-2.5">
                  FlowActiv Private Limited
                </h4>
                <div className="space-y-3 text-xs sm:text-sm text-indigo-200/80 font-medium">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      175, Chandragiri Building, 2nd Floor, Avaram Palayam Road, Coimbatore, Tamil Nadu – 641044, India.
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                    <a href="tel:9952744699" className="hover:text-cyan-300 transition-colors">
                      99527 44699
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                    <a href="mailto:info@flowactiv.com" className="hover:text-cyan-300 transition-colors">
                      info@flowactiv.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Column 4: FOLLOW US */}
              <div className="col-span-2 sm:col-span-1">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-cyan-400 mb-4 sm:mb-5 block">
                  FOLLOW US
                </span>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    {socialPlatforms.map((social, idx) => {
                      const IconComponent = social.icon;
                      return (
                        <motion.a
                          key={idx}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.15, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-9 h-9 rounded-full bg-white/10 hover:bg-cyan-400 hover:text-slate-950 text-indigo-200 border border-white/15 flex items-center justify-center transition-all duration-300 shadow-sm"
                          aria-label={social.name}
                        >
                          <IconComponent className="w-4 h-4" />
                        </motion.a>
                      );
                    })}
                  </div>
                  <p className="text-xs text-indigo-200/60 font-medium leading-relaxed">
                    Connect with us across all social platforms for latest tech updates & insights.
                  </p>

                  {/* Newsletter Email Input Pill */}
                  <AnimatePresence mode="wait">
                    {!isSubscribed ? (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubscribe}
                        className="flex items-center gap-2 p-1.5 rounded-full bg-white/10 border border-white/20 focus-within:border-cyan-400/80 backdrop-blur-md transition-all duration-300 w-full mt-1"
                      >
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your email"
                          suppressHydrationWarning
                          className="w-full px-4 py-2 text-xs text-white placeholder-indigo-200/50 bg-transparent focus:outline-none"
                        />
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          suppressHydrationWarning
                          className="w-9 h-9 rounded-full bg-white text-[#090620] hover:bg-cyan-400 flex items-center justify-center transition-all duration-300 shadow-md shrink-0 cursor-pointer"
                          aria-label="Submit Email"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </motion.form>
                    ) : (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-3 rounded-full bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-wider w-full mt-1"
                      >
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 animate-bounce" />
                        <span>Subscribed!</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </div>

          </div>

          {/* ============================================================== */}
          {/* FULL-WIDTH BRAND LOCKUP (CENTERED ABOVE COPYRIGHT BAR)        */}
          {/* ============================================================== */}
          <div className="w-full pt-0 pb-0 relative z-10 flex items-center justify-center overflow-hidden">
            <div className="inline-flex items-center justify-center gap-2.5 sm:gap-6 lg:gap-8 group cursor-default select-none px-4 max-w-full">
              {/* Pure White Transparent Logo Icon matching text height */}
              <div className="relative w-9 sm:w-[9.5vw] lg:w-[11vw] h-auto flex items-center justify-center shrink-0">
                <Image
                  src="/images/logo-transparent.png"
                  alt="Flowactiv Brand Logo"
                  width={300}
                  height={140}
                  className="w-full h-auto opacity-100 group-hover:scale-105 transition-transform duration-500 filter drop-shadow-md"
                  priority
                />
              </div>
              {/* Giant Pure White Brand Typography "flowactiv" */}
              <h1 className="text-4xl sm:text-[9.5vw] lg:text-[11vw] font-bold tracking-tight text-white leading-none whitespace-nowrap drop-shadow-md">
                flowactiv
              </h1>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            {/* SUBTLE HORIZONTAL DIVIDER */}
            <div className="w-full h-[1px] bg-white/10 my-1" />

            {/* COPYRIGHT & LEGAL LINKS ROW (AT VERY BOTTOM) */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-indigo-200/60 font-medium pb-6 sm:pb-8 text-center sm:text-left">
              <p>© {new Date().getFullYear()} Flowactiv. All rights reserved.</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-6">
                <Link href="#" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  Security
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}