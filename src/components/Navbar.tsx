import React, { useState, useEffect } from 'react';
import { Menu, X, Dumbbell, ChevronRight, Phone } from 'lucide-react';

interface NavbarProps {
  onOpenJoinModal: (plan?: string) => void;
  onOpenTourModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenJoinModal, onOpenTourModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section
      const sections = ['home', 'about', 'programs', 'trainers', 'facility', 'membership', 'contact'];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 160 && rect.bottom >= 160;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Programs', href: '#programs' },
    { name: 'Trainers', href: '#trainers' },
    { name: 'Facility', href: '#facility' },
    { name: 'Membership', href: '#membership' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav py-3 sm:py-3.5 shadow-2xl shadow-black/80 border-b border-gold-400/10'
            : 'bg-gradient-to-b from-dark-950/95 via-dark-950/80 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none"
              aria-label="IRONFORGE Home"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-gold-300 via-gold-400 to-gold-600 flex items-center justify-center p-[1px] shadow-gold-sm transition-transform duration-300 group-hover:scale-105 flex-shrink-0">
                <div className="w-full h-full bg-dark-950 rounded-[7px] flex items-center justify-center">
                  <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-lg sm:text-2xl tracking-[0.14em] sm:tracking-[0.15em] text-white flex items-center leading-none">
                  IRON<span className="text-gold-400">FORGE</span>
                </span>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-zinc-400 font-medium mt-0.5 sm:mt-1">
                  Performance Club
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-3 xl:px-3.5 py-1.5 text-xs xl:text-sm font-medium uppercase tracking-wider rounded-md transition-all duration-200 relative ${
                      isActive
                        ? 'text-gold-400 font-semibold'
                        : 'text-zinc-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent animate-pulse" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right CTAs Desktop */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4">
              <button
                onClick={onOpenTourModal}
                className="text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-gold-300 transition-colors py-2 px-3 flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-gold-400" />
                <span>Book Tour</span>
              </button>

              <button
                onClick={() => onOpenJoinModal('pro')}
                className="relative group overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-2 focus:ring-gold-400/50"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 transition-all duration-300 group-hover:opacity-90" />
                <span className="relative flex items-center gap-2 px-4 xl:px-5 py-2.5 rounded-[5px] bg-dark-950 transition-colors duration-300 group-hover:bg-transparent">
                  <span className="font-display font-bold text-xs uppercase tracking-[0.16em] text-gold-300 group-hover:text-dark-950 transition-colors duration-300">
                    JOIN NOW
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-gold-400 group-hover:text-dark-950 group-hover:translate-x-0.5 transition-all duration-300" />
                </span>
              </button>
            </div>

            {/* Mobile / Tablet Right Controls */}
            <div className="flex items-center gap-2 sm:gap-3 lg:hidden">
              <button
                onClick={() => onOpenJoinModal('pro')}
                className="px-3 sm:px-3.5 py-1.5 sm:py-2 rounded bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 text-dark-950 font-display font-extrabold text-[10px] sm:text-xs uppercase tracking-wider shadow-gold-sm active:scale-95 transition-transform"
              >
                JOIN NOW
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 sm:p-2.5 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-gold-400"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6 text-gold-400" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer attached right below header */}
        <div
          className={`lg:hidden absolute top-full inset-x-0 bg-dark-950/98 backdrop-blur-2xl border-b border-gold-400/20 transition-all duration-300 overflow-hidden shadow-2xl ${
            mobileMenuOpen ? 'max-h-[calc(100vh-65px)] opacity-100 py-5 sm:py-6 overflow-y-auto' : 'max-h-0 opacity-0 py-0 pointer-events-none'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`flex items-center justify-between min-h-[46px] px-3.5 rounded-lg text-xs sm:text-sm uppercase tracking-wider font-semibold transition-all active:scale-[0.99] ${
                    isActive
                      ? 'bg-gold-400/10 text-gold-400 border border-gold-400/20'
                      : 'text-zinc-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-gold-400' : 'text-zinc-600'}`} />
                </a>
              );
            })}

            <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTourModal();
                }}
                className="w-full min-h-[46px] rounded-lg border border-gold-400/40 text-gold-300 text-xs font-bold uppercase tracking-widest text-center hover:bg-gold-400/10 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-gold-400" />
                <span>Book A Complimentary Tour</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenJoinModal('pro');
                }}
                className="w-full min-h-[48px] rounded-lg bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 text-dark-950 font-display font-extrabold text-xs sm:text-sm uppercase tracking-widest text-center shadow-gold-sm active:scale-98 transition-transform"
              >
                JOIN IRONFORGE TODAY
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop overlay when mobile menu is open */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};
