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