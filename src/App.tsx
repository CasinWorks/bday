import React, { useState, useEffect } from 'react';
import { FloatingBackground } from './components/FloatingBackground';
import { LandingHero } from './components/LandingHero';
import { PhotoGallery } from './components/PhotoGallery';
import { FunnyAgeGuesser } from './components/FunnyAgeGuesser';
import { MessagesSection } from './components/MessagesSection';
import { ClosingWish } from './components/ClosingWish';
import { NavigationControls } from './components/NavigationControls';
import { FunnyAnimationCanvas } from './components/FunnyAnimationCanvas';
import { ActiveSection } from './types';
import { startBirthdayMelody, stopBirthdayMelody, playChime } from './utils/audio';

export default function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('hero');
  const [isMuted, setIsMuted] = useState<boolean>(true); // Sound off by default per technical requirements

  const handleToggleSound = () => {
    setIsMuted((prev) => {
      const next = !prev;
      if (!next) {
        startBirthdayMelody();
      } else {
        stopBirthdayMelody();
      }
      return next;
    });
  };

  const scrollTo = (elementId: string, sectionKey: ActiveSection) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionKey);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection(sectionKey);
    }
  };

  const handleNavigate = (section: ActiveSection) => {
    switch (section) {
      case 'hero':
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveSection('hero');
        break;
      case 'gallery':
        scrollTo('gallery-section', 'gallery');
        break;
      case 'age':
        scrollTo('age-scanner-section', 'age');
        break;
      case 'messages':
        scrollTo('messages-section', 'messages');
        break;
      case 'closing':
        scrollTo('closing-section', 'closing');
        break;
    }
    playChime(523.25, 0.3, 0.08);
  };

  // Scroll spy to update active section indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const galleryEl = document.getElementById('gallery-section');
      const ageEl = document.getElementById('age-scanner-section');
      const messagesEl = document.getElementById('messages-section');
      const closingEl = document.getElementById('closing-section');

      if (closingEl && scrollY + windowHeight * 0.6 >= closingEl.offsetTop) {
        setActiveSection('closing');
      } else if (messagesEl && scrollY + windowHeight * 0.6 >= messagesEl.offsetTop) {
        setActiveSection('messages');
      } else if (ageEl && scrollY + windowHeight * 0.6 >= ageEl.offsetTop) {
        setActiveSection('age');
      } else if (galleryEl && scrollY + windowHeight * 0.6 >= galleryEl.offsetTop) {
        setActiveSection('gallery');
      } else {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen font-body text-[#5D4037] selection:bg-[#FFD1DC] selection:text-[#D87093] pb-24">
      {/* Background with floating pastel particles */}
      <FloatingBackground />

      {/* Funny creative floating animation layer (Katinko, Dubai Choco, Nyanta, Chrome + Birthday Chaos button) */}
      <FunnyAnimationCanvas />

      {/* Floating navigation & audio toggle */}
      <NavigationControls
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* 1. Landing Screen */}
        <LandingHero
          onOpenGift={() => handleNavigate('gallery')}
          isMuted={isMuted}
          onToggleSound={handleToggleSound}
        />

        {/* 2. Photo Gallery & Slideshow */}
        <PhotoGallery onContinueToMessages={() => handleNavigate('age')} />

        {/* 3. Funny Age Scanner & Mystery Meter (Since Giovanni doesn't know her age) */}
        <FunnyAgeGuesser />

        {/* 4. Messages & Unfolding Letters */}
        <MessagesSection onContinueToClosing={() => handleNavigate('closing')} />

        {/* 5. Closing Wish & Interactive Cake */}
        <ClosingWish onRestart={() => handleNavigate('hero')} />
      </main>
    </div>
  );
}
