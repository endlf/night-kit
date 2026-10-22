let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let isPlaying = false;
let noiseNode: AudioBufferSourceNode | null = null;
let crackleInterval: ReturnType<typeof setInterval> | null = null;

function createNoiseBuffer(ctx: AudioContext, seconds: number): AudioBuffer {
  const sampleRate = ctx.sampleRate;
  const length = sampleRate * seconds;
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

function playCrackle(ctx: AudioContext, dest: GainNode) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  filter.type = 'bandpass';
  filter.frequency.value = 800 + Math.random() * 2000;
  filter.Q.value = 2;

  gain.gain.setValueAtTime(0.03 + Math.random() * 0.04, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08 + Math.random() * 0.12);

  osc.type = 'sawtooth';
  osc.frequency.value = 200 + Math.random() * 600;

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(dest);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.2);
}

export function startAmbient() {
  if (isPlaying) return;

  audioCtx = new AudioContext();
  masterGain = audioCtx.createGain();
  masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
  masterGain.gain.linearRampToValueAtTime(0.35, audioCtx.currentTime + 2);
  masterGain.connect(audioCtx.destination);

  // Wind: filtered noise
  const noiseBuffer = createNoiseBuffer(audioCtx, 4);
  noiseNode = audioCtx.createBufferSource();
  noiseNode.buffer = noiseBuffer;
  noiseNode.loop = true;

  const windFilter = audioCtx.createBiquadFilter();
  windFilter.type = 'lowpass';
  windFilter.frequency.value = 300;
  windFilter.Q.value = 0.5;

  const windGain = audioCtx.createGain();
  windGain.gain.value = 0.15;

  // Slow LFO on wind volume
  const lfo = audioCtx.createOscillator();
  const lfoGain = audioCtx.createGain();
  lfo.frequency.value = 0.15;
  lfoGain.gain.value = 0.06;
  lfo.connect(lfoGain);
  lfoGain.connect(windGain.gain);
  lfo.start();

  noiseNode.connect(windFilter);
  windFilter.connect(windGain);
  windGain.connect(masterGain);
  noiseNode.start();

  // Fire crackles
  crackleInterval = setInterval(() => {
    if (audioCtx && masterGain) {
      playCrackle(audioCtx, masterGain);
    }
  }, 300 + Math.random() * 400);

  isPlaying = true;
}

export function stopAmbient() {
  if (!audioCtx || !masterGain) return;

  masterGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1.5);

  setTimeout(() => {
    if (noiseNode) {
      try { noiseNode.stop(); } catch {}
      noiseNode = null;
    }
    if (crackleInterval) {
      clearInterval(crackleInterval);
      crackleInterval = null;
    }
    if (audioCtx) {
      audioCtx.close();
      audioCtx = null;
      masterGain = null;
    }
    isPlaying = false;
  }, 1800);
}

export function toggleAmbient(on: boolean) {
  if (on) startAmbient();
  else stopAmbient();
}

export function getIsPlaying() {
  return isPlaying;
}
