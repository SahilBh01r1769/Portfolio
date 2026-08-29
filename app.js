const nav = document.getElementById('nav');
const navLinks = document.getElementById('navLinks');
const mobileToggle = document.getElementById('mobileToggle');
const filterButtons = [...document.querySelectorAll('.filter-btn')];
const projectCards = [...document.querySelectorAll('.project-card')];

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 18);
});

mobileToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  mobileToggle.setAttribute('aria-expanded', String(open));
  mobileToggle.textContent = open ? '×' : '☰';
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    mobileToggle?.setAttribute('aria-expanded', 'false');
    if (mobileToggle) mobileToggle.textContent = '☰';
  });
});

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(item => item.classList.toggle('active', item === button));
    projectCards.forEach(card => {
      const visible = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !visible);
    });
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

document.getElementById('year').textContent = new Date().getFullYear();

// Keep every project card useful at a glance: open the deployed app or inspect the source.
const projectLinks = {
  'Serverless Receipt Processor': {
    demo: 'https://d3uo3z77ak8ix1.cloudfront.net/',
    repo: 'https://github.com/SahilBh01r1769/serverless-receipt-processor'
  },
  'Real-Time Violence Detection': {
    demo: 'https://violencedetectionai.streamlit.app/',
    repo: 'https://github.com/SahilBh01r1769/violence_detection'
  },
  'MetroPT-3 Predictive Maintenance': {
    demo: 'https://metropt3-predictive-maintenance.streamlit.app/',
    repo: 'https://github.com/SahilBh01r1769/metropt3-predictive-maintenance'
  },
  'Signal — Audio Transcription & Sentiment': {
    demo: 'https://d2h6neawct2uig.cloudfront.net/',
    repo: 'https://github.com/SahilBh01r1769/aws-audio-transcription-sentiment'
  },
  'CaptionLab — Explainable Image Captioning': {
    demo: 'https://image-captioningdemo.streamlit.app/',
    repo: 'https://github.com/SahilBh01r1769/image-captioning'
  },
  'TextScope — Evidence-Aware NLP': {
    demo: 'https://nlp-webapp.streamlit.app/',
    repo: 'https://github.com/SahilBh01r1769/textscope-nlp'
  },
  'Mythos Network — Indo-European Gods': {
    demo: 'https://sahilbh01r1769.github.io/indo_european_gods/',
    repo: 'https://github.com/SahilBh01r1769/indo_european_gods'
  }
};

projectCards.forEach(card => {
  const title = card.querySelector('h3')?.textContent.trim();
  const links = title ? projectLinks[title] : null;
  const target = card.querySelector('.project-links');
  if (!links || !target) return;

  target.replaceChildren();

  const demo = document.createElement('a');
  demo.href = links.demo;
  demo.target = '_blank';
  demo.rel = 'noreferrer';
  demo.textContent = 'Live demo ↗';
  demo.setAttribute('aria-label', `${title} live demo`);

  const repo = document.createElement('a');
  repo.href = links.repo;
  repo.target = '_blank';
  repo.rel = 'noreferrer';
  repo.textContent = 'GitHub ↗';
  repo.setAttribute('aria-label', `${title} GitHub repository`);

  target.append(demo, repo);
});

const RESUME_URL = 'resume.pdf';
const MEDIUM_URL = 'https://medium.com/@sahilbhoir151';

function makeLink({ href, label, className = '', external = false, download = false }) {
  const link = document.createElement('a');
  link.href = href;
  link.textContent = label;
  if (className) link.className = className;
  if (external) {
    link.target = '_blank';
    link.rel = 'noreferrer';
  }
  if (download) link.setAttribute('download', 'Sahil_Bhoir_Resume.pdf');
  return link;
}

const heroActions = document.querySelector('.hero-actions');
if (heroActions) {
  heroActions.append(
    makeLink({ href: RESUME_URL, label: 'Download resume ↓', className: 'btn btn-secondary', download: true }),
    makeLink({ href: MEDIUM_URL, label: 'Medium ↗', className: 'btn btn-secondary', external: true })
  );
}

const contactActions = document.querySelector('.contact-actions');
if (contactActions) {
  contactActions.append(
    makeLink({ href: RESUME_URL, label: 'Download resume ↓', className: 'btn btn-secondary', download: true }),
    makeLink({ href: MEDIUM_URL, label: 'Medium ↗', className: 'btn btn-secondary', external: true })
  );
}

const footerLinks = document.querySelector('.footer-links');
if (footerLinks) {
  footerLinks.append(
    makeLink({ href: MEDIUM_URL, label: 'Medium', external: true }),
    makeLink({ href: RESUME_URL, label: 'Resume', download: true })
  );
}
