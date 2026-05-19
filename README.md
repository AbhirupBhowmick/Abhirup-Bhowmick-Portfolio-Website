<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-E91E63?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/WebGL-OGL-990000?style=flat-square&logo=webgl&logoColor=white" alt="WebGL" />
</p>

<h1 align="center">Abhirup Bhowmick — Portfolio</h1>

<p align="center">
  <strong>Premium AI Systems Engineer Portfolio</strong><br/>
  <em>Engineered with architectural precision. Designed for cinematic impact.</em>
</p>

<p align="center">
  <a href="https://github.com/AbhirupBhowmick">GitHub</a> ·
  <a href="https://www.linkedin.com/in/abhirup111">LinkedIn</a> ·
  <a href="mailto:abhirupbhowmick111777@gmail.com">Email</a>
</p>

---

## Overview

A production-grade portfolio website built to showcase engineering work at the intersection of **full-stack development**, **scalable backend systems**, and **modern AI integrations**. The design language draws from the visual identity of platforms like Vercel, Linear, and Anthropic — minimal, calm, technical, and premium.

This is not a template. Every component, animation curve, and atmospheric layer has been hand-engineered to create a cohesive, recruiter-ready experience that communicates systems-level thinking through its interface.

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     LAYOUT (z-stack)                    │
│                                                         │
│   ┌─ Aurora WebGL ────────────────────────── z: -30 ─┐  │
│   │  OGL shader · scroll-reactive opacity fade       │  │
│   ├─ Engineering Grid ─────────────────────── z: -20 ─┤  │
│   │  CSS linear-gradient · 60px spacing · 4% opacity │  │
│   ├─ Noise Overlay ────────────────────────── z: -10 ─┤  │
│   │  SVG grain · mix-blend-soft-light · 3% opacity   │  │
│   ├─ Content ──────────────────────────────── z:  0  ─┤  │
│   │  All sections, components, and interactions      │  │
│   ├─ Cursor Glow ──────────────────────────── z: 40  ─┤  │
│   │  800px radial-gradient · mouse-tracked · 4%      │  │
│   ├─ Navbar ───────────────────────────────── z: 50  ─┤  │
│   │  Micro-glass · velocity-aware scrollspy          │  │
│   └─ Command Palette ─────────────────────── z: 100 ─┘  │
│                                                         │
│   ┌─ Lenis Smooth Scroll ──────────────────────────  ─┐  │
│   │  Inertial scrolling · 1.2s duration · global     │  │
│   └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## Sections

| Section | Description |
|---|---|
| **Hero** | Cinematic entry with magnetic CTAs, concentric SVG graphics, and scroll-fading Aurora |
| **About** | Engineering philosophy and professional summary |
| **Projects** | Case studies — Visi Core AI, ResuMatch AI, Second Brain AI |
| **Skills Galaxy** | Functional layer breakdown across AI/ML, Backend, System Design, Frontend |
| **Architecture Lab** | High-fidelity system blueprints with request/backend/AI/storage flow diagrams |
| **Experience Timeline** | Professional timeline with monochrome terminal aesthetic |
| **GitHub Activity** | Live contribution sync and repository highlights |
| **AI Context Engine** | Interactive terminal panel — query experience via RAG-style interface |
| **Resume Hub** | One-click resume access with download CTA |
| **Contact Portal** | Professional communication grid with status indicators |

---

## Premium Motion Systems

### Velocity-Aware Navbar Scrollspy

The navbar uses a custom scroll observer that detects scroll velocity. During rapid navigation (clicking distant sections), the system **locks the intersection observer** for 1300ms, preventing intermediate section activation and delivering a single, continuous underline interpolation to the target.

```
Click "PROJECTS" → "TIMELINE"
  ├─ Immediately set TIMELINE as active
  ├─ Lock scrollspy observer
  ├─ Lenis animates scroll (1200ms)
  ├─ Underline transitions via GPU-accelerated transform
  └─ Unlock observer after 1300ms
```

### Aurora Scroll Fade

The WebGL Aurora background dynamically reduces opacity and blur intensity as the user scrolls, using Framer Motion's `useTransform` mapped to `scrollYProgress`:

- **Top of page** → `opacity: 1`, `blur: 20px`
- **25% scroll** → `opacity: 0.12`, `blur: 0px`

