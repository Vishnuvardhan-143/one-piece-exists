import React, { useState } from 'react';
import { Character } from '../types';
import { Shield, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface WantedPosterProps {
  character: Character;
  onClick?: () => void;
  compact?: boolean;
  key?: any;
}

export default function WantedPoster({ character, onClick, compact = false }: WantedPosterProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Helper to format bounty safely
  const formattedBounty = character.bounty;

  if (compact) {
    return (
      <motion.div 
        className="group relative cursor-pointer overflow-hidden rounded-xl liquid-glass-strong bg-[#0A1929]/50 p-3 flex items-center gap-3 shadow-lg"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{
          y: -4,
          borderColor: 'rgba(57, 204, 204, 0.6)',
          boxShadow: '0 15px 30px rgba(57, 204, 204, 0.15)'
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25
        }}
      >
        <div className="relative h-14 w-12 flex-shrink-0 bg-[#001F3F] overflow-hidden rounded border border-white/10">
          <img 
            src={character.image} 
            alt={character.name} 
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
            style={{ objectPosition: character.imageAlign || 'center' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-sans text-lg font-bold tracking-wide text-[#FFD700] truncate group-hover:text-white transition-colors">
            {character.name}
          </h4>
          <p className="text-sm text-stone-400 font-sans truncate">
            {character.epithet || "No epithet"}
          </p>
          <p className="text-base font-sans text-[#E60012] mt-0.5 font-bold">
            {formattedBounty}
          </p>
        </div>
        {/* Hover Sparkle Badge */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#39CCCC]">
          <Sparkles className="h-4 w-4 animate-pulse" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative cursor-pointer select-none"
      style={{
        perspective: '1000px',
      }}
      whileHover={{
        y: -10,
        rotateY: 8,
        rotateX: 5,
        scale: 1.04,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
    >
      {/* Wanted Poster Card Body */}
      <div 
        className="relative w-60 liquid-glass-strong rounded-2xl bg-[#2E1F17]/40 p-4 transition-all duration-500 font-sans overflow-hidden flex flex-col items-center select-none"
        style={{
          boxShadow: isHovered 
            ? '0 20px 40px -15px rgba(251, 191, 36, 0.25), inset 0 0 25px 2px rgba(251, 191, 36, 0.25)' 
            : '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none" />

        {/* Marine Top Insignia */}
        <div className="w-full flex justify-between items-center px-1 text-white/70 border-b border-white/20 pb-1.5 mb-3">
          <span className="text-xs tracking-wider font-sans font-bold uppercase transition-all duration-700 group-hover:tracking-widest">MARINE CODE DIRECTIVE</span>
          <Shield className="h-4 w-4 text-white/50" />
          <span className="text-xs tracking-wider font-sans font-bold uppercase">FILE #{character.id.substring(0, 4).toUpperCase()}</span>
        </div>

        {/* Poster Main Header */}
        <div className="text-center font-sans leading-none mt-1 mb-4">
          <h1 className="text-4xl font-black tracking-widest text-white select-none">
            WANTED
          </h1>
          <p className="text-sm tracking-[0.25em] font-extrabold text-stone-300 mt-2 uppercase pl-1 opacity-90">
            DEAD OR ALIVE
          </p>
        </div>

        {/* Wanted Image Container */}
        <div className="relative w-full h-44 bg-[#2B1D16] border-[5px] border-[#3E2E24] shadow-inner overflow-hidden flex items-center justify-center">
          {/* Background image tinted for manga effect */}
          <img 
            src={character.image} 
            alt={character.name} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-all duration-700 grayscale contrast-125 brightness-95 group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-100"
            style={{ objectPosition: character.imageAlign || 'center' }}
          />

          {/* Grungy shadows on image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />

          {/* Faction Badge overlay */}
          <div className="absolute bottom-2 right-2 bg-black/60 border border-white/20 px-2.5 py-1 rounded-sm text-xs tracking-wider text-stone-200 uppercase font-sans font-bold backdrop-blur-sm">
            {character.faction === "StrawHats" ? "Straw Hat" : 
             character.faction === "WorstGeneration" ? "Supernova" :
             character.faction === "SevenWarlords" ? "Shichibukai" :
             character.faction === "RevolutionaryArmy" ? "Rebel" :
             character.faction === "NavyAdmirals" ? "Marine" : "Yonko"}
          </div>
        </div>

        {/* Character Title and Name */}
        <div className="w-full text-center mt-3.5 pt-1 flex flex-col items-center">
          {/* Status Badge moved out of image to prevent face collision */}
          {character.status && character.status !== "Active" && character.status !== "Undercover" && (
            <div className="bg-red-900/90 text-white border border-red-500/50 px-2.5 py-0.5 mb-2 rounded-sm text-[10px] tracking-widest uppercase font-sans font-extrabold shadow-md">
              {character.status}
            </div>
          )}
          {character.epithet ? (
            <p className="text-sm font-bold text-stone-300 tracking-wide leading-none mb-1.5">
              &ldquo;{character.epithet}&rdquo;
            </p>
          ) : (
            <div className="h-4" />
          )}
          
          <h2 className="text-2xl font-black text-white tracking-wider font-sans uppercase truncate w-full px-1 border-b border-white/10 pb-1.5">
            {character.name}
          </h2>
        </div>

        {/* Stamp / Bounty Section */}
        <div className="w-full flex flex-col items-center mt-3 bg-black/20 py-2 px-3 rounded-sm border border-white/10 relative">
          
          {/* Crimson Ink Stamp Effect on Hover */}
          <div 
            className="absolute right-2 -top-1 pointer-events-none select-none transition-all duration-500 scale-75 opacity-20 group-hover:scale-100 group-hover:opacity-100 rotate-12"
            style={{
              color: '#EF4444',
              fontFamily: 'sans-serif',
              fontWeight: '900',
              border: '3px double #EF4444',
              padding: '1px 6px',
              borderRadius: '4px',
              textShadow: 'rgba(239,68,68,0.2) 1px 1px',
            }}
          >
            CONFIRMED
          </div>

          <p className="text-xs uppercase tracking-wider text-stone-400 font-extrabold">
            ESTIMATED BOUNTY VALUE
          </p>
          
          <p className="text-xl font-black text-red-500 font-sans tracking-wider mt-1 select-none">
            ฿ {formattedBounty}
          </p>
        </div>

        {/* Footnote stamp */}
        <div className="text-xs text-stone-500 tracking-wide mt-4 text-center leading-normal opacity-75 font-semibold uppercase">
          World Government Marine HQ Archive Division.<br/>
          Unauthorized harboring remains subject to absolute execution.
        </div>

        {/* Wanted Stamp Overlay rotating on hover */}
        <div 
          className="absolute -bottom-8 -right-8 w-24 h-24 pointer-events-none rounded-full border-4 border-dashed border-red-750 opacity-0 group-hover:opacity-10 transition-all duration-700 flex items-center justify-center rotate-45 transform group-hover:rotate-12 scale-50 group-hover:scale-110"
          style={{
            borderColor: '#991B1B',
          }}
        >
          <span className="text-red-800 text-xs font-bold tracking-widest">DEAD/ALIVE</span>
        </div>
      </div>
    </motion.div>
  );
}
