document.addEventListener('DOMContentLoaded', () => {
  // Form validation and submission
  const leadForm = document.getElementById('lead-form');
  const productPage = document.getElementById('product-page');
  const leadFormContainer = document.getElementById('lead-form-container');
  const userName = document.getElementById('user-name');

  // Phone mask
  const phoneInput = document.getElementById('phone');
  phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    let formattedValue = '';
    if (value.length > 0) formattedValue = '(' + value.slice(0, 2);
    if (value.length > 2) formattedValue += ') ' + value.slice(2, 7);
    if (value.length > 7) formattedValue += '-' + value.slice(7, 11);

    e.target.value = formattedValue;
  });

  // Email validation
  function isValidEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // Form submission
  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    let isValid = true;

    // Validate name
    if (nameInput.value.trim() === '') {
      nameInput.classList.add('is-invalid');
      isValid = false;
    } else {
      nameInput.classList.remove('is-invalid');
    }

    // Validate email
    if (!isValidEmail(emailInput.value)) {
      emailInput.classList.add('is-invalid');
      isValid = false;
    } else {
      emailInput.classList.remove('is-invalid');
    }

    // Validate phone
    if (phoneInput.value.length < 14) {
      phoneInput.classList.add('is-invalid');
      isValid = false;
    } else {
      phoneInput.classList.remove('is-invalid');
    }

    if (isValid) {
      // Set user name in welcome message
      userName.textContent = nameInput.value.split(' ')[0];

      // Hide form and show product page
      leadFormContainer.style.display = 'none';
      productPage.classList.remove('d-none');

      // Initialize all product page components
      initAllComponents();
    }
  });

  // Sticky Header
  function initStickyHeader() {
    const header = document.getElementById('sticky-header');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Hero Carousel
  function initHeroCarousel() {
    const carousel = document.getElementById('hero-carousel');
    const carouselItems = carousel.querySelectorAll('.carousel-item');
    const thumbnails = document.querySelectorAll('.thumbnail');

    thumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener('click', function () {
        const slideIndex = Number.parseInt(this.getAttribute('data-slide'));

        // Remove active class from all thumbnails and add to clicked one
        thumbnails.forEach((thumb) => thumb.classList.remove('active'));
        this.classList.add('active');

        // Hide all slides and show the selected one
        carouselItems.forEach((item) => item.classList.remove('active'));
        carouselItems[slideIndex].classList.add('active');
      });
    });
  }

  // Gallery and Modal
  function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const closeModal = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    // Open modal when gallery item is clicked
    galleryItems.forEach((item, index) => {
      item.addEventListener('click', function () {
        currentIndex = index;
        const imgSrc = this.querySelector('img').src;
        modalImage.src = imgSrc;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    });

    // Close modal
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });

    // Navigate to previous image
    prevBtn.addEventListener('click', () => {
      currentIndex =
        (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      modalImage.src = galleryItems[currentIndex].querySelector('img').src;
    });

    // Navigate to next image
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % galleryItems.length;
      modalImage.src = galleryItems[currentIndex].querySelector('img').src;
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (modal.style.display === 'flex') {
        if (e.key === 'ArrowLeft') {
          prevBtn.click();
        } else if (e.key === 'ArrowRight') {
          nextBtn.click();
        } else if (e.key === 'Escape') {
          closeModal.click();
        }
      }
    });
  }

  // Testimonial Slider
  function initTestimonialSlider() {
    const slider = document.querySelector('.testimonials-slider');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    const pagination = document.querySelector('.testimonial-pagination');

    let currentSlide = 0;
    let startX,
      moveX,
      initialPosition,
      isDragging = false;

    // Create pagination dots
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('pagination-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      pagination.appendChild(dot);
    });

    // Update pagination
    function updatePagination() {
      const dots = document.querySelectorAll('.pagination-dot');
      dots.forEach((dot, index) => {
        if (index === currentSlide) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    // Go to specific slide
    function goToSlide(index) {
      currentSlide = index;
      slider.style.transform = `translateX(-${currentSlide * 100}%)`;
      updatePagination();
    }

    // Next slide
    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slides.length;
      goToSlide(currentSlide);
    });

    // Previous slide
    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      goToSlide(currentSlide);
    });

    // Touch and mouse events for manual sliding
    slider.addEventListener('mousedown', dragStart);
    slider.addEventListener('touchstart', dragStart);
    slider.addEventListener('mousemove', drag);
    slider.addEventListener('touchmove', drag);
    slider.addEventListener('mouseup', dragEnd);
    slider.addEventListener('touchend', dragEnd);
    slider.addEventListener('mouseleave', dragEnd);

    function dragStart(e) {
      isDragging = true;
      startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
      initialPosition = -currentSlide * 100;
      slider.style.transition = 'none';
    }

    function drag(e) {
      if (!isDragging) return;
      e.preventDefault();
      moveX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
      const diff = ((moveX - startX) / slider.offsetWidth) * 100;
      slider.style.transform = `translateX(${initialPosition + diff}%)`;
    }

    function dragEnd() {
      if (!isDragging) return;
      isDragging = false;
      slider.style.transition = 'transform 0.5s ease';

      const movedBy = ((moveX - startX) / slider.offsetWidth) * 100;

      if (movedBy < -10 && currentSlide < slides.length - 1) {
        currentSlide++;
      } else if (movedBy > 10 && currentSlide > 0) {
        currentSlide--;
      }

      goToSlide(currentSlide);
    }
  }

  // Countdown Timer
  function initCountdown() {
    const minutesElement = document.getElementById('countdown-minutes');
    const secondsElement = document.getElementById('countdown-seconds');

    let minutes = 15;
    let seconds = 0;

    function updateCountdown() {
      if (seconds === 0) {
        if (minutes === 0) {
          // Timer finished
          clearInterval(countdownInterval);
          return;
        }
        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }

      minutesElement.textContent = minutes.toString().padStart(2, '0');
      secondsElement.textContent = seconds.toString().padStart(2, '0');
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
  }

  // Function to initialize all components
  function initAllComponents() {
    // Initialize all components
    initStickyHeader();
    initHeroCarousel();
    initGallery();
    initTestimonialSlider();
    initCountdown();
  }

  // Check if we're on the product page or form page
  if (leadForm) {
    // Form validation is handled in form-validation.js
    // The form submission will trigger the initialization of product page components
  }

  // If product page is visible (e.g., user has already submitted the form)
  if (productPage && !productPage.classList.contains('d-none')) {
    initAllComponents();
  }

  // Service Worker Registration for offline functionality
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log(
            'ServiceWorker registration successful with scope: ',
            registration.scope
          );
        })
        .catch((error) => {
          console.log('ServiceWorker registration failed: ', error);
        });
    });
  }
});
