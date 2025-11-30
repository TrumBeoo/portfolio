import { useRef, useCallback } from 'react';
import { useGlobalSound } from '../App';

export const useSound = () => {
  const { soundEnabled } = useGlobalSound() || { soundEnabled: true };
  const audioContextRef = useRef(null);

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const createBeepSound = useCallback((frequency = 800, duration = 0.1, type = 'sine') => {
    const audioContext = initAudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  }, [initAudioContext]);

  const playClickSound = useCallback(() => {
    if (soundEnabled) {
      createBeepSound(1200, 0.1, 'square');
    }
  }, [createBeepSound, soundEnabled]);

  const playHoverSound = useCallback(() => {
    if (soundEnabled) {
      createBeepSound(600, 0.05, 'sine');
    }
  }, [createBeepSound, soundEnabled]);

  const playLoadSound = useCallback(() => {
    if (soundEnabled) {
      // Giai điệu nhẹ nhàng C major pentatonic
      const melody = [523, 587, 659, 784, 880]; // C5, D5, E5, G5, A5
      melody.forEach((freq, index) => {
        setTimeout(() => {
          createBeepSound(freq, 0.4, 'sine');
        }, index * 200);
      });
    }
  }, [createBeepSound, soundEnabled]);

  const playNavSound = useCallback(() => {
    if (soundEnabled) {
      createBeepSound(800, 0.08, 'sine');
    }
  }, [createBeepSound, soundEnabled]);

  const playButtonSound = useCallback(() => {
    if (soundEnabled) {
      createBeepSound(1000, 0.12, 'triangle');
    }
  }, [createBeepSound, soundEnabled]);

  const playSuccessSound = useCallback(() => {
    if (soundEnabled) {
      const frequencies = [523, 659, 784];
      frequencies.forEach((freq, index) => {
        setTimeout(() => {
          createBeepSound(freq, 0.15, 'sine');
        }, index * 80);
      });
    }
  }, [createBeepSound, soundEnabled]);

  const playWhooshSound = useCallback(() => {
    if (soundEnabled) {
      const audioContext = initAudioContext();
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      osc.frequency.setValueAtTime(300, audioContext.currentTime);
      osc.type = 'sine';
      
      gain.gain.setValueAtTime(0.08, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.12);
      
      osc.start(audioContext.currentTime);
      osc.stop(audioContext.currentTime + 0.12);
    }
  }, [initAudioContext, soundEnabled]);

  return {
    playClickSound,
    playHoverSound,
    playLoadSound,
    playNavSound,
    playButtonSound,
    playSuccessSound,
    playWhooshSound
  };
};