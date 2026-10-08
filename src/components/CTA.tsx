import React from 'react';
import { ArrowRight, Flame, ShieldAlert, Sparkles } from 'lucide-react';

interface CTAProps {
  onOpenJoinModal: () => void;
  onOpenTourModal: () => void;
}

export const CTA: React.FC<CTAProps> = ({ onOpenJoinModal, onOpenTourModal }) => {
  return (
    <section className="relative py-20 sm:py-28 md:py-36 overflow-hidden bg-dark-950">
      {/* Background athlete photo with dark luxury overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=2200&q=85"
          alt="Athlete focused before training"
          className="w-full h-full object-cover object-[center_20%] sm:object-center filter brightness-[0.35] contrast-125"
        />
        {/* Layered Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/70 to-dark-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950 via-dark-950/80 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[250px] sm:h-[300px] bg-gold-400/10 blur-[100px] sm:blur-[130px] rounded-full pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/5 border border-gold-400/30 backdrop-blur-md mb-6 sm:mb-8 max-w-full">
          <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-400 animate-pulse flex-shrink-0" />
          <span className="text-[9px] xs:text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.25em] text-gold-300 truncate">
            LIMITED TO 400 ACTIVE MEMBERS
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white uppercase leading-[1.12] sm:leading-[1.08] mb-5 sm:mb-6">
          YOUR STRONGEST VERSION <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-gold-600">
            IS WAITING.
          </span>
        </h2>

        {/* Supporting text */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl text-zinc-300 mb-8 sm:mb-10 leading-relaxed font-normal px-2">
          Stop waiting for motivation. Start building discipline. Step into an environment where excuses are left at the door.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 mb-10 sm:mb-12 w-full max-w-md sm:max-w-none mx-auto">
          <button
            onClick={onOpenJoinModal}
            className="w-full sm:w-auto min-h-[48px] sm:min-h-[52px] relative group overflow-hidden rounded-xl p-[1px] shadow-gold-lg active:scale-98 transition-transform duration-200"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600" />
            <span className="relative flex items-center justify-center gap-3 px-7 sm:px-9 py-3.5 sm:py-4 rounded-[11px] bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-dark-950 font-display font-extrabold text-xs sm:text-sm uppercase tracking-[0.18em] w-full">
              <span>JOIN IRONFORGE</span>
              <ArrowRight className="w-4 h-4 text-dark-950 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <button
            onClick={onOpenTourModal}
            className="w-full sm:w-auto min-h-[48px] sm:min-h-[52px] px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-gold-400/50 backdrop-blur-md font-display font-bold text-xs sm:text-sm uppercase tracking-[0.18em] transition-all active:scale-98"
          >
            BOOK A PRIVATE TOUR
          </button>
        </div>

        {/* Micro guarantees */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs text-zinc-400 font-medium">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            Zero Initiation Fee
          </span>
          <span className="hidden sm:inline w-1 h-1 rounded-full bg-zinc-600" />
          <span className="flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-gold-400" />
            7-Day Risk Free Period
          </span>
          <span className="hidden sm:inline w-1 h-1 rounded-full bg-zinc-600" />
          <span>Pause or Cancel Anytime</span>
        </div>
      </div>
    </section>
  );
};
