import React, { useState } from 'react';
import { Maximize2, Shield, Sparkles } from 'lucide-react';
import type { FacilityItem } from '../data/gymData';
import { FACILITY_ITEMS } from '../data/gymData';

interface FacilityProps {
  onPreviewItem: (item: FacilityItem) => void;
}

export const Facility: React.FC<FacilityProps> = ({ onPreviewItem }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredItems = activeTab === 'all'
    ? FACILITY_ITEMS
    : FACILITY_ITEMS.filter(item => item.category === activeTab);

  return (
    <section id="facility" className="py-16 sm:py-24 md:py-32 bg-dark-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 mb-3 sm:mb-4">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-gold-300">
                15,000 SQ FT SANCTUARY
              </span>
            </div>
            <h2 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white uppercase leading-[1.12]">
              ENGINEERED PRECISION.
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm md:text-base max-w-xl mt-2 sm:mt-3 font-normal">
              Every square foot is calibrated for maximum ergonomic efficiency, acoustic focus, and athletic performance. No clutter, zero compromises.
            </p>
          </div>

          {/* Category Filter Pills - smooth horizontal scroll on mobile */}
          <div className="flex overflow-x-auto pb-1 max-w-full scrollbar-none gap-1 sm:gap-1.5 bg-dark-950 p-1.5 rounded-xl border border-white/10 self-start md:self-auto">
            {[
              { id: 'all', label: 'All Zones' },
              { id: 'strength', label: 'Racks' },
              { id: 'weights', label: 'Free Weights' },
              { id: 'cardio', label: 'Cardio' },
              { id: 'functional', label: 'Turf' },
              { id: 'recovery', label: 'Spa & Cryo' },
              { id: 'lockers', label: 'Suites' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap min-h-[38px] ${
                  activeTab === tab.id
                    ? 'bg-gold-400 text-dark-950 shadow-gold-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 1 col on mobile, 2 cols on tablet (md), 3 cols on desktop (lg) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {filteredItems.map((item, index) => {
            const isFeatured = index === 0 || index === 4;

            return (
              <div
                key={item.id}
                onClick={() => onPreviewItem(item)}
                className={`group relative rounded-2xl overflow-hidden bg-dark-850 border border-white/10 hover:border-gold-400/50 cursor-pointer transition-all duration-300 shadow-xl active:scale-[0.99] ${
                  isFeatured ? 'lg:col-span-2 h-[320px] sm:h-[380px] lg:h-[420px]' : 'h-[320px] sm:h-[380px] lg:h-[420px]'
                }`}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-85 contrast-110"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent" />
                <div className="absolute inset-0 bg-dark-950/20 group-hover:bg-dark-950/0 transition-colors duration-300" />

                {/* Top Tags */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                  <span className="px-2.5 sm:px-3 py-1 rounded-md bg-dark-950/80 backdrop-blur-md border border-white/10 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-gold-300">
                    {item.categoryLabel}
                  </span>

                  <span className="px-2 sm:px-2.5 py-1 rounded-md bg-gold-400/90 text-dark-950 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-gold-sm">
                    <Shield className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate max-w-[140px] sm:max-w-none">{item.highlight}</span>
                  </span>
                </div>

                {/* Floating Expand Icon */}
                <div className="absolute top-3.5 right-3.5 w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-dark-950/80 border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize2 className="w-4 h-4 text-gold-400" />
                </div>

                {/* Bottom Captions */}
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                  <h3 className="font-display font-extrabold text-lg sm:text-xl lg:text-2xl text-white group-hover:text-gold-300 transition-colors mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-zinc-300 text-xs sm:text-sm line-clamp-2 max-w-xl font-normal leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 group-hover:translate-x-1 transition-transform">
                    <span>Explore Specifications</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
