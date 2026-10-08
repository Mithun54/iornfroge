import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle } from 'lucide-react';
import { TESTIMONIALS } from '../data/gymData';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      next();
    }, 6500);
    return () => clearInterval(interval);
  }, [currentIndex, isPaused]);

  const current = TESTIMONIALS[currentIndex];

  return (
    <section
      id="testimonials"
      className="py-16 sm:py-24 md:py-32 bg-dark-900 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 mb-3 sm:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-gold-300">
                PROVEN TRANSFORMATIONS
              </span>
            </div>
            <h2 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white uppercase leading-[1.12]">
              RESULTS SPEAK LOUDER.
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm md:text-base max-w-xl mt-2 sm:mt-3 font-normal">
              Real people. Rigorous standards. Read stories from high-achieving individuals who forged their strongest version at IRONFORGE.
            </p>
          </div>

          {/* Desktop/Tablet Header Arrow Controls */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={prev}
              className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-dark-950 border border-white/10 hover:border-gold-400 text-zinc-300 hover:text-white flex items-center justify-center transition-colors shadow-lg active:scale-95 focus:outline-none"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-dark-950 border border-white/10 hover:border-gold-400 text-zinc-300 hover:text-white flex items-center justify-center transition-colors shadow-lg active:scale-95 focus:outline-none"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Testimonial Card */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-dark-950/80 border border-white/10 p-5 sm:p-10 md:p-14 lg:p-16 shadow-2xl overflow-hidden">
          {/* Subtle gold quote mark watermark */}
          <Quote className="absolute top-6 right-6 w-16 sm:w-24 h-16 sm:h-24 text-white/[0.03] pointer-events-none transform rotate-12" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Member Profile & Metrics (Columns 1-4) */}
            <div className="lg:col-span-4 flex flex-col items-start space-y-3.5 sm:space-y-4">
              <div className="flex items-center gap-4 sm:block">
                <div className="relative flex-shrink-0">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-gold-400/50 shadow-gold-sm"
                  />
                  <span className="absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded-full bg-dark-950 border border-gold-400/40 text-[9px] font-bold text-gold-300 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-gold-400" />
                    <span>VERIFIED</span>
                  </span>
                </div>

                <div className="sm:mt-3">
                  <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                    {current.name}
                  </h3>
                  <p className="text-xs text-zinc-400 font-medium">
                    {current.role}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-zinc-400 font-mono mt-0.5">
                    {current.duration}
                  </p>
                </div>
              </div>

              {/* Goal / Result Badge */}
              <div className="p-2.5 sm:p-3 rounded-xl bg-gold-400/10 border border-gold-400/30 w-full sm:w-auto">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-gold-300 block mb-0.5">
                  Documented Outcome:
                </span>
                <span className="font-display font-extrabold text-xs sm:text-sm text-white">
                  {current.result}
                </span>
              </div>
            </div>

            {/* Right Quote & Rating (Columns 5-12) */}
            <div className="lg:col-span-8 flex flex-col justify-between space-y-5 sm:space-y-6">
              {/* Star Rating */}
              <div className="flex items-center gap-1 sm:gap-1.5">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400 fill-gold-400" />
                ))}
                <span className="ml-2 text-[11px] sm:text-xs font-mono font-bold text-zinc-400">
                  5.0 / 5.0 RATED
                </span>
              </div>

              {/* Quote Text */}
              <blockquote className="font-display text-base sm:text-xl md:text-2xl text-zinc-100 font-semibold leading-relaxed">
                "{current.quote}"
              </blockquote>

              {/* Pagination Dots and Mobile Navigation Controls */}
              <div className="flex items-center justify-between pt-2 sm:pt-4 border-t border-white/5 sm:border-none">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {TESTIMONIALS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        currentIndex === idx ? 'w-6 sm:w-8 bg-gold-400' : 'w-2 bg-white/20 hover:bg-white/40'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Mobile-only prev/next buttons */}
                <div className="flex items-center gap-2 sm:hidden">
                  <button
                    onClick={prev}
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-white flex items-center justify-center active:bg-gold-400 active:text-dark-950 transition-colors"
                    aria-label="Previous Testimonial"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={next}
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-white flex items-center justify-center active:bg-gold-400 active:text-dark-950 transition-colors"
                    aria-label="Next Testimonial"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
