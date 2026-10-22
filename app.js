/**
 * SHREYA KABRA'S 23RD BIRTHDAY - CORE INTERACTION ENGINE
 * Built with romantic love, Web Audio API, Canvas physics, and 23 surprises.
 */

// ==========================================
// 1. SOUND EFFECTS & AUDIO SYNTHESIZER
// (Works 100% offline with ZERO missing audio files!)
// ==========================================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.isPlayingBgm = false;
    this.bgmTimer = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted && this.isPlayingBgm) {
      this.stopBGM();
    }
    return this.muted;
  }

  // Play delicate chime
  playChime(freq = 880, duration = 0.5) {
    if (this.muted) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.log('Audio note error:', e);
    }
  }

  // Satisfying bubble pop sound
  playPop() {
    if (this.muted) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch (e) {}
  }

  // Candle blow whoosh sound
  playWhoosh() {
    if (this.muted) return;
    this.init();
    try {
      const bufferSize = this.ctx.sampleRate * 0.4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.4);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();
    } catch (e) {}
  }

  // Scratch sound effect
  playScratch() {
    if (this.muted) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150 + Math.random() * 80, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {}
  }

  // Celebration fanfare chords
  playFanfare() {
    if (this.muted) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C Major
    notes.forEach((f, idx) => {
      setTimeout(() => this.playChime(f, 0.7), idx * 120);
    });
  }

  // Gentle lo-fi synthesized romantic melody loop
  startRomanticBGM() {
    if (this.muted || this.isPlayingBgm) return;
    this.init();
    this.isPlayingBgm = true;

    const chords = [
      [261.63, 329.63, 392.00], // C
      [220.00, 261.63, 329.63], // Am
      [174.61, 220.00, 261.63], // F
      [196.00, 246.94, 293.66], // G
    ];

    let chordIdx = 0;
    const playChord = () => {
      if (!this.isPlayingBgm || this.muted) return;
      const current = chords[chordIdx % chords.length];
      current.forEach((freq, i) => {
        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.1);

          gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 2.8);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(this.ctx.currentTime + i * 0.1);
          osc.stop(this.ctx.currentTime + 3.0);
        } catch (e) {}
      });

      chordIdx++;
      this.bgmTimer = setTimeout(playChord, 3000);
    };

    playChord();
  }

  stopBGM() {
    this.isPlayingBgm = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  // Disco Beat
  startDiscoBeat() {
    if (this.muted) return;
    this.init();
    const kick = () => {
      if (!document.body.classList.contains('disco-active')) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.frequency.setValueAtTime(150, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.3);
      } catch (e) {}
      setTimeout(kick, 450);
    };
    kick();
  }
}

const sfx = new SoundFX();

// ==========================================
// 2. SURPRISE PROGRESS TRACKER (23 SURPRISES)
// ==========================================
class SurpriseTracker {
  constructor() {
    this.total = 23;
    this.unlocked = new Set();
    this.load();
    this.updateUI();
  }

  load() {
    try {
      const saved = localStorage.getItem('shreya_23rd_surprises');
      if (saved) {
        const arr = JSON.parse(saved);
        arr.forEach(id => this.unlocked.add(id));
      }
    } catch (e) {}
  }

  save() {
    try {
      localStorage.setItem('shreya_23rd_surprises', JSON.stringify([...this.unlocked]));
    } catch (e) {}
  }

  unlock(id, title) {
    if (!this.unlocked.has(id)) {
      this.unlocked.add(id);
      this.save();
      this.updateUI();
      sfx.playFanfare();
      this.showToast(`🎉 Surprise #${id} Unlocked: ${title}!`);

      // Update badge in DOM if exists
      const badge = document.querySelector(`[data-surprise-badge="${id}"]`);
      if (badge) {
        badge.classList.remove('locked');
        badge.classList.add('unlocked');
        badge.innerHTML = `<span>✨ #${id} Discovered</span>`;
      }

      // Check if all 23 unlocked
      if (this.unlocked.size === this.total) {
        setTimeout(() => this.triggerGrandFinaleModal(), 1200);
      }
    }
  }

  updateUI() {
    const count = this.unlocked.size;
    const countEl = document.getElementById('surprise-count');
    const barEl = document.getElementById('surprise-bar');
    if (countEl) countEl.innerText = count;
    if (barEl) {
      const pct = (count / this.total) * 100;
      barEl.style.width = `${pct}%`;
    }

    // Refresh badges
    this.unlocked.forEach(id => {
      const badge = document.querySelector(`[data-surprise-badge="${id}"]`);
      if (badge) {
        badge.classList.remove('locked');
        badge.classList.add('unlocked');
        badge.innerHTML = `<span>✨ #${id} Discovered</span>`;
      }
    });
  }

  showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-6 right-6 z-50 bg-rose-600 text-white font-medium px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-rose-300 transform translate-y-10 opacity-0 transition-all duration-300';
    toast.innerHTML = `
      <span class="text-xl">💖</span>
      <div>
        <p class="text-xs uppercase font-bold tracking-wider text-rose-200">New Memory Unlocked</p>
        <p class="text-sm font-semibold">${msg}</p>
      </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.remove('translate-y-10', 'opacity-0');
    }, 50);
    setTimeout(() => {
      toast.classList.add('translate-y-10', 'opacity-0');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  triggerGrandFinaleModal() {
    const modal = document.getElementById('grand-celebration-modal');
    if (modal) {
      modal.classList.remove('hidden');
      sfx.playFanfare();
      triggerConfettiCannons();
    }
  }
}

const tracker = new SurpriseTracker();

// ==========================================
// 3. BACKGROUND CANVAS PARTICLES (HEARTS & STARS)
// ==========================================
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = window.innerWidth < 768 ? 25 : 55;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 12 + 6,
      speedY: Math.random() * 0.6 + 0.2,
      speedX: (Math.random() - 0.5) * 0.4,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 1.5,
      opacity: Math.random() * 0.6 + 0.2,
      type: Math.random() > 0.4 ? 'heart' : 'star',
      color: Math.random() > 0.5 ? '#fda4af' : '#f43f5e'
    });
  }

  function drawHeart(x, y, size, color, opacity, rot) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rot * Math.PI) / 180);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(0, topCurveHeight);
    ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
    ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size);
    ctx.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
    ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawStar(x, y, size, opacity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      ctx.lineTo(Math.cos(((18 + i * 72) * Math.PI) / 180) * size, -Math.sin(((18 + i * 72) * Math.PI) / 180) * size);
      ctx.lineTo(Math.cos(((54 + i * 72) * Math.PI) / 180) * (size / 2), -Math.sin(((54 + i * 72) * Math.PI) / 180) * (size / 2));
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let p of particles) {
      p.y -= p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotSpeed;

      if (p.y < -20) {
        p.y = height + 20;
        p.x = Math.random() * width;
      }
      if (p.x < -20) p.x = width + 20;
      if (p.x > width + 20) p.x = -20;

      if (p.type === 'heart') {
        drawHeart(p.x, p.y, p.size, p.color, p.opacity, p.rotation);
      } else {
        drawStar(p.x, p.y, p.size / 2, p.opacity);
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}

// Confetti burst using canvas
function triggerConfettiCannons() {
  const count = 180;
  const colors = ['#f43f5e', '#ec4899', '#f59e0b', '#8b5cf6', '#38bdf8', '#fb7185', '#ffd700'];

  for (let i = 0; i < count; i++) {
    createConfettiPiece(colors[Math.floor(Math.random() * colors.length)]);
  }
}

function createConfettiPiece(color) {
  const el = document.createElement('div');
  el.style.position = 'fixed';
  el.style.zIndex = '9999';
  el.style.width = Math.random() * 10 + 6 + 'px';
  el.style.height = Math.random() * 10 + 6 + 'px';
  el.style.backgroundColor = color;
  el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
  el.style.top = '50vh';
  el.style.left = '50vw';
  el.style.pointerEvents = 'none';

  const angle = Math.random() * Math.PI * 2;
  const velocity = Math.random() * 450 + 150;
  const vx = Math.cos(angle) * velocity;
  const vy = Math.sin(angle) * velocity - 200;

  document.body.appendChild(el);

  let startTime = null;
  const duration = 2500;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = (timestamp - startTime) / duration;

    if (progress < 1) {
      const currentX = vx * (progress * 1.4);
      const currentY = vy * (progress * 1.4) + 600 * Math.pow(progress, 2);
      const rotation = progress * 720;
      const opacity = 1 - progress;

      el.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${rotation}deg)`;
      el.style.opacity = opacity;
      requestAnimationFrame(step);
    } else {
      el.remove();
    }
  }
  requestAnimationFrame(step);
}

