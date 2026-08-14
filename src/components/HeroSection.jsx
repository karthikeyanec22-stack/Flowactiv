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

    // Tunnel Rings configuration
    const NUM_RINGS = 28;
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
    <section className="relative h-screen w-full overflow-hidden bg-[#02050e] text-white flex items-center justify-center">
      {/* 3D MOVING SCI-FI CYAN TUNNEL BACKGROUND */}
      <SciFiCyanTunnelBackground />

      {/* MAIN HERO CONTENT CONTAINER */}
      <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <div className="relative z-10 flex flex-col items-center">


          {/* Heading H1 */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-[1.12] drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
            Building Scalable Digital Products for Modern Businesses.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-200 font-medium max-w-2xl mb-10 leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            We design, develop, and launch powerful web and mobile applications that help startups and enterprises grow faster.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 items-center w-full sm:w-auto">
            {/* Primary Button */}
            <Button href="#contact">
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
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
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
              className="relative w-full max-w-lg bg-[#0c102b] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-left z-10 overflow-hidden"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                suppressHydrationWarning
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Form Content */}
              {!isSubmitted ? (
                <>
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-cyan-500/40 bg-cyan-950/50 text-cyan-300 text-[10px] font-extrabold tracking-widest uppercase mb-3 shadow-sm">
                      FREE CONSULTATION
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-tight">
                      Schedule a Discovery Call
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                      Pick a time with our technical team to discuss your project requirements.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-1.5">
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
                          suppressHydrationWarning
                          className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500 transition-colors font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-1.5">
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
                          suppressHydrationWarning
                          className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500 transition-colors font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-1.5">
                          Preferred Date
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="date"
                            name="date"
                            required
                            value={formData.date}
                            onChange={handleInputChange}
                            suppressHydrationWarning
                            className="w-full pl-10 pr-3 py-3 text-xs rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500 transition-colors font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-1.5">
                          Preferred Time
                        </label>
                        <div className="relative">
                          <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="time"
                            name="time"
                            required
                            value={formData.time}
                            onChange={handleInputChange}
                            suppressHydrationWarning
                            className="w-full pl-10 pr-3 py-3 text-xs rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500 transition-colors font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-1.5">
                        Project Overview / Topic
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                        <textarea
                          name="topic"
                          rows={3}
                          value={formData.topic}
                          onChange={handleInputChange}
                          placeholder="Tell us briefly about what you're building..."
                          suppressHydrationWarning
                          className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500 transition-colors font-medium resize-none"
                        />
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      suppressHydrationWarning
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-extrabold text-xs uppercase tracking-widest shadow-lg shadow-cyan-500/25 transition-all cursor-pointer mt-2"
                    >
                      Confirm Schedule Request
                    </motion.button>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-cyan-400 animate-bounce" />
                  </div>
                  <h3 className="text-xl font-extrabold text-white mb-2">
                    Discovery Call Requested!
                  </h3>
                  <p className="text-xs text-slate-300 max-w-xs font-medium">
                    Our engineering team will review your project details and send a calendar invitation to {formData.email}.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
