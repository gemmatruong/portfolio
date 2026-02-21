// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector(".theme-icon");
const html = document.documentElement;

const savedTheme = localStorage.getItem("theme") || "dark";
html.setAttribute("data-theme", savedTheme);
updateIcon(savedTheme);

themeToggle.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    const newTheme = current === "dark" ? "light" : "dark";

    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateIcon(newTheme);
});

function updateIcon(theme) {
    themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
}

// Typing Effect
const text = "Hi, I'm Gemma";
const typingElement = document.getElementById("typing");

let index = 0;

function type() {
    if (index < text.length) {
        typingElement.textContent += text.charAt(index);
        index++;
        setTimeout(type, 100);
    }
}

const track = document.getElementById("projectsTrack");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");

// Scroll by ~1 card width
function scrollByCard(direction) {
  const card = track.querySelector(".project-card");
  if (!card) return;

  const gap = 18; // must match CSS gap
  const amount = card.getBoundingClientRect().width + gap;

  track.scrollBy({ left: direction * amount, behavior: "smooth" });
}

prevBtn.addEventListener("click", () => scrollByCard(-1));
nextBtn.addEventListener("click", () => scrollByCard(1));

// Keyboard support (when track focused)
track.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") scrollByCard(-1);
  if (e.key === "ArrowRight") scrollByCard(1);
});

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


// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

type();