// ==========================================
// 4. SURPRISE 1: 23-CANDLE INTERACTIVE CAKE
// ==========================================
function initBirthdayCake() {
  const container = document.getElementById('cake-candles-row');
  if (!container) return;

  container.innerHTML = '';
  const candleColors = ['#fda4af', '#f43f5e', '#fb7185', '#e11d48', '#fbcfe8', '#f472b6'];

  for (let i = 1; i <= 23; i++) {
    const candle = document.createElement('div');
    candle.className = 'candle flex flex-col items-center cursor-pointer';
    candle.style.backgroundColor = candleColors[i % candleColors.length];
    candle.dataset.index = i;
    candle.title = `Candle #${i} for Shreya`;

    const flame = document.createElement('div');
    flame.className = 'flame';
    flame.id = `flame-${i}`;

    candle.appendChild(flame);

    candle.addEventListener('click', () => {
      sfx.playWhoosh();
      flame.classList.toggle('extinguished');
      checkAllCandles();
    });

    container.appendChild(candle);
  }

  const blowBtn = document.getElementById('blow-candles-btn');
  const lightBtn = document.getElementById('relight-candles-btn');

  if (blowBtn) {
    blowBtn.addEventListener('click', () => {
      sfx.playWhoosh();
      document.querySelectorAll('.flame').forEach((flame, idx) => {
        setTimeout(() => flame.classList.add('extinguished'), idx * 25);
      });
      setTimeout(() => {
        triggerConfettiCannons();
        tracker.unlock(1, 'Blowing Out 23 Candles');
        const status = document.getElementById('cake-status');
        if (status) {
          status.innerHTML = `<span class="text-rose-600 font-bold text-lg animate-bounce inline-block">✨ Happy 23rd Birthday Cutu! May all your wishes come true! ✨</span>`;
        }
      }, 600);
    });
  }

  if (lightBtn) {
    lightBtn.addEventListener('click', () => {
      sfx.playChime(660);
      document.querySelectorAll('.flame').forEach(f => f.classList.remove('extinguished'));
      const status = document.getElementById('cake-status');
      if (status) status.innerText = 'All 23 candles are glowing bright for you, Shreya!';
    });
  }

  function checkAllCandles() {
    const totalFlames = document.querySelectorAll('.flame').length;
    const extinguished = document.querySelectorAll('.flame.extinguished').length;
    if (extinguished === totalFlames) {
      triggerConfettiCannons();
      tracker.unlock(1, 'Blowing Out 23 Candles');
    }
  }
}

// ==========================================
// 5. SURPRISE 2: 23 REASONS WHY I LOVE SHREYA
// ==========================================
const reasonsList = [
  "How you walked around the library on 14th September 2023 and stole my attention completely.",
  "That you are a true 'chhota packet, bada dhamaka' who always keeps life exciting and full of surprises.",
  "Your pure, endless love for a hot cup of Chai (even when it's my stiffest competition!).",
  "Our spontaneous late-night Tea Post runs that can instantly fix literally any bad mood.",
  "The unforgettable hug at CSMT station where I begged God to freeze time right then.",
  "That I will 100% agree that elephants can fly during your 5 days—I’m taking zero risks, baba!",
  "Our late-night Jupiter rides singing karaoke at the top of our lungs under the open sky.",
  "How you held my hand at ISKCON Mandir and made my silent dream come true.",
  "Watching you sleep like an innocent baby in the Mumbai cab, knowing you feel safe with me.",
  "That a boy who never listens to anybody will happily listen to you yap for hours and hours.",
  "The legendary code name '3 Year Senior Sangam' that unexpectedly started our whole universe.",
  "The laughter and friendly chaos whenever we play Fictionary together.",
  "Cycling along Marine Drive with the midnight sea breeze on our faces and city lights glowing.",
  "How you helped me grow from a carefree boy into the man I am today.",
  "How you achieve so much and help everyone, yet remain so humble and never take credit.",
  "The crazy pagalpan when we party and dance together as an unbeatable duo.",
  "How you celebrate when things go right and let your tears flow when they don't—your honesty is pure gold.",
  "That I can tell you absolutely anything in this world without any fear of ever being judged.",
  "How your smile and laughter can make any exhaustion or bad day completely disappear in seconds.",
  "The way you express every drama and story with your hands, cute expressions, and sparkling eyes.",
  "That even with the distance, busy Mumbai days, and flat issues, you remain my home and comfort.",
  "That I get to annoy you for the rest of our lives (consider this your official lifetime warning!).",
  "Because Shreya Kabra completes me, and I want you by my side in every single lifetime, my Cutu."
];

function initReasonsEnvelopes() {
  const container = document.getElementById('reasons-grid');
  if (!container) return;

  container.innerHTML = '';
  reasonsList.forEach((reason, i) => {
    const num = i + 1;
    const card = document.createElement('div');
    card.className = 'envelope-card relative h-48 w-full';
    card.innerHTML = `
      <div class="envelope-inner w-full h-full relative">
        <!-- Front -->
        <div class="envelope-front absolute inset-0 glass-card p-5 flex flex-col justify-between items-center text-center cursor-pointer border border-rose-200/80 hover:border-rose-400">
          <div class="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold text-sm shadow-inner">
            #${num}
          </div>
          <div class="my-auto">
            <p class="font-hand text-xl text-rose-500 font-bold">Reason #${num}</p>
            <p class="text-xs text-gray-500 mt-1">Tap to unfold letter 💌</p>
          </div>
          <span class="text-xs text-rose-400 font-medium">Click to Open</span>
        </div>
        <!-- Back (Letter Content) -->
        <div class="envelope-back absolute inset-0 bg-gradient-to-br from-rose-50 to-pink-100 p-5 rounded-2xl flex flex-col justify-between shadow-xl border-2 border-rose-300">
          <div class="flex justify-between items-center border-b border-rose-200 pb-1">
            <span class="font-hand text-rose-600 font-bold text-base">To My Shreya</span>
            <span class="text-xs bg-rose-200 text-rose-800 px-2 py-0.5 rounded-full font-bold">#${num}/23</span>
          </div>
          <p class="font-script text-lg text-gray-800 leading-snug my-auto text-center font-medium">${reason}</p>
          <div class="text-right">
            <span class="font-hand text-xs text-rose-500 font-bold">Forever Yours ❤️</span>
          </div>
        </div>
      </div>
    `;

    card.addEventListener('click', () => {
      sfx.playChime(500 + num * 20);
      card.classList.toggle('open');
      tracker.unlock(2, '23 Reasons Why I Love You');
    });

    container.appendChild(card);
  });
}

