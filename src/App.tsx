/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CHARACTERS_DB } from './data/characters';
import { DEVIL_FRUITS_DB } from './data/fruits';
import { ISLANDS_DB } from './data/islands';
import MapNavigator from './components/MapNavigator';
import EncyclopediaView from './components/EncyclopediaView';
import IslandDetailView from './components/IslandDetailView';
import IslandDossierView from './components/IslandDossierView';
import DevilFruitCard from './components/DevilFruitCard';
import WantedPoster from './components/WantedPoster';
import FadingVideo from './components/FadingVideo';
import BlurText from './components/BlurText';
import SwarmCursor from './components/SwarmCursor';
import { FactionType, Character } from './types';
import { Compass, Sparkles, Trophy, Anchor, Award, Search, Users, Activity, Globe, Skull, HelpCircle, Flame, ShieldAlert, ArrowLeft } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'map' | 'encyclopedia' | 'fruits' | 'island-dossier'>('map');
  const [activeIslandId, setActiveIslandId] = useState<string>('foosha-village');
  const [selectedFactionFilter, setSelectedFactionFilter] = useState<FactionType | 'ALL'>('ALL');
  const [spotlightCharacter, setSpotlightCharacter] = useState<Character | null>(null);
  const [showChartRoom, setShowChartRoom] = useState<boolean>(false);

  // Retrieve active island database profiles
  const activeIsland = ISLANDS_DB.find(i => i.id === activeIslandId) || ISLANDS_DB[0];

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const capabilitiesRef = useRef<HTMLDivElement>(null);
  const chartRoomRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    container.style.setProperty('--mouse-x', `${x}px`);
    container.style.setProperty('--mouse-y', `${y}px`);
  };

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
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#0A1929] text-[#F5F5DC] flex flex-col font-sans selection:bg-[#FFD700] selection:text-stone-950 relative overflow-x-hidden"
    >
      {/* Interactive Swarm Cursor background animation */}
      <SwarmCursor
        className="fixed inset-0 pointer-events-none z-1"
        color="#2BA8C8"
        accentColor="#5FFBF1"
        count={16}
        size={8}
        speed={3.2}
        glow={0.65}
        merge={0.72}
        opacity={0.6}
        trail={0.7}
        spread={100}
      />
      
      {/* Decorative Sleek Interface background grid overlay and radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(57,204,204,0.08)_0%,transparent_80%)] pointer-events-none z-0 transition-all duration-300 ease-out" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#39CCCC]/3 rounded-full blur-[120px] pointer-events-none z-0 animate-[pulse_12s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#FFD700]/1 rounded-full blur-[150px] pointer-events-none z-0 animate-[pulse_18s_ease-in-out_infinite_2s]" />
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

      {/* ==================== STICKY FLOATING NAVBAR ==================== */}
      <motion.header 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-0 right-0 z-50 px-4 md:px-8 pointer-events-none"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          
          {/* Logo Circle */}
          <div 
            onClick={() => {
              setCurrentTab('map');
              setShowChartRoom(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-12 h-12 rounded-full flex items-center justify-center liquid-glass-strong cursor-pointer hover:scale-105 transition-transform md:-ml-12"
          >
            <span className="font-heading italic text-2xl lowercase text-white">g</span>
          </div>

          {/* Center Navigation Pill */}
          <div className="liquid-glass-strong rounded-full px-2 py-1.5 flex items-center gap-1 md:translate-x-40">
            <button
              onClick={() => {
                setCurrentTab('map');
                setShowChartRoom(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                currentTab === 'map'
                  ? 'bg-white text-stone-950 font-extrabold shadow-md'
                  : 'text-stone-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Voyage
            </button>
            <button
              onClick={() => {
                setCurrentTab('encyclopedia');
                setSelectedFactionFilter('ALL');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                currentTab === 'encyclopedia'
                  ? 'bg-white text-stone-950 font-extrabold shadow-md'
                  : 'text-stone-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Archives
            </button>
            <button
              onClick={() => {
                setCurrentTab('fruits');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                currentTab === 'fruits'
                  ? 'bg-white text-stone-950 font-extrabold shadow-md'
                  : 'text-stone-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Devil Fruits
            </button>
          </div>

          {/* Right Status Badge */}
          <div className="hidden md:flex items-center gap-2.5 px-4 py-2 liquid-glass-strong rounded-full text-xs text-[#39CCCC] font-bold uppercase tracking-wider md:translate-x-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[#39CCCC] animate-pulse" />
            <span>LOG POSE LOCKED</span>
          </div>

        </div>
      </motion.header>

      {/* ==================== MAIN CONTENT ARCHITECTURES ==================== */}
      <div className="flex-1 flex flex-col">
        {currentTab === 'map' ? (
          <div className="flex flex-col">
            
            {/* Section 1: Hero */}
            <section ref={heroRef} className="relative w-full min-h-screen flex flex-col justify-between items-center py-16 px-4 md:px-8 overflow-hidden">
              {/* Background Video loop */}
              <div className="absolute inset-0 z-0 w-full h-full">
                <FadingVideo 
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0A1929]/50 via-[#0A1929]/80 to-[#0A1929]" />
              </div>

              {/* Spacer offset for floating navbar */}
              <div className="h-16" />

              {/* Center Content container */}
              <div className="relative z-10 flex flex-col items-center max-w-5xl text-center px-4">
                {/* Main Heading with BlurText Reveal */}
                <div className="mt-8">
                  <BlurText
                    text="Wealth, fame, power. The secrets of the Grand Line await."
                    className="font-heading italic text-5xl md:text-8xl text-white font-light tracking-tight leading-[1.05]"
                  />
                </div>

                {/* Subtext description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="max-w-2xl text-center text-stone-300 font-body text-base md:text-lg mt-6 leading-relaxed"
                >
                  Embark on the ultimate high-seas navigation experience. Monitor real-time Log Pose telemetry, explore classified pirate dossiers, and study mythical Devil Fruit cataloging.
                </motion.p>

                {/* Voyage Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded bg-white/5 border border-white/10 text-stone-200 font-body text-xs tracking-widest uppercase mt-8"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] animate-pulse" />
                  LAUGH TALE VOYAGE PROTOCOL
                </motion.div>

                {/* Suggestion text */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="text-[#FFD700]/80 text-xs mt-6 font-bold tracking-widest uppercase animate-pulse"
                >
                  ↓ Click to access the interactive globe ↓
                </motion.p>

                {/* Primary CTA */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowChartRoom(true);
                    setTimeout(() => {
                      chartRoomRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="mt-4 px-8 py-3.5 bg-white text-stone-950 font-bold uppercase tracking-wider text-xs shadow-lg hover:bg-stone-100 transition-all duration-300 flex items-center gap-2 cursor-pointer rounded"
                >
                  <span>Start Your Voyage</span>
                  <Compass className="w-4 h-4 animate-[spin_10s_linear_infinite]" />
                </motion.button>
              </div>

              {/* Bottom Content: Stats & Partners */}
              <div className="relative z-10 w-full max-w-5xl flex flex-col items-center gap-8 mt-12">
                {/* Stats Cards in Liquid Glass */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full px-4">
                  <div className="liquid-glass rounded p-4 text-center">
                    <span className="block text-stone-400 font-body text-xs tracking-wider uppercase">Plotted Islands</span>
                    <span className="font-heading italic text-3xl text-white mt-1 block">29 Sectors</span>
                  </div>
                  <div className="liquid-glass rounded p-4 text-center">
                    <span className="block text-stone-400 font-body text-xs tracking-wider uppercase">Active Yonko</span>
                    <span className="font-heading italic text-3xl text-white mt-1 block">7 Emperors</span>
                  </div>
                  <div className="liquid-glass rounded p-4 text-center">
                    <span className="block text-stone-400 font-body text-xs tracking-wider uppercase">High-Seas Bounty</span>
                    <span className="font-heading italic text-3xl text-white mt-1 block">฿ 63.8B</span>
                  </div>
                  <div className="liquid-glass rounded p-4 text-center">
                    <span className="block text-stone-400 font-body text-xs tracking-wider uppercase">Devil Fruits</span>
                    <span className="font-heading italic text-3xl text-white mt-1 block">3 Main Types</span>
                  </div>
                </div>

                {/* Partners Row */}
                <div className="w-full flex flex-wrap justify-center items-center gap-x-12 gap-y-4 pt-6 border-t border-white/5 opacity-40 text-[10px] tracking-[0.25em] uppercase font-bold text-stone-450">
                  <span className="hover:text-white transition-colors cursor-default">Straw Hat Fleet</span>
                  <span className="hover:text-white transition-colors cursor-default">Red Hair Pirates</span>
                  <span className="hover:text-white transition-colors cursor-default">Revolutionary Army</span>
                  <span className="hover:text-white transition-colors cursor-default">Cross Guild</span>
                </div>
              </div>
            </section>

            {/* Section 2: Capabilities */}
            <section ref={capabilitiesRef} className="relative w-full min-h-screen py-24 px-4 md:px-8 flex flex-col justify-center items-center overflow-hidden">
              {/* Background Video */}
              <div className="absolute inset-0 z-0 w-full h-full">
                <FadingVideo 
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0A1929] via-[#0A1929]/85 to-[#0A1929]" />
              </div>

              {/* Section Header */}
              <div className="relative z-10 text-center max-w-3xl mb-16 px-4">
                <span className="text-[#FFD700] text-xs font-bold tracking-widest uppercase block mb-3">SYSTEM CAPABILITIES</span>
                <h2 className="font-heading italic text-4xl md:text-6xl text-white leading-tight">
                  Unprecedented intelligence for the Grand Line explorer.
                </h2>
              </div>

              {/* Grid Cards */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-4">
                {/* Card 1: Log Pose */}
                <motion.div
                  whileHover={{ y: -6, scale: 1.01 }}
                  onClick={() => {
                    setShowChartRoom(true);
                    setTimeout(() => {
                      chartRoomRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="liquid-glass rounded p-12 md:p-14 flex flex-col justify-between min-h-[360px] cursor-pointer group transition-shadow hover:shadow-2xl hover:shadow-[#FFD700]/5"
                >
                  <div className="px-6 md:px-10 pt-6">
                    <div className="flex justify-between items-start">
                      <span className="text-[#39CCCC] text-xs font-bold tracking-widest uppercase">01 / LOG PATH</span>
                      <Globe className="w-5 h-5 text-stone-450 group-hover:text-[#39CCCC] transition-colors" />
                    </div>
                    <h3 className="font-heading italic text-3xl text-white mt-6 group-hover:text-[#FFD700] transition-colors">Log Pose Chart</h3>
                    <p className="text-stone-400 text-sm mt-3 leading-relaxed">
                      Interactive 3D celestial navigation globe of the Grand Line. Real-time path tracing, weather anomalies, and magnetic lock frequencies.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-6 px-6 md:px-10 pb-6">
                    <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-stone-400 font-bold uppercase">3D Globe</span>
                    <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-stone-400 font-bold uppercase">Telemetry</span>
                  </div>
                </motion.div>

                {/* Card 2: Wanted Directories */}
                <motion.div
                  whileHover={{ y: -6, scale: 1.01 }}
                  onClick={() => {
                    setCurrentTab('encyclopedia');
                    setSelectedFactionFilter('ALL');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="liquid-glass rounded p-12 md:p-14 flex flex-col justify-between min-h-[360px] cursor-pointer group transition-shadow hover:shadow-2xl hover:shadow-[#FFD700]/5"
                >
                  <div className="px-6 md:px-10 pt-6">
                    <div className="flex justify-between items-start">
                      <span className="text-[#39CCCC] text-xs font-bold tracking-widest uppercase">02 / ARCHIVES</span>
                      <Skull className="w-5 h-5 text-stone-450 group-hover:text-[#E60012] transition-colors" />
                    </div>
                    <h3 className="font-heading italic text-3xl text-white mt-6 group-hover:text-[#FFD700] transition-colors">Wanted Archives</h3>
                    <p className="text-stone-400 text-sm mt-3 leading-relaxed">
                      Classified intelligence on the world's most notorious pirates and marines. Bounties, haki profile breakdowns, and histories.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-6 px-6 md:px-10 pb-6">
                    <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-stone-400 font-bold uppercase">Dossiers</span>
                    <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-stone-400 font-bold uppercase">Bounties</span>
                  </div>
                </motion.div>

                {/* Card 3: Devil Fruits */}
                <motion.div
                  whileHover={{ y: -6, scale: 1.01 }}
                  onClick={() => {
                    setCurrentTab('fruits');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="liquid-glass rounded p-12 md:p-14 flex flex-col justify-between min-h-[360px] cursor-pointer group transition-shadow hover:shadow-2xl hover:shadow-[#FFD700]/5"
                >
                  <div className="px-6 md:px-10 pt-6">
                    <div className="flex justify-between items-start">
                      <span className="text-[#39CCCC] text-xs font-bold tracking-widest uppercase">03 / MYTHICAL</span>
                      <Flame className="w-5 h-5 text-stone-450 group-hover:text-orange-500 transition-colors" />
                    </div>
                    <h3 className="font-heading italic text-3xl text-white mt-6 group-hover:text-[#FFD700] transition-colors">Devil Fruits Book</h3>
                    <p className="text-stone-400 text-sm mt-3 leading-relaxed">
                      The ancient register of the sea's mystical devil fruits. Categorized by Paramecia, Logia, and Zoan types with power analysis.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-6 px-6 md:px-10 pb-6">
                    <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-stone-400 font-bold uppercase">Mythical</span>
                    <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-stone-400 font-bold uppercase">Abilities</span>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Section 3: Tactical Chart Room */}
            <AnimatePresence>
              {showChartRoom && (
                <motion.section
                  ref={chartRoomRef}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full relative overflow-hidden border-t border-white/10 bg-[#0A1929] pt-16 pb-24"
                >
                  <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-6">
                      <div>
                        <span className="text-[#39CCCC] text-xs font-bold tracking-widest uppercase font-body">SECTION 03</span>
                        <h3 className="font-heading italic text-4xl text-white mt-1">Tactical Chart Room</h3>
                        <p className="text-stone-400 text-sm mt-1 uppercase font-body">Interactive 3D Navigation Core</p>
                      </div>
                      <button
                        onClick={() => {
                          setShowChartRoom(false);
                          setTimeout(() => {
                            capabilitiesRef.current?.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        }}
                        className="mt-4 md:mt-0 px-4 py-2 border border-white/20 hover:bg-white/5 rounded text-xs font-bold uppercase tracking-wider text-stone-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" /> Close Chart Room
                      </button>
                    </div>

                    {/* Chart/Map components */}
                    <MapNavigator 
                      islands={ISLANDS_DB} 
                      activeIslandId={activeIslandId}
                      onIslandSelect={(id) => {
                        setActiveIslandId(id);
                        const detailEl = document.getElementById('active-island-detail-anchor');
                        if (detailEl) {
                          detailEl.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    />

                    <div id="active-island-detail-anchor" className="pt-4">
                      <div className="p-4 rounded mb-3 font-sans text-sm md:text-base uppercase tracking-wide text-[#B59C83] flex items-center justify-between px-5 glass-panel border border-[#39CCCC]/20 font-bold">
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
                </motion.section>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 pt-48 md:pt-56 pb-8 relative z-10 space-y-8">
            <AnimatePresence mode="wait">
              {/* VIEW 2: COMPREHENSIVE ARCHIVES VIEW */}
              {currentTab === 'encyclopedia' && (
                <motion.div
                  key="encyclopedia"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6"
                >
                  <div className="text-center md:text-left">
                    <h2 className="font-sans text-3xl font-black tracking-wide text-[#E8D3B8] uppercase">
                      Marine Headquarters Archives
                    </h2>
                    <p className="text-sm md:text-base text-stone-450 font-sans tracking-wide mt-2 uppercase mb-5">
                      Classified bounty profiles, crew memberships, and historic danger rankings.
                    </p>
                  </div>

                  <EncyclopediaView 
                    characters={CHARACTERS_DB}
                    activeFaction={selectedFactionFilter}
                    onFactionChange={(fac) => setSelectedFactionFilter(fac)}
                    onCharacterSelect={(char) => setSpotlightCharacter(char)}
                  />
                </motion.div>
              )}

              {/* VIEW 3: DEVIL FRUIT ENCYCLOPEDIA */}
              {currentTab === 'fruits' && (
                <motion.div
                  key="fruits"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6"
                >
                  <div className="flex flex-col md:flex-row justify-between items-center border-b border-amber-950/20 pb-4 gap-4">
                    <div className="text-center md:text-left">
                      <h2 className="font-sans text-3xl font-black tracking-wide text-[#E8D3B8] uppercase flex items-center gap-2 justify-center md:justify-start">
                        🍇 Devil Fruit Encyclopedia
                      </h2>
                      <p className="text-sm md:text-base text-stone-300 font-sans tracking-wide mt-2 uppercase">
                        Ancient archives of the mythical fruits of the sea, categorized by mystical classes.
                      </p>
                    </div>

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

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {DEVIL_FRUITS_DB.map((fruit, idx) => (
                      <DevilFruitCard key={idx} fruit={fruit} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* VIEW 4: FULLSCREEN ISLAND DOSSIER VIEW */}
              {currentTab === 'island-dossier' && (
                <motion.div
                  key="island-dossier"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <IslandDossierView
                    island={activeIsland}
                    allCharacters={CHARACTERS_DB}
                    allFruits={DEVIL_FRUITS_DB}
                    onBack={() => setCurrentTab('map')}
                    onCharacterSelect={(char) => setSpotlightCharacter(char)}
                    onPrevIsland={handlePrevIsland}
                    onNextIsland={handleNextIsland}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        )}
      </div>



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
              <div className="border-b border-white/10 pb-3 mb-3 pr-12">
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
