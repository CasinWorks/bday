import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Image, Mail, Gift, Cake, HelpCircle } from 'lucide-react';
import { ActiveSection } from '../types';
import { playChime } from '../utils/audio';
import { launchPastelConfetti } from '../utils/confetti';

interface NavigationControlsProps {
  activeSection: ActiveSection;
  onNavigate: (section: ActiveSection) => void;
  isMuted: boolean;
  onToggleSound: () => void;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  activeSection,
  onNavigate,
  isMuted,
  onToggleSound,
}) => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 120);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleConfettiBlast = () => {
    launchPastelConfetti(window.innerWidth / 2, window.innerHeight / 3, 70);
    playChime(783.99, 0.6, 0.1);
  };

  return (
    <>
      {/* Top Floating Sound & Confetti Bar */}
      <header className="fixed top-3 right-3 sm:top-4 sm:right-4 z-40 flex items-center gap-2">
        <button
          onClick={handleConfettiBlast}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-[#FFF5F7] border-2 border-[#FFD1DC] text-[#D87093] hover:text-[#c65f82] shadow-md shadow-[#FFD1DC]/40 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Sparkle & Confetti"
          aria-label="Sparkle and confetti"
        >
          <Sparkles className="w-5 h-5" />
        </button>

        <button
          onClick={onToggleSound}
          className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-full border-2 shadow-md flex items-center gap-2 text-xs sm:text-sm font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer font-sans ${
            !isMuted
              ? 'bg-[#D87093] text-white border-[#D87093] shadow-[#D87093]/30'
              : 'bg-white/95 hover:bg-[#FFF5F7] text-[#5D4037] border-[#FFE4E1] shadow-xs'
          }`}
          title={isMuted ? 'Turn music ON' : 'Turn music OFF'}
          aria-label="Toggle birthday music"
        >
          {!isMuted ? (
            <>
              <Volume2 className="w-4 h-4 animate-pulse" />
              <span className="hidden sm:inline">Music ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-[#8E767C]" />
              <span className="hidden sm:inline">Music OFF</span>
            </>
          )}
        </button>
      </header>

      {/* Floating Bottom Navigation Bar for Mobile & Desktop */}
      <nav
        className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ${
          hasScrolled ? 'opacity-100 translate-y-0' : 'opacity-90 translate-y-0'
        }`}
      >
        <div className="flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-full bg-white/95 backdrop-blur-md border-2 border-[#FFD1DC] shadow-xl shadow-[#FFD1DC]/40">
          <button
            onClick={() => onNavigate('hero')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer font-sans ${
              activeSection === 'hero'
                ? 'bg-[#D87093] text-white shadow-xs'
                : 'text-[#8E767C] hover:text-[#D87093] hover:bg-[#FFF0F5]'
            }`}
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Intro</span>
          </button>

          <button
            onClick={() => onNavigate('gallery')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer font-sans ${
              activeSection === 'gallery'
                ? 'bg-[#D87093] text-white shadow-xs'
                : 'text-[#8E767C] hover:text-[#D87093] hover:bg-[#FFF0F5]'
            }`}
          >
            <Image className="w-3.5 h-3.5" />
            <span>Memories</span>
          </button>

          <button
            onClick={() => onNavigate('age')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer font-sans ${
              activeSection === 'age'
                ? 'bg-[#D87093] text-white shadow-xs'
                : 'text-[#8E767C] hover:text-[#D87093] hover:bg-[#FFF0F5]'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Age ??</span>
          </button>

          <button
            onClick={() => onNavigate('messages')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer font-sans ${
              activeSection === 'messages'
                ? 'bg-[#D87093] text-white shadow-xs'
                : 'text-[#8E767C] hover:text-[#D87093] hover:bg-[#FFF0F5]'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Letters</span>
          </button>

          <button
            onClick={() => onNavigate('closing')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer font-sans ${
              activeSection === 'closing'
                ? 'bg-[#D87093] text-white shadow-xs'
                : 'text-[#8E767C] hover:text-[#D87093] hover:bg-[#FFF0F5]'
            }`}
          >
            <Cake className="w-3.5 h-3.5" />
            <span>Wish</span>
          </button>
        </div>
      </nav>
    </>
  );
};