// ==========================================
// 6. SURPRISE 3: STARLIGHT CONSTELLATION
// ==========================================
function initConstellationCanvas() {
  const canvas = document.getElementById('constellation-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = canvas.parentElement.clientWidth);
  let height = (canvas.height = 360);

  const stars = [
    { x: 0.25 * width, y: 0.3 * height, r: 4, name: 'S1' },
    { x: 0.35 * width, y: 0.2 * height, r: 5, name: 'S2' },
    { x: 0.45 * width, y: 0.3 * height, r: 4, name: 'S3' },
    { x: 0.35 * width, y: 0.5 * height, r: 5, name: 'S4' },
    { x: 0.25 * width, y: 0.7 * height, r: 4, name: 'S5' },
    { x: 0.40 * width, y: 0.8 * height, r: 5, name: 'S6' },
    // Heart cluster
    { x: 0.65 * width, y: 0.35 * height, r: 5, name: 'H1' },
    { x: 0.75 * width, y: 0.25 * height, r: 5, name: 'H2' },
    { x: 0.85 * width, y: 0.35 * height, r: 5, name: 'H3' },
    { x: 0.75 * width, y: 0.65 * height, r: 6, name: 'H4' },
  ];

  let connected = [];

  function draw() {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);

    // Draw connected lines
    if (connected.length > 1) {
      ctx.strokeStyle = 'rgba(251, 113, 133, 0.8)';
      ctx.lineWidth = 2.5;
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#f43f5e';
      ctx.beginPath();
      ctx.moveTo(connected[0].x, connected[0].y);
      for (let i = 1; i < connected.length; i++) {
        ctx.lineTo(connected[i].x, connected[i].y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // Draw stars
    stars.forEach(s => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = '#fef08a';
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#fde047';
      ctx.fill();
      ctx.restore();
    });
  }

  draw();

  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;

    stars.forEach(s => {
      const dist = Math.hypot(s.x - cx, s.y - cy);
      if (dist < 22 && !connected.includes(s)) {
        connected.push(s);
        sfx.playChime(600 + connected.length * 80);
        draw();
      }
    });

    if (connected.length >= 4) {
      tracker.unlock(3, 'Starlight Constellation for Shreya');
      const cert = document.getElementById('constellation-cert');
      if (cert) cert.classList.remove('hidden');
    }
  });

  const autoConnectBtn = document.getElementById('autoconnect-stars-btn');
  if (autoConnectBtn) {
    autoConnectBtn.addEventListener('click', () => {
      connected = [...stars];
      draw();
      sfx.playFanfare();
      tracker.unlock(3, 'Starlight Constellation for Shreya');
      const cert = document.getElementById('constellation-cert');
      if (cert) cert.classList.remove('hidden');
    });
  }
}

// ==========================================
// 7. SURPRISE 4: THE MIDNIGHT JUPITER STARLIT DRIVE
// ==========================================
function initJupiterDrive() {
  const stops = [
    {
      mile: "Mile 1: Sangam Library (14th Sept 2023)",
      tag: "Where It Began",
      desc: "The exact spot where I couldn't stop looking at you secretly. I kept trying to find excuses just to look in your direction without making it obvious. Joining college at that time gave me the best blessing of my life—you.",
      icon: "📚"
    },
    {
      mile: "Mile 2: The 2 AM Tea Post Chai Stop",
      tag: "Pure Comfort",
      desc: "Pulling over the Jupiter, grabbing two steaming cups of Chai, and talking about life under the open sky. Half of Shreya's problems solved right here on the pavement, and the other half solved with your laughter.",
      icon: "☕"
    },
    {
      mile: "Mile 3: The Midnight Karaoke Highway",
      tag: "Off-Key Harmony",
      desc: "Blasting our favorite songs at full volume, singing completely off-key, making fun of each other, and laughing until our stomachs hurt. In those moments, I knew I could be 100% myself with you without ever being judged.",
      icon: "🎶"
    },
    {
      mile: "Mile 4: ISKCON Mandir Sacred Starlight",
      tag: "A Dream Realized",
      desc: "Holding my favorite person's hand and walking into the mandir together. That silent dream I had held in my heart for years came true because of you, my Cutu.",
      icon: "🛕"
    },
    {
      mile: "Mile 5: CSMT Station (The Frozen Hug)",
      tag: "Platform 1 Magic",
      desc: "The end of the tracks where you ran towards me and hugged me tight. I would drive this Jupiter across every highway on earth just to see your smile and hold you in my arms. You complete me, Shreya.",
      icon: "🚆"
    }
  ];

  let current = 0;
  const driveBtn = document.getElementById('jupiter-drive-btn');
  const badgeEl = document.getElementById('jupiter-mile-badge');
  const titleEl = document.getElementById('jupiter-stop-title');
  const tagEl = document.getElementById('jupiter-stop-tag');
  const descEl = document.getElementById('jupiter-stop-desc');
  const scooterEl = document.getElementById('jupiter-scooter-icon');
  const dotsContainer = document.getElementById('jupiter-stop-dots');
  const storyCard = document.getElementById('jupiter-story-card');

  function updateStop(idx) {
    const s = stops[idx];
    if (!s) return;

    if (badgeEl) badgeEl.innerText = `Stop ${idx + 1} of 5: ${s.tag}`;
    if (titleEl) titleEl.innerHTML = `<span>${s.icon}</span> <span>${s.mile}</span>`;
    if (tagEl) tagEl.innerText = s.tag;
    if (descEl) descEl.innerText = `"${s.desc}"`;

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('span');
      dots.forEach((dot, i) => {
        dot.className = i === idx 
          ? 'w-2.5 h-2.5 rounded-full bg-pink-500 scale-125 transition-all' 
          : 'w-2.5 h-2.5 rounded-full bg-purple-800 transition-all';
      });
    }

    if (scooterEl) {
      scooterEl.classList.add('translate-x-3');
      setTimeout(() => scooterEl.classList.remove('translate-x-3'), 300);
    }

    if (storyCard) {
      storyCard.classList.add('opacity-40', 'scale-95');
      setTimeout(() => storyCard.classList.remove('opacity-40', 'scale-95'), 150);
    }
  }

  if (driveBtn) {
    driveBtn.addEventListener('click', () => {
      sfx.playWhoosh();
      sfx.playChime(600 + current * 60);

      current = (current + 1) % stops.length;
      updateStop(current);

      if (current === stops.length - 1) {
        triggerConfettiCannons();
        sfx.playFanfare();
      }

      tracker.unlock(4, 'The Starlit Jupiter Road Trip');
    });
  }
}

// ==========================================
// 8. SURPRISE 5: GOLDEN SCRATCH-OFF LOVE COUPONS
// ==========================================
function initScratchCards() {
  const cards = [
    { canvasId: 'scratch-1', rewardId: 'reward-1', title: 'Coupons of Love #1' },
    { canvasId: 'scratch-2', rewardId: 'reward-2', title: 'Coupons of Love #2' },
    { canvasId: 'scratch-3', rewardId: 'reward-3', title: 'Coupons of Love #3' },
  ];

  cards.forEach(card => {
    const canvas = document.getElementById(card.canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = (canvas.width = canvas.parentElement.clientWidth);
    const height = (canvas.height = canvas.parentElement.clientHeight);

    // Fill with luxury scratch layer
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#e2e8f0');
    grad.addColorStop(0.5, '#cbd5e1');
    grad.addColorStop(1, '#94a3b8');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#475569';
    ctx.font = 'bold 15px Plus Jakarta Sans, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Scratch to Reveal Cutu! ✨', width / 2, height / 2);

    let isDrawing = false;
    let scratchedPixels = 0;

    function scratch(x, y) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();
      sfx.playScratch();
      scratchedPixels++;

      if (scratchedPixels > 25) {
        tracker.unlock(5, 'Golden Scratch-Off Love Coupons');
      }
    }

    canvas.addEventListener('mousedown', () => (isDrawing = true));
    canvas.addEventListener('mouseup', () => (isDrawing = false));
    canvas.addEventListener('mousemove', (e) => {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      scratch(e.clientX - rect.left, e.clientY - rect.top);
    });

    // Touch support
    canvas.addEventListener('touchstart', (e) => {
      isDrawing = true;
      e.preventDefault();
    });
    canvas.addEventListener('touchend', () => (isDrawing = false));
    canvas.addEventListener('touchmove', (e) => {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      scratch(touch.clientX - rect.left, touch.clientY - rect.top);
      e.preventDefault();
    });
  });
}

// ==========================================
// 9. SURPRISE 6: THE KEEPSAKE VAULT (8 ROMANTIC MILESTONES)
// ==========================================
function initKeepsakes() {
  const cards = document.querySelectorAll('.keepsake-card');
  cards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      sfx.playChime(580 + idx * 45);
      card.classList.toggle('revealed');
      tracker.unlock(6, 'The Keepsake Vault: 8 Romantic Milestones of Us');
    });
  });
}

