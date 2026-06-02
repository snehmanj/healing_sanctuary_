import React, { useState } from 'react';
import { Sparkles, CloudRain, Send } from 'lucide-react';
import FluidCanvas from './components/FluidCanvas';
import AudioEngine from './components/AudioEngine';

const PROVERB_DATASET = [
  { original: "七転び八起き", trans: "Nana korobi ya oki", en: "Fall seven times, stand up eight. Structural resilience dictates growth.", tag: "JP Proverb" },
  { original: "العجلة من الشيطان", trans: "Al-’ajalu min ash-shaytān", en: "Impatience generates chaos; true clarity settles in absolute stillness.", tag: "Arabic Adage" },
  { original: "विकासः दुःखस्य मूलं न हि", trans: "Vikāsaḥ duḥkhasya mūlaṃ", en: "Expansion is naturally forged through external environmental pressure.", tag: "Sanskrit Script" }
];

export default function App() {
  const [inputVal, setInputVal] = useState('');
  const [lanternList, setLanternList] = useState([]);
  const [sceneMood, setSceneMood] = useState('heavy'); // heavy (rain) -> healed (sunset)
  const [ripplePoint, setRipplePoint] = useState(null);

  const registerInteraction = (e) => {
    setRipplePoint({ x: e.clientX, y: e.clientY, timestamp: Date.now() });
  };

  const dispatchThought = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const pullWisdom = PROVERB_DATASET[Math.floor(Math.random() * PROVERB_DATASET.length)];
    
    const freshLantern = {
      id: Date.now(),
      horizontalPercentage: Math.random() * 60 + 20, // Keeps lanterns inside readable viewports
      driftFactor: (Math.random() * 120) - 60,
      payload: pullWisdom
    };

    setLanternList((prev) => [...prev, freshLantern]);
    setSceneMood('healed'); // Initiate beautiful golden sunrise-sunset layout shift
    setInputVal('');
  };

  return (
    <div 
      onClick={registerInteraction}
      className="w-screen h-screen relative overflow-hidden transition-all duration-[3000ms] ease-in-out"
      style={{
        backgroundImage: sceneMood === 'heavy'
          ? `linear-gradient(rgba(8, 20, 14, 0.9), rgba(5, 10, 8, 0.96)), url('https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=1200&auto=format&fit=crop')`
          : `linear-gradient(rgba(32, 12, 4, 0.45), rgba(10, 4, 2, 0.95)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* High Performance HTML5 Fluid Render Simulation Hook */}
      <FluidCanvas mood={sceneMood} rippleTrigger={ripplePoint} />

      {/* Floating Card Element Space Grid */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {lanternList.map((node) => (
          <div
            key={node.id}
            className="absolute bottom-0 animate-lantern flex flex-col items-center"
            style={{
              left: `${node.horizontalPercentage}%`,
              '--drift-x': `${node.driftFactor}px`
            }}
          >
            {/* Elegant Translucent Calligraphy Module Vessel */}
            <div className="w-52 p-6 rounded-t-3xl rounded-b-xl bg-gradient-to-b from-[#fdf2e2] to-[#f4be72] text-stone-900 shadow-[0_0_50px_rgba(244,190,114,0.45)] border border-[#fffdfa]/40 backdrop-blur-md text-center flex flex-col items-center gap-3">
              <span className="text-[8px] tracking-[0.2em] font-semibold text-amber-950/60 uppercase border-b border-amber-950/10 pb-1 w-full">
                {node.payload.tag}
              </span>
              
              {/* Vertical Calligraphy Alignment mirroring Serendipity Typography Poster */}
              <h2 className="text-lg font-serif-display font-semibold tracking-widest text-stone-950 writing-vertical py-2 wavy-accent max-h-36 overflow-hidden leading-relaxed">
                {node.payload.original}
              </h2>
              
              <p className="text-[9px] italic text-amber-900/80 font-light tracking-wide">
                {node.payload.trans}
              </p>
              
              <div className="border-t border-amber-950/10 pt-2.5 mt-1 w-full">
                <p className="text-xs font-light text-stone-900/90 leading-relaxed">
                  "{node.payload.en}"
                </p>
              </div>
            </div>
            {/* Dynamic Kinetic Trail Particle Spark */}
            <div className="w-3 h-7 bg-amber-400/80 blur-sm rounded-full mt-1.5 animate-pulse" />
          </div>
        ))}
      </div>

      {/* Header Overlay System */}
      <header className="absolute top-0 inset-x-0 p-8 flex justify-between items-center z-30 pointer-events-none">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-white/90">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="font-serif-display tracking-[0.3em] text-xs uppercase">Solace Glass Sanctuary</span>
          </div>
          <span className="text-[10px] tracking-wider text-stone-400 font-light">Interactive Physics Ecosystem</span>
        </div>
        
        <AudioEngine />
      </header>

      {/* Minimalist Input Hub Container */}
      <div className="absolute bottom-14 inset-x-0 max-w-lg mx-auto px-6 z-30 pointer-events-auto flex flex-col items-center gap-5">
        
        {sceneMood === 'healed' && (
          <button 
            onClick={(e) => { e.stopPropagation(); setSceneMood('heavy'); }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 uppercase tracking-[0.2em] hover:bg-amber-500/25 transition-all shadow-lg animate-fade-in"
          >
            <CloudRain className="w-3 h-3" />
            Recycle Atmospheric State
          </button>
        )}

        <form onSubmit={dispatchThought} className="w-full relative flex items-center group">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Release a heavy emotion onto the clear reflection..."
            className="w-full bg-black/50 backdrop-blur-2xl text-white border border-white/10 rounded-2xl pl-6 pr-14 py-4 text-xs focus:outline-none focus:border-amber-400/50 transition-all placeholder-stone-500 font-light shadow-2xl tracking-wide"
          />
          <button
            type="submit"
            className="absolute right-2.5 p-2.5 bg-white/5 hover:bg-white text-white hover:text-black rounded-xl transition-all"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
        
        <span className="text-[9px] text-stone-500 font-light tracking-wide max-w-sm text-center leading-relaxed">
          Typing sends vibrations into the liquid matrix. Submitting wraps your burden in light and casts it upward.
        </span>
      </div>
    </div>
  );
}
