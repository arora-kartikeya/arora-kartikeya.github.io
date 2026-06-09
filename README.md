# Kartikeya Arora Academic Portfolio

Static academic portfolio built with [Astro](https://astro.build/) and MDX for
GitHub Pages at `https://arora-kartikeya.github.io/`.

## Local Development

```sh
nvm use
npm install
npm run dev
```

Build the production site:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

## Editing Content

- Site identity, navigation, and profile links: `src/site.config.ts`
- Publications: `src/data/publications.bib`
- Content collection schemas: `src/content.config.ts`
- Projects: `src/content/projects/`
- Writing and tutorials: `src/content/writing/`
- CV placeholder: add `public/files/Kartikeya_Arora_CV.pdf`

Placeholder links are marked visibly in the UI and should be replaced in
`src/site.config.ts` when final profile URLs are available.

## GitHub Pages

This repo is configured for a user site. Create the GitHub repository as:

```txt
arora-kartikeya.github.io
```

Push the `main` branch. The workflow in `.github/workflows/deploy.yml` builds
the Astro site and publishes `dist/` to GitHub Pages.
