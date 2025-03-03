import React, { useEffect, useRef } from 'react';

const AnimatedCanvas = ({ musicPlaying }) => {
  const canvasRef = useRef(null);
  // Références pour l'AudioContext et l'Analyser
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  let animationFrameId;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    // Adapter la taille du canvas à son conteneur
    canvas.width = canvas.offsetWidth;
    canvas.height = 100;

    const animate = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (musicPlaying) {
        // Récupérer tous les éléments audio présents dans le DOM
        const audios = document.querySelectorAll('audio');
        // Filtrer pour obtenir l'élément audio qui est en lecture
        const activeAudio = Array.from(audios).find((audio) => !audio.paused);

        if (activeAudio) {
          // Si l'AudioContext n'est pas initialisé ou si l'audio actif a changé, le recréer
          if (!audioContextRef.current || audioContextRef.current._activeAudio !== activeAudio) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const audioContext = new AudioContext();
            audioContextRef.current = audioContext;
            // Stocker l'élément actif pour comparaison ultérieure
            audioContextRef.current._activeAudio = activeAudio;

            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 256; // Résolution de l'analyse
            analyserRef.current = analyser;
            const source = audioContext.createMediaElementSource(activeAudio);
            source.connect(analyser);
            analyser.connect(audioContext.destination);
            dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
          }
          // Relancer l'AudioContext s'il est suspendu (ex : sur mobile)
          if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
          }
          // Mise à jour des données de fréquence
          analyserRef.current.getByteFrequencyData(dataArrayRef.current);

          // ===== Mode actif : equalizer dynamique =====
          const bufferLength = analyserRef.current.frequencyBinCount;
          const barWidth = canvas.width / bufferLength;
          for (let i = 0; i < bufferLength; i++) {
            const value = dataArrayRef.current[i];
            const barHeight = Math.max(2, (value / 255) * canvas.height);
            const red = Math.min(255, barHeight + 100);
            const green = 50;
            const blue = Math.max(0, 150 - barHeight / 2);
            ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
            ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth - 1, barHeight);
          }
          // ==========================================================
        }
      } else {
        // ===== Mode inactif : simulation d'une amplitude constante =====
        // Utilisation d'une valeur par défaut (ici 127, soit la moitié de 255)
        const defaultValue = 200;
        // On souhaite afficher le même nombre de barres que dans le mode actif
        // Ici, on peut choisir par exemple 64 barres
        const numBars = 124;
        const barWidth = canvas.width / numBars;
        for (let i = 0; i < numBars; i++) {
          const barHeight = Math.max(2, (defaultValue / 255) * canvas.height);
          const red = Math.min(255, barHeight + 100);
          const green = 50;
          const blue = Math.max(0, 150 - barHeight / 2);
          ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
          ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth - 1, barHeight);
        }
        // ==============================================================
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [musicPlaying]);

  return <canvas ref={canvasRef} className="audio-visualizer" />;
};

export default AnimatedCanvas;
