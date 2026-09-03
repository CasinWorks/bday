import React, { useState } from 'react';
import { Sparkles, HelpCircle, RefreshCw, Award, Search, Zap, CheckCircle2 } from 'lucide-react';
import { playChime, playScannerTick, playFunnyTada, playBoingSound } from '../utils/audio';
import { launchPastelConfetti } from '../utils/confetti';

interface FunnyAgeVerdict {
  age: string;
  tagline: string;
  description: string;
  badge: string;
  emoji: string;
}

const FUNNY_VERDICTS: FunnyAgeVerdict[] = [
  {
    age: 'Level 18 (with 5+ years of DLC)',
    tagline: 'Legally an adult, spiritually a teenager',
    description: 'Still eligible for student discounts if the cashier does not look too closely. Back pain has begun.',
    badge: 'K-Pop Streaming Age',
    emoji: '🎓',
  },
  {
    age: '21 (Before Tax & Inflation)',
    tagline: 'Forever 21 (subject to 12% VAT in the Philippines)',
    description: 'Old enough to make wise life decisions, young enough to eat Dubai Chewy Choco for dinner.',
    badge: 'Dubai Choco Tier',
    emoji: '🍫',
  },
  {
    age: 'Katinko Mentol Era 🧴',
    tagline: 'Officially entered the soothing menthol phase of life',
    description: 'Her purse now contains at least one bottle of Katinko, white flower oil, and a pack of Salonpas.',
    badge: 'Certified Tita Vibe',
    emoji: '🧴',
  },
  {
    age: '404: Age Not Found 🌐',
    tagline: 'Chrome says: "Wag mo ipressure sarili mo"',
    description: 'The browser crashed while trying to compute. Mary’s exact age is an encrypted secret.',
    badge: 'Classified by Chrome',
    emoji: '🌐',
  },
  {
    age: 'Ageless K-Pop Idol 💎',
    tagline: 'Preserved by Seventeen Carat Land and aespa choreography',
    description: 'Scientists confirm her cells regenerate every time a new Katseye or Seventeen music video drops.',
    badge: 'Carat Land VIP',
    emoji: '✨',
  },
  {
    age: 'Only Nyanta Knows 🐱',
    tagline: 'Nyanta says: "Happy Burpdey Marry, Godbless!"',
    description: 'Nyanta knows the truth but communicates strictly in purrs and meows. Mystery unsolved.',
    badge: 'Cat Approved',
    emoji: '🐾',
  },
  {
    age: '18.999 (Subscription Renews Annually)',
    tagline: 'Canceled auto-renewal on aging',
    description: 'Giovanni refused to guess any higher to avoid being blocked on social media.',
    badge: 'Giovanni Survival Mode',
    emoji: '🛡️',
  },
];