// ==========================================
// 10. SURPRISE 7: 23-HEART POPPING SENSORY WRAP
// ==========================================
function initBubbleWrap() {
  const container = document.getElementById('bubble-wrap-grid');
  if (!container) return;

  container.innerHTML = '';
  let poppedCount = 0;

  for (let i = 1; i <= 23; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble-heart flex items-center justify-center';
    bubble.innerHTML = `<span class="text-xs select-none">💖</span>`;
    bubble.title = `Pop heart #${i}`;

    bubble.addEventListener('click', () => {
      if (!bubble.classList.contains('popped')) {
        bubble.classList.add('popped');
        sfx.playPop();
        poppedCount++;

        const counter = document.getElementById('popped-counter');
        if (counter) counter.innerText = `${poppedCount}/23 Popped`;

        if (poppedCount === 23) {
          sfx.playFanfare();
          triggerConfettiCannons();
          tracker.unlock(7, '23 Heart-Popping Bubble Wrap');
          const msg = document.getElementById('bubble-success-msg');
          if (msg) msg.classList.remove('hidden');
        }
      }
    });

    container.appendChild(bubble);
  }
}

// ==========================================
// 11. SURPRISE 8: VIRTUAL BOUQUET BUILDER
// ==========================================
function initBouquetBuilder() {
  const flowers = [
    { name: 'Velvet Rose', symbol: 'Deep Eternal Love', emoji: '🌹' },
    { name: 'Sweet Peony', symbol: 'Prosperity & Romance', emoji: '🌸' },
    { name: 'Sunlit Bloom', symbol: 'Warmth & Happiness', emoji: '🌻' },
    { name: 'Royal Tulip', symbol: 'Perfect Affection', emoji: '🌷' },
    { name: 'Pure Daisy', symbol: 'Innocence & Joy', emoji: '🌼' },
    { name: 'Wild Orchid', symbol: 'Rare & Exquisite Beauty', emoji: '🌺' },
  ];

  const palette = document.getElementById('flower-palette');
  const vase = document.getElementById('bouquet-vase-display');
  const countEl = document.getElementById('bouquet-count');
  let count = 0;

  if (palette && vase) {
    palette.innerHTML = '';
    flowers.forEach(f => {
      const btn = document.createElement('button');
      btn.className = 'px-3 py-2 glass-card flex items-center gap-2 hover:bg-rose-100 transition-all text-xs font-semibold';
      btn.innerHTML = `<span class="text-xl">${f.emoji}</span> <span>${f.name}</span>`;
      btn.addEventListener('click', () => {
        sfx.playChime(700 + Math.random() * 200);
        count++;
        if (countEl) countEl.innerText = `${count} Blooms Added`;

        const bloom = document.createElement('div');
        bloom.className = 'text-3xl transform transition-all duration-300 animate-bounce inline-block mx-1';
        bloom.innerText = f.emoji;
        bloom.title = `${f.name}: ${f.symbol}`;
        vase.appendChild(bloom);

        if (count >= 5) {
          tracker.unlock(8, 'Digital Bouquet of 23 Blooms');
        }
      });
      palette.appendChild(btn);
    });
  }
}

// ==========================================
// 12. SURPRISE 9: GUCCHU PUCCHU'S LOVE SLOT MACHINE
// ==========================================
function initSlotMachine() {
  const spinBtn = document.getElementById('slot-spin-btn');
  const r1 = document.getElementById('reel-1');
  const r2 = document.getElementById('reel-2');
  const r3 = document.getElementById('reel-3');
  const payout = document.getElementById('slot-payout-text');

  const symbols = ['💖', '👑', '✨', '🌸', '🧸', '🍓', '💍', '🎂'];
  const compliments = [
    "JACKPOT: Elephants CAN officially fly during 5 days! Confirmed by your boyfriend! 🐘✨",
    "WINNER: Unlimited Tea Post Chai dates for Shreya Kabra for all eternity! ☕",
    "LUCKY HIT: Reaching CSMT station and running into my arms—the best hug in universe history! 🚆",
    "PRIZE UNLOCKED: 100% Royal Baby Treatment pass ready for when you get back! 💆‍♀️",
    "PERFECT MATCH: The boy who listens to nobody will always listen to you yap forever! ❤️"
  ];

  if (spinBtn) {
    spinBtn.addEventListener('click', () => {
      sfx.playWhoosh();
      spinBtn.disabled = true;
      payout.innerText = 'Spinning the wheels of love for Cutu...';

      let count = 0;
      const interval = setInterval(() => {
        r1.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        r2.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        r3.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        sfx.playPop();
        count++;

        if (count > 12) {
          clearInterval(interval);
          r1.innerText = '💖';
          r2.innerText = '👑';
          r3.innerText = '💖';
          sfx.playFanfare();
          triggerConfettiCannons();
          spinBtn.disabled = false;
          payout.innerHTML = `<span class="text-rose-600 font-bold">${compliments[Math.floor(Math.random() * compliments.length)]}</span>`;
          tracker.unlock(9, "Gucchu Pucchu's Love Slot Machine");
        }
      }, 90);
    });
  }
}

// ==========================================
// 13. SURPRISE 10: WAX-SEALED SECRET LOVE LETTER
// ==========================================
function initWaxLetter() {
  const seal = document.getElementById('wax-seal-btn');
  const letter = document.getElementById('secret-unfolded-letter');
  const sealContainer = document.getElementById('wax-seal-container');

  if (seal && letter) {
    seal.addEventListener('click', () => {
      sfx.playChime(600);
      seal.classList.add('broken');
      setTimeout(() => {
        if (sealContainer) sealContainer.classList.add('hidden');
        letter.classList.remove('hidden');
        sfx.playFanfare();
        triggerConfettiCannons();
        tracker.unlock(10, 'Wax-Sealed Secret Love Letter');
      }, 500);
    });
  }

  // Scroll Tab Navigation
  const tab1 = document.getElementById('tab-scroll-1');
  const tab2 = document.getElementById('tab-scroll-2');
  const content1 = document.getElementById('letter-content-1');
  const content2 = document.getElementById('letter-content-2');

  if (tab1 && tab2 && content1 && content2) {
    tab1.addEventListener('click', () => {
      sfx.playChime(620);
      tab1.classList.add('active');
      tab2.classList.remove('active');
      content1.classList.remove('hidden');
      content2.classList.add('hidden');
    });

    tab2.addEventListener('click', () => {
      sfx.playChime(660);
      tab2.classList.add('active');
      tab1.classList.remove('active');
      content2.classList.remove('hidden');
      content1.classList.add('hidden');
    });
  }

  // Soft romantic melody toggle inside letter
  const letterAudioBtn = document.getElementById('letter-audio-toggle');
  if (letterAudioBtn) {
    letterAudioBtn.addEventListener('click', () => {
      if (sfx.isPlayingBgm) {
        sfx.stopBGM();
        letterAudioBtn.innerHTML = '<span>🎵 Soft Melody</span>';
      } else {
        sfx.startRomanticBGM();
        letterAudioBtn.innerHTML = '<span>⏸ Pause Melody</span>';
      }
    });
  }

  // Print Keepsake Letter
  const printBtn = document.getElementById('letter-print-btn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      sfx.playFanfare();
      window.print();
    });
  }
}

// ==========================================
// 14. SURPRISE 11: "OPEN WHEN..." GIFT BOXES
// ==========================================
function initCarePackages() {
  const boxes = document.querySelectorAll('.care-package-box');
  boxes.forEach((box, i) => {
    box.addEventListener('click', () => {
      sfx.playChime(650 + i * 80);
      const content = box.querySelector('.care-content');
      if (content) {
        content.classList.toggle('hidden');
        box.classList.toggle('bg-rose-50');
      }
      tracker.unlock(11, "'Open When...' Care Package Boxes");
    });
  });
}

