# ☠️ One Piece Exists

> *"Wealth, Fame, Power — The man who had acquired everything in this world, the Pirate King, Gold Roger!"*

A premium, interactive One Piece encyclopedia — charting every island, bounty, devil fruit, and wanted pirate across the Grand Line. Built for die-hard fans, not just another wiki.

🌐 **Live Demo:** [one-piece-exists.vercel.app](https://one-piece-exists.vercel.app)

---

## 🗺️ Features

### 🧭 Log Path Chart
- Interactive Grand Line island map with voyage-style navigation
- Island-by-island chronological saga progression
- Battle records, bounty upgrades, and key events per arc
- Full character rosters per island

### 🏴‍☠️ Wanted Directories
- Classified bounty profiles for every major pirate & marine
- Faction filters: Straw Hats, Yonko, Warlords, Navy Admirals, Supernovas & more
- Interactive Wanted Poster cards with hover reveals
- Haki types, dream quotations, bounty history timelines
- Spotlight modal with abilities, backstory, and techniques

### 🍇 Devil Fruit Encyclopedia
- Full Devil Fruit database — Logia, Paramecia, Zoan, Mythical & Ancient
- Custom SVG icons per fruit drawn in authentic One Piece style
- Typewriter reveal of known users on hover
- Awakening status tracking
- Filter by fruit class

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite 6 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Deployment | Vercel |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Vishnuvardhan-143/one-piece-exists.git
cd one-piece-exists

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── DevilFruitCard.tsx      # Animated devil fruit card with typewriter reveal
│   ├── EncyclopediaView.tsx    # Character bounty directory with filters
│   ├── IslandDetailView.tsx    # Island arc detail with battles & characters
│   ├── IslandDossierView.tsx   # Full-screen island dossier view
│   ├── MapNavigator.tsx        # Interactive Grand Line voyage map
│   └── WantedPoster.tsx        # Classic Marine wanted poster component
├── data/
│   ├── characters.ts           # Complete character database
│   ├── fruits.ts               # Devil Fruit encyclopedia data
│   └── islands.ts              # Island arc database with battles & bounties
├── types.ts                    # TypeScript type definitions
└── App.tsx                     # Main application shell & routing
```

---

## 🌊 Data Coverage

| Category | Count |
|----------|-------|
| Islands / Arcs | 29 |
| Characters | 50+ |
| Devil Fruits | 20 |
| Factions | 8 |

---

## 🎨 Design Philosophy

Inspired by the **Marine Intelligence aesthetic** — dark navy command centre, gold accents, teal data streams. Every card, poster, and panel is designed to feel like a classified Marine dossier pulled from the depths of Marineford HQ.

Design inspirations: **Apple · Linear · Vercel · Stripe**

---

## 🏴‍☠️ Factions Covered

- 🍖 Straw Hat Pirates
- 💀 Yonko (Four Emperors)
- ⚓ Navy Admirals
- ⚔️ Seven Warlords of the Sea
- 🌀 Worst Generation / Supernovas
- 🔺 World Government
- 🎪 Baroque Works
- 🦁 Beast Pirates

---

## 📜 Lore Accuracy

All data is sourced from the original One Piece manga and anime. Bounty values, devil fruit abilities, island synopses, and character details are based on canonical material up to the **Egghead Island Arc**.

---

## 🤝 Contributing

Pull requests are welcome! If you spot a lore inaccuracy, missing character, or want to add more arcs:

1. Fork the repo
2. Create your branch: `git checkout -b feat/add-egghead-arc`
3. Commit: `git commit -m "feat: add Egghead Island arc data"`
4. Push: `git push origin feat/add-egghead-arc`
5. Open a Pull Request

---

## ⚓ Acknowledgements

- Eiichiro Oda — for creating the greatest story ever told
- The One Piece community — for keeping the flame alive
- [Lucide Icons](https://lucide.dev/) · [Framer Motion](https://www.framer.com/motion/) · [Tailwind CSS](https://tailwindcss.com/)

---

<div align="center">

**"I'm going to be King of the Pirates!"** — Monkey D. Luffy

*Made by a die-hard fan, for die-hard fans.* ☠️🌊

</div>
