import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-20 lg:bottom-8 right-4 sm:right-6 z-40 p-2.5 sm:p-3 rounded-full bg-dark-900/90 backdrop-blur-md border border-gold-400/30 text-gold-400 hover:text-dark-950 hover:bg-gold-400 hover:border-gold-400 transition-all duration-300 shadow-xl hover:shadow-gold-glow hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950 cursor-pointer"
    >
      <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
    </button>
  );
};

export default BackToTop;
