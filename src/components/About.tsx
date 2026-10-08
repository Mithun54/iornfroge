import React from 'react';
import { ArrowRight, Flame, Target, Compass, Users } from 'lucide-react';

interface AboutProps {
  onOpenStoryModal: () => void;
  onOpenTourModal: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenStoryModal, onOpenTourModal }) => {
  return (
    <section id="about" className="py-16 sm:py-24 md:py-32 bg-dark-950 relative overflow-hidden">
      {/* Subtle background ambient mesh */}
      <div className="absolute top-1/2 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-gold-400/5 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-gold-300">
              PHILOSOPHY & CULTURE
            </span>
          </div>
          <h2 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white uppercase max-w-3xl leading-[1.12]">
            MORE THAN A GYM. <br />
            <span className="text-zinc-500">AN ARENA OF EVOLUTION.</span>
          </h2>
        </div>

        {/* Asymmetrical Editorial Layout: stacked on mobile/tablet, 2-column on lg */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Visual Imagery Column (Columns 1-7) */}
          <div className="lg:col-span-7 relative">
            {/* Primary Large Image */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1400&q=85"
                alt="IRONFORGE luxury gym interior with Eleiko equipment"
                className="w-full h-[280px] xs:h-[340px] sm:h-[420px] md:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-dark-950/20 to-transparent" />
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded bg-dark-950/80 backdrop-blur-md border border-white/10 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-gold-300">
                  FACILITY MASTER LEVEL 01
                </span>
                <p className="text-white font-display font-bold text-sm sm:text-lg mt-1.5 sm:mt-2">
                  Engineered biomechanics for maximum human output.
                </p>
              </div>
            </div>

            {/* Overlapping Detail Card - intelligently constrained so it never causes horizontal scroll */}
            <div className="mt-4 sm:mt-0 sm:absolute sm:bottom-4 sm:right-4 lg:-bottom-6 lg:right-2 xl:-right-4 w-full sm:w-64 md:w-72 rounded-xl overflow-hidden border border-gold-400/30 bg-dark-900/95 shadow-2xl backdrop-blur-md p-3 group hover:border-gold-400/60 transition-all duration-300">
              <div className="relative h-28 sm:h-32 rounded-lg overflow-hidden mb-2.5">
                <img
                  src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80"
                  alt="Elite athlete training"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 to-transparent" />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-gold-400 text-dark-950 text-[9px] font-bold uppercase tracking-wider">
                  ELITE STANDARDS
                </span>
              </div>
              <div className="px-1 pb-1">
                <div className="flex items-center justify-between text-xs font-semibold text-white mb-1">
                  <span>Coaching Ratio</span>
                  <span className="text-gold-400 font-mono">1 : 4 Maximum</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gold-400 h-full w-[85%]" />
                </div>
                <p className="text-[10px] text-zinc-400 mt-2 font-medium">
                  Guaranteed floor guidance on every visit.
                </p>
              </div>
            </div>
          </div>

          {/* Editorial Narrative & Core Pillars (Columns 8-12) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-5 sm:space-y-6 lg:pl-4">
            <h3 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-white leading-tight">
              A refined sanctuary where athletic ambition meets uncompromising precision.
            </h3>

            <p className="text-zinc-300 text-xs sm:text-sm md:text-base leading-relaxed">
              IRONFORGE was engineered to eliminate everything mediocre about commercial fitness. We don’t believe in rows of idle cardio machines or neglected corners. We designed a holistic training ecosystem combining Olympic-grade biomechanics, individualized programming, and master coaching.
            </p>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Whether you are an executive optimizing executive vitality, a competitive lifter hunting PRs, or an athlete demanding resilience, our space is calibrated for the relentless.
            </p>

            {/* 4 Brand Pillars: 1 col on xs, 2 cols on sm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1">
              <div className="p-3 sm:p-3.5 rounded-lg bg-white/[0.03] border border-white/5 hover:border-gold-400/20 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <Flame className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span className="font-display font-bold text-xs uppercase tracking-wider text-white">Biomechanical Rig</span>
                </div>
                <p className="text-[11px] text-zinc-400">Eleiko Prestera, Arsenal Strength, and Prime Fitness cam systems.</p>
              </div>

              <div className="p-3 sm:p-3.5 rounded-lg bg-white/[0.03] border border-white/5 hover:border-gold-400/20 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span className="font-display font-bold text-xs uppercase tracking-wider text-white">Targeted Protocol</span>
                </div>
                <p className="text-[11px] text-zinc-400">Periodized programming aligned with individual physiological data.</p>
              </div>

              <div className="p-3 sm:p-3.5 rounded-lg bg-white/[0.03] border border-white/5 hover:border-gold-400/20 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <Compass className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span className="font-display font-bold text-xs uppercase tracking-wider text-white">Integrated Recovery</span>
                </div>
                <p className="text-[11px] text-zinc-400">Cold plunge therapy, cedar infrared saunas, and mobility lounges.</p>
              </div>

              <div className="p-3 sm:p-3.5 rounded-lg bg-white/[0.03] border border-white/5 hover:border-gold-400/20 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span className="font-display font-bold text-xs uppercase tracking-wider text-white">Vetted Community</span>
                </div>
                <p className="text-[11px] text-zinc-400">No ego. No distractions. An environment of mutual respect.</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-3">
              <button
                onClick={onOpenStoryModal}
                className="min-h-[46px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-gold-400 hover:text-dark-950 text-white font-display font-bold text-xs uppercase tracking-[0.16em] border border-white/15 hover:border-gold-400 transition-all duration-300"
              >
                <span>DISCOVER OUR STORY</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenTourModal}
                className="min-h-[44px] flex items-center justify-center text-xs uppercase tracking-wider font-semibold text-gold-400 hover:text-gold-300 underline underline-offset-4 transition-colors"
              >
                Schedule Private Walkthrough
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
