const nav = document.getElementById('nav');
const navLinks = document.getElementById('navLinks');
const mobileToggle = document.getElementById('mobileToggle');
const projectGrid = document.getElementById('projectGrid');
const articlesGrid = document.getElementById('articlesGrid');
const modal = document.getElementById('projectModal');
const modalPanel = modal?.querySelector('.modal-panel');
const modalTitle = document.getElementById('modalTitle');
const modalKicker = document.getElementById('modalKicker');
const modalSummary = document.getElementById('modalSummary');
const modalFocus = document.getElementById('modalFocus');
const modalTradeoff = document.getElementById('modalTradeoff');
const modalArchitecture = document.getElementById('modalArchitecture');
const modalActions = document.getElementById('modalActions');

const PROJECTS = window.PORTFOLIO_PROJECTS || [];
const ARTICLES = window.PORTFOLIO_ARTICLES || [];
const MODAL_THEMES = ['modal-warm', 'modal-ink', 'modal-acid', 'modal-blue', 'modal-violet', 'modal-paper', 'modal-clay'];

function createProjectCard(project) {
  const article = document.createElement('article');
  article.className = `project ${project.size} ${project.theme} reveal`;
  article.dataset.category = project.category;
  article.dataset.project = project.id;
  article.tabIndex = 0;

  const tags = project.tags.map(tag => `<span>${tag}</span>`).join('');
  article.innerHTML = `
    <div class="project-top"><span>${project.eyebrow}</span><span>${project.meta}</span></div>
    <div class="project-content">
      <h3>${project.title}</h3>
      <p>${project.short}</p>
      <div class="chips">${tags}</div>
    </div>
    <div class="project-links">
      <a href="${project.demo}" target="_blank" rel="noreferrer">Live demo ↗</a>
      <a href="${project.repo}" target="_blank" rel="noreferrer">GitHub ↗</a>
    </div>
    <span class="inspect-hint">Open details →</span>`;
  return article;
}

function createArticleCard(article) {
  const link = document.createElement('a');
  link.className = 'article-card reveal';
  link.href = article.url;
  link.target = '_blank';
  link.rel = 'noreferrer';
  link.innerHTML = `
    <span class="article-num">${article.number}</span>
    <div>
      <small>${article.category}</small>
      <h3>${article.title}</h3>
      <p>${article.description}</p>
    </div>
    <span class="arrow">↗</span>`;
  return link;
}

function renderContent() {
  projectGrid?.replaceChildren(...PROJECTS.map(createProjectCard));
  articlesGrid?.replaceChildren(...ARTICLES.map(createArticleCard));
}

function getProjectCards() {
  return [...document.querySelectorAll('.project')];
}

function setupProjectFilters() {
  const filterButtons = [...document.querySelectorAll('.filter-btn')];
  filterButtons.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(item => item.classList.toggle('active', item === button));
    getProjectCards().forEach(project => {
      project.classList.toggle('hidden', !(filter === 'all' || project.dataset.category === filter));
    });
  }));
}

function setupRevealAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}

function openProjectModal(key) {
  const data = PROJECTS.find(project => project.id === key);
  if (!data || !modal) return;

  modalPanel?.classList.remove(...MODAL_THEMES);
  if (data.modalTheme) modalPanel?.classList.add(data.modalTheme);
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

function setupProjectModal() {
  getProjectCards().forEach(project => {
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

  document.querySelectorAll('[data-close-modal]').forEach(element => element.addEventListener('click', closeProjectModal));
  modal?.querySelector('.modal-panel')?.addEventListener('click', event => event.stopPropagation());
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal?.classList.contains('open')) closeProjectModal();
  });
}

function setupNavigation() {
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
}

renderContent();
setupNavigation();
setupProjectFilters();
setupProjectModal();
setupRevealAnimations();

document.getElementById('year').textContent = new Date().getFullYear();
