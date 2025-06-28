// Enhanced JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS animation
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    offset: 100,
  });

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Active navigation indicator
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-link");

  function updateActiveNav() {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 100) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active");
      }
    });
  }

  // Run on scroll and on load
  window.addEventListener("scroll", updateActiveNav);
  window.addEventListener("load", updateActiveNav);

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: "smooth",
      });

      // Close mobile menu if open
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse.classList.contains("show")) {
        navbarCollapse.classList.remove("show");
      }
    });
  });

  // Back to top button
  const backToTopButton = document.querySelector(".back-to-top");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("active");
    } else {
      backToTopButton.classList.remove("active");
    }
  });

  backToTopButton.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Counter animation for stats
  const counters = document.querySelectorAll(".counter");
  const speed = 200;
  let animated = false;

  function animateCounters() {
    if (animated) return;
    animated = true;

    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText.replace(/,/g, "");
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment).toLocaleString();
        setTimeout(animateCounters, 1);
      } else {
        counter.innerText = target.toLocaleString();
      }
    });
  }

  // Start counter animation when stats section is in view
  const statsSection = document.querySelector("#stats");
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
        observer.unobserve(statsSection);
      }
    },
    { threshold: 0.5 }
  );

  observer.observe(statsSection);

  // Form submission
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);

    // Simulate form submission (replace with actual fetch in production)
    formStatus.innerHTML =
      '<div class="alert alert-info">Sending your message...</div>';

    setTimeout(() => {
      formStatus.innerHTML =
        '<div class="alert alert-success">Thank you for your message! I will get back to you soon.</div>';
      contactForm.reset();

      // Hide success message after 5 seconds
      setTimeout(() => {
        formStatus.innerHTML = "";
      }, 5000);
    }, 1500);
  });

  // Photo card click event (for lightbox - would need additional implementation)
  document.querySelectorAll(".photo-card").forEach((card) => {
    card.addEventListener("click", function () {
      // In a real implementation, this would open the image in a lightbox
      // For now, we'll just add a visual feedback
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 200);
    });
  });

  // Lazy load images and iframes
  const lazyLoadElements = document.querySelectorAll(
    "[data-src], [data-srcset]"
  );

  const lazyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;

          if (element.tagName === "IMG") {
            if (element.dataset.src) {
              element.src = element.dataset.src;
            }
            if (element.dataset.srcset) {
              element.srcset = element.dataset.srcset;
            }
          } else if (element.tagName === "IFRAME") {
            element.src = element.dataset.src;
          }

          element.removeAttribute("data-src");
          element.removeAttribute("data-srcset");
          lazyObserver.unobserve(element);
        }
      });
    },
    { rootMargin: "100px" }
  );

  lazyLoadElements.forEach((element) => {
    lazyObserver.observe(element);
  });

  // Add fade-in class to elements as they come into view
  const fadeElements = document.querySelectorAll(".fade-in-element");

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeElements.forEach((element) => {
    fadeObserver.observe(element);
  });
});
