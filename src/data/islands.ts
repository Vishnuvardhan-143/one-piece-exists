import { Island } from '../types';

export const ISLANDS_DB: Island[] = [
  {
    id: "foosha-village",
    name: "Foosha Village",
    arcName: "Romance Dawn",
    villainName: "Higuma & Lord of the Coast",
    villainPoster: "/images/bounty_posters/Higuma_Bounty_Poster.png",
    description: "The humble peaceful island where Luffy's journey first ignited, inspired by the pirate Shanks.",
    synopsis: "The birthplace of Monkey D. Luffy. He eats the Gomu Gomu no Mi by accident. Inspired by Red-Haired Shanks, who sacrifices his arm to a Sea King to protect him, Luffy swears to seek the One Piece and departs years later equipped with Shanks' signature straw hat.",
    chronologicalOrder: 1,
    coordinates: { x: 3, y: 75 },
    marineControlLevel: "Low",
    islandTheme: "Peaceful Windmill Village",
    headerImage: "/images/islands/foosha-village.png",
    characterRoster: ["Monkey D. Luffy", "Shanks"],
    devilFruitsInvolved: ["Gomu Gomu no Mi (Hito Hito no Mi, Model: Nika)"],
    keyBattles: [
      {
        combatants1: "Shanks & Red Hair Pirates",
        combatants2: "Higuma the Bandit",
        victor: "Shanks",
        details: "Higuma holds Luffy as hostage in open sea. Shanks scares away the beast 'Lord of the Coast' with a conqueror's glare, losing his left arm."
      }
    ],
    bountyUpdates: []
  },
  {
    id: "orange-town",
    name: "Orange Town",
    arcName: "Orange Town Arc",
    villainName: "Buggy the Clown",
    villainPoster: "/images/bounty_posters/Buggys_Wanted_Poster.png",
    description: "An abandoned small harbor town occupied by Buggy's whimsical pirate group.",
    synopsis: "Luffy meets the clever navigator Nami and clashes with the flashy pirate Captain Buggy. Working with Zoro, they coordinate to defeat the Buggy Pirates, reclaim stolen treasure maps, and defend pet dog Chouchou's loyalty.",
    chronologicalOrder: 2,
    coordinates: { x: 7, y: 68 },
    marineControlLevel: "None",
    islandTheme: "Harbor Port Town",
    headerImage: "/images/islands/orange-town.png",
    characterRoster: ["Monkey D. Luffy", "Roronoa Zoro", "Nami", "Buggy the Clown"],
    devilFruitsInvolved: ["Bara Bara no Mi (Chop-Chop Fruit)"],
    keyBattles: [
      {
        combatants1: "Luffy & Zoro",
        combatants2: "Buggy the Clown",
        victor: "Luffy & Zoro",
        details: "Luffy ties Buggy's disconnected floating body parts together except his head, hands, and feet, shooting him far into the horizon."
      }
    ],
    bountyUpdates: []
  },
  {
    id: "syrup-village",
    name: "Syrup Village",
    arcName: "Syrup Village Arc",
    villainName: "Captain Kuro",
    villainPoster: "/images/bounty_posters/Kuros_Wanted_Poster.png",
    description: "A small quiet residential island where Luffy meets Usopp and defends sick Kaya.",
    synopsis: "The Straw Hats arrive to find a deceptive plan engineered by Captain Kuro, posing as Kaya's loyal butler Klahadore. Luffy and crew partner with Usopp and the Usopp Pirates to defend the island, securing the legend-class caravel Going Merry.",
    chronologicalOrder: 3,
    coordinates: { x: 10, y: 75 },
    marineControlLevel: "Low",
    islandTheme: "Lush Countryside Village",
    headerImage: "/images/islands/syrup-village.png",
    characterRoster: ["Monkey D. Luffy", "Roronoa Zoro", "Nami", "Usopp"],
    devilFruitsInvolved: ["Gomu Gomu no Mi (Hito Hito no Mi, Model: Nika)"],
    keyBattles: [
      {
        combatants1: "Luffy & Usopp",
        combatants2: "Captain Kuro",
        victor: "Luffy",
        details: "Clashing with Kuro's blindingly fast Shakushi claw attacks, Luffy pins him down with his elastic body and finishes him with a heavy header."
      }
    ],
    bountyUpdates: []
  },
  {
    id: "baratie",
    name: "Baratie",
    arcName: "Baratie Arc",
    villainName: "Don Krieg",
    villainPoster: "/images/bounty_posters/Kriegs_Wanted_Poster.png",
    description: "The grand floating restaurant ship operated by crimson cook Red-Legged Zeff.",
    synopsis: "Looking for a ship cook, Luffy visits Baratie and encounters Sanji. The restaurant ship is suddenly invaded by the defeated armada of Don Krieg fleeing the Grand Line. Zoro also fights Dracule Mihawk, suffering a devastating yet inspiring defeat.",
    chronologicalOrder: 4,
    coordinates: { x: 13, y: 65 },
    marineControlLevel: "None",
    islandTheme: "Floating Oceanic Restaurant",
    headerImage: "/images/islands/baratie.png",
    characterRoster: ["Monkey D. Luffy", "Roronoa Zoro", "Nami", "Sanji", "Dracule Mihawk"],
    devilFruitsInvolved: ["Gomu Gomu no Mi (Hito Hito no Mi, Model: Nika)"],
    keyBattles: [
      {
        combatants1: "Roronoa Zoro",
        combatants2: "Dracule Mihawk",
        victor: "Dracule Mihawk",
        details: "Zoro challenges Mihawk, who easily deflects Zoro's attacks with a toy-sized cross knife before slashing Zoro's chest using black blade Yoru in a sign of deep respect."
      },
      {
        combatants1: "Monkey D. Luffy",
        combatants2: "Don Krieg",
        victor: "Luffy",
        details: "Luffy crushes Krieg's solid iron armor and exploding spear using a creative elastic net and hammer tackle."
      }
    ],
    bountyUpdates: []
  },
  {
    id: "arlong-park",
    name: "Arlong Park",
    arcName: "Arlong Park Arc",
    villainName: "Arlong",
    villainPoster: "/images/bounty_posters/Arlongs_Wanted_Poster.png",
    description: "The ocean fortress of the fish-man tyrant Arlong with deep architectural ties.",
    synopsis: "The crew discovers Nami's hidden tragic slavery under Arlong. Triggered by Nami sobbing and asking for help, Luffy leads the crew to smash Arlong's fish-man base into rubble, freeing Nami and hiring her permanently as the ship navigator.",
    chronologicalOrder: 5,
    coordinates: { x: 17, y: 73 },
    marineControlLevel: "Medium",
    islandTheme: "Tropical Resort Fortress",
    headerImage: "/images/islands/arlong-park.png",
    characterRoster: ["Monkey D. Luffy", "Roronoa Zoro", "Nami", "Usopp", "Sanji"],
    devilFruitsInvolved: ["Gomu Gomu no Mi (Hito Hito no Mi, Model: Nika)"],
    keyBattles: [
      {
        combatants1: "Monkey D. Luffy",
        combatants2: "Arlong",
        victor: "Luffy",
        details: "Luffy stretches his arm skyward, bringing down a colossal Gomu Gomu no Battle Axe that breaks through the roof and crashes Arlong down into the basement."
      }
    ],
    bountyUpdates: [
      { characterName: "Monkey D. Luffy", previousBounty: "0 ฿", newBounty: "30,000,000 ฿" }
    ]
  },
  {
    id: "loguetown",
    name: "Loguetown",
    arcName: "Loguetown Arc",
    villainName: "Captain Smoker & Buggy",
    villainPoster: "/images/bounty_posters/Buggys_Wanted_Poster.png",
    description: "The fabled town of the beginning and end, where Pirate King Roger was born and executed.",
    synopsis: "The Straw Hats dock here to purchase supplies for the Grand Line. Luffy is trapped on the execution scaffold by Buggy, escaping only via a miraculous bolt of lightning. Smoker attacks Luffy, who is rescued by the phantom presence of Monkey D. Dragon.",
    chronologicalOrder: 6,
    coordinates: { x: 21, y: 65 },
    marineControlLevel: "High",
    islandTheme: "Historic Naval Port City",
    headerImage: "/images/islands/loguetown.png",
    characterRoster: ["Monkey D. Luffy", "Roronoa Zoro", "Nami", "Usopp", "Sanji", "Buggy the Clown", "Monkey D. Dragon"],
    devilFruitsInvolved: ["Bara Bara no Mi (Chop-Chop Fruit)"],
    keyBattles: [
      {
        combatants1: "Monkey D. Luffy",
        combatants2: "Smoker",
        victor: "Smoker",
        details: "Smoker's smoke body nullifies Luffy's physical attacks, pinning him down effortlessly before Dragon steps in."
      }
    ],
    bountyUpdates: []
  },
  {
    id: "reverse-mountain",
    name: "Reverse Mountain",
    arcName: "Reverse Mountain Arc",
    villainName: "The Winding Rapids",
    villainPoster: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=150&q=80",
    description: "A monumental entry point where ocean currents defy gravity to scale the Red Line.",
    synopsis: "The Going Merry sails backwards up the mountain coordinates. At the exit gate, they collide safely with Laboon, a massive island-whale guarding the entry checkpoint, meeting lighthouse keeper Crocus and starting their log pose path.",
    chronologicalOrder: 7,
    coordinates: { x: 26, y: 60 },
    marineControlLevel: "None",
    islandTheme: "Colossal Red Rock Waterways",
    headerImage: "/images/islands/reverse-mountain.png",
    characterRoster: ["Monkey D. Luffy", "Roronoa Zoro", "Nami", "Usopp", "Sanji"],
    devilFruitsInvolved: [],
    keyBattles: [
      {
        combatants1: "Monkey D. Luffy",
        combatants2: "Laboon the Whale",
        victor: "Draw",
        details: "Luffy rams the ship mast into Laboon's head, stating they have an unfinished battle to motivate the whale to survive and wait for their return."
      }
    ],
    bountyUpdates: []
  },
  {
    id: "whiskey-peak",
    name: "Whiskey Peak",
    arcName: "Whiskey Peak Arc",
    villainName: "Baroque Works Agents",
    villainPoster: "/images/bounty_posters/Galdinos_Wanted_Poster.png",
    description: "An island decorated with giant cactus columns serving as a welcoming bounty hunter trap.",
    synopsis: "The crew receives a deceptive royal treatment, only for Zoro to systematically defeat 100 Baroque Works agents in the dark. They discover Princess Vivi's identity undercover and agree to escort her to rescue her homeland Alabasta.",
    chronologicalOrder: 8,
    coordinates: { x: 29, y: 55 },
    marineControlLevel: "None",
    islandTheme: "Cactus-Themed Outlaw Peak",
    headerImage: "/images/islands/whiskey-peak.png",
    characterRoster: ["Monkey D. Luffy", "Roronoa Zoro", "Nico Robin"],
    devilFruitsInvolved: ["Hana Hana no Mi (Flower-Flower Fruit)"],
    keyBattles: [
      {
        combatants1: "Roronoa Zoro",
        combatants2: "100 Baroque Works Agents",
        victor: "Roronoa Zoro",
        details: "Zoro uses his rapid steel cutting techniques to slice through waves of mercenaries under the silent night stars."
      }
    ],
    bountyUpdates: []
  },
  {
    id: "little-garden",
    name: "Little Garden",
    arcName: "Little Garden Arc",
    villainName: "Mr. 3 (Galdino)",
    villainPoster: "/images/bounty_posters/Galdinos_Wanted_Poster.png",
    description: "A colossal untamed prehistoric island inhabited by deep-sea dinosaurs and giants.",
    synopsis: "The Straw Hats meet the ancient giant duelists Dorry and Brogy. Baroque Works agents, led by Mr. 3, use wax powers to intervene in the giant's fair combat, triggering a furious battle where Luffy smashes the candles.",
    chronologicalOrder: 9,
    coordinates: { x: 32, y: 48 },
    marineControlLevel: "None",
    islandTheme: "Prehistoric Wilderness",
    headerImage: "/images/islands/little-garden.png",
    characterRoster: ["Monkey D. Luffy", "Roronoa Zoro", "Nami", "Usopp", "Sanji"],
    devilFruitsInvolved: ["Gomu Gomu no Mi (Hito Hito no Mi, Model: Nika)"],
    keyBattles: [
      {
        combatants1: "Monkey D. Luffy & Usopp",
        combatants2: "Mr. 3",
        victor: "Luffy",
        details: "Luffy sees through the realistic wax replicas, smelling the true Mr. 3 out, and smashing his wax defenses using a giant burning hammer."
      }
    ],
    bountyUpdates: []
  },
  {
    id: "drum-island",
    name: "Drum Island",
    arcName: "Drum Island Arc",
    villainName: "Wapol",
    villainPoster: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=150&q=80",
    description: "A beautiful winter wonderland marked by towering drum cylindrical peaks.",
    synopsis: "The crew attempts to seek clinical treatment for a severe tropical flu afflicting Nami. Carrying her up freezing drum summits, Luffy reaches Dr. Kureha, recruiting the brilliant blue-nosed doctor-reindeer Tony Tony Chopper.",
    chronologicalOrder: 10,
    coordinates: { x: 35, y: 56 },
    marineControlLevel: "Low",
    islandTheme: "Frigid Snowy Mountains",
    headerImage: "/images/islands/drum-island.png",
    characterRoster: ["Monkey D. Luffy", "Nami", "Sanji", "Tony Tony Chopper"],
    devilFruitsInvolved: ["Hito Hito no Mi (Human-Human Fruit)"],
    keyBattles: [
      {
        combatants1: "Monkey D. Luffy",
        combatants2: "Wapol",
        victor: "Luffy",
        details: "Wapol tries to eat the castle cannons. Luffy blasts him with a severe Gomu Gomu no Bazooka, catapulting him far into the open ocean."
      }
    ],
    bountyUpdates: []
  },
  {
    id: "alabasta",
    name: "Alabasta",
    arcName: "Alabasta Arc",
    villainName: "Sir Crocodile & Baroque Works",
    villainPoster: "/images/bounty_posters/Crocodiles_Wanted_Poster.png",
    description: "A majestic golden desert empire bordering on violent rebel wars.",
    synopsis: "Luffy leads the Straw Hats to dismantle Sir Crocodile's coup. Traversing harsh desert heats, Luffy faces Crocodile three distinct times. Utilizing water and blood to bypass the sand-man's defenses, he launches Crocodile through solid stone, ending the sand-dictatorship. Vivi steps back to rule, and Nico Robin joins the crew.",
    chronologicalOrder: 11,
    coordinates: { x: 39, y: 48 },
    marineControlLevel: "Medium",
    islandTheme: "Immense Desert Kingdom",
    headerImage: "/images/islands/alabasta.png",
    characterRoster: ["Monkey D. Luffy", "Roronoa Zoro", "Nami", "Usopp", "Sanji", "Tony Tony Chopper", "Sir Crocodile", "Nico Robin"],
    devilFruitsInvolved: [
      "Suna Suna no Mi (Sand-Sand Fruit)",
      "Hana Hana no Mi (Flower-Flower Fruit)",
      "Gomu Gomu no Mi (Hito Hito no Mi, Model: Nika)"
    ],
    keyBattles: [
      {
        combatants1: "Monkey D. Luffy",
        combatants2: "Sir Crocodile",
        victor: "Luffy",
        details: "Luffy uses his own blood to saturate Crocodile's sand form, carrying out a majestic Gomu Gomu no Storm upwards through the royal catacombs."
      },
      {
        combatants1: "Roronoa Zoro",
        combatants2: "Mr. 1 (Daz Bonez)",
        victor: "Roronoa Zoro",
        details: "Zoro learns to 'breathe the rhythm of steel' to match Mr. 1's steel body, releasing a singular decisive Shishi Sonson draw strike."
      }
    ],
    bountyUpdates: [
      { characterName: "Monkey D. Luffy", previousBounty: "30,000,000 ฿", newBounty: "100,000,000 ฿" },
      { characterName: "Roronoa Zoro", previousBounty: "0 ฿", newBounty: "60,000,000 ฿" }
    ]
  },
  {
    id: "jaya",
    name: "Jaya",
    arcName: "Jaya Arc",
    villainName: "Bellamy the Hyena",
    villainPoster: "/images/bounty_posters/Bellamys_Wanted_Poster.png",
    description: "A lawless outlaw island where mock pirates ridicule dreams of sky islands.",
    synopsis: "The Straw Hats research a legendary island in the clouds. Luffy meets Blackbeard, who delivers a legendary speech on dreams, and punches Bellamy the Hyena with a single, devastating hit to reclaim stolen gold.",
    chronologicalOrder: 12,
    coordinates: { x: 42, y: 42 },
    marineControlLevel: "None",
    islandTheme: "Outlaw Tropical Port",
    headerImage: "/images/islands/jaya.png",
    characterRoster: ["Monkey D. Luffy", "Roronoa Zoro", "Marshall D. Teach", "Sir Crocodile"],
    devilFruitsInvolved: ["Gomu Gomu no Mi (Hito Hito no Mi, Model: Nika)"],
    keyBattles: [
      {
        combatants1: "Monkey D. Luffy",
        combatants2: "Bellamy the Hyena",
        victor: "Luffy",
        details: "Bellamy bounces rapidly with spring power. Luffy stands still, delivering a singular classic heavy punch that leaves Bellamy's face imprinted to the soil."
      }
    ],
    bountyUpdates: []
  },
  {
    id: "skypeia",
    name: "Skypeia",
    arcName: "Skypeia Arc",
    villainName: "God Enel",
    villainPoster: "https://images.unsplash.com/photo-160a256614131-41f2ff2ae8ec?auto=format&fit=crop&w=150&q=80",
    description: "A beautiful celestial paradise in the clouds operated by Enel's absolute lightning dictat.",
    synopsis: "Riding the vertical Knock Up Stream, the crew arrives in Skypeia. They discover Shandian ruins of gold, and Luffy battles the arrogant 'God' Enel. Being a rubber-man, Luffy is naturally immune to Enel's high-voltage lightning, enabling him to ring the golden bell to prove Skypeia's dreams are real.",
    chronologicalOrder: 13,
    coordinates: { x: 42, y: 25 },
    marineControlLevel: "None",
    islandTheme: "Angelic Sky Island",
    headerImage: "/images/islands/skypeia.png",
    characterRoster: ["Monkey D. Luffy", "Roronoa Zoro", "Nami", "Usopp", "Sanji", "Tony Tony Chopper", "Nico Robin"],
    devilFruitsInvolved: [
      "Gomu Gomu no Mi (Hito Hito no Mi, Model: Nika)",
      "Goro Goro no Mi (Rumble-Rumble Fruit)",
      "Hana Hana no Mi (Flower-Flower Fruit)"
    ],
    keyBattles: [
      {
        combatants1: "Monkey D. Luffy",
        combatants2: "Enel",
        victor: "Luffy",
        details: "Enel experiences his first ever face-shock when lightning fails against Luffy. Luffy rings the massive golden bell using a giant golden sphere attached to his arm."
      }
    ],
    bountyUpdates: []
  },
  {
    id: "long-ring-long-land",
    name: "Long Ring Long Land",
    arcName: "Long Ring Long Land Arc",
    villainName: "Foxy the Silver Fox",
    villainPoster: "/images/bounty_posters/Foxys_Wanted_Poster.png",
    description: "A grassy ring of islands where all life is comically stretched long.",
    synopsis: "The crew is dragged into a Davy Back Fight game challenges by the Foxy Pirates, risking crew members. They exit victoriously only to face Admiral Aokiji, who easily freezes Luffy, demonstrating the massive navy gap.",
    chronologicalOrder: 14,
    coordinates: { x: 46, y: 46 },
    marineControlLevel: "Low",
    islandTheme: "Vast Comical Grassland",
    headerImage: "/images/islands/long-ring-long-land.png",
    characterRoster: ["Monkey D. Luffy", "Roronoa Zoro", "Nami", "Usopp", "Sanji", "Kuzan (Aokiji)"],
    devilFruitsInvolved: ["Hie Hie no Mi (Ice-Ice Fruit)"],
    keyBattles: [
      {
        combatants1: "Monkey D. Luffy",
        combatants2: "Foxy the Silver Fox",
        victor: "Luffy",
        details: "In a bizarre Afro hair afro-boxing matchup, Luffy out-wits Foxy's slowing beams using mirrors, punching him out."
      },
      {
        combatants1: "Monkey D. Luffy",
        combatants2: "Kuzan (Aokiji)",
        victor: "Kuzan (Aokiji)",
        details: "Aokiji effortlessly counters Luffy's strikes, freezing his entire physical frame to solid ice."
      }
    ],
    bountyUpdates: []
  },
  {
    id: "water-7",
    name: "Water 7",
    arcName: "Water 7 Arc",
    villainName: "CP9 Undercover Agents",
    villainPoster: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=150&q=80",
    description: "A spectacular canal metropolis built on overlapping tiers of shipyards.",
    synopsis: "The Going Merry is proclaimed structurally un-fixable. Usopp, outraged, duels Luffy and leaves the crew. CP9 agents kidnap Robin, blackmailing her into absolute submission. Luffy resolves to track them to Enies Lobby, forging an alliance with cyborg shipwright Franky.",
    chronologicalOrder: 15,
    coordinates: { x: 50, y: 43 },
    marineControlLevel: "High",
    islandTheme: "Aquatic Canal Metropolis",
    headerImage: "/images/islands/water-7.png",
    characterRoster: ["Monkey D. Luffy", "Roronoa Zoro", "Nami", "Usopp", "Sanji", "Franky", "Nico Robin"],
    devilFruitsInvolved: [
      "Hana Hana no Mi (Flower-Flower Fruit)",
      "Gomu Gomu no Mi (Hito Hito no Mi, Model: Nika)"
    ],
    keyBattles: [
      {
        combatants1: "Monkey D. Luffy",
        combatants2: "Usopp",
        victor: "Luffy",
        details: "Usopp delivers a heart-wrenching tactical fight using smoke, spikes, and dials. Luffy tearfully finishes him with a heavy tackle."
      }
    ],
    bountyUpdates: []
  },
  {
    id: "enies-lobby",
    name: "Enies Lobby",
    arcName: "Enies Lobby Arc",
    villainName: "Rob Lucci & CP9",
    villainPoster: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=150&q=80",
    description: "The fabled judicial island of the World Government directly above the Gates of Justice.",
    synopsis: "The Straw Hats storm Enies Lobby to rescue Nico Robin. Handing Sogeking orders to burn down the World Government flag, Luffy demands Robin express her will. Robin screams 'I Want to Live!' Luffy unleashes Gear Second and Third, and Zoro defeats Kaku. The Going Merry arrives as a ghostly ship to lift them from the smoking ashes of a Buster Call destruction.",
    chronologicalOrder: 16,
    coordinates: { x: 52, y: 35 },
    marineControlLevel: "Absolute",
    islandTheme: "Imperial Judicial Island Fortress",
    headerImage: "/images/islands/enies-lobby.png",
    characterRoster: ["Monkey D. Luffy", "Roronoa Zoro", "Nami", "Usopp", "Sanji", "Tony Tony Chopper", "Nico Robin", "Franky"],
    devilFruitsInvolved: [
      "Gomu Gomu no Mi (Hito Hito no Mi, Model: Nika)",
      "Hana Hana no Mi (Flower-Flower Fruit)",
      "Hito Hito no Mi (Human-Human Fruit)"
    ],
    keyBattles: [
      {
        combatants1: "Monkey D. Luffy (Gear 2nd/3rd)",
        combatants2: "Rob Lucci",
        victor: "Luffy",
        details: "Luffy stands firm against Lucci's ultimate Rokuogan impact shockwaves, blasting him with Gomu Gomu no Jet Gatling in Gear 2nd."
      }
    ],
    bountyUpdates: [
      { characterName: "Monkey D. Luffy", previousBounty: "100,000,000 ฿", newBounty: "300,000,000 ฿" },
      { characterName: "Roronoa Zoro", previousBounty: "60,000,000 ฿", newBounty: "120,000,000 ฿" },
      { characterName: "Nico Robin", previousBounty: "79,000,000 ฿", newBounty: "80,000,000 ฿" },
      { characterName: "Franky", previousBounty: "0 ฿", newBounty: "44,000,000 ฿" },
      { characterName: "Sanji", previousBounty: "0 ฿", newBounty: "77,000,000 ฿" },
      { characterName: "Usopp (as Sogeking)", previousBounty: "0 ฿", newBounty: "30,000,000 ฿" },
      { characterName: "Nami", previousBounty: "0 ฿", newBounty: "16,000,000 ฿" },
      { characterName: "Tony Tony Chopper", previousBounty: "0 ฿", newBounty: "50 ฿" }
    ]
  },
  {
    id: "thriller-bark",
    name: "Thriller Bark",
    arcName: "Thriller Bark Arc",
    villainName: "Gecko Moria",
    villainPoster: "/images/bounty_posters/Gecko_Morias_Wanted_Poster.png",
    description: "A gigantic pirate-ship island drifting in the creepy cover of the Florian Triangle.",
    synopsis: "The crew encounters Brook and is trapped inside Thriller Bark. Gecko Moria steals their shadows to power giant zombie Oars. Luffy uses Nightmare form, and Zoro survives Bartholomew Kuma's devastating shock-expulsion to collect Luffy's agonizing physical fatigue ('Nothing Happened').",
    chronologicalOrder: 17,
    coordinates: { x: 56, y: 45 },
    marineControlLevel: "None",
    islandTheme: "Gothic Halloween Mansion Ship",
    headerImage: "/images/islands/thriller-bark.png",
    characterRoster: ["Monkey D. Luffy", "Roronoa Zoro", "Gecko Moria", "Bartholomew Kuma", "Brook"],
    devilFruitsInvolved: [
      "Yomi Yomi no Mi (Revive-Revive Fruit)",
      "Nikyu Nikyu no Mi (Paw-Paw Fruit)",
      "Kage Kage no Mi (Shadow-Shadow Fruit)"
    ],
    keyBattles: [
      {
        combatants1: "Roronoa Zoro",
        combatants2: "Bartholomew Kuma",
        victor: "Bartholomew Kuma",
        details: "Zoro agrees to sacrifice his body to absorb Luffy's entire accumulated battle fatigue, standing in blood stating 'Nothing Happened' to save his crew."
      }
    ],
    bountyUpdates: []
  },
  {
    id: "sabaody-archipelago",
    name: "Sabaody Archipelago",
    arcName: "Sabaody Archipelago",
    villainName: "Admiral Kizaru & Sentomaru",
    villainPoster: "https://images.unsplash.com/photo-1525498128493-380d1990a112?auto=format&fit=crop&w=150&q=80",
    description: "A shining mangrove forest where resinous bubbles float in the air.",
    synopsis: "Connecting with Silvers Rayleigh to coat the Thousand Sunny. To avenge fishman Hachi, Luffy punches a Celestial Dragon in the auction house. Admiral Kizaru descends, and Bartholomew Kuma uses his paws to separate and scatter the Straw Hat crew across the globe, rescuing them from certain death.",
    chronologicalOrder: 18,
    coordinates: { x: 60, y: 40 },
    marineControlLevel: "High",
    islandTheme: "Bubble-Blowing Mangrove Trees",
    headerImage: "/images/islands/sabaody-archipelago.png",
    characterRoster: ["Monkey D. Luffy", "Roronoa Zoro", "Borsalino (Kizaru)", "Bartholomew Kuma", "Eustass Kid", "Trafalgar D. Water Law"],
    devilFruitsInvolved: [
      "Pika Pika no Mi (Glint-Glint Fruit)",
      "Ope Ope no Mi (Op-Op Fruit)",
      "Nikyu Nikyu no Mi (Paw-Paw Fruit)"
    ],
    keyBattles: [
      {
        combatants1: "Monkey D. Luffy",
        combatants2: "Celestial Dragon Charlos",
        victor: "Luffy",
        details: "Charlos shoots Luffy's friend. Luffy delivers an incredibly satisfying punch that reverts the scene to pure black-and-white manga styling."
      }
    ],
    bountyUpdates: []
  },
  {
    id: "amazon-lily",
    name: "Amazon Lily",
    arcName: "Amazon Lily Arc",
    villainName: "Boa Hancock",
    villainPoster: "/images/bounty_posters/Hancocks_Wanted_Poster.png",
    description: "The isolated empire of the warrior Kuja tribe in the Calm Belt.",
    synopsis: "Luffy is teleported here by Kuma. Captured as the first man to ever enter, Luffy gains Hancock's trust through his profound selfless nature, prompting the Pirate Empress to fall madly in love with him.",
    chronologicalOrder: 19,
    coordinates: { x: 58, y: 60 },
    marineControlLevel: "None",
    islandTheme: "Isolated Ancient China Valley",
    headerImage: "/images/islands/amazon-lily.png",
    characterRoster: ["Monkey D. Luffy", "Boa Hancock"],
    devilFruitsInvolved: ["Mero Mero no Mi (Love-Love Fruit)"],
    keyBattles: [
      {
        combatants1: "Monkey D. Luffy",
        combatants2: "Boa Sandersonia & Marigold",
        victor: "Luffy",
        details: "Luffy unleashes Conqueror's Haki unconsciously, and protects his enemies' slave marks on their backs from being viewed by the arena crowd."
      }
    ],
    bountyUpdates: []
  },
  {
    id: "impel-down",
    name: "Impel Down",
    arcName: "Impel Down Arc",
    villainName: "Chief Warden Magellan",
    villainPoster: "https://images.unsplash.com/photo-1599831001554-940026e6d1e4?auto=format&fit=crop&w=150&q=80",
    description: "The subterranean deep-sea high security prison of the World Government.",
    synopsis: "Luffy infiltrates the ocean prison to save Ace. Sufferings poisonings, he recruits former enemies Buggy, Crocodile, and fish-man Jinbe to stage a massive prison riot, escaping with hundreds of prisoners before chief warden Magellan can seal the doors.",
    chronologicalOrder: 20,
    coordinates: { x: 62, y: 55 },
    marineControlLevel: "Absolute",
    islandTheme: "Underwater Subterranean Hell",
    headerImage: "/images/islands/impel-down.png",
    characterRoster: ["Monkey D. Luffy", "Sir Crocodile", "Emporio Ivankov", "Jinbe", "Buggy the Clown"],
    devilFruitsInvolved: [
      "Suna Suna no Mi (Sand-Sand Fruit)",
      "Bara Bara no Mi (Chop-Chop Fruit)"
    ],
    keyBattles: [
      {
        combatants1: "Monkey D. Luffy",
        combatants2: "Magellan (Poison Warden)",
        victor: "Magellan",
        details: "Magellan floods the corridors with acidic poison, completely shutting down Luffy's close combat maneuvers and leaving him near-death."
      }
    ],
    bountyUpdates: []
  },
  {
    id: "marineford",
    name: "Marineford",
    arcName: "Marineford Arc",
    villainName: "Fleet Admiral Sengoku & Admirals",
    villainPoster: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=150&q=80",
    description: "The massive fortress city of the Marine Headquarters, site of the war of the best.",
    synopsis: "The largest battle of the pirate age. Luffy joins Whitebeard's force to save Ace. Luffy scales the execution base, freeing Ace. However, Admiral Akainu pierces through Ace's chest as he shields Luffy. Whitebeard dies standing, and Shanks' presence brings an end to the carnage.",
    chronologicalOrder: 21,
    coordinates: { x: 64, y: 34 },
    marineControlLevel: "Absolute",
    islandTheme: "Colossal Stone Fortress Harbor",
    headerImage: "/images/islands/marineford.png",
    characterRoster: [
      "Monkey D. Luffy",
      "Sengoku",
      "Sakazuki",
      "Kuzan (Aokiji)",
      "Borsalino (Kizaru)",
      "Sir Crocodile",
      "Jinbe",
      "Boa Hancock",
      "Buggy the Clown",
      "Shanks",
      "Edward Newgate",
      "Marshall D. Teach"
    ],
    devilFruitsInvolved: [
      "Gura Gura no Mi (Tremor-Tremor Fruit)",
      "Magu Magu no Mi (Mag-Mag Fruit)",
      "Hie Hie no Mi (Ice-Ice Fruit)",
      "Yami Yami no Mi (Dark-Dark Fruit)"
    ],
    keyBattles: [
      {
        combatants1: "Whitebeard & Luffy",
        combatants2: "Marine Admirals",
        victor: "Marines (Ace & Whitebeard Deceased)",
        details: "Ace sacrifices himself to shield Luffy from Akainu's magma punch. Whitebeard demolishes the navy fortress in rage before Blackbeard steals his tremor powers."
      }
    ],
    bountyUpdates: [
      { characterName: "Monkey D. Luffy", previousBounty: "300,000,000 ฿", newBounty: "400,000,000 ฿" }
    ]
  },
  {
    id: "return-to-sabaody",
    name: "Return to Sabaody",
    arcName: "Sabaody Reunion",
    villainName: "Sentomaru & Fake Straw Hats",
    villainPoster: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=150&q=80",
    description: "The bubble destination where the Straw Hats reunite after two long years.",
    synopsis: "Two years of grueling training passes. The Straw Hats gather in Sabaody. Demonstrating their newfound Haki strengths, Luffy easily evades pacifista lasers, Zoro and Sanji slash armored targets, and the crew dives to Fish-man Island.",
    chronologicalOrder: 22,
    coordinates: { x: 60, y: 42 },
    marineControlLevel: "High",
    islandTheme: "Sabaody Archipelago Resort",
    headerImage: "/images/islands/return-to-sabaody.png",
    characterRoster: ["Monkey D. Luffy", "Roronoa Zoro", "Nami", "Usopp", "Sanji", "Tony Tony Chopper", "Nico Robin", "Franky", "Brook", "Jinbe"],
    devilFruitsInvolved: ["Gomu Gomu no Mi (Hito Hito no Mi, Model: Nika)"],
    keyBattles: [
      {
        combatants1: "Luffy (Gear 2nd)",
        combatants2: "Pacifista PX-5",
        victor: "Luffy",
        details: "Luffy casually dodges a rapid barrage of light beams, destroying the cybernetic soldier with a single Haki-infused fist."
      }
    ],
    bountyUpdates: []
  },
  {
    id: "fishman-island",
    name: "Fish-Man Island",
    arcName: "Fish-Man Island Arc",
    villainName: "Hody Jones",
    villainPoster: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=150&q=80",
    description: "The beautiful utopian kingdom deep underneath the Red Line.",
    synopsis: "The Straw Hats sink 10,000 meters to reach the subsea Fish-man island. Facing a racial coup organized by Hody Jones, Luffy unleashes Conqueror's Haki to knock out 50,000 fish-man rebels instantly, promising Princess Shirahoshi to guard her safety.",
    chronologicalOrder: 23,
    coordinates: { x: 61, y: 20 },
    marineControlLevel: "Low",
    islandTheme: "Luminous Deepsea coral Realm",
    headerImage: "/images/islands/fishman-island.png",
    characterRoster: ["Monkey D. Luffy", "Roronoa Zoro", "Nami", "Sanji", "Jinbe"],
    devilFruitsInvolved: [],
    keyBattles: [
      {
        combatants1: "Monkey D. Luffy & Jinbe",
        combatants2: "Hody Jones & 100,000 Rebels",
        victor: "Luffy",
        details: "Luffy clears half the enemy army instantly with Haki, before utilizing Red Hawk fire under the sea to crush Hody's energy steroid power."
      }
    ],
    bountyUpdates: []
  },
  {
    id: "punk-hazard",
    name: "Punk Hazard",
    arcName: "Punk Hazard Arc",
    villainName: "Caesar Clown & Vergo",
    villainPoster: "/images/bounty_posters/Caesar_Clown_Bounty_Poster.png",
    description: "An island divided between scorching fire and absolute freezing ice.",
    synopsis: "Entering the New World, they land on Punk Hazard: former laboratory of Caesar Clown. Law forms a pirate alliance with Luffy to target Kaido, and they capture Caesar, who manufactures artificial SMILE fruits.",
    chronologicalOrder: 24,
    coordinates: { x: 67, y: 45 },
    marineControlLevel: "None",
    islandTheme: "Fire & Ice Hazardous wasteland",
    headerImage: "/images/islands/punk-hazard.png",
    characterRoster: ["Monkey D. Luffy", "Roronoa Zoro", "Trafalgar D. Water Law", "Smoker"],
    devilFruitsInvolved: ["Ope Ope no Mi (Op-Op Fruit)"],
    keyBattles: [
      {
        combatants1: "Trafalgar D. Water Law",
        combatants2: "Vergo (Armoured Marine)",
        victor: "Law",
        details: "Law cuts Vergo and the entire mountain laboratory layout in half, disabling the CP9 smoker connection."
      }
    ],
    bountyUpdates: []
  },
  {
    id: "dressrosa",
    name: "Dressrosa",
    arcName: "Dressrosa Arc",
    villainName: "Donquixote Doflamingo",
    villainPoster: "/images/bounty_posters/Doflamingos_Wanted_Poster.png",
    description: "A gorgeous Spanish-styled country of passion, gladiators, and toys.",
    synopsis: "The alliance sails to Dressrosa. Sabo reunites with Luffy, absorbing Ace's Mera Mera no Mi. Luffy enters Gear 4th (Bounce-Man), breaking Doflamingo's bird cage string empire. The Grand Fleet of 5,600 pirates swear allegiance to Luffy.",
    chronologicalOrder: 25,
    coordinates: { x: 72, y: 50 },
    marineControlLevel: "High",
    islandTheme: "Vibrant Spanish Toy Kingdom",
    headerImage: "/images/islands/dressrosa.png",
    characterRoster: ["Monkey D. Luffy", "Roronoa Zoro", "Donquixote Doflamingo", "Trafalgar D. Water Law", "Sabo", "Issho (Fujitora)"],
    devilFruitsInvolved: [
      "Ito Ito no Mi (String-String Fruit)",
      "Mera Mera no Mi (Flame-Flame Fruit)",
      "Ope Ope no Mi (Op-Op Fruit)",
      "Zushi Zushi no Mi (Thump-Thump Fruit)"
    ],
    keyBattles: [
      {
        combatants1: "Monkey D. Luffy (Gear 4th)",
        combatants2: "Donquixote Doflamingo",
        victor: "Luffy",
        details: "Luffy folds Doflamingo from sky-level to the earth using a majestic Gomu Gomu no King Kong Gun."
      }
    ],
    bountyUpdates: [
      { characterName: "Monkey D. Luffy", previousBounty: "400,000,000 ฿", newBounty: "500,000,000 ฿" },
      { characterName: "Roronoa Zoro", previousBounty: "120,000,000 ฿", newBounty: "320,000,000 ฿" },
      { characterName: "Trafalgar D. Water Law", previousBounty: "440,000,000 ฿", newBounty: "500,000,000 ฿" },
      { characterName: "Franky", previousBounty: "44,000,000 ฿", newBounty: "94,000,000 ฿" },
      { characterName: "Sanji", previousBounty: "77,000,000 ฿", newBounty: "177,000,000 ฿" },
      { characterName: "Usopp", previousBounty: "30,000,000 ฿", newBounty: "200,000,000 ฿" },
      { characterName: "Nami", previousBounty: "16,000,000 ฿", newBounty: "66,000,000 ฿" },
      { characterName: "Tony Tony Chopper", previousBounty: "50 ฿", newBounty: "100 ฿" },
      { characterName: "Nico Robin", previousBounty: "80,000,000 ฿", newBounty: "130,000,000 ฿" },
      { characterName: "Brook", previousBounty: "33,000,000 ฿", newBounty: "83,000,000 ฿" }
    ]
  },
  {
    id: "zou",
    name: "Zou",
    arcName: "Zou Arc",
    villainName: "Jack the Drought",
    villainPoster: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=150&q=80",
    description: "An ancient country situated on the back of a colossal walking elephant.",
    synopsis: "The crew boards Zunisha, the 1000-year-old elephant. They discover the Mink tribe, devastated by Jack's poison gas. Learning Sanji was blackmailed into marrying Big Mom's daughter, Luffy forms a ninja-pirate-mink-samurai alliance.",
    chronologicalOrder: 26,
    coordinates: { x: 77, y: 42 },
    marineControlLevel: "None",
    islandTheme: "Ancient Forest on Elephant Back",
    headerImage: "/images/islands/zou.png",
    characterRoster: ["Monkey D. Luffy", "Nami", "Sanji", "Nico Robin"],
    devilFruitsInvolved: [],
    keyBattles: [
      {
        combatants1: "Mink Tribe (Inuarashi & Nekomamushi)",
        combatants2: "Jack the Drought",
        victor: "Draw (Jack relies on gas poison)",
        details: "Minks rotate day and night squads to fight Jack, demonstrating exceptional high endurance."
      }
    ],
    bountyUpdates: []
  },
  {
    id: "whole-cake-island",
    name: "Whole Cake Island",
    arcName: "Whole Cake Island",
    villainName: "Big Mom & Katakuri",
    villainPoster: "/images/bounty_posters/Charlotte_Linlin_Wanted_Poster.png",
    description: "An archipelago of desserts controlled by Big Mom's sweet officers.",
    synopsis: "Luffy infiltrates Totto Land to recover Sanji. Fighting the Sweet Commander Katakuri inside the Mirror World, Luffy advances his Observation Haki to see the future. He crashes the wedding and escapes, proclaimed as the Fifth Emperor.",
    chronologicalOrder: 27,
    coordinates: { x: 82, y: 50 },
    marineControlLevel: "Low",
    islandTheme: "Candy/Sweet Archipelago",
    headerImage: "/images/islands/whole-cake-island.png",
    characterRoster: ["Monkey D. Luffy", "Nami", "Sanji", "Tony Tony Chopper", "Brook", "Jinbe", "Charlotte Linlin", "Capone Bege"],
    devilFruitsInvolved: [
      "Soru Soru no Mi (Soul-Soul Fruit)",
      "Gomu Gomu no Mi (Hito Hito no Mi, Model: Nika)"
    ],
    keyBattles: [
      {
        combatants1: "Monkey D. Luffy",
        combatants2: "Charlotte Katakuri",
        victor: "Luffy",
        details: "A legendary 12-hour honor duel. Luffy unlocks Gear 4 Snake-Man and advanced observation, earning Katakuri's deep respect."
      }
    ],
    bountyUpdates: [
      { characterName: "Monkey D. Luffy", previousBounty: "500,000,000 ฿", newBounty: "1,500,000,000 ฿" },
      { characterName: "Sanji", previousBounty: "177,000,000 ฿", newBounty: "330,000,000 ฿" }
    ]
  },
  {
    id: "wano-country",
    name: "Wano Country",
    arcName: "Wano Country Arc",
    villainName: "Kaido & Shogun Orochi",
    villainPoster: "/images/bounty_posters/Kaidou_Wanted_Poster.png",
    description: "A gorgeous isolated samurai nation closed off from the outer world.",
    synopsis: "The alliance gathers in Wano to free it from Kaido and Orochi. After Luffy is imprisoned by Kaido, they launch the Fire Festival raid on Onigashima. Zoro defeats King, Sanji beats Queen, and Luffy awakens his fruit into Gear 5 (Nika) to defeat Kaido, freeing Wano and rising as an Emperor of the Sea.",
    chronologicalOrder: 28,
    coordinates: { x: 88, y: 42 },
    marineControlLevel: "None",
    islandTheme: "Feudal Japanese Castle Fortress",
    headerImage: "/images/islands/wano-country.png",
    characterRoster: [
      "Monkey D. Luffy",
      "Roronoa Zoro",
      "Nami",
      "Usopp",
      "Sanji",
      "Tony Tony Chopper",
      "Nico Robin",
      "Franky",
      "Brook",
      "Jinbe",
      "Kaido",
      "Eustass Kid",
      "Trafalgar D. Water Law",
      "Aramaki"
    ],
    devilFruitsInvolved: [
      "Gomu Gomu no Mi (Hito Hito no Mi, Model: Nika)",
      "Uo Uo no Mi, Model: Seiryu (Azure Dragon)",
      "Ope Ope no Mi (Op-Op Fruit)",
      "Mori Mori no Mi (Woods-Woods Fruit)"
    ],
    keyBattles: [
      {
        combatants1: "Monkey D. Luffy (Gear 5th)",
        combatants2: "Kaido (Azure Dragon)",
        victor: "Luffy",
        details: "Luffy awakens the Sun God Nika, turning the entire high-tier battlefield into rubber comedy. He absorbs lightning bolts and defeats Kaido with a gigantic Bajrang Gun fist."
      },
      {
        combatants1: "Eustass Kid & Trafalgar D. Water Law",
        combatants2: "Charlotte Linlin (Big Mom)",
        victor: "Kid & Law",
        details: "Unleashing their awakened powers, Law freezes internal sound systems and Kid launches electromagnetic beams to propel Big Mom into a magma basin."
      }
    ],
    bountyUpdates: [
      { characterName: "Monkey D. Luffy", previousBounty: "1,500,000,000 ฿", newBounty: "3,000,000,000 ฿" },
      { characterName: "Roronoa Zoro", previousBounty: "320,000,000 ฿", newBounty: "1,111,000,000 ฿" },
      { characterName: "Jinbe", previousBounty: "438,000,000 ฿", newBounty: "1,100,000,000 ฿" },
      { characterName: "Sanji", previousBounty: "330,000,000 ฿", newBounty: "1,032,000,000 ฿" },
      { characterName: "Nico Robin", previousBounty: "130,000,000 ฿", newBounty: "930,000,000 ฿" },
      { characterName: "Usopp", previousBounty: "200,000,000 ฿", newBounty: "500,000,000 ฿" },
      { characterName: "Franky", previousBounty: "94,000,000 ฿", newBounty: "394,000,000 ฿" },
      { characterName: "Brook", previousBounty: "83,000,000 ฿", newBounty: "383,000,000 ฿" },
      { characterName: "Nami", previousBounty: "66,000,000 ฿", newBounty: "366,000,000 ฿" },
      { characterName: "Tony Tony Chopper", previousBounty: "100 ฿", newBounty: "1,000 ฿" },
      { characterName: "Eustass Kid", previousBounty: "470,000,000 ฿", newBounty: "3,000,000,000 ฿" },
      { characterName: "Trafalgar D. Water Law", previousBounty: "500,000,000 ฿", newBounty: "3,000,000,000 ฿" }
    ]
  },
  {
    id: "egghead-island",
    name: "Egghead Island",
    arcName: "Egghead Arc",
    villainName: "Gorosei (Five Elders) & Admiral Kizaru",
    villainPoster: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=150&q=80",
    description: "The metallic futuristic laboratory island of Dr. Vegapunk, 500 years in the future.",
    synopsis: "The Straw Hats land on Dr. Vegapunk's science base. They discover secret history of the Void Century, while CP0 and Admiral Kizaru blockade the island. The Five Elders summon themselves inside Onigashima circle patterns. In the chaos, Vegapunk broadcasts the global-scale world flooding broadcast to the entire world, and Luffy battles Saturn and Kizaru.",
    chronologicalOrder: 29,
    coordinates: { x: 94, y: 48 },
    marineControlLevel: "Absolute",
    islandTheme: "Futuristic Cyber Laboratory",
    headerImage: "/images/islands/egghead-island.png",
    characterRoster: [
      "Monkey D. Luffy",
      "Roronoa Zoro",
      "Sanji",
      "Nico Robin",
      "Borsalino (Kizaru)",
      "Jewelry Bonney",
      "Bartholomew Kuma"
    ],
    devilFruitsInvolved: [
      "Gomu Gomu no Mi (Hito Hito no Mi, Model: Nika)",
      "Pika Pika no Mi (Glint-Glint Fruit)",
      "Toshi Toshi no Mi (Age-Age Fruit)"
    ],
    keyBattles: [
      {
        combatants1: "Monkey D. Luffy (Gear 5th)",
        combatants2: "Admiral Kizaru & Saint Jaygarcia Saturn",
        victor: "Luffy (escape secured)",
        details: "Luffy expands to giant Nika size, clapping Kizaru and Saturn in his hands like dynamic cymbals and tossing them aside to secure evac pathways."
      }
    ],
    bountyUpdates: []
  }
];
