# Portfolio Update Guide

Current structure reference: commit `a9dd48b91fa842bb569d0f3273fa8c7c42158f4e`.

> Line numbers below describe the current structure and will move as content is added. Use the **search anchor** beside each range if the line number has shifted.

## 1. Structure

```text
Portfolio/
├── index.html                  # Page structure + personal/about/contact copy
├── styles.css                  # Global visual system and shared components
├── styles/
│   └── about.css               # About-specific presentation
├── data/
│   ├── projects.js             # All project card + modal content
│   └── articles.js             # All Medium article content
├── app.js                      # Rendering, filters, modal, navigation, reveal motion
├── resume.pdf                  # Downloadable resume; replace in place
└── .github/workflows/
    └── site-check.yml          # Regression checks
```

The important rule is: **content lives in data files, behavior lives in `app.js`, structure lives in `index.html`, and section-specific styling can live under `styles/`.**

---

## 2. Update a project

**Primary file:** `data/projects.js` — current lines `1–135`.

Each project is one object. Current approximate ranges:

- Receipt Processor: lines `2–20` — anchor: `id: 'receipt'`
- Violence Detection: lines `21–39` — anchor: `id: 'violence'`
- Predictive Maintenance: lines `40–58` — anchor: `id: 'maintenance'`
- Audio Transcription: lines `59–77` — anchor: `id: 'audio'`
- CaptionLab: lines `78–96` — anchor: `id: 'caption'`
- TextScope: lines `97–115` — anchor: `id: 'textscope'`
- Mythos Network: lines `116–134` — anchor: `id: 'mythos'`

Fields you will normally edit:

```js
{
  id: 'unique-key',
  category: 'ml',              // ml | cloud | software
  size: 'project-md',          // controls bento width
  theme: 'violet',             // card theme class
  modalTheme: 'modal-violet',  // matching modal accent
  eyebrow: '05 · VISION-LANGUAGE',
  meta: 'DL',
  title: 'Project title',
  short: 'Short card description.',
  tags: ['Tag 1', 'Tag 2'],
  kicker: 'Modal category',
  summary: 'Longer modal summary.',
  focus: 'What you actually worked on.',
  tradeoff: 'One honest design note.',
  architecture: ['Input', 'Step', 'Output'],
  demo: 'https://...',
  repo: 'https://github.com/...'
}
```

### Add a new project

1. Duplicate one object in `data/projects.js`.
2. Give it a unique `id`.
3. Choose `category`, `size`, `theme`, and `modalTheme` from existing values.
4. Update copy, architecture, demo URL, and repository URL.
5. Increment the visible project number in `eyebrow`.
6. Push to `main`; GitHub Pages will redeploy automatically.
7. Confirm the `portfolio checks` GitHub Action passes.

You **do not** need to add card HTML or modal HTML manually. `app.js` generates both from the project object.

---

## 3. Update or add a Medium article

**File:** `data/articles.js` — current lines `1–30`.

Search anchor: `window.PORTFOLIO_ARTICLES`.

Each article uses:

```js
{
  number: '05',
  category: 'Topic',
  title: 'Article title',
  description: 'One sentence shown on the card.',
  url: 'https://medium.com/...'
}
```

To add an article, duplicate the final object, update these five fields, and push. No HTML/CSS/JS behavior change is needed.

---

## 4. Update hero, About, contact or personal details

**File:** `index.html`.

Current sections:

- Navigation: roughly lines `15–28` — anchor: `<header class="site-nav"`
- Hero: roughly lines `31–60` — anchor: `<section class="hero shell">`
- Work shell / filters: roughly lines `69–86` — anchor: `id="work"`
- About: roughly lines `88–145` — anchor: `id="about"`
- Writing shell: roughly lines `147–160` — anchor: `id="writing"`
- Contact: roughly lines `162–176` — anchor: `id="contact"`
- Project modal shell: roughly lines `179–197` — anchor: `id="projectModal"`
- Data/app script loading: final lines — anchors: `data/projects.js`, `data/articles.js`, `app.js`

### Common edits

- **Availability / location / degree / CGPA:** Hero section.
- **About narrative / education / certifications:** About section.
- **Skills:** `.skill-bands` inside About.
- **Email / LinkedIn:** Hero, contact and footer as applicable.
- **Resume button text:** Hero/contact/nav only. Do not change `resume.pdf` unless you also rename the file.

