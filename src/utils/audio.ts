// Web Audio API Synthesized Music Box for Birthday Melodies
// Zero external assets required, clean and gentle

let audioCtx: AudioContext | null = null;
let isPlayingMelody = false;
let melodyTimeoutId: number | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Frequencies for Happy Birthday notes
const NOTES: Record<string, number> = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.00,
  A4: 440.00,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  G5: 783.99,
  A5: 880.00,
  REST: 0,
};

// "Happy Birthday To You" note sequence with durations (in beats)
const HAPPY_BIRTHDAY_SCORE: Array<{ note: string; duration: number }> = [
  { note: 'G4', duration: 0.75 },
  { note: 'G4', duration: 0.25 },
  { note: 'A4', duration: 1 },
  { note: 'G4', duration: 1 },
  { note: 'C5', duration: 1 },
  { note: 'B4', duration: 2 },

  { note: 'G4', duration: 0.75 },
  { note: 'G4', duration: 0.25 },
  { note: 'A4', duration: 1 },
  { note: 'G4', duration: 1 },
  { note: 'D5', duration: 1 },
  { note: 'C5', duration: 2 },

  { note: 'G4', duration: 0.75 },
  { note: 'G4', duration: 0.25 },
  { note: 'G5', duration: 1 },
  { note: 'E5', duration: 1 },
  { note: 'C5', duration: 1 },
  { note: 'B4', duration: 1 },
  { note: 'A4', duration: 1.5 },

  { note: 'F5', duration: 0.75 },
  { note: 'F5', duration: 0.25 },
  { note: 'E5', duration: 1 },
  { note: 'C5', duration: 1 },
  { note: 'D5', duration: 1 },
  { note: 'C5', duration: 2.5 },
  { note: 'REST', duration: 2 },
];

export function playChime(freq = 523.25, duration = 1.2, volume = 0.15) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle'; // Soft, warm chime tone
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    console.warn('Audio play failed:', e);
  }
}

export function playCelebrationHarp() {
  const chords = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
  chords.forEach((freq, idx) => {
    setTimeout(() => {
      playChime(freq, 1.5, 0.12);
    }, idx * 70);
  });
}

export function playCandleBlow() {
  try {
    const ctx = getAudioContext();
    // Soft gentle white noise puff
    const bufferSize = ctx.sampleRate * 0.4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 800;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
  } catch (e) {
    console.warn('Blow sound error:', e);
  }
}

export function playBoingSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.12);
    osc.frequency.exponentialRampToValueAtTime(250, now + 0.25);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(now + 0.35);
  } catch (e) {
    console.warn('Boing sound error:', e);
  }
}

export function playScannerTick(pitch = 800) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(pitch, now);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(now + 0.05);
  } catch (e) {
    console.warn('Tick sound error:', e);
  }
}

export function playFunnyTada() {
  const notes = [
    { freq: 440, delay: 0 },
    { freq: 554.37, delay: 90 },
    { freq: 659.25, delay: 180 },
    { freq: 880, delay: 280, dur: 0.8 },
  ];
  notes.forEach((n) => {
    setTimeout(() => {
      playChime(n.freq, n.dur || 0.4, 0.15);
    }, n.delay);
  });
}

export function startBirthdayMelody(onEndLoop?: () => void) {
  if (isPlayingMelody) return;
  isPlayingMelody = true;

  const ctx = getAudioContext();
  const tempo = 450; // ms per beat

  let noteIndex = 0;

  function scheduleNextNote() {
    if (!isPlayingMelody) return;

    if (noteIndex >= HAPPY_BIRTHDAY_SCORE.length) {
      noteIndex = 0;
      if (onEndLoop) onEndLoop();
    }

    const { note, duration } = HAPPY_BIRTHDAY_SCORE[noteIndex];
    noteIndex++;

    if (note !== 'REST' && NOTES[note]) {
      const freq = NOTES[note];
      // Play warm dual oscillator celesta
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(freq, ctx.currentTime);
      osc2.frequency.setValueAtTime(freq * 2, ctx.currentTime); // Gentle sparkle harmonic

      const noteDuration = Math.max(0.6, duration * (tempo / 1000) * 1.3);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + noteDuration);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + noteDuration);
      osc2.stop(ctx.currentTime + noteDuration);
    }

    const waitTime = duration * tempo;
    melodyTimeoutId = window.setTimeout(scheduleNextNote, waitTime);
  }

  scheduleNextNote();
}

export function stopBirthdayMelody() {
  isPlayingMelody = false;
  if (melodyTimeoutId !== null) {
    clearTimeout(melodyTimeoutId);
    melodyTimeoutId = null;
  }
}
