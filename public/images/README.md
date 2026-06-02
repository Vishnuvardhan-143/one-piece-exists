# One Piece Grand Line Navigator — Image Assets Guide

## How to add your own images

All images go in this `/public/images/` directory. The site will automatically pick them up.

### Directory Structure:
```
/public/images/
  ├── characters/     ← Character portraits
  │   ├── luffy.png
  │   ├── zoro.png
  │   ├── nami.png
  │   ├── usopp.png
  │   ├── sanji.png
  │   ├── chopper.png
  │   ├── robin.png
  │   ├── franky.png
  │   ├── brook.png
  │   ├── jinbe.png
  │   ├── shanks.png
  │   ├── roger.png      ← THE PIRATE KING
  │   ├── whitebeard.png
  │   ├── kaido.png
  │   ├── big-mom.png
  │   ├── blackbeard.png
  │   ├── mihawk.png
  │   ├── crocodile.png
  │   ├── hancock.png
  │   ├── doflamingo.png
  │   ├── kuma.png
  │   ├── gecko-moria.png
  │   ├── weevil.png
  │   ├── akainu.png
  │   ├── aokiji.png
  │   ├── kizaru.png
  │   ├── fujitora.png
  │   ├── ryokugyu.png
  │   ├── sengoku.png
  │   ├── dragon.png
  │   ├── sabo.png
  │   ├── ivankov.png
  │   ├── koala.png
  │   └── buggy-yonko.png
  │
  ├── islands/        ← Island panorama images
  │   ├── foosha-village.jpg
  │   ├── orange-town.jpg
  │   ├── syrup-village.jpg
  │   ├── baratie.jpg
  │   ├── arlong-park.jpg
  │   ├── loguetown.jpg
  │   ├── reverse-mountain.jpg
  │   ├── whiskey-peak.jpg
  │   ├── little-garden.jpg
  │   ├── drum-island.jpg
  │   ├── alabasta.jpg
  │   ├── jaya.jpg
  │   ├── skypiea.jpg
  │   ├── long-ring-long-land.jpg
  │   ├── water-7.jpg
  │   ├── enies-lobby.jpg
  │   ├── thriller-bark.jpg
  │   ├── sabaody.jpg
  │   ├── amazon-lily.jpg
  │   ├── impel-down.jpg
  │   ├── marineford.jpg
  │   ├── return-sabaody.jpg
  │   ├── fishman-island.jpg
  │   ├── punk-hazard.jpg
  │   ├── dressrosa.jpg
  │   ├── zou.jpg
  │   ├── whole-cake-island.jpg
  │   ├── wano.jpg
  │   └── egghead.jpg
  │
  ├── fruits/         ← Devil Fruit illustrations
  │   └── [fruit-id].png (e.g., gomu-gomu.png, mera-mera.png)
  │
  └── ui/             ← UI textures and decorations
      ├── parchment-bg.jpg
      ├── map-bg.jpg
      └── jolly-roger.png
```

### Recommended Image Specs:
- **Characters**: 600x800px or higher, PNG with transparent background
- **Islands**: 1920x1080px or higher, JPG landscape format
- **Devil Fruits**: 400x400px, PNG with transparent background
- **UI Textures**: Seamless tileable, 1024x1024px minimum

### How to enable images in the code:
In each component, you'll find comments like:
```
{/* Replace with: <img src={character.image} alt={character.name} ... /> */}
```
Simply uncomment the img tag and remove the emoji placeholder.
