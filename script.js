document.querySelectorAll('a[href^="#"]').forEach(ancora => {
  ancora.addEventListener("click", function(e) {
    e.preventDefault();
    const destino = document.querySelector(this.getAttribute("href"));
    if(destino) {
      destino.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

// script.js
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tabs .tab');
  const panels = document.querySelectorAll('.tab-content');

  function activate(targetId) {
    // Desativa tudo
    tabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    panels.forEach(p => p.classList.remove('active'));

    // Ativa a aba e o painel correspondentes
    const tab = Array.from(tabs).find(t => t.dataset.tab === targetId);
    const panel = document.getElementById(targetId);
    if (tab && panel) {
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      panel.classList.add('active');
    }
  }

  tabs.forEach(t => {
    t.addEventListener('click', () => activate(t.dataset.tab));
  });
});
