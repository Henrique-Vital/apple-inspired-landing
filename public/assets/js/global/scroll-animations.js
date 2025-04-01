/**
 * Scroll Animations
 * Handles animations that trigger when elements come into view
 */
document.addEventListener('DOMContentLoaded', () => {
  // Elements to animate on scroll
  const animatedElements = document.querySelectorAll(
    '.section-title, .section-description, .about-content, .about-image, ' +
      '.gallery-item, .testimonial-slide, .testimonial-controls, ' +
      '.cta-content, .countdown-container, .cta-button'
  );

  // Check if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    const animationObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          // If element is in viewport
          if (entry.isIntersecting) {
            // Add animate class to trigger animation
            entry.target.classList.add('animate');
            // Stop observing the element
            animationObserver.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -100px 0px', // Trigger when element is 100px into viewport
        threshold: 0.1, // Trigger when at least 10% of the element is visible
      }
    );

    // Observe each element
    animatedElements.forEach((element) => {
      animationObserver.observe(element);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    // Simply show all elements without animation
    animatedElements.forEach((element) => {
      element.classList.add('animate');
    });
  }

  // Back to top button functionality
  const backToTopButton = document.getElementById('back-to-top');

  if (backToTopButton) {
    // Show button when page is scrolled down
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    });

    // Smooth scroll to top when button is clicked
    backToTopButton.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

  anchorLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Get header height for offset
        const headerHeight =
          document.getElementById('sticky-header')?.offsetHeight || 0;

        // Calculate position
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        // Scroll to target
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });

        // Update URL hash without scrolling
        history.pushState(null, null, targetId);
      }
    });
  });
});