// ==========================================
// 15. SURPRISE 12: MAGIC CRYSTAL BALL
// ==========================================
function initCrystalBall() {
  const ball = document.getElementById('crystal-ball');
  const answer = document.getElementById('crystal-answer');
  const fortunes = [
    "🔮 The stars of your 23rd year declare: Chai will still solve 50% of all problems. The other 50% at Tea Post. It is written in the stars.",
    "✨ The crystal has spoken — the legendary 3yr Senior Sangam code will be invoked at least 4 more times this year. You cannot escape it, cutu.",
    "🌙 I see a midnight Jupiter ride in your future. Stars overhead, wind in your hair, my arms around you. The universe is scheduling it as we speak.",
    "💫 Prophecy: You will yap about something very important and I will listen like the devoted chief listener I have sworn to be. Every. Single. Word.",
    "🌟 The crystal ball sees it clearly — this flying elephant is about to have the most beautiful, most deserved 23rd year of her life. She has earned every bit.",
    "🔮 Vision unlocked: a CSMT platform, a frozen hug, and the feeling that time stood still. The universe says there will be many more of those moments.",
    "✨ I see you, baby napping on my shoulder in a midnight cab, me making sure every bump on the road doesn't wake you. That scene? Infinite reruns.",
    "💜 Stars are unanimous: chhota packet, bada dhamaka energy is your superpower in Year 23. Watch them all be surprised again.",
    "🌙 Marine Drive cycling, ISKCON peace walks, and one more perfect moment where we hold hands and forget the whole world exists.",
    "🔮 The prophecy is clear: You are going to absolutely smash your 23rd year — and I will be your loudest hype man for every single second of it."
  ];

  let fortuneIndex = 0;

  if (ball) {
    ball.addEventListener('click', () => {
      sfx.playWhoosh();
      ball.classList.add('animate-pulse');
      answer.innerText = 'The crystal is gazing into your 23rd year...';

      setTimeout(() => {
        ball.classList.remove('animate-pulse');
        sfx.playChime(880);
        const fortune = fortunes[fortuneIndex % fortunes.length];
        fortuneIndex++;
        answer.innerHTML = `<span class="text-purple-700 font-semibold italic">${fortune}</span>`;
        tracker.unlock(12, 'Magic Crystal Ball of Our Future');
      }, 900);
    });
  }
}

// ==========================================
// 16. SURPRISE 13: MINI-GAME "CATCH THE HEARTS"
// ==========================================
function initCatchGame() {
  const canvas = document.getElementById('game-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = canvas.parentElement.clientWidth);
  let height = (canvas.height = 320);

  let basketX = width / 2;
  const basketW = 60;
  const basketH = 20;
  let score = 0;
  let gameRunning = false;
  let items = [];

  const scoreEl = document.getElementById('game-score');
  const startBtn = document.getElementById('game-start-btn');

  function spawnItem() {
    if (!gameRunning) return;
    items.push({
      x: Math.random() * (width - 24) + 12,
      y: 0,
      speed: Math.random() * 2 + 1.8,
      char: Math.random() > 0.3 ? '💖' : '⭐'
    });
    setTimeout(spawnItem, 650);
  }

  function loop() {
    if (!gameRunning) return;
    ctx.clearRect(0, 0, width, height);

    // Draw basket
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.roundRect(basketX - basketW / 2, height - basketH - 10, basketW, basketH, 8);
    ctx.fill();

    // Update items
    for (let i = items.length - 1; i >= 0; i--) {
      const it = items[i];
      it.y += it.speed;

      ctx.font = '20px serif';
      ctx.textAlign = 'center';
      ctx.fillText(it.char, it.x, it.y);

      // Check catch
      if (it.y >= height - basketH - 20 && it.y <= height - 5 && Math.abs(it.x - basketX) < basketW / 2 + 10) {
        items.splice(i, 1);
        score++;
        sfx.playPop();
        if (scoreEl) scoreEl.innerText = `Score: ${score}/23`;

        if (score >= 23) {
          gameRunning = false;
          sfx.playFanfare();
          triggerConfettiCannons();
          tracker.unlock(13, "Mini-Game: Catching 23 Hearts");
          const trophy = document.getElementById('game-trophy');
          if (trophy) trophy.classList.remove('hidden');
        }
      } else if (it.y > height) {
        items.splice(i, 1);
      }
    }

    requestAnimationFrame(loop);
  }

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    basketX = e.clientX - rect.left;
  });

  canvas.addEventListener('touchmove', (e) => {
    const rect = canvas.getBoundingClientRect();
    basketX = e.touches[0].clientX - rect.left;
    e.preventDefault();
  });

  if (startBtn) {
    startBtn.addEventListener('click', () => {
      score = 0;
      items = [];
      gameRunning = true;
      if (scoreEl) scoreEl.innerText = `Score: 0/23`;
      startBtn.innerText = 'Restart Game';
      spawnItem();
      loop();
    });
  }
}

// ==========================================
// 17. SURPRISE 14: 23 CHAPTERS OF SHREYA (FLIPBOOK)
// ==========================================
function initChaptersBook() {
  const chapters = [
    { title: "Chapter 1: 14th Sept 2023 - The Library Stare", desc: "Walking around the library, unaware that a boy was secretly watching you and losing his heart completely." },
    { title: "Chapter 2: The Mystery of '3 Year Senior Sangam'", desc: "A silly four-word code name that somehow ended up starting the greatest love story of my life." },
    { title: "Chapter 3: The Chai & Tea Post Obsession", desc: "50% of Shreya's life solved by Chai, 50% solved at Tea Post. My cutest lifetime competition in a cup." },
    { title: "Chapter 4: Late-Night Jupiter Rides & Karaoke", desc: "Blasting music, singing completely off-key, making fun of each other, and sharing our deepest thoughts without judgment." },
    { title: "Chapter 5: Chhota Packet, Bada Dhamaka", desc: "Tears when things go wrong, dancing when they go right, taking risks, and never asking for credit despite helping everyone." },
    { title: "Chapter 6: CSMT Station: When Time Froze", desc: "The train journey with my heart racing, and the second you ran into my arms... I begged God to freeze time right then." },
    { title: "Chapter 7: Marine Drive Breeze & Midnight Cycling", desc: "Pedaling by the Arabian Sea, city lights glowing, sea breeze in our hair, feeling totally at ease next to my favorite girl." },
    { title: "Chapter 8: Holding Hands at ISKCON Mandir", desc: "Holding my favorite person's hand and walking into the temple together—a lifelong dream you made come true." },
    { title: "Chapter 9: The Baby Nap in the Cab", desc: "Watching you fall asleep peacefully like an innocent baby on the way back, feeling safe, cozy, and protected." },
    { title: "Chapter 10: The Flying Elephant Survival Rule", desc: "If you tell me elephants can fly during your 5 days, I will 1000% agree with you baba! Zero risks taken, always!" },
    { title: "Chapter 11: The Boy Who Listens to You Yap", desc: "A guy who never listens to anybody will happily listen to you yap for hours about every story, drama, and thought." },
    { title: "Chapter 12: From Boy to Man: Thank You, Shreya", desc: "Thank you for shaping me, inspiring me, and helping me grow into the man I am today." },
    { title: "Chapter 13: Your Loudest Hype Man Forever", desc: "Always standing in the front row clapping, hooting, and cheering for your every dream and success." },
    { title: "Chapter 14: Turning 23: My Forever Cutu & Pookiebear", desc: "I want this Shreya Kabra in my every single lifetime. You complete me, my girl. Happy 23rd Birthday!" }
  ];

  let current = 0;
  const titleEl = document.getElementById('book-chapter-title');
  const descEl = document.getElementById('book-chapter-desc');
  const nextBtn = document.getElementById('book-next-btn');
  const prevBtn = document.getElementById('book-prev-btn');

  function renderChapter() {
    if (titleEl && descEl) {
      titleEl.innerText = chapters[current].title;
      descEl.innerText = chapters[current].desc;
      sfx.playChime(600 + current * 40);
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      current = (current + 1) % chapters.length;
      renderChapter();
      tracker.unlock(14, '23 Chapters of Shreya Flipbook');
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      current = (current - 1 + chapters.length) % chapters.length;
      renderChapter();
    });
  }
}

