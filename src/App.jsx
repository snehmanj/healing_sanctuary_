import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, BookOpen, Heart, Wind, History, Play, AlertCircle, 
  Flower2, Compass, Moon, ChevronRight, Volume2, VolumeX, Eye
} from 'lucide-react';

// =========================================================================
// 1. THE INFINITE HUMAN SPECTRUM MATRIX (Timeless Wisdom & Scripture)
// =========================================================================
const SPECTRUM_WISDOM_POOL = {
  fiery_unrest: [
    {
      text: "From anger arises complete delusion, from delusion comes loss of memory, and from loss of memory, the intellect is destroyed. When the intellect is destroyed, a person falls. Do not let the actions of others burn down your internal palace.",
      source: "The Bhagavad Gita (2.63)",
      type: "Sacred Scripture"
    },
    {
      text: "He who restrains his rising anger like a crashing chariot, him I call a true driver; others are merely holding the reins. Transform that blazing heat into clear boundaries rather than a destructive stone.",
      source: "The Dhammapada (Verse 222)",
      type: "Sacred Scripture"
    }
  ],
  heavy_spirit: [
    {
      text: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Let go of the heavy fear of failure, release the burden of past attachment, and remain anchored in the eternal now.",
      source: "The Bhagavad Gita (2.47)",
      type: "Sacred Scripture"
    },
    {
      text: "Just as a solid rock is not shaken by the storm, even so the wise are not affected by temporary sorrow, loss, or worldly praise. Pain is simply an element passing through your vast consciousness.",
      source: "The Dhammapada",
      type: "Sacred Scripture"
    }
  ],
  chaotic_mind: [
    {
      text: "The mind is restless, turbulent, obstinate, and very strong, O Krishna. It seems to me more difficult to control than the wind. Yet, it can be brought to calm stillness through constant practice and detached observation.",
      source: "The Bhagavad Gita (6.34)",
      type: "Sacred Scripture"
    },
    {
      text: "Let come what comes, let go what goes. See what remains. The cosmic universe functions perfectly without your frantic control, so why do you insist on trying to hold the weight of tomorrow today?",
      source: "Ashtavakra Gita",
      type: "Sacred Scripture"
    }
  ],
  depleted_shell: [
    {
      text: "Know that your inner soul is inherently untarnished, boundless, and entirely free from exhaustion. External fatigue belongs only to the physical vessel; retreat inward to your infinite home of unshakeable peace.",
      source: "Jain Agama Wisdom",
      type: "Sacred Scripture"
    },
    {
      text: "The soul that yields to the straying senses carries away the human intellect, just as a gale carries away a ship upon the waters. Close the external windows, draw back your energy, and simply rest.",
      source: "The Bhagavad Gita (2.67)",
      type: "Sacred Scripture"
    }
  ],
  existential_seeking: [
    {
      text: "You yourself, as much as anybody in the entire universe, deserve your own unconditioned love, patience, and deep affection. Do not force yourself onto paths meant for others; trust your cosmic blueprint.",
      source: "Maha-Parinibbana Sutta",
      type: "Sacred Scripture"
    },
    {
      text: "One should lift oneself by one's own efforts and not degrade oneself. For the mind can be the truest friend of the soul, but it can also be its own greatest enemy. Your current confusion is the soil of your awakening.",
      source: "The Bhagavad Gita (6.5)",
      type: "Sacred Scripture"
    }
  ]
};

