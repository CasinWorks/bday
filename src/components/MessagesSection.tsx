import React, { useState } from 'react';
import { Mail, MailOpen, Heart, Sparkles, Send, Gift, ChevronRight, Check } from 'lucide-react';
import { LetterMessage } from '../types';
import { playChime, playCelebrationHarp } from '../utils/audio';
import { launchPastelConfetti } from '../utils/confetti';

interface MessagesSectionProps {
  onContinueToClosing: () => void;
}

const LETTERS: LetterMessage[] = [
  {
    id: 'msg-synth',
    sender: 'Brgy Kagawad Synth',
    roleOrNote: 'Sweet Dubai Choco Wishes 🍫',
    content: 'Happy birthday, Mary! More Dubai Chewy Choco for you! 🍫✨ Enjoy your special day to the fullest!',
    avatarEmoji: '🍫',
    sealText: 'SYNTH',
    stampEmoji: '👑',
    envelopeColor: {
      base: 'from-[#FFF9FB] to-[#FFF0F5]',
      flap: 'bg-[#FFD1DC]',
      accent: 'text-[#D87093]',
      border: 'border-[#FFE4E1] border-l-4 border-l-[#FFB7C5]',
      seal: 'bg-[#FFB7C5] text-white',
    },
  },
  {
    id: 'msg-alee-corinne',
    sender: 'Alee / Corinne',
    roleOrNote: 'With all our love & manifestations 🌸',
    content: `Happy birthday, Mary!\n\nI hope you enjoy your day. I pray that all of your manifestations will come true. Take care always! Sana makapag-kita na tayo this year. I love you!\n\nLove,\nAlee/Corinne`,
    avatarEmoji: '🌸',
    sealText: 'LOVE',
    stampEmoji: '🕊️',
    envelopeColor: {
      base: 'from-[#F7FBFF] to-[#EAF4FF]',
      flap: 'bg-[#D1E8F7]',
      accent: 'text-[#4682B4]',
      border: 'border-sky-100 border-l-4 border-l-[#AEC6CF]',
      seal: 'bg-[#4682B4] text-white',
    },
  },
  {
    id: 'msg-giovanni',
    sender: 'Giovanni',
    roleOrNote: 'Your Cute Website Gift 💻🎁',
    content: `Happy happy birthday! here's my little gift for you! a cute website( I THINK?)\n\n- Giovanni`,
    avatarEmoji: '✨',
    sealText: 'GIO',
    stampEmoji: '🎁',
    envelopeColor: {
      base: 'from-[#FDFCF0] to-[#FAF8DE]',
      flap: 'bg-[#F9F4C2]',
      accent: 'text-[#857C2F]',
      border: 'border-amber-100 border-l-4 border-l-[#F0E68C]',
      seal: 'bg-[#BDB76B] text-white',
    },
  },
  {
    id: 'msg-katinko',
    sender: 'Katinko Mentol',
    roleOrNote: 'Tita Essential & Minty Relief 🧴❄️',
    content: `Happy birthday more birthdays to come and more blessings to comeeeee\n\n- Katinko Mentol`,
    avatarEmoji: '🧴',
    sealText: 'MINT',
    stampEmoji: '❄️',
    envelopeColor: {
      base: 'from-[#F0FDF4] to-[#DCFCE7]',
      flap: 'bg-[#BBF7D0]',
      accent: 'text-[#166534]',
      border: 'border-emerald-100 border-l-4 border-l-[#34D399]',
      seal: 'bg-[#059669] text-white',
    },
  },
  {
    id: 'msg-nyanta',
    sender: 'Nyanta',
    roleOrNote: 'Purr-fect Birthday Greetings 🐱✨',
    content: `Happy Burpdey Marry, Godbless!\n\n- Nyanta`,
    avatarEmoji: '🐱',
    sealText: 'MEOW',
    stampEmoji: '🐾',
    envelopeColor: {
      base: 'from-[#FFF7ED] to-[#FFEDD5]',
      flap: 'bg-[#FED7AA]',
      accent: 'text-[#C2410C]',
      border: 'border-orange-100 border-l-4 border-l-[#FB923C]',
      seal: 'bg-[#EA580C] text-white',
    },
  },
  {
    id: 'msg-chrome',
    sender: 'chrome',
    roleOrNote: 'Life Advice & Browser Wisdom 🌐💻',
    content: `Happy Birthday Mary and sana ease mo lang sarili WAG mo ipressure sarili mo marami ka pang ma experience sa buhay hindi na tatapos ang takbo ng buhay yun lang Happy Birthday\n\n- from chrome`,
    avatarEmoji: '🌐',
    sealText: 'CHROME',
    stampEmoji: '🚀',
    envelopeColor: {
      base: 'from-[#EFF6FF] to-[#DBEAFE]',
      flap: 'bg-[#BFDBFE]',
      accent: 'text-[#1D4ED8]',
      border: 'border-blue-100 border-l-4 border-l-[#60A5FA]',
      seal: 'bg-[#2563EB] text-white',
    },
  },
];

