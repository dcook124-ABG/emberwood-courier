/* Behaviour for the section pages: crests, delerium plate, flip cards, Ledger, timeline. */
(function () {
  var GEM = '<svg viewBox="0 0 24 36" aria-hidden="true"><path fill="#6f42ab" stroke="#241d2e" stroke-width="1.6" d="M12 1l10 8-2.5 25h-15L2 9z"/><path fill="none" stroke="#c9a2ff" d="M12 1v33M2 9l10 5 10-5"/></svg>';
  document.querySelectorAll("[data-gem]").forEach(function (n) { n.innerHTML = GEM; n.setAttribute("aria-hidden", "true"); });

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function setPressed(host, selector, id, attr) {
    host.querySelectorAll(selector).forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute(attr) === id ? "true" : "false"); });
  }
  function setHash(id) { try { history.replaceState(null, "", "#" + id); } catch (e) { /* local preview */ } }

  // Any flip card
  document.addEventListener("click", function (e) {
    var card = e.target.closest && e.target.closest(".flip");
    if (!card) return;
    var turned = card.classList.toggle("is-turned");
    card.setAttribute("aria-pressed", turned ? "true" : "false");
  });

  /* The Five Banners: symbols and colors follow the sourcebook */
  var SHIELD = "M10 8H110V78C110 110 80 128 60 136C40 128 10 110 10 78Z";
  var INNER = "M17 15H103V77C103 105 77 121 60 128C43 121 17 105 17 77Z";
  function crest(field, trim, art) {
    return '<svg viewBox="0 0 120 142" aria-hidden="true"><path d="' + SHIELD + '" fill="' + field + '" stroke="#231b18" stroke-width="3.5" stroke-linejoin="round"/><path d="' + INNER + '" fill="none" stroke="' + trim + '" stroke-width="1.6"/>' + art + "</svg>";
  }
  var BANNERS = [
    { id: "lanterns", name: "The Hooded Lanterns", leader: "Lord Commander Elias Drexel",
      svg: crest("#2f5a3c", "#d6b34c", '<path d="M43 46h34l-4-12H47z" fill="#231b18"/><rect x="45" y="46" width="30" height="48" rx="3" fill="#ecc66b" stroke="#231b18" stroke-width="3"/><path d="M55 47v46M65 47v46M46 62h28M46 78h28" stroke="#231b18" stroke-width="2"/><path d="M40 94h40l-5 8H45z" fill="#231b18"/><path d="M60 34c0-8 0-13 0-16M60 18c-10-1-18 4-21 15 5-5 9-7 14-7M60 18c10-1 18 4 21 15-5-5-9-7-14-7M60 18c-2-5-1-7 0-10 1 3 2 5 0 10" fill="none" stroke="#d6b34c" stroke-width="4" stroke-linecap="round"/>'),
      quote: "One gate in three years. We'll take the other four. Sign on and help us be quicker about it.", cite: "A sergeant at Shepherd's Gate",
      who: "Old City Watch and whatever the civil war didn't finish off, in green cloaks with yellow trim. On paper they're the 4th Provisional Expeditionary Force to Reclaim the Capital, which no one has said twice without stopping for a drink.",
      want: "The capital rebuilt, the realm put back together, and a rightful arse on the throne. Several noble houses are footing the bill, each hoping the arse turns out to be a cousin.",
      caution: "They count scavengers among the vermin to be cleared from the city. Make yourself useful before they get around to you.",
      find: "Ansom and Petra Lang, at the Lantern Watchtower.", link: "emberwood.html#watchtower" },
    { id: "queens-men", name: "The Queen's Men", leader: "The Queen of Thieves",
      svg: crest("#8d211d", "#e0b0a4", '<g transform="rotate(-8 60 68)"><rect x="35" y="29" width="50" height="76" rx="5" fill="#f4ecdc" stroke="#231b18" stroke-width="3"/><path d="M60 50l14 18-14 18-14-18z" fill="#b3201c" stroke="#231b18" stroke-width="1.6"/><text x="44" y="46" font-family="IM Fell English, Georgia, serif" font-size="16" fill="#b3201c">Q</text><text x="76" y="93" text-anchor="middle" font-family="IM Fell English, Georgia, serif" font-size="16" fill="#b3201c" transform="rotate(180 76 88)">Q</text></g>'),
      quote: "Everything in that city belongs to somebody now. Mostly us.", cite: "A smiling stranger, Skull & Sword",
      who: "A hundred gangs of brigands, smugglers, and cutthroats, every one paying tribute to a woman no two witnesses have described alike. She signs her orders with the Queen of Diamonds.",
      want: "A criminal empire, and a city kept exactly as lawless as it is this minute.",
      caution: "You get a note pinned to that card, you do what it says. That is not the Courier's opinion. It is the Courier's policy.",
      find: "Blackjack Mel, at the back tables of the Skull & Sword.", link: "emberwood.html#skull-and-sword" },
    { id: "silver-order", name: "Knights of the Silver Order", leader: "Knight-Captain Theodore Marshal",
      svg: crest("#c9ccd4", "#a97c28", '<path d="M42 58h36c0 18-8 28-18 28s-18-10-18-28z" fill="#c79a34" stroke="#231b18" stroke-width="3"/><path d="M60 86v18M46 108h28l-4-5H50z" fill="#c79a34" stroke="#231b18" stroke-width="3" stroke-linejoin="round"/><path d="M60 20c10 11 15 18 11 28-2 6-6 9-11 9s-9-3-11-9c-3-8 2-12 5-16 1 4 3 6 5 6 2-6 0-12 1-18z" fill="#e88a2a" stroke="#231b18" stroke-width="2.6" stroke-linejoin="round"/>'),
      quote: "The stone is not treasure. It is rot that learned to shine.", cite: "A knight on the Emberwood road",
      who: "Paladins and oathsworn knights of the Sacred Flame, marched up from Elyria on the say-so of the Divine Matriarch, in silver plate and clean white tabards, in this mud.",
      want: "Every crystal smashed, every monster put down, and the Falling Fire heresy stamped flat.",
      caution: "The nicest manners you'll meet this side of the grave, and they'll be watching your hands if you work spells.",
      find: "High Flamekeeper Ophelia Reed, at the Chapel of Saint Ardenna.", link: "emberwood.html#chapel" },
    { id: "falling-fire", name: "Followers of the Falling Fire", leader: "Lucretia Mathias",
      svg: crest("#17131d", "#efece4", '<path d="M86 34L34 94M92 42L48 100M78 28L26 80" stroke="#efece4" stroke-width="3.4" stroke-linecap="round" fill="none"/><path d="M90 20l5 11 12 2-9 8 2 12-10-6-11 6 2-12-9-8 12-2z" fill="#efece4" stroke="#17131d" stroke-width="1.5"/>'),
      quote: "The star fell for a reason. Come and see it, and you'll understand.", cite: "A pilgrim on Champion's Way",
      who: "Pilgrims by the hundred, farmers and laborers mostly, in sackcloth, walking toward the Crater behind a former Flamekeeper the Faith has named a heretic.",
      want: "Every faithful soul delivered to the Crater and the whole ruin made holy ground. They say the stone's a gift from on high, sent against a darkness that hasn't got here yet. That's the cheerful part.",
      caution: "Those who finish the road take part in a rite at the Crater's Edge. The Flamekeepers have a word for it, and the word is blasphemy.",
      find: "Nathaniel Flint, at Hendrix Farm.", link: "emberwood.html#hendrix-farm" },
    { id: "academy", name: "The Amethyst Academy", leader: "Archwizard Eldrick Runeweaver",
      svg: crest("#4a2a85", "#d6b34c", '<g fill="none" stroke="#d6b34c" stroke-width="3"><rect x="34" y="40" width="52" height="52"/><rect x="34" y="40" width="52" height="52" transform="rotate(45 60 66)"/></g><ellipse cx="60" cy="66" rx="18" ry="12" fill="#f4ecdc" stroke="#231b18" stroke-width="2.4"/><circle cx="60" cy="66" r="7" fill="#d6b34c" stroke="#231b18" stroke-width="2"/><circle cx="60" cy="66" r="3" fill="#231b18"/>'),
      quote: "Bring it to us in a lead box and we pay in gold. Bring it in your pocket and we pay for the funeral.", cite: "Overheard at the Red Lion Hotel",
      who: "A school for mages and a guild with its fist round the whole trade in magic. They keep damn few of their own in the field and pay the likes of you to take the risk.",
      want: "The stone studied and put to work, and their great stronghold, the Inscrutable Tower, handed back.",
      caution: "Polite, punctual, and they've never yet told an outsider one thing more than was asked. They'll pay. They won't shake your hand.",
      find: "The Academy's buyer, at the Red Lion Hotel.", link: "emberwood.html#red-lion" }
  ];

  /* Who is at whose throat */
  var GRUDGES = [
    ["lanterns", "queens-men", "war", "The Queen's people sabotage whatever the Lanterns build, and the Lanterns hang whatever they catch."],
    ["lanterns", "silver-order", "wary", "Both want the monsters dead. The knights say nothing gets rebuilt till every stone is ash, and the Lanterns mean to live there."],
    ["lanterns", "falling-fire", "wary", "One side wants a capital and the other a holy ruin, and the pilgrims keep wandering through the middle of the Lanterns' war."],
    ["lanterns", "academy", "wary", "Civil, for now. The Lanterns would dearly like to know what the mages want with their city."],
    ["queens-men", "silver-order", "war", "The Order would hang every last one of them given a free afternoon. The Queen takes care not to give them one."],
    ["queens-men", "falling-fire", "war", "Pilgrims carry all they own and can't fight for it. The gangs thank the Flame for them daily."],
    ["queens-men", "academy", "trade", "The mages pay top coin for stones and don't ask whose they were. The Queen's people know it."],
    ["silver-order", "falling-fire", "war", "Heretics, says the Order, and it means to see their prophet tried. The pilgrims pray for the knights, which doesn't help."],
    ["silver-order", "academy", "war", "Centuries of burned mages lie between them and only a treaty keeps it from starting again. The knights want the stone destroyed, and the mages want it by the cartload."],
    ["falling-fire", "academy", "war", "To the pilgrims the stone is holy. The Academy is grinding it up for trinkets."]
  ];
  var WEB_POS = {};
  function updateWeb(id) {
    var list = document.querySelector("[data-grudges]");
    if (!list) return;
    var b = BANNERS.filter(function (x) { return x.id === id; })[0];
    document.querySelectorAll(".web__node").forEach(function (n) { n.setAttribute("aria-pressed", n.getAttribute("data-id") === id ? "true" : "false"); });
    document.querySelectorAll(".web__line").forEach(function (l) { l.style.opacity = (l.getAttribute("data-a") === id || l.getAttribute("data-b") === id) ? "1" : ".14"; });
    list.innerHTML = "";
    list.appendChild(el("h3", null, b.name));
    var ul = el("ul");
    GRUDGES.filter(function (g) { return g[0] === id || g[1] === id; }).forEach(function (g) {
      var other = BANNERS.filter(function (x) { return x.id === (g[0] === id ? g[1] : g[0]); })[0];
      var li = el("li", g[2]);
      li.appendChild(el("b", null, other.name));
      li.appendChild(document.createTextNode(g[3]));
      ul.appendChild(li);
    });
    list.appendChild(ul);
  }
  function buildWeb(pick) {
    var host = document.querySelector("[data-web]");
    if (!host) return;
    BANNERS.forEach(function (b, i) {
      var a = (-90 + 72 * i) * Math.PI / 180;
      WEB_POS[b.id] = [200 + Math.cos(a) * 150, 196 + Math.sin(a) * 150];
    });
    var svg = el2("svg", { "class": "web__lines", viewBox: "0 0 400 380", "aria-hidden": "true" });
    GRUDGES.forEach(function (g) {
      var p = WEB_POS[g[0]], q = WEB_POS[g[1]];
      svg.appendChild(el2("line", { x1: p[0], y1: p[1], x2: q[0], y2: q[1], "class": "web__line web__line--" + g[2], "data-a": g[0], "data-b": g[1] }));
    });
    host.appendChild(svg);
    BANNERS.forEach(function (b) {
      var n = el("button", "web__node");
      n.type = "button";
      n.setAttribute("data-id", b.id);
      n.setAttribute("aria-label", b.name);
      n.setAttribute("aria-pressed", "false");
      n.style.left = WEB_POS[b.id][0] / 4 + "%";
      n.style.top = WEB_POS[b.id][1] / 3.8 + "%";
      n.innerHTML = b.svg;
      n.addEventListener("click", function () { pick(b.id); });
      host.appendChild(n);
    });
  }

  function initBanners() {
    var row = document.querySelector("[data-crests]");
    if (!row) return;
    var panel = document.querySelector("[data-dossier]");
    function show(id, user) {
      var b = BANNERS.filter(function (x) { return x.id === id; })[0] || BANNERS[0];
      panel.innerHTML = "";
      panel.appendChild(el("h2", null, b.name));
      panel.appendChild(el("p", "dossier__leader", b.leader));
      var q = el("blockquote", "dossier__quote", "“" + b.quote + "”");
      q.appendChild(el("cite", null, b.cite));
      panel.appendChild(q);
      var dl = el("dl");
      [["Who They Are", b.who], ["What They Want", b.want], ["Bear in Mind", b.caution]].forEach(function (row) {
        dl.appendChild(el("dt", null, row[0]));
        dl.appendChild(el("dd", null, row[1]));
      });
      dl.appendChild(el("dt", null, "Where to Find Them"));
      var dd = el("dd");
      var a = el("a", "link", b.find);
      a.href = b.link;
      dd.appendChild(a);
      dl.appendChild(dd);
      panel.appendChild(dl);
      setPressed(row, ".crest", b.id, "data-id");
      updateWeb(b.id);
      if (user) {
        setHash(b.id);
        if (window.matchMedia("(max-width: 820px)").matches) panel.scrollIntoView({ block: "start", behavior: "smooth" });
      }
    }
    BANNERS.forEach(function (b) {
      var btn = el("button", "crest");
      btn.type = "button";
      btn.setAttribute("data-id", b.id);
      btn.setAttribute("aria-pressed", "false");
      btn.innerHTML = b.svg;
      btn.appendChild(el("span", "crest__name", b.name));
      btn.addEventListener("click", function () { show(b.id, true); });
      row.appendChild(btn);
    });
    buildWeb(function (id) { show(id, false); });
    show(location.hash.slice(1) || BANNERS[0].id, false);
  }

  /* Why Have You Come: answers saved in this browser, ready to paste to the DM */
  var BACKGROUND_ASKS = {
    "Continental Nobility": "Which side did your house back in the war, and who still holds that against you?",
    "Mageborn": "What did the Academy take from you when it took you in, and would they have you back?",
    "Devoted Missionary": "What sacred purpose brought you here, and would the village chapel bless it?",
    "Survivor": "What did you lose in those ruins, and what did you have to do to get out?",
    "Treasure Seeker": "What is the one prize worth dying for, and who else wants it?"
  };
  function initEntry() {
    var form = document.querySelector("[data-entry]");
    if (!form) return;
    var KEY = "courier-why", saved = {};
    try { saved = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { saved = {}; }
    var fields = form.querySelectorAll("[data-field]");
    var bg = form.querySelector('[data-field="background"]');
    var bgLabel = form.querySelector("[data-bg-question]");
    function syncQuestion() {
      var q = BACKGROUND_ASKS[bg.value];
      bgLabel.textContent = q || "Choose a background above, and it will ask you something.";
    }
    function store() {
      var data = {};
      fields.forEach(function (f) { data[f.getAttribute("data-field")] = f.value; });
      try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { /* private window */ }
    }
    fields.forEach(function (f) {
      var name = f.getAttribute("data-field");
      if (saved[name]) f.value = saved[name];
      f.addEventListener("input", function () { if (f === bg) syncQuestion(); store(); });
      f.addEventListener("change", function () { if (f === bg) syncQuestion(); store(); });
    });
    syncQuestion();
    var status = form.querySelector("[data-entry-status]");
    function text() {
      var out = ["**Why Have You Come?**"];
      fields.forEach(function (f) {
        if (!f.value.trim()) return;
        var name = f.getAttribute("data-field");
        var label = name === "bg-answer" ? bgLabel.textContent : f.getAttribute("data-label");
        out.push("**" + label + "**\n" + f.value.trim());
      });
      return out.join("\n\n");
    }
    form.querySelector("[data-copy]").addEventListener("click", function () {
      var body = text();
      function done() { status.textContent = "Copied. Paste it to your DM."; }
      function fallback() {
        var t = document.createElement("textarea");
        t.value = body; t.style.position = "fixed"; t.style.opacity = "0";
        document.body.appendChild(t); t.select();
        try { document.execCommand("copy"); done(); } catch (e) { status.textContent = "Could not copy on this device."; }
        t.remove();
      }
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(body).then(done, fallback);
      else fallback();
    });
    form.querySelector("[data-clear]").addEventListener("click", function () {
      fields.forEach(function (f) { f.value = ""; });
      store(); syncQuestion();
      status.textContent = "Cleared.";
    });
  }

  /* The Assayer's Plate */
  var SIZES = [
    { id: "chip", name: "Chip", k: .14, value: "10 gp", measure: "Hardly worth the glove", note: "Flakes off the bigger stones. Save up enough and you can buy yourself one good night at the Lily, and regret it." },
    { id: "fragment", name: "Fragment", k: .36, value: "100 gp", measure: "About the size of a finger", note: "What most prospectors bring home, on the days they come home." },
    { id: "shard", name: "Shard", k: .62, value: "500 gp", measure: "A decent handful", note: "The size that leaves Caravan Court by the wagonload, packed in lead and guarded by people who've stopped blinking." },
    { id: "crystal", name: "Crystal", k: .86, value: "1,000 gp", measure: "As big as a fist", note: "Scarce enough that the traders quit arguing and pay very near what it's worth." },
    { id: "geode", name: "Geode", k: 1.75, value: "5,000 gp", measure: "As big as a pumpkin", geode: true, note: "Pays close to full, if you get it home. Hit one too hard and you'll wish all it did was crumble." },
    { id: "massive", name: "Massive Cluster", k: 4.6, value: "Priceless", measure: "Taller than a man, and then some", note: "It ran off the Courier's plate. Nobody has walked out of the ruins carrying one, and nobody's fixing to." }
];

  function shard(g, cx, base, w, h, lean) {
    var tip = cx + lean, mid = base - h * .78;
    var left = el2("polygon", { points: (cx - w) + "," + base + " " + (cx - w + lean * .7) + "," + mid + " " + tip + "," + (base - h) + " " + (cx + lean * .5) + "," + base, fill: "#6d3fb0", stroke: "#231b18", "stroke-width": 2, "stroke-linejoin": "round" });
    var right = el2("polygon", { points: (cx + w) + "," + base + " " + (cx + w + lean * .7) + "," + mid + " " + tip + "," + (base - h) + " " + (cx + lean * .5) + "," + base, fill: "#b583ea", stroke: "#231b18", "stroke-width": 2, "stroke-linejoin": "round" });
    g.appendChild(left); g.appendChild(right);
  }
  function el2(tag, attrs) {
    var n = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }

  function initPlate() {
    var host = document.querySelector("[data-plate]");
    if (!host) return;
    var svg = el2("svg", { viewBox: "0 0 640 300", role: "img", "aria-label": "A delerium stone drawn to scale beside a gloved hand." });
    var defs = el2("defs", {});
    var grad = el2("radialGradient", { id: "gl" });
    grad.appendChild(el2("stop", { offset: "0", "stop-color": "#a266e8", "stop-opacity": ".75" }));
    grad.appendChild(el2("stop", { offset: "1", "stop-color": "#a266e8", "stop-opacity": "0" }));
    defs.appendChild(grad);
    svg.appendChild(defs);

    var stone = el2("g", { "class": "plate__stone" });
    stone.appendChild(el2("ellipse", { cx: 390, cy: 215, rx: 105, ry: 90, fill: "url(#gl)" }));
    var rock = el2("path", { d: "M332 270C326 190 356 166 390 166S454 190 448 270Z", fill: "#3a2c52", stroke: "#231b18", "stroke-width": 2 });
    stone.appendChild(rock);
    shard(stone, 390, 270, 22, 100, 2);
    shard(stone, 358, 270, 13, 62, -9);
    shard(stone, 420, 270, 13, 68, 10);
    shard(stone, 335, 270, 8, 36, -9);
    shard(stone, 445, 270, 8, 40, 10);
    svg.appendChild(stone);

    // Ground and glove, drawn in front of the stone's glow
    svg.appendChild(el2("path", { d: "M30 270H610", stroke: "#231b18", "stroke-width": 2.5 }));
    var glove = el2("g", { fill: "#7a6248", stroke: "#231b18", "stroke-width": 2.4, "stroke-linejoin": "round" });
    glove.appendChild(el2("path", { d: "M100 270v-24c-14-14-22-30-28-44-3-8 7-13 12-5l15 23v-62c0-9 13-9 13 0v42h4v-56c0-9 13-9 13 0v56h4v-50c0-9 13-9 13 0v50h4v-36c0-9 13-9 13 0v62c0 14-6 26-14 33v11Z" }));
    glove.appendChild(el2("path", { d: "M100 256h50", fill: "none" }));
    svg.appendChild(glove);
    var caption = el2("text", { x: 125, y: 292, "text-anchor": "middle", "font-family": "IM Fell English, Georgia, serif", "font-style": "italic", "font-size": 16, fill: "#574d60" });
    caption.textContent = "one gloved hand";
    svg.appendChild(caption);
    host.appendChild(svg);

    var note = document.querySelector("[data-stone-note]");
    var bar = document.querySelector("[data-sizes]");
    function show(id) {
      var s = SIZES.filter(function (x) { return x.id === id; })[0];
      stone.style.transform = "scale(" + s.k + ")";
      rock.style.display = s.geode ? "" : "none";
      note.innerHTML = "";
      note.appendChild(el("h3", null, s.name));
      note.appendChild(el("p", "measure", s.measure));
      note.appendChild(el("p", "value", s.value));
      note.appendChild(el("p", null, s.note));
      setPressed(bar, ".size", s.id, "data-id");
    }
    SIZES.forEach(function (s) {
      var b = el("button", "size", s.name);
      b.type = "button";
      b.setAttribute("data-id", s.id);
      b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", function () { show(s.id); });
      bar.appendChild(b);
    });
    show("fragment");
  }

  /* The Ledger */
  function claimList(host, claims) {
    claims.forEach(function (c) {
      var li = el("li", "claim");
      li.appendChild(el("b", null, c.name));
      li.appendChild(document.createTextNode(", " + c.text + " "));
      li.appendChild(el("span", "status status--" + c.status.toLowerCase(), c.status));
      host.appendChild(li);
    });
  }
  function simpleList(host, items, empty) {
    if (!items || !items.length) { host.appendChild(el("p", "ledger-empty", empty)); return; }
    var ul = el("ul");
    items.forEach(function (it) {
      var li = el("li", "claim");
      if (it.lead) li.appendChild(el("b", null, it.lead + ". "));
      li.appendChild(document.createTextNode(it.text));
      ul.appendChild(li);
    });
    host.appendChild(ul);
  }
  function renderIssue(host, issue) {
    var grid = el("div", "ledger-grid");
    function block(title, tilt) {
      var wrap = el("div", "note-wrap");
      wrap.style.setProperty("--tilt", tilt);
      var note = el("div", "note");
      note.appendChild(el("h3", null, title));
      wrap.appendChild(note);
      grid.appendChild(wrap);
      return note;
    }
    var bell = block("The Tally Bell", "-.5deg");
    bell.appendChild(el("p", "tally__sub", "Rung from the Old Tithe House for every claim paid. " + issue.bell));
    var ul = el("ul");
    claimList(ul, issue.claims);
    bell.appendChild(ul);
    simpleList(block("Open Contracts", ".6deg"), (issue.contracts || []).map(function (c) { return { lead: c.title, text: c.text }; }), "Nothing posted this issue.");
    simpleList(block("Posted About Town", ".4deg"), (issue.posted_notices || []).map(function (p) { return { lead: p.where, text: p.text }; }), "Nothing posted this issue.");
    simpleList(block("Word on the Street", "-.6deg"), (issue.rumors || []).map(function (r) { return { text: r }; }), "Quiet, for once. The Courier does not trust it.");
    var risk = block("District Danger", ".5deg");
    simpleList(risk, (issue.risk || []).map(function (r) { return { lead: r.district, text: r.rating }; }), "The firm's risk tables have not been posted yet.");
    host.appendChild(grid);
  }
  function initLedger() {
    var host = document.querySelector("[data-ledger]");
    if (!host || !window.COURIER_LEDGER) return;
    var issues = window.COURIER_LEDGER, latest = issues[0];
    document.querySelector("[data-ledger-head]").textContent = "Ledger No. " + latest.issue + ". Posted " + latest.posted + ".";
    renderIssue(host, latest);
    var past = document.querySelector("[data-past]");
    if (issues.length < 2) {
      past.appendChild(el("p", "ledger-empty", "This is the first Ledger. Older issues will be kept here."));
      return;
    }
    issues.slice(1).forEach(function (issue) {
      var d = el("details", "past-issue");
      d.appendChild(el("summary", null, "Ledger No. " + issue.issue + ", " + issue.posted));
      var body = el("div");
      body.style.marginTop = "22px";
      renderIssue(body, issue);
      d.appendChild(body);
      past.appendChild(d);
    });
  }

  /* The City That Was: dates follow the sourcebook's timeline */
  var YEARS = [
    { y: 1111, t: "The Stars Fall", d: "Thirteen minutes past eight on the evening of the sixteenth of September, a storm of falling stars comes down on Drakkenheim with the whole royal family at home." },
    { y: 1112, t: "An Army Dies in the Mist", d: "The crown sends an army to take back the capital. Thousands die in the Haze. The few who stagger out are raving, and don't last." },
    { y: 1113, t: "A Prophecy Published", d: "Lucretia Mathias called the Fall years ahead and got shut up for it. Now she expands her writings into the Testament of the Falling Fire, and this time people read them." },
    { y: 1114, t: "Brother Against Sister", d: "Two more expeditions go into the mist and come to nothing, and the squabble between Mannfred and Cecilia von Kessel over the empty chair turns into a war." },
    { y: 1115, t: "Some Come Back", d: "With the armies busy killing each other, adventurers try the ruins for plunder. A few come back alive, with stories of monsters and samples of a strange crystal." },
    { y: 1116, t: "A Pilgrim at the Crater", d: "Lucretia Mathias walks to the Crater's Edge on her own two feet and carries what she found there back to Elyria." },
    { y: 1117, t: "Delerium Is Named", d: "The Amethyst Academy starts paying for what folks have been calling meteor shards, and gives the crystal the name that stuck." },
    { y: 1119, t: "The War Runs Out of Claimants", d: "Assassins do for Mannfred von Kessel and his children. Days later Cecilia is dead too, of causes no physician will put a name to. There being nobody left to fight for, the war just quits." },
    { y: 1120, t: "Cast Out", d: "The Divine Matriarch excommunicates Lucretia Mathias for heresy. Mathias goes back to Drakkenheim, which is not the punishment anybody had in mind." },
    { y: 1121, t: "Emberwood Booms", d: "Adventurers come up the road in numbers, and a village that had been quietly dying finds itself the favorite stop of every treasure hunter and cutthroat in the realm." },
    { y: 1123, t: "The Lanterns Enter the City", d: "The 4th Provisional Expeditionary Force to Reclaim the Capital makes its first forays into the ruins. Inside a season, everybody's calling them the Hooded Lanterns." },
    { y: 1124, t: "A Gate Is Taken", d: "The Lanterns dig in at the old Shepherd's Gate and learn that taking a gate is the easy part." },
    { y: 1126, t: "You Arrive", d: "Fifteen years on, the city's dead and the money isn't. You've come about the money." }
];

  function initTimeline() {
    var bar = document.querySelector("[data-years]");
    if (!bar) return;
    var note = document.querySelector("[data-year-note]");
    var prev = document.querySelector("[data-prev]"), next = document.querySelector("[data-next]");
    var index = 0;
    function show(i, user) {
      index = i;
      var e = YEARS[i];
      note.innerHTML = "";
      note.appendChild(el("span", "year-note__year", String(e.y)));
      var body = el("div", "year-note__body");
      body.appendChild(el("h3", null, e.t));
      body.appendChild(el("p", null, e.d));
      note.appendChild(body);
      setPressed(bar, ".year", String(e.y), "data-id");
      prev.disabled = i === 0;
      next.disabled = i === YEARS.length - 1;
      if (user) {
        var b = bar.querySelector('[data-id="' + e.y + '"]');
        bar.scrollLeft = b.offsetLeft - bar.clientWidth / 2 + b.clientWidth / 2;
      }
    }
    YEARS.forEach(function (e, i) {
      var b = el("button", "year", String(e.y));
      b.type = "button";
      b.setAttribute("data-id", String(e.y));
      b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", function () { show(i, true); });
      bar.appendChild(b);
    });
    prev.addEventListener("click", function () { show(index - 1, true); });
    next.addEventListener("click", function () { show(index + 1, true); });
    show(0, false);
  }

  /* The missing-royals board */
  var BUST = "M22 120C24 92 42 82 60 82S96 92 98 120Z";
  function portrait(extra) {
    return '<svg viewBox="0 0 120 120" aria-hidden="true"><path d="' + BUST + '" fill="#241d2e"/><rect x="52" y="62" width="16" height="24" fill="#241d2e"/><ellipse cx="60" cy="50" rx="19" ry="23" fill="#241d2e"/>' + extra + "</svg>";
  }
  var ROYALS = [
    { name: "King Ulrich IV", age: "Fate unknown", art: portrait('<path d="M40 30l5-20 8 10 7-14 7 14 8-10 5 20z" fill="#c79a34" stroke="#241d2e" stroke-width="2"/><circle cx="46" cy="100" r="2" fill="#efe6d0"/><circle cx="74" cy="100" r="2" fill="#efe6d0"/><circle cx="60" cy="96" r="2" fill="#efe6d0"/>'),
      text: "Portly, wiry-bearded, ordinary of face. Painters gave him a barrel chest and a heroic curl." },
    { name: "Queen Lenore", age: "Fate unknown", art: portrait('<path d="M38 44c0-34 44-34 44 0 2-16-40-16-44 0z" fill="#b5532a"/><path d="M42 86c10 14 26 14 36 0" fill="none" stroke="#2f9a6a" stroke-width="4" stroke-dasharray="2 5" stroke-linecap="round"/>'),
      text: "A Caspian princess, six feet tall, hair dyed bright orange. Never without her necklace of eleven emeralds." },
    { name: "Prince Leonard", age: "Eighteen at the Fall", art: portrait('<path d="M92 16L78 92" stroke="#241d2e" stroke-width="6"/><path d="M80 34h20" stroke="#241d2e" stroke-width="6"/><path d="M50 106l10-10 10 10-10 6z" fill="#c79a34"/>'),
      text: "A soldier by temperament. Sandy hair, and a breastplate worked with dragons." },
    { name: "Princess Katarina", age: "Eleven at the Fall", art: portrait('<path d="M34 34c14-14 38-16 56-4-20-2-40 2-56 4z" fill="#241d2e"/><path d="M42 30c10-14 26-14 34-4" fill="#241d2e"/><path d="M84 30c8-4 14-10 16-16" stroke="#a03a2b" stroke-width="3" fill="none"/>'),
      text: "Auburn-haired and wide-eyed. Wore trousers and a cape, and stole the hats of visiting lords." },
    { name: "Princess Eliza", age: "Six at the Fall", art: '<svg viewBox="0 0 120 120" aria-hidden="true"><path d="M34 120C36 100 48 92 60 92S84 100 86 120Z" fill="#241d2e"/><circle cx="60" cy="72" r="16" fill="#241d2e"/><path d="M38 74c-2-32 46-32 44 0-6-18-38-18-44 0z" fill="#241d2e" stroke="#e0d2ae" stroke-width="2"/><path d="M52 92l8 8 8-8-8-4z" fill="#a03a2b"/></svg>',
      text: "Button-nosed, in a bonnet and patterned dress. If she lived, no one would know her face now." }
  ];

  function initPosters() {
    var host = document.querySelector("[data-posters]");
    if (!host) return;
    var tilts = ["-1.4deg", ".9deg", "-.5deg", "1.3deg", "-1deg"];
    ROYALS.forEach(function (r, i) {
      var b = el("button", "flip");
      b.type = "button";
      b.style.setProperty("--tilt", tilts[i]);
      b.setAttribute("aria-pressed", "false");
      b.setAttribute("aria-label", "Missing poster: " + r.name + ". Turn over for details.");
      var inner = el("span", "flip__inner");
      var front = el("span", "flip__face poster-face");
      front.innerHTML = "<h3>Missing</h3>" + r.art;
      front.appendChild(el("span", "poster__name", r.name));
      front.appendChild(el("span", "poster__age", r.age));
      var back = el("span", "flip__face poster-face poster-back");
      back.appendChild(el("h3", null, r.name));
      back.appendChild(document.createTextNode(r.text));
      back.appendChild(el("small", null, "Last seen: Castle Drakken, 16 September 1111"));
      inner.appendChild(front);
      inner.appendChild(back);
      b.appendChild(inner);
      host.appendChild(b);
    });
  }

  initBanners();
  initPlate();
  initLedger();
  initTimeline();
  initPosters();
  initEntry();
  if (window.COURIER_AFTER_RENDER && document.querySelector("[data-defer-lexicon]")) window.COURIER_AFTER_RENDER();
})();