// =========================================================================
// 2. THE CONTEXT-AWARE MEDIA LAUNCHPAD (Life Coaches, Speakers & Gita)
// =========================================================================
const SPECTRUM_MEDIA_ENGINE = {
  fiery_unrest: [
    {
      message: "I feel the intense, burning friction inside your log. Whether it's sharp rage, blinding jealousy, a sense of deep injustice, or betrayal by friends or family, let's use this passionate fuel to build an unshakeable inner boundary instead of letting it scorch your own mental peace.",
      videoTitle: "Bhagavad Gita on Anger: Controlling the Uncontrollable Mind",
      videoUrl: "https://www.youtube.com/watch?v=AsgUonw2uBc"
    },
    {
      message: "The fiery energy is looping on your timeline. Because this heat can distort clear thinking, let's shift away from psychological strategy and listen to a master life coach explain how to natively process betrayal and let go of toxic resentment.",
      videoTitle: "How to Handle Intense Anger & Betrayal Natively - Spiritual Wisdom",
      videoUrl: "https://www.youtube.com/watch?v=13YVov8_fbg"
    }
  ],
  heavy_spirit: [
    {
      message: "Your spirit is processing a heavy, low-frequency weight right now—perhaps heartbreak, a terrifying fear of failure, grief, childhood nostalgia, or deep loneliness. Do not force yourself to fake a smile. Let's look at this sorrow through an ancient lens that treats trials as sacred evolutionary soil.",
      videoTitle: "Beautiful Bhagavad Gita Lessons for Moving Past Sadness & Grief",
      videoUrl: "https://www.youtube.com/watch?v=2bE6sCl_6w8"
    },
    {
      message: "Because this heavy veil has returned to your timeline, we are bypassing passive philosophy. Let's look at actionable psychology from elite speakers to help you re-frame self-doubt, overcome failure, and step back into your power.",
      videoTitle: "The Philosophy of Healing a Broken Heart & Rebuilding From Failure",
      videoUrl: "https://www.youtube.com/watch?v=78m7_1WfP7Y"
    }
  ],
  chaotic_mind: [
    {
      message: "Your mind is currently operating in a scattered, high-vibration state of anxiety, pressure, panic, or fear of the future. You are trying to solve puzzles that don't even exist yet. Let's practice lowering your cortisol by detaching from the outcome.",
      videoTitle: "How to Keep Calm Under Intense Pressure - Mindset Coaching",
      videoUrl: "https://www.youtube.com/watch?v=nwyT5q8RMq8"
    },
    {
      message: "Since the chaotic mental cycles are persisting, let's switch to an emergency somatic physical anchor. This box-breathing audio guide will forcefully calm your overactive nervous system right now.",
      videoTitle: "10-Minute Box Breathing for Immediate Cortisol & Anxiety Relief",
      videoUrl: "https://www.youtube.com/watch?v=F2hc2FLOdhI"
    }
  ],
  depleted_shell: [
    {
      message: "You are experiencing total energy depletion—burnout, apathy, deep emotional exhaustion, or feeling completely unmotivated by life. This isn't laziness; your battery is at zero. You have given too much of your light away to toxic environments or one-sided relationships.",
      videoTitle: "Motivational Speech: Rest, Reset, But Don't You Dare Quit",
      videoUrl: "https://www.youtube.com/watch?v=jfKfPfyJRdk"
    },
    {
      message: "A pattern of deep exhaustion means your protective emotional walls are leaking energy. It's time to forcefully shut out the noise. Lean back, close your eyes, and let this ambient rest frequency regulate your body.",
      videoTitle: "Deeply Calming Rest Soundscape (Nervous System Reset)",
      videoUrl: "https://www.youtube.com/watch?v=q76bN0Gy6zo"
    }
  ],
  existential_seeking: [
    {
      message: "You are expressing a highly nuanced state—existential dread, feeling lost, imposter syndrome, numbness, or general confusion about your life's destiny. This is a magnificent sign. It means you are outgrowing your old self. Let's look at how to navigate the wilderness of self-discovery.",
      videoTitle: "Conquering Insecurity & Finding Your True Path - Powerful Motivational Talk",
      videoUrl: "https://www.youtube.com/watch?v=5rT8XorYhjw"
    },
    {
      message: "Your seeking energy is evolving. To ground your transition, let's dive into an ancient scriptural blueprint designed specifically for when a warrior feels entirely directionless and wants to lay down their armor.",
      videoTitle: "Timeless Scripture Wisdom on Managing Overwhelming Life Transitions",
      videoUrl: "https://www.youtube.com/watch?v=WZzby7S7S7w"
    }
  ]
};

