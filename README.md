# Vincent Liang Website

This repository now treats the Next.js site in the repository root as the current production website.

## Development

```bash
npm ci
npm run dev
```

## Production

The site is statically exported with Next.js and deployed to GitHub Pages through [pages-deploy.yml](./.github/workflows/pages-deploy.yml).

## Legacy

The previous Jekyll-based website is preserved on the `legacy` branch.
