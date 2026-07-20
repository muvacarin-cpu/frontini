/* ==========================================================
   FRONTINI SPORTS ACADEMIA — app.js
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     MENU HAMBÚRGUER (mobile)
     ---------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // fecha o menu ao clicar em um link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ----------------------------------------------------------
     ABAS DAS UNIDADES
     ---------------------------------------------------------- */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');

      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      tabContents.forEach(content => {
        if (content.id === `tab-${target}`) {
          content.style.display = 'block';
          content.classList.add('active');
        } else {
          content.style.display = 'none';
          content.classList.remove('active');
        }
      });
    });
  });

  /* ----------------------------------------------------------
     CALCULADORA DE IMC
     ---------------------------------------------------------- */
  const imcForm = document.getElementById('imc-form');
  const imcResult = document.getElementById('imc-result');
  const resultNumber = document.getElementById('result-number');
  const resultLabel = document.getElementById('result-label');
  const resultText = document.getElementById('result-text');

  function classificarIMC(imc) {
    if (imc < 18.5) {
      return {
        label: 'Abaixo do Peso',
        text: 'Seu IMC está abaixo da faixa recomendada. Um plano de treinos de musculação focado em ganho de massa pode te ajudar a alcançar um peso mais saudável. Fale com um de nossos instrutores na Frontini Sports.'
      };
    }
    if (imc < 25) {
      return {
        label: 'Peso Saudável',
        text: 'Excelente! Seu peso está na faixa recomendada. Continue com treinos de musculação na Frontini Sports para fortalecer as articulações e acelerar o metabolismo.'
      };
    }
    if (imc < 30) {
      return {
        label: 'Sobrepeso',
        text: 'Seu IMC está um pouco acima da faixa ideal. Treinos funcionais e aeróbicos combinados com musculação ajudam a reduzir gordura corporal de forma saudável e progressiva.'
      };
    }
    return {
      label: 'Obesidade',
      text: 'Seu IMC indica risco elevado à saúde. Recomendamos iniciar com acompanhamento de um Personal Trainer da Frontini Sports para montar um plano seguro e gradual de exercícios.'
    };
  }

  if (imcForm) {
    imcForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const weightInput = document.getElementById('imc-weight').value.replace(',', '.');
      const heightInput = document.getElementById('imc-height').value.replace(',', '.');

      const weight = parseFloat(weightInput);
      const height = parseFloat(heightInput);

      if (!weight || !height || weight <= 0 || height <= 0) {
        resultNumber.textContent = '--';
        resultLabel.textContent = 'Dados inválidos';
        resultText.textContent = 'Por favor, preencha o peso (kg) e a altura (m) corretamente. Ex: peso 75.5, altura 1.78.';
        imcResult.classList.add('show');
        return;
      }

      const imc = weight / (height * height);
      const classificacao = classificarIMC(imc);

      resultNumber.textContent = imc.toFixed(1);
      resultLabel.textContent = classificacao.label;
      resultText.textContent = classificacao.text;
      imcResult.classList.add('show');
    });
  }

  /* ----------------------------------------------------------
     NEWSLETTER (Unidade 3)
     ---------------------------------------------------------- */
  const newsletterForm = document.getElementById('newsletter-form');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('.newsletter-input');
      const button = newsletterForm.querySelector('.newsletter-btn');

      if (!emailInput.value) return;

      const originalText = button.textContent;
      button.textContent = 'Cadastrado!';
      button.style.background = '#2fa85a';
      emailInput.value = '';

      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
      }, 2500);
    });
  }

  /* ----------------------------------------------------------
     FORMULÁRIO DE CONTATO -> WHATSAPP
     ---------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const WHATSAPP_NUMBER = '5517996359139';

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !message) return;

      const texto = `Olá! Meu nome é ${name}. ${message}`;
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;

      window.open(url, '_blank');
      contactForm.reset();
    });
  }

  /* ----------------------------------------------------------
     NAVBAR COM SOMBRA AO ROLAR
     ---------------------------------------------------------- */
  const navbar = document.querySelector('.navbar');

  function handleScroll() {
    if (window.scrollY > 20) {
      navbar.style.boxShadow = '0 10px 30px -20px rgba(0,0,0,0.7)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  }
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  /* ----------------------------------------------------------
     REVELAÇÃO DE ELEMENTOS AO ROLAR
     ---------------------------------------------------------- */
  const revealTargets = document.querySelectorAll(
    '.service-card, .unit-info-card, .imc-calculator-card, .rating-summary-card, .method-card'
  );

  if ('IntersectionObserver' in window && revealTargets.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

});
