import React, { useState } from 'react';
import { Island, Character, DevilFruit } from '../types';
import WantedPoster from './WantedPoster';
import DevilFruitCard from './DevilFruitCard';
import { ChevronLeft, ChevronRight, ShieldCheck, Swords, Anchor, MapPin } from 'lucide-react';

interface IslandDetailViewProps {
  island: Island;
  allCharacters: Character[];
  allFruits: DevilFruit[];
  onPrevIsland: () => void;
  onNextIsland: () => void;
  onCharacterSelect?: (character: Character) => void;
  onViewDossier?: () => void;
}

export default function IslandDetailView({
  island,
  allCharacters,
  allFruits,
  onPrevIsland,
  onNextIsland,
  onCharacterSelect,
  onViewDossier
}: IslandDetailViewProps) {
  const [hoveredFruit, setHoveredFruit] = useState<DevilFruit | null>(null);

  // Map the roster names to actual database character profiles
  const rosterCharacters = allCharacters.filter(c => 
    island.characterRoster.includes(c.name)
  );

  // Map the island's devil fruit names to actual fruit database objects
  const involvedFruits = allFruits.filter(f => 
    island.devilFruitsInvolved.includes(f.name)
  );

  return (
    <div className="w-full space-y-8 select-none font-sans">
      
      {/* Cinematic wide-angle header */}
      <div 
        onClick={onViewDossier}
        className="relative h-64 md:h-80 w-full overflow-hidden rounded-lg border border-white/10 shadow-2xl flex items-end cursor-pointer group"
      >
        
        {/* Underlay Image */}
        <div className="absolute inset-0">
          <img 
            src={island.headerImage} 
            alt={island.name} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-1000 scale-102 group-hover:scale-105"
          />
          {/* High-seas color tints conform to Sleek navy */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1929] via-[#0A1929]/50 to-transparent transition-opacity group-hover:opacity-90" />
          <div className="absolute inset-0 bg-blue-950/10 pointer-events-none mix-blend-color-burn" />
          
          {/* Magnifying Glass & Glow Badge on Hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 z-10">
            <div className="flex flex-col items-center gap-2 bg-[#001F3F]/95 border-2 border-[#FFD700] text-[#FFD700] px-4 py-2.5 rounded-lg shadow-2xl animate-pulse">
              <span className="text-xs font-sans font-bold tracking-widest flex items-center gap-2">
                🔍 OPEN FULL-SCREEN DOSSIER
              </span>
            </div>
          </div>
        </div>

        {/* Header Text Overlay */}
        <div className="relative z-15 p-6 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            {/* Breadcrumb / Category */}
            <div className="flex items-center gap-2.5 text-[#FFD700] font-sans text-sm tracking-wider uppercase mb-2 font-black">
              <MapPin className="h-4.5 w-4.5 text-[#FFD700]" />
              <span>GRAND LINE COORDINATES #{island.chronologicalOrder}</span>
              <span className="text-stone-500">&bull;</span>
              <span className="text-[#39CCCC]">{island.islandTheme}</span>
            </div>

            {/* Island Title */}
            <h1 className="text-4xl md:text-5xl font-black text-[#FFD700] uppercase tracking-wide leading-none drop-shadow-md">
              {island.name}
            </h1>
            <p className="text-base text-stone-300 italic font-sans mt-2">
              Main Arc: {island.arcName}
            </p>
          </div>

          {/* Quick status widgets */}
          <div className="flex flex-wrap gap-2 text-sm font-sans font-bold">
            <div className="bg-[#0A1929]/90 border border-[#39CCCC]/20 rounded px-3.5 py-2 text-stone-300 flex items-center gap-2 backdrop-blur-xs">
              <span className="text-stone-400 font-extrabold">MARINE ACTIVITY:</span>
              <span className={`font-black uppercase ${
                island.marineControlLevel === 'Absolute' ? 'text-[#E60012]' :
                island.marineControlLevel === 'High' ? 'text-orange-400' :
                island.marineControlLevel === 'Medium' ? 'text-[#FFD700]' : 'text-emerald-400'
              }`}>
                {island.marineControlLevel}
              </span>
            </div>
            
            <div className="bg-[#0A1929]/90 border border-[#FFD700]/25 rounded px-3.5 py-2 text-stone-300 flex items-center gap-2 backdrop-blur-xs">
              <span className="text-stone-400 font-extrabold">THREAT INDEX:</span>
              <span className="text-[#FFD700] uppercase font-black">{island.villainName.split(' ')[0]}</span>
            </div>
          </div>
        </div>

        {/* Log Pose navigation floating tags */}
        <div className="absolute top-4 right-4 flex gap-2 z-20">
          <button 
            onClick={(e) => { e.stopPropagation(); onPrevIsland(); }}
            className="p-3 py-2 bg-[#001F3F] border border-[#FFD700]/45 hover:bg-[#FFD700] hover:text-black font-sans font-black transition-all text-[#FFD700] text-sm rounded flex items-center gap-1.5 focus:outline-none cursor-pointer shadow-md select-none"
          >
            <ChevronLeft className="h-4.5 w-4.5" /> PREV
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onViewDossier && onViewDossier(); }}
            className="p-3 py-2 bg-[#FFD700] border border-[#FFD700] hover:bg-[#FFD700]/80 text-black font-sans font-black transition-all text-sm rounded flex items-center gap-1.5 focus:outline-none cursor-pointer shadow-md select-none"
          >
            📂 DOSSIER
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onNextIsland(); }}
            className="p-3 py-2 bg-[#001F3F] border border-[#FFD700]/45 hover:bg-[#FFD700] hover:text-black font-sans font-black transition-all text-[#FFD700] text-sm rounded flex items-center gap-1.5 focus:outline-none cursor-pointer shadow-md select-none"
          >
            NEXT <ChevronRight className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      {/* Main detailed grids splits */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left column spans 2/3: Synopsis, Battles, Fruits */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Article & Synopsis */}
          <div className="bg-[#001F3F] border border-white/10 rounded-lg p-6 space-y-4 relative shadow-lg">
            <div className="absolute top-4 right-4 text-stone-500 opacity-20">
              <Anchor className="h-12 w-12 text-[#FFD700] animate-[spin_50s_linear_infinite]" />
            </div>
            
            <h3 className="text-base font-black tracking-wider text-[#FFD700] border-b border-white/10 pb-2.5 flex items-center gap-2">
              <span className="w-2 h-4.5 bg-[#39CCCC] rounded-sm shadow-[0_0_8px_rgba(57,204,204,0.6)]" />
              VOYAGE LOG SYNOPSIS
            </h3>
            
            <p className="text-lg text-stone-250 leading-relaxed text-justify">
              {island.synopsis}
            </p>
          </div>

          {/* Devil Fruits section with interactive overlays */}
          <div className="bg-[#001F3F] border border-white/10 rounded-lg p-6 relative shadow-lg">
            <h3 className="text-base font-black tracking-wider text-[#FFD700] border-b border-white/10 pb-2.5 mb-4 flex items-center gap-2">
              <span className="w-2 h-4.5 bg-[#39CCCC] rounded-sm shadow-[0_0_8px_rgba(57,204,204,0.6)]" />
              DEVIL FRUITS OBSERVED/USED IN THIS ARC
            </h3>

            {involvedFruits.length === 0 ? (
              <p className="text-base text-stone-400 italic py-1.5">
                No active devil fruits or specific power manifestations registered on coordinates.
              </p>
            ) : (
              <div className="relative">
                <div className="flex flex-wrap gap-3">
                  {involvedFruits.map((fruit) => (
                    <div
                      key={fruit.name}
                      onMouseEnter={() => setHoveredFruit(fruit)}
                      onMouseLeave={() => setHoveredFruit(null)}
                      className="cursor-help px-4 py-3 bg-[#0A1929] border border-white/10 hover:border-[#39CCCC] rounded-md flex items-center gap-2.5 transition-all relative z-10"
                    >
                      <span className="w-3.5 h-3.5 rounded-full shadow-inner" style={{ backgroundColor: fruit.color }} />
                      <span className="text-base text-stone-200 font-black">
                        {fruit.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Floating Preview Card on Hover */}
                {hoveredFruit && (
                  <div className="absolute left-0 top-full mt-3 z-30 w-80 animate-fade-in shadow-2xl scale-95 origin-top-left transition-transform">
                    <DevilFruitCard fruit={hoveredFruit} />
                  </div>
                )}
                
                <p className="text-sm text-stone-400 mt-4.5 font-bold">
                  💡 **Devil Fruit Index**: Hover over any of the highlighted seals above to decipher structural fruit class descriptions, holders, and awakening ratings!
                </p>
              </div>
            )}
          </div>

          {/* Key Battles Dashboard */}
          <div className="bg-[#001F3F] border border-white/10 rounded-lg p-6 space-y-4 shadow-lg">
            <h3 className="text-base font-black tracking-wider text-[#FFD700] border-b border-white/10 pb-2.5 flex items-center gap-2">
              <span className="w-2 h-4.5 bg-[#39CCCC] rounded-sm shadow-[0_0_8px_rgba(57,204,204,0.6)]" />
              KEY BATTLES LOGGED
            </h3>

            {island.keyBattles.length === 0 ? (
              <p className="text-base text-stone-400 italic py-1.5">
                No monumental boss clashes or naval battles logged for these coordinates.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {island.keyBattles.map((batt, idx) => (
                  <div 
                    key={idx} 
                    className="bg-[#0A1929] border border-white/10 p-5.5 rounded-lg space-y-3.5 flex flex-col justify-between hover:border-[#FFD700]/30 transition-all duration-300"
                  >
                    <div>
                      {/* Combatants matching labels */}
                      <div className="flex items-center gap-2.5 text-stone-200 text-base font-bold border-b border-white/10 pb-2.5 mb-3">
                        <Swords className="h-5 w-5 text-[#FFD700] flex-shrink-0" />
                        <span className="text-[#FFD700] truncate">{batt.combatants1}</span>
                        <span className="text-stone-400 text-sm">VS</span>
                        <span className="text-[#E60012] truncate font-black">{batt.combatants2}</span>
                      </div>
                      
                      <p className="text-stone-350 text-base leading-relaxed">
                        {batt.details}
                      </p>
                    </div>

                    {/* Victor tag */}
                    <div className="flex gap-2 items-center bg-[#39CCCC]/10 border border-[#39CCCC]/30 px-3.5 py-2 rounded text-sm mt-3 self-start text-[#39CCCC]">
                      <ShieldCheck className="h-4.5 w-4.5 text-[#39CCCC] flex-shrink-0" />
                      <span>VICTOR:</span>
                      <span className="font-black uppercase text-[#FFD700]">{batt.victor}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Cast Roster and Bounty Updates */}
        <div className="space-y-8">
          
          {/* Active cast Character roster */}
          <div className="bg-[#001F3F] border border-white/10 rounded-lg p-6 space-y-4 shadow-lg">
            <h3 className="text-base font-black tracking-wider text-[#FFD700] border-b border-white/10 pb-2.5 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="w-2 h-4.5 bg-[#39CCCC] rounded-sm shadow-[0_0_8px_rgba(57,204,204,0.6)]" />
                LOGGED CAST ROSTER
              </span>
              <span className="text-sm bg-[#39CCCC]/10 text-[#39CCCC] border border-[#39CCCC]/20 px-3 py-1 rounded font-extrabold">
                {rosterCharacters.length} ON SCENE
              </span>
            </h3>

            {rosterCharacters.length === 0 ? (
              <p className="text-base text-stone-400 italic py-1.5">No major records accessible for this sector.</p>
            ) : (
              <div className="space-y-3.5">
                {rosterCharacters.map((char) => (
                  <WantedPoster 
                    key={char.id} 
                    character={char} 
                    compact={true}
                    onClick={() => onCharacterSelect && onCharacterSelect(char)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Bounty Updates log feed */}
          <div className="bg-[#001F3F] border border-white/10 rounded-lg p-6 space-y-4 relative shadow-lg">
            <h3 className="text-base font-black tracking-wider text-[#FFD700] border-b border-white/10 pb-2.5 flex items-center gap-2">
              <span className="w-2 h-4.5 bg-[#39CCCC] rounded-sm shadow-[0_0_8px_rgba(57,204,204,0.6)]" />
              BOUNTY REGISTRY MODIFICATIONS
            </h3>

            {island.bountyUpdates.length === 0 ? (
              <div className="text-center py-5 text-stone-400 text-base font-bold">
                <p>No bounty updates registered for this sector.</p>
              </div>
            ) : (
              <div className="space-y-4.5 relative">
                {/* Visual vertical stem line */}
                <div className="absolute left-3 top-2.5 bottom-3.5 w-0.5 bg-white/10 pointer-events-none" />

                {island.bountyUpdates.map((upd, idx) => (
                  <div key={idx} className="flex gap-3.5 relative pl-6">
                    {/* Circle bulb indicator representing high warning alert */}
                    <span className="absolute left-2.5 top-2 w-1.5 h-1.5 rounded-full bg-[#E60012] shadow-[0_0_5px_#E60012] -translate-x-1/2" />
                    
                    <div className="flex-1 min-w-0 bg-[#0A1929] border border-white/10 rounded p-4 hover:border-[#FFD700]/30 transition-all">
                      <span className="block text-base font-black text-[#FFD700]">
                        {upd.characterName}
                      </span>
                      <div className="flex justify-between items-center text-sm mt-2 text-stone-300 font-bold">
                        <span>PREV: <span className="text-stone-400">{upd.previousBounty || "None"}</span></span>
                        <span>&rarr;</span>
                        <span className="font-extrabold text-[#E60012]">NEW: ฿ {upd.newBounty}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