// ==========================================
// 18. SURPRISE 15: THE BABY TREATMENT & COMFORT SANCTUARY
// ==========================================
function initComfortSanctuary() {
  const comfortData = {
    hug: {
      icon: "🫂",
      title: "The 60-Second Tight Warm Hug",
      msg: "Wrap your arms around yourself right now—that's me holding you with all the warmth in my soul. Remember that exact moment at CSMT station when time felt like it stood still? Close your eyes and feel that exact same embrace. I am right here with you, Shreya. Distance changes nothing. You are safe in my arms forever."
    },
    kiss: {
      icon: "💆‍♀️",
      title: "Forehead Kiss & Gentle Pampering",
      msg: "Close your eyes for 30 seconds. Imagine me gently moving the hair away from your face and kissing your forehead. Drop your shoulders, unclench your jaw. You've worked so hard, handled so much change, and I am so immensely proud of the woman you are. Just relax now, my baby. You are safe, loved, and taken care of."
    },
    chai: {
      icon: "☕",
      title: "Steaming Hot Tea Post Chai",
      msg: "A freshly brewed, piping-hot cup of kadak chai with ginger and cardamom, handed to you with a loving smile. Sit back, take a sip, and let all the chaos in Mumbai fade into the background. Every sip is filled with my love. If there's ever a competition between me and Chai, I'll happily pour you the cup myself."
    },
    yap: {
      icon: "👂",
      title: "Safe Haven Yapping Corner",
      msg: "Tell me everything: the annoying office email, the flat stress, what made you laugh, what made you cry. A boy who doesn't listen to anyone in this world is always, unconditionally, all ears for you. I will never get tired of your voice. Yap away, my cutu—I love every single word."
    }
  };

  const buttons = document.querySelectorAll('.comfort-token-btn');
  const iconEl = document.getElementById('comfort-icon');
  const titleEl = document.getElementById('comfort-title');
  const msgEl = document.getElementById('comfort-message');
  const displayBox = document.getElementById('comfort-display');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const token = btn.dataset.token;
      const data = comfortData[token];
      if (!data) return;

      sfx.playChime(640);

      // Highlight active button
      buttons.forEach(b => {
        b.classList.remove('border-rose-400', 'bg-rose-100/70', 'shadow-md');
      });
      btn.classList.add('border-rose-400', 'bg-rose-100/70', 'shadow-md');

      // Update display with gentle pulse
      if (displayBox) {
        displayBox.classList.add('opacity-50', 'scale-98');
        setTimeout(() => {
          if (iconEl) iconEl.innerText = data.icon;
          if (titleEl) titleEl.innerText = data.title;
          if (msgEl) msgEl.innerText = `"${data.msg}"`;
          displayBox.classList.remove('opacity-50', 'scale-98');
        }, 120);
      }

      tracker.unlock(15, 'The Baby Treatment & Comfort Sanctuary');
    });
  });
}

// ==========================================
// 19. SURPRISE 16: MIDNIGHT FIREWORKS LAUNCHPAD
// ==========================================
function initFireworksLaunchpad() {
  const canvas = document.getElementById('fireworks-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = canvas.parentElement.clientWidth);
  let height = (canvas.height = 280);

  let rockets = [];
  let sparks = [];

  function loop() {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.25)';
    ctx.fillRect(0, 0, width, height);

    // Rockets
    for (let i = rockets.length - 1; i >= 0; i--) {
      const r = rockets[i];
      r.y -= r.speedY;
      ctx.fillStyle = '#fff';
      ctx.fillRect(r.x, r.y, 3, 8);

      if (r.y <= r.targetY) {
        // Explode
        for (let j = 0; j < 40; j++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 4 + 1;
          sparks.push({
            x: r.x,
            y: r.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            color: r.color,
            alpha: 1
          });
        }
        sfx.playPop();
        rockets.splice(i, 1);
      }
    }

    // Sparks
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.x += s.vx;
      s.y += s.vy;
      s.alpha -= 0.02;

      ctx.save();
      ctx.globalAlpha = s.alpha;
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (s.alpha <= 0) sparks.splice(i, 1);
    }

    requestAnimationFrame(loop);
  }
  loop();

  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;

    rockets.push({
      x: cx,
      y: height,
      targetY: cy,
      speedY: 6,
      color: ['#f43f5e', '#ec4899', '#38bdf8', '#fbbf24', '#a855f7'][Math.floor(Math.random() * 5)]
    });
    sfx.playWhoosh();
    tracker.unlock(16, 'Midnight Fireworks Launchpad');
  });
}

// ==========================================
// 20. SURPRISE 17: BOARDING PASS TO OUR ADVENTURE
// ==========================================
function initBoardingPass() {
  const stub = document.getElementById('ticket-stub');
  const boardingMsg = document.getElementById('boarding-claimed-msg');
  if (stub) {
    stub.addEventListener('click', () => {
      sfx.playFanfare();
      triggerConfettiCannons();
      stub.innerHTML = '<p class="text-xs uppercase font-bold tracking-widest">CLAIMED ✓</p><span class="text-3xl my-2">🎉</span><p class="text-[10px] leading-tight opacity-90">Adventure awaits, cutu!</p>';
      stub.classList.add('bg-emerald-600');
      stub.classList.remove('bg-rose-500', 'hover:bg-rose-600', 'cursor-pointer');
      if (boardingMsg) boardingMsg.classList.remove('hidden');
      tracker.unlock(17, 'Boarding Pass to Adventure');
    });
  }
}

// ==========================================
// 21. SURPRISE 18: LOVE TRIVIA QUIZ
// ==========================================
function initQuiz() {
  const quizData = [
    {
      question: "On 14th September 2023, where was he secretly trying to look at you without making it obvious?",
      options: [
        { text: "A) Walking around the library 📚", correct: true },
        { text: "B) In the college canteen", correct: false },
        { text: "C) In a lecture hall", correct: false },
        { text: "D) Outside the main gate", correct: false }
      ],
      comment: "Correct! That day in the library changed my life forever. I couldn't take my eyes off you! ❤️"
    },
    {
      question: "What solves 50% of Shreya's life problems, while the other 50% requires a trip to Tea Post?",
      options: [
        { text: "A) Dark chocolate", correct: false },
        { text: "B) A soothing cup of Chai ☕", correct: true },
        { text: "C) Taking a 12-hour nap", correct: false },
        { text: "D) An emergency shopping spree", correct: false }
      ],
      comment: "Obviously CHAI! My greatest competitor in life, served warm in a cup! ☕"
    },
    {
      question: "What mysterious code name unexpectedly started our entire love story?",
      options: [
        { text: "A) 3 Year Senior Sangam 🤫", correct: true },
        { text: "B) College Fresher 101", correct: false },
        { text: "C) Library Partner In Crime", correct: false },
        { text: "D) The Secret Crush Project", correct: false }
      ],
      comment: "3 Year Senior Sangam! Who would have thought four words could start our forever? ✨"
    },
    {
      question: "What lifelong dream of his came true while visiting Mumbai?",
      options: [
        { text: "A) Eating 10 Vada Pavs at 2 AM", correct: false },
        { text: "B) Winning a dance-off at the club", correct: false },
        { text: "C) Holding your hand & going to ISKCON Mandir 🛕", correct: true },
        { text: "D) Getting a taxi without any traffic", correct: false }
      ],
      comment: "Holding my favorite person's hand and walking into the mandir together. Best moment ever! 🛕"
    },
    {
      question: "If Shreya declares that an elephant can fly during *those 5 days*, what is his official survival stance?",
      options: [
        { text: "A) 'Elephants are too heavy to fly!'", correct: false },
        { text: "B) 'Let me Google the laws of physics.'", correct: false },
        { text: "C) 100% agree: 'Yes baba, elephants fly so high!' 🐘✈️", correct: true },
        { text: "D) Debate with evidence", correct: false }
      ],
      comment: "I agree IMMEDIATELY baba! I cannot take any risks with my Cutu! 😂"
    }
  ];

  let currentQ = 0;
  let score = 0;

  const qNumEl = document.getElementById('quiz-q-num');
  const qEl = document.getElementById('quiz-question');
  const optContainer = document.getElementById('quiz-options');
  const feedbackEl = document.getElementById('quiz-feedback');
  const scoreEl = document.getElementById('quiz-score');

  function renderQ() {
    if (!qEl || !optContainer) return;
    const q = quizData[currentQ];
    if (qNumEl) qNumEl.innerText = `Question ${currentQ + 1} of ${quizData.length}`;
    qEl.innerText = q.question;
    optContainer.innerHTML = '';
    if (feedbackEl) feedbackEl.classList.add('hidden');

    q.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'w-full p-3 text-left rounded-xl border border-gray-200 text-xs font-semibold hover:border-rose-300 transition-all bg-white/70 hover:bg-rose-50/50 shadow-sm';
      btn.innerText = opt.text;

      btn.addEventListener('click', () => {
        optContainer.querySelectorAll('button').forEach(b => (b.disabled = true));

        if (opt.correct) {
          btn.classList.add('bg-emerald-100', 'border-emerald-500', 'text-emerald-800');
          sfx.playChime(880);
          score++;
          if (scoreEl) scoreEl.innerText = `Score: ${score} / ${quizData.length}`;
          if (feedbackEl) {
            feedbackEl.innerText = q.comment;
            feedbackEl.className = 'mt-4 p-3 rounded-xl text-xs font-medium text-center bg-emerald-50 text-emerald-800 border border-emerald-300 animate-fade-in';
            feedbackEl.classList.remove('hidden');
          }
          triggerConfettiCannons();
        } else {
          btn.classList.add('bg-rose-100', 'border-rose-400', 'text-rose-700');
          sfx.playPop();
          if (feedbackEl) {
            feedbackEl.innerText = "Oops! Close, but you know the real answer! 💖";
            feedbackEl.className = 'mt-4 p-3 rounded-xl text-xs font-medium text-center bg-rose-50 text-rose-700 border border-rose-300 animate-fade-in';
            feedbackEl.classList.remove('hidden');
          }
        }

        setTimeout(() => {
          if (currentQ < quizData.length - 1) {
            currentQ++;
            renderQ();
          } else {
            tracker.unlock(18, 'The Shreya & Us Love Quiz');
            if (feedbackEl) {
              feedbackEl.innerHTML = `🎉 <strong>Quiz Complete!</strong> You scored ${score}/${quizData.length}! You will always be my Cutu, Gucchu Pucchu & forever Pookiebear! 💖`;
              feedbackEl.className = 'mt-4 p-4 rounded-xl text-xs font-medium text-center bg-rose-100 text-rose-900 border-2 border-rose-400 animate-bounce';
              feedbackEl.classList.remove('hidden');
            }
          }
        }, 1800);
      });

      optContainer.appendChild(btn);
    });
  }

  renderQ();
}

