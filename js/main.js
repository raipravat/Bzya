document.addEventListener("DOMContentLoaded", function() {
  // Mobile menu variables
  const navbar = document.querySelector("#navbar");
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  
  // Track menu state
  let menuOpen = false;

  // Toggle menu function
  function toggleMenu() {
    menuOpen = !menuOpen;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    if (menuOpen) {
      // Open menu
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      navbarCollapse.classList.add('show');
    } else {
      // Close menu
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      navbarCollapse.classList.remove('show');
    }
  }

  // Toggle menu on button click
  navbarToggler.addEventListener('click', function(e) {
    e.preventDefault();
    toggleMenu();
  });

  // Close menu when clicking links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (menuOpen) {
        toggleMenu();
      }
      
      // Smooth scroll to section
      const targetId = link.getAttribute('href');
      if (targetId.startsWith('#')) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - navbar.offsetHeight,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (menuOpen && 
        !navbar.contains(e.target) && 
        e.target !== navbarToggler) {
      toggleMenu();
    }
  });

  // Navbar scroll effect
  window.addEventListener("scroll", function() {
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

  window.addEventListener("scroll", updateActiveNav);
  window.addEventListener("load", updateActiveNav);

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      
      const targetElement = document.querySelector(targetId);
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: "smooth"
      });
    });
  });

  // Back to top button
  const backToTopButton = document.querySelector(".back-to-top");
  window.addEventListener("scroll", function() {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("active");
    } else {
      backToTopButton.classList.remove("active");
    }
  });

  backToTopButton.addEventListener("click", function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // Counter animation
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

  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      formStatus.innerHTML = '<div class="alert alert-info">Sending your message...</div>';

      setTimeout(() => {
        formStatus.innerHTML = '<div class="alert alert-success">Thank you for your message! I will get back to you soon.</div>';
        contactForm.reset();
        setTimeout(() => { formStatus.innerHTML = ""; }, 5000);
      }, 1500);
    });
  }

  // Auto Year Update
  document.getElementById("currentYear").textContent = new Date().getFullYear();
});