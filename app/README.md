# Rommel De Leon — iOS 26 Liquid Glass Portfolio

A premium full-stack portfolio built with **iOS 26 Liquid Glass** design language — warm, vibrant, translucent surfaces with glowing accents and a WebGL fluid simulation.

## Live Demo

- **Frontend**: Deployed via Vercel / Netlify / Render (static hosting)
- **Backend**: Hono + tRPC + Drizzle ORM + MySQL
- **Database**: PlanetScale / MySQL compatible

## Design Language — iOS 26 Liquid Glass

| Principle | Implementation |
|-----------|---------------|
| **Liquid Glass** | `liquid-glass` CSS class with `::before` refraction highlight and `::after` specular sheen |
| **Warm void background** | `#06040a` — purple-warm black, not cold gray |
| **Vibrant accents** | Coral `#ff6b35`, Violet `#a78bfa`, Mint `#06d6a0`, Amber `#fbbf24`, Pink `#f472b6` |
| **Glowing buttons** | Gradient fills with colored box-shadow glow on hover |
| **Extreme rounding** | 28px+ on all cards and buttons |
| **Text gradients** | Multi-color gradient text for emphasis |
| **Single WebGL shader** | Fluid simulation with warm coral/violet/mint palette |
| **Custom cursor** | 12px coral dot with `mix-blend-mode: difference` |
| **Lenis smooth scroll** | Silky scroll with GSAP ScrollTrigger sync |

## Sections

1. **Loading Screen** — Animated counter with gradient progress bar, curtain-split exit
2. **Hero** — Full-viewport WebGL fluid shader (mouse-reactive), liquid glass badge, name headline with coral gradient, two glow buttons
3. **Work** — Liquid glass project cards with hover scale, tech stack tags, glow orbs in background
4. **About** — Split layout with coral-glow portrait, floating liquid glass location badge, violet/coral gradient headline
5. **Skills** — 14 skills in 6 categories inside liquid glass cards, multi-color progress bars
6. **Contact** — Liquid glass form container, glow submit button, liquid glass social icons
7. **Admin** — Protected admin dashboard with message table, liquid glass stats cards

## Tech Stack

**Frontend:** React 19 + TypeScript + Vite + Tailwind CSS + GSAP ScrollTrigger + Three.js + Lenis + tRPC client
**Backend:** Hono + tRPC 11 + Drizzle ORM + MySQL + Kimi OAuth 2.0

## Features

- WebGL fluid simulation (custom GLSL fragment shader, mouse-reactive)
- Liquid glass surfaces with refraction highlights and specular sheen
- iOS 26 glow buttons with gradient fills and colored shadows
- Type-safe API via tRPC + Zod validation
- Contact form with real-time database persistence
- Admin dashboard (protected route, admin-only)
- Dark mode (void black) — no light mode (stays true to the aesthetic)
- Custom cursor with mix-blend-mode difference
- Lenis smooth scroll synced with GSAP ScrollTrigger
- 60fps GSAP scroll-triggered animations on every section

## Getting Started

```bash
npm install
npm run db:push      # Sync schema
npm run db:seed      # Seed initial data
npm run dev          # Dev server at localhost:3000
npm run build        # Production build
npm start            # Start production server
```

## Deployment

**Fullstack:** Deploy the entire `dist/` folder to Render, Railway, or Fly.io.
**Frontend only:** Deploy `dist/public/` to Vercel, Netlify, or Cloudflare Pages.

## Mobile Optimization
- Touch targets: 48px minimum
- Responsive: 320px → 1440px
- Fluid typography via `clamp()`
- Custom cursor disabled on touch devices
- Reduced motion support

## License
MIT © Rommel Andrei De Leon
