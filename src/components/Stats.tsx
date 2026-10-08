import React, { useState, useEffect, useRef } from 'react';
import { STATS } from '../data/gymData';

export const Stats: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    years: 0,
    members: 0,
    trainers: 0,
    facility: 0,
  });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const duration = 2000;
    const startTimestamp = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCounts({
        years: Math.floor(ease * 10),
        members: Math.floor(ease * 2500),
        trainers: Math.floor(ease * 25),
        facility: Math.floor(ease * 15000),
      });

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 -mt-6 sm:-mt-8 md:-mt-10 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8"
      aria-label="Key Gym Statistics"
    >
      <div className="rounded-2xl bg-dark-900/95 border border-white/10 backdrop-blur-xl shadow-2xl p-4 sm:p-7 md:p-9 relative overflow-hidden">
        {/* Subtle decorative gold ambient glow line on top */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
        
        {/* 2 columns on mobile/tablet portrait, 4 columns on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
          {STATS.map((stat, idx) => {
            const countValue = counts[stat.id] || 0;
            const displayValue = countValue.toLocaleString();

            return (
              <div
                key={stat.id}
                className={`flex flex-col items-center text-center p-3 sm:p-4 rounded-xl bg-white/[0.02] lg:bg-transparent border border-white/5 lg:border-none ${
                  idx < 3 ? 'lg:border-r lg:border-white/10' : ''
                }`}
              >
                <div className="flex items-baseline gap-0.5 mb-1 sm:mb-2">
                  <span className="font-display font-extrabold text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
                    {displayValue}
                  </span>
                  <span className="font-display font-extrabold text-xl xs:text-2xl sm:text-3xl md:text-4xl text-gold-400">
                    {stat.suffix}
                  </span>
                </div>
                <h3 className="font-display font-bold text-[10px] xs:text-xs sm:text-sm uppercase tracking-[0.14em] sm:tracking-[0.18em] text-zinc-200 mb-0.5 sm:mb-1">
                  {stat.label}
                </h3>
                <p className="text-[10px] sm:text-xs text-zinc-400 font-medium line-clamp-1 sm:line-clamp-none">
                  {stat.sub}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
