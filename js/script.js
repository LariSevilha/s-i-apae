// Função para carregar componentes HTML
function loadHTML(id, file) {
    fetch(file)
      .then(res => {
        if (!res.ok) throw new Error(`Erro ao carregar ${file}`);
        return res.text();
      })
      .then(data => {
        const element = document.getElementById(id);
        if (element) {
          element.innerHTML = data;
          
          // Se carregou a navbar, inicializa funcionalidades
          if (id === 'navbar-placeholder') {
            initNavbar();
          }
        }
      })
      .catch(err => console.error('Erro ao carregar componente:', err));
  }
  
  // Inicializa funcionalidades da navbar
  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    // Efeito scroll na navbar
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
    
    // Fecha menu mobile ao clicar em link
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse);
          bsCollapse.hide();
        }
      });
    });
    
    // Marca link ativo baseado na página atual
    markActiveLink();
  }
  
  // Marca o link ativo baseado na URL
  function markActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }
  
  // Smooth scroll para âncoras
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
  
  // Animação de números (contador)
  function animateNumbers() {
    const numbers = document.querySelectorAll('.stat-number');
    
    numbers.forEach(number => {
      const target = parseInt(number.textContent);
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const timer = setInterval(() => {
              current += step;
              if (current >= target) {
                number.textContent = target + (number.dataset.suffix || '');
                clearInterval(timer);
              } else {
                number.textContent = Math.floor(current) + (number.dataset.suffix || '');
              }
            }, 16);
            observer.unobserve(entry.target);
          }
        });
      });
      
      observer.observe(number);
    });
  }
  
  // Lazy loading de imagens
  function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
  
  // Validação de formulários
  function initFormValidation() {
    const forms = document.querySelectorAll('.needs-validation');
    
    forms.forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }
  
  // Botão voltar ao topo
  function initBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Voltar ao topo');
    document.body.appendChild(backToTop);
    
    // CSS inline para o botão
    const style = document.createElement('style');
    style.textContent = `
      .back-to-top {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #ffc107, #f59f00);
        color: #412c54;
        border: none;
        border-radius: 50%;
        font-size: 1.25rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 1000;
      }
      .back-to-top.show {
        opacity: 1;
        visibility: visible;
      }
      .back-to-top:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0,0,0,0.3);
      }
    `;
    document.head.appendChild(style);
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });
    
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Tracking de eventos (analytics)
  function trackEvent(category, action, label) {
    // Exemplo: integração com Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        'event_category': category,
        'event_label': label
      });
    }
    console.log(`Track: ${category} - ${action} - ${label}`);
  }
  
  // Adiciona tracking aos botões CTA
  function initCTATracking() {
    const ctaButtons = document.querySelectorAll('.btn-warning, .btn-cta');
    
    ctaButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.textContent.trim();
        const page = window.location.pathname.split('/').pop() || 'index';
        trackEvent('CTA', 'click', `${page} - ${text}`);
      });
    });
  }
  
  // Inicialização quando o DOM estiver pronto
  document.addEventListener("DOMContentLoaded", () => {
    // Carrega componentes
    loadHTML("head-placeholder", "./includes/head.html");
    loadHTML("navbar-placeholder", "./includes/navbar.html");
    loadHTML("footer-placeholder", "./includes/footer.html");
    
    // Inicializa AOS (animações)
    if (typeof AOS !== 'undefined') {
      AOS.init({ 
        duration: 800, 
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
      });
    }
    
    // Aguarda um pouco para garantir que os componentes foram carregados
    setTimeout(() => {
      initSmoothScroll();
      animateNumbers();
      initLazyLoading();
      initFormValidation();
      initBackToTop();
      initCTATracking();
    }, 500);
  });
  
  // Performance: marca quando a página terminou de carregar
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    console.log('🚀 Página carregada com sucesso!');
  });