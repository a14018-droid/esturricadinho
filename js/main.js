/* Esturricadinho — small interactions: sticky header, mobile nav,
   language switch (PT/EN), scroll reveals. */

(function () {
  "use strict";

  var header = document.getElementById("siteHeader");
  var nav = document.getElementById("nav");
  var navToggle = document.getElementById("navToggle");
  var langToggle = document.getElementById("langToggle");
  var translatable = Array.prototype.slice.call(document.querySelectorAll("[data-pt]"));
  var lang = "pt";

  /* ---------- sticky header ---------- */
  function onScroll() {
    header.classList.toggle("is-solid", window.scrollY > 40);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- mobile nav ---------- */
  function closeNav() {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  navToggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  nav.addEventListener("click", function (event) {
    if (event.target.tagName === "A") closeNav();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeNav();
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 860) closeNav();
  });

  /* ---------- language ---------- */
  function applyLang(next) {
    lang = next === "en" ? "en" : "pt";
    document.documentElement.lang = lang === "pt" ? "pt-PT" : "en";

    translatable.forEach(function (node) {
      var value = lang === "en" ? node.dataset.en : node.dataset.pt;
      if (typeof value === "string") node.innerHTML = value;
    });

    langToggle.textContent = lang === "pt" ? "EN" : "PT";
    langToggle.setAttribute(
      "aria-label",
      lang === "pt" ? "Switch to English" : "Mudar para português"
    );

    try {
      localStorage.setItem("esturricadinho-lang", lang);
    } catch (err) {
      /* storage unavailable — ignore */
    }
  }

  langToggle.addEventListener("click", function () {
    applyLang(lang === "pt" ? "en" : "pt");
  });

  var stored = null;
  try {
    stored = localStorage.getItem("esturricadinho-lang");
  } catch (err) {
    /* ignore */
  }
  applyLang(stored === "en" ? "en" : "pt");

  /* ---------- reveal on scroll ---------- */
  var revealItems = document.querySelectorAll("[data-reveal]");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  /* ---------- footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
