import React from 'react';
import { X, CheckCircle2, Clock, Target, ArrowRight } from 'lucide-react';
import type { Program } from '../data/gymData';

interface ProgramModalProps {
  program: Program | null;
  onClose: () => void;
  onEnroll: (programName: string) => void;
}

export const ProgramModal: React.FC<ProgramModalProps> = ({
  program,
  onClose,
  onEnroll,
}) => {
  if (!program) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-dark-950/90 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-dark-900 border border-gold-400/30 rounded-2xl shadow-2xl shadow-black/90 z-10 my-4 sm:my-8">
        {/* Header Image */}
        <div className="relative h-48 sm:h-60 overflow-hidden">
          <img
            src={program.image}
            alt={program.name}
            className="w-full h-full object-cover filter brightness-90 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg bg-dark-950/80 hover:bg-dark-950 text-white transition-colors"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title Badges */}
          <div className="absolute bottom-4 left-6 right-6">
            <span className="px-3 py-1 rounded bg-gold-400 text-dark-950 text-[10px] font-extrabold uppercase tracking-wider font-mono">
              {program.category}
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-tight mt-2">
              {program.name}
            </h3>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-sm text-zinc-300 leading-relaxed">
            {program.description}
          </p>

          {/* Metrics bar */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-dark-950 border border-white/10 text-center">
            <div>
              <span className="text-[10px] uppercase font-mono text-zinc-400 block">LEVEL</span>
              <span className="font-display font-bold text-xs sm:text-sm text-white">{program.level}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-zinc-400 block">DURATION</span>
              <span className="font-display font-bold text-xs sm:text-sm text-gold-300">{program.duration}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-zinc-400 block">INTENSITY</span>
              <span className="font-display font-bold text-xs sm:text-sm text-white">{program.intensity}</span>
            </div>
          </div>

          {/* Key Adaptation Focus */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-gold-400" />
              <span>Core Biological Adaptations</span>
            </h4>
            <div className="space-y-2">
              {program.focus.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Schedule info */}
          <div className="flex items-center gap-2 text-xs text-zinc-400 p-3 rounded-lg bg-white/5 border border-white/5">
            <Clock className="w-4 h-4 text-gold-400 flex-shrink-0" />
            <span>Structured weekly timetable: <strong className="text-white">{program.schedule}</strong></span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={() => {
                onClose();
                onEnroll(program.name);
              }}
              className="w-full sm:flex-1 py-3.5 rounded-xl bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 text-dark-950 font-display font-extrabold text-xs uppercase tracking-[0.18em] shadow-gold-sm hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              <span>ENROLL IN THIS CURRICULUM</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Back to Programs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
