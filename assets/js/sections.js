/* Behaviour for the section pages: the grudge web, the Assayer's Plate,
   the Ledger, and the timeline.

   The words for the factions, the timeline and the royals live in their own pages. The Ledger's
   words live in ledger.js. This file only makes them interactive. */
(function () {
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function el2(tag, attrs) {
    var n = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }
  function setPressed(host, selector, id, attr) {
    host.querySelectorAll(selector).forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute(attr) === id ? "true" : "false"); });
  }

  /* The Five Banners: who is at whose throat. Reads the factions and the grudges from the page. */
  function initWeb() {
    var host = document.querySelector("[data-web]"), box = document.querySelector("[data-grudges]");
    if (!host || !box) return;
    var banners = Array.prototype.map.call(document.querySelectorAll(".dossier[id]"), function (d) {
      return { id: d.id, name: d.querySelector("h2").textContent };
    });
    if (!banners.length) return;
    var names = {}, pos = {};
    banners.forEach(function (b, i) {
      var a = (-90 + 360 / banners.length * i) * Math.PI / 180;
      names[b.id] = b.name;
      pos[b.id] = [200 + Math.cos(a) * 150, 196 + Math.sin(a) * 150];
    });
    var items = box.querySelectorAll("li[data-a]"), title = box.querySelector("[data-grudge-name]");
    var svg = el2("svg", { "class": "web__lines", viewBox: "0 0 400 380", "aria-hidden": "true" });
    items.forEach(function (li) {
      var a = li.getAttribute("data-a"), b = li.getAttribute("data-b");
      svg.appendChild(el2("line", { x1: pos[a][0], y1: pos[a][1], x2: pos[b][0], y2: pos[b][1], "class": "web__line web__line--" + li.className, "data-a": a, "data-b": b }));
    });
    host.appendChild(svg);
    function pick(id) {
      setPressed(host, ".web__node", id, "data-id");
      svg.querySelectorAll(".web__line").forEach(function (l) { l.style.opacity = (l.getAttribute("data-a") === id || l.getAttribute("data-b") === id) ? "1" : ".14"; });
      title.textContent = names[id];
      title.hidden = false;
      items.forEach(function (li) {
        var a = li.getAttribute("data-a"), b = li.getAttribute("data-b"), on = a === id || b === id;
        li.hidden = !on;
        if (on) li.querySelector("b").textContent = names[a === id ? b : a];
      });
    }
    banners.forEach(function (b) {
      var n = el("button", "web__node");
      n.type = "button";
      n.setAttribute("data-id", b.id);
      n.setAttribute("aria-label", b.name);
      n.setAttribute("aria-pressed", "false");
      n.style.left = pos[b.id][0] / 4 + "%";
      n.style.top = pos[b.id][1] / 3.8 + "%";
      n.innerHTML = '<svg viewBox="0 0 120 142" aria-hidden="true" focusable="false"><use href="#crest-' + b.id + '"/></svg>';
      n.addEventListener("click", function () { pick(b.id); });
      host.appendChild(n);
    });
    pick(banners[0].id);
  }

  /* The Assayer's Plate */
  var SIZES = [
    { id: "chip", name: "Chip", k: .14, value: "10 gp", measure: "Hardly worth the glove", note: "Flakes knocked off the bigger stones. Save up enough and you can buy yourself one fine night at the Lily, and one fine morning of regret." },
    { id: "fragment", name: "Fragment", k: .36, value: "100 gp", measure: "About the size of a finger", note: "What most prospectors bring home, on the days they come home. Keep it in lead. Don't keep it under your pillow. You'll start to like the humming." },
    { id: "shard", name: "Shard", k: .62, value: "500 gp", measure: "A decent handful", note: "The size that leaves Caravan Court by the wagonload, packed in lead and guarded by people who've stopped blinking." },
    { id: "crystal", name: "Crystal", k: .86, value: "1,000 gp", measure: "As big as a fist", note: "Scarce enough that the traders quit arguing and pay very near what it's worth. When a trader stops arguing with you, check your purse and your back." },
    { id: "geode", name: "Geode", k: 1.75, value: "5,000 gp", measure: "As big as a pumpkin", geode: true, note: "Pays close to full, if you can get it home. Don't drop it. Don't hit it. Hit one too hard and you'll wish all it did was crumble." },
    { id: "massive", name: "Massive Cluster", k: 4.6, value: "Priceless", measure: "Taller than a man, and then some", note: "It ran clean off the Courier's plate. Nobody has ever walked out of the ruins carrying one. Several have tried, and they didn't walk out either." }
  ];
  function shard(g, cx, base, w, h, lean) {
    var tip = cx + lean, mid = base - h * .78;
    g.appendChild(el2("polygon", { points: (cx - w) + "," + base + " " + (cx - w + lean * .7) + "," + mid + " " + tip + "," + (base - h) + " " + (cx + lean * .5) + "," + base, fill: "#6d3fb0", stroke: "#231b18", "stroke-width": 2, "stroke-linejoin": "round" }));
    g.appendChild(el2("polygon", { points: (cx + w) + "," + base + " " + (cx + w + lean * .7) + "," + mid + " " + tip + "," + (base - h) + " " + (cx + lean * .5) + "," + base, fill: "#b583ea", stroke: "#231b18", "stroke-width": 2, "stroke-linejoin": "round" }));
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
    var caption = el2("text", { x: 125, y: 292, "text-anchor": "middle", "font-family": "Spectral, Georgia, serif", "font-style": "italic", "font-size": 16, fill: "#4a4153" });
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

  /* The Ledger. A card with nothing in it this issue is left off the board. */
  function renderIssue(host, issue) {
    var grid = el("div", "ledger-grid");
    var tilts = ["-.5deg", ".6deg", ".4deg", "-.6deg", ".5deg"], count = 0;
    function block(title) {
      var wrap = el("div", "note-wrap");
      var note = el("div", "note");
      note.style.setProperty("--tilt", tilts[count++ % tilts.length]);
      note.appendChild(el("h3", null, title));
      wrap.appendChild(note);
      grid.appendChild(wrap);
      return note;
    }
    function list(title, items) {
      if (!items || !items.length) return;
      var ul = el("ul");
      items.forEach(function (it) {
        var li = el("li", "claim");
        if (it.lead) li.appendChild(el("b", null, it.lead + ". "));
        li.appendChild(document.createTextNode(it.text));
        ul.appendChild(li);
      });
      block(title).appendChild(ul);
    }
    var bell = block("The Tally Bell");
    bell.appendChild(el("p", "tally__sub", "Rung from the Old Tithe House for every claim paid. The whole camp stops talking to count. " + issue.bell));
    var claims = el("ul");
    (issue.claims || []).forEach(function (c) {
      var li = el("li", "claim");
      li.appendChild(el("b", null, c.name));
      li.appendChild(document.createTextNode(", " + c.text + " "));
      li.appendChild(el("span", "status status--" + c.status.toLowerCase(), c.status));
      claims.appendChild(li);
    });
    bell.appendChild(claims);
    list("Open Contracts", (issue.contracts || []).map(function (c) { return { lead: c.title, text: c.text }; }));
    list("Posted About Town", (issue.posted_notices || []).map(function (p) { return { lead: p.where, text: p.text }; }));
    list("Word on the Street", (issue.rumors || []).map(function (r) { return { text: r }; }));
    list("District Danger", (issue.risk || []).map(function (r) { return { lead: r.district, text: r.rating }; }));
    host.appendChild(grid);
  }
  function initLedger() {
    var host = document.querySelector("[data-ledger]");
    var issues = window.COURIER_LEDGER;
    if (!host || !issues || !issues.length) return;   // the page keeps its plain "did not load" line
    var latest = issues[0];
    host.textContent = "";
    document.querySelector("[data-ledger-head]").textContent = "Ledger No. " + latest.issue + ". Posted " + latest.posted + ".";
    renderIssue(host, latest);
    var past = document.querySelector("[data-past]");
    if (issues.length < 2) {
      past.appendChild(el("p", "ledger-empty", "This is the first Ledger. Older issues will be kept here, which is more than can be said for some of our clients."));
      return;
    }
    issues.slice(1).forEach(function (issue) {
      var d = el("details", "past-issue");
      d.appendChild(el("summary", null, "Ledger No. " + issue.issue + ", " + issue.posted));
      var body = el("div");
      renderIssue(body, issue);
      d.appendChild(body);
      past.appendChild(d);
    });
  }

  /* The City That Was: the page lists every year; this shows them one at a time */
  function initTimeline() {
    var bar = document.querySelector("[data-years]"), note = document.querySelector("[data-year-note]");
    if (!bar || !note) return;
    var entries = Array.prototype.slice.call(note.querySelectorAll(".year-entry"));
    var prev = document.querySelector("[data-prev]"), next = document.querySelector("[data-next]");
    var index = 0;
    function show(i, user) {
      index = i;
      entries.forEach(function (e, n) { e.hidden = n !== i; });
      setPressed(bar, ".year", entries[i].getAttribute("data-year"), "data-id");
      prev.disabled = i === 0;
      next.disabled = i === entries.length - 1;
      if (user) {
        var b = bar.querySelector('[aria-pressed="true"]');
        bar.scrollLeft = b.offsetLeft - bar.clientWidth / 2 + b.clientWidth / 2;
      }
    }
    entries.forEach(function (e, i) {
      var y = e.getAttribute("data-year");
      var b = el("button", "year", y);
      b.type = "button";
      b.setAttribute("data-id", y);
      b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", function () { show(i, true); });
      bar.appendChild(b);
    });
    prev.addEventListener("click", function () { show(index - 1, true); });
    next.addEventListener("click", function () { show(index + 1, true); });
    show(0, false);
  }

  initWeb();
  initPlate();
  initLedger();
  initTimeline();
})();
