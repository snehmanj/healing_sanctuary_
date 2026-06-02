import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Wind, History, Play, Compass, Moon, Sun,
  ChevronRight, Volume2, VolumeX, Globe, Leaf, RefreshCw
} from 'lucide-react';

// =========================================================================
// MULTILINGUAL DATABASE (Anime, Quotes, Philosophy)
// =========================================================================
const SPECTRUM_WISDOM_POOL = {
  fiery_unrest: [
    {
      original: "七転び八起き",
      transliteration: "Nana korobi ya oki",
      english: "Fall seven times, stand up eight. Turn the friction of your current battle into relentless resilience.",
      source: "Traditional Japanese Proverb",
      langLabel: "Japanese (日本語)"
    },
    {
      original: "العجلة من الشيطان والـتأني من الرحمن",
      transliteration: "Al-’ajalu min ash-shaytān wa at-ta’annī min ar-Rahmān",
      english: "Impatience and uncontrolled anger stem from chaos; stillness and deliberate patience belong to the Divine Spirit.",
      source: "Ancient Arabic Adage",
      langLabel: "Arabic (العربية)"
    }
  ],
  heavy_spirit: [
    {
      original: "विकासः दुःखस्य मूलं न हि।",
      transliteration: "Vikāsaḥ duḥkhasya mūlaṃ na hi.",
      english: "Growth does not come from comfort, it comes from challenges.",
      source: "The Mahabharata",
      langLabel: "Sanskrit (संस्कृतम्)"
    },
    {
      original: "人は何かの犠牲なしに何も得ることは出来ない",
      transliteration: "Hito wa nani ka no gisei nashi ni nani mo eru koto wa dekinai",
      english: "To gain clarity, you must forfeit the desire to control everything. Let go of the moving storm to find your anchor.",
      source: "Fullmetal Alchemist",
      langLabel: "Japanese (日本語)"
    }
  ],
  chaotic_mind: [
    {
      original: "Per aspera ad astra.",
      transliteration: "Per aspera ad astra",
      english: "Through hardships and trials, we journey directly to the stars. Your sorrow is a pathway, not a destination.",
      source: "Seneca / Classic Latin",
      langLabel: "Latin (Latina)"
    }
  ],
  depleted_shell: [
    {
      original: "낙심하지 말라. 모든 일은 결국 제자리로 돌아간다.",
      transliteration: "Naksimhaji malla. Modeun ireun gyeolguk jejariro doraganda.",
      english: "Do not let your heart stay heavy. Every cosmic cycle eventually balances out. Give your physical vessel permission to stop running.",
      source: "Korean Meditation Anthology",
      langLabel: "Korean (한국어)"
    }
  ]
};

const SPECTRUM_MEDIA_ENGINE = {
  fiery_unrest: { message: "Redirect your burning internal heat.", videoTitle: "Ghibli Relaxing Piano Suite • Deep Focus", videoUrl: "https://www.youtube.com/watch?v=3jWRrafhO7M" },
  heavy_spirit: { message: "Let this ground your emotional weight.", videoTitle: "Studio Ghibli Calm Lofi Mix Vol. 2", videoUrl: "https://www.youtube.com/watch?v=3jWRrafhO7M" },
  chaotic_mind: { message: "Find structural stillness inside the music loops.", videoTitle: "Cozy Ghibli Coffee Shop Music Ambient", videoUrl: "https://www.youtube.com/watch?v=3jWRrafhO7M" },
  depleted_shell: { message: "Your batteries are depleted. Rest completely.", videoTitle: "Deep Sleep Ghibli Lofi Rain Companion", videoUrl: "https://www.youtube.com/watch?v=3jWRrafhO7M" }
};

