# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Astro dev server at http://localhost:4321
- `npm run build` — produce static output in `dist/`
- `npm run preview` — serve the built `dist/` locally to verify production output

There is no test suite, linter, or formatter configured.

## Architecture

Static marketing site for Pharma Links Agencies, built with **Astro 4** (`output: 'static'`) and **Alpine.js** for the small bits of client interactivity. No React/Vue, no bundler config beyond Astro defaults, no API/server code — everything renders to plain HTML/CSS/JS at build time.

- `src/pages/*.astro` — one file per route (`/`, `/about`, `/brands`, `/career`, `/contact`). Astro file-based routing; add a new `.astro` file here to add a route.
- `src/layouts/Layout.astro` — single shared shell. Owns the fixed header, mobile nav (driven by Alpine `x-data` on `<body>`), footer, and a large block of scoped `<style>` for those chrome elements. Every page wraps its content in `<Layout title="...">`.
- `src/styles/global.css` — site-wide styles, design tokens, utility classes (`.container`, `.btn`, `.section`, etc.) used across pages. Page-specific styles live inside scoped `<style>` blocks in each `.astro` file.
- `public/` — static assets served at root: `logo.png`, `banners/` (hero slider images), `brands/` (partner logos), `gallary/` (sic — preserve the existing spelling), `favicon.png`. Reference these with absolute paths like `/banners/hero_banner_1.png`.
- `astro.config.mjs` — registers the `@astrojs/alpinejs` integration; that's the only build-time customization.

### Interactivity model

There is no component framework. Two patterns coexist:

1. **Alpine directives** (`x-data`, `x-show`, `@click`, `:class`) for declarative state — see the mobile menu and scrolled-header logic in `Layout.astro`.
2. **Inline `<script>` blocks** inside `.astro` files for one-off DOM scripts (e.g. the hero image slider on the homepage, which is intentionally vanilla JS for stability — see the comment in `src/pages/index.astro`).

When adding interactivity, prefer Alpine for anything stateful/reactive and a plain `<script>` for imperative DOM work. Don't reach for a framework.

### Deployment

Configured for **Cloudflare Pages** with `output: 'static'` (see commit `398518e`). Build command `npm run build`, output directory `dist`. Nginx VPS deployment is also documented in `README.md`.
