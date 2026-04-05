# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

- `npm run dev` — Start Vite dev server with HMR
- `npm run build` — Type-check (`tsc -b`) then Vite production build to `/dist`
- `npm run lint` — ESLint across all source files
- `npm run preview` — Serve the built `/dist` folder locally
- `npm run docker:publish` — Build and push Docker image to DockerHub (`ishakantony/reformio-demo`)

No test framework is configured.

## Architecture

React 19 + TypeScript SPA for a Pilates studio booking platform. Vite 8 build, Tailwind CSS 4 styling, React Router DOM 7 routing.

### Routing & Auth

Routes are defined in `src/App.tsx` with two guard wrappers:
- **`GuestOnly`** — redirects authenticated users to `/dashboard`
- **`RequireAuth`** — redirects unauthenticated users to `/login`

Authentication (`src/auth.ts`) is dummy/localStorage-backed with two hardcoded users (`admin@reformio.app` and `student@reformio.app`, both `password123`). Supports `UserRole` of `"admin" | "student"`.

### Design System

Custom theme defined in `src/index.css` via Tailwind `@theme`:
- Colors: cream, charcoal, rose, warm-brown, muted, divider
- Fonts: Cormorant Garamond (serif/headings), DM Sans (sans/body) — loaded from Google Fonts in `index.html`
- Grain texture overlay, scroll-triggered reveal animations (fadeUp, scaleIn, stagger)

### Key Component

`src/components/Reveal.tsx` — Intersection Observer wrapper providing scroll-triggered animations. Supports fade-up, scale-in, and staggered children modes.

### Deployment

Multi-stage Dockerfile: Node 22 Alpine build → Nginx Alpine serving static files. Nginx configured with SPA fallback (`try_files $uri $uri/ /index.html`).
