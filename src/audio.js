// Web Audio API를 활용한 효과음 생성 유틸리티

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

let bgmOscillator = null;
let bgmGain = null;
let heartbeatInterval = null;

export function initAudio() {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

export function startBGM() {
  initAudio();
  if (bgmOscillator) return;

  bgmOscillator = audioCtx.createOscillator();
  bgmGain = audioCtx.createGain();

  bgmOscillator.type = 'sine';
  bgmOscillator.frequency.value = 55; // 웅장하고 무거운 드론 사운드

  const lfo = audioCtx.createOscillator();
  lfo.type = 'sine';
  lfo.frequency.value = 0.1;
  const lfoGain = audioCtx.createGain();
  lfoGain.gain.value = 0.05;
  lfo.connect(lfoGain);
  lfoGain.connect(bgmGain.gain);

  bgmGain.gain.value = 0.05;

  bgmOscillator.connect(bgmGain);
  bgmGain.connect(audioCtx.destination);

  bgmOscillator.start();
  lfo.start();
}

export function stopBGM() {
  if (bgmOscillator) {
    bgmGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1);
    bgmOscillator.stop(audioCtx.currentTime + 1);
    bgmOscillator = null;
    bgmGain = null;
  }
}

export function startHeartbeat() {
  initAudio();
  if (heartbeatInterval) return;

  const playBeat = () => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(40, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
    
    gain.gain.setValueAtTime(0.8, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.5);
  };

  playBeat();
  heartbeatInterval = setInterval(playBeat, 1000);
}

export function stopHeartbeat() {
  if (heartbeatInterval) {
    clearInterval(heartbeatInterval);
    heartbeatInterval = null;
  }
}

export function playTimerTick() {
  initAudio();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = 'square';
  osc.frequency.setValueAtTime(1000, audioCtx.currentTime);
  
  gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start();
  osc.stop(audioCtx.currentTime + 0.1);
}

export function playClickSound() {
  initAudio();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(600, audioCtx.currentTime); 
  oscillator.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
  
  gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
  
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.1);
}

export function playActionClickSound() {
  initAudio();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  // 발소리 같은 둔탁한 소리
  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(100, audioCtx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(20, audioCtx.currentTime + 0.05);
  
  gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
  
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.05);
}

export function playGameOverSound() {
  initAudio();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  oscillator.type = 'sawtooth';
  oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 1.0);
  
  gainNode.gain.setValueAtTime(0.4, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.0);
  
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 1.0);
}

export function playSuccessSound() {
  initAudio();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); 
  oscillator.frequency.setValueAtTime(554.37, audioCtx.currentTime + 0.1); 
  oscillator.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.2); 
  oscillator.frequency.setValueAtTime(880, audioCtx.currentTime + 0.3); 
  
  gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.4);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);
  
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.8);
}

export function playHiddenSuccessSound() {
  initAudio();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
  oscillator.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.2); // E5
  oscillator.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.4); // G5
  oscillator.frequency.setValueAtTime(1046.50, audioCtx.currentTime + 0.6); // C6
  
  gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 1.5);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 2.0);
  
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 2.0);
}
