// ✅ Scroll suave + compensar header fixo (melhor que scrollIntoView puro)
document.querySelectorAll('.nav a[href^="#"]').forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const id = link.getAttribute("href");
    const section = document.querySelector(id);
    const header = document.querySelector(".header");
    const headerHeight = header ? header.offsetHeight : 0;

    if (section) {
      const top = section.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});


// ✅ Tabs (mantém só UM sistema - remove duplicação)
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tabs .tab');
  const panels = document.querySelectorAll('.tab-content');

  function activate(targetId) {
    tabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    panels.forEach(p => p.classList.remove('active'));

    const tab = Array.from(tabs).find(t => t.dataset.tab === targetId);
    const panel = document.getElementById(targetId);

    if (tab && panel) {
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      panel.classList.add('active');
    }
  }

  tabs.forEach(t => t.addEventListener('click', () => activate(t.dataset.tab)));
});


// ✅ Active do menu conforme a seção visível (Scroll Spy)
const navLinks = document.querySelectorAll(".nav a[href^='#']");
const header = document.querySelector(".header");
const headerHeight = header ? header.offsetHeight : 0;

// Pegamos as seções que realmente existem no menu
const sectionIds = Array.from(navLinks).map(a => a.getAttribute("href"));
const sections = sectionIds
  .map(id => document.querySelector(id))
  .filter(Boolean);

// Usando IntersectionObserver (mais suave e confiável)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = `#${entry.target.id}`;

      navLinks.forEach(a => a.classList.remove("active"));
      const activeLink = document.querySelector(`.nav a[href='${id}']`);
      if (activeLink) activeLink.classList.add("active");
    }
  });
}, {
  root: null,
  threshold: 0.5, // 50% da seção aparecendo = ativa
  rootMargin: `-${headerHeight}px 0px -40% 0px` // ajusta por causa do header fixo
});

sections.forEach(sec => observer.observe(sec));
