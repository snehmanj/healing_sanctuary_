import React, { useEffect, useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function AudioEngine() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const ytPlayerRef = useRef(null);

  useEffect(() => {
    const bindPlayer = () => {
      if (window.YT && window.YT.Player) {
        ytPlayerRef.current = new window.YT.Player('ghibli-audio-node', {
          height: '0',
          width: '0',
          videoId: 'asB23WeoyM0', // Your explicit target atmosphere track
          playerVars: { autoplay: 0, controls: 0, rel: 0, loop: 1, playlist: 'asB23WeoyM0' },
          events: {
            onReady: (e) => e.target.setVolume(30)
          }
        });
      }
    };

    if (!window.YT) {
      window.onYouTubeIframeAPIReady = bindPlayer;
    } else {
      bindPlayer();
    }
  }, []);

  const handlePlayback = (e) => {
    e.stopPropagation(); // Avoid triggering water ripples when clicking control buttons
    if (!ytPlayerRef.current || typeof ytPlayerRef.current.playVideo !== 'function') return;
    
    if (isPlaying) {
      ytPlayerRef.current.pauseVideo();
    } else {
      ytPlayerRef.current.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  const handleMute = (e) => {
    e.stopPropagation();
    if (!ytPlayerRef.current || typeof ytPlayerRef.current.mute !== 'function') return;

    if (isMuted) {
      ytPlayerRef.current.unMute();
    } else {
      ytPlayerRef.current.mute();
    }
    setIsMuted(!isMuted);
  };

  return (
    <div className="flex items-center gap-4 bg-black/40 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full shadow-2xl pointer-events-auto">
      <div id="ghibli-audio-node" className="absolute opacity-0 w-0 h-0 pointer-events-none" />
      
      <button 
        onClick={handlePlayback}
        className="w-9 h-9 rounded-full flex items-center justify-center bg-white text-stone-950 hover:scale-105 transition-transform shadow-md"
      >
        {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
      </button>

      <div className="flex flex-col text-left">
        <span className="text-[9px] uppercase tracking-[0.15em] text-stone-400 font-semibold">Soundscape Focus</span>
        <span className="text-xs text-white/90 font-light max-w-[130px] truncate">Ghibli Studio Lofi</span>
      </div>

      <button onClick={handleMute} className="pl-2 border-l border-white/10 text-stone-400 hover:text-white transition-colors">
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
