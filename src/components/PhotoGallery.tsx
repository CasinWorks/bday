import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X, Sparkles, Heart, Plus, Camera } from 'lucide-react';
import { PhotoItem } from '../types';
import { playChime } from '../utils/audio';

interface PhotoGalleryProps {
  onContinueToMessages: () => void;
}

const DEFAULT_PHOTOS: PhotoItem[] = [
  {
    id: 'photo-1',
    url: 'images/06.09.katseye_slide2-1000-compressed.jpg',
    title: 'Katseye Energy',
    caption: 'Fierce, iconic, and radiating main character energy! ✨',
    badge: 'Katseye ✨',
  },
  {
    id: 'photo-2',
    url: 'images/gettyimages-2207560260-612x612.jpg',
    title: 'aespa Visuals',
    caption: 'Pure angelic elegance in all white — chic and flawless! 🤍',
    badge: 'aespa 🕊️',
  },
  {
    id: 'photo-3',
    url: 'images/Seventeen_Carat_Land_24.jpg',
    title: 'Seventeen Carat Land',
    caption: 'All the hand hearts, unity, and precious smiles! 💎',
    badge: 'SVT Carat 💎',
  },
];

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ onContinueToMessages }) => {
  const [photos, setPhotos] = useState<PhotoItem[]>(DEFAULT_PHOTOS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentPhoto = photos[currentIndex] || photos[0];

  const handleNext = () => {
    playChime(587.33, 0.4, 0.08);
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    playChime(493.88, 0.4, 0.08);
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  // Autoplay effect
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, photos.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photos.length]);

  // Support user adding or replacing photos
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const newItems: PhotoItem[] = [];
    const files = Array.from(e.target.files) as File[];
    files.forEach((file, idx) => {
      const url = URL.createObjectURL(file);
      newItems.push({
        id: `user-${Date.now()}-${idx}`,
        url,
        title: file.name.replace(/\.[^/.]+$/, ''),
        caption: 'A precious memory to cherish! 💖',
        badge: 'Custom Photo 📷',
      });
    });

    if (newItems.length > 0) {
      setPhotos((prev) => [...newItems, ...prev]);
      setCurrentIndex(0);
      playChime(659.25, 0.6, 0.12);
    }
  };

  return (
    <section id="gallery-section" className="py-12 md:py-20 px-4 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#FFB7C5] text-white text-xs font-sans font-semibold uppercase tracking-widest shadow-xs">
          <Camera className="w-3.5 h-3.5 text-white" />
          <span>Our Memories ✨</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-artistic text-[#D87093] drop-shadow-sm">
          A Gallery of Favorites 📸
        </h2>
        <p className="text-base sm:text-lg italic font-serif text-[#8E767C] max-w-md mx-auto">
          Every picture holds a memory, a vibe, and a smile.
        </p>
      </div>

      {/* Main Showcase Card per Artistic Flair: rounded-[40px], border-2 border-[#FFD1DC], slight rotation */}
      <div className="relative bg-white p-6 sm:p-8 rounded-[40px] shadow-lg border-2 border-[#FFD1DC] transform -rotate-1 hover:rotate-0 transition-transform duration-300">
        {/* Top bar with badge and slide count */}
        <div className="flex items-center justify-between mb-4 px-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDF2F5] border border-[#FFE4E1] text-[#D87093] text-xs font-bold font-sans tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-[#D87093]" />
            {currentPhoto.badge || 'Memory'}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`text-xs font-bold px-3 py-1 rounded-full border transition-all cursor-pointer ${
                isAutoPlaying
                  ? 'bg-[#D87093] text-white border-[#D87093] shadow-xs'
                  : 'bg-white text-[#8E767C] border-[#FFD1DC] hover:text-[#D87093] hover:border-[#D87093]'
              }`}
            >
              {isAutoPlaying ? 'Auto-playing ⏸' : 'Slideshow ▶'}
            </button>
            <span className="text-xs font-bold text-[#8E767C] font-sans">
              {currentIndex + 1} / {photos.length}
            </span>
          </div>
        </div>

        {/* Photo Canvas Frame with Artistic Flair border */}
        <div className="relative group overflow-hidden rounded-3xl bg-[#FDF2F5] border border-[#FFE4E1] aspect-[4/3] sm:aspect-[16/10] flex items-center justify-center">
          <img
            src={currentPhoto.url}
            alt={currentPhoto.title}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 cursor-pointer"
            onClick={() => setLightboxOpen(true)}
            onError={(e) => {
              // Fallback placeholder if relative file isn't located
              (e.currentTarget as HTMLElement).style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent && !parent.querySelector('.fallback-badge')) {
                const div = document.createElement('div');
                div.className = 'fallback-badge p-6 text-center text-[#D87093]';
                div.innerHTML = `
                  <div class="text-4xl mb-2">🌸</div>
                  <div class="font-bold text-lg font-serif">${currentPhoto.title}</div>
                  <div class="text-xs text-[#8E767C] mt-1 italic">${currentPhoto.caption}</div>
                `;
                parent.appendChild(div);
              }
            }}
          />

          {/* Overlay hover prompt */}
          <div
            onClick={() => setLightboxOpen(true)}
            className="absolute inset-0 bg-[#442c3b]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer pointer-events-none"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 text-[#D87093] text-sm font-bold shadow-md">
              <Maximize2 className="w-4 h-4" /> Tap to zoom
            </span>
          </div>

          {/* Carousel Arrows on Card */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#D87093] border border-[#FFD1DC] flex items-center justify-center shadow-md transition-transform active:scale-90 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#D87093] border border-[#FFD1DC] flex items-center justify-center shadow-md transition-transform active:scale-90 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Caption & Title Below */}
        <div className="mt-5 px-2 text-center space-y-1">
          <h3 className="text-xl sm:text-2xl font-bold font-serif-artistic text-[#D87093]">
            {currentPhoto.title}
          </h3>
          <p className="font-handwriting text-2xl sm:text-3xl text-[#5D4037] font-medium leading-tight">
            "{currentPhoto.caption}"
          </p>
        </div>

        {/* Thumbnail Preview Strip */}
        <div className="mt-6 pt-4 border-t border-[#FFE4E1] flex items-center justify-center gap-2.5 overflow-x-auto pb-1">
          {photos.map((photo, idx) => (
            <button
              key={photo.id}
              onClick={() => {
                setCurrentIndex(idx);
                playChime(523.25 + idx * 40, 0.3, 0.08);
              }}
              className={`relative rounded-2xl overflow-hidden flex-shrink-0 transition-all cursor-pointer border-2 ${
                currentIndex === idx
                  ? 'border-[#D87093] ring-2 ring-[#FFD1DC] scale-105 shadow-sm'
                  : 'border-[#FFE4E1] opacity-70 hover:opacity-100'
              }`}
              style={{ width: '56px', height: '56px' }}
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-[#FFE4E1]/20" />
            </button>
          ))}

          {/* Quick upload button for adding more memories */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-14 h-14 rounded-2xl border-2 border-dashed border-[#FFB7C5] text-[#D87093] hover:border-[#D87093] hover:bg-[#FFF5F7] flex flex-col items-center justify-center gap-0.5 text-[10px] font-bold flex-shrink-0 transition-colors cursor-pointer"
            title="Add your own photos"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
      </div>

      {/* Current Status banner from Artistic Flair theme */}
      <div className="mt-8 bg-[#D87093] p-6 rounded-[30px] shadow-md text-white flex items-center justify-between">
        <div>
          <p className="text-xs sm:text-sm font-sans uppercase tracking-widest opacity-85">Current Status</p>
          <p className="text-xl sm:text-2xl font-bold font-serif-artistic mt-0.5">Manifesting Dreams ✨</p>
        </div>
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl shadow-inner">
          🌟
        </div>
      </div>

      {/* Navigation prompt to next section */}
      <div className="mt-8 text-center">
        <button
          onClick={onContinueToMessages}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-3xl bg-white border-2 border-[#FFD1DC] hover:bg-[#FFF5F7] text-[#D87093] font-bold text-base shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <span>Read birthday letters for you 💌</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-pink-300 p-2 rounded-full bg-black/40 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <img
              src={currentPhoto.url}
              alt={currentPhoto.title}
              className="max-h-[75vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain"
            />

            <div className="mt-4 text-center text-white space-y-1">
              <h4 className="text-xl font-bold">{currentPhoto.title}</h4>
              <p className="font-handwriting text-2xl text-pink-200">
                "{currentPhoto.caption}"
              </p>
            </div>

            {/* Prev / Next buttons inside lightbox */}
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 cursor-pointer"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 cursor-pointer"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
