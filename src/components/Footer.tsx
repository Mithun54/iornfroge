import React, { useState } from 'react';
import { Dumbbell, ArrowRight, CheckCircle2 } from 'lucide-react';
import { InstagramIcon, YouTubeIcon, TwitterIcon, LinkedInIcon } from './SocialIcons';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
    }
  };

  return (
    <footer className="bg-dark-950 border-t border-white/10 text-zinc-400 relative overflow-hidden">
      {/* Subtle gold gradient line on top */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-28 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          {/* Brand Column (Columns 1-4) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gold-300 to-gold-600 p-[1px] shadow-gold-sm">
                <div className="w-full h-full bg-dark-950 rounded-[7px] flex items-center justify-center">
                  <Dumbbell className="w-4 h-4 text-gold-400 transform -rotate-45" />
                </div>
              </div>
              <span className="font-display font-extrabold text-2xl tracking-[0.16em] text-white">
                IRON<span className="text-gold-400">FORGE</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
              The pinnacle of human physical engineering. Designed for athletes, lifters, and leaders dedicated to uncompromising self-mastery.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:border-gold-400 hover:text-gold-400 flex items-center justify-center transition-colors text-zinc-300"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:border-gold-400 hover:text-gold-400 flex items-center justify-center transition-colors text-zinc-300"
              >
                <YouTubeIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:border-gold-400 hover:text-gold-400 flex items-center justify-center transition-colors text-zinc-300"
              >
                <TwitterIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:border-gold-400 hover:text-gold-400 flex items-center justify-center transition-colors text-zinc-300"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Quick Links (Columns 5-6) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-[0.2em] text-white">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#home" className="hover:text-gold-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-gold-400 transition-colors">About Facility</a>
              </li>
              <li>
                <a href="#programs" className="hover:text-gold-400 transition-colors">Training Programs</a>
              </li>
              <li>
                <a href="#trainers" className="hover:text-gold-400 transition-colors">Master Coaches</a>
              </li>
              <li>
                <a href="#facility" className="hover:text-gold-400 transition-colors">Equipment & Zones</a>
              </li>
              <li>
                <a href="#membership" className="hover:text-gold-400 transition-colors">Membership Tiers</a>
              </li>
            </ul>
          </div>

          {/* Programs Links (Columns 7-8) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-[0.2em] text-white">
              Signature Programs
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#programs" className="hover:text-gold-400 transition-colors">Strength & Conditioning</a>
              </li>
              <li>
                <a href="#programs" className="hover:text-gold-400 transition-colors">Hypertrophy & Density</a>
              </li>
              <li>
                <a href="#programs" className="hover:text-gold-400 transition-colors">Metabolic Fat Loss Protocol</a>
              </li>
              <li>
                <a href="#programs" className="hover:text-gold-400 transition-colors">Bespoke 1:1 Coaching</a>
              </li>
              <li>
                <a href="#programs" className="hover:text-gold-400 transition-colors">Multi-Planar Functional Turf</a>
              </li>
              <li>
                <a href="#programs" className="hover:text-gold-400 transition-colors">Athletic Velocity & Power</a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column (Columns 9-12) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-[0.2em] text-white">
              The Forge Dispatch
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Curated strength science, biomechanics research, and member achievements delivered bi-weekly.
            </p>

            {newsletterSubscribed ? (
              <div className="p-3 rounded-lg bg-gold-400/10 border border-gold-400/30 flex items-center gap-2 text-gold-300 text-xs">
                <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>You are subscribed to The Forge Dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-dark-900 border border-white/10 focus:border-gold-400 focus:outline-none text-xs text-white placeholder-zinc-500 pr-10"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="absolute right-1 top-1 bottom-1 px-2.5 rounded bg-gold-400 text-dark-950 hover:bg-gold-300 transition-colors flex items-center justify-center"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] text-zinc-500 block">
                  Strictly zero spam. Unsubscribe at any time.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright & Legal */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>
            © 2026 IRONFORGE Performance Club. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3.5 sm:gap-6">
            <a href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Terms of Membership</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Club Etiquette</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
