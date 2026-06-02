import React, { useState, useMemo } from 'react';
import { Character, FactionType } from '../types';
import WantedPoster from './WantedPoster';
import { Search, SortAsc, SortDesc, BookOpen, Shield, Award, Sparkles, Skull, Users, ArrowUpRight, CheckCircle2, Circle, X } from 'lucide-react';

interface EncyclopediaViewProps {
  characters: Character[];
  activeFaction: FactionType | 'ALL';
  onFactionChange: (faction: FactionType | 'ALL') => void;
  onCharacterSelect?: (character: Character) => void;
}

export default function EncyclopediaView({ 
  characters, 
  activeFaction, 
  onFactionChange,
  onCharacterSelect
}: EncyclopediaViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'bounty' | 'name'>('bounty');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedSpotlight, setSelectedSpotlight] = useState<Character | null>(null);

  // Factions listing mapping
  const factionsList: { id: FactionType | 'ALL'; label: string; countBadgeColor: string }[] = [
    { id: 'ALL', label: 'All Files', countBadgeColor: 'bg-stone-805' },
    { id: 'StrawHats', label: 'Straw Hats', countBadgeColor: 'bg-red-900/60' },
    { id: 'WorstGeneration', label: 'Worst Gen', countBadgeColor: 'bg-purple-900/60' },
    { id: 'SevenWarlords', label: 'Warlords', countBadgeColor: 'bg-amber-900/60' },
    { id: 'RevolutionaryArmy', label: 'Revolutionary', countBadgeColor: 'bg-emerald-900/60' },
    { id: 'NavyAdmirals', label: 'Admirals', countBadgeColor: 'bg-blue-900/60' },
    { id: 'Yonko', label: 'Yonko', countBadgeColor: 'bg-orange-950/60' }
  ];

  // Map numerical statistics of database
  const statistics = useMemo(() => {
    return {
      totalCount: characters.length,
      activePirates: characters.filter(c => c.status === 'Active' && c.faction !== 'NavyAdmirals' && c.faction !== 'RevolutionaryArmy').length,
      highestBounty: Math.max(...characters.map(c => c.bountyValue).filter(v => v < 9999999999)), // excludes Dragon's mock highest value
    };
  }, [characters]);

  // Compute filtered characters list based on search/faction parameters
  const filteredAndSortedCharacters = useMemo(() => {
    let result = characters;

    // Filter by faction
    if (activeFaction !== 'ALL') {
      result = result.filter(char => char.faction === activeFaction);
    }

    // Filter by search term
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        char => 
          char.name.toLowerCase().includes(term) || 
          char.epithet?.toLowerCase().includes(term) || 
          char.role.toLowerCase().includes(term)
      );
    }

    // Sort result
    result = [...result].sort((a, b) => {
      if (sortBy === 'bounty') {
        const valueA = a.bountyValue ?? 0;
        const valueB = b.bountyValue ?? 0;
        return sortOrder === 'desc' ? valueB - valueA : valueA - valueB;
      } else {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return sortOrder === 'desc' ? nameB.localeCompare(nameA) : nameA.localeCompare(nameB);
      }
    });

    return result;
  }, [characters, activeFaction, searchTerm, sortBy, sortOrder]);

  return (
    <div className="w-full space-y-6">
      
      {/* Search and Dashboard Filter Header */}
      <div className="bg-[#001F3F] border border-white/10 rounded-lg p-5 flex flex-col md:flex-row justify-between items-center gap-6 relative select-none shadow-xl">
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]" />
        
        {/* Search controls */}
        <div className="w-full md:w-80 relative flex-shrink-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-550">
            <Search className="h-4.5 w-4.5 text-[#39CCCC]/60" />
          </div>
          <input 
            type="text" 
            placeholder="Search wanted records, epithets..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0A1929] text-stone-100 placeholder-stone-500 border border-white/10 rounded-md py-3 pl-11 pr-4 text-sm font-sans focus:outline-none focus:border-[#39CCCC] focus:ring-1 focus:ring-[#39CCCC]"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-300 hover:text-white text-sm font-sans cursor-pointer font-bold"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Faction Pills selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 overflow-x-auto w-full select-none">
          {factionsList.map((f) => {
            const count = characters.filter(char => f.id === 'ALL' || char.faction === f.id).length;
            const isSelected = activeFaction === f.id;
            return (
              <button
                key={f.id}
                onClick={() => onFactionChange(f.id)}
                className={`px-3.5 py-2 text-sm font-bold rounded-md border font-sans tracking-wide transition-all uppercase flex items-center gap-2 focus:outline-none cursor-pointer ${
                  isSelected 
                    ? 'bg-[#FFD700] text-black border-[#FFD700] font-black shadow-md' 
                    : 'bg-[#0A1929] text-stone-300 border-white/10 hover:bg-[#001F3F] hover:border-white/25'
                }`}
              >
                <span>{f.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded font-sans font-bold ${isSelected ? 'bg-black/10 text-black font-extrabold' : `bg-[#001F3F] text-[#FFD700] border border-white/5` }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sorting controls */}
        <div className="flex items-center gap-2 flex-shrink-0 text-sm font-sans">
          <span className="uppercase text-stone-500 font-bold tracking-wide">Sort:</span>
          
          <button
            onClick={() => {
              if (sortBy === 'bounty') {
                setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
              } else {
                setSortBy('bounty');
                setSortOrder('desc');
              }
            }}
            className={`px-3 py-2 rounded border text-xs uppercase font-sans font-black flex items-center gap-1.5 cursor-pointer ${
              sortBy === 'bounty' ? 'bg-[#39CCCC]/10 border-[#39CCCC]/40 text-[#39CCCC]' : 'bg-transparent border-white/10 text-stone-450 hover:border-white/20'
            }`}
          >
            Bounty
            {sortBy === 'bounty' && sortOrder === 'desc' ? <SortDesc className="h-4 w-4" /> : <SortAsc className="h-4 w-4" />}
          </button>

          <button
            onClick={() => {
              if (sortBy === 'name') {
                setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
              } else {
                setSortBy('name');
                setSortOrder('asc');
              }
            }}
            className={`px-3 py-2 rounded border text-xs uppercase font-sans font-black flex items-center gap-1.5 cursor-pointer ${
              sortBy === 'name' ? 'bg-[#39CCCC]/10 border-[#39CCCC]/40 text-[#39CCCC]' : 'bg-transparent border-white/10 text-stone-450 hover:border-white/20'
            }`}
          >
            Name
            {sortBy === 'name' && sortOrder === 'desc' ? <SortDesc className="h-4 w-4" /> : <SortAsc className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Grid Content rendering */}
      {filteredAndSortedCharacters.length === 0 ? (
        <div className="bg-[#001F3F] border border-white/10 text-center py-20 rounded-lg text-stone-400 shadow-lg font-sans">
          <Skull className="h-12 w-12 text-[#FFD700] mx-auto mb-4 animate-bounce" />
          <p className="text-xl text-[#FFD700] uppercase tracking-wide mb-2.5 font-black">No matching wanted files found</p>
          <p className="text-sm text-stone-400">The Marine division lacks logs corresponding to search parameters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {filteredAndSortedCharacters.map((char) => (
            <WantedPoster 
              key={char.id} 
              character={char} 
              onClick={() => setSelectedSpotlight(char)}
            />
          ))}
        </div>
      )}

      {/* ==================== CHARACTER IMMERSIVE SPOTLIGHT MODAL ==================== */}
      {selectedSpotlight && (
        <div className="fixed inset-0 bg-black/85 z-50 flex justify-center p-4 backdrop-blur-md overflow-y-auto animate-fade-in select-none">
          <div 
            className="relative my-auto w-full max-w-4xl bg-[#001F3F] border border-[#FFD700]/35 rounded-lg shadow-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 overflow-hidden"
            style={{
              backgroundImage: 'radial-gradient(circle at 12% 20%, rgba(57,204,204,0.05) 0%, rgba(0,31,63,0.3) 100%)',
            }}
          >
            {/* Background textured filter */}
            <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-25 bg-[radial-gradient(ellipse_at_center,_#39CCCC,_#001F3F,_#000)]" />

            {/* Exit top button */}
            <button
              onClick={() => setSelectedSpotlight(null)}
              className="absolute top-4 right-4 bg-[#0A1929] border border-white/15 text-stone-300 hover:text-white p-2 rounded-full focus:outline-none transition-transform hover:scale-110 cursor-pointer hover:border-[#FFD700]/55"
            >
              <X className="h-5 w-5" />
            </button>

            {/* left column: Wanted poster representation */}
            <div className="w-full md:w-fit flex-shrink-0 flex flex-col items-center gap-4">
              <WantedPoster character={selectedSpotlight} />
              
              {/* Highlight dream if active */}
              {selectedSpotlight.dream && (
                <div className="w-72 bg-[#0A1929] border border-white/10 rounded-lg p-3 text-center">
                  <h5 className="font-sans text-xs uppercase text-[#FFD700] font-black tracking-wide mb-1.5">
                    HERALDRY CAPTAIN DREAM
                  </h5>
                  <p className="font-sans text-[#F5F5DC]/80 text-sm italic leading-relaxed">
                    &ldquo;{selectedSpotlight.dream}&rdquo;
                  </p>
                </div>
              )}
            </div>

            {/* Right column: Deep details and records */}
            <div className="flex-1 flex flex-col text-[#F5F5DC]">
              
              {/* Header */}
              <div className="border-b border-white/10 pb-4 mb-4">
                <span className="font-sans text-xs uppercase tracking-wide text-[#39CCCC] font-black">
                  MARINE RECONNAISSANCE DOSSIER
                </span>
                <h1 className="text-4xl font-black text-[#FFD700] uppercase tracking-wide mt-2 truncate">
                  {selectedSpotlight.name}
                </h1>
                
                {selectedSpotlight.quote && (
                  <p className="font-sans text-sm text-[#39CCCC] italic mt-2.5 border-l-2 border-[#39CCCC]/45 pl-3.5 leading-relaxed">
                    &ldquo;{selectedSpotlight.quote}&rdquo;
                  </p>
                )}
              </div>

              {/* Bio summary */}
              <div className="space-y-4 flex-1">
                <div>
                  <h4 className="font-sans text-xs uppercase tracking-wide font-black text-[#FFD700] mb-1.5">
                    HISTORIC HIGH-SEAS DEEDS
                  </h4>
                  <p className="font-sans text-sm text-stone-300 leading-relaxed text-justify">
                    {selectedSpotlight.backstorySummary}
                  </p>
                </div>

                {/* Sub-grid of abilities, Haki, and faction particulars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Abilities */}
                  <div className="bg-[#0A1929] border border-white/10 p-3 rounded-lg">
                    <h5 className="font-sans text-xs text-[#39CCCC] font-black tracking-wide uppercase mb-2 flex gap-1.5 items-center">
                      <Sparkles className="h-3.5 w-3.5 text-[#39CCCC]" /> Abilities & Gears
                    </h5>
                    {selectedSpotlight.abilities.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {selectedSpotlight.abilities.map((abi, idx) => (
                          <span key={idx} className="bg-[#001F3F] border border-white/10 text-stone-250 font-sans text-xs px-2 py-0.5 rounded uppercase font-bold">
                            {abi}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs font-sans text-stone-500">None logged</span>
                    )}
                  </div>

                  {/* Haki proficiency */}
                  <div className="bg-[#0A1929] border border-white/10 p-3 rounded-lg">
                    <h5 className="font-sans text-xs text-[#39CCCC] font-black tracking-wide uppercase mb-2 flex gap-1.5 items-center">
                      <Shield className="h-3.5 w-3.5 text-[#39CCCC]" /> Haki Proficiency
                    </h5>
                    {selectedSpotlight.haki.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {selectedSpotlight.haki.map((hak, idx) => (
                          <span key={idx} className="bg-[#001F3F] border border-[#39CCCC]/35 text-[#39CCCC] font-sans text-xs px-2 py-0.5 rounded capitalize font-bold">
                            {hak}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs font-sans text-stone-500">No capabilities recorded</span>
                    )}
                  </div>
                </div>

                {/* Specifics if Navy Admiral or former */}
                {selectedSpotlight.faction === 'NavyAdmirals' && (
                  <div className="bg-[#001F3F] border border-blue-900/40 p-4 rounded-lg flex flex-col gap-2 opacity-90">
                    <div className="flex justify-between items-center border-b border-blue-900/10 pb-2">
                      <span className="font-sans text-xs uppercase text-[#39CCCC] font-black">Justice Philosophy</span>
                      <span className="font-sans text-xs bg-[#E60012]/10 text-red-300 border border-[#E60012]/30 px-2.5 py-0.5 rounded font-black uppercase">
                        MARINES HIGH RANKING
                      </span>
                    </div>
                    <p className="font-sans text-sm italic text-stone-300 leading-normal">
                      📢 "{selectedSpotlight.justicePhilosophy || "Universal Justice"}"
                    </p>
                    <div className="flex justify-between items-center mt-1.5 text-xs">
                      <span className="font-sans text-stone-400 font-bold">CROSS GUILD BOUNTY CLASS:</span>
                      <span className="font-sans font-bold text-[#FFD700] flex items-center gap-1.5 bg-[#0A1929] px-2.5 py-1 rounded border border-[#FFD700]/30">
                        ⭐ {selectedSpotlight.crossGuildBounty}
                      </span>
                    </div>
                  </div>
                )}

                {/* Bounty historical trajectory timeline */}
                {selectedSpotlight.bountyHistory && selectedSpotlight.bountyHistory.length > 0 && (
                  <div className="pt-3 border-t border-white/10 font-sans">
                    <h4 className="text-xs uppercase tracking-wider font-black text-[#FFD700] mb-2.5 flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-[#FFD700]" /> VOYAGE BOUNTY TRAJECTORY
                    </h4>
                    
                    {/* Horizontal chronological trace line */}
                    <div className="flex gap-2 pb-1 overflow-x-auto scrollbar-none select-none py-1.5">
                      {selectedSpotlight.bountyHistory.map((hist, idx) => (
                        <div 
                          key={idx} 
                          className="bg-[#0A1929] border border-white/10 rounded-lg px-3 py-2 min-w-[130px] relative text-center flex-shrink-0 hover:border-[#FFD700]/30 transition-all duration-300"
                        >
                          <span className="absolute -top-1.5 -left-1.5 w-4.5 h-4.5 rounded-full bg-[#FFD700] text-black text-[10px] font-sans leading-none flex items-center justify-center font-black">
                            {idx + 1}
                          </span>
                          <span className="block font-sans text-xs text-[#39CCCC] uppercase truncate tracking-wide font-black">
                            {hist.arc}
                          </span>
                          <span className="block font-sans text-xs text-[#E60012] font-black mt-0.5">
                            ฿ {hist.amount}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer specs */}
              <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap justify-between items-center gap-2 text-xs font-sans text-stone-500 uppercase tracking-wider bg-transparent font-bold">
                <span>Dossier Reference ID: OP-{selectedSpotlight.id.toUpperCase()}</span>
                <span className="text-stone-400 flex items-center gap-1">
                  <span>FACILITY ACTIVE LOGS</span> <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
