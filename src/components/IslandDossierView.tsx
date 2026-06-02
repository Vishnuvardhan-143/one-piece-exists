import React, { useState } from 'react';
import { Island, Character, DevilFruit } from '../types';
import WantedPoster from './WantedPoster';
import DevilFruitCard from './DevilFruitCard';
import { ArrowLeft, Anchor, MapPin, Swords, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

interface IslandDossierViewProps {
  island: Island;
  allCharacters: Character[];
  allFruits: DevilFruit[];
  onBack: () => void;
  onCharacterSelect: (character: Character) => void;
  onPrevIsland: () => void;
  onNextIsland: () => void;
}

export default function IslandDossierView({
  island,
  allCharacters,
  allFruits,
  onBack,
  onCharacterSelect,
  onPrevIsland,
  onNextIsland
}: IslandDossierViewProps) {
  const [hoveredFruit, setHoveredFruit] = useState<DevilFruit | null>(null);

  const rosterCharacters = allCharacters.filter(c => 
    island.characterRoster.includes(c.name)
  ).filter((char, index, self) =>
    self.findIndex(c => c.name === char.name) === index
  );

  const involvedFruits = allFruits.filter(f => 
    island.devilFruitsInvolved.includes(f.name)
  );

  return (
    <div className="w-full space-y-8 select-none animate-fade-in text-[#F5F5DC] font-sans">
      
      {/* Title Bar & Back button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2.5 px-4.5 py-2.5 bg-[#001F3F] border border-[#FFD700]/30 hover:bg-[#FFD700] hover:text-black rounded text-base font-black tracking-wide transition-all cursor-pointer shadow-md"
          >
            <ArrowLeft className="h-4.5 w-4.5" /> BACK TO MAP
          </button>
          <div>
            <div className="flex items-center gap-2.5 text-[#FFD700] font-sans text-sm tracking-wide uppercase font-black">
              <MapPin className="h-4.5 w-4.5 text-[#FFD700]" />
              <span>COORDINATES #{island.chronologicalOrder}</span>
              <span className="text-stone-500">&bull;</span>
              <span className="text-[#39CCCC]">{island.islandTheme}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wide text-[#FFD700] mt-2">
              {island.name} Dossier
            </h1>
          </div>
        </div>

        {/* Status badges */}
        <div className="flex gap-3.5 text-sm font-sans">
          <div className="bg-[#001F3F] border border-[#39CCCC]/20 rounded px-3.5 py-2 flex items-center gap-2">
            <span className="text-stone-400 font-extrabold">MARINE CONTROL:</span>
            <span className={`font-black uppercase ${
              island.marineControlLevel === 'Absolute' ? 'text-[#E60012]' :
              island.marineControlLevel === 'High' ? 'text-orange-400' :
              island.marineControlLevel === 'Medium' ? 'text-[#FFD700]' : 'text-emerald-400'
            }`}>
              {island.marineControlLevel}
            </span>
          </div>
          <div className="bg-[#001F3F] border border-[#FFD700]/25 rounded px-3.5 py-2 flex items-center gap-2">
            <span className="text-stone-400 font-extrabold">THREAT INDEX:</span>
            <span className="text-[#FFD700] font-black uppercase">{island.villainName}</span>
          </div>
        </div>
      </div>

      {/* Showcase box containing the uncropped image */}
      <div className="relative w-full rounded-xl border border-white/10 overflow-hidden shadow-2xl bg-black/50 p-4 flex flex-col items-center group">
        {/* Navigation Buttons - Appear on hover */}
        <button
          onClick={onPrevIsland}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#0A1929]/80 hover:bg-[#39CCCC] text-[#39CCCC] hover:text-[#0A1929] p-3 rounded-full backdrop-blur-md border border-[#39CCCC]/30 hover:border-[#39CCCC] transition-all z-10 opacity-0 group-hover:opacity-100 shadow-xl cursor-pointer"
          title="Previous Island"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button
          onClick={onNextIsland}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#0A1929]/80 hover:bg-[#39CCCC] text-[#39CCCC] hover:text-[#0A1929] p-3 rounded-full backdrop-blur-md border border-[#39CCCC]/30 hover:border-[#39CCCC] transition-all z-10 opacity-0 group-hover:opacity-100 shadow-xl cursor-pointer"
          title="Next Island"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* Full Image */}
        <img
          src={island.headerImage}
          alt={island.name}
          className="w-full max-h-[70vh] object-contain rounded-lg transition-all duration-500 group-hover:brightness-105"
        />

        {/* Small Caption */}
        <div className="mt-4 text-center text-sm text-stone-400 tracking-wide font-black">
          📷 FULL UNEXPLORED GEOGRAPHICAL ARCHIVES FOR: {island.name.toUpperCase()} &bull; UNCHANGED ASPECT RATIO
        </div>
      </div>

      {/* Details laid out under it */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left columns (Synopsis, Battles, Fruits) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Voyage Log Synopsis */}
          <div className="bg-[#001F3F]/65 border border-white/10 rounded-lg p-6 space-y-4 shadow-lg backdrop-blur-md">
            <h3 className="text-base font-black tracking-wider text-[#FFD700] border-b border-white/10 pb-2.5 flex items-center gap-2">
              <span className="w-2 h-4.5 bg-[#39CCCC] rounded-sm shadow-[0_0_8px_rgba(57,204,204,0.6)]" />
              DETAILED CHRONOLOGICAL SYNOPSIS
            </h3>
            <p className="text-lg text-stone-250 leading-relaxed text-justify">
              {island.synopsis}
            </p>
            {island.description && (
              <p className="text-base text-stone-300 leading-relaxed italic border-l-2 border-[#FFD700]/50 pl-3 pt-1">
                &ldquo;{island.description}&rdquo;
              </p>
            )}
          </div>

          {/* Devil Fruits */}
          <div className="bg-[#001F3F]/65 border border-white/10 rounded-lg p-6 relative shadow-lg backdrop-blur-md">
            <h3 className="text-base font-black tracking-wider text-[#FFD700] border-b border-white/10 pb-2.5 mb-4 flex items-center gap-2">
              <span className="w-2 h-4.5 bg-[#39CCCC] rounded-sm shadow-[0_0_8px_rgba(57,204,204,0.6)]" />
              DEVIL FRUIT POWER LOG
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
                {hoveredFruit && (
                  <div className="absolute left-0 top-full mt-3 z-35 w-80 animate-fade-in shadow-2xl scale-95 origin-top-left transition-transform">
                    <DevilFruitCard fruit={hoveredFruit} />
                  </div>
                )}
                <p className="text-sm text-stone-400 mt-4.5 font-bold">
                  💡 **Devil Fruit Index**: Hover over any of the highlighted seals above to view properties, holders, and awakening ratings!
                </p>
              </div>
            )}
          </div>

          {/* Key Battles */}
          <div className="bg-[#001F3F]/65 border border-white/10 rounded-lg p-6 space-y-4 shadow-lg backdrop-blur-md">
            <h3 className="text-base font-black tracking-wider text-[#FFD700] border-b border-white/10 pb-2.5 flex items-center gap-2">
              <span className="w-2 h-4.5 bg-[#39CCCC] rounded-sm shadow-[0_0_8px_rgba(57,204,204,0.6)]" />
              KEY BATTLES & ENCOUNTERS LOGGED
            </h3>
            {island.keyBattles.length === 0 ? (
              <p className="text-base text-stone-400 italic py-1.5">
                No major boss battles or combat records registered for this sector.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {island.keyBattles.map((batt, idx) => (
                  <div
                    key={idx}
                    className="bg-[#0A1929] border border-white/10 p-5.5 rounded-lg space-y-3.5 flex flex-col justify-between hover:border-[#FFD700]/30 transition-all duration-300"
                  >
                    <div>
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

        {/* Right column (Roster, Bounties) */}
        <div className="space-y-8">
          
          {/* Cast Roster */}
          <div className="bg-[#001F3F]/65 border border-white/10 rounded-lg p-6 space-y-4 shadow-lg backdrop-blur-md">
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
                    onClick={() => onCharacterSelect(char)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Bounty Updates */}
          <div className="bg-[#001F3F]/65 border border-white/10 rounded-lg p-6 space-y-4 shadow-lg backdrop-blur-md">
            <h3 className="text-base font-black tracking-wider text-[#FFD700] border-b border-white/10 pb-2.5 flex items-center gap-2">
              <span className="w-2 h-4.5 bg-[#39CCCC] rounded-sm shadow-[0_0_8px_rgba(57,204,204,0.6)]" />
              BOUNTY REGISTRY CHANGES
            </h3>
            {island.bountyUpdates.length === 0 ? (
              <div className="text-center py-5 text-stone-400 text-base font-bold">
                <p>No bounty updates registered for this sector.</p>
              </div>
            ) : (
              <div className="space-y-4.5 relative">
                <div className="absolute left-3 top-2.5 bottom-3.5 w-0.5 bg-white/10 pointer-events-none" />
                {island.bountyUpdates.map((upd, idx) => (
                  <div key={idx} className="flex gap-3.5 relative pl-6">
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
