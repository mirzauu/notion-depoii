# Notion Landing Page Reconstruction

A pixel-accurate reconstruction of the official Notion landing page (`https://www.notion.com/`), reverse-engineered from live browser inspection.

## Features Reconstructed

- **Sticky Navigation**: Notion logo, interactive "Product" and "Resources" dropdown menus with rich feature cards, and responsive mobile drawer menu.
- **Hero Section**: 7-avatar pile illustration, 6-state animated rotating Tatami product pill ("Think", "Build", "Ship", "Scale", "Create", "Jam"), primary and secondary CTA buttons, interactive looping video showcase with custom play/pause toggle, peeking accent robot and character illustrations.
- **Infinite Logo Marquee**: 23 customer brand logos (OpenAI, Figma, Cursor, Ramp, Toyota, Nvidia, Vercel, etc.) scrolling continuously.
- **Bento Grid**: 3 feature cards ("Capture knowledge", "Find answers", "Automate busywork") with multi-layered floating screenshot UI overlays.
- **Custom Agents Section**: 5 workflow cards with color badges and arrow indicators.
- **Testimonials**: 3 dark customer story cards (Cursor, Faire, Ramp) with photographic portraits, white brand logos, quotes, and attributions.
- **Stats Marquee**: Animated stat badges (G2 #1, 100M users, 50% of YC, etc.).
- **CTA Section & Footer**: Complete footer with Marshall McLuhan quote, link hierarchy, language selector, and system status indicator.

## Assets & References

- All 57 original visual assets downloaded from Notion CDN to `public/assets/`.
- Full reference screenshots captured from the live website at `reference/`.
- Local comparison screenshots captured at `reference/local/`.
- Detailed reverse-engineering analysis in `RECONSTRUCTION_REPORT.md`.

## Quick Start

```bash
cd notion
npm install
npm run dev
```

Visit [http://localhost:3001](http://localhost:3001).

