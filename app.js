const nav = document.getElementById('nav');
const navLinks = document.getElementById('navLinks');
const mobileToggle = document.getElementById('mobileToggle');
const filterButtons = [...document.querySelectorAll('.filter-btn')];
const projects = [...document.querySelectorAll('.project')];
const modal = document.getElementById('projectModal');
const modalPanel = modal?.querySelector('.modal-panel');
const modalTitle = document.getElementById('modalTitle');
const modalKicker = document.getElementById('modalKicker');
const modalSummary = document.getElementById('modalSummary');
const modalFocus = document.getElementById('modalFocus');
const modalTradeoff = document.getElementById('modalTradeoff');
const modalArchitecture = document.getElementById('modalArchitecture');
const modalActions = document.getElementById('modalActions');

const MODAL_THEMES = ['modal-warm','modal-ink','modal-acid','modal-blue','modal-violet','modal-paper','modal-clay'];

const PROJECT_DETAILS = {
  receipt: {
    theme: 'modal-warm',
    kicker: 'Cloud / Document AI',
    title: 'Serverless Receipt Processor',
    summary: 'An authenticated AWS workflow that turns uploaded receipt images into structured expense records. I built it as a set of small serverless steps rather than one large backend function.',
    focus: 'The main work was connecting Cognito authentication, presigned S3 uploads, Textract OCR, Step Functions, Lambda and DynamoDB while keeping every expense tied to the correct user.',
    tradeoff: 'Using several managed AWS services makes the flow easier to separate and reason about, but it also means more moving parts than a single backend service.',
    architecture: ['Browser', 'Cognito', 'Presigned S3', 'Step Functions', 'Textract', 'Lambda parsing', 'DynamoDB'],
    demo: 'https://d3uo3z77ak8ix1.cloudfront.net/',
    repo: 'https://github.com/SahilBh01r1769/serverless-receipt-processor'
  },
  violence: {
    theme: 'modal-ink',
    kicker: 'Computer Vision / Real-time',
    title: 'Real-Time Violence Detection',
    summary: 'A real-time monitoring application built around a public pretrained YOLOv8 violence checkpoint. The project focuses on everything needed to turn model detections into a usable monitoring workflow.',
    focus: 'OpenCV handles camera, RTSP and video-file inputs. Detections pass through temporal consistency and cooldown logic before screenshots, history and alerts are triggered, with FastAPI and Streamlit around the pipeline.',
    tradeoff: 'The model itself is pretrained, so I do not present this as custom computer-vision research. The value of the project is in real-time integration, filtering and application behaviour.',
    architecture: ['Video source', 'OpenCV', 'YOLOv8', 'Temporal filter', 'Alert cooldown', 'Screenshot/history', 'FastAPI / Streamlit'],
    demo: 'https://violencedetectionai.streamlit.app/',
    repo: 'https://github.com/SahilBh01r1769/violence_detection'
  },
  maintenance: {
    theme: 'modal-acid',
    kicker: 'Industrial ML / Time Series',
    title: 'MetroPT-3 Predictive Maintenance',
    summary: 'A predictive-maintenance pipeline over more than 1.5 million compressor telemetry rows. Most of the work is in getting the time-series preparation and evaluation right before trusting a model result.',
    focus: 'The pipeline validates and quarantines data, segments around timestamp gaps, creates cadence-aware windows, builds 38 features, labels future failure windows and evaluates on a chronological holdout.',
    tradeoff: 'The final baseline is weak, and I keep that result visible. I would rather show a realistic evaluation than improve the number with a split that leaks information across time.',
    architecture: ['Raw telemetry', 'Validation', 'Gap segmentation', 'Windowing', '38 features', 'Failure-horizon labels', 'RF baseline', 'Chronological holdout'],
    demo: 'https://metropt3-predictive-maintenance.streamlit.app/',
    repo: 'https://github.com/SahilBh01r1769/metropt3-predictive-maintenance'
  },
  audio: {
    theme: 'modal-blue',
    kicker: 'AWS / Streaming & Events',
    title: 'Signal — Audio Transcription & Sentiment',
    summary: 'A serverless speech application with two paths: live browser audio and asynchronous file transcription. Both use AWS-managed services, but the event flow is different for each.',
    focus: 'The live path sends microphone chunks through API Gateway WebSockets to Lambda, Transcribe and Comprehend, with DynamoDB storing session state. Batch uploads use S3, Transcribe jobs and EventBridge completion events.',
    tradeoff: 'The live path uses short independent audio chunks instead of one persistent Transcribe stream. That fits the Lambda design, but it is a compromise compared with a long-lived streaming service.',
    architecture: ['Browser mic', 'WebSocket API', 'Lambda', 'Transcribe', 'Comprehend', 'DynamoDB', 'Browser updates'],
    demo: 'https://d2h6neawct2uig.cloudfront.net/',
    repo: 'https://github.com/SahilBh01r1769/aws-audio-transcription-sentiment'
  },
  caption: {
    theme: 'modal-violet',
    kicker: 'Vision-Language / Deep Learning',
    title: 'CaptionLab — Explainable Image Captioning',
    summary: 'An image-captioning project that starts with a ResNet50/LSTM baseline and then adds spatial features, additive attention, beam search and token-level inspection.',
    focus: 'The custom path keeps the CNN feature grid instead of collapsing it immediately, then lets the decoder attend to different regions while generating words. The training setup also includes staged CNN fine-tuning and image-level splitting.',
    tradeoff: 'The attention maps are useful for inspection, but I treat them as diagnostics rather than proof of why the model made a decision. I also avoid publishing unverified evaluation scores.',
    architecture: ['Image', 'ResNet50 grid', '1×1 projection', 'Additive attention', 'LSTM decoder', 'Beam / greedy decode', 'Caption + attention'],
    demo: 'https://image-captioningdemo.streamlit.app/',
    repo: 'https://github.com/SahilBh01r1769/image-captioning'
  },
  textscope: {
    theme: 'modal-paper',
    kicker: 'NLP / Source-grounded analysis',
    title: 'TextScope — Evidence-Aware NLP',
    summary: 'A document-analysis workbench that brings summarisation, entities, concepts, sentiment, syntax and question answering into one interface while keeping links back to the source text.',
    focus: 'spaCy, BART and RoBERTa sit behind one shared NLP layer. Entities and concepts retain sentence references, QA returns supporting text or abstains, and summary diagnostics show what information may have been lost.',
    tradeoff: 'The language models are pretrained. The interesting part for me was making their outputs easier to inspect and verify instead of presenting confidence scores as if they guaranteed correctness.',
    architecture: ['Source document', 'Sentence evidence layer', 'spaCy / sentiment', 'BART summary', 'RoBERTa QA', 'Diagnostics', 'Streamlit / Flask'],
    demo: 'https://nlp-webapp.streamlit.app/',
    repo: 'https://github.com/SahilBh01r1769/textscope-nlp'
  },
  mythos: {
    theme: 'modal-clay',
    kicker: 'Knowledge Graph / Data Visualisation',
    title: 'Mythos Network — Indo-European Gods',
    summary: 'An interactive way to explore similarities between deities using curated traits alongside linguistic cognates, historical context, graph paths and map views.',
    focus: 'Each deity has a curated 16-dimensional trait vector. Similarity calculations support the comparisons, while D3, Leaflet and a Web Worker power the graph, map, archetype and path views.',
    tradeoff: 'The trait weights are my curated heuristics, not objective historical measurements. Linguistic cognacy is kept separate from functional similarity so the interface does not imply that two similar gods must share an etymological origin.',
    architecture: ['Curated deity data', '16-D traits', 'Similarity engine', 'Web Worker', 'D3 graph', 'Leaflet map', 'Search / archetypes / paths'],
    demo: 'https://sahilbh01r1769.github.io/indo_european_gods/',
    repo: 'https://github.com/SahilBh01r1769/indo_european_gods'
  }
};

