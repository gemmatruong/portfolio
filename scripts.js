document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.querySelector(".theme-icon");
  const html = document.documentElement;

  function updateIcon(theme) {
    if (themeIcon) {
      themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
    }
  }

  const savedTheme = localStorage.getItem("theme") || "dark";
  html.setAttribute("data-theme", savedTheme);
  updateIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = html.getAttribute("data-theme");
      const newTheme = current === "dark" ? "light" : "dark";

      html.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateIcon(newTheme);
    });
  }

  // Hamburger Menu
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      navLinks.classList.toggle("open");
    });

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        navLinks.classList.remove("open");
      });
    });
  }

  // Typing Effect
  const text = "Hi, I'm Gemma";
  const typingElement = document.getElementById("typing");
  let index = 0;

  function type() {
    if (!typingElement) return;

    if (index < text.length) {
      typingElement.textContent += text.charAt(index);
      index++;
      setTimeout(type, 100);
    }
  }

  if (typingElement) {
    typingElement.textContent = "";
    type();
  }

  // Carousel
  const track = document.getElementById("projectsTrack");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  function scrollByCard(direction) {
    if (!track) return;

    const card = track.querySelector(".project-card");
    if (!card) return;

    const gap = 18; // must match CSS gap
    const amount = card.getBoundingClientRect().width + gap;

    track.scrollBy({
      left: direction * amount,
      behavior: "smooth",
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => scrollByCard(-1));
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => scrollByCard(1));
  }

  if (track) {
    // Keyboard support
    track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") scrollByCard(-1);
      if (e.key === "ArrowRight") scrollByCard(1);
    });

    // Drag support
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    track.addEventListener("mousedown", (e) => {
      isDown = true;
      track.classList.add("dragging");
      startX = e.pageX;
      scrollLeft = track.scrollLeft;
    });

    window.addEventListener("mouseup", () => {
      isDown = false;
      track.classList.remove("dragging");
    });

    track.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const dx = (e.pageX - startX) * 1.2;
      track.scrollLeft = scrollLeft - dx;
    });
  }

  // Navbar Scroll Effect
  const navbar = document.getElementById("navbar");

  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  // Intersection Observer for Fade-in Animations
  const fadeElements = document.querySelectorAll(".fade-in");

  if (fadeElements.length > 0) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    fadeElements.forEach((el) => observer.observe(el));
  }

  // Smooth Scroll for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetSelector = this.getAttribute("href");

      if (!targetSelector || targetSelector === "#") return;

      const target = document.querySelector(targetSelector);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});