import React, { useState, useEffect } from 'react';
import { DevilFruit, DevilFruitType } from '../types';
import { Sparkles, Trophy, HelpCircle, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface DevilFruitCardProps {
  fruit: DevilFruit;
  onClick?: () => void;
  key?: any;
}

export default function DevilFruitCard({ fruit, onClick }: DevilFruitCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [typewrittenText, setTypewrittenText] = useState('');

  // Slower incremental typewriter reveal for holding user when hovered
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isHovered) {
      let currentIdx = 0;
      const fullText = fruit.currentHolder;
      setTypewrittenText('');
      
      const interval = setInterval(() => {
        if (currentIdx < fullText.length) {
          const nextChar = fullText.charAt(currentIdx);
          setTypewrittenText((prev) => prev + nextChar);
          currentIdx++;
        } else {
          clearInterval(interval);
        }
      }, 40);

      return () => clearInterval(interval);
    } else {
      setTypewrittenText('');
    }
  }, [isHovered, fruit.currentHolder]);

  // Color mappings based on types
  const getTypeColor = (type: DevilFruitType) => {
    switch(type) {
      case 'Logia': return { text: 'text-sky-400', border: 'border-sky-500/40', bg: 'bg-sky-950/20', shadow: 'shadow-sky-500/30', aura: 'rgba(56, 189, 248, 0.25)' };
      case 'Paramecia': return { text: 'text-rose-450', border: 'border-rose-500/40', bg: 'bg-rose-950/20', shadow: 'shadow-rose-500/30', aura: 'rgba(244, 63, 94, 0.25)' };
      case 'Mythical Zoan': return { text: 'text-amber-400', border: 'border-amber-600/40', bg: 'bg-amber-950/20', shadow: 'shadow-amber-500/30', aura: 'rgba(245, 158, 11, 0.28)' };
      case 'Ancient Zoan': return { text: 'text-emerald-450', border: 'border-emerald-600/40', bg: 'bg-emerald-950/20', shadow: 'shadow-emerald-500/30', aura: 'rgba(16, 185, 129, 0.23)' };
      case 'Zoan': return { text: 'text-green-400', border: 'border-green-500/40', bg: 'bg-green-950/20', shadow: 'shadow-green-500/30', aura: 'rgba(34, 197, 94, 0.22)' };
    }
  };

  const styleMapping = getTypeColor(fruit.type);

  // SVG customized vector representations depending on presets
  const renderFruitIcon = () => {
    const strokeColor = fruit.color;

    switch(fruit.svgPreset) {
      case 'sun_god':
        return (
          <svg className="w-24 h-24 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" viewBox="0 0 100 100" fill="none">
            {/* Swirling Sun God Nika Gear Swirls */}
            <circle cx="50" cy="50" r="22" stroke={strokeColor} strokeWidth="3" strokeDasharray="4 2" className="animate-[spin_20s_linear_infinite]" />
            <path d="M50 15 C52 28, 48 28, 50 40 M50 40 C62 42, 60 38, 75 40 M50 40 C38 38, 40 42, 25 40 M50 40 C48 52, 52 52, 50 65" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="50" cy="40" r="6" fill="#fbbf24" opacity="0.8" className="animate-pulse" />
            <path d="M50 10 Q50 20 40 18 M50 12 L50 4" stroke="#eab308" strokeWidth="2" strokeLinecap="round" />
            {/* Swirling cloud aura */}
            <path d="M30 65 Q45 55 60 65 T90 65" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
          </svg>
        );
      case 'fire_swirl':
        return (
          <svg className="w-24 h-24 drop-shadow-[0_0_15px_rgba(249,115,22,0.6)]" viewBox="0 0 100 100" fill="none">
            {/* Meramera no mi multi teardrop swirl */}
            <path d="M50 68 C70 68, 75 50, 70 38 C60 28, 40 28, 30 38 C25 50, 30 68, 50 68 Z" fill="none" stroke={strokeColor} strokeWidth="3.5" />
            <path d="M42 66 Q48 52 52 40 M58 64 Q50 56 46 45" stroke="#ff781e" strokeWidth="2" strokeLinecap="round" />
            <path d="M48 28 C45 20, 52 14, 50 8 C48 12, 53 10, 52 4" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" /> {/* green curly stem */}
            {/* Fire flame swirls */}
            <path d="M32 45 A 8 8 0 0 1 45 42" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
            <path d="M68 45 A 8 8 0 0 0 55 42" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'vortex_void':
        return (
          <svg className="w-24 h-24 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" viewBox="0 0 100 100" fill="none">
            {/* Swirling black hole purple ripples */}
            <circle cx="50" cy="50" r="25" stroke={strokeColor} strokeWidth="4" className="animate-[spin_8s_linear_infinite]" />
            <path d="M50 25 A 25 25 0 0 1 75 50 A 25 25 0 0 1 50 75 A 25 25 0 0 1 25 50 Z" stroke="#a855f7" strokeWidth="2" strokeDasharray="6 4" />
            <circle cx="50" cy="50" r="8" fill="#1e1b4b" stroke={strokeColor} strokeWidth="2" />
            {/* Twisted dark stem */}
            <path d="M50 25 Q52 18 42 15 T50 5" stroke="#4c1d95" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        );
      case 'room_dome':
        return (
          <svg className="w-24 h-24 drop-shadow-[0_0_15px_rgba(20,184,166,0.6)]" viewBox="0 0 100 100" fill="none">
            {/* Heart shape with heart swirls */}
            <path d="M50 75 C45 75, 25 55, 25 38 C25 25, 40 22, 50 32 C60 22, 75 25, 75 38 C75 55, 55 75, 50 75 Z" fill="none" stroke={strokeColor} strokeWidth="4" />
            <circle cx="50" cy="38" r="4" stroke={strokeColor} strokeWidth="2" />
            <path d="M50 29 L50 20 Q54 15 48 10" stroke="#0f766e" strokeWidth="3.5" strokeLinecap="round" />
            {/* Surgical ROOM dome indicator axis */}
            <circle cx="50" cy="50" r="32" stroke="#2dd4bf" strokeWidth="1" strokeDasharray="3 6" opacity="0.6" className="animate-pulse" />
          </svg>
        );
      case 'dragon_curl':
        return (
          <svg className="w-24 h-24 drop-shadow-[0_0_15px_rgba(2,132,199,0.5)]" viewBox="0 0 100 100" fill="none">
            {/* Scaly segmented mythical dragon fruit fruit */}
            <rect x="35" y="32" width="30" height="42" rx="15" stroke={strokeColor} strokeWidth="3" />
            <path d="M35 42 Q50 39 65 42 M35 54 Q50 51 65 54 M35 66 Q50 63 65 66" stroke={strokeColor} strokeWidth="2" />
            {/* Scaly spikes */}
            <path d="M32 38 L25 36 M68 38 L75 36 M32 50 L24 48 M68 50 L76 48 M32 62 L25 60 M68 62 L75 60" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
            {/* Antler shaped horn stem */}
            <path d="M50 32 Q52 20 40 18 M50 28 Q48 16 60 14" stroke="#15803d" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );
      case 'quake_vibrations':
        return (
          <svg className="w-24 h-24 drop-shadow-[0_0_15px_rgba(226,232,240,0.4)]" viewBox="0 0 100 100" fill="none">
            {/* Round white pear shape with cracking shockwave fractals */}
            <circle cx="50" cy="55" r="23" stroke={strokeColor} strokeWidth="3" />
            <path d="M50 32 L50 45 M35 48 L44 51 M65 48 L56 51 M35 62 L44 59 M65 62 L56 59" stroke={strokeColor} strokeWidth="2" />
            {/* Seismic crack visual overlay */}
            <path d="M10 50 L25 45 L30 55 M90 50 L75 45 L70 55 M50 15 L50 2 L45 2" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );
      case 'petal_sprout':
        return (
          <svg className="w-24 h-24 drop-shadow-[0_0_15px_rgba(244,114,182,0.5)]" viewBox="0 0 100 100" fill="none">
            {/* Flower-shaped fruit with dynamic blooming pink petals layout */}
            <circle cx="50" cy="52" r="16" fill="none" stroke={strokeColor} strokeWidth="3" />
            {/* Blooming surrounding petal arcs */}
            <path d="M50 36 C55 25, 45 25, 50 36 Z M50 68 C55 79, 45 79, 50 68 Z M34 52 C23 57, 23 47, 34 52 Z M66 52 C77 57, 77 47, 66 52 Z" stroke={strokeColor} strokeWidth="2.5" />
            {/* Curly green seedling stem */}
            <path d="M50 36 Q42 25 50 12" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );
      case 'sand_storm':
        return (
          <svg className="w-24 h-24 drop-shadow-[0_0_15px_rgba(234,179,8,0.4)]" viewBox="0 0 100 100" fill="none">
            {/* Sandglass hourglass shape or dunes spiralling */}
            <path d="M30 30 L70 30 L55 50 L70 70 L30 70 L45 50 Z" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="50" cy="40" r="3" fill="#eab308" className="animate-pulse" />
            <circle cx="50" cy="60" r="4" fill="#eab308" />
            {/* Sandy spiral winds */}
            <path d="M50 15 Q65 14 62 8 T50 4" stroke="#854d0e" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        );
      case 'lightning_spark':
        return (
          <svg className="w-24 h-24 drop-shadow-[0_0_15px_rgba(96,165,250,0.6)]" viewBox="0 0 100 100" fill="none">
            {/* Spiky spherical orange lightning bolt fruit */}
            <circle cx="50" cy="50" r="20" stroke={strokeColor} strokeWidth="3.5" />
            {/* Lightning protrusions */}
            <path d="M50 30 L50 20 L42 24 L50 10 Z M50 70 L50 80 L58 76 L50 90 Z M30 50 L20 50 L24 42 L10 50 Z M70 50 L80 50 L76 58 L90 50 Z" fill={strokeColor} strokeWidth="1" />
            {/* Twisted curly stem */}
            <path d="M50 10 Q54 6 48 3" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );
      case 'puppet_strings':
        return (
          <svg className="w-24 h-24 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]" viewBox="0 0 100 100" fill="none">
            {/* Ball of string yarn with loose threads */}
            <circle cx="50" cy="53" r="22" stroke={strokeColor} strokeWidth="3" />
            {/* Crossing strings */}
            <path d="M28 53 L72 53 M50 31 L50 75 M34 37 L66 69 M34 69 L66 37" stroke={strokeColor} strokeWidth="2.5" />
            {/* Sharp vertical strings hanging */}
            <path d="M30 15 L30 5 M50 15 L50 4 Q55 2 50 1 M70 15 L70 5" stroke="#db2777" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );
      case 'ice_shard':
        return (
          <svg className="w-24 h-24 drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]" viewBox="0 0 100 100" fill="none">
            {/* Crystalline jagged block with hexagonal ice outlines */}
            <polygon points="50,25 72,38 72,64 50,77 28,64 28,38" stroke={strokeColor} strokeWidth="3.5" strokeLinejoin="round" />
            <line x1="50" y1="25" x2="50" y2="77" stroke={strokeColor} strokeWidth="2" />
            <line x1="28" y1="38" x2="72" y2="64" stroke={strokeColor} strokeWidth="1.5" />
            <line x1="28" y1="64" x2="72" y2="38" stroke={strokeColor} strokeWidth="1.5" />
            {/* Frozen icicle stem */}
            <path d="M50 25 Q52 14 45 10 T50 4" stroke="#0284c7" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        );
      case 'magma_dome':
        return (
          <svg className="w-24 h-24 drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]" viewBox="0 0 100 100" fill="none">
            {/* Mountain volcano bubbling dome */}
            <path d="M30 68 C30 68, 38 42, 50 42 C62 42, 70 68, 70 68 Z" stroke={strokeColor} strokeWidth="3.5" />
            {/* Bubbling oozes */}
            <circle cx="44" cy="55" r="4" fill="#ef4444" />
            <circle cx="56" cy="62" r="3" fill="#ef4444" />
            {/* Ash smoke stem */}
            <path d="M50 42 C48 30, 55 22, 50 14 C48 10, 52 8, 50 4" stroke="#b91c1c" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        );
      case 'light_glint':
        return (
          <svg className="w-24 h-24 drop-shadow-[0_0_15px_rgba(254,240,138,0.6)]" viewBox="0 0 100 100" fill="none">
            {/* Radiant cross-shaped solar light glint fruit */}
            <circle cx="50" cy="50" r="14" stroke={strokeColor} strokeWidth="3" />
            {/* Piercing multi-directional rays */}
            <line x1="50" y1="18" x2="50" y2="82" stroke={strokeColor} strokeWidth="4.5" strokeLinecap="round" />
            <line x1="18" y1="50" x2="82" y2="50" stroke={strokeColor} strokeWidth="4.5" strokeLinecap="round" />
            <line x1="28" y1="28" x2="72" y2="72" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="28" y1="72" x2="72" y2="28" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
            {/* Curving light stem */}
            <path d="M50 18 Q54 10 46 6" stroke="#ca8a04" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );
      default:
        return (
          <svg className="w-24 h-24 drop-shadow-[0_0_12px_rgba(236,72,153,0.4)]" viewBox="0 0 100 100" fill="none">
            {/* Standard generic elegant spiral melon shape */}
            <rect x="32" y="32" width="36" height="36" rx="18" stroke={strokeColor} strokeWidth="3.5" />
            <path d="M35 50 Q50 40 65 50 M40 40 T60 60" stroke={strokeColor} strokeWidth="2" strokeDasharray="3 3;" />
            <path d="M50 32 Q54 20 45 10" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );
    }
  };

  return (
    <motion.div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`group relative rounded-lg border p-6 cursor-pointer overflow-hidden backdrop-blur-md flex flex-col items-center select-none ${styleMapping.bg} ${styleMapping.border}`}
      whileHover={{
        y: -10,
        scale: 1.02,
        borderColor: 'rgba(57, 204, 204, 0.6)',
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
      style={{
        boxShadow: isHovered 
          ? `0 20px 40px -15px ${styleMapping.aura}, inset 0 0 25px 2px ${styleMapping.aura}` 
          : '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
    >
      {/* Decorative corners */}
      <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/10 group-hover:border-[#39CCCC]/40 transition-colors" />
      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/10 group-hover:border-[#39CCCC]/40 transition-colors" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/10 group-hover:border-[#39CCCC]/40 transition-colors" />
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/10 group-hover:border-[#39CCCC]/40 transition-colors" />

      {/* Floating Sparkle Elements */}
      <div className="absolute top-4 right-4 text-amber-500/30 group-hover:text-[#FFD700]/80 transition-colors duration-500">
        <Sparkles className="h-5 w-5 animate-pulse" />
      </div>

      {/* Levitative Icon Wrapper */}
      <motion.div 
        className="mb-4"
        animate={{
          y: isHovered ? -12 : 0,
          rotate: isHovered ? 5 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 18
        }}
      >
        {renderFruitIcon()}
      </motion.div>

      {/* Fruit Meta details */}
      <div className="text-center w-full">
        <span className={`inline-block text-xs uppercase font-sans px-2.5 py-1 rounded-full filter saturate-150 font-black bg-black/60 border ${styleMapping.border} ${styleMapping.text} mb-2`}>
          {fruit.type}
        </span>
        <h3 className="font-sans text-xl font-bold tracking-wide text-[#FFD700] leading-tight truncate group-hover:text-white transition-colors">
          {fruit.name}
        </h3>
        <p className="text-xs text-stone-400 font-sans italic mt-1 mb-3">
          {fruit.japaneseName}
        </p>
      </div>

      {/* Interactive Typewriter Reveal Details */}
      <div className="w-full mt-2 pt-2 border-t border-white/10 flex flex-col gap-1.5 text-left h-32 overflow-hidden relative font-sans">
        <div className="flex gap-1.5 items-center font-sans text-xs text-[#39CCCC] font-bold">
          <Trophy className="h-3.5 w-3.5 text-[#FFD700] flex-shrink-0" />
          <span className="uppercase tracking-wider">Known User:</span>
          <span className="text-emerald-450 font-black tracking-wide">
            {isHovered ? (
              <span className="after:content-['|'] after:inline-block after:animate-pulse">
                {typewrittenText}
              </span>
            ) : (
              <span>Hover to decipher</span>
            )}
          </span>
        </div>

        <p className="text-sm text-stone-350 leading-relaxed line-clamp-4">
          {fruit.abilitiesDescription}
        </p>

        {/* Awakening detail badge floating */}
        <div className="absolute bottom-0 right-0 flex gap-1 items-center font-sans text-[10px] bg-black/40 px-2 py-0.5 rounded border border-stone-800/65 font-bold">
          <Activity className="h-3 w-3 text-amber-500" />
          <span className="text-stone-400 uppercase">State:</span>
          <span className={`font-black ${fruit.awakeningStatus === 'Awakened' ? 'text-[#FFD700]' : 'text-stone-500'}`}>
            {fruit.awakeningStatus}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
