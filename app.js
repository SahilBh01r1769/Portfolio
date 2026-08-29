const nav = document.getElementById('nav');
const navLinks = document.getElementById('navLinks');
const mobileToggle = document.getElementById('mobileToggle');
const filterButtons = [...document.querySelectorAll('.filter-btn')];
const projects = [...document.querySelectorAll('.project')];
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalKicker = document.getElementById('modalKicker');
const modalSummary = document.getElementById('modalSummary');
const modalFocus = document.getElementById('modalFocus');
const modalTradeoff = document.getElementById('modalTradeoff');
const modalArchitecture = document.getElementById('modalArchitecture');
const modalActions = document.getElementById('modalActions');

const PROJECT_DETAILS = {
  receipt: {
    kicker: 'Cloud / Document AI',
    title: 'Serverless Receipt Processor',
    summary: 'An authenticated AWS workflow that turns uploaded receipt images into structured, categorised expense records while keeping file transfer, OCR, orchestration and persistence as separate responsibilities.',
    focus: 'The main engineering work is the serverless architecture: Cognito authentication, presigned S3 upload, Textract OCR, Step Functions orchestration, Lambda processing and user-scoped DynamoDB access.',
    tradeoff: 'The system favours clear service boundaries and managed AWS components over a simpler single-service backend. That adds architecture overhead, but makes each stage independently understandable and replaceable.',
    architecture: ['Browser', 'Cognito', 'Presigned S3', 'Step Functions', 'Textract', 'Lambda parsing', 'DynamoDB'],
    demo: 'https://d3uo3z77ak8ix1.cloudfront.net/',
    repo: 'https://github.com/SahilBh01r1769/serverless-receipt-processor'
  },
  violence: {
    kicker: 'Computer Vision / Real-time',
    title: 'Real-Time Violence Detection',
    summary: 'A real-time monitoring application built around a public pretrained YOLOv8 violence checkpoint, with the surrounding engineering focused on video input, temporal filtering, alerting and inspection.',
    focus: 'OpenCV handles camera, RTSP and file sources; detections are passed through temporal consistency and cooldown logic before screenshots, history and email or WhatsApp alerts are triggered. FastAPI and Streamlit expose the system.',
    tradeoff: 'The model is intentionally treated as a pretrained dependency rather than a claimed custom training result. The project therefore demonstrates integration and real-time application engineering more than novel computer-vision research.',
    architecture: ['Video source', 'OpenCV', 'YOLOv8', 'Temporal filter', 'Alert cooldown', 'Screenshot/history', 'FastAPI / Streamlit'],
    demo: 'https://violencedetectionai.streamlit.app/',
    repo: 'https://github.com/SahilBh01r1769/violence_detection'
  },
  maintenance: {
    kicker: 'Industrial ML / Time Series',
    title: 'MetroPT-3 Predictive Maintenance',
    summary: 'A reproducible predictive-maintenance pipeline over more than 1.5 million compressor telemetry rows, designed around cadence-aware preprocessing and evaluation that avoids optimistic leakage.',
    focus: 'The pipeline validates and quarantines data, segments on timestamp gaps, generates cadence-aware windows, engineers 38 features, constructs failure-horizon labels and evaluates chronologically on a held-out failure episode.',
    tradeoff: 'The final-event baseline performs poorly, but that result is kept visible. The project prioritises a defensible evaluation setup over a flattering random split that could overstate predictive ability.',
    architecture: ['Raw telemetry', 'Validation', 'Gap segmentation', 'Windowing', '38 features', 'Failure-horizon labels', 'RF baseline', 'Chronological holdout'],
    demo: 'https://metropt3-predictive-maintenance.streamlit.app/',
    repo: 'https://github.com/SahilBh01r1769/metropt3-predictive-maintenance'
  },
  audio: {
    kicker: 'AWS / Streaming & Events',
    title: 'Signal — Audio Transcription & Sentiment',
    summary: 'A serverless speech application with both near-real-time browser interaction and asynchronous file processing, using different AWS event patterns for each path.',
    focus: 'The live path moves microphone chunks over API Gateway WebSockets to Transcribe and Comprehend with DynamoDB-backed session state. The batch path uses S3, Transcribe jobs and EventBridge completion events.',
    tradeoff: 'The live implementation uses short independent streaming chunks rather than one long-lived Transcribe stream. That fits the Lambda-based design, but it is a meaningful architectural compromise compared with a persistent streaming service.',
    architecture: ['Browser mic', 'WebSocket API', 'Lambda', 'Transcribe', 'Comprehend', 'DynamoDB', 'Browser updates'],
    demo: 'https://d2h6neawct2uig.cloudfront.net/',
    repo: 'https://github.com/SahilBh01r1769/aws-audio-transcription-sentiment'
  },
  caption: {
    kicker: 'Vision-Language / Deep Learning',
    title: 'CaptionLab — Explainable Image Captioning',
    summary: 'A research-oriented captioning project that keeps a ResNet50/LSTM baseline and extends it with spatial features, additive attention, beam search and token-level inspection.',
    focus: 'The custom architecture preserves the CNN feature grid, projects spatial features and lets the decoder attend to different regions for each generated word. Training includes staged CNN fine-tuning, coverage regularisation and image-level splitting.',
    tradeoff: 'Attention maps are presented as diagnostic signals rather than causal explanations. The repository also avoids claiming evaluation scores that have not been verified against a committed checkpoint.',
    architecture: ['Image', 'ResNet50 grid', '1×1 projection', 'Additive attention', 'LSTM decoder', 'Beam / greedy decode', 'Caption + attention'],
    demo: 'https://image-captioningdemo.streamlit.app/',
    repo: 'https://github.com/SahilBh01r1769/image-captioning'
  },
  textscope: {
    kicker: 'NLP / Evidence-aware UX',
    title: 'TextScope — Evidence-Aware NLP',
    summary: 'A document analysis workbench that keeps one shared source-evidence layer beneath summarisation, entities, salient concepts, sentiment, syntax and extractive question answering.',
    focus: 'spaCy, BART and RoBERTa are orchestrated through one shared NLP core. Entities and concepts keep sentence references, QA returns supporting source text or abstains, and summary diagnostics expose information coverage.',
    tradeoff: 'The project uses pretrained language models instead of custom training. Its contribution is the evidence-aware orchestration and interface design, with an emphasis on traceability rather than pretending confidence equals factual correctness.',
    architecture: ['Source document', 'Sentence evidence layer', 'spaCy / sentiment', 'BART summary', 'RoBERTa QA', 'Diagnostics', 'Streamlit / Flask'],
    demo: 'https://nlp-webapp.streamlit.app/',
    repo: 'https://github.com/SahilBh01r1769/textscope-nlp'
  },
  mythos: {
    kicker: 'Knowledge Graph / Data Visualisation',
    title: 'Mythos Network — Indo-European Gods',
    summary: 'An interactive computational exploration of mythological similarity that combines curated trait vectors with linguistic cognates, historical context, graph traversal and map-based exploration.',
    focus: 'Each deity is represented by a curated 16-dimensional trait vector. Cosine-style similarity and weighted overlap drive comparisons, while D3, Leaflet and Web Workers support graph, map, archetype and shortest-path views.',
    tradeoff: 'The trait vectors are explicitly heuristic and curated rather than objective historical measurements. Linguistic cognacy is kept conceptually separate from computational similarity to avoid conflating the two.',
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
