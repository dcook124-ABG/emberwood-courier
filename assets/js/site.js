/* Shared page behaviour: navigation, section listings, Ledger preview, Haze motes */
(function () {
  // Set ready: true as each section is built. Navigation and listings update themselves.
  var SECTIONS = [
    { id: "home", file: "index.html", name: "Front Page", ready: true, nav: true },
    { id: "emberwood", file: "emberwood.html", name: "Emberwood", ready: true, nav: true, layer: "essential",
      deck: "Where to sleep, where to drink, and who'll stitch you shut after.", step: "Learn where the beds are, and which smiles to walk past." },
    { id: "dark-city", file: "dark-city.html", name: "The Dark City", ready: true, nav: true, layer: "essential",
      deck: "A drowned city of colored fog and humming stone, and the five rules that keep you breathing in it.", step: "See what's waiting past the covered bridge." },
    { id: "banners", file: "banners.html", name: "The Five Banners", ready: true, nav: true, layer: "essential",
      deck: "Five powers, one dead city, and not one of them with bodies to spare.", step: "Meet the people about to offer you work, and what it'll cost you." },
    { id: "fortune", file: "fortune.html", name: "A Fortune in the Rubble", ready: true, nav: true, layer: "essential",
      deck: "What the stones will fetch, who's buying, and what they leave out.", step: null },
    { id: "why", file: "why-have-you-come.html", name: "Why Have You Come?", ready: true, nav: true, layer: "essential",
      deck: "Who you were before the road got its hooks in you.", step: "Decide who your character is, and what dragged them here." },
    { id: "ledger", file: "ledger.html", name: "The Ledger", ready: true, nav: true, layer: "essential",
      deck: "Who died this week, who's missing, and who's paying to find out.", step: null },
    { id: "history", file: "city-that-was.html", name: "The City That Was", ready: true, nav: false, layer: "archive",
      deck: "The night the stars fell, the war that came after, and five royals nobody can find." },
    { id: "world", file: "wider-world.html", name: "The Wider World", ready: true, nav: false, layer: "archive",
      deck: "The kingdoms past the pines, the light they pray to, and why a child who sparks gets sent away." }
  ];

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function buildNav() {
    var host = document.querySelector("[data-nav]");
    if (!host) return;
    var here = document.body.getAttribute("data-page");
    SECTIONS.filter(function (s) { return s.nav; }).forEach(function (s) {
      var li = el("li");
      if (s.ready) {
        var a = el("a", null, s.name);
        a.href = s.file;
        if (s.id === here) a.setAttribute("aria-current", "page");
        li.appendChild(a);
      } else {
        var span = el("span", null, s.name);
        span.title = "In press";
        li.appendChild(span);
      }
      host.appendChild(li);
    });
  }

  function buildHeadlines() {
    document.querySelectorAll("[data-headlines]").forEach(function (host) {
      var layer = host.getAttribute("data-headlines");
      SECTIONS.filter(function (s) { return s.layer === layer; }).forEach(function (s) {
        var item = el("article", "headline");
        var title = el("h3", "headline__title");
        if (s.ready) {
          var a = el("a", null, s.name);
          a.href = s.file;
          title.appendChild(a);
        } else {
          title.textContent = s.name;
        }
        item.appendChild(title);
        var deck = el("p", null, s.deck + " ");
        if (!s.ready) deck.appendChild(el("span", "in-press", "In press"));
        item.appendChild(deck);
        host.appendChild(item);
      });
    });
  }

  function buildPath() {
    var host = document.querySelector("[data-path]");
    if (!host) return;
    SECTIONS.filter(function (s) { return s.step; }).forEach(function (s) {
      var li = el("li");
      var label;
      if (s.ready) {
        label = el("a", "path__label link", s.name);
        label.href = s.file;
      } else {
        label = el("span", "path__label path__label--plain", s.name);
      }
      li.appendChild(label);
      if (!s.ready) { li.appendChild(document.createTextNode(" ")); li.appendChild(el("span", "in-press", "In press")); }
      if (readList().indexOf(s.id) >= 0) li.appendChild(el("span", "path__stamp", "Read"));
      li.appendChild(el("span", "path__hint", s.step));
      host.appendChild(li);
    });
    var last = el("li");
    last.appendChild(el("span", "path__label path__label--plain", "Report to the Old Tithe House"));
    last.appendChild(el("span", "path__hint", "Harrow & Vane hold orientation for every new hire before a first case. Bring your own boots. The firm stopped lending boots. They kept not coming back."));
    host.appendChild(last);
    var steps = SECTIONS.filter(function (s) { return s.step; });
    var done = steps.filter(function (s) { return readList().indexOf(s.id) >= 0; }).length;
    if (done) host.parentNode.appendChild(el("p", "path__tally", done === steps.length ? "All read. You now know more than half the dead did." : done + " of " + steps.length + " read. Keep walking. The road isn't getting any shorter."));
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

  /* Up the road: where to go next */
  function buildRoadNext() {
    var main = document.querySelector("main");
    var here = document.body.getAttribute("data-page");
    if (!main || here === "home") return;
    var order = SECTIONS.filter(function (s) { return s.id !== "home"; });
    var i = order.map(function (s) { return s.id; }).indexOf(here);
    var next = order[i + 1] || SECTIONS[0];
    var box = el("div", "road-next wrap");
    box.appendChild(el("span", "road-next__tag", order[i + 1] ? "Up the Road" : "Back to the Start"));
    var a = el("a", null, next.name);
    a.href = next.file;
    box.appendChild(a);
    if (next.deck) box.appendChild(el("span", "deck", next.deck));
    main.appendChild(box);
    function check() {
      if (box.getBoundingClientRect().top < window.innerHeight) {
        markRead(here);
        window.removeEventListener("scroll", check);
      }
    }
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("load", check);
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
  function buildOverheard() {
    var main = document.querySelector("main");
    if (!main) return;
    var q = OVERHEARD[Math.floor(Math.random() * OVERHEARD.length)];
    var box = el("aside", "overheard wrap");
    box.appendChild(el("p", "overheard__tag", "Overheard in Camp"));
    var p = el("p", null, "“" + q[0] + "”");
    p.appendChild(el("cite", null, q[1]));
    box.appendChild(p);
    main.appendChild(box);
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
  function buildLexicon() {
    var root = document.querySelector("main");
    if (!root) return;
    var skip = /^(A|BUTTON|H1|H2|H3|CITE|TEXTAREA|SELECT|OPTION|LABEL|SCRIPT|B|STRONG)$/;
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
    function apply(container) {
      LEXICON.forEach(function (entry) {
        if (container.querySelector('[data-term="' + entry[1] + '"]')) return;
        var walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
          acceptNode: function (n) {
            for (var p = n.parentElement; p && p !== container.parentElement; p = p.parentElement) {
              if (skip.test(p.tagName) || p.classList.contains("flip") || p.classList.contains("note--ad")) return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
          }
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
    }
    apply(root);
    document.addEventListener("click", close);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    window.addEventListener("scroll", close, { passive: true });
  }

  function buildLedgerPreview() {
    var data = window.COURIER_LEDGER;
    var claimsHost = document.querySelector("[data-claims]");
    if (!data || !data.length || !claimsHost) return;
    var latest = data[0];
    document.querySelector("[data-bell]").textContent = "Rung from the Old Tithe House for every claim paid. The whole camp stops talking to count. " + latest.bell;
    latest.claims.forEach(function (c) {
      var li = el("li", "claim");
      li.appendChild(el("b", null, c.name));
      li.appendChild(document.createTextNode(", " + c.text + " "));
      li.appendChild(el("span", "status status--" + c.status.toLowerCase(), c.status));
      claimsHost.appendChild(li);
    });
    var postedHost = document.querySelector("[data-posted]");
    latest.posted_notices.slice(0, 3).forEach(function (p) {
      var li = el("li", "claim");
      li.appendChild(el("b", null, p.where + ". "));
      li.appendChild(document.createTextNode(p.text));
      postedHost.appendChild(li);
    });
    document.querySelector("[data-issue]").textContent = "Ledger No. " + latest.issue + ", posted " + latest.posted + ".";
  }

  function hazeMotes() {
    var canvas = document.querySelector("[data-motes]");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var colors = ["#c9a2ff", "#72d3c6", "#e6b873", "#e38ac4", "#f4ecdb"];
    var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var motes = [], w = 0, h = 0, frame;

    function resize() {
      var ratio = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * ratio; canvas.height = h * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      var count = Math.round(Math.min(150, w / 9));
      motes = [];
      for (var i = 0; i < count; i++) {
        motes.push({
          x: Math.random() * w, y: Math.random() * h,
          r: Math.random() * 1.7 + .4, c: colors[i % colors.length],
          dx: (Math.random() - .5) * .16, dy: -Math.random() * .1 - .02,
          phase: Math.random() * 6.28, speed: Math.random() * .012 + .004
        });
      }
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      motes.forEach(function (m) {
        m.phase += m.speed;
        ctx.globalAlpha = .28 + (Math.sin(m.phase) + 1) * .3;
        ctx.fillStyle = m.c;
        ctx.beginPath(); ctx.arc(m.x, m.y, m.r, 0, 6.28); ctx.fill();
      });
    }
    function step() {
      motes.forEach(function (m) {
        m.x += m.dx; m.y += m.dy;
        if (m.y < -5) m.y = h + 5;
        if (m.x < -5) m.x = w + 5;
        if (m.x > w + 5) m.x = -5;
      });
      draw();
      frame = requestAnimationFrame(step);
    }
    resize(); draw();
    if (!calm) frame = requestAnimationFrame(step);
    window.addEventListener("resize", function () { resize(); draw(); });
    document.addEventListener("visibilitychange", function () {
      if (calm) return;
      cancelAnimationFrame(frame);
      if (!document.hidden) frame = requestAnimationFrame(step);
    });
  }

  window.COURIER_SECTIONS = SECTIONS;
  buildNav();
  buildHeadlines();
  buildPath();
  buildLedgerPreview();
  hazeMotes();
  window.COURIER_AFTER_RENDER = function () { buildLexicon(); };
  buildOverheard();
  buildRoadNext();
  if (!document.querySelector("[data-defer-lexicon]")) buildLexicon();
})();