export const MessagesSection: React.FC<MessagesSectionProps> = ({ onContinueToClosing }) => {
  const [openedLetters, setOpenedLetters] = useState<Record<string, boolean>>({
    'msg-alee-corinne': true, // Pre-opened for inviting initial preview
  });

  const toggleLetter = (id: string, e?: React.MouseEvent) => {
    const willOpen = !openedLetters[id];
    setOpenedLetters((prev) => ({ ...prev, [id]: willOpen }));

    if (willOpen) {
      playChime(659.25, 0.7, 0.12);
      if (e) {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        launchPastelConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 40);
      }
    } else {
      playChime(440, 0.3, 0.08);
    }
  };

  const handleOpenAll = () => {
    const allOpen: Record<string, boolean> = {};
    LETTERS.forEach((l) => (allOpen[l.id] = true));
    setOpenedLetters(allOpen);
    playCelebrationHarp();
    launchPastelConfetti(window.innerWidth / 2, window.innerHeight / 2, 70);
  };

  const handleCloseAll = () => {
    setOpenedLetters({});
    playChime(392, 0.3, 0.08);
  };

  const allAreOpen = LETTERS.every((l) => openedLetters[l.id]);

  return (
    <section id="messages-section" className="py-14 md:py-20 px-4 max-w-4xl mx-auto">
      {/* Container in Artistic Flair style: rounded-[40px], backdrop-blur-sm, border */}
      <div className="bg-white/85 backdrop-blur-sm p-6 sm:p-10 rounded-[40px] shadow-sm border border-[#FFE4E1]">
        {/* Section Header */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#FFB7C5] text-white text-xs font-sans font-semibold uppercase tracking-widest shadow-xs">
            <Mail className="w-3.5 h-3.5 text-white" />
            <span>Special Delivery 💌</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-artistic text-[#D87093] drop-shadow-sm flex items-center justify-center gap-2">
            <span className="w-9 h-9 sm:w-11 sm:h-11 bg-[#FFD1DC] rounded-full flex items-center justify-center text-xl sm:text-2xl shadow-xs">💌</span>
            Messages for You
          </h2>
          <p className="text-base sm:text-lg italic font-serif text-[#8E767C] max-w-md mx-auto">
            Heartfelt wishes sent with genuine love and care. Tap each card to unfold the letter!
          </p>

          {/* Quick bulk toggle */}
          <div className="pt-2">
            <button
              onClick={allAreOpen ? handleCloseAll : handleOpenAll}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-xs font-bold text-[#D87093] border-2 border-[#FFD1DC] hover:bg-[#FFF5F7] shadow-xs hover:shadow-sm transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D87093]" />
              <span>{allAreOpen ? 'Fold All Envelopes' : 'Unfold All Letters at Once ✨'}</span>
            </button>
          </div>
        </div>

        {/* Letters List */}
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          {LETTERS.map((letter) => {
            const isOpen = !!openedLetters[letter.id];

            return (
              <div
                key={letter.id}
                className={`relative rounded-3xl transition-all duration-300 shadow-sm overflow-hidden ${
                  isOpen
                    ? 'bg-white border-2 border-[#FFD1DC] shadow-md'
                    : 'bg-gradient-to-r ' +
                      letter.envelopeColor.base +
                      ' ' +
                      letter.envelopeColor.border +
                      ' hover:scale-[1.01] hover:shadow-md'
                }`}
              >
                {/* Envelope Header / Click bar */}
                <div
                  onClick={(e) => toggleLetter(letter.id, e)}
                  className="p-5 sm:p-6 flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-[#FFE4E1] flex items-center justify-center text-2xl flex-shrink-0">
                      {letter.avatarEmoji}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg sm:text-xl font-bold font-serif-artistic text-[#5D4037]">
                          From: {letter.sender}
                        </h3>
                        <span className="text-sm">{letter.stampEmoji}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#8E767C] font-medium italic font-serif">
                        {letter.roleOrNote}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-transform duration-300 ${
                        isOpen
                          ? 'bg-[#FFF0F5] text-[#D87093] border border-[#FFD1DC]'
                          : letter.envelopeColor.seal + ' shadow-xs'
                      }`}
                    >
                      {isOpen ? (
                        <>
                          <MailOpen className="w-3.5 h-3.5" />
                          <span>Fold Letter</span>
                        </>
                      ) : (
                        <>
                          <Mail className="w-3.5 h-3.5" />
                          <span>Tap to Open 💌</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>

                {/* Unfolded Letter Stationery Container */}
                {isOpen && (
                  <div className="px-5 pb-6 sm:px-8 sm:pb-8 pt-0 animate-fadeIn">
                    {/* Decorative Stationery Paper */}
                    <div className="relative p-6 sm:p-8 rounded-2xl bg-[#FFF9FB] border border-[#FFE4E1] shadow-inner overflow-hidden">
                      {/* Subtle lined paper background */}
                      <div
                        className="absolute inset-0 opacity-20 pointer-events-none"
                        style={{
                          backgroundImage:
                            'repeating-linear-gradient(0deg, transparent, transparent 27px, #FFD1DC 28px)',
                        }}
                      />

                      {/* Stamp in the corner */}
                      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-14 rounded-md border-2 border-dashed border-[#FFB7C5] bg-white p-1 flex flex-col items-center justify-center rotate-3 shadow-xs">
                        <span className="text-lg">{letter.stampEmoji}</span>
                        <span className="text-[9px] font-bold tracking-widest text-[#D87093] uppercase mt-0.5">
                          AIRMAIL
                        </span>
                      </div>

                      {/* Letter greeting header */}
                      <div className="mb-4">
                        <span className="font-handwriting text-2xl sm:text-3xl text-[#D87093] font-semibold block">
                          Dearest Mary,
                        </span>
                      </div>

                      {/* Message Body */}
                      <div className="relative z-10 text-[#5D4037] font-medium leading-relaxed sm:text-lg whitespace-pre-line py-1">
                        {letter.content}
                      </div>

                      {/* Warm closing footer */}
                      <div className="mt-6 pt-4 border-t border-dashed border-[#FFD1DC] flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-[#8E767C] font-semibold">
                          <Heart className="w-3.5 h-3.5 fill-[#FFB7C5] text-[#FFB7C5]" />
                          <span>Sent with love & best wishes</span>
                        </div>
                        <div className="font-serif-artistic font-bold text-base sm:text-lg text-[#D87093] uppercase tracking-wide">
                          — {letter.sender}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Button to navigate to next section */}
        <div className="mt-10 text-center">
          <button
            onClick={onContinueToClosing}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-3xl bg-[#D87093] hover:bg-[#c65f82] text-white font-bold text-base sm:text-lg shadow-md shadow-[#D87093]/25 transition-all duration-300 hover:scale-102 active:scale-95 cursor-pointer border-2 border-[#D87093]"
          >
            <span>Blow candles & make a wish 🎂</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
