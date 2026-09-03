// Lightweight custom pastel confetti engine
export function launchPastelConfetti(originX = window.innerWidth / 2, originY = window.innerHeight / 2, count = 80) {
  const container = document.createElement('div');
  container.className = 'pointer-events-none fixed inset-0 z-50 overflow-hidden';
  document.body.appendChild(container);

  const colors = [
    '#f472b6', // soft pink
    '#fb7185', // rose
    '#c084fc', // soft purple
    '#a78bfa', // lavender
    '#fde047', // soft pastel yellow
    '#67e8f9', // soft baby blue
    '#fed7aa', // peach
    '#fbcfe8', // blush
  ];

  const shapes = ['rect', 'circle', 'heart', 'star'];

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const size = Math.random() * 10 + 8;

    el.style.position = 'absolute';
    el.style.left = `${originX}px`;
    el.style.top = `${originY}px`;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.pointerEvents = 'none';
    el.style.zIndex = '9999';

    if (shape === 'circle') {
      el.style.backgroundColor = color;
      el.style.borderRadius = '50%';
    } else if (shape === 'rect') {
      el.style.backgroundColor = color;
      el.style.borderRadius = '2px';
      el.style.width = `${size * 0.7}px`;
      el.style.height = `${size * 1.4}px`;
    } else if (shape === 'heart') {
      el.innerHTML = `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="${color}"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
    } else {
      el.innerHTML = `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="${color}"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
    }

    container.appendChild(el);

    // Physics
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 450 + 150;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity - 200; // upward bias
    const rotSpeed = (Math.random() - 0.5) * 720;
    const gravity = 580;

    const startTime = performance.now();
    const duration = 2400 + Math.random() * 800;

    function step(now: number) {
      const elapsed = (now - startTime) / 1000;
      if (elapsed >= duration / 1000) {
        el.remove();
        if (container.children.length === 0) {
          container.remove();
        }
        return;
      }

      const x = originX + vx * elapsed;
      const y = originY + vy * elapsed + 0.5 * gravity * elapsed * elapsed;
      const rot = rotSpeed * elapsed;
      const opacity = Math.max(0, 1 - elapsed / (duration / 1000));

      el.style.transform = `translate3d(${x - originX}px, ${y - originY}px, 0) rotate(${rot}deg)`;
      el.style.opacity = `${opacity}`;

      requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }
}
