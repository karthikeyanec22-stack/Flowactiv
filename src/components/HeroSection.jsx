'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Calendar,
  Clock,
  User,
  Mail,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react';
import Button from './Button';
import Portal from './Portal';
import { scrollToContact } from '@/utils/scrollToContact';

// ============================================================================
// ANIMATED 3D SCI-FI CYAN TUNNEL CANVAS BACKGROUND
// ============================================================================
function SciFiCyanTunnelBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse tracking for camera tilt
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 80;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 50;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Tunnel Rings configuration - optimized for 60fps performance on mobile
    const isMobile = window.innerWidth < 768;
    const NUM_RINGS = isMobile ? 14 : 28;
    const MAX_Z = 1200;
    const MIN_Z = 20;
    const SPEED = 4.5;
    const FOV = 380;

    // Initialize Ring Z positions
    const rings = Array.from({ length: NUM_RINGS }, (_, i) => ({
      z: MIN_Z + (i / NUM_RINGS) * (MAX_Z - MIN_Z),
    }));

    // Render loop
    const render = () => {
      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.fillStyle = '#020612';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2 + mouseX;
      const cy = height / 2 + mouseY;

      // Base tunnel size at scale 1
      const baseW = width * 1.1;
      const baseH = height * 1.0;

      // Update & sort rings from back to front
      rings.forEach((ring) => {
        ring.z -= SPEED;
        if (ring.z <= MIN_Z) {
          ring.z = MAX_Z;
        }
      });

      // Draw longitudinal connecting tunnel perspective corner lines
      const sortedRings = [...rings].sort((a, b) => b.z - a.z);

      const corners = [
        { dx: -0.5, dy: -0.5 }, // Top-Left
        { dx: 0.5, dy: -0.5 },  // Top-Right
        { dx: 0.5, dy: 0.5 },   // Bottom-Right
        { dx: -0.5, dy: 0.5 },  // Bottom-Left
        { dx: -0.25, dy: -0.5 }, // Ceiling left rail
        { dx: 0.25, dy: -0.5 },  // Ceiling right rail
        { dx: -0.25, dy: 0.5 },  // Floor left rail
        { dx: 0.25, dy: 0.5 },   // Floor right rail
      ];

      corners.forEach((c) => {
        ctx.beginPath();
        sortedRings.forEach((ring, idx) => {
          const scale = FOV / (FOV + ring.z);
          const px = cx + c.dx * baseW * scale;
          const py = cy + c.dy * baseH * scale;

          if (idx === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });

        ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Draw Tunnel Rings & Neon Cyan Portal Light Blocks
      sortedRings.forEach((ring) => {
        const scale = FOV / (FOV + ring.z);
        const rw = baseW * scale;
        const rh = baseH * scale;
        const rx = cx - rw / 2;
        const ry = cy - rh / 2;

        // Calculate opacity based on depth distance
        const depthRatio = 1 - (ring.z - MIN_Z) / (MAX_Z - MIN_Z);
        const ringAlpha = Math.sin(depthRatio * Math.PI) * 0.85;

        if (ringAlpha <= 0.02) return;

        ctx.save();

        // Outer Ring Border with Cyan Glow
        ctx.shadowColor = '#00f3ff';
        ctx.shadowBlur = 12 * scale;
        ctx.strokeStyle = `rgba(6, 243, 255, ${ringAlpha * 0.7})`;
        ctx.lineWidth = Math.max(1, 2.5 * scale);

        // Draw Octagonal / Curved Tunnel Frame
        const radius = Math.min(rw, rh) * 0.12;
        ctx.beginPath();
        ctx.roundRect(rx, ry, rw, rh, radius);
        ctx.stroke();

        // Cyan Glowing Wall Light Rectangles (Side Panels like reference)
        const panelW = 32 * scale;
        const panelH = 18 * scale;

        ctx.fillStyle = `rgba(0, 243, 255, ${ringAlpha * 0.9})`;
        ctx.shadowBlur = 18 * scale;

        // Left wall light panels
        ctx.fillRect(rx - panelW / 2, ry + rh * 0.2, panelW, panelH);
        ctx.fillRect(rx - panelW / 2, ry + rh * 0.7, panelW, panelH);

        // Right wall light panels
        ctx.fillRect(rx + rw - panelW / 2, ry + rh * 0.2, panelW, panelH);
        ctx.fillRect(rx + rw - panelW / 2, ry + rh * 0.7, panelW, panelH);

        // Top ceiling square light panels
        const ceilW = 24 * scale;
        const ceilH = 14 * scale;
        ctx.fillRect(cx - rw * 0.25 - ceilW / 2, ry - ceilH / 2, ceilW, ceilH);
        ctx.fillRect(cx + rw * 0.25 - ceilW / 2, ry - ceilH / 2, ceilW, ceilH);

        // Floor cyan neon bar reflection
        ctx.fillRect(cx - rw * 0.35, ry + rh - 3 * scale, rw * 0.7, 5 * scale);

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#02050e]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Central Horizon Vanishing Light Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.25)_0%,transparent_60%)] pointer-events-none" />

      {/* Dark Vignette Overlay for Crisp Contrast & Easy Text Readability */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(2,5,14,0.85)_85%)] pointer-events-none" />
    </div>
  );
}

// ============================================================================
// MAIN HERO SECTION WITH SCI-FI MOVING CYAN TUNNEL BACKGROUND
// ============================================================================
export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    topic: '',
  });

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
    <section id="hero" className="scroll-mt-28 relative min-h-screen w-full overflow-hidden bg-[#02050e] text-white flex items-center justify-center pt-24 sm:pt-28 pb-12 sm:pb-16">
      {/* 3D MOVING SCI-FI CYAN TUNNEL BACKGROUND */}
      <SciFiCyanTunnelBackground />

      {/* MAIN HERO CONTENT CONTAINER */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
        <div className="relative z-10 flex flex-col items-center">


          <h1 className="text-2xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4 sm:mb-6 leading-[1.15] drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
            Building Scalable Digital Products for Modern Businesses.
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg text-slate-200 font-medium max-w-2xl mb-6 sm:mb-10 leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            We design, develop, and launch powerful web and mobile applications that help startups and enterprises grow faster.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-5 items-center w-full sm:w-auto">
            {/* Primary Button */}
            <Button href="#contact" onClick={scrollToContact}>
              START YOUR PROJECT
            </Button>

            {/* Secondary Schedule Call Modal Trigger Button */}
            <Button
              variant="secondary"
              onClick={() => setIsModalOpen(true)}
            >
              SCHEDULE A CALL
            </Button>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SCHEDULE DISCOVERY CALL MODAL DIALOG                            */}
      {/* ============================================================== */}
      <Portal>
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              {/* Backdrop Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
              />

              {/* Modal Card Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="relative w-full max-w-lg bg-white text-slate-950 border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-2xl text-left z-10 overflow-y-auto max-h-[85vh] sm:max-h-[90vh]"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  suppressHydrationWarning
                  className="absolute top-5 right-5 p-2 rounded-full text-slate-500 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Form Content */}
                {!isSubmitted ? (
                  <>
                    <div className="mb-6">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/40 bg-cyan-50 text-cyan-700 text-[10px] font-bold tracking-widest uppercase mb-3">
                        Free Consultation
                      </div>
                      <h3 className="text-2xl font-black text-slate-950 tracking-tight">
                        Schedule a Discovery Call
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1">
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
                            placeholder="e.g. Alex Morgan"
                            className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-cyan-600 transition-colors font-medium placeholder:text-slate-400"
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
                            placeholder="alex@company.com"
                            className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-cyan-600 transition-colors font-medium placeholder:text-slate-400"
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
                            className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-cyan-600 transition-colors resize-none placeholder:text-slate-400 font-medium"
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
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