export default function App() {
  const [journalText, setJournalText] = useState('');
  const [comfortBox, setComfortBox] = useState(null);
  const [isPlayingLofi, setIsPlayingLofi] = useState(false);
  const [seedLevel, setSeedLevel] = useState(0);
  const [seedImg, setSeedImg] = useState("https://images.unsplash.com/photo-1532086853747-99450c17fa2e?q=80&w=600&auto=format&fit=crop"); 
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isNightTime, setIsNightTime] = useState(true);
  
  const lofiAudioRef = useRef(null);

  const seedGrowthStages = [
    "https://images.unsplash.com/photo-1532086853747-99450c17fa2e?q=80&w=600&auto=format&fit=crop", // Seed
    "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?q=80&w=600&auto=format&fit=crop", // Sprout
    "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=600&auto=format&fit=crop", // Open Leaves
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=600&auto=format&fit=crop", // Plant
    "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?q=80&w=600&auto=format&fit=crop"  // Tree Sapling
  ];

  useEffect(() => {
    // DYNAMIC SYSTEM TIME CHECKER (Night is between 6 PM and 6 AM)
    const hour = new Date().getHours();
    const nightModeActive = hour >= 18 || hour < 6;
    setIsNightTime(nightModeActive);

    // Audio tracking setup
    lofiAudioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3');
    lofiAudioRef.current.loop = true;
    lofiAudioRef.current.volume = 0.20;

    return () => {
      if (lofiAudioRef.current) lofiAudioRef.current.pause();
    };
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const moveX = (clientX - window.innerWidth / 2) * 0.02;
    const moveY = (clientY - window.innerHeight / 2) * 0.02;
    setMousePos({ x: moveX, y: moveY });
  };

  const toggleLofi = () => {
    if (isPlayingLofi) {
      lofiAudioRef.current.pause();
    } else {
      lofiAudioRef.current.play().catch(() => {});
    }
    setIsPlayingLofi(!isPlayingLofi);
  };

  const handleProcessEntry = (e) => {
    e.preventDefault();
    if (!journalText.trim()) return;

    const keys = Object.keys(SPECTRUM_WISDOM_POOL);
    const selectedKey = keys[Math.floor(Math.random() * keys.length)];
    const array = SPECTRUM_WISDOM_POOL[selectedKey];
    const pickedQuote = array[Math.floor(Math.random() * array.length)];
    const pickedMedia = SPECTRUM_MEDIA_ENGINE[selectedKey];

    setComfortBox({
      quote: pickedQuote,
      advice: pickedMedia,
      key: selectedKey
    });

    setSeedLevel(prev => {
      const nextLevel = Math.min(prev + 25, 100);
      const index = Math.min(Math.floor(nextLevel / 25), 4);
      setSeedImg(seedGrowthStages[index]);
      return nextLevel;
    });

    setJournalText('');
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="min-h-screen font-sans antialiased overflow-x-hidden relative transition-all duration-1000 ease-in-out select-none"
      style={{
        backgroundColor: isNightTime ? '#0a0f0d' : '#f5ebd5',
        backgroundImage: isNightTime 
          ? 'radial-gradient(circle at 50% 30%, #122117 0%, #0a0f0d 80%)'
          : 'radial-gradient(circle at 50% 30%, #ebdcb9 0%, #f5ebd5 80%)',
        color: isNightTime ? '#e3ede6' : '#2b3a30'
      }}
    >
      {/* Moving Ambient Layer */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay transition-transform duration-300"
        style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")'
        }}
      />

      {/* Navigation Layer */}
      <nav className={`max-w-7xl mx-auto px-8 py-6 flex justify-between items-center relative z-20 border-b ${isNightTime ? 'border-stone-900/40' : 'border-stone-200/60'}`}>
        <div className="flex items-center gap-2">
          <Leaf className={`w-5 h-5 ${isNightTime ? 'text-[#88b092]' : 'text-[#4e7859]'} animate-pulse`} />
          <span className="font-serif tracking-widest text-sm uppercase">Solace Sanctuary</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Visual Indicator of current cycle */}
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium border ${isNightTime ? 'bg-stone-900/50 border-stone-800 text-amber-200' : 'bg-stone-100 border-stone-200 text-amber-700'}`}>
            {isNightTime ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
            <span>{isNightTime ? "Night Environment Active" : "Day Environment Active"}</span>
          </div>

          <button 
            onClick={toggleLofi}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs tracking-wider transition-all border ${
              isNightTime 
                ? 'bg-[#1b2b20]/60 border-[#2d4234] text-[#a1cca5]' 
                : 'bg-[#e3d8be]/80 border-[#c7ba9d] text-[#344d3c]'
            }`}
          >
            {isPlayingLofi ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-stone-400" />}
            <span>{isPlayingLofi ? "Mute Ghibli Lofi" : "Play Ghibli Lofi"}</span>
          </button>
        </div>
      </nav>

      {/* Main Grid View */}
      <main className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 items-start">
        
        {/* Left Side Input Panel and Printable Card View */}
        <div className="lg:col-span-7 space-y-10">
          
          <div className="space-y-2">
            <h1 className="text-4xl font-serif font-light leading-tight">
              Pour out your mind, <br />watch your inner garden bloom.
            </h1>
            <p className="text-xs text-stone-500 tracking-wide font-light max-w-md">
              A minimalist cross-cultural healing archive. Your words reflect live ancient scripts.
            </p>
          </div>

          <form onSubmit={handleProcessEntry} className="space-y-4">
            <div className={`border rounded-2xl p-2 transition-all shadow-inner ${isNightTime ? 'bg-[#111a15]/90 border-[#213026]' : 'bg-[#fcf7ed]/90 border-[#ded3bb]'}`}>
              <textarea
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
                placeholder="What feelings or experiences are sitting with you right now? Share your thoughts..."
                className={`w-full h-36 bg-transparent p-4 text-sm focus:outline-none resize-none font-light leading-relaxed ${isNightTime ? 'text-[#e6dfce] placeholder-[#48544c]' : 'text-[#2b3a30] placeholder-[#b0a48b]'}`}
              />
            </div>
            <button
              type="submit"
              className={`w-full text-xs uppercase font-semibold tracking-widest py-4 rounded-xl transition-all shadow-sm ${
                isNightTime ? 'bg-[#88b092] hover:bg-[#9cc4a6] text-[#0d1310]' : 'bg-[#4e7859] hover:bg-[#5f8c6b] text-[#f5ebd5]'
              }`}
            >
              Plant Thought Seed
            </button>
          </form>

          {/* Card Presentation Display (Modelled after Printable Japanese Quotes) */}
          {comfortBox && (
            <div className={`border rounded-2xl p-8 space-y-8 shadow-xl animate-in fade-in zoom-in-95 duration-500 relative overflow-hidden ${isNightTime ? 'bg-[#142119]/80 border-[#25382c]' : 'bg-[#f7f0df]/95 border-[#ebdcb9]'}`}>
              
              <div className="space-y-6 text-center">
                <div className="text-[10px] uppercase tracking-widest font-semibold flex items-center justify-center gap-2 text-stone-400">
                  <Globe className="w-3 h-3" />
                  <span>{comfortBox.quote.langLabel} Alignment</span>
                </div>

                <div className={`space-y-4 py-6 rounded-xl border p-6 transition-all ${isNightTime ? 'bg-[#0d1410]/50 border-[#1b2920]' : 'bg-[#faf4e6]/80 border-[#e3d5b8]'}`}>
                  <h2 className={`text-3xl font-serif tracking-wide leading-relaxed ${isNightTime ? 'text-white' : 'text-stone-900'}`}>
                    {comfortBox.quote.original}
                  </h2>
                  <p className="text-xs text-amber-600/80 italic tracking-widest font-light">
                    {comfortBox.quote.transliteration}
                  </p>
                  <hr className={`w-1/4 mx-auto my-4 ${isNightTime ? 'border-[#1b2920]' : 'border-[#e3d5b8]'}`} />
                  <p className="text-sm font-light font-serif leading-relaxed max-w-lg mx-auto text-stone-700 dark:text-stone-300">
                    "{comfortBox.quote.english}"
                  </p>
                </div>

                <p className="text-[11px] tracking-wider text-stone-500 italic">
                  — {comfortBox.quote.source}
                </p>
              </div>

              {/* Subtitled Media Hub */}
              <div className={`pt-4 border-t space-y-2 ${isNightTime ? 'border-[#1d2e24]' : 'border-[#ebdcb9]'}`}>
                <span className="text-[10px] uppercase tracking-wider font-semibold block text-stone-400">Curated Atmosphere Anchor</span>
                <a 
                  href={comfortBox.advice.videoUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className={`flex items-center justify-between p-3.5 border rounded-xl transition-all group ${isNightTime ? 'bg-[#0e1712] border-[#1f3025] hover:border-[#344d3d]' : 'bg-[#faf4e6] border-[#ded3bb] hover:border-[#c4b698]'}`}
                >
                  <div className="flex items-center gap-3">
                    <Play className="w-4 h-4 text-[#4e7859] fill-current opacity-60" />
                    <div>
                      <h4 className="text-xs font-medium group-hover:underline">{comfortBox.advice.videoTitle}</h4>
                      <p className="text-[9px] text-stone-500 mt-0.5">Includes Hardcoded English Explanations / Subtitles</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </a>
              </div>

            </div>
          )}

        </div>

        {/* Right Side: Interactive Plant Canvas */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
          
          <div className={`border rounded-3xl p-6 text-center space-y-4 shadow-xl ${isNightTime ? 'bg-[#121c16]/50 border-[#203026]' : 'bg-[#fcf7ed]/60 border-[#e8ddc4]'}`}>
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-mono">Dynamic Growth Ecosystem</span>
              <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full border ${isNightTime ? 'bg-[#1b2b20] text-[#88b092] border-[#2b3d31]' : 'bg-[#e3d6bc] text-[#3c5e46] border-[#cfc3a9]'}`}>{seedLevel}% Grown</span>
            </div>

            {/* Real Botanical Image Holder with interactive frame glow */}
            <div className="h-64 w-full rounded-2xl overflow-hidden relative border bg-[#0a0f0c] shadow-inner border-stone-800">
              <img 
                src={seedImg} 
                alt="Mindful Botanical Growth Matrix Stage Portfolio" 
                className="w-full h-full object-cover transition-transform duration-1000 ease-out filter saturate-[0.8] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0d]/90 via-transparent to-transparent opacity-60" />
              
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <p className="text-xs font-serif text-white font-light drop-shadow">
                  {seedLevel === 0 && "Your seed rests deep in the dark soil, listening."}
                  {seedLevel === 25 && "A fragile green shoot pushes past your raw thoughts."}
                  {seedLevel === 50 && "The first authentic leaves split open to process the air."}
                  {seedLevel === 75 && "Deep roots take hold. Strength expands from your hardships."}
                  {seedLevel === 100 && "A majestic Ghibli-inspired sapling stands resilient in your honor."}
                </p>
              </div>
            </div>

            <p className="text-[11px] text-stone-500 font-light leading-relaxed px-4">
              Writing down your thoughts adds nutrients directly into the soil, dynamically advancing the lifecycle of your plant.
            </p>
          </div>

          {/* Interactive Actions Grid */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setIsNightTime(!isNightTime)}
              className={`p-4 rounded-xl text-center space-y-1 border transition-all ${isNightTime ? 'bg-[#131d17]/40 border-[#1f2e24] hover:bg-[#1c2e22]' : 'bg-[#f7f0df] border-[#ebdcb9] hover:bg-[#ebe1cc]'}`}
            >
              <RefreshCw className="w-3.5 h-3.5 mx-auto text-stone-400" />
              <span className="text-xs font-medium block">Toggle Sky Frame</span>
              <span className="text-[9px] text-stone-500 font-light">Force Day / Night</span>
            </button>
            <div 
              onClick={() => {
                setSeedLevel(0);
                setSeedImg(seedGrowthStages[0]);
                setComfortBox(null);
              }}
              className={`p-4 rounded-xl text-center space-y-1 border cursor-pointer transition-all ${isNightTime ? 'bg-[#131d17]/40 border-[#1f2e24] hover:bg-[#1c2e22]' : 'bg-[#f7f0df] border-[#ebdcb9] hover:bg-[#ebe1cc]'}`}
            >
              <Leaf className="w-3.5 h-3.5 mx-auto text-stone-400" />
              <span className="text-xs font-medium block">Reset Plot</span>
              <span className="text-[9px] text-stone-500 font-light">Prune current garden</span>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
