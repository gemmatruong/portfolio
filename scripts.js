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


type();
