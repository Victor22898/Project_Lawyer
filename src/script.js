// script.js

// Плавное появление секций при скролле
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

sections.forEach(section => observer.observe(section));

// Всплывающее меню услуг из шапки
const servicesToggle = document.getElementById('servicesToggle');
const servicesPopup = document.getElementById('servicesPopup');
const arrow = servicesToggle.querySelector('.arrow');

servicesToggle.addEventListener('click', e => {
  e.preventDefault();
  const showed = servicesPopup.classList.toggle('show');
  arrow.classList.toggle('rotate', showed);
  servicesToggle.setAttribute('aria-expanded', showed ? 'true' : 'false');
});

// Закрыть меню, если клик вне
document.addEventListener('click', (e) => {
  if (!servicesToggle.contains(e.target) && !servicesPopup.contains(e.target)) {
    servicesPopup.classList.remove('show');
    arrow.classList.remove('rotate');
    servicesToggle.setAttribute('aria-expanded', 'false');
  }
});


// Модальное окно контактов
const contactModal = document.getElementById('contactModal');
const contactOpenButtons = document.querySelectorAll('#contactOpen, #contactOpenBtn');
const contactClose = document.getElementById('contactClose');

contactOpenButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    contactModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });
});

contactClose.addEventListener('click', () => {
  contactModal.classList.add('hidden');
  document.body.style.overflow = '';
});

// Закрытие модального окна по клику на подложку
contactModal.addEventListener('click', e => {
  if (e.target === contactModal) {
    contactModal.classList.add('hidden');
    document.body.style.overflow = '';
  }
});

// Отправка формы с валидацией
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const form = e.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const service = form.service.value;
  const message = form.message.value.trim();

  if (!name || !email || !service || !message) {
    alert('Пожалуйста, заполните все поля формы.');
    return;
  }

  alert(`Спасибо, ${name}! Ваша заявка на услугу "${service}" принята.`);
  form.reset();
  contactModal.classList.add('hidden');
  document.body.style.overflow = '';
});
