export type FactionType = 
  | 'StrawHats' 
  | 'WorstGeneration' 
  | 'SevenWarlords' 
  | 'RevolutionaryArmy' 
  | 'NavyAdmirals' 
  | 'Yonko';

export interface BountyHistoryEntry {
  arc: string;
  amount: string; // formatted with Berries e.g. "30,000,000 ฿"
}

export interface Character {
  id: string;
  name: string;
  epithet: string;
  role: string;
  bounty?: string; // Current bounty description
  bountyValue?: number; // For numerical sorting/comparisons
  bountyHistory?: BountyHistoryEntry[];
  dream?: string;
  abilities: string[];
  haki: string[];
  backstorySummary: string;
  image: string; // high-quality visual representation URL or thematic style
  quote?: string;
  faction: FactionType;
  status?: string; // e.g., "Active", "Retired", "Revoked", "Imprisoned", "Deceased", "Left"
  alliance?: string;
  crewName?: string;
  imageAlign?: string; // e.g., "top", "center 15%" to position face correctly in poster crop
  // Special Navy Admiral details:
  justicePhilosophy?: string;
  crossGuildStars?: number; // stars/crowns value
  crossGuildBounty?: string; // Cross Guild bounty representation
}

export type DevilFruitType = 'Paramecia' | 'Zoan' | 'Ancient Zoan' | 'Mythical Zoan' | 'Logia';

export interface DevilFruit {
  name: string;
  japaneseName?: string;
  type: DevilFruitType;
  currentHolder: string;
  abilitiesDescription: string;
  awakeningStatus: 'Unknown' | 'Not Awakened' | 'Awakened' | 'N/A';
  color: string; // Tailwind glow-color or hex
  svgPreset: string; // name of decorative vector representation
}

export interface KeyBattle {
  combatants1: string; // e.g. "Luffy (Gear 2/3)"
  combatants2: string; // e.g. "Rob Lucci"
  victor: string;
  details: string;
}

export interface BountyUpdateEvent {
  characterName: string;
  previousBounty: string;
  newBounty: string;
}

export interface Island {
  id: string; // e.g. "foosha-village", "alabasta"
  name: string;
  arcName: string;
  villainName: string;
  villainPoster: string; // image of villain or symbol
  description: string; // short summary
  synopsis: string; // detailed summary
  chronologicalOrder: number;
  coordinates: { x: number; y: number }; // Relative percentage coordinates for dynamic grand line canvas mapping
  marineControlLevel: 'None' | 'Low' | 'Medium' | 'High' | 'Absolute';
  islandTheme: string; // e.g. "Winter Island", "Sky Island", "Desert Island"
  headerImage: string; // Cinematic high-res background
  characterRoster: string[]; // names of major characters involved
  devilFruitsInvolved: string[]; // Names of devil fruits appearing/used here
  keyBattles: KeyBattle[];
  bountyUpdates: BountyUpdateEvent[];
}
