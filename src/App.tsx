import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { About } from './components/About';
import { Programs } from './components/Programs';
import { Trainers } from './components/Trainers';
import { Facility } from './components/Facility';
import { Membership } from './components/Membership';
import { Testimonials } from './components/Testimonials';
import { CTA } from './components/CTA';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

// Modals
import { BookingModal } from './components/BookingModal';
import { ProgramModal } from './components/ProgramModal';
import { TrainerModal } from './components/TrainerModal';
import { FacilityLightbox } from './components/FacilityLightbox';
import { StoryModal } from './components/StoryModal';

// Types
import type { Program, Trainer, FacilityItem } from './data/gymData';
import { ChevronUp, PhoneCall, Sparkles } from 'lucide-react';

export function App() {
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<FacilityItem | null>(null);
  const [storyModalOpen, setStoryModalOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenJoin = (planId?: string) => {
    setSelectedPlan(planId || 'pro');
    setJoinModalOpen(true);
  };

  const handleScrollToContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToPrograms = () => {
    const progEl = document.getElementById('programs');
    if (progEl) {
      progEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-dark-950 text-zinc-100 flex flex-col font-sans selection:bg-gold-400 selection:text-dark-950">
      {/* Sticky Premium Navbar */}
      <Navbar
        onOpenJoinModal={handleOpenJoin}
        onOpenTourModal={handleScrollToContact}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 1. Cinematic Hero */}
        <Hero
          onOpenJoinModal={() => handleOpenJoin('pro')}
          onExplorePrograms={handleScrollToPrograms}
        />

        {/* 2. Trust / Statistics Strip */}
        <Stats />

        {/* 3. Editorial About Section */}
        <About
          onOpenStoryModal={() => setStoryModalOpen(true)}
          onOpenTourModal={handleScrollToContact}
        />

        {/* 4. Purposeful Programs Section */}
        <Programs
          onSelectProgram={(program) => setSelectedProgram(program)}
        />

        {/* 5. Master Trainers Section */}
        <Trainers
          onSelectTrainer={(trainer) => setSelectedTrainer(trainer)}
        />

        {/* 6. Facility & Equipment Showcase */}
        <Facility
          onPreviewItem={(item) => setSelectedFacility(item)}
        />

        {/* 7. Membership Tiers Section */}
        <Membership
          onSelectPlan={(planId) => handleOpenJoin(planId)}
        />

        {/* 8. Testimonials Section */}
        <Testimonials />

        {/* 9. Final High-Impact CTA Section */}
        <CTA
          onOpenJoinModal={() => handleOpenJoin('pro')}
          onOpenTourModal={handleScrollToContact}
        />

        {/* 10. Contact, Location & Free Tour Form */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Back-To-Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 lg:bottom-8 right-4 sm:right-6 z-40 p-2.5 sm:p-3 rounded-full bg-dark-900/90 border border-gold-400/30 text-gold-400 hover:text-dark-950 hover:bg-gold-400 transition-all shadow-xl hover:scale-110 active:scale-95 focus:outline-none"
          aria-label="Scroll back to top"
        >
          <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      )}

      {/* Mobile Sticky Quick-Action Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden p-2.5 sm:p-3 bg-dark-950/95 backdrop-blur-xl border-t border-gold-400/20 flex items-center justify-between gap-2.5 sm:gap-3 shadow-2xl safe-area-bottom">
        <a
          href="tel:+919876543210"
          className="flex-1 min-h-[44px] py-2.5 px-3 rounded-lg bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
        >
          <PhoneCall className="w-3.5 h-3.5 text-gold-400" />
          <span>Call Club</span>
        </a>

        <button
          onClick={() => handleOpenJoin('pro')}
          className="flex-[2] min-h-[44px] py-2.5 px-3 sm:px-4 rounded-lg bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 text-dark-950 font-display font-extrabold text-[11px] sm:text-xs uppercase tracking-wider text-center shadow-gold-sm flex items-center justify-center gap-1.5 active:scale-98 transition-transform"
        >
          <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">JOIN IRONFORGE</span>
        </button>
      </div>

      {/* Interactive Modals */}
      <BookingModal
        isOpen={joinModalOpen}
        onClose={() => setJoinModalOpen(false)}
        initialPlan={selectedPlan}
      />

      <ProgramModal
        program={selectedProgram}
        onClose={() => setSelectedProgram(null)}
        onEnroll={() => {
          setSelectedProgram(null);
          handleOpenJoin('pro');
        }}
      />

      <TrainerModal
        trainer={selectedTrainer}
        onClose={() => setSelectedTrainer(null)}
      />

      <FacilityLightbox
        item={selectedFacility}
        onClose={() => setSelectedFacility(null)}
        onBookTour={() => {
          setSelectedFacility(null);
          handleScrollToContact();
        }}
      />

      <StoryModal
        isOpen={storyModalOpen}
        onClose={() => setStoryModalOpen(false)}
        onBookTour={() => {
          setStoryModalOpen(false);
          handleScrollToContact();
        }}
      />
    </div>
  );
}

export default App;
