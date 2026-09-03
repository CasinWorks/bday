import React from 'react';
import { Gift, Sparkles, Heart, ChevronDown, Music2 } from 'lucide-react';
import { playChime, playCelebrationHarp } from '../utils/audio';
import { launchPastelConfetti } from '../utils/confetti';

interface LandingHeroProps {
  onOpenGift: () => void;
  isMuted: boolean;
  onToggleSound: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onOpenGift,
  isMuted,
  onToggleSound,
}) => {
  const handlePrimaryClick = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    launchPastelConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 60);
    playCelebrationHarp();
    onOpenGift();
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-12 md:py-16">
      {/* Decorative top pill badge per Artistic Flair */}
      <div className="bg-[#FFB7C5] text-white px-5 py-1.5 rounded-full text-xs font-sans tracking-widest uppercase mb-4 shadow-sm inline-flex items-center gap-2 animate-gentle-sway">
        <Sparkles className="w-3.5 h-3.5 text-white animate-spin" style={{ animationDuration: '8s' }} />
        <span>Special Celebration</span>
        <Heart className="w-3.5 h-3.5 fill-white text-white" />
      </div>

      {/* Main Headline */}
      <div className="max-w-3xl mx-auto space-y-3">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold font-serif-artistic text-[#D87093] drop-shadow-sm leading-[1.15]">
          Happy Birthday,{' '}
          <span className="font-handwriting text-6xl sm:text-7xl md:text-8xl text-[#D87093] inline-block drop-shadow-xs rotate-[-2deg]">
            Mary!
          </span>{' '}
          🎂
        </h1>

        <p className="text-[#8E767C] italic text-lg sm:text-xl font-serif max-w-xl mx-auto leading-relaxed">
          Wishing you a day filled with all the things you love.
        </p>
      </div>

      {/* Cute Birthday Gift Presentation Card with Artistic Flair styling */}
      <div className="mt-8 mb-10 relative">
        <div 
          className="w-44 h-44 sm:w-52 sm:h-52 mx-auto bg-white p-5 rounded-[40px] shadow-lg border-2 border-[#FFD1DC] transform -rotate-1 hover:rotate-0 transition-transform duration-300 flex flex-col items-center justify-center relative group cursor-pointer active:scale-95"
          onClick={handlePrimaryClick}
        >
          {/* Subtle pink ambient blur */}
          <div className="absolute inset-0 rounded-[40px] bg-[#FFE4E1]/50 blur-xl group-hover:bg-[#FFD1DC]/60 transition-colors pointer-events-none" />
          
          <div className="relative z-10 w-full h-full bg-[#FDF2F5] rounded-2xl border border-[#FFE4E1] flex flex-col items-center justify-center p-3">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/95 shadow-sm flex items-center justify-center text-4xl sm:text-5xl mb-2 animate-soft-pulse">
              🎁
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-[#D87093] bg-white/90 px-3 py-1 rounded-full shadow-xs tracking-wide">
              Tap to unwrap
            </span>
          </div>
        </div>

        {/* Small floating sparkles around gift */}
        <span className="absolute -top-2 -left-2 text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>✨</span>
        <span className="absolute top-2 -right-4 text-2xl animate-bounce" style={{ animationDelay: '0.6s' }}>💖</span>
        <span className="absolute -bottom-2 right-2 text-xl animate-bounce" style={{ animationDelay: '1s' }}>🍰</span>
      </div>

      {/* Primary CTA Buttons per Artistic Flair action style */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          id="open-gift-button"
          onClick={handlePrimaryClick}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-3xl bg-[#D87093] hover:bg-[#c65f82] text-white font-bold text-lg sm:text-xl shadow-md shadow-[#D87093]/30 transition-all duration-300 hover:scale-102 active:scale-95 cursor-pointer border-2 border-[#D87093]"
        >
          <Gift className="w-6 h-6 transition-transform group-hover:rotate-12 group-hover:scale-110" />
          <span>Open Your Gift 🎁</span>
          <Sparkles className="w-5 h-5 opacity-90" />
        </button>

        <button
          onClick={() => {
            onToggleSound();
            playChime(659.25, 0.8, 0.1);
          }}
          className="inline-flex items-center gap-2 px-6 py-4 rounded-3xl bg-white border-2 border-[#FFE4E1] hover:bg-[#F0FFFF] text-[#D87093] text-sm sm:text-base font-bold shadow-xs hover:shadow-sm transition-all active:scale-95 cursor-pointer"
          title={isMuted ? "Turn on birthday music box" : "Mute music box"}
        >
          <Music2 className={`w-5 h-5 ${!isMuted ? 'text-[#D87093] animate-pulse' : 'text-[#8E767C]'}`} />
          <span>{isMuted ? 'Play Music 🎵' : 'Mute Music 🎶'}</span>
        </button>
      </div>

      {/* Downward cue */}
      <div 
        onClick={onOpenGift}
        className="mt-12 flex flex-col items-center gap-1 text-xs sm:text-sm font-medium italic font-serif text-[#8E767C] cursor-pointer hover:text-[#D87093] transition-colors animate-bounce"
      >
        <span>Scroll or tap to see your memories & letters</span>
        <ChevronDown className="w-5 h-5 text-[#D87093]" />
      </div>
    </section>
  );
};
