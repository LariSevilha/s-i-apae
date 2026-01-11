// Carrega includes e inicializa funcionalidades
document.addEventListener('DOMContentLoaded', function() {
    // Carregar Navbar
    fetch('includes/navbar.html')
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
    fetch('includes/footer.html')
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
  