// ==========================================
// 22. SURPRISE 19: WISHING JAR (23 ORIGAMI STARS)
// ==========================================
function initWishingJar() {
  const jar = document.getElementById('wishing-jar');
  const wishText = document.getElementById('unfolded-wish-text');
  const starCounter = document.getElementById('wish-star-count');
  let wishesOpened = 0;

  const wishes = [
    "⭐ May every chai you sip this year taste extra warm, and every Tea Post evening feel exactly like home.",
    "⭐ I wish for you to finally get all the sleep you deserve. And when you can't, I will give you the full royal baby treatment.",
    "⭐ May your 23rd year be exactly as dhamaka as you are: chhota packet energy, bada impact on every single room you walk into.",
    "⭐ I wish for at least one more midnight Jupiter ride — stars above, city below, and absolutely nothing else that matters.",
    "⭐ May you always know that when life gets heavy and exhausting, my shoulder exists specifically and permanently for you.",
    "⭐ I wish for a Marine Drive sunrise with you, cycling slowly while the whole world wakes up gently around us.",
    "⭐ May your ISKCON peace always be available to you — and may I always get to hold your hand on the walk there.",
    "⭐ I wish for every CSMT-style frozen hug this year to be longer than the last one. Every single time.",
    "⭐ May your yapping sessions always have a willing, devoted, and genuinely enchanted audience. That is me. Forever.",
    "⭐ I wish for you to see yourself the way I see you: the most brilliantly, beautifully, undeniably extraordinary person I know.",
    "⭐ May this flying elephant survive every new obstacle life throws — because I will be there with the 5-day protocol and fresh chai.",
    "⭐ I wish for our Fictionary nights, karaoke adventures, and Sangam library whispers to fill every chapter of Year 23.",
    "⭐ May every dream you hold close come true — every single one — because you, Shreya Kabra, deserve the entire universe.",
    "⭐ I wish for Year 23 to be the year your brilliance finally gets to shine at full brightness. No more dimming. Not for one second.",
    "⭐ I wish for us — always, in every version of every year. You are my favourite everything, every time.",
    "⭐ May every hard day end with something warm: chai, a hug, or just knowing that I am completely, entirely yours.",
    "⭐ I wish for that CSMT moment to repeat itself — the one where we both froze and the whole world went beautifully quiet.",
    "⭐ May 23 be the year you finally believe what everyone who loves you already knows: you are extraordinary beyond words.",
    "⭐ I wish for Sunday morning laziness, Jupiter rides at midnight, and every ordinary moment to feel like it belongs to us.",
    "⭐ I wish for this — you and me, going through everything together, being each other's home. Every year. Every lifetime.",
    "⭐ May you be endlessly celebrated, endlessly loved, and endlessly reminded that you are my chhota packet of pure magic.",
    "⭐ I wish for the day I can give you all the baby treatment you are owed — warm chai in hand, nowhere else in the world to be.",
    "⭐ May you always have a reason to smile — and if you don't, just remember someone loves you beyond every measure that has ever existed."
  ];

  let wishIndex = 0;

  if (jar) {
    jar.addEventListener('click', () => {
      sfx.playChime(750 + (wishesOpened % 6) * 35);
      wishIndex = wishesOpened % wishes.length;
      wishesOpened++;
      if (starCounter) {
        starCounter.innerText = wishesOpened + ' star' + (wishesOpened !== 1 ? 's' : '') + ' unfolded ✨';
      }
      if (wishText) {
        wishText.innerHTML = '<span class="text-rose-600 font-bold">' + wishes[wishIndex] + '</span>';
      }
      if (wishesOpened === 3 || wishesOpened === 10 || wishesOpened === 23) triggerConfettiCannons();
      tracker.unlock(19, 'Origami Star Wishing Jar');
    });
  }
}

// ==========================================
// 23. SURPRISE 20: EMERGENCY DANCE PARTY / RAVE
// ==========================================
function initDanceParty() {
  const btn = document.getElementById('disco-rave-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      document.body.classList.toggle('disco-active');
      const isActive = document.body.classList.contains('disco-active');
      if (isActive) {
        btn.innerText = '🪩 Pause Rave & Catch Breath';
        sfx.startDiscoBeat();
        triggerConfettiCannons();
        tracker.unlock(20, 'Pookiebear Rave & Dance Mode');
      } else {
        btn.innerText = '🎉 Start Emergency Pookiebear Dance Party!';
      }
    });
  }
}

// ==========================================
// 24. SURPRISE 21: BUCKET LIST TRAVEL MAP
// ==========================================
function initTravelMap() {
  const pins = document.querySelectorAll('.travel-pin');
  pins.forEach(pin => {
    pin.addEventListener('click', () => {
      sfx.playChime(700);
      alert(`✈️ Destination: ${pin.dataset.place}\n"I can't wait to travel here with you, Cutu!"`);
      tracker.unlock(21, 'Dream Travel Bucket List Map');
    });
  });
}

// ==========================================
// 25. SURPRISE 22: DIGITAL TIME CAPSULE TO 24
// ==========================================
function initTimeCapsule() {
  const unlockBtn = document.getElementById('time-capsule-unlock-btn');
  const content = document.getElementById('time-capsule-content');
  if (unlockBtn && content) {
    unlockBtn.addEventListener('click', () => {
      sfx.playFanfare();
      content.classList.remove('hidden');
      unlockBtn.classList.add('hidden');
      tracker.unlock(22, 'Time Capsule to Shreya at 24');
    });
  }
}

// ==========================================
// 26. SURPRISE 23: SKY LANTERN MIDNIGHT WISH
// ==========================================
function initSkyLantern() {
  const sendBtn = document.getElementById('release-lantern-btn');
  const input = document.getElementById('lantern-wish-input');
  const sky = document.getElementById('lantern-sky');

  if (sendBtn && input && sky) {
    sendBtn.addEventListener('click', () => {
      const wish = input.value.trim() || 'For endless happiness, health, and love!';
      sfx.playWhoosh();
      sfx.playFanfare();
      triggerConfettiCannons();

      const lantern = document.createElement('div');
      lantern.className = 'lantern flex items-center justify-center text-[10px] text-amber-900 font-bold px-1 text-center';
      lantern.innerText = '✨ ' + wish.substring(0, 15) + '...';
      lantern.style.left = Math.random() * 70 + 15 + '%';
      lantern.style.bottom = '10px';

      sky.appendChild(lantern);
      input.value = '';

      tracker.unlock(23, 'Sky Lantern Midnight Wish Ceremony');
      setTimeout(() => lantern.remove(), 12000);
    });
  }
}

