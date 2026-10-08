import React from 'react';
import { X, Sparkles, Shield, Dumbbell } from 'lucide-react';

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookTour: () => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({
  isOpen,
  onClose,
  onBookTour,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-dark-950/92 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-dark-900 border border-gold-400/30 rounded-2xl shadow-2xl shadow-black/90 z-10 my-4 sm:my-8">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-5 sm:p-8 md:p-10 space-y-5 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-300">
              OUR ORIGIN & DOCTRINE
            </span>
          </div>

          <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white uppercase tracking-tight leading-tight">
            FORGED IN RESISTANCE. <br />
            BUILT WITHOUT COMPROMISE.
          </h3>

          <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
            <p>
              In 2016, IRONFORGE began with a single question: <em>"Why do luxury gyms feel like country clubs with weak equipment, while serious strength gyms lack cleanliness and refinement?"</em>
            </p>
            <p>
              We refused the false dilemma. We engineered IRONFORGE to unite the uncompromising biomechanical rigor of an Olympic training center with the architectural serenity and concierge hospitality of a private Mayfair club.
            </p>
            <p>
              Here, you train on calibrated Swedish steel, walk on acoustic vibration-absorbent flooring, and recover in sub-zero cryotherapy suites. There are no sales reps stalking the floor, no commercial machine overcrowding, and zero loud distraction.
            </p>
          </div>

          {/* Core Tenets */}
          <div className="space-y-3 pt-2">
            <div className="p-3.5 rounded-xl bg-dark-950 border border-white/10 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gold-400/10 flex items-center justify-center flex-shrink-0 text-gold-400 mt-0.5">
                <Dumbbell className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase text-white tracking-wider">The Standard of Steel</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Only authentic Eleiko barbells, calibrated Ivanko plates, and Arsenal Strength ergonomics. Every angle is biomechanically optimal.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-950 border border-white/10 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gold-400/10 flex items-center justify-center flex-shrink-0 text-gold-400 mt-0.5">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase text-white tracking-wider">The Culture of Respect</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Every member re-racks their weights, respects shared focus, and leaves ego at the door. We champion personal bests across all backgrounds.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-zinc-400 font-mono">Founders: Alex Carter & Dr. Marcus Vance</span>
            <button
              onClick={() => {
                onClose();
                onBookTour();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gold-400 hover:bg-gold-300 text-dark-950 font-display font-extrabold text-xs uppercase tracking-wider transition-colors"
            >
              Experience The Club
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
