let sliderIndex = 0;
const sliders = {
  home: [
    {src: 'sneakers.png', alt: 'New Arrival!!'},
    {src: 'sneakers2.png', alt: 'Seasonal Offer!!'},
    {src: 'jeans.png', alt: 'Exclusive Deal!!'}
  ],
};

function showSlide(page, n) {
  const slider = document.querySelector('.slider');
  if (!slider) return;
  const slides = sliders[page];
  sliderIndex = (n + slides.length) % slides.length;
  const img = slider.querySelector('img');
  $(img).fadeOut(200, function() {
    img.src = slides[sliderIndex].src;
    img.alt = slides[sliderIndex].alt;
    $(img).fadeIn(200);
  });
}

function initSlider(page) {
  sliderIndex = 0;
  const slider = document.querySelector('.slider');
  if (!slider) return;
  const img = slider.querySelector('img');
  img.src = sliders[page][0].src;
  img.alt = sliders[page][0].alt;
  slider.querySelector('.prev').onclick = () => showSlide(page, sliderIndex - 1);
  slider.querySelector('.next').onclick = () => showSlide(page, sliderIndex + 1);
}

document.addEventListener('DOMContentLoaded', function() {
  // Home slider
  if (document.body.classList.contains('home')) {
    initSlider('home');
  }
  // New Arrivals slider
  if (document.body.classList.contains('arrivals')) {
    initSlider('arrivals');
  }

  // Add to Cart Button Animation
  document.querySelectorAll('.add-cart').forEach(btn => {
    btn.addEventListener('click', function() {
      btn.textContent = 'Added!';
      btn.style.background = '#27ae60';
      setTimeout(() => {
        btn.textContent = 'Add to Cart';
        btn.style.background = '';
      }, 1200);
    });
  });

  // Register Form Validation
  const regForm = document.getElementById('registerForm');
  if (regForm) {
    regForm.addEventListener('submit', function(e) {
      e.preventDefault();
      let valid = true;
      // Clear previous errors
      regForm.querySelectorAll('.error').forEach(el => el.textContent = '');

      // Name
      const name = regForm.name.value.trim();
      if (name.length < 2) {
        regForm.querySelector('.error-name').textContent = 'Name must be at least 2 characters.';
        valid = false;
      }

      // Email (simple check, no regex)
      const email = regForm.email.value.trim();
      if (!email.includes('@') || !email.includes('.')) {
        regForm.querySelector('.error-email').textContent = 'Please enter a valid email address.';
        valid = false;
      }

      // Password
      const pw = regForm.password.value;
      if (pw.length < 6) {
        regForm.querySelector('.error-password').textContent = 'Password must be at least 6 characters.';
        valid = false;
      }

      // Age
      const age = Number(regForm.age.value);
      if (isNaN(age) || age < 13 || age > 120) {
        regForm.querySelector('.error-age').textContent = 'Enter a valid age between 13 and 120.';
        valid = false;
      }

      // Gender
      if (!regForm.gender.value) {
        regForm.querySelector('.error-gender').textContent = 'Please select your gender.';
        valid = false;
      }

      if (valid) {
        regForm.querySelector('.success').textContent = 'Registration successful!';
        regForm.reset();
      } else {
        regForm.querySelector('.success').textContent = '';
      }
    });
  }
});
