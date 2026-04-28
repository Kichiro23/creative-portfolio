# Rommel De Leon — Portfolio

A premium full-stack portfolio website with a cinematic, Apple-inspired design. Features glass morphism cards, animated canvas background, light/dark mode, and real project screenshots.

## Live Demo

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS
- **Backend**: Hono + tRPC + Drizzle ORM + MySQL
- **Database**: PlanetScale / MySQL compatible

## Design Language

| Principle | Implementation |
|-----------|---------------|
| **Glass Morphism** | `glass-card` CSS class with refraction highlight and specular sheen |
| **Premium dark mode** | `#0f1115` — refined charcoal, not pitch black |
| **Cool accents** | Indigo `#6366f1`, Slate `#8b9dc3`, Teal `#5eead4` |
| **Glowing buttons** | Gradient fills with subtle colored glow on hover |
| **Soft rounding** | 24px on cards, pill-shaped navbar |
| **Text gradients** | Indigo-to-lavender gradient text for emphasis |
| **Canvas aurora** | Animated color blobs with subtle grid overlay |
| **Lenis smooth scroll** | Silky scroll with GSAP ScrollTrigger sync |

## Sections

1. **Hero** — Profile photo card with skill bars, stat counters, animated badge
2. **About** — 6 attribute cards with scroll-triggered entrance animations
3. **Skills** — 8 category cards with color-coded technology pills
4. **Experience** — Vertical timeline with glass cards and role tags
5. **Work** — 5 project cards with real screenshots, tech stack tags, hover zoom
6. **Tools** — 8 tool category cards with technology tags
7. **Certifications** — Cisco & Huawei certs + core attributes + availability
8. **Contact** — Contact info, social links with brand colors, CTA card
9. **Admin** — Protected admin dashboard (existing tRPC backend)

## Project Screenshots

Real project images are displayed in the Work section:
- `/projects/carp.png` — Climate & Air Research Platform
- `/projects/ecommerce.jpg` — E-Commerce Management Dashboard
- `/projects/ai-dashboard.jpg` — AI Co-Pilot Dashboard
- `/projects/cloud-infra.jpg` — Cloud Infrastructure Architecture
- `/projects/dbms.jpg` — Database Management System

## Tech Stack

**Frontend:** React 19 + TypeScript + Vite + Tailwind CSS + GSAP ScrollTrigger + Lenis + tRPC client
**Backend:** Hono + tRPC 11 + Drizzle ORM + MySQL + Kimi OAuth 2.0

## Features

- Canvas-based animated aurora background (adapts to light/dark mode)
- Glass morphism surfaces with refraction highlights
- Indigo glow buttons with gradient fills
- Type-safe API via tRPC + Zod validation
- Contact form with real-time database persistence
- Admin dashboard (protected route, admin-only)
- Light & Dark mode with system preference detection
- Lenis smooth scroll synced with GSAP ScrollTrigger
- Scroll-triggered entrance animations on every section
- Profile photo with online status indicator

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
- Pill navbar with mobile dropdown
- Reduced motion support

## License
MIT © Rommel Andrei De Leon
