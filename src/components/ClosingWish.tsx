import React, { useState } from 'react';
import { Sparkles, Heart, RotateCcw, PartyPopper, Download, Share2, Check } from 'lucide-react';
import { playCandleBlow, playCelebrationHarp, playChime } from '../utils/audio';
import { launchPastelConfetti } from '../utils/confetti';

interface ClosingWishProps {
  onRestart: () => void;
}

export const ClosingWish: React.FC<ClosingWishProps> = ({ onRestart }) => {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [candleAgeTopper, setCandleAgeTopper] = useState('❓');

  const CANDLE_AGE_OPTIONS = [
    { label: '❓ Unknown (Giovanni’s Guess)', value: '❓' },
    { label: '18+ ✨', value: '18+' },
    { label: '21 📈 (VAT Included)', value: '21' },
    { label: '🧴 Katinko Era', value: '🧴' },
    { label: '🍫 Dubai Choco Age', value: '🍫' },
  ];

  const handleBlowCandles = (e: React.MouseEvent) => {
    if (!candlesBlown) {
      setCandlesBlown(true);
      playCandleBlow();
      setTimeout(() => {
        playCelebrationHarp();
        launchPastelConfetti(window.innerWidth / 2, window.innerHeight / 2, 100);
      }, 400);
    } else {
      // Re-light and celebrate again
      launchPastelConfetti(window.innerWidth / 2, window.innerHeight / 2, 80);
      playCelebrationHarp();
    }
  };

  const handleReLight = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCandlesBlown(false);
    playChime(523.25, 0.4, 0.1);
  };

  const handleDownloadStandalone = () => {
    playChime(659.25, 0.5, 0.1);
    // Link to download the pre-generated standalone html file
    const link = document.createElement('a');
    link.href = '/happy-birthday-mary.html';
    link.download = 'happy-birthday-mary.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Happy Birthday Mary! 🎂',
          text: 'Check out this cute birthday website for Mary! 🌸',
          url: window.location.href,
        });
      } catch {
        // Fallback
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <section id="closing-section" className="py-16 md:py-24 px-4 max-w-3xl mx-auto text-center">
      {/* Decorative tag per Artistic Flair */}
      <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#FFB7C5] text-white text-xs font-sans tracking-widest uppercase mb-6 shadow-xs animate-gentle-sway">
        <Sparkles className="w-3.5 h-3.5 text-white" />
        <span>A Final Birthday Wish</span>
        <Heart className="w-3.5 h-3.5 fill-white text-white" />
      </div>

      {/* Headline */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-artistic text-[#D87093] mb-3 drop-shadow-sm">
        Make a Wish,{' '}
        <span className="font-handwriting text-5xl sm:text-6xl text-[#D87093] rotate-[-1deg] inline-block">
          Mary!
        </span>{' '}
        ✨
      </h2>

      <p className="text-base sm:text-lg italic font-serif text-[#8E767C] max-w-lg mx-auto mb-10 leading-relaxed">
        {candlesBlown
          ? '🎉 Woohoo! Your wish is on its way to coming true! May this year be filled with radiant love and joy!'
          : 'Close your eyes, make your deepest wish, and tap the cake to blow out your candles! 🎂'}
      </p>

      {/* Funny Age Candle Switcher */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-2 max-w-md mx-auto">
        <span className="text-xs font-bold text-[#8E767C] w-full block mb-1">
          Pick Mary's Cake Candle Age (Since Giovanni Doesn't Know 😂):
        </span>
        {CANDLE_AGE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => {
              setCandleAgeTopper(opt.value);
              playChime(600, 0.3, 0.1);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
              candleAgeTopper === opt.value
                ? 'bg-[#D87093] text-white border-[#D87093] shadow-xs scale-105'
                : 'bg-white hover:bg-[#FFF0F5] text-[#5D4037] border-[#FFD1DC]'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Interactive 3D Cake Container in Artistic Flair rounded-[40px] style */}
      <div
        onClick={handleBlowCandles}
        className="relative mx-auto w-72 sm:w-80 p-7 rounded-[40px] bg-white border-2 border-[#FFD1DC] shadow-lg shadow-[#FFD1DC]/40 cursor-pointer group transition-all duration-300 hover:scale-103 active:scale-95 select-none"
      >
        {/* Glow behind cake */}
        <div className="absolute inset-0 bg-[#FFE4E1]/50 rounded-[40px] blur-xl group-hover:bg-[#FFD1DC]/60 transition-colors pointer-events-none" />

        {/* Cake Candles */}
        <div className="relative z-10 flex justify-center items-end gap-6 mb-2">
          {[0, 1, 2].map((candleIndex) => (
            <div key={candleIndex} className="flex flex-col items-center relative">
              {/* Special Funny Topper on Middle Candle */}
              {candleIndex === 1 && (
                <div className="absolute -top-7 px-2 py-0.5 rounded-full bg-white border-2 border-[#FFB7C5] shadow-xs text-xs font-bold text-[#D87093] whitespace-nowrap animate-bounce" style={{ animationDuration: '2.5s' }}>
                  {candleAgeTopper}
                </div>
              )}
              {/* Flame */}
              {!candlesBlown ? (
                <div className="w-4 h-6 rounded-full bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 animate-flame origin-bottom transition-all" />
              ) : (
                <div className="h-6 flex items-center justify-center text-xs opacity-70 animate-bounce">
                  ✨
                </div>
              )}
              {/* Candle Stick */}
              <div
                className={`w-3.5 h-10 rounded-t-sm shadow-xs ${
                  candleIndex === 0
                    ? 'bg-gradient-to-b from-[#FFB7C5] to-[#D87093]'
                    : candleIndex === 1
                    ? 'bg-gradient-to-b from-[#D1E8F7] to-[#AEC6CF]'
                    : 'bg-gradient-to-b from-[#FAF8DE] to-[#F0E68C]'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Cake Tier 1 (Top Frosting) */}
        <div className="relative z-10 mx-auto w-40 h-12 rounded-t-2xl bg-[#FDF2F5] border border-[#FFE4E1] shadow-inner flex items-center justify-center">
          {/* Strawberries / Candies */}
          <div className="flex gap-2.5 text-base">
            <span>🍓</span>
            <span>🌸</span>
            <span>🍓</span>
          </div>
        </div>

        {/* Cake Tier 2 (Bottom Tier) */}
        <div className="relative z-10 mx-auto w-52 h-16 rounded-2xl bg-gradient-to-r from-[#FFE4E1] via-[#FFF9FB] to-[#FFE4E1] border-2 border-white shadow-md flex items-center justify-center">
          <span className="font-serif-artistic text-xl font-bold text-[#D87093] tracking-wide">
            Happy Birthday Mary
          </span>
        </div>

        {/* Cake Plate */}
        <div className="relative z-10 mx-auto w-60 h-3 rounded-full bg-[#FFE4E1] border border-[#FFD1DC] mt-1 shadow-xs" />

        {/* Prompt label */}
        <div className="relative z-10 mt-5">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#FFF0F5] text-[#D87093] font-bold text-xs sm:text-sm border border-[#FFD1DC] shadow-xs">
            {candlesBlown ? 'Candles Blown! Tap to Celebrate Again 🎊' : 'Tap to Blow Out Candles 💨🕯️'}
          </span>
        </div>

        {candlesBlown && (
          <button
            onClick={handleReLight}
            className="relative z-10 mt-2.5 text-xs text-[#8E767C] hover:text-[#D87093] underline cursor-pointer font-sans"
          >
            Re-light candles 🕯️
          </button>
        )}
      </div>

      {/* Heartfelt Note Box */}
      <div className="mt-12 p-6 sm:p-8 rounded-[40px] bg-white/95 border-2 border-[#FFE4E1] shadow-md text-center space-y-4">
        <div className="w-11 h-11 mx-auto rounded-full bg-[#FFD1DC] text-[#D87093] flex items-center justify-center shadow-xs">
          <Heart className="w-5 h-5 fill-[#D87093]" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold font-serif-artistic text-[#D87093]">
          To a Wonderful Year Ahead
        </h3>
        <p className="text-sm sm:text-base text-[#5D4037] leading-relaxed max-w-md mx-auto">
          May your year ahead be as radiant, sweet, and unforgettable as you are, Mary! Thank you for bringing so much light to everyone around you. Here's to more laughter, good health, Dubai chewy chocolates, and jamming out to Katseye, aespa, and Seventeen! 💖
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs font-bold font-sans">
          <span className="px-3.5 py-1 rounded-full bg-[#FFF9FB] text-[#D87093] border border-[#FFB7C5]">🍫 Dubai Choco</span>
          <span className="px-3.5 py-1 rounded-full bg-[#F7FBFF] text-[#4682B4] border border-[#AEC6CF]">✨ Manifestations</span>
          <span className="px-3.5 py-1 rounded-full bg-[#FDFCF0] text-[#857C2F] border border-[#F0E68C]">💎 Carat Land</span>
          <span className="px-3.5 py-1 rounded-full bg-[#FDF2F5] text-[#D87093] border border-[#FFE4E1]">🎂 Forever Loved</span>
        </div>
      </div>

      {/* Bottom Actions per Artistic Flair design */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={handleBlowCandles}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-3xl bg-[#D87093] hover:bg-[#c65f82] text-white font-bold text-sm sm:text-base shadow-md shadow-[#D87093]/25 transition-all active:scale-95 cursor-pointer border-2 border-[#D87093]"
        >
          <PartyPopper className="w-4 h-4" />
          <span>Celebrate with Confetti! 🎉</span>
        </button>
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-5 py-3.5 rounded-3xl bg-white hover:bg-[#F0FFFF] text-[#5D4037] border-2 border-[#FFE4E1] font-bold text-sm shadow-xs transition-all active:scale-95 cursor-pointer"
        >
          {copiedLink ? <Check className="w-4 h-4 text-[#D87093]" /> : <Share2 className="w-4 h-4 text-[#8E767C]" />}
          <span>{copiedLink ? 'Link Copied!' : 'Share Website'}</span>
        </button>

        <button
          onClick={onRestart}
          className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-3xl text-xs font-semibold text-[#8E767C] hover:text-[#D87093] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Back to Top</span>
        </button>
      </div>

      {/* Warm signature per Artistic Flair footer */}
      <footer className="mt-14 text-center text-[#B2A4A8] text-xs sm:text-sm font-sans tracking-widest uppercase">
        Created with ❤️ for Mary's Big Day
      </footer>
    </section>
  );
};