// ==========================================
// 27. FLOATING HEART & SPARKLE CURSOR TRAIL
// ==========================================
function initCursorTrail() {
  let lastX = 0, lastY = 0;
  const symbols = ['💖', '✨', '🌸', '💫', '❤️', '🌟'];

  window.addEventListener('mousemove', (e) => {
    const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
    if (dist < 30) return;
    lastX = e.clientX;
    lastY = e.clientY;

    const heart = document.createElement('span');
    heart.className = 'cursor-heart';
    heart.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = `${e.clientX}px`;
    heart.style.top = `${e.clientY}px`;
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 1000);
  });
}

// ==========================================
// 28. PLAYFUL VIP LOGIN & VERIFICATION PORTAL
// ==========================================
function initPlayfulLogin() {
  const enterBtn = document.getElementById('welcome-enter-btn');
  const welcomeModal = document.getElementById('welcome-modal');
  const progressBadge = document.getElementById('login-progress-badge');

  let step1Cleared = false;
  let step2Cleared = false;
  let step3Cleared = false;

  function updateProgress() {
    let count = (step1Cleared ? 1 : 0) + (step2Cleared ? 1 : 0) + (step3Cleared ? 1 : 0);
    if (progressBadge) {
      progressBadge.innerText = `${count} / 3 Cleared`;
      if (count === 3) {
        progressBadge.className = 'text-[11px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-300 animate-pulse';
      }
    }

    if (count === 3 && enterBtn) {
      enterBtn.disabled = false;
      enterBtn.className = 'w-full py-4 px-6 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all duration-300 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-700 text-white cursor-pointer shadow-xl shadow-rose-500/40 transform hover:-translate-y-1 animate-bounce';
      enterBtn.innerHTML = '<span>💖 Verified! Scan Heartbeat & Enter Universe ✨</span>';
      sfx.playFanfare();
    }
  }

  // Step 1: Alias Chips
  const aliasChips = document.querySelectorAll('#alias-chips button');
  const step1Status = document.getElementById('step-1-status');
  aliasChips.forEach(chip => {
    chip.addEventListener('click', () => {
      sfx.playChime(650);
      aliasChips.forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      step1Cleared = true;
      if (step1Status) {
        step1Status.innerText = '✓ Verified Cutiepie';
        step1Status.className = 'text-[10px] text-emerald-600 font-bold';
      }
      updateProgress();
    });
  });

  // Step 2: Flying Elephant Protocol
  const elephantYes = document.getElementById('elephant-yes-btn');
  const elephantNo = document.getElementById('elephant-no-btn');
  const elephantFeedback = document.getElementById('elephant-feedback');
  const step2Status = document.getElementById('step-2-status');
  const step2Card = document.getElementById('step-2-card');

  if (elephantYes && elephantNo) {
    elephantYes.addEventListener('click', () => {
      sfx.playChime(750);
      elephantYes.classList.add('selected');
      elephantNo.classList.remove('selected');
      step2Cleared = true;
      if (step2Status) {
        step2Status.innerText = '✓ Truth Acknowledged';
        step2Status.className = 'text-[10px] text-emerald-600 font-bold';
      }
      if (elephantFeedback) {
        elephantFeedback.innerHTML = '✨ Correct! Whatever Cutu says is scientific law! Zero risks taken, baba! 😂';
        elephantFeedback.className = 'text-[11px] font-semibold mt-2 text-center text-emerald-700 bg-emerald-50 p-2 rounded-xl border border-emerald-200';
        elephantFeedback.classList.remove('hidden');
      }
      updateProgress();
    });

    elephantNo.addEventListener('click', () => {
      sfx.playPop();
      if (step2Card) {
        step2Card.classList.remove('shake-error');
        void step2Card.offsetWidth;
        step2Card.classList.add('shake-error');
      }
      if (elephantFeedback) {
        elephantFeedback.innerHTML = '❌ Access Denied: Whatever Shreya says is 100% true! Elephants fly so high! Try again! 😂';
        elephantFeedback.className = 'text-[11px] font-semibold mt-2 text-center text-rose-700 bg-rose-50 p-2 rounded-xl border border-rose-300';
        elephantFeedback.classList.remove('hidden');
      }
    });
  }

  // Step 3: Essential Fuel Check
  const fuelChai = document.getElementById('fuel-chai-btn');
  const fuelSalad = document.getElementById('fuel-salad-btn');
  const fuelFeedback = document.getElementById('fuel-feedback');
  const step3Status = document.getElementById('step-3-status');
  const step3Card = document.getElementById('step-3-card');

  if (fuelChai && fuelSalad) {
    fuelChai.addEventListener('click', () => {
      sfx.playChime(850);
      fuelChai.classList.add('selected');
      fuelSalad.classList.remove('selected');
      step3Cleared = true;
      if (step3Status) {
        step3Status.innerText = '✓ Fuel Approved';
        step3Status.className = 'text-[10px] text-emerald-600 font-bold';
      }
      if (fuelFeedback) {
        fuelFeedback.innerHTML = '☕ 50% of problems solved! The other 50% solved at Tea Post! ✨';
        fuelFeedback.className = 'text-[11px] font-semibold mt-2 text-center text-orange-800 bg-orange-50 p-2 rounded-xl border border-orange-200';
        fuelFeedback.classList.remove('hidden');
      }
      updateProgress();
    });

    fuelSalad.addEventListener('click', () => {
      sfx.playPop();
      if (step3Card) {
        step3Card.classList.remove('shake-error');
        void step3Card.offsetWidth;
        step3Card.classList.add('shake-error');
      }
      if (fuelFeedback) {
        fuelFeedback.innerHTML = '❌ Imposter Alert: Who are you and what have you done to Shreya?! Shreya runs on Chai only! ☕';
        fuelFeedback.className = 'text-[11px] font-semibold mt-2 text-center text-rose-700 bg-rose-50 p-2 rounded-xl border border-rose-300';
        fuelFeedback.classList.remove('hidden');
      }
    });
  }

  // Final Enter Unlock Action
  if (enterBtn && welcomeModal) {
    enterBtn.addEventListener('click', () => {
      if (enterBtn.disabled) return;
      sfx.init();
      sfx.playFanfare();
      triggerConfettiCannons();
      welcomeModal.classList.add('opacity-0', 'pointer-events-none');
      setTimeout(() => welcomeModal.remove(), 600);
    });
  }
}

// ==========================================
// 29. INITIALIZATION ON DOM CONTENT LOADED
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initBackgroundCanvas();
  initBirthdayCake();
  initReasonsEnvelopes();
  initConstellationCanvas();
  initJupiterDrive();
  initScratchCards();
  initKeepsakes();
  initBubbleWrap();
  initBouquetBuilder();
  initSlotMachine();
  initWaxLetter();
  initCarePackages();
  initCrystalBall();
  initCatchGame();
  initChaptersBook();
  initComfortSanctuary();
  initFireworksLaunchpad();
  initBoardingPass();
  initQuiz();
  initWishingJar();
  initDanceParty();
  initTravelMap();
  initTimeCapsule();
  initSkyLantern();
  initCursorTrail();
  initPlayfulLogin();

  // Floating Sound Mute Button
  const muteBtn = document.getElementById('global-mute-btn');
  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      const isMuted = sfx.toggleMute();
      muteBtn.innerText = isMuted ? '🔇 Unmute' : '🎵 Sound On';
    });
  }

  // Close grand celebration modal
  const closeFinaleBtn = document.getElementById('close-finale-btn');
  const finaleModal = document.getElementById('grand-celebration-modal');
  if (closeFinaleBtn && finaleModal) {
    closeFinaleBtn.addEventListener('click', () => {
      finaleModal.classList.add('hidden');
    });
  }
});
