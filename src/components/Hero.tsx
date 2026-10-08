import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Award } from 'lucide-react';

interface HeroProps {
  onOpenJoinModal: () => void;
  onExplorePrograms: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenJoinModal, onExplorePrograms }) => {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center justify-center pt-24 sm:pt-28 md:pt-32 pb-14 sm:pb-16 md:pb-20 overflow-hidden bg-dark-950"
    >
      {/* Background Image with Cinematic Dark Gradient Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2400&q=85"
          alt="Athlete training in dark luxury gym"
          className="w-full h-full object-cover object-[center_28%] sm:object-center scale-105 transform animate-pulse-subtle filter brightness-[0.7] contrast-125"
          loading="eager"
        />
        {/* Layered Vignette and Gradient Masks */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/80 to-dark-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950/90 via-dark-950/60 to-dark-950/80 sm:to-transparent" />
        {/* Subtle Gold Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] md:w-[650px] h-[250px] sm:h-[350px] bg-gold-400/10 blur-[100px] sm:blur-[130px] rounded-full pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
        {/* Badge: PREMIUM FITNESS EXPERIENCE */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/[0.04] border border-gold-400/30 backdrop-blur-md mb-6 sm:mb-8 shadow-gold-sm max-w-full">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-400 animate-pulse flex-shrink-0" />
          <span className="text-[9px] xs:text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] sm:tracking-[0.25em] text-gold-300 truncate">
            PREMIUM FITNESS EXPERIENCE
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shadow-[0_0_8px_#D4AF37] flex-shrink-0" />
        </div>

        {/* Cinematic Headline */}
        <h1 className="font-display font-extrabold text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-white max-w-5xl leading-[1.12] sm:leading-[1.08] mb-5 sm:mb-6 drop-shadow-2xl px-1">
          BUILD THE BODY.{' '}
          <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-gold-200 to-gold-400">
            FORGE THE MIND.
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="max-w-2xl text-sm sm:text-base md:text-lg lg:text-xl text-zinc-300 leading-relaxed font-normal mb-8 sm:mb-10 tracking-wide px-2">
          Premium training, expert coaching, and a community built for people who refuse to settle. Experience the pinnacle of human athletic performance.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-5 w-full sm:w-auto mb-12 sm:mb-16 max-w-md sm:max-w-none">
          <button
            onClick={onOpenJoinModal}
            className="w-full sm:w-auto min-h-[48px] sm:min-h-[52px] relative group overflow-hidden rounded-xl p-[1px] shadow-gold-lg active:scale-98 transition-transform duration-200"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 transition-all duration-300 group-hover:scale-105" />
            <span className="relative flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-[11px] bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-dark-950 font-display font-extrabold text-xs sm:text-sm uppercase tracking-[0.16em] w-full">
              <span>START YOUR JOURNEY</span>
              <ArrowRight className="w-4 h-4 text-dark-950 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>

          <button
            onClick={onExplorePrograms}
            className="w-full sm:w-auto min-h-[48px] sm:min-h-[52px] px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] active:scale-98 text-zinc-200 hover:text-white border border-white/15 hover:border-gold-400/40 backdrop-blur-md font-display font-bold text-xs sm:text-sm uppercase tracking-[0.16em] transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>EXPLORE PROGRAMS</span>
          </button>
        </div>

        {/* Editorial Sub-features Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 md:gap-8 pt-6 sm:pt-8 border-t border-white/10 w-full max-w-4xl text-left">
          <div className="flex items-center gap-3 p-2.5 sm:p-0 rounded-lg bg-white/[0.02] sm:bg-transparent border border-white/5 sm:border-none">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white">Eleiko Official Partner</p>
              <p className="text-[11px] text-zinc-400">Competition calibrated gear</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 sm:p-0 rounded-lg bg-white/[0.02] sm:bg-transparent border border-white/5 sm:border-none">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white">CSCS Certified Coaches</p>
              <p className="text-[11px] text-zinc-400">Olympic and collegiate expertise</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 sm:p-0 rounded-lg bg-white/[0.02] sm:bg-transparent border border-white/5 sm:border-none">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white">Cryo & Hydro Recovery</p>
              <p className="text-[11px] text-zinc-400">Integrated plunge & sauna</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade transition to stats section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />
    </section>
  );
};