---

## 5. Update the resume

Replace the root file:

```text
resume.pdf
```

with the new PDF **using the same filename**. All download buttons continue working without any code changes.

---

## 6. About section styling

**File:** `styles/about.css` — current lines `1–220`.

Search anchors:

- `.about-showcase` — two-column story/facts layout
- `.about-story` — dark narrative panel
- `.about-lead` — large editorial sentence
- `.about-facts` / `.fact-card` — education/certification cards
- `.approach-grid` — three “how I work” cards
- media queries at the bottom — tablet/mobile behavior

Keep About-specific changes here rather than adding them to the global stylesheet.

---

## 7. Global styling

**File:** `styles.css`.

This file contains the shared design system: palette, typography, navigation, hero, project cards, writing cards, contact, modal, responsive rules and animation defaults.

Because the file is currently compact, use search anchors rather than relying on line numbers:

- `:root` — global colors and radius/shadow variables
- `.hero` / `.hero h1` — hero scale and spacing
- `.project` — shared project card behavior
- `.warm`, `.ink`, `.acid`, `.blue`, `.violet`, `.paper`, `.clay` — card colors
- `.article-card` — writing cards
- `.modal-panel` — neutral modal base
- `.modal-panel.modal-*` — modal accent/glow colors
- `.reveal` — scroll reveal animation

If global CSS keeps growing, the next cleanup should split it into `styles/base.css`, `styles/projects.css`, `styles/writing.css`, and `styles/modal.css`.

---

## 8. JavaScript behavior

**File:** `app.js` — current lines `1–190`.

Current logical blocks:

- DOM + data setup: roughly `1–18`
- `createProjectCard`: roughly `20–43`
- `createArticleCard`: roughly `45–60`
- `renderContent`: roughly `62–65`
- project filters: roughly `71–82`
- reveal animation: roughly `84–96`
- project modal rendering: roughly `98–139`
- modal close/setup: roughly `141–171`
- navigation: roughly `173–190`
- bootstrap calls: final lines

Normal content updates should **not** require changes here.

Edit `app.js` only when changing behavior: filter logic, modal interactions, generated markup, navigation or animations.

---

## 9. Add project screenshots later

Recommended structure:

```text
assets/projects/
├── receipt.webp
├── violence.webp
├── maintenance.webp
├── audio.webp
├── captionlab.webp
├── textscope.webp
└── mythos.webp
```

Then add an `image` property to each object in `data/projects.js`:

```js
image: 'assets/projects/receipt.webp'
```

and update `createProjectCard()` in `app.js` once to render that field. After that, future screenshot changes only require replacing the image file or changing the path in the data object.

Prefer `.webp`, consistent aspect ratios, and compressed screenshots.

---

## 10. Validation and deployment

**Workflow:** `.github/workflows/site-check.yml` — current lines `1–75`.

It checks that:

- required modular files exist;
- project/article data modules load before `app.js`;
- seven project records and their live/repository URLs remain present;
- About stylesheet is linked;
- current CGPA/HSC values remain correct;
- known unsupported old metrics do not return;
- resume link remains present.

### Normal deployment loop

```text
Edit the relevant data/content file
        ↓
Preview locally if needed
        ↓
Commit + push to main
        ↓
portfolio checks GitHub Action
        ↓
GitHub Pages deploys the new main branch
        ↓
Open the live site and test changed links/interactions
```

Local preview:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`.

---

## Quick lookup

| Change | File to edit | Usually nothing else |
|---|---|---|
| Project text, tags, architecture, links | `data/projects.js` | Yes |
| New project | `data/projects.js` | Yes, unless a new visual style is required |
| Medium article | `data/articles.js` | Yes |
| Resume | `resume.pdf` | Yes |
| Hero/about/contact text | `index.html` | Yes |
| About appearance | `styles/about.css` | Yes |
| Project/modal/global appearance | `styles.css` | Usually |
| Interaction or rendering behavior | `app.js` | No |
| Validation rules | `.github/workflows/site-check.yml` | No |

This separation is intentional: **most routine portfolio updates should now touch only one file.**
