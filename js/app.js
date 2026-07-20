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
     IMC CALCULATOR LOGIC
     ========================================== */
  const imcForm = document.getElementById('imc-form');
  const weightInput = document.getElementById('imc-weight');
  const heightInput = document.getElementById('imc-height');
  const resultDiv = document.getElementById('imc-result');
  const resultNum = document.getElementById('result-number');
  const resultLabel = document.getElementById('result-label');
  const resultText = document.getElementById('result-text');

  if (imcForm) {
    imcForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Read values and convert comma to dot if needed
      const weight = parseFloat(weightInput.value.replace(',', '.'));
      const height = parseFloat(heightInput.value.replace(',', '.'));

      if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        alert('Por favor, insira valores válidos de peso (kg) e altura (m).');
        return;
      }

      // Height logic checking (if they wrote in cm instead of m, e.g. 175 instead of 1.75)
      let finalHeight = height;
      if (height > 3) {
        finalHeight = height / 100;
      }

      const imc = weight / (finalHeight * finalHeight);
      const roundedImc = imc.toFixed(1);

      resultNum.textContent = roundedImc;
      resultDiv.style.display = 'block';

      // Define classification
      let label = '';
      let text = '';
      let color = '#ff5a00'; // Default orange

      if (imc < 18.5) {
        label = 'Abaixo do Peso';
        text = 'Atenção! Você está abaixo do peso ideal para a sua altura. Recomendamos consultar profissionais de saúde para adequação alimentar e treinos personalizados de hipertrofia na Frontini Sports!';
        color = '#ffc107'; // Yellow
      } else if (imc >= 18.5 && imc < 25) {
        label = 'Peso Saudável';
        text = 'Excelente! Seu peso está na faixa considerada saudável. Continue mantendo uma rotina ativa com musculação e aeróbicos na Frontini Sports para reter massa muscular e saúde cardíaca.';
        color = '#2ed573'; // Green
      } else if (imc >= 25 && imc < 30) {
        label = 'Sobrepeso';
        text = 'Atenção. Você está na faixa de sobrepeso. Atividades físicas regulares como musculação combinada com treinos funcionais na Frontini Sports são ótimas aliadas para recomposição corporal.';
        color = '#ffa500'; // Light Orange
      } else {
        label = 'Obesidade';
        text = 'Cuidado! Seu IMC indica obesidade. A prática de exercícios sob orientação é vital para reduzir riscos de doenças associadas. Nossos instrutores especializados estão prontos para te guiar com segurança.';
        color = '#ff3c00'; // Red/Dark Orange
      }

      resultLabel.textContent = label;
      resultLabel.style.borderColor = color;
      resultLabel.style.backgroundColor = `${color}15`; // Light transparency
      resultLabel.style.color = color;
      resultNum.style.color = color;
      
      // Scroll into view gently
      setTimeout(() => {
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    });
  }

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
     CONTACT FORM & WHATSAPP REDIRECT
     ========================================== */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value;
      const message = document.getElementById('contact-message').value;

      // Base WhatsApp URL with Catanduva unit contact phone
      const phone = '5517996359139';
      const text = `Olá, meu nome é ${encodeURIComponent(name)}. Gostaria de mais informações sobre a academia: ${encodeURIComponent(message)}`;
      const waUrl = `https://wa.me/${phone}?text=${text}`;

      // Open in new tab
      window.open(waUrl, '_blank');
    });
  }

});
