/* Shared behaviour for every page: the header, folds, cards that turn over, reading time,
   the "On this page" strip, read stamps, Overheard in Camp, and the pop-up definitions.

   Everything here waits until the page and its other scripts have finished, so the order
   of the script tags does not matter. Every page still reads without this file. */
(function () {
  var root = document.documentElement;
  root.classList.add("js");

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  /* Remembers, in this browser only, which sections a reader has finished */
  function readList() {
    try { return JSON.parse(localStorage.getItem("courier-read") || "[]"); } catch (e) { return []; }
  }
  function markRead(id) {
    var list = readList();
    if (list.indexOf(id) >= 0) return;
    list.push(id);
    try { localStorage.setItem("courier-read", JSON.stringify(list)); } catch (e) { /* private window */ }
  }

  /* Header: stays reachable, and slims down once the reader scrolls */
  function initHeader(header) {
    function setHead() { root.style.setProperty("--head-h", header.offsetHeight + "px"); }
    window.addEventListener("scroll", function () {
      var y = window.scrollY, compact = header.classList.contains("is-compact");
      if (!compact && y > 140) { header.classList.add("is-compact"); setHead(); }
      else if (compact && y < 20) { header.classList.remove("is-compact"); setHead(); }
    }, { passive: true });
    window.addEventListener("resize", setHead);
    setHead();
    // On phones the menu scrolls sideways; bring the current page into view
    var current = header.querySelector(".nav a[aria-current]");
    var list = current && current.closest(".nav__list");
    if (list && list.scrollWidth > list.clientWidth) list.scrollLeft = Math.max(0, current.offsetLeft - 24);
  }

  /* Folds: show the essentials, keep the rest a tap away */
  function initFolds() {
    function foldButton(container, onToggle) {
      var b = el("button", "fold-btn");
      b.type = "button";
      b.setAttribute("aria-expanded", "false");
      b.appendChild(el("span"));
      b.addEventListener("click", function () {
        var open = b.getAttribute("aria-expanded") !== "true";
        b.setAttribute("aria-expanded", open ? "true" : "false");
        onToggle(open, b);
      });
      container.parentNode.insertBefore(b, container.nextSibling);
      onToggle(false, b);
    }
    document.querySelectorAll("[data-fold-keep]").forEach(function (box) {
      var keep = parseInt(box.getAttribute("data-fold-keep"), 10);
      var items = Array.prototype.slice.call(box.children);
      if (items.length <= keep + 1) return;
      var noun = box.getAttribute("data-fold-label") || "entries";
      foldButton(box, function (open, b) {
        items.forEach(function (it, i) { it.hidden = !open && i >= keep; });
        b.firstChild.textContent = open ? "Show fewer" : "Show all " + items.length + " " + noun;
      });
    });
    document.querySelectorAll("[data-fold-prose]").forEach(function (box) {
      var paras = box.querySelectorAll(":scope > p");
      if (paras.length < 2) return;
      foldButton(box, function (open, b) {
        for (var i = 1; i < paras.length; i++) paras[i].hidden = !open;
        box.classList.toggle("is-folded", !open);
        b.firstChild.textContent = open ? "Show less" : "Read the rest";
      });
    });
  }

  /* Cards that turn over. The hidden face is kept away from keyboards and screen readers. */
  function initFlips() {
    function setFaces(card) {
      var turned = card.classList.contains("is-turned");
      [[card.querySelector(".flip__front"), turned], [card.querySelector(".flip__back"), !turned]].forEach(function (pair) {
        if (!pair[0]) return;
        pair[0].inert = pair[1];
        if (pair[1]) pair[0].setAttribute("aria-hidden", "true"); else pair[0].removeAttribute("aria-hidden");
      });
    }
    document.querySelectorAll(".flip").forEach(setFaces);
    document.addEventListener("click", function (e) {
      var card = e.target.closest && e.target.closest(".flip");
      if (!card || e.target.closest("a")) return;   // a link on a card is followed, not turned
      var turned = card.classList.toggle("is-turned");
      setFaces(card);
      if (e.target.closest(".flip__btn")) {
        var next = card.querySelector(turned ? ".flip__back .flip__btn" : ".flip__front .flip__btn");
        if (next) next.focus({ preventScroll: true });
      }
    });
  }

  /* Reading time counts every word on the page, shown or folded away */
  function countWords(node) { return (node.textContent || "").split(/\s+/).filter(Boolean).length; }
  function initReadingTime(main) {
    var head = main.querySelector(".page-head");
    if (!head) return;
    var words = countWords(main) + (parseInt(document.body.getAttribute("data-extra-words"), 10) || 0);
    main.querySelectorAll("script, style, svg, select, .road-next").forEach(function (n) { words -= countWords(n); });
    var time = el("span", "time", Math.max(1, Math.round(words / 230)) + " min read");
    var byline = head.querySelector(".byline");
    if (byline) byline.parentNode.insertBefore(time, byline.nextSibling);
    else head.appendChild(time);
  }

  /* On this page: jump links to each section, on pages with more than one */
  function initStrip(main, header) {
    var head = main.querySelector(".page-head");
    var heads = Array.prototype.filter.call(main.querySelectorAll("h2"), function (h) {
      return !h.closest(".flip, .notice, .note, .start") && h.offsetParent !== null;
    });
    if (!head || heads.length < 2) return;
    var strip = el("nav", "onpage");
    strip.setAttribute("aria-label", "On this page");
    var inner = el("div", "onpage__inner wrap");
    var links = heads.map(function (h) {
      if (!h.id) h.id = h.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      var a = el("a", "onpage__link", h.textContent.replace(/\s+/g, " ").trim());
      a.href = "#" + h.id;
      inner.appendChild(a);
      return [a, h];
    });
    strip.appendChild(inner);
    head.parentNode.insertBefore(strip, head.nextSibling);
    function mark() {
      var line = header.offsetHeight + strip.offsetHeight + 40, active = null;
      links.forEach(function (pair) { if (pair[1].getBoundingClientRect().top < line) active = pair; });
      links.forEach(function (pair) {
        var on = pair === active, a = pair[0];
        a.classList.toggle("is-current", on);
        if (on && inner.scrollWidth > inner.clientWidth && (a.offsetLeft < inner.scrollLeft || a.offsetLeft + a.offsetWidth > inner.scrollLeft + inner.clientWidth)) inner.scrollLeft = a.offsetLeft - 60;
      });
    }
    window.addEventListener("scroll", mark, { passive: true });
    mark();
  }

  /* Front Page: the latest Ledger in one line. The box stays hidden if the Ledger file is missing or broken. */
  function initLedgerLine() {
    var line = document.querySelector("[data-ledger-line]");
    var data = window.COURIER_LEDGER;
    if (!line || !data || !data.length) return;
    var latest = data[0];
    var open = latest.claims.filter(function (c) { return c.status === "Open"; }).length;
    line.textContent = "No. " + latest.issue + ", posted " + latest.posted + ". " + latest.bell + " " +
      latest.claims.length + " claims, " + open + " still open, " + latest.posted_notices.length + " notices about town.";
    var box = line.closest("[data-ledger-box]");
    if (box) box.hidden = false;
  }

  /* Front Page: stamp the steps this reader has finished */
  function initStamps() {
    var host = document.querySelector("[data-path]");
    if (!host) return;
    var steps = host.querySelectorAll("li[data-id]"), read = readList(), done = 0;
    steps.forEach(function (li) {
      if (read.indexOf(li.getAttribute("data-id")) < 0) return;
      done++;
      li.insertBefore(el("span", "path__stamp", "Read"), li.querySelector(".hint"));
    });
    if (done) host.parentNode.appendChild(el("p", "path__tally", done === steps.length ? "All read. You now know more than half the dead did." : done + " of " + steps.length + " read. Keep walking. The road isn't getting any shorter."));
  }

  /* A page counts as read once the reader reaches the link to the next one */
  function initRoadNext(here) {
    var box = document.querySelector(".road-next");
    if (!box) return;
    function check() {
      if (box.getBoundingClientRect().top >= window.innerHeight) return;
      markRead(here);
      window.removeEventListener("scroll", check);
    }
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("load", check);
    check();
  }

  /* Overheard around camp */
  var OVERHEARD = [
    ["Fifteen years I've watched them walk north with their chins up. It's a fine angle for the rats.", "A stallkeeper, Caravan Court"],
    ["The Haze don't hate you, friend. That's the part you want to understand. It's got no more opinion of you than the rain has, and it'll have your skin off regardless.", "A prospector, Bark & Buzzard"],
    ["Everybody's got two friends in this camp, their gloves and their legs, and I've seen both turn traitor in the same afternoon.", "A scavenger, the Skull & Sword"],
    ["Ask me who I marched for and I'll ask you to step outside. Buy me another and I might forget you brought it up.", "A veteran, the Skull & Sword"],
    ["Knights are the politest people you'll ever meet, right up until you're on fire.", "A hedge mage, the Gilded Lily"],
    ["Lovely people, pilgrims. Not a thing left on them worth stealing after the first mile, but you've got to admire the walking.", "A smiling stranger, Champion's Way"],
    ["The Queen of Thieves? Never met her. Neither have you. Neither has that fellow behind you, and I'd mind him if I were you.", "A card player, the Skull & Sword"],
    ["That stone hums, you know. You get so you hear it when you shut your eyes. Then you get so you like it. That's when you go see somebody.", "A prospector, Bark & Buzzard"],
    ["Nothing grows in this son-of-a-bitching dirt but the prices.", "A farmer, Caravan Court"],
    ["Water costs what ale costs. So I'll ask you, as one reasonable creature to another, why in the name of the Flame you're drinking water.", "A publican"],
    ["The Lanterns'll tell you the city's coming back. And corpses do move around up there, so I suppose they've got a point.", "A wagon driver, Caravan Court"],
    ["The Reeve's got gold on you not lasting the week. I took the other side. Don't make a liar of me, you long streak of piss.", "A gambler, outside the Red Lion"],
    ["Mages'll pay you in good gold and look at you like you tracked something in. You did.", "A delerium runner"],
    ["Every soul in this camp came here to get rich or get even. The rest of us sell them soup.", "A cook, Bark & Buzzard"],
    ["You can tell the ones who've been in. They sit with their backs to the wall and they keep counting the door.", "A barmaid, the Gilded Lily"],
    ["Somebody worked out how to make money off you dying without even having to stab you. I call that progress.", "A regular, the Skull & Sword"],
    ["First time I saw the Haze from the ridge at sunup, I cried like a baby. Prettiest thing I ever laid eyes on. Took my brother's face off by noon.", "A teamster, Caravan Court"],
    ["There's a bell tower in the old merchant ward still rings itself on the hour. No rope, no ringer. Some days it's a minute late. Those are the days I stay home.", "A scavenger, Bark & Buzzard"],
    ["I don't drink with the Tithe House clerks. They know my odds, and they're too polite to say.", "A sellsword, the Skull & Sword"],
    ["Madam Rochelle says I sing like an angel. Didn't say which direction the angel was headed.", "A performer, the Gilded Lily"]
  ];
  function initOverheard(main) {
    var q = OVERHEARD[Math.floor(Math.random() * OVERHEARD.length)];
    var box = el("aside", "overheard");
    box.appendChild(el("p", "overheard__tag", "Overheard in Camp"));
    var p = el("p", null, "“" + q[0] + "”");
    p.appendChild(el("cite", null, q[1]));
    box.appendChild(p);
    main.insertBefore(box, main.querySelector(":scope > .road-next"));
  }

  /* A stranger's lexicon: tap a dotted word for a plain definition */
  var LEXICON = [
    ["Haze", "The Haze", "The glittering, every-colored fog that sits on the ruins. Fifteen years and it hasn't lifted. Lovely to look at. You can't rest in it."],
    ["delerium", "Delerium", "The crystal the stars left behind. It hums, it glows, it sells for a fortune, and it sickens the careless. Wear gloves."],
    ["Delerium", "Delerium", "The crystal the stars left behind. It hums, it glows, it sells for a fortune, and it sickens the careless. Wear gloves."],
    ["Flamekeeper", "Flamekeeper", "A priest of the Sacred Flame, sworn to poverty. In Emberwood, the vow keeps itself."],
    ["Sacred Flame", "The Sacred Flame", "The great faith of the realms. It reveres a holy light, not a god, and it's particular about the difference."],
    ["Westemär", "Westemär", "The kingdom that had Drakkenheim for its capital. These days, a word on a map and an argument in a tavern."],
    ["the Fall", "The Fall", "16 September 1111, thirteen minutes past eight in the evening. Ask anyone over twenty where they were."],
    ["the Crater", "The Crater", "The hole the star punched in the city. Pilgrims walk to it on purpose. Some of them sing the whole way."],
    ["mageborn", "Mageborn", "Born with arcane magic in the blood. Raised by the Academy, and barred by law from titles and land."],
    ["Reeve", "The Reeve", "The crown's officer over a village. Emberwood's has no crown left to answer to and hasn't let that slow him down."],
    ["Inner City", "The Inner City", "Everything inside Drakkenheim's walls. You go in by the gates. The walls have opinions about the alternative."]
  ];
  function initLexicon(main) {
    var skipTag = /^(A|BUTTON|H1|H2|H3|CITE|TEXTAREA|SELECT|OPTION|LABEL|SCRIPT)$/;
    var popup = null;
    function close() { if (popup) { popup.remove(); popup = null; } }
    function open(btn, entry) {
      close();
      popup = el("div", "lex");
      popup.setAttribute("role", "status");
      popup.appendChild(el("b", null, entry[1]));
      popup.appendChild(document.createTextNode(entry[2]));
      document.body.appendChild(popup);
      var r = btn.getBoundingClientRect(), w = popup.offsetWidth, h = popup.offsetHeight;
      popup.style.left = Math.max(12, Math.min(innerWidth - w - 12, r.left + r.width / 2 - w / 2)) + "px";
      popup.style.top = (r.top - h - 8 > 8 ? r.top - h - 8 : r.bottom + 8) + "px";
    }
    function skipped(node) {
      for (var p = node.parentElement; p && p !== main.parentElement; p = p.parentElement) {
        if (skipTag.test(p.tagName)) return true;
        // Bold words are labels, except inside a story, where they are part of the sentence
        if ((p.tagName === "B" || p.tagName === "STRONG") && !p.closest(".story__body")) return true;
        if (p.matches(".flip, .start, .advisory, .onpage, .road-next")) return true;
      }
      return false;
    }
    LEXICON.forEach(function (entry) {
      if (main.querySelector('[data-term="' + entry[1] + '"]')) return;
      var walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT, {
        acceptNode: function (n) { return skipped(n) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT; }
      });
      var re = new RegExp("\\b" + entry[0] + "\\b"), node;
      while ((node = walker.nextNode())) {
        var m = re.exec(node.nodeValue);
        if (!m) continue;
        var after = node.splitText(m.index);
        after.nodeValue = after.nodeValue.slice(m[0].length);
        var btn = el("button", "term", m[0]);
        btn.type = "button";
        btn.setAttribute("data-term", entry[1]);
        btn.addEventListener("click", function (e) { e.stopPropagation(); open(btn, entry); });
        after.parentNode.insertBefore(btn, after);
        break;
      }
    });
    document.addEventListener("click", close);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    window.addEventListener("scroll", close, { passive: true });
  }

  ready(function () {
    var header = document.querySelector(".masthead");
    var main = document.querySelector("main");
    if (!header || !main) return;
    initHeader(header);
    initReadingTime(main);
    initFolds();
    initFlips();
    initStrip(main, header);
    initLedgerLine();
    initStamps();
    initOverheard(main);
    initRoadNext(document.body.getAttribute("data-page"));
    initLexicon(main);
  });
})();
