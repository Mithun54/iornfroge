import React from 'react';
import { Award, Calendar, ArrowRight } from 'lucide-react';
import type { Trainer } from '../data/gymData';
import { TRAINERS } from '../data/gymData';
import { InstagramIcon, LinkedInIcon, TwitterIcon } from './SocialIcons';

interface TrainersProps {
  onSelectTrainer: (trainer: Trainer) => void;
}

export const Trainers: React.FC<TrainersProps> = ({ onSelectTrainer }) => {
  return (
    <section id="trainers" className="py-16 sm:py-24 md:py-32 bg-dark-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 mb-3 sm:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-gold-300">
                MASTER COACHING CADRE
              </span>
            </div>
            <h2 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white uppercase leading-[1.12]">
              TRAIN WITH THE BEST.
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm md:text-base max-w-xl mt-2 sm:mt-3 font-normal">
              Not just motivators—credentialed exercise physiologists, Olympic-tier weightlifters, and clinical sports nutritionists.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-widest text-gold-400 bg-gold-400/10 px-3.5 py-2 rounded-lg border border-gold-400/20 self-start md:self-auto">
            <Award className="w-4 h-4 flex-shrink-0" />
            <span>100% CSCS / Master Credentialed</span>
          </div>
        </div>

        {/* 1 col on small mobile (<480px), 2 cols on tablet/mobile-wide (480px-1024px), 4 cols on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {TRAINERS.map((trainer) => (
            <div
              key={trainer.id}
              className="group rounded-2xl bg-dark-900 border border-white/10 hover:border-gold-400/40 overflow-hidden shadow-xl transition-all duration-300 md:hover:-translate-y-2 flex flex-col justify-between"
            >
              {/* Trainer Portrait & Overlay */}
              <div className="relative h-72 sm:h-80 overflow-hidden">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95 contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />
                
                {/* Floating Experience Badge */}
                <span className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded bg-dark-950/85 backdrop-blur-md border border-white/10 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-gold-300">
                  {trainer.experience}
                </span>

                {/* Social Icons Strip - visible on mobile, hover slide on desktop */}
                <div className="absolute top-3.5 right-3.5 flex flex-col gap-1.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 sm:translate-x-2 sm:group-hover:translate-x-0">
                  <a
                    href={trainer.socials.instagram || '#'}
                    aria-label={`${trainer.name} Instagram`}
                    className="w-8 h-8 rounded-full bg-dark-950/90 border border-white/20 flex items-center justify-center text-zinc-300 hover:text-gold-400 hover:border-gold-400 transition-colors"
                  >
                    <InstagramIcon className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={trainer.socials.linkedin || '#'}
                    aria-label={`${trainer.name} LinkedIn`}
                    className="w-8 h-8 rounded-full bg-dark-950/90 border border-white/20 flex items-center justify-center text-zinc-300 hover:text-gold-400 hover:border-gold-400 transition-colors"
                  >
                    <LinkedInIcon className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={trainer.socials.twitter || '#'}
                    aria-label={`${trainer.name} Twitter`}
                    className="w-8 h-8 rounded-full bg-dark-950/90 border border-white/20 flex items-center justify-center text-zinc-300 hover:text-gold-400 hover:border-gold-400 transition-colors"
                  >
                    <TwitterIcon className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Trainer Meta Info */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-white group-hover:text-gold-300 transition-colors">
                    {trainer.name}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-0.5">
                    {trainer.role}
                  </p>
                  <p className="text-[10px] sm:text-[11px] font-mono text-zinc-400 mb-3 truncate">
                    {trainer.credentials}
                  </p>

                  <div className="pt-2.5 border-t border-white/10 mb-4">
                    <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                      <strong className="text-white font-medium">Specialty:</strong> {trainer.specialty}
                    </p>
                  </div>
                </div>

                {/* Consultation Button */}
                <button
                  onClick={() => onSelectTrainer(trainer)}
                  className="w-full min-h-[44px] py-2.5 px-3 rounded-lg bg-white/5 group-hover:bg-gold-400 group-hover:text-dark-950 text-white border border-white/10 group-hover:border-gold-400 text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 active:scale-[0.98]"
                >
                  <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">Book Private Session</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
