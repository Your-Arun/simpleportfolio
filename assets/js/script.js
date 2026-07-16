'use strict';

const navbar = document.querySelector("[data-navbar]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const toggleNavbar = () => {
  navbar.classList.toggle("active");
  navToggleBtn.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

navToggleBtn.addEventListener("click", toggleNavbar);

navbarLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (navbar.classList.contains("active")) {
      toggleNavbar();
    }
  });
});

// Sticky Header & Back to Top button toggles
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-to-top]");

window.addEventListener("scroll", () => {
  if (window.scrollY >= 80) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}, { passive: true });

// Portfolio category sorting
const filterBtns = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item-wrap");

filterBtns.forEach(btn => {
  btn.addEventListener("click", function () {
    filterBtns.forEach(b => b.classList.remove("active"));
    this.classList.add("active");

    const selectedFilter = this.getAttribute("data-filter");

    portfolioItems.forEach(item => {
      const categories = item.getAttribute("data-category").split(" ");
      
      if (selectedFilter === "all" || categories.includes(selectedFilter)) {
        item.classList.remove("hide");
        item.classList.add("show");
      } else {
        item.classList.remove("show");
        item.classList.add("hide");
      }
    });
  });
});

// Reveal animations on scroll
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: "0px 0px -40px 0px"
});

revealElements.forEach(el => revealObserver.observe(el));

// Active link highlighting on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar-link");

const navIndicatorObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const currentId = entry.target.getAttribute("id");
      
      navLinks.forEach(link => {
        if (link.getAttribute("href") === `#${currentId}`) {
          link.classList.add("active-link");
        } else {
          link.classList.remove("active-link");
        }
      });
    }
  });
}, {
  threshold: 0.25,
  rootMargin: "-20% 0px -60% 0px"
});

sections.forEach(sec => navIndicatorObserver.observe(sec));