window.addEventListener('scroll', () => nav?.classList.toggle('scrolled', window.scrollY > 16));

mobileToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  mobileToggle.setAttribute('aria-expanded', String(open));
  mobileToggle.textContent = open ? 'Close' : 'Menu';
});

navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  mobileToggle?.setAttribute('aria-expanded', 'false');
  if (mobileToggle) mobileToggle.textContent = 'Menu';
}));

filterButtons.forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  filterButtons.forEach(item => item.classList.toggle('active', item === button));
  projects.forEach(project => project.classList.toggle('hidden', !(filter === 'all' || project.dataset.category === filter)));
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

function openProjectModal(key) {
  const data = PROJECT_DETAILS[key];
  if (!data || !modal) return;
  modalPanel?.classList.remove(...MODAL_THEMES);
  if (data.theme) modalPanel?.classList.add(data.theme);
  modalKicker.textContent = data.kicker;
  modalTitle.textContent = data.title;
  modalSummary.textContent = data.summary;
  modalFocus.textContent = data.focus;
  modalTradeoff.textContent = data.tradeoff;
  modalArchitecture.replaceChildren();
  data.architecture.forEach((step, index) => {
    const node = document.createElement('span');
    node.className = 'architecture-step';
    node.textContent = step;
    modalArchitecture.append(node);
    if (index < data.architecture.length - 1) {
      const arrow = document.createElement('span');
      arrow.className = 'architecture-arrow';
      arrow.textContent = '→';
      modalArchitecture.append(arrow);
    }
  });
  modalActions.innerHTML = `<a href="${data.demo}" target="_blank" rel="noreferrer">Live demo ↗</a><a href="${data.repo}" target="_blank" rel="noreferrer">GitHub ↗</a>`;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  modal.querySelector('.modal-close')?.focus();
}

function closeProjectModal() {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

projects.forEach(project => {
  project.addEventListener('click', event => {
    if (event.target.closest('a')) return;
    openProjectModal(project.dataset.project);
  });
  project.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openProjectModal(project.dataset.project);
    }
  });
});

document.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeProjectModal));
modal?.querySelector('.modal-panel')?.addEventListener('click', event => event.stopPropagation());
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal?.classList.contains('open')) closeProjectModal();
});
