// Carrega includes e inicializa funcionalidades
document.addEventListener('DOMContentLoaded', function() {
    // Carregar Navbar
    fetch('../includes/navbar.html')
      .then(response => response.text())
      .then(data => {
        document.querySelector('#navbar-placeholder').innerHTML = data;
        
        // Navbar scroll effect
        const navbar = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
          if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
          } else {
            navbar.classList.remove('scrolled');
          }
        });
      })
      .catch(err => console.error('Erro carregando navbar:', err));
  
    // Carregar Footer
    fetch('../includes/footer.html')
      .then(response => response.text())
      .then(data => {
        document.querySelector('#footer-placeholder').innerHTML = data;
      })
      .catch(err => console.error('Erro carregando footer:', err));
  
    // Inicializa AOS
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out'
    });
  });
   
  // Partículas – menos em mobile
  function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
  
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 15 : 40;
  
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * (isMobile ? 4 : 6) + 2;
      p.style.width = p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.animationDuration = (Math.random() * (isMobile ? 20 : 15) + 10) + 's';
      p.style.animationDelay = Math.random() * 6 + 's';
      p.style.setProperty('--x-drift', (Math.random() * (isMobile ? 80 : 140) - (isMobile ? 40 : 70)) + 'px');
      container.appendChild(p);
    }
  }
  createParticles();
  
  // Stagger lista
  document.querySelectorAll('.edu-feature-list li').forEach((li, i) => {
    setTimeout(() => li.classList.add('show'), 300 + i * 120);
  });
  
  // Ripple
  document.querySelector('.edu-cta-btn')?.addEventListener('pointerdown', function(e) {
    e.preventDefault(); // evita zoom em alguns mobiles
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 800);
  });
  
  // Parallax só em desktop
  const title = document.getElementById('parallax-title');
  if (window.innerWidth >= 992) {
    window.addEventListener('mousemove', e => {
      const x = (window.innerWidth / 2 - e.clientX) / 60;
      const y = (window.innerHeight / 2 - e.clientY) / 80;
      title.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
 
  document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll("[data-animate]");
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    }, { threshold: 0.15 });
  
    elements.forEach(el => observer.observe(el));
  });
  // Navbar scrolled
(function(){
  const nav = document.querySelector(".navbar-sai");
  if(!nav) return;

  const onScroll = () => {
    if(window.scrollY > 12) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();

document.addEventListener("click", (e) => {
  const a = e.target.closest(".back-to-top");
  if (!a) return;
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
