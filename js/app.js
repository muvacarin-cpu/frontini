document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================
     STICKY NAVBAR EFFECT
     ========================================== */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* ==========================================
     MOBILE HAMBURGER MENU
     ========================================== */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const links = document.querySelectorAll('.nav-link, .nav-cta');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking on links
    links.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  /* ==========================================
     UNIDADES TABS SWITCHER
     ========================================== */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => {
        content.classList.remove('active');
        // Small delay to reset transform/opacity state
        setTimeout(() => {
          if (!content.classList.contains('active')) {
            content.style.display = 'none';
          }
        }, 100);
      });

      // Add active class to clicked button
      button.classList.add('active');

      // Find and active target content
      const targetContent = document.getElementById(`tab-${targetTab}`);
      if (targetContent) {
        targetContent.style.display = 'block';
        // Allow display: block to render before adding active class for animation
        setTimeout(() => {
          targetContent.classList.add('active');
        }, 50);
      }
    });
  });

  /* ==========================================
     NEWSLETTER FORM (UNIDADE 3)
     ========================================== */
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input');
      if (emailInput && emailInput.value.trim() !== '') {
        alert('Obrigado! Seu e-mail foi cadastrado. Você receberá atualizações sobre as obras e a inauguração da Unidade 3!');
        emailInput.value = '';
      }
    });
  }

  /* ==========================================
     CARROSSEL AUTOMÁTICO DE FOTOS DAS UNIDADES
     ========================================== */
  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const slides = carousel.querySelectorAll('.unit-carousel-slide');
    const dots = carousel.querySelectorAll('.unit-carousel-dot');
    let current = 0;

    if (slides.length <= 1) return;

    function goToSlide(index) {
      slides[current].classList.remove('active');
      if (dots[current]) dots[current].classList.remove('active');
      current = index;
      slides[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
    }

    setInterval(() => {
      const next = (current + 1) % slides.length;
      goToSlide(next);
    }, 3500);
  });

});