export const FunnyAgeGuesser: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [manualGuess, setManualGuess] = useState('');
  const [manualReaction, setManualReaction] = useState<string | null>(null);

  const scanStages = [
    'Scanning Spotify for Seventeen Carat Land repeats...',
    'Measuring Katinko Mentol balm application radius...',
    'Counting remaining Dubai Chewy Choco wrappers...',
    'Querying Google Chrome (Chrome: "Ease mo lang sarili")...',
    'Analyzing Nyanta purr frequencies...',
    'Finalizing official age determination...',
  ];

  const handleStartScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setScanStep(0);
    playBoingSound();

    let step = 0;
    const interval = window.setInterval(() => {
      step++;
      setScanStep(step);
      playScannerTick(600 + step * 80);

      if (step >= scanStages.length - 1) {
        clearInterval(interval);
        setTimeout(() => {
          setIsScanning(false);
          const nextIndex = (currentIndex + 1) % FUNNY_VERDICTS.length;
          setCurrentIndex(nextIndex);
          playFunnyTada();
          launchPastelConfetti(window.innerWidth / 2, window.innerHeight / 2, 60);
        }, 500);
      }
    }, 450);
  };

  const handleManualCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(manualGuess.trim(), 10);

    if (isNaN(num)) {
      setManualReaction('Please enter a number, or is Mary\'s age purely philosophical? 😂');
      playBoingSound();
      return;
    }

    if (num < 18) {
      setManualReaction(`Wait, ${num}?! Calling Barangay Kagawad Synth for child labor inspection! 🚨👶`);
    } else if (num === 18) {
      setManualReaction('Ah, legal adult! Time to enjoy unlimited Dubai Choco without asking for permission! 🍫✨');
    } else if (num <= 23) {
      setManualReaction(`${num}? Prime Katseye & aespa stan age! You look radiant! 💎`);
    } else if (num <= 28) {
      setManualReaction(`${num}? You have unlocked: Katinko Mentol + back massages after 2 hours of sitting 🧴👵`);
    } else if (num <= 35) {
      setManualReaction(`${num}? Chrome reminds you: "WAG mo ipressure sarili mo, marami ka pang ma-experience!" 🌐💖`);
    } else {
      setManualReaction(`${num}?! Wow, a legendary immortal! Respect your elders, kids! 👑✨`);
    }

    playChime(784, 0.4, 0.12);
    launchPastelConfetti(window.innerWidth / 2, window.innerHeight / 2, 35);
  };

  const currentVerdict = FUNNY_VERDICTS[currentIndex];

  return (
    <section id="age-scanner-section" className="py-10 md:py-16 px-4 max-w-4xl mx-auto">
      <div className="bg-white/90 backdrop-blur-sm p-6 sm:p-10 rounded-[40px] shadow-lg border-2 border-[#FFD1DC] relative overflow-hidden">
        {/* Decorative corner stamp */}
        <div className="absolute top-[-10px] right-[-10px] sm:top-4 sm:right-6 rotate-6 bg-[#FFF0F5] border-2 border-[#FFB7C5] rounded-2xl px-3 py-1 text-[11px] font-sans font-bold text-[#D87093] shadow-xs flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Top Secret Age Dossier</span>
        </div>

        {/* Section Header */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#FFB7C5] text-white text-xs font-sans font-semibold uppercase tracking-widest shadow-xs">
            <Search className="w-3.5 h-3.5 text-white" />
            <span>Mystery Age Investigation 🕵️‍♀️</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-artistic text-[#D87093] drop-shadow-sm">
            How Old is Mary? (Nobody Knows) 😂🎂
          </h2>
          <p className="text-sm sm:text-base italic font-serif text-[#8E767C] max-w-lg mx-auto">
            Official note: Giovanni really doesn't know Mary's actual age, so our high-tech birthday AI is calculating it scientifically.
          </p>
        </div>

        {/* Scanner Card */}
        <div className="bg-[#FFF9FB] p-6 sm:p-8 rounded-3xl border-2 border-[#FFE4E1] shadow-inner text-center relative overflow-hidden">
          {/* Scanning Progress Overlay */}
          {isScanning ? (
            <div className="py-8 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#FFD1DC] flex items-center justify-center animate-spin text-3xl shadow-md">
                🔍
              </div>
              <div className="space-y-2">
                <p className="font-bold text-base sm:text-lg text-[#D87093] font-serif-artistic animate-pulse">
                  {scanStages[scanStep]}
                </p>
                {/* Progress bar */}
                <div className="w-full max-w-xs mx-auto bg-white rounded-full h-3 overflow-hidden border border-[#FFB7C5]">
                  <div
                    className="bg-gradient-to-r from-[#FFB7C5] via-[#D87093] to-[#AEC6CF] h-full transition-all duration-300 rounded-full"
                    style={{ width: `${((scanStep + 1) / scanStages.length) * 100}%` }}
                  />
                </div>
              </div>
              <p className="text-xs text-[#8E767C] italic">Consulting Katinko, Chrome, and Dubai Choco...</p>
            </div>
          ) : (
            <div className="space-y-4 animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#FFD1DC] text-xs font-bold text-[#D87093] shadow-xs">
                <Award className="w-3.5 h-3.5 text-[#D87093]" />
                <span>{currentVerdict.badge}</span>
              </div>

              <div className="text-4xl sm:text-5xl my-2 animate-bounce" style={{ animationDuration: '2s' }}>
                {currentVerdict.emoji}
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-serif-artistic text-[#D87093] tracking-tight">
                  {currentVerdict.age}
                </h3>
                <p className="font-handwriting text-2xl sm:text-3xl text-[#5D4037] font-semibold mt-1">
                  "{currentVerdict.tagline}"
                </p>
              </div>

              <p className="text-sm sm:text-base text-[#5D4037] max-w-md mx-auto leading-relaxed bg-white/80 p-4 rounded-2xl border border-[#FFE4E1] shadow-xs">
                {currentVerdict.description}
              </p>

              {/* Action button to re-scan */}
              <div className="pt-3">
                <button
                  id="scan-age-button"
                  onClick={handleStartScan}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-3xl bg-[#D87093] hover:bg-[#c65f82] text-white font-bold text-sm sm:text-base shadow-md shadow-[#D87093]/25 transition-all duration-300 hover:scale-102 active:scale-95 cursor-pointer border-2 border-[#D87093]"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Spin Age Roulette 🎰</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Manual Guessing Section */}
        <div className="mt-8 pt-6 border-t border-dashed border-[#FFD1DC] text-center">
          <p className="text-xs sm:text-sm font-bold font-sans uppercase tracking-widest text-[#8E767C] mb-3">
            Do You Know Mary's Real Age? Test Your Guess:
          </p>

          <form onSubmit={handleManualCheck} className="flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-md mx-auto">
            <input
              type="text"
              placeholder="e.g. 18, 22, 25..."
              value={manualGuess}
              onChange={(e) => setManualGuess(e.target.value)}
              className="w-full sm:w-48 px-4 py-2.5 rounded-2xl bg-white border-2 border-[#FFD1DC] text-[#5D4037] font-bold text-center text-sm focus:outline-none focus:border-[#D87093] shadow-xs"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-white hover:bg-[#FFF5F7] border-2 border-[#FFB7C5] text-[#D87093] font-bold text-sm shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              Verify Age 🔎
            </button>
            <button
              type="button"
              onClick={() => {
                setManualReaction("Giovanni: 'I swear I really don't know her age, please Mary don't get mad at me 😂🙏'");
                playBoingSound();
              }}
              className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-[#FFF0F5] hover:bg-[#FFE4E1] text-[#8E767C] text-xs font-semibold active:scale-95 transition-all cursor-pointer"
            >
              Ask Giovanni 🤷‍♂️
            </button>
          </form>

          {manualReaction && (
            <div className="mt-4 p-3 bg-white rounded-2xl border border-[#FFB7C5] text-xs sm:text-sm font-bold text-[#D87093] max-w-md mx-auto animate-fadeIn shadow-xs flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D87093] flex-shrink-0" />
              <span>{manualReaction}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
