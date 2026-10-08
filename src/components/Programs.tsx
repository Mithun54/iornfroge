import React, { useState } from 'react';
import { ArrowUpRight, Clock, Zap, CheckCircle2 } from 'lucide-react';
import type { Program } from '../data/gymData';
import { PROGRAMS } from '../data/gymData';

interface ProgramsProps {
  onSelectProgram: (program: Program) => void;
}

export const Programs: React.FC<ProgramsProps> = ({ onSelectProgram }) => {
  const [filter, setFilter] = useState<string>('all');

  const filteredPrograms = filter === 'all' 
    ? PROGRAMS 
    : PROGRAMS.filter(p => {
        if (filter === 'strength') return p.id.includes('strength') || p.id.includes('muscle');
        if (filter === 'conditioning') return p.id.includes('fat-loss') || p.id.includes('functional');
        if (filter === 'performance') return p.id.includes('athletic') || p.id.includes('personal');
        return true;
      });

  return (
    <section id="programs" className="py-16 sm:py-24 md:py-32 bg-dark-900 relative">
      {/* Decorative hairline */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 mb-3 sm:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-gold-300">
                SCIENTIFIC CURRICULUM
              </span>
            </div>
            <h2 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white uppercase leading-[1.12]">
              TRAIN WITH PURPOSE.
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm md:text-base max-w-xl mt-2 sm:mt-3 font-normal">
              Structured progressive overload protocols engineered by sport scientists. Zero guesswork, maximum biological adaptation.
            </p>
          </div>

          {/* Quick Filter Tabs - horizontally scrollable on mobile */}
          <div className="flex overflow-x-auto pb-1 max-w-full scrollbar-none gap-1.5 sm:gap-2 bg-dark-950 p-1.5 rounded-xl border border-white/10 self-start md:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap min-h-[40px] ${
                filter === 'all'
                  ? 'bg-gold-400 text-dark-950 shadow-gold-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              All Programs
            </button>
            <button
              onClick={() => setFilter('strength')}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap min-h-[40px] ${
                filter === 'strength'
                  ? 'bg-gold-400 text-dark-950 shadow-gold-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Strength & Mass
            </button>
            <button
              onClick={() => setFilter('conditioning')}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap min-h-[40px] ${
                filter === 'conditioning'
                  ? 'bg-gold-400 text-dark-950 shadow-gold-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Conditioning & Turf
            </button>
            <button
              onClick={() => setFilter('performance')}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap min-h-[40px] ${
                filter === 'performance'
                  ? 'bg-gold-400 text-dark-950 shadow-gold-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Athletic & Bespoke
            </button>
          </div>
        </div>

        {/* 1 col on mobile, 2 cols on tablet (md), 3 cols on desktop (lg) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              onClick={() => onSelectProgram(program)}
              className="group relative rounded-2xl overflow-hidden bg-dark-850 border border-white/10 hover:border-gold-400/50 transition-all duration-300 md:hover:-translate-y-2 cursor-pointer shadow-xl flex flex-col active:scale-[0.99]"
            >
              {/* Card Image Area with Zoom and Dynamic Overlay */}
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <img
                  src={program.image}
                  alt={program.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-90 contrast-110"
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-850 via-dark-850/40 to-transparent group-hover:via-dark-850/60 transition-colors duration-300" />

                {/* Difficulty & Category Badges */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                  <span className="px-2.5 sm:px-3 py-1 rounded-md bg-dark-950/80 backdrop-blur-md border border-white/10 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gold-300">
                    {program.category}
                  </span>
                  <span className="px-2 sm:px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md text-[9px] sm:text-[10px] font-semibold text-zinc-300">
                    {program.level}
                  </span>
                </div>

                {/* Corner Action Arrow */}
                <div className="absolute bottom-3.5 right-3.5 w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-dark-950/80 border border-white/20 flex items-center justify-center text-white group-hover:bg-gold-400 group-hover:text-dark-950 group-hover:border-gold-400 transition-all duration-300">
                  <ArrowUpRight className="w-4 sm:w-5 h-4 sm:h-5 transition-transform" />
                </div>
              </div>

              {/* Card Content Area */}
              <div className="p-5 sm:p-6 md:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-white group-hover:text-gold-300 transition-colors duration-200 mb-2">
                    {program.name}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-2">
                    {program.description}
                  </p>

                  {/* Highlights Pill list */}
                  <div className="space-y-1.5 sm:space-y-2 mb-5">
                    {program.focus.slice(0, 2).map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] sm:text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Meta details footer */}
                <div className="pt-3.5 border-t border-white/10 flex items-center justify-between text-[11px] sm:text-xs text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                    <span className="truncate">{program.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                    <span>{program.intensity}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
