import React, { useMemo } from 'react';

interface FloatingItem {
  id: number;
  type: 'heart' | 'balloon' | 'sparkle' | 'petal';
  left: number; // percentage
  size: number; // px
  duration: number; // seconds
  delay: number; // seconds
  color: string;
}

export const FloatingBackground: React.FC = () => {
  const items = useMemo(() => {
    const list: FloatingItem[] = [];
    const colors = [
      '#FFB7C5', // cherry blossom rose
      '#D87093', // artistic pale violet red
      '#AEC6CF', // artistic soft sky blue
      '#F0E68C', // soft butter gold
      '#FFE4E1', // misty rose
      '#E0F7FA', // soft pastel cyan
      '#FFD1DC', // classic pastel pink
    ];

    const types: Array<'heart' | 'balloon' | 'sparkle' | 'petal'> = ['heart', 'balloon', 'sparkle', 'petal', 'heart'];

    for (let i = 0; i < 24; i++) {
      list.push({
        id: i,
        type: types[i % types.length],
        left: (i * 4.1 + Math.random() * 3) % 96 + 2,
        size: Math.floor(Math.random() * 16 + 14),
        duration: Math.floor(Math.random() * 12 + 16),
        delay: -(Math.random() * 20),
        color: colors[i % colors.length],
      });
    }
    return list;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft gradient background glow with radial pattern */}
      <div 
        className="absolute inset-0 bg-[#FFF9FB]/90"
        style={{
          backgroundImage: 'radial-gradient(#FFECF2 2px, transparent 2px)',
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* Gentle pastel ambient orbs per Artistic Flair design */}
      <div className="absolute top-[-60px] left-[-60px] w-72 h-72 sm:w-96 sm:h-96 bg-[#FFE4E1] rounded-full blur-[80px] opacity-70" />
      <div className="absolute bottom-[-60px] right-[-60px] w-80 h-80 sm:w-[30rem] sm:h-[30rem] bg-[#E0F7FA] rounded-full blur-[80px] opacity-60" />
      <div className="absolute top-1/2 left-[-100px] w-64 h-64 bg-[#FFD1DC] rounded-full blur-[90px] opacity-40" />
      <div className="absolute top-1/4 right-[-80px] w-72 h-72 bg-[#FFE4E1] rounded-full blur-[90px] opacity-50" />

      {/* Floating particles */}
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute animate-float-up opacity-0"
          style={{
            left: `${item.left}%`,
            width: `${item.size}px`,
            height: `${item.size}px`,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
            color: item.color,
          }}
        >
          {item.type === 'heart' && (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-sm opacity-60">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}

          {item.type === 'balloon' && (
            <svg viewBox="0 0 24 32" fill="currentColor" className="w-full h-full drop-shadow-sm opacity-55">
              <ellipse cx="12" cy="12" rx="10" ry="12" />
              <polygon points="12,24 9,27 15,27" />
              <path d="M12,27 Q14,30 11,32" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
            </svg>
          )}

          {item.type === 'sparkle' && (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-sm opacity-70">
              <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" />
            </svg>
          )}

          {item.type === 'petal' && (
            <div
              className="w-full h-full rounded-full rounded-tr-none rotate-45 opacity-50"
              style={{ backgroundColor: item.color }}
            />
          )}
        </div>
      ))}
    </div>
  );
};
