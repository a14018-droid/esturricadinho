# Esturricadinho

Website for **Esturricadinho**, a Portuguese restaurant in Corroios:

> Av. da Liberdade 78, 2855-385 Corroios · 927 436 214 · [esturricadinho.pt](https://esturricadinho.pt)

## What's here

A single-page static site — no build step, no dependencies.

```
index.html        page markup (Portuguese, with an EN toggle)
css/style.css     styles
js/main.js        sticky header, mobile nav, PT/EN switch, scroll reveals
```

## Run locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Publish

The site is plain HTML/CSS/JS, so it works on GitHub Pages directly:
**Settings → Pages → Source: Deploy from a branch → `main` / root**.

Content (menu, hours, phone, reviews) lives in `index.html`; bilingual strings are
kept in `data-pt` / `data-en` attributes on the same element.

Photography is illustrative and loaded from the [Pexels](https://www.pexels.com/license/) CDN,
so the repo stays text-only and deploys anywhere as-is.
