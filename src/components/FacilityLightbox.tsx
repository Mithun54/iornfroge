import React from 'react';
import { X, Check, ShieldCheck, MapPin } from 'lucide-react';
import type { FacilityItem } from '../data/gymData';

interface FacilityLightboxProps {
  item: FacilityItem | null;
  onClose: () => void;
  onBookTour: () => void;
}

export const FacilityLightbox: React.FC<FacilityLightboxProps> = ({
  item,
  onClose,
  onBookTour,
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-dark-950/92 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />

      {/* Dialog Card */}
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-dark-900 border border-gold-400/30 rounded-2xl shadow-2xl shadow-black/90 z-10 my-4 sm:my-8">
        {/* Full Image */}
        <div className="relative h-56 sm:h-72 md:h-96 overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover filter brightness-90 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg bg-dark-950/80 hover:bg-dark-950 text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-6 right-6">
            <span className="px-3 py-1 rounded bg-gold-400 text-dark-950 text-[10px] font-extrabold uppercase tracking-wider font-mono">
              {item.categoryLabel}
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white uppercase tracking-tight mt-2">
              {item.title}
            </h3>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            {item.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-dark-950 border border-white/10 text-xs">
            <div className="flex items-center gap-2 text-zinc-300">
              <ShieldCheck className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <span>Specification: <strong className="text-white">{item.highlight}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <Check className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <span>Acoustic sound-dampening flooring</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <Check className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <span>Hospital-grade HEPA air filtration</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <Check className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <span>Sanitized continuously after every session</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <MapPin className="w-4 h-4 text-gold-400" />
              <span>Located on Level 01 & 02 Main Concierge Wing</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  onClose();
                  onBookTour();
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gold-400 hover:bg-gold-300 text-dark-950 font-display font-extrabold text-xs uppercase tracking-wider transition-colors"
              >
                Tour This Zone In Person
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
