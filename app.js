const nav = document.getElementById('nav');
const navLinks = document.getElementById('navLinks');
const mobileToggle = document.getElementById('mobileToggle');
const filterButtons = [...document.querySelectorAll('.filter-btn')];
const projects = [...document.querySelectorAll('.project')];

window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 16);
});

mobileToggle?.addEventListener('click', () => {
  const open = navLinks?.classList.toggle('open');
  mobileToggle.setAttribute('aria-expanded', String(Boolean(open)));
  mobileToggle.textContent = open ? 'Close' : 'Menu';
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    mobileToggle?.setAttribute('aria-expanded', 'false');
    if (mobileToggle) mobileToggle.textContent = 'Menu';
  });
});

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(item => item.classList.toggle('active', item === button));
    projects.forEach(project => {
      const visible = filter === 'all' || project.dataset.category === filter;
      project.classList.toggle('hidden', !visible);
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
