/* Navigation and reading polish: compact header, "On this page" strip, folds, tap cues.
   Loaded last on every page, after each page's own content has been drawn. */
(function () {
  var root = document.documentElement;
  var header = document.querySelector(".masthead");
  var main = document.querySelector("main");
  if (!header || !main) return;

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /* Header: stays reachable, and slims down once the reader scrolls */
  function setHead() { root.style.setProperty("--head-h", header.offsetHeight + "px"); }
  window.addEventListener("scroll", function () {
    var y = window.scrollY;
    if (!header.classList.contains("is-compact") && y > 140) { header.classList.add("is-compact"); setHead(); }
    else if (header.classList.contains("is-compact") && y < 20) { header.classList.remove("is-compact"); setHead(); }
  }, { passive: true });
  window.addEventListener("resize", setHead);
  setHead();

  // On phones the menu scrolls sideways; bring the current page into view
  var current = document.querySelector(".nav a[aria-current]");
  if (current) {
    var list = current.closest(".nav__list");
    if (list && list.scrollWidth > list.clientWidth) list.scrollLeft = Math.max(0, current.offsetLeft - 24);
  }

  /* Folds: show the essentials, keep the rest a tap away */
  function foldButton(container, label, open, onToggle) {
    var b = el("button", "fold-btn");
    b.type = "button";
    b.setAttribute("aria-expanded", open ? "true" : "false");
    b.innerHTML = "";
    b.appendChild(el("span", null, label));
    b.addEventListener("click", function () {
      var nowOpen = b.getAttribute("aria-expanded") !== "true";
      b.setAttribute("aria-expanded", nowOpen ? "true" : "false");
      onToggle(nowOpen, b);
    });
    container.parentNode.insertBefore(b, container.nextSibling);
    return b;
  }
  document.querySelectorAll("[data-fold-keep]").forEach(function (box) {
    var keep = parseInt(box.getAttribute("data-fold-keep"), 10);
    var items = Array.prototype.filter.call(box.children, function (c) { return c.tagName !== "SCRIPT"; });
    if (items.length <= keep + 1) return;
    var noun = box.getAttribute("data-fold-label") || "entries";
    function set(open, b) {
      items.forEach(function (it, i) { it.hidden = !open && i >= keep; });
      b.firstChild.textContent = open ? "Show fewer" : "Show all " + items.length + " " + noun;
    }
    var b = foldButton(box, "", false, set);
    set(false, b);
  });
  document.querySelectorAll("[data-fold-prose]").forEach(function (box) {
    var paras = box.querySelectorAll(":scope > p");
    if (paras.length < 2) return;
    function set(open, b) {
      for (var i = 1; i < paras.length; i++) paras[i].hidden = !open;
      box.classList.toggle("is-folded", !open);
      b.firstChild.textContent = open ? "Show less" : "Read the rest";
    }
    var b = foldButton(box, "", false, set);
    set(false, b);
  });

  /* On this page: reading time and jump links to each section */
  var heads = Array.prototype.filter.call(main.querySelectorAll("h2"), function (h) {
    return !h.closest(".dossier, .flip, .notice, .lex, .note-wrap") && h.offsetParent !== null;
  });
  var words = (main.innerText || "").split(/\s+/).length;
  var minutes = Math.max(1, Math.round(words / 230));
  var strip = el("nav", "onpage");
  strip.setAttribute("aria-label", "On this page");
  var inner = el("div", "onpage__inner wrap");
  inner.appendChild(el("span", "onpage__time", minutes + " min read"));
  var links = [];
  if (heads.length >= 2) {
    heads.forEach(function (h) {
      if (!h.id) h.id = h.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      var a = el("a", "onpage__link", h.textContent.replace(/\s+/g, " ").trim());
      a.href = "#" + h.id;
      inner.appendChild(a);
      links.push([a, h]);
    });
  } else {
    strip.classList.add("onpage--static");
  }
  strip.appendChild(inner);
  var head = main.querySelector(".page-head");
  if (head) head.parentNode.insertBefore(strip, head.nextSibling);
  else if (main.firstElementChild && main.firstElementChild.classList.contains("night")) main.insertBefore(strip, main.firstElementChild);
  else main.insertBefore(strip, main.firstChild);

  function mark() {
    if (!links.length) return;
    var line = header.offsetHeight + strip.offsetHeight + 40, active = null;
    links.forEach(function (pair) { if (pair[1].getBoundingClientRect().top < line) active = pair; });
    links.forEach(function (pair) {
      var on = pair === active;
      pair[0].classList.toggle("is-current", on);
      if (on && inner.scrollWidth > inner.clientWidth) {
        var a = pair[0];
        if (a.offsetLeft < inner.scrollLeft || a.offsetLeft + a.offsetWidth > inner.scrollLeft + inner.clientWidth) inner.scrollLeft = a.offsetLeft - 60;
      }
    });
  }
  window.addEventListener("scroll", mark, { passive: true });
  mark();

  /* Front Page: the latest Ledger in one line, and the rest of the paper under Where to Start */
  var line = document.querySelector("[data-ledger-line]");
  var data = window.COURIER_LEDGER;
  if (line && data && data.length) {
    var latest = data[0];
    var open = latest.claims.filter(function (c) { return c.status === "Open"; }).length;
    line.textContent = "No. " + latest.issue + ", posted " + latest.posted + ". " + latest.bell + " " +
      latest.claims.length + " claims, " + open + " still open, " + latest.posted_notices.length + " notices about town.";
  }
  var also = document.querySelector("[data-also]");
  if (also && window.COURIER_SECTIONS) {
    also.appendChild(el("span", "path__also-tag", "Also in this paper: "));
    window.COURIER_SECTIONS.filter(function (s) { return s.id !== "home" && !s.step; }).forEach(function (s, i) {
      if (i) also.appendChild(document.createTextNode(" · "));
      var a = el("a", "link", s.name);
      a.href = s.file;
      also.appendChild(a);
    });
  }

  /* One cue for everything tappable */
  document.querySelectorAll(".crest__name").forEach(function (n) { n.appendChild(el("span", "tap-hint", "Tap")); });
  document.querySelectorAll(".posters .poster-face:not(.poster-back)").forEach(function (f) { f.appendChild(el("span", "tap-hint", "Turn over")); });
  document.querySelectorAll(".poster-back").forEach(function (f) { f.appendChild(el("span", "tap-hint", "Turn back")); });
  var seen = false;
  try { seen = sessionStorage.getItem("courier-pins") === "1"; sessionStorage.setItem("courier-pins", "1"); } catch (e) { /* private window */ }
  if (!seen) document.querySelectorAll(".pin").forEach(function (p) { p.classList.add("pin--hint"); });
})();
