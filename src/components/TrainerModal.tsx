import React, { useState } from 'react';
import { X, Award, Calendar, CheckCircle2 } from 'lucide-react';
import type { Trainer } from '../data/gymData';

interface TrainerModalProps {
  trainer: Trainer | null;
  onClose: () => void;
}

export const TrainerModal: React.FC<TrainerModalProps> = ({ trainer, onClose }) => {
  const [booked, setBooked] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    goal: 'Hypertrophy & Strength',
    date: '2026-10-15',
  });

  if (!trainer) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-dark-950/90 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-dark-900 border border-gold-400/30 rounded-2xl shadow-2xl shadow-black/90 z-10 my-4 sm:my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-dark-950/80 hover:bg-dark-950 text-white z-20 transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-12">
          {/* Left Column: Trainer Portrait (5 cols) */}
          <div className="sm:col-span-5 relative h-56 sm:h-auto min-h-[220px] sm:min-h-[280px]">
            <img
              src={trainer.image}
              alt={trainer.name}
              className="w-full h-full object-cover object-top filter brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 sm:from-transparent sm:bg-gradient-to-r sm:to-dark-900" />
            <div className="absolute bottom-4 left-4 sm:hidden">
              <h3 className="font-display font-extrabold text-2xl text-white">{trainer.name}</h3>
              <p className="text-xs text-gold-400 font-bold uppercase">{trainer.role}</p>
            </div>
          </div>

          {/* Right Column: Bio & Booking Form (7 cols) */}
          <div className="sm:col-span-7 p-6 sm:p-8">
            <div className="hidden sm:block mb-4">
              <span className="px-2.5 py-0.5 rounded bg-gold-400/10 border border-gold-400/30 text-[10px] font-mono uppercase text-gold-300">
                {trainer.experience}
              </span>
              <h3 className="font-display font-extrabold text-2xl text-white uppercase mt-1">
                {trainer.name}
              </h3>
              <p className="text-xs text-gold-400 font-bold uppercase tracking-wider">{trainer.role}</p>
            </div>

            <div className="p-3 rounded-lg bg-white/5 border border-white/5 mb-4 text-xs text-zinc-300">
              <div className="flex items-center gap-1.5 text-gold-400 font-mono text-[11px] mb-1">
                <Award className="w-3.5 h-3.5" />
                <span>{trainer.credentials}</span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">{trainer.bio}</p>
            </div>

            {booked ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-gold-400/20 text-gold-400 border border-gold-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-lg text-white">
                  SESSION REQUEST SENT
                </h4>
                <p className="text-xs text-zinc-300">
                  Coach {trainer.name}’s desk has received your request. We will contact <span className="text-gold-300 font-mono">{formData.phone}</span> to lock in your initial movement screening slot.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2 rounded-lg bg-white/10 text-xs font-bold uppercase text-white hover:bg-gold-400 hover:text-dark-950 transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Request 1-on-1 Consultation
                </p>

                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-dark-950 border border-white/10 text-xs text-white focus:border-gold-400 focus:outline-none"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Your Phone / WhatsApp"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-dark-950 border border-white/10 text-xs text-white focus:border-gold-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    className="px-2.5 py-2 rounded-lg bg-dark-950 border border-white/10 text-xs text-white focus:border-gold-400 focus:outline-none"
                  >
                    <option>Hypertrophy & Strength</option>
                    <option>Olympic Lifting</option>
                    <option>Body Recomposition</option>
                    <option>Metabolic Conditioning</option>
                  </select>

                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="px-2.5 py-2 rounded-lg bg-dark-950 border border-white/10 text-xs text-white focus:border-gold-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gold-400 hover:bg-gold-300 text-dark-950 font-display font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 mt-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Reserve Consultation</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
