/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CHARACTERS_DB } from './data/characters';
import { DEVIL_FRUITS_DB } from './data/fruits';
import { ISLANDS_DB } from './data/islands';
import MapNavigator from './components/MapNavigator';
import EncyclopediaView from './components/EncyclopediaView';
import IslandDetailView from './components/IslandDetailView';
import IslandDossierView from './components/IslandDossierView';
import DevilFruitCard from './components/DevilFruitCard';
import WantedPoster from './components/WantedPoster';
import { FactionType, Character } from './types';
import { Compass, Sparkles, Trophy, Anchor, Award, Search, Users, Activity, Globe, Skull, HelpCircle, Flame, ShieldAlert, ArrowLeft } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'map' | 'encyclopedia' | 'fruits' | 'island-dossier'>('map');
  const [activeIslandId, setActiveIslandId] = useState<string>('foosha-village');
  const [selectedFactionFilter, setSelectedFactionFilter] = useState<FactionType | 'ALL'>('ALL');
  const [spotlightCharacter, setSpotlightCharacter] = useState<Character | null>(null);

  // Retrieve active island database profiles
  const activeIsland = ISLANDS_DB.find(i => i.id === activeIslandId) || ISLANDS_DB[0];

  // Handler for adjacent map clicks
  const handleNextIsland = () => {
    const currentIdx = ISLANDS_DB.findIndex(i => i.id === activeIslandId);
    if (currentIdx < ISLANDS_DB.length - 1) {
      setActiveIslandId(ISLANDS_DB[currentIdx + 1].id);
    } else {
      setActiveIslandId(ISLANDS_DB[0].id); // loop back
    }
  };

  const handlePrevIsland = () => {
    const currentIdx = ISLANDS_DB.findIndex(i => i.id === activeIslandId);
    if (currentIdx > 0) {
      setActiveIslandId(ISLANDS_DB[currentIdx - 1].id);
    } else {
      setActiveIslandId(ISLANDS_DB[ISLANDS_DB.length - 1].id); // loop to end
    }
  };

  // Quick statistics calculation
  const totalBountyAveraged = CHARACTERS_DB.reduce((sum, c) => sum + (c.bountyValue || 0), 0);

  return (
    <div className="min-h-screen bg-[#0A1929] text-[#F5F5DC] flex flex-col font-sans selection:bg-[#FFD700] selection:text-stone-950 relative overflow-x-hidden">
      
      {/* Decorative Sleek Interface background grid overlay and radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,204,204,0.06)_0%,transparent_70%)] pointer-events-none z-0" />
      <div className="absolute inset-0 pointer-events-none z-0 animate-[pulse_10s_ease-in-out_infinite]" style={{ backgroundImage: "radial-gradient(circle, #ffffff04 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="absolute top-0 inset-x-0 h-1 bg-[#FFD700] z-50" />

      {/* ==================== GLOBAL HERO BANNER HERO ==================== */}
      <header className="relative z-10 w-full bg-[#001F3F]/75 border-b border-white/10 shadow-2xl glass-panel-glossy">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo & Vibe */}
          <div className="flex gap-4 items-center">
            {/* Spinning Golden Compass inside a Crimson Seal */}
            <div className="relative w-12 h-12 rounded-full border-2 border-[#FFD700] flex items-center justify-center bg-[#E60012] shadow-[0_0_15px_rgba(230,0,18,0.5)] flex-shrink-0 animate-pulse">
              <Compass className="h-6 w-6 text-white animate-[spin_25s_linear_infinite]" />
              <div className="absolute w-1 h-1 bg-white rounded-full" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm bg-[#E60012] font-sans font-black px-3 py-1 rounded tracking-wide uppercase">THE GRAND LINE</span>
                <span className="text-sm bg-[#39CCCC]/20 font-sans text-[#39CCCC] border border-[#39CCCC]/30 font-black px-3 py-1 rounded tracking-wide uppercase">MARINE CLASSIFIED</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-wide text-[#FFD700] mt-1.5 text-glow-gold">
                GRAND LINE NAVIGATOR
              </h1>
              <p className="text-sm md:text-base font-sans text-stone-350 tracking-wider uppercase mt-1.5">
                COMPREHENSIVE ADVENTURE VOYAGER & CORSAIR ENCYCLOPEDIA
              </p>
            </div>
          </div>

          {/* Quick interactive navigation tabs conforming to the Sleek Interface */}
          <nav className="flex flex-wrap gap-6 text-base md:text-lg font-bold uppercase tracking-tight select-none">
            <button
              onClick={() => setCurrentTab('map')}
              className={`pb-1.5 transition-all duration-300 font-black uppercase tracking-wider cursor-pointer border-b-2 ${
                currentTab === 'map' 
                  ? 'text-[#FFD700] border-[#FFD700] scale-102 font-extrabold text-glow-gold' 
                  : 'text-[#F5F5DC] opacity-60 hover:opacity-100 border-transparent hover:border-white/20'
              }`}
            >
              🧭 LOG PATH CHART
            </button>
            <button
              onClick={() => {
                setCurrentTab('encyclopedia');
                setSelectedFactionFilter('ALL');
              }}
              className={`pb-1.5 transition-all duration-300 font-black uppercase tracking-wider cursor-pointer border-b-2 ${
                currentTab === 'encyclopedia' 
                  ? 'text-[#FFD700] border-[#FFD700] scale-102 font-extrabold text-glow-gold' 
                  : 'text-[#F5F5DC] opacity-60 hover:opacity-100 border-transparent hover:border-white/20'
              }`}
            >
              🏴‍☠️ WANTED DIRECTORIES
            </button>
            <button
              onClick={() => setCurrentTab('fruits')}
              className={`pb-1.5 transition-all duration-300 font-black uppercase tracking-wider cursor-pointer border-b-2 ${
                currentTab === 'fruits' 
                  ? 'text-[#FFD700] border-[#FFD700] scale-102 font-extrabold text-glow-gold' 
                  : 'text-[#F5F5DC] opacity-60 hover:opacity-100 border-transparent hover:border-white/20'
              }`}
            >
              🍇 DEVIL FRUITS BOOK
            </button>
          </nav>
        </div>

        {/* Dynamic global tickers banner aligned to Sleek Interface */}
        <div className="bg-[#001428]/60 backdrop-blur-md border-t border-white/5 py-3.5 px-6 select-none shadow-inner text-stone-300 text-sm md:text-base font-sans tracking-wide uppercase truncate flex justify-center gap-6 md:gap-12 flex-wrap text-center items-center font-bold">
          <div className="flex items-center gap-2"><Anchor className="h-5 w-5 text-[#39CCCC] animate-pulse" /> <span>DATABASE STATUS: <span className="text-[#39CCCC] font-extrabold">29 ISLANDS PLOTTED</span></span></div>
          <div className="flex items-center gap-2"><Skull className="h-5 w-5 text-[#E60012]" /> <span>YONKO ACTIVE FILES: <span className="text-[#FFD700] font-extrabold text-glow-gold">7 EMPERORS LOGGED</span></span></div>
          <div className="flex items-center gap-2"><Flame className="h-5 w-5 text-orange-500" /> <span>ACCUMULATED HIGH-SEAS BOUNTIES: <span className="text-[#E60012] font-extrabold">฿ 63.8 BILLION</span></span></div>
          
          <div className="hidden lg:flex items-center gap-2.5 bg-[#0A1929]/80 px-4.5 py-2 rounded-full border border-white/10 ml-4 backdrop-blur-xs">
            <div className="w-2.5 h-2.5 rounded-full bg-[#39CCCC] animate-pulse"></div>
            <span className="text-sm text-[#39CCCC] font-extrabold tracking-wider">LOG POSE LOCKED: {activeIsland?.name?.toUpperCase()}</span>
          </div>
        </div>
      </header>

      {/* ==================== MAIN CONTENT ARCHITECTURES ==================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8 relative z-10 space-y-8">
        
        {/* VIEW 1: MAP DIRECTORIES VIEW */}
        {currentTab === 'map' && (
          <div className="space-y-8 animate-fade-in">
            {/* Grand Line Scroll Compass Canvas */}
            <MapNavigator 
              islands={ISLANDS_DB} 
              activeIslandId={activeIslandId}
              onIslandSelect={(id) => {
                setActiveIslandId(id);
                // Auto scroll smoothly to detail anchor
                const detailEl = document.getElementById('active-island-detail-anchor');
                if (detailEl) {
                  detailEl.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />

             {/* Seamless Active Island Detail Frame */}
            <div id="active-island-detail-anchor" className="pt-4">
              <div className="p-4 rounded-lg mb-3 font-sans text-sm md:text-base uppercase tracking-wide text-[#B59C83] flex items-center justify-between px-5 glass-panel border border-[#39CCCC]/20 font-bold">
                <span>ACTIVE CHRONOLOGICAL JOURNAL ENTRY</span>
                <span className="text-[#39CCCC] font-extrabold text-glow-teal">LOCKED & DECODED</span>
              </div>
              
              <IslandDetailView 
                island={activeIsland}
                allCharacters={CHARACTERS_DB}
                allFruits={DEVIL_FRUITS_DB}
                onPrevIsland={handlePrevIsland}
                onNextIsland={handleNextIsland}
                onCharacterSelect={(char) => setSpotlightCharacter(char)}
                onViewDossier={() => setCurrentTab('island-dossier')}
              />
            </div>
          </div>
        )}

        {/* VIEW 2: COMPREHENSIVE ARCHIVES VIEW */}
        {currentTab === 'encyclopedia' && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center md:text-left">
              <h2 className="font-sans text-3xl font-black tracking-wide text-[#E8D3B8] uppercase">
                Marine Headquarters Archives
              </h2>
              <p className="text-sm md:text-base text-stone-400 font-sans tracking-wide mt-2 uppercase mb-5">
                Classified bounty profiles, crew memberships, and historic danger rankings.
              </p>
            </div>

            <EncyclopediaView 
              characters={CHARACTERS_DB}
              activeFaction={selectedFactionFilter}
              onFactionChange={(fac) => setSelectedFactionFilter(fac)}
              onCharacterSelect={(char) => setSpotlightCharacter(char)}
            />
          </div>
        )}

        {/* VIEW 3: DEVIL FRUIT ENCYCLOPEDIA */}
        {currentTab === 'fruits' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-center border-b border-amber-950/20 pb-4 gap-4">
              <div className="text-center md:text-left">
                <h2 className="font-sans text-3xl font-black tracking-wide text-[#E8D3B8] uppercase flex items-center gap-2 justify-center md:justify-start">
                  🍇 Devil Fruit Encyclopedia
                </h2>
                <p className="text-sm md:text-base text-stone-300 font-sans tracking-wide mt-2 uppercase">
                  Ancient archives of the mythical fruits of the sea, categorized by mystical classes.
                </p>
              </div>

              {/* Statistics */}
              <div className="flex gap-4 text-base font-sans font-bold">
                <div className="bg-[#102238] border border-amber-950/20 rounded px-4 py-2.5 text-center">
                  <span className="block text-stone-400 uppercase text-sm">Paramecia</span>
                  <span className="font-bold text-rose-450 text-lg mt-0.5 block">{DEVIL_FRUITS_DB.filter(f => f.type === 'Paramecia').length} fruits</span>
                </div>
                <div className="bg-[#102238] border border-amber-950/20 rounded px-4 py-2.5 text-center">
                  <span className="block text-stone-400 uppercase text-sm">Logia</span>
                  <span className="font-bold text-sky-450 text-lg mt-0.5 block">{DEVIL_FRUITS_DB.filter(f => f.type === 'Logia').length} fruits</span>
                </div>
                <div className="bg-[#102238] border border-amber-950/20 rounded px-4 py-2.5 text-center">
                  <span className="block text-stone-400 uppercase text-sm">Zoan & Mythical</span>
                  <span className="font-bold text-amber-500 text-lg mt-0.5 block">
                    {DEVIL_FRUITS_DB.filter(f => f.type.includes('Zoan')).length} fruits
                  </span>
                </div>
              </div>
            </div>

            {/* Fruits Catalog grids */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DEVIL_FRUITS_DB.map((fruit, idx) => (
                <DevilFruitCard key={idx} fruit={fruit} />
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: FULLSCREEN ISLAND DOSSIER VIEW */}
        {currentTab === 'island-dossier' && (
          <IslandDossierView
            island={activeIsland}
            allCharacters={CHARACTERS_DB}
            allFruits={DEVIL_FRUITS_DB}
            onBack={() => setCurrentTab('map')}
            onCharacterSelect={(char) => setSpotlightCharacter(char)}
          />
        )}

      </main>

      {/* ==================== FOOTER ==================== */}
      <footer className="relative z-10 w-full bg-[#030914] border-t border-amber-950/40 py-10 px-8 select-none mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 font-sans text-sm md:text-base text-stone-400 uppercase tracking-wide text-center md:text-left font-bold">
          
          <div className="space-y-1.5">
            <p className="font-sans text-stone-300 font-black text-base tracking-wide text-[#E1C299]">
              GRAND LINE CHAR-SYSTEMS &copy; 2026/05
            </p>
            <p>
              Operated Under Imperial Marine Intelligence Directives. All logs classified.
            </p>
          </div>

          <div className="flex gap-4">
            <span className="text-[#a00000] font-black">DEAD OR ALIVE DETAILED FILES</span>
            <span>&bull;</span>
            <span className="text-[#0088cc] font-black">LOG POSE FREQUENCY CALIBRATED</span>
          </div>

        </div>
      </footer>

      {/* ==================== GLOBAL DETAILED SPOTLIGHT DRIER DRAWER MODAL ==================== */}
      {spotlightCharacter && (
        <div 
          className="fixed inset-0 bg-black/90 z-60 flex justify-center p-4 backdrop-blur-lg overflow-y-auto animate-fade-in text-[#F5F5DC] cursor-pointer"
          onClick={() => setSpotlightCharacter(null)}
        >
          <div 
            className="relative my-auto w-full max-w-3xl glass-panel-glossy glow-gold rounded-xl p-4 md:p-6 flex flex-col md:flex-row gap-5 overflow-y-auto md:overflow-hidden font-sans border-2 border-[#FFD700]/30 cursor-default max-h-[90vh] md:max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: 'radial-gradient(circle at center, rgba(57,204,204,0.12) 0%, transparent 85%)',
            }}
          >
            {/* Sleek metallic grid overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-repeat" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

            {/* Top-Right Close Button */}
            <button
              onClick={() => setSpotlightCharacter(null)}
              className="absolute top-4 right-4 bg-[#0A1929] border border-[#FFD700]/30 text-[#FFD700] hover:bg-[#E60012] hover:text-white p-2 rounded-full focus:outline-none transition-transform hover:scale-110 cursor-pointer shadow-lg z-20"
              title="Close Dossier"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="w-full md:w-fit flex-shrink-0 flex flex-col items-center gap-4 select-none">
              <WantedPoster character={spotlightCharacter} />
              {spotlightCharacter.dream && (
                <div className="w-80 bg-[#0A1929] border border-[#39CCCC]/40 rounded-lg p-4 text-center shadow-md">
                  <h5 className="text-sm text-[#39CCCC] font-black tracking-wide mb-2 uppercase font-sans">
                    PROMISE OF RESOLVE
                  </h5>
                  <p className="text-[#F5F5DC] text-base leading-relaxed">
                    &ldquo;{spotlightCharacter.dream}&rdquo;
                  </p>
                </div>
              )}
            </div>

            <div className="flex-1 flex flex-col text-[#F5F5DC] min-w-0 md:overflow-y-auto md:pr-2">
              <div className="border-b border-white/10 pb-3 mb-3">
                <span className="font-sans text-[10px] uppercase tracking-wider text-[#39CCCC] font-black bg-[#39CCCC]/10 px-2 py-0.5 rounded">
                  CLASSIFIED INTELLIGENCE OVERVIEW
                </span>
                <h1 className="text-2xl font-black text-[#FFD700] uppercase tracking-wide mt-2">
                  {spotlightCharacter.name}
                </h1>
                {spotlightCharacter.quote && (
                  <p className="text-sm text-[#F5F5DC]/90 mt-2.5 border-l-2 border-[#FFD700]/80 pl-3 leading-relaxed">
                    &ldquo;{spotlightCharacter.quote}&rdquo;
                  </p>
                )}
              </div>

              <div className="space-y-3 flex-1">
                <div>
                  <h4 className="text-xs tracking-wide font-black text-[#FFD700] mb-2 font-sans uppercase">
                    HISTORIC SUMMARY OF DEEDS
                  </h4>
                  <p className="font-sans text-sm text-stone-250 leading-relaxed text-left text-justify">
                    {spotlightCharacter.backstorySummary}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#0A1929] border border-[#39CCCC]/20 p-4 rounded-lg">
                    <h5 className="text-xs text-[#39CCCC] font-black font-sans tracking-wide uppercase mb-2 flex gap-1.5 items-center">
                      <Sparkles className="h-4 w-4" /> Powers & Techniques
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {spotlightCharacter.abilities.map((abi, idx) => (
                        <span key={idx} className="bg-black/30 border border-[#39CCCC]/20 text-[#39CCCC] font-sans text-xs px-2 py-0.5 rounded-sm uppercase font-bold">
                          {abi}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#0A1929] border border-[#FFD700]/20 p-4 rounded-lg">
                    <h5 className="text-xs text-[#FFD700] font-black font-sans tracking-wide uppercase mb-2 flex gap-1.5 items-center">
                      <Award className="h-4 w-4" /> Haki Manifestations
                    </h5>
                    {spotlightCharacter.haki.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {spotlightCharacter.haki.map((hak, idx) => (
                          <span key={idx} className="bg-black/30 border border-[#FFD700]/20 text-[#FFD700] font-sans text-xs px-2 py-0.5 rounded-sm capitalize font-bold">
                            {hak}
                          </span>
                         ))}
                      </div>
                    ) : (
                      <span className="text-xs font-sans text-stone-400">None logged</span>
                    )}
                  </div>
                </div>

                {selectedFactionFilter === 'NavyAdmirals' && spotlightCharacter.faction === 'NavyAdmirals' && (
                  <div className="bg-blue-950/20 border border-blue-900/30 p-4 rounded-sm flex flex-col gap-2.5">
                    <div className="flex justify-between items-center border-b border-blue-900/40 pb-2">
                      <span className="text-xs uppercase text-blue-400 font-black">Justice Philosophy</span>
                    </div>
                    <p className="text-sm text-stone-200">
                      📢 "{spotlightCharacter.justicePhilosophy || "Universal Justice"}"
                    </p>
                    <div className="flex justify-between items-center text-xs mt-1.5 font-bold">
                      <span className="text-stone-400">CROSS GUILD ACCLAIM:</span>
                      <span className="font-sans font-black text-amber-400 text-xs">
                        ⭐ {spotlightCharacter.crossGuildBounty}
                      </span>
                    </div>
                  </div>
                )}

                {spotlightCharacter.bountyHistory && spotlightCharacter.bountyHistory.length > 0 && (
                  <div className="pt-3 border-t border-white/10">
                    <h4 className="text-xs uppercase tracking-wide font-black text-[#FFD700] mb-3 font-sans">
                      BOUNTY CHRONOLOGICAL PROGRESSION
                    </h4>
                    <div className="flex gap-3 pb-1 overflow-x-auto scrollbar-thin select-none py-1">
                      {spotlightCharacter.bountyHistory.map((hist, idx) => (
                        <div key={idx} className="bg-[#0A1929] border border-[#FFD700]/20 rounded px-4 py-2.5 min-w-[150px] relative text-center flex-shrink-0">
                           <span className="block text-xs text-[#F5F5DC]/80 uppercase truncate tracking-wide font-sans font-bold">{hist.arc}</span>
                           <span className="block font-sans text-xs md:text-sm text-[#E60012] font-black mt-1">฿ {hist.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom close button */}
              <button
                onClick={() => setSpotlightCharacter(null)}
                className="mt-6 w-full py-3 bg-[#E60012]/15 border border-[#E60012]/45 text-[#FFD700] hover:bg-[#E60012] hover:text-white rounded font-sans font-black tracking-wide uppercase transition-all duration-300 cursor-pointer text-center select-none"
              >
                Close Dossier
              </button>

              <div className="mt-6 pt-3 border-t border-white/10 flex justify-between items-center text-sm font-sans text-stone-450 uppercase tracking-wide font-bold">
                <span>Dossier ref: MAP-SPOT-{spotlightCharacter.id.toUpperCase()}</span>
                <span className="text-[#FFD700] font-black">SECURED FILES SYSTEM</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Inline declaration of Lucide-X component fallback
function X({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