This creates a cinematic environmental lighting transition from immersive hero → clean engineering sections.

### Micro-Glass UI

Strategic `backdrop-blur-md` with ultra-low-opacity backgrounds applied exclusively to:
- Navbar (`bg-black/30`)
- Connect CTA (`bg-white/[0.02]` with hover glow)
- AI Terminal panel (`bg-black/30` with emerald active state)
- Command Palette (`bg-black/40`)

All glass surfaces include sub-pixel inner edge highlights via inset box-shadows.

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.2 | App Router, SSR, static generation |
| React | 19.2 | Component architecture |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Utility-first styling |
| Framer Motion | 12.x | Declarative animations, scroll transforms |
| OGL | 1.0 | WebGL Aurora shader rendering |
| Lenis | 1.3 | Inertial smooth scrolling |
| cmdk | 1.1 | Command palette (⌘K) |
| Lucide React | 1.16 | Icon system |

### Backend (Scaffold)

| Technology | Purpose |
|---|---|
| Spring Boot | REST API framework |
| Java | Backend language |
| Maven | Build & dependency management |

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/AbhirupBhowmick/Abhirup-Bhowmick-Portfolio-Website.git
cd Abhirup-Bhowmick-Portfolio-Website

# Install frontend dependencies
cd frontend
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`.

### Production Build

```bash
npm run build
npm start
```

---

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `⌘K` / `Ctrl+K` | Open Command Palette |
| `Esc` | Close Command Palette |

---

## Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx          # Root layout with atmospheric layers
│   │   │   ├── page.tsx            # Page composition
│   │   │   └── globals.css         # Design tokens & global styles
│   │   ├── components/
│   │   │   ├── Navbar.tsx          # Velocity-aware scrollspy navigation
│   │   │   ├── Hero.tsx            # Cinematic hero with magnetic CTAs
│   │   │   ├── Projects.tsx        # Project case studies
│   │   │   ├── Skills.tsx          # Skills galaxy & architecture
│   │   │   ├── ArchitectureLab.tsx # System blueprint diagrams
│   │   │   ├── ExperienceTimeline.tsx
│   │   │   ├── AIAssistant.tsx     # AI Context Engine terminal
│   │   │   ├── ContactPortal.tsx   # Communication grid
│   │   │   ├── CommandPalette.tsx  # ⌘K navigation system
│   │   │   ├── MagneticButton.tsx  # Spring physics CTA wrapper
│   │   │   ├── SmoothScroll.tsx    # Lenis provider
│   │   │   └── ui/
│   │   │       ├── Aurora.tsx      # WebGL shader background
│   │   │       ├── AuroraBackground.tsx  # Scroll-reactive wrapper
│   │   │       ├── CursorGlow.tsx  # Mouse-tracked radial light
│   │   │       ├── EngineeringGrid.tsx   # Blueprint grid overlay
│   │   │       └── NoiseOverlay.tsx      # Cinematic grain texture
│   │   └── lib/
│   │       └── utils.ts
│   └── public/
│       └── resume/
├── backend/                        # Spring Boot scaffold
└── README.md
```

---

## Design Philosophy

> *"The interface should communicate the same level of systems thinking as the work it presents."*

Every design decision follows three constraints:

1. **Atmospheric, not decorative** — Background layers exist to create environmental depth, not visual noise. Aurora at 12% opacity past the hero. Grid at 4%. Noise at 3%.

2. **Motion serves navigation** — Animations exist to communicate state changes (active section, hover feedback, scroll position), never for spectacle. All transitions use `cubic-bezier(0.16, 1, 0.3, 1)`.

3. **Glass is structural** — Micro-glass effects are applied only where translucency communicates layering (navbar over content, terminal over background). Never decorative.

---

## Performance

- All animations use `transform` and `opacity` exclusively (GPU-composited, zero layout thrash)
- Aurora WebGL runs on a dedicated canvas with `premultipliedAlpha` blending
- Lenis smooth scroll is RAF-driven with passive event listeners
- Cursor glow uses React state batching — no unnecessary re-renders
- Noise overlay is a single SVG reference, not generated per-frame

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  <sub>Engineered by <strong>Abhirup Bhowmick</strong> · Full-Stack & AI Systems Engineer</sub>
</p>
