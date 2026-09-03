import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Rocket, X, Heart } from 'lucide-react';
import { playBoingSound, playChime, playCelebrationHarp } from '../utils/audio';
import { launchPastelConfetti } from '../utils/confetti';

interface FlyingSprite {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  emoji: string;
  label: string;
  rotation: number;
  vr: number;
  color: string;
}

const MEME_QUOTES = [
  { emoji: '🧴', text: 'More blessings to comeeeee! — Katinko Mentol', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  { emoji: '🐱', text: 'Happy Burpdey Marry, Godbless! — Nyanta', color: 'bg-orange-100 text-orange-800 border-orange-300' },
  { emoji: '🌐', text: 'WAG mo ipressure sarili mo marami ka pang ma experience! — chrome', color: 'bg-blue-100 text-blue-800 border-blue-300' },
  { emoji: '🍫', text: 'More Dubai Chewy Choco for you! — Brgy Kagawad Synth', color: 'bg-pink-100 text-pink-800 border-pink-300' },
  { emoji: '💻', text: 'A cute website (I THINK?) — Giovanni', color: 'bg-amber-100 text-amber-800 border-amber-300' },
  { emoji: '🎂', text: 'Mary’s age is classified by the government! 🕵️‍♀️', color: 'bg-purple-100 text-purple-800 border-purple-300' },
  { emoji: '💎', text: 'aespa & Seventeen dancing in the background! ✨', color: 'bg-rose-100 text-rose-800 border-rose-300' },
];

export const FunnyAnimationCanvas: React.FC = () => {
  const [chaosActive, setChaosActive] = useState(false);
  const [sprites, setSprites] = useState<FlyingSprite[]>([]);
  const [activeSpeech, setActiveSpeech] = useState<{ x: number; y: number; text: string; emoji: string } | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Trigger full-screen funny celebration chaos
  const launchChaos = () => {
    setChaosActive(true);
    playCelebrationHarp();
    playBoingSound();
    launchPastelConfetti(window.innerWidth / 2, window.innerHeight * 0.3, 80);

    const items: FlyingSprite[] = [];
    const emojis = ['🧴', '🍫', '🐱', '🌐', '🎂', '💎', '🍰', '🌸', '✨', '🎈'];
    const labels = [
      'Katinko Mentol 🧴',
      'Dubai Choco 🍫',
      'Nyanta 🐱',
      'Chrome Advice 🌐',
      'Happy Birthday 🎂',
      'Carat Land 💎',
      'Sweet Cake 🍰',
      'Flower Power 🌸',
      'Sparkle ✨',
      'Age Balloon 🎈',
    ];

    for (let i = 0; i < 18; i++) {
      const idx = i % emojis.length;
      items.push({
        id: `sprite-${Date.now()}-${i}`,
        x: Math.random() * (window.innerWidth - 80) + 40,
        y: Math.random() * (window.innerHeight * 0.4) + 50,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 3 - 2,
        size: Math.random() * 20 + 35,
        emoji: emojis[idx],
        label: labels[idx],
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 6,
        color: '#FFB7C5',
      });
    }
    setSprites(items);

    // Pick random funny quote banner
    const quote = MEME_QUOTES[Math.floor(Math.random() * MEME_QUOTES.length)];
    setActiveSpeech({
      x: window.innerWidth / 2,
      y: window.innerHeight * 0.35,
      text: quote.text,
      emoji: quote.emoji,
    });
  };

  // Animation loop for bouncy floating items during chaos
  useEffect(() => {
    if (!chaosActive || sprites.length === 0) return;

    const updatePhysics = () => {
      setSprites((prev) =>
        prev.map((item) => {
          let newX = item.x + item.vx;
          let newY = item.y + item.vy;
          let newVx = item.vx;
          let newVy = item.vy + 0.08; // gentle gravity
          let newRot = item.rotation + item.vr;

          // Screen bounce boundaries
          if (newX < 20) {
            newX = 20;
            newVx = Math.abs(newVx) * 0.9;
          } else if (newX > window.innerWidth - 60) {
            newX = window.innerWidth - 60;
            newVx = -Math.abs(newVx) * 0.9;
          }

          if (newY < 20) {
            newY = 20;
            newVy = Math.abs(newVy) * 0.9;
          } else if (newY > window.innerHeight - 80) {
            newY = window.innerHeight - 80;
            newVy = -Math.abs(newVy) * 0.85;
          }

          return {
            ...item,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
            rotation: newRot,
          };
        })
      );
      animFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    animFrameRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [chaosActive, sprites.length]);

  const handleSpriteClick = (sprite: FlyingSprite) => {
    playBoingSound();
    playChime(700 + Math.random() * 300, 0.4, 0.12);
    launchPastelConfetti(sprite.x, sprite.y, 25);

    // Show random witty speech bubble on clicked item
    const quote = MEME_QUOTES[Math.floor(Math.random() * MEME_QUOTES.length)];
    setActiveSpeech({
      x: sprite.x,
      y: Math.max(80, sprite.y - 40),
      text: quote.text,
      emoji: sprite.emoji,
    });
  };

  return (
    <>
      {/* Persistent floating cute mascots in background (Katinko, Dubai Choco, Nyanta, Chrome) */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Floating Katinko Mentol with gentle soothing mint drift */}
        <div
          className="absolute pointer-events-auto cursor-pointer transition-transform hover:scale-125 select-none"
          style={{
            top: '22%',
            left: '3%',
            animation: 'float-up 14s ease-in-out infinite alternate',
          }}
          onClick={() => {
            playBoingSound();
            setActiveSpeech({
              x: 100,
              y: 200,
              text: 'Katinko Mentol: "More blessings to comeeeee! Masakit ba likod mo? 🧴✨"',
              emoji: '🧴',
            });
          }}
          title="Katinko Mentol — Tap for relief!"
        >
          <div className="flex items-center gap-1 bg-white/90 border-2 border-emerald-300 rounded-full px-2.5 py-1 shadow-sm text-xs font-bold text-emerald-700">
            <span className="text-lg">🧴</span>
            <span className="hidden sm:inline">Katinko Mentol</span>
          </div>
        </div>

        {/* Floating Dubai Chewy Choco */}
        <div
          className="absolute pointer-events-auto cursor-pointer transition-transform hover:scale-125 select-none"
          style={{
            top: '45%',
            right: '3%',
            animation: 'float-up 16s ease-in-out 2s infinite alternate-reverse',
          }}
          onClick={() => {
            playChime(659, 0.5, 0.1);
            setActiveSpeech({
              x: window.innerWidth - 200,
              y: 350,
              text: 'Brgy Kagawad Synth: "More Dubai Chewy Choco for you! 🍫"',
              emoji: '🍫',
            });
          }}
          title="Dubai Chewy Choco — Tap for sweetness!"
        >
          <div className="flex items-center gap-1 bg-white/90 border-2 border-pink-300 rounded-full px-2.5 py-1 shadow-sm text-xs font-bold text-pink-700">
            <span className="text-lg">🍫</span>
            <span className="hidden sm:inline">Dubai Choco</span>
          </div>
        </div>

        {/* Floating Nyanta Cat */}
        <div
          className="absolute pointer-events-auto cursor-pointer transition-transform hover:scale-125 select-none"
          style={{
            bottom: '25%',
            left: '4%',
            animation: 'float-up 18s ease-in-out 4s infinite alternate',
          }}
          onClick={() => {
            playBoingSound();
            setActiveSpeech({
              x: 120,
              y: window.innerHeight - 250,
              text: 'Nyanta: "Happy Burpdey Marry, Godbless! 🐱🐾"',
              emoji: '🐱',
            });
          }}
          title="Nyanta — Tap for meows!"
        >
          <div className="flex items-center gap-1 bg-white/90 border-2 border-orange-300 rounded-full px-2.5 py-1 shadow-sm text-xs font-bold text-orange-700">
            <span className="text-lg">🐱</span>
            <span className="hidden sm:inline">Nyanta</span>
          </div>
        </div>

        {/* Floating Chrome Advice */}
        <div
          className="absolute pointer-events-auto cursor-pointer transition-transform hover:scale-125 select-none"
          style={{
            bottom: '15%',
            right: '4%',
            animation: 'float-up 15s ease-in-out 1s infinite alternate-reverse',
          }}
          onClick={() => {
            playChime(523, 0.5, 0.1);
            setActiveSpeech({
              x: window.innerWidth - 240,
              y: window.innerHeight - 200,
              text: 'chrome: "Sana ease mo lang sarili, WAG mo ipressure sarili mo! 🌐"',
              emoji: '🌐',
            });
          }}
          title="Chrome — Tap for wisdom!"
        >
          <div className="flex items-center gap-1 bg-white/90 border-2 border-blue-300 rounded-full px-2.5 py-1 shadow-sm text-xs font-bold text-blue-700">
            <span className="text-lg">🌐</span>
            <span className="hidden sm:inline">chrome advice</span>
          </div>
        </div>
      </div>

      {/* Floating Action Pill on the bottom-right to trigger Birthday Chaos anytime */}
      <div className="fixed bottom-20 right-4 z-40">
        <button
          onClick={launchChaos}
          className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/95 hover:bg-[#FFF5F7] border-2 border-[#FFD1DC] text-[#D87093] font-bold text-xs sm:text-sm shadow-lg shadow-[#FFD1DC]/50 hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer font-sans"
          title="Launch Emergency Katinko Relief & Birthday Chaos!"
        >
          <Rocket className="w-4 h-4 text-[#D87093] group-hover:rotate-12 transition-transform" />
          <span>Birthday Chaos 🚀🧴</span>
        </button>
      </div>

      {/* Funny Speech Bubble Popup */}
      {activeSpeech && (
        <div
          className="fixed z-50 transform -translate-x-1/2 -translate-y-full animate-fadeIn select-none"
          style={{
            left: `${Math.min(Math.max(activeSpeech.x, 150), window.innerWidth - 150)}px`,
            top: `${Math.max(activeSpeech.y, 90)}px`,
          }}
        >
          <div className="bg-white p-3.5 sm:p-4 rounded-3xl shadow-2xl border-2 border-[#FFB7C5] max-w-xs sm:max-w-sm text-center relative">
            <button
              onClick={() => setActiveSpeech(null)}
              className="absolute top-2 right-2 w-5 h-5 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer text-xs"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="text-2xl mb-1">{activeSpeech.emoji}</div>
            <p className="text-xs sm:text-sm font-bold text-[#5D4037] leading-snug">
              {activeSpeech.text}
            </p>
            {/* Cute bottom triangle pointer */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-[#FFB7C5] transform rotate-45" />
          </div>
        </div>
      )}

      {/* Full Screen Chaos Overlay when active */}
      {chaosActive && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          {/* Subtle party aurora backdrop */}
          <div className="absolute inset-0 bg-pink-300/10 backdrop-blur-[1px] animate-pulse" />

          {/* Top banner */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 pointer-events-auto bg-white/95 px-6 py-2.5 rounded-full border-2 border-[#FFB7C5] shadow-xl flex items-center gap-2 text-xs sm:text-sm font-bold text-[#D87093] animate-bounce font-sans">
            <Sparkles className="w-4 h-4 text-[#D87093]" />
            <span>EMERGENCY KATINKO & BIRTHDAY RELIEF INCOMING! 🧴🍫✨</span>
            <button
              onClick={() => setChaosActive(false)}
              className="ml-2 w-5 h-5 rounded-full bg-[#FFF0F5] hover:bg-[#FFD1DC] flex items-center justify-center cursor-pointer text-xs"
              title="Close chaos"
            >
              ✕
            </button>
          </div>

          {/* Interactive Bouncing Sprites */}
          {sprites.map((sprite) => (
            <div
              key={sprite.id}
              onClick={() => handleSpriteClick(sprite)}
              className="absolute pointer-events-auto cursor-pointer transition-transform hover:scale-125 select-none flex flex-col items-center"
              style={{
                left: `${sprite.x}px`,
                top: `${sprite.y}px`,
                transform: `rotate(${sprite.rotation}deg)`,
                fontSize: `${sprite.size}px`,
              }}
              title={`${sprite.label} (Tap me!)`}
            >
              <span>{sprite.emoji}</span>
              <span className="text-[9px] font-bold font-sans bg-white/90 text-[#5D4037] px-1.5 py-0.5 rounded-full shadow-xs whitespace-nowrap mt-0.5">
                {sprite.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
