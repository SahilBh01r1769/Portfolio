# Sahil Bhoir — Engineering Portfolio

A lightweight static portfolio for a Computer Engineering graduate focused on applied AI/ML, computer vision, NLP, AWS cloud architecture and software engineering.

## Design goals

- project-first rather than template-first;
- concise enough for recruiters to scan quickly;
- technically accurate and interview-defensible;
- visually coherent without making every project look identical;
- responsive with no build step or framework dependency.

## Featured projects

- Cyberattack Tactics Triage
- MetroPT-3 Predictive Maintenance
- Real-Time Violence Event Detection
- Serverless Receipt Processor
- Signal — AWS Audio Transcription & Sentiment
- CaptionLab — Image Captioning with Visual Attention
- Mythos — Comparative Mythology
- TextScope NLP

## Content policy

Portfolio copy deliberately avoids unverified performance claims. When a project uses a third-party pretrained model, that is stated directly. When an experiment produces weak metrics, the portfolio describes the engineering/evaluation lesson rather than replacing the result with an unsupported claim.

## Run locally

```bash
python -m http.server 8000
```

Open `http://localhost:8000`.

Project content is stored in `data/projects.js`, while `app.js` renders the cards and detail views. The site is deployed through GitHub Pages.

There is no build step.
