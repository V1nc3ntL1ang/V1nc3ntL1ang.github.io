# Vincent Liang's Website

Hi, I'm Vincent. Welcome to my website!

Visit the live website at [V1nc3ntL1ang.github.io](https://V1nc3ntL1ang.github.io)

## Local development

Use Node.js 20 or later and npm.

```sh
npm ci
npm run dev -- --hostname localhost
```

Open http://localhost:3000. Before publishing, run:

```sh
npm run lint
npm run build
```

The build exports the site to `out/`. Run `npm start` to preview that static export.

## Project structure

- `src/app/`: page routes, metadata, and shared styles. Typography and responsive spacing are defined in `globals.css`.
- `src/components/`: shared navigation, search, footer, icons, and animation components; publication controls live in `publications/`.
- `src/lib/site-content.ts`: profile, research interests, education, and navigation data.
- `src/lib/publications.ts`: publication data and the visibility flag.
- `public/`: avatar, campus images, and favicon.

`NEXT_PUBLIC_SHOW_PUBLICATIONS=true` enables the Publications navigation and site-search entries at build time. By default they are hidden. The direct `/publications/` route remains available with a placeholder notice and is marked `noindex` while hidden.

Keep local environment files, dependencies, build output, and QA screenshots out of Git. Reveal animations respect the operating system's reduced-motion setting.

## Deployment

Pushing to `main` runs `.github/workflows/pages-deploy.yml`, which installs dependencies, builds the static export, and deploys it to GitHub Pages. The visitor map is loaded from MapMyVisitors; the site remains usable if that external service is unavailable.