export default function InfiniteSanctuary() {
  const [journalText, setJournalText] = useState('');
  const [history, setHistory] = useState([]);
  const [comfortBox, setComfortBox] = useState(null);
  const [isOracleFlipped, setIsOracleFlipped] = useState(false);
  const [oracleQuote, setOracleQuote] = useState(null);
  const [isBreathingModal, setIsBreathingModal] = useState(false);
  const [breathingText, setBreathingText] = useState('Inhale');
  const [gardenProgress, setGardenProgress] = useState(0);
  const [timeGreeting, setTimeGreeting] = useState('Welcome, gentle soul');
  const [isPlayingBgMusic, setIsPlayingBgMusic] = useState(false);

  const bgAudioRef = useRef(null);
  const breathingAudioRef = useRef(null);
  const breathingIntervalRef = useRef(null);

  useEffect(() => {
    const savedLogs = localStorage.getItem('infinite_sanctuary_history_v4');
    if (savedLogs) {
      const parsed = JSON.parse(savedLogs);
      setHistory(parsed);
      setGardenProgress(Math.min(parsed.length * 10, 100));
    }

    const hour = new Date().getHours();
    if (hour < 12) setTimeGreeting("Good morning, gentle soul");
    else if (hour < 18) setTimeGreeting("Good afternoon, bright spirit");
    else setTimeGreeting("Rest your mind tonight");

    bgAudioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-84.wav'); 
    bgAudioRef.current.loop = true;
    bgAudioRef.current.volume = 0.12;

    breathingAudioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2433/2433-84.wav'); 
    breathingAudioRef.current.volume = 0.25;

    pickRandomOracleQuote();

    return () => {
      if (bgAudioRef.current) bgAudioRef.current.pause();
      if (breathingIntervalRef.current) clearInterval(breathingIntervalRef.current);
    };
  }, []);

  const toggleBackgroundMusic = () => {
    if (isPlayingBgMusic) {
      bgAudioRef.current.pause();
    } else {
      bgAudioRef.current.play().catch(err => console.log("Audio deferred due to safety restrictions"));
    }
    setIsPlayingBgMusic(!isPlayingBgMusic);
  };

  const pickRandomOracleQuote = () => {
    const Spectrums = Object.keys(SPECTRUM_WISDOM_POOL);
    const randomSpectrum = Spectrums[Math.floor(Math.random() * Spectrums.length)];
    const randomVersion = Math.floor(Math.random() * 2);
    setOracleQuote(SPECTRUM_WISDOM_POOL[randomSpectrum][randomVersion]);
  };

  useEffect(() => {
    if (isBreathingModal) {
      setBreathingText('Inhale');
      breathingIntervalRef.current = setInterval(() => {
        setBreathingText(prev => {
          const nextState = prev === 'Inhale' ? 'Exhale' : 'Inhale';
          if (breathingAudioRef.current) {
            breathingAudioRef.current.currentTime = 0;
            breathingAudioRef.current.play().catch(() => {});
          }
          return nextState;
        });
      }, 4000);
    } else {
      if (breathingIntervalRef.current) clearInterval(breathingIntervalRef.current);
    }
  }, [isBreathingModal]);

  // =========================================================================
  // 3. CONTEXTUAL ENERGY SPECTRUM CLASSIFIER LOGIC (Unrestricted)
  // =========================================================================
  const processInfiniteSpectrum = (text) => {
    const lower = text.toLowerCase();

    const containsAny = (target, phrases) => phrases.some(phrase => target.includes(phrase));

    // Spectrum 1: Fiery Unrest
    if (containsAny(lower, ['rage', 'furious', 'hate', 'hatred', 'jealous', 'envy', 'envious', 'unfair', 'betray', 'betrayal', 'bitter', 'revenge', 'spite', 'mad', 'angry', 'screaming', 'drama', 'fake friends'])) {
      return 'fiery_unrest';
    }

    // Spectrum 2: Heavy Spirit
    if (containsAny(lower, ['fail', 'failure', 'losing', 'lost', 'hurt', 'cry', 'crying', 'sad', 'sorrow', 'grief', 'heartbreak', 'broken', 'lonely', 'loneliness', 'empty', 'numb', 'numbness', 'nostalgia', 'miss them', 'past', 'hollow'])) {
      return 'heavy_spirit';
    }

    // Spectrum 3: Chaotic Mind
    if (containsAny(lower, ['worry', 'worrying', 'panic', 'scared', 'afraid', 'fear', 'anxious', 'anxiety', 'stress', 'stressed', 'pressure', 'overwhelmed', 'chaos', 'frantic', 'future', 'looping', 'cannot sleep', 'tightness'])) {
      return 'chaotic_mind';
    }

    // Spectrum 4: Depleted Shell
    if (containsAny(lower, ['tired', 'exhausted', 'burnout', 'drained', 'fatigue', 'weary', 'giving up', 'cannot do this', 'done with', 'sleepy', 'heavy eyes', 'apathy', 'unmotivated'])) {
      return 'depleted_shell';
    }

    // Spectrum 5: Existential Seeking
    return 'existential_seeking';
  };

  const handleSaveEntry = (e) => {
    e.preventDefault();
    if (!journalText.trim()) return;

    const detectedSpectrum = processInfiniteSpectrum(journalText);

    const timesFeltThisSpectrum = history.filter(item => item.spectrum === detectedSpectrum).length;
    const alternatingIndex = timesFeltThisSpectrum % 2; 

    const assignedQuote = SPECTRUM_WISDOM_POOL[detectedSpectrum][alternatingIndex];
    const assignedAdvice = SPECTRUM_MEDIA_ENGINE[detectedSpectrum][alternatingIndex];

    const displayLabels = {
      fiery_unrest: { label: "Fiery Unrest Spectrum", emoji: "🌋" },
      heavy_spirit: { label: "Heavy Spirit Spectrum", emoji: "🌊" },
      chaotic_mind: { label: "Chaotic Mind Spectrum", emoji: "🌀" },
      depleted_shell: { label: "Depleted Shell Spectrum", emoji: "⏳" },
      existential_seeking: { label: "Existential Seeking Spectrum", emoji: "✨" }
    };

    const currentConfig = displayLabels[detectedSpectrum];

    const newLog = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      text: journalText,
      spectrumEmoji: currentConfig.emoji,
      spectrumLabel: currentConfig.label,
      spectrum: detectedSpectrum,
      isRecurrent: timesFeltThisSpectrum > 0
    };

    const updatedHistory = [newLog, ...history];
    setHistory(updatedHistory);
    localStorage.setItem('infinite_sanctuary_history_v4', JSON.stringify(updatedHistory));

    setComfortBox({
      spectrum: detectedSpectrum,
      isRecurrent: timesFeltThisSpectrum > 0,
      quote: assignedQuote,
      advice: assignedAdvice,
      meta: currentConfig
    });

    setGardenProgress(prev => Math.min(prev + 10, 100));
    setJournalText('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500/30 overflow-x-hidden relative">
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-indigo-950/20 via-purple-950/5 to-transparent pointer-events-none" />

      {/* Navigation Layout Control Panel */}
      <nav className="border-b border-slate-900 bg-slate-950/80 backdrop-blur sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-amber-400" />
          <span className="font-serif text-lg tracking-wide bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
            Sister's Cosmic Sanctuary
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={toggleBackgroundMusic}
            className={`p-2 rounded-full border transition-all ${
              isPlayingBgMusic 
                ? 'bg-amber-400/10 border-amber-400/40 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.1)]' 
                : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
            title="Toggle Environmental Ambient Audio"
          >
            {isPlayingBgMusic ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button 
            onClick={() => setIsBreathingModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-teal-600/30 to-emerald-600/30 hover:from-teal-600/50 hover:to-emerald-600/50 border border-emerald-500/30 px-4 py-2 rounded-full text-emerald-300 text-xs font-medium transition-all shadow-lg"
          >
            <Wind className="w-3.5 h-3.5 animate-spin duration-[7000ms]" />
            <span>Breathe with the Universe</span>
          </button>
        </div>
      </nav>

      {/* Main Container Work Area Grid */}
      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side Content & Parsing Interface */}
        <div className="lg:col-span-2 space-y-8">
          
          <header className="bg-slate-900/30 border border-slate-900/80 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-4 right-4 text-slate-900/50"><Moon className="w-16 h-16" /></div>
            <h1 className="font-serif text-2xl text-amber-100/90 mb-1">{timeGreeting}</h1>
            <p className="text-xs text-slate-400 leading-relaxed">Your sanctuary is fully unlocked and context-free. Type absolutely any aspect of life—existential dread, blinding rage, fear of failure, family battles, or numb melancholy. The engine will evaluate the energy current automatically.</p>
          </header>

          {/* Core Unrestricted Interactive Terminal */}
          <section className="bg-slate-900/60 border border-slate-900/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm relative">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-400" />
              Pour your entire consciousness out without limits:
            </h2>

            <form onSubmit={handleSaveEntry} className="space-y-4">
              <textarea
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
                placeholder="Talk to me about anything... share your failures, your toxic relationships, your hidden jealousy, your blinding rage, or the quiet confusion of not knowing who you are anymore. There are no restrictions..."
                className="w-full h-44 bg-slate-950/80 border border-slate-900 rounded-xl p-4 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-purple-500/50 resize-none transition-all text-sm leading-relaxed"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Eye className="w-3.5 h-3.5 text-teal-500" />
                  <span>Infinite Emotional Scanner Active</span>
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-medium px-6 py-2.5 rounded-xl transition-all shadow-lg text-xs flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Transmit to Sanctuary
                </button>
              </div>
            </form>
          </section>

          {/* DYNAMIC UNRESTRICTED COMFORT DISPATCH CARD OVERLAY */}
          {comfortBox && (
            <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-purple-950/20 border border-purple-900/30 rounded-2xl p-6 space-y-6 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
              
              {/* Dynamic Emotional Energy Status Module */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-900">
                <div className="flex items-center gap-2">
                  <span className="text-2xl filter drop-shadow">{comfortBox.meta.emoji}</span>
                  <div>
                    <h3 className="text-xs font-bold text-slate-200 tracking-wide uppercase">{comfortBox.meta.label}</h3>
                    <p className="text-[10px] text-slate-500">Classification of your raw human frequency</p>
                  </div>
                </div>
                {comfortBox.isRecurrent && (
                  <span className="text-[9px] bg-purple-950/60 text-purple-300 border border-purple-900/40 px-2 py-0.5 rounded-full font-medium tracking-wide">
                    🔄 Evolving Multi-Layer Loop Engaged
                  </span>
                )}
              </div>

              {/* Scriptural Text Reflection Node */}
              <div className="bg-slate-950/40 border-l-2 border-amber-400 rounded-r-xl p-4 space-y-2">
                <p className="italic font-serif text-slate-200 text-sm leading-relaxed">
                  "{comfortBox.quote.text}"
                </p>
                <div className="flex items-center gap-2 text-[10px] tracking-widest font-semibold text-amber-400 uppercase">
                  <span>— {comfortBox.quote.source}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400 lowercase italic">({comfortBox.quote.type})</span>
                </div>
              </div>

              {/* Intuitive Coaching Dialogue */}
              <div className="space-y-1">
                <h3 className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Sanctuary Evaluation</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{comfortBox.advice.message}</p>
              </div>

              {/* Custom Integrated Video Asset Node */}
              <div className="space-y-2">
                <h3 className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Curated Coaching & Scripture Video</h3>
                <a 
                  href={comfortBox.advice.videoUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 bg-slate-950/80 border border-slate-900 hover:border-amber-500/20 rounded-xl group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-600/10 rounded-lg flex items-center justify-center text-red-400 group-hover:bg-red-600/20 transition-all">
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-slate-200 group-hover:text-amber-300 transition-all">{comfortBox.advice.videoTitle}</h4>
                      <p className="text-[11px] text-slate-500">Video lecture mapping specific coaching strategies directly to your current dilemma</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transform group-hover:translate-x-1 transition-all" />
                </a>
              </div>
            </section>
          )}

        </div>

        {/* Right Metric Tracking Side Dashboard Column */}
        <div className="space-y-8">
          
          <section className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 flex flex-col items-center text-center">
            <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-4 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              The Cosmic Oracle
            </h3>
            
            <div 
              onClick={() => setIsOracleFlipped(!isOracleFlipped)}
              className="w-full h-56 cursor-pointer preserve-3d perspective-1000 group relative"
            >
              <div className={`w-full h-full duration-500 transition-all transform preserve-3d ${isOracleFlipped ? 'rotate-y-180' : ''}`}>
                
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-indigo-950 border border-slate-800 rounded-xl flex flex-col items-center justify-center p-4 backface-hidden shadow-xl">
                  <div className="w-10 h-10 rounded-full bg-amber-400/5 flex items-center justify-center border border-amber-400/20 mb-3 group-hover:scale-110 transition-all">
                    <Moon className="w-5 h-5 text-amber-400" />
                  </div>
                  <p className="text-xs font-serif text-amber-200/80">Tap to draw daily cosmic alignment advice</p>
                </div>

                <div className="absolute inset-0 bg-slate-900 border border-slate-800 rounded-xl flex flex-col items-center justify-center p-4 rotate-y-180 backface-hidden shadow-2xl overflow-y-auto">
                  {oracleQuote && (
                    <div className="space-y-2">
                      <p className="text-xs font-serif italic text-slate-300 leading-relaxed">
                        "{oracleQuote.text}"
                      </p>
                      <p className="text-[9px] text-amber-400 uppercase tracking-widest font-semibold">
                        — {oracleQuote.source}
                      </p>
                    </div>
                  )}
                </div>

              </div>
            </div>
            <p className="text-[10px] text-slate-600 mt-3">Click the card to flip and reveal messages.</p>
          </section>

          <section className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
              <Flower2 className="w-3.5 h-3.5 text-emerald-400" />
              Your Sanctuary Garden
            </h3>
            <div className="flex items-center gap-4 bg-slate-950/40 rounded-xl p-4 border border-slate-900">
              <div className="w-10 h-10 bg-emerald-500/5 rounded-full border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Flower2 className={`w-5 h-5 transition-transform duration-700 ${gardenProgress > 40 ? 'scale-125 rotate-6 text-emerald-300' : 'scale-100 text-emerald-500'}`} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[11px] font-medium text-slate-300">Soul Growth Level</span>
                  <span className="text-[11px] text-slate-500">{gardenProgress}%</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-500" style={{ width: `${gardenProgress}%` }} />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-purple-400" />
              Journey Timeline Registry
            </h3>
            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {history.length === 0 ? (
                <p className="text-xs text-slate-600 italic text-center py-4">Her human footprint will automatically append here...</p>
              ) : (
                history.map((log) => (
                  <div key={log.id} className="bg-slate-950/60 border border-slate-900 rounded-xl p-3 text-xs space-y-1 transition-all hover:border-slate-800">
                    <div className="flex justify-between items-center text-[10px] text-slate-500">
                      <span>{log.date}</span>
                      <span className="text-sm font-bold bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800" title={log.spectrumLabel}>
                        {log.spectrumEmoji} {log.spectrumLabel.split(" ")[0]}
                      </span>
                    </div>
                    <p className="text-slate-300 line-clamp-2 leading-relaxed text-[11px]">"{log.text}"</p>
                  </div>
                ))
              )}
            </div>
          </section>

        </div>
      </main>

      {/* SYNCHRONIZED AUDIO RESPIRATION OVERLAY MODAL */}
      {isBreathingModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="max-w-md w-full text-center space-y-8">
            <div className="space-y-1.5">
              <h2 className="font-serif text-xl text-slate-100">Breathe with the Cosmos</h2>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">Follow the automated rhythmic pulse expansion. A calming wave chime will match each inhalation and exhalation.</p>
            </div>

            <div className="h-64 flex items-center justify-center">
              <div 
                className={`rounded-full bg-gradient-to-tr from-teal-500/20 via-purple-500/10 to-amber-500/15 border border-slate-800 flex items-center justify-center transition-all duration-[4000ms] ease-in-out ${
                  breathingText === 'Inhale' ? 'w-56 h-56 shadow-2xl shadow-teal-500/10 scale-105' : 'w-36 h-36 scale-95 shadow-none'
                }`}
              >
                <span className="text-xs tracking-widest text-slate-200 font-semibold uppercase animate-pulse">
                  {breathingText}
                </span>
              </div>
            </div>

            <button 
              onClick={() => setIsBreathingModal(false)}
              className="bg-slate-950 hover:bg-slate-900 border border-slate-900 text-slate-400 text-[11px] font-medium px-5 py-2 rounded-full transition-all"
            >
              Return to Sanctuary
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
