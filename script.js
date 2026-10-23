// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

function setMenu(open) {
  nav.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.textContent = open ? "Close" : "Menu";
}

menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

// Highlight the nav link for the section being viewed
const links = nav.querySelectorAll("a");
const sections = document.querySelectorAll("main section[id]");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id));
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });
sections.forEach(s => observer.observe(s));

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Light / Dark button (remembers your choice in this browser)
const root = document.documentElement;
const themeBtn = document.getElementById("themeBtn");

function applyTheme(theme) {
  root.dataset.theme = theme;
  themeBtn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  try { localStorage.setItem("theme", theme); } catch (e) {}
}

themeBtn.addEventListener("click", () => applyTheme(root.dataset.theme === "dark" ? "light" : "dark"));
applyTheme(root.dataset.theme === "dark" ? "dark" : "light");
