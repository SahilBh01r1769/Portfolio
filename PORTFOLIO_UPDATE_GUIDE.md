# Portfolio Update Guide

The portfolio is a lightweight static site deployed from the default branch through GitHub Pages.

## Structure

```text
Portfolio/
├── index.html                  # Page structure + personal/about/contact copy
├── styles.css                  # Global visual system and shared components
├── styles/
│   └── about.css               # About-specific presentation
├── data/
│   ├── projects.js             # Project card + modal content
│   └── articles.js             # Medium article content
├── app.js                      # Rendering, filters, modal, navigation and reveal motion
├── resume.pdf                  # Downloadable resume
└── .github/workflows/
    └── site-check.yml          # Regression checks
```

Content belongs in the data files, behaviour in `app.js`, page structure in `index.html`, and styling in the CSS files.

## Project records

All eight projects are defined in `data/projects.js` in their display order:

1. Cyberattack Tactics Triage — `id: 'cyber'`
2. Real-Time Violence Event Detection — `id: 'violence'`
3. Serverless Receipt Processor — `id: 'receipt'`
4. MetroPT-3 Predictive Maintenance — `id: 'maintenance'`
5. Signal — Audio Transcription & Sentiment — `id: 'audio'`
6. First Run — `id: 'first-run'`
7. Mythos — Comparative Mythology — `id: 'mythos'`
8. TextScope NLP — `id: 'textscope'`

Each project uses this shape:

```js
{
  id: 'unique-key',
  category: 'ml',              // ml | cloud | software
  size: 'project-md',          // bento-grid width
  theme: 'violet',             // card colour
  modalTheme: 'modal-violet',  // modal accent
  eyebrow: '06 · DEVELOPER TOOLS / AI',
  meta: 'HTTP verified',
  title: 'Project title',
  short: 'Short card description.',
  tags: ['Tag 1', 'Tag 2'],
  kicker: 'Modal category',
  summary: 'Longer modal summary.',
  focus: 'What was built and evaluated.',
  evidence: 'A concrete result or observed behavior.',
  tradeoff: 'An honest limitation or design decision.',
  architecture: ['Input', 'Step', 'Output'],
  demo: 'https://...',          // use an empty string when no live demo exists
  repo: 'https://github.com/...'
}
```

`app.js` renders the Live demo action only when `demo` is non-empty. Every project must provide a repository URL.

### Adding a project

1. Add one object to `data/projects.js`.
2. Update the version in the `data/projects.js` script URL in `index.html` to its new Git blob hash (first seven characters) so browsers fetch the new data. Do the same for `app.js` or `styles.css` when editing those files.
3. Give it a unique ID and the next visible number.
4. Select an existing category, size, theme and modal theme.
5. Add only verified copy, architecture and links.
6. Update the project list in `README.md`.
7. Update the expected project count and repository list in `.github/workflows/site-check.yml`.
8. Push to `main`, confirm the portfolio check passes, and inspect the GitHub Pages deployment.

Cards and modals are generated from the project data; no duplicate card HTML is required.

## Other content

- Medium writing cards: `data/articles.js`
- Hero, About, contact, education and skills: `index.html`
- About-specific presentation: `styles/about.css`
- Global cards, modal, navigation and responsive rules: `styles.css`
- Filtering, modal and navigation behaviour: `app.js`
- Downloadable resume: replace `resume.pdf` without renaming it

## Project screenshots

If screenshots are added later, use a consistent structure:

```text
assets/projects/
├── cyber.webp
├── maintenance.webp
├── violence.webp
├── receipt.webp
├── audio.webp
├── first-run.webp
├── mythos.webp
└── textscope.webp
```

Prefer compressed WebP files with consistent aspect ratios. Add an `image` property to project objects and update the shared card renderer once rather than hard-coding project-specific markup.

## Validation and deployment

The workflow in `.github/workflows/site-check.yml` checks:

- required modular files;
- script and stylesheet loading order;
- eight project records and their repository URLs;
- known live-demo URLs;
- support for a repository-only project;
- current education details;
- absence of unsupported or obsolete claims;
- writing links and resume access.

Local preview:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`.

Normal deployment flow:

```text
Edit the relevant content file
        ↓
Preview locally
        ↓
Commit and push to main
        ↓
portfolio checks
        ↓
GitHub Pages deployment
        ↓
Test the live cards, modal and links
```

## Quick lookup

| Change | Primary file | Supporting change |
|---|---|---|
| Project copy, order, tags or links | `data/projects.js` | Update its version in `index.html` |
| Add or remove a project | `data/projects.js` | README + workflow |
| Medium article | `data/articles.js` | None |
| Resume | `resume.pdf` | None if filename stays unchanged |
| Hero, About or contact copy | `index.html` | None |
| About appearance | `styles/about.css` | None |
| Project/modal appearance | `styles.css` | Sometimes |
| Interaction or rendering behaviour | `app.js` | Update workflow if behaviour is required |
| Validation rules | `.github/workflows/site-check.yml` | None |
