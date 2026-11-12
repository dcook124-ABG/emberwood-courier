/* Emberwood: an original top-down ink-and-wash village map, place notes, and directory.
   Positions follow the village layout in the sourcebook; all drawing is generated here. */
(function () {
  var PLACES = [
    { id: "caravan-court", name: "Caravan Court", pin: [505, 350], night: "Empty stalls, cold braziers, and a few armed men sitting on lead chests who'd like you to keep walking. Keep walking.",
      tag: "The Market", text: "A boarded-up well with a market grown up round it like moss on a headstone: wagons, canvas, cookfires, and a hundred voices shouting prices at once. Everything you need to die in the ruins is sold here, and everything you drag out of them is bought here, often enough by the same smiling hands. It shuts at sundown, when the whole Court goes off to drink what it made.",
      who: "Armin Gainsbury for gear, Eren Marlowe for provisions, and Orson Fairweather or Aldor the Immense if you have stones to sell" },
    { id: "red-lion", name: "Red Lion Hotel", pin: [192, 162], night: "Every window blazing and the chandelier going. You can see it from anywhere in camp. That's the whole idea.",
      tag: "Lodging", text: "Red brick, stone lions on the steps, glass in every window, and the only true beds in the district, priced to keep you out of them. It was the Reeve's manor before the Fall, and Kosta Stavros still struts the halls like he runs the camp. Nobody's had the heart to tell him otherwise, mainly because nobody's had the interest. Word is he keeps a book on which crews come back. Ask him your odds. He'll tell you. He enjoys it.",
      who: "Kosta Stavros, the Reeve. The Amethyst Academy's buyer also keeps rooms here" },
    { id: "bark-and-buzzard", name: "Bark & Buzzard", pin: [785, 530], night: "Packed to the door and roaring with the day's lies. Best place in camp to hear who didn't come back, and who's already bidding on their boots.",
      tag: "Tavern", text: "The one house in Emberwood where nobody's fixing to rob you, and the Alsbergs would carve that over the door if wood weren't so dear. A big hearth, a full cask, and a lamb stew worth crossing camp in the rain for. If your purse is thin, they'll let you one of the empty cottages out back. Don't ask why so many cottages are empty. You already know. And if anybody invites you out back to kick the can, the can kicks back.",
      who: "Karin and Holger Alsberg" },
    { id: "gilded-lily", name: "The Gilded Lily", pin: [568, 458], night: "Lamps lit, curtain up, somebody singing badly and the whole room singing along. Nobody this close to Drakkenheim has ever been this cheerful for a sensible reason. Join in anyway.",
      tag: "Tavern", text: "Purple paint, gold lamps, velvet curtains, and a proper stage, in a camp that can't grow a potato. How Madam Rochelle gets wine up that road is a mystery, and she likes it kept one. Spirits and wine and nothing you can chew, so eat first. A good many crews have spent their last fine night at these tables, and the stage is open to any brave soul who wants to learn what this crowd thinks of them.",
      who: "Madam Rochelle, who runs the room" },
    { id: "skull-and-sword", name: "Skull & Sword Taphouse", pin: [665, 362], night: "Somebody is being thrown out. Somebody is always being thrown out. Step left.",
      tag: "Tavern", text: "A farmhouse somebody turned into a saloon, and the farmhouse hasn't forgiven anybody. The liquor's cheap, the floor's sticky, and the rumors are the best in camp if you can keep your teeth while you listen. There's a skull run through on a rusty sword by the door. Say hello to it. Out loud. Folks have skipped the courtesy and been reminded, and the reminders don't come gentle.",
      who: "Frida Longhorn behind the bar. The back tables are where the Queen's Men do their hiring" },
    { id: "crowe-and-sons", name: "Crowe & Sons Smithy", pin: [340, 404], night: "Forge banked, smith gone to the Bark & Buzzard. Your dents will keep till morning.",
      tag: "Smith", text: "A log cabin, a ringing forge, and a smith who'll turn your armor over in two sooty hands and name the crook who sold it to you, loud enough for the crook to hear. His girl sits up a dead tree on the road in, keeping count of who arrives. For a gold piece she'll walk you round the camp and tell you how everybody who used to drink in it died. She's very thorough.",
      who: "Tobias Crowe, and young Emma if she finds you first" },
    { id: "chapel", name: "Chapel of Saint Ardenna", pin: [468, 262], night: "The Flame burns all night. It's the only light in camp that isn't selling something.",
      tag: "Faith", text: "A round little chapel of fieldstone under a copper dome, where the Sacred Flame still burns, which is more than you can say for the city. Its keeper is a decent woman in an indecent place. She'll heal you and bless you for an offering, and she will want the offering, because candles don't grow here either. If a friend comes back from the ruins not altogether themselves, start here, and start fast.",
      who: "Flamekeeper Hanna. The Knights of the Silver Order meet here too" },
    { id: "shrine", name: "Shrine of the Old Gods", pin: [858, 90], night: "Candles on the pedestal, every night, lit by no one you'll ever see do it.",
      tag: "Faith", text: "Seven standing stones in a grove of dying trees, and down the path a hut leaking herb smoke through its roof. The old woman who keeps them holds to the old gods and has no use for yours. Half the camp calls her a witch. Not one of them has said it to her face twice. When the Chapel can't help you, she sometimes can, and she'll like you less for asking.",
      who: "Old Zoya" },
    { id: "old-tithe-house", name: "The Old Tithe House", pin: [408, 412], night: "Dark but for one clerk's lamp. Somebody's always doing the sums.",
      tag: "Business", text: "Back when there was a crown, the Reeve counted its taxes here. Now Harrow & Vane, Underwriters, keep their books in it, and they'll write a policy for anybody with coin and reason to worry, which in Emberwood is everybody with a pulse. There's a bell up in the cupola. It rings once for every claim paid. When it goes, the whole camp goes quiet and counts.",
      who: "clerks, mostly, and whoever has just lost a friend" },
    { id: "watchtower", name: "Lantern Watchtower", pin: [625, 172], night: "Lanterns up top and somebody awake behind them, counting who goes north. And, later, who doesn't come back.",
      tag: "The Road North", text: "The tallest thing in camp, squatting on the north road beside the covered bridge that's your one way out to Drakkenheim. The Hooded Lanterns got their start right here. They've moved on to bigger trouble at the city gates and left a garrison behind to watch the road and look down on the rest of us, which from that height comes natural.",
      who: "the Hooded Lanterns, who are always looking for scouts" },
    { id: "hendrix-farm", name: "Hendrix Farm", pin: [722, 606], night: "Cookfires and hymns. The singing carries clear to the Red Lion. Some nights it's lovely. Some nights you'd swear something up north was singing back.",
      tag: "The Faithful", text: "One of the last farms in the valley with anybody still on it, though nothing's come up out of that ground in years. What it raises now is tents and cookfires. The pilgrims of the Falling Fire gather here before the last leg of the road to the Crater, fasting and singing and looking north with shining eyes. Some of them bring their children. Don't ask them to reconsider. People have. The pilgrims only smile and pray for you, which is somehow worse.",
      who: "Farmer Hendrix, and the Followers of the Falling Fire" },
    { id: "eventide-manor", name: "Eventide Manor", pin: [335, 560], night: "Nobody goes near it after dark. Nobody will tell you why, and you'll notice they don't laugh when they don't tell you.",
      tag: "Local Color", text: "Burned out years back, and nobody's been fool enough to claim what's left. The camp's children will tell you about noises in the cellar, cold spots in high summer, and charred doors that open and shut on their own. Children will tell you a great many things. Go ahead and spend a night. The Courier would love the story.",
      who: "nobody, if you believe the grown-ups" }
  ];

  var NS = "http://www.w3.org/2000/svg";
  var VIEW = { x: 80, y: 20, w: 850, h: 640 };
  var SCALE = 2.2;
  var FRAME = 36;   // width of the carved border, in map units
  var INK = "#231b18";

  var seed = 2311;
  function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
  function range(a, b) { return a + rnd() * (b - a); }
  function pick(list) { return list[Math.floor(rnd() * list.length)]; }

  function svgEl(tag, attrs, parent) {
    var n = document.createElementNS(NS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }

  function shade(rgb, k) {
    return "rgb(" + rgb.map(function (v) { return Math.max(0, Math.min(255, Math.round(v * k))); }).join(",") + ")";
  }

  // Catmull-Rom sampling, so roads and the stream are smooth but hand-placed
  function spline(pts, step) {
    var out = [];
    for (var i = 0; i < pts.length - 1; i++) {
      var p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      for (var t = 0; t < 1; t += step) {
        var t2 = t * t, t3 = t2 * t;
        out.push([
          .5 * (2 * p1[0] + (p2[0] - p0[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (3 * p1[0] - p0[0] - 3 * p2[0] + p3[0]) * t3),
          .5 * (2 * p1[1] + (p2[1] - p0[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (3 * p1[1] - p0[1] - 3 * p2[1] + p3[1]) * t3)
        ]);
      }
    }
    out.push(pts[pts.length - 1]);
    return out;
  }

  function offsetLine(line, dist, jitter) {
    return line.map(function (p, i) {
      var a = line[Math.max(0, i - 1)], b = line[Math.min(line.length - 1, i + 1)];
      var dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1;
      var d = dist + range(-jitter, jitter);
      return [p[0] - dy / len * d, p[1] + dx / len * d];
    });
  }

  function trace(ctx, pts, close) {
    ctx.beginPath();
    pts.forEach(function (p, i) { if (i) ctx.lineTo(p[0], p[1]); else ctx.moveTo(p[0], p[1]); });
    if (close) ctx.closePath();
  }

  // Roughens a straight-edged polygon so ink lines look drawn by hand
  function rough(poly, amt) {
    var out = [];
    poly.forEach(function (p, i) {
      var q = poly[(i + 1) % poly.length];
      var parts = Math.max(1, Math.round(Math.hypot(q[0] - p[0], q[1] - p[1]) / 11));
      for (var t = 0; t < parts; t++) {
        var f = t / parts;
        out.push([p[0] + (q[0] - p[0]) * f + range(-amt, amt), p[1] + (q[1] - p[1]) * f + range(-amt, amt)]);
      }
    });
    return out;
  }

  function wash(ctx, x, y, r, color) {
    var g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, color);
    g.addColorStop(1, color.replace(/[\d.]+\)$/, "0)"));
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r, 0, 6.29); ctx.fill();
  }

  function withShadow(ctx, fn, off) {
    ctx.save();
    ctx.shadowColor = "rgba(52,64,92,.62)";
    ctx.shadowBlur = 5 * SCALE;
    ctx.shadowOffsetX = off * SCALE;
    ctx.shadowOffsetY = off * SCALE;
    fn();
    ctx.restore();
  }

  /* Roofs */
  var PAL = {
    thatch: [150, 136, 86], straw: [168, 150, 96], brown: [132, 108, 82], red: [138, 84, 78],
    slate: [112, 108, 118], plum: [116, 84, 128], burnt: [66, 57, 52], grey: [134, 126, 112]
  };

  function plane(ctx, poly, sx, sy, base, rot, density) {
    var gx = sx * Math.cos(rot) - sy * Math.sin(rot), gy = sx * Math.sin(rot) + sy * Math.cos(rot);
    var k = .92 + (gx * -.62 + gy * -.78) * .26;
    ctx.save();
    trace(ctx, poly, true);
    ctx.fillStyle = shade(base, k + range(-.03, .03));
    ctx.fill();
    ctx.clip();
    var R = 90, px = -sy, py = sx;
    ctx.beginPath();
    for (var t = -R; t < R; t += range(1.5, 2.9) / density) {
      if (rnd() < .1) continue;
      var pos = -R;
      while (pos < R) {
        var len = range(6, 20);
        var bx = px * t + sx * pos, by = py * t + sy * pos;
        ctx.moveTo(bx + range(-.3, .3), by + range(-.3, .3));
        ctx.lineTo(bx + sx * len + range(-.4, .4), by + sy * len + range(-.4, .4));
        pos += len + range(.8, 4);
      }
    }
    ctx.strokeStyle = "rgba(28,20,16,.72)";
    ctx.lineWidth = .82;
    ctx.stroke();
    ctx.restore();
  }

  function building(ctx, b) {
    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.rotate(b.r || 0);
    var hw = b.w / 2, hh = b.h / 2, base = b.col || PAL[b.pal || "brown"], rot = b.r || 0, dens = b.dens || 1;
    var outline = [[-hw, -hh], [hw, -hh], [hw, hh], [-hw, hh]];
    var edge = rough(outline, .55);
    withShadow(ctx, function () { trace(ctx, edge, true); ctx.fillStyle = shade(base, .8); ctx.fill(); }, 4.6);

    if (b.hip) {
      var i = Math.min(hw, hh) * .92;
      plane(ctx, [[-hw, -hh], [hw, -hh], [hw - i, 0], [-hw + i, 0]], 0, -1, base, rot, dens);
      plane(ctx, [[-hw, hh], [hw, hh], [hw - i, 0], [-hw + i, 0]], 0, 1, base, rot, dens);
      plane(ctx, [[-hw, -hh], [-hw + i, 0], [-hw, hh]], -1, 0, base, rot, dens);
      plane(ctx, [[hw, -hh], [hw - i, 0], [hw, hh]], 1, 0, base, rot, dens);
      ctx.strokeStyle = INK; ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-hw, -hh); ctx.lineTo(-hw + i, 0); ctx.lineTo(-hw, hh);
      ctx.moveTo(hw, -hh); ctx.lineTo(hw - i, 0); ctx.lineTo(hw, hh);
      ctx.moveTo(-hw + i, 0); ctx.lineTo(hw - i, 0);
      ctx.stroke();
    } else {
      plane(ctx, [[-hw, -hh], [hw, -hh], [hw, 0], [-hw, 0]], 0, -1, base, rot, dens);
      plane(ctx, [[-hw, hh], [hw, hh], [hw, 0], [-hw, 0]], 0, 1, base, rot, dens);
      trace(ctx, rough([[-hw, 0], [hw, 0]], .4).concat([[hw, 0]]));
      ctx.strokeStyle = INK; ctx.lineWidth = 1.2; ctx.stroke();
    }

    if (b.ruin) {
      ctx.save();
      trace(ctx, outline, true); ctx.clip();
      for (var h = 0; h < b.ruin; h++) {
        var cx = range(-hw * .7, hw * .7), cy = range(-hh * .75, hh * .75), rr = range(3.5, Math.min(hh * .85, 9));
        var blob = [];
        for (var a = 0; a < 7; a++) blob.push([cx + Math.cos(a * .9) * rr * range(.7, 1.25), cy + Math.sin(a * .9) * rr * range(.7, 1.25)]);
        trace(ctx, blob, true);
        ctx.fillStyle = "#1f1815"; ctx.fill();
        ctx.beginPath();
        for (var v = -rr; v < rr; v += 3.6) { ctx.moveTo(cx + v, cy - rr); ctx.lineTo(cx + v, cy + rr); }
        ctx.strokeStyle = "#8c7a60"; ctx.lineWidth = .8; ctx.stroke();
      }
      ctx.restore();
    }

    trace(ctx, edge, true);
    ctx.strokeStyle = INK; ctx.lineWidth = 1.65; ctx.stroke();

    if (b.chimney) {
      var cxp = hw * .5, cyp = -hh * .45;
      withShadow(ctx, function () { ctx.fillStyle = "#8c867c"; ctx.fillRect(cxp - 3, cyp - 3, 6, 6); }, 2.2);
      ctx.strokeStyle = INK; ctx.lineWidth = 1; ctx.strokeRect(cxp - 3, cyp - 3, 6, 6);
      ctx.fillStyle = "#2a2220"; ctx.fillRect(cxp - 1.2, cyp - 1.2, 2.4, 2.4);
    }
    ctx.restore();
  }

  /* Trees */
  function canopy(ctx, x, y, r, tone, curls) {
    var n = Math.round(r * .55) + 6, pts = [];
    for (var i = 0; i < n; i++) {
      var a = i / n * 6.283, d = r * range(.82, 1.08);
      pts.push([x + Math.cos(a) * d, y + Math.sin(a) * d]);
    }
    function path() {
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (var i = 0; i < n; i++) {
        var p = pts[i], q = pts[(i + 1) % n];
        var mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2;
        var cx = x + (mx - x) * 1.34, cy = y + (my - y) * 1.34;
        ctx.quadraticCurveTo(cx, cy, q[0], q[1]);
      }
      ctx.closePath();
    }
    withShadow(ctx, function () { path(); ctx.fillStyle = tone; ctx.fill(); }, 3.4);
    path(); ctx.strokeStyle = INK; ctx.lineWidth = 1.15; ctx.stroke();
    ctx.beginPath();
    for (var c = 0; c < curls; c++) {
      var ca = range(0, 6.28), cd = range(.1, .62) * r, cx2 = x + Math.cos(ca) * cd, cy2 = y + Math.sin(ca) * cd, cr = range(2.2, 5);
      var st = range(0, 6.28);
      ctx.moveTo(cx2 + Math.cos(st) * cr, cy2 + Math.sin(st) * cr);
      ctx.arc(cx2, cy2, cr, st, st + 3.6);
    }
    ctx.strokeStyle = "rgba(35,27,24,.55)"; ctx.lineWidth = .8; ctx.stroke();
  }

  // A bare tree from above: a dense, round crown of forking twigs around a dark trunk
  function snag(ctx, x, y, r) {
    var limbs = Math.round(range(8, 12)), paths = [];
    function fork(px, py, a, len, depth) {
      var nx = px + Math.cos(a) * len, ny = py + Math.sin(a) * len;
      paths[depth] = paths[depth] || [];
      paths[depth].push([px, py, nx, ny]);
      if (depth >= 3) return;
      var kids = rnd() < .35 ? 3 : 2;
      for (var k = 0; k < kids; k++) fork(nx, ny, a + range(-.62, .62), len * range(.58, .78), depth + 1);
    }
    for (var i = 0; i < limbs; i++) fork(x, y, i / limbs * 6.283 + range(-.22, .22), r * range(.32, .44), 0);
    function draw(dx, dy, color, scale) {
      paths.forEach(function (set, depth) {
        ctx.beginPath();
        set.forEach(function (s) { ctx.moveTo(s[0] + dx, s[1] + dy); ctx.lineTo(s[2] + dx, s[3] + dy); });
        ctx.strokeStyle = color;
        ctx.lineWidth = [1.5, 1, .7, .5][depth] * scale;
        ctx.stroke();
      });
    }
    wash(ctx, x + 3, y + 3, r * 1.1, "rgba(58,60,76,.26)");
    draw(3.2, 3.2, "rgba(52,64,92,.34)", 1);
    draw(0, 0, "rgba(38,29,25,.92)", 1);
    ctx.fillStyle = "#3a302a";
    ctx.beginPath(); ctx.arc(x, y, 2.4, 0, 6.3); ctx.fill();
  }

  // Low, dry scrub: small tangled clumps in dun and ash
  function scrub(ctx, x, y, r) {
    var n = Math.round(range(2, 4));
    for (var i = 0; i < n; i++) {
      canopy(ctx, x + range(-r, r), y + range(-r * .7, r * .7), range(r * .5, r * .95), pick(DYING), 1);
    }
  }

  function stump(ctx, x, y, r) {
    withShadow(ctx, function () { ctx.beginPath(); ctx.arc(x, y, r, 0, 6.3); ctx.fillStyle = "#8f8473"; ctx.fill(); }, 2);
    ctx.strokeStyle = INK; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.3); ctx.stroke();
    ctx.lineWidth = .6; ctx.beginPath(); ctx.arc(x, y, r * .55, 0, 6.3); ctx.stroke();
  }

  /* Delerium: faceted shards seen from above, with their glow */
  function crystal(ctx, x, y, s) {
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    wash(ctx, x, y, s * 3, "rgba(150,84,224,.6)");
    wash(ctx, x, y, s * 1.5, "rgba(96,214,200,.22)");
    ctx.restore();

    // Veins of colour creeping through the cracked ground
    ctx.save();
    ctx.shadowColor = "rgba(176,111,240,.9)";
    ctx.shadowBlur = 1.2 * SCALE;
    ctx.strokeStyle = "rgba(186,134,240,.6)";
    ctx.lineWidth = .8;
    ctx.beginPath();
    var veins = Math.round(range(2, 3));
    for (var v = 0; v < veins; v++) {
      var va = range(0, 6.28), vx = x, vy = y;
      ctx.moveTo(vx, vy);
      for (var st = 0; st < 3; st++) {
        va += range(-.7, .7);
        var seg = range(3, 6) * (s / 9 + .5);
        vx += Math.cos(va) * seg; vy += Math.sin(va) * seg;
        ctx.lineTo(vx, vy);
      }
    }
    ctx.stroke();
    ctx.restore();

    var n = Math.round(range(5, 8));
    for (var i = 0; i < n; i++) {
      var a = i / n * 6.283 + range(-.3, .3), len = s * range(.75, 1.3), w = s * range(.24, .4);
      var tip = [x + Math.cos(a) * len, y + Math.sin(a) * len];
      var left = [x + Math.cos(a + 1.57) * w, y + Math.sin(a + 1.57) * w];
      var right = [x + Math.cos(a - 1.57) * w, y + Math.sin(a - 1.57) * w];
      withShadow(ctx, function () {
        trace(ctx, [left, tip, right], true);
        ctx.fillStyle = "#5f369c"; ctx.fill();
      }, 2);
      trace(ctx, [[x, y], left, tip], true); ctx.fillStyle = "#c79af4"; ctx.fill();
      trace(ctx, [[x, y], right, tip], true); ctx.fillStyle = "#6c3faf"; ctx.fill();
      trace(ctx, [left, tip, right], true); ctx.strokeStyle = INK; ctx.lineWidth = .95; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(tip[0], tip[1]);
      ctx.strokeStyle = "rgba(146,236,224,.9)"; ctx.lineWidth = .6; ctx.stroke();
    }
    ctx.fillStyle = "#e2c9ff";
    ctx.beginPath(); ctx.arc(x, y, Math.max(.8, s * .13), 0, 6.3); ctx.fill();
  }

  var DYING = ["#8b8374", "#7a7266", "#948a78", "#6e675f", "#a09378"];

  function paint(canvas) {
    var ctx = canvas.getContext("2d");
    ctx.setTransform(SCALE, 0, 0, SCALE, (FRAME - VIEW.x) * SCALE, (FRAME - VIEW.y) * SCALE);
    ctx.lineCap = "round"; ctx.lineJoin = "round";

    /* Ground wash */
    ctx.fillStyle = "#aca393";
    ctx.fillRect(VIEW.x, VIEW.y, VIEW.w, VIEW.h);
    var i, x, y;
    for (i = 0; i < 260; i++) {
      x = range(VIEW.x, VIEW.x + VIEW.w); y = range(VIEW.y, VIEW.y + VIEW.h);
      wash(ctx, x, y, range(26, 92), pick(["rgba(96,88,80,.16)", "rgba(166,154,132,.2)", "rgba(128,118,104,.18)", "rgba(66,60,60,.1)", "rgba(190,182,162,.14)"]));
    }

    var ROADS = [
      [[572, 16], [566, 84], [560, 140], [552, 186], [540, 240], [526, 300]],
      [[514, 424], [484, 476], [462, 500], [448, 544], [430, 610], [420, 668]],
      [[562, 394], [640, 412], [760, 416], [916, 458]],
      [[450, 338], [392, 322], [326, 268], [262, 212]]
    ].map(function (r) { return spline(r, .08); });
    var RING = [];
    for (i = 0; i <= 44; i++) RING.push([505 + Math.cos(i / 44 * 6.283) * 60, 366 + Math.sin(i / 44 * 6.283) * 56]);

    var BLD = [];
    function B(x, y, w, h, deg, pal, opts) {
      var b = { x: x, y: y, w: w, h: h, r: deg * Math.PI / 180, pal: pal };
      if (opts) for (var k in opts) b[k] = opts[k];
      BLD.push(b);
    }

    // Ordinary cottages, placed from the village plan. Roughly two in three are abandoned.
    [[437,132,1,-28],[484,142,0,4],[415,190,1,35],[612,258,0,-32],[580,288,1,62],[727,205,1,42],[793,212,0,12],[847,225,1,-30],
     [743,285,0,-38],[834,300,1,28],[803,335,0,62],[735,338,1,8],[715,382,0,-8],[822,392,1,35],[352,313,0,-25],[298,318,1,2],
     [262,328,1,70],[229,393,1,20],[267,410,1,-12],[180,440,1,62],[208,512,1,38],[262,490,1,14],[440,482,0,66],[545,512,0,4],
     [585,524,1,8],[624,528,0,86],[672,448,1,18],[704,466,0,62],[786,473,1,-42],[846,490,0,-18],[686,520,1,-48],[858,546,1,72],
     [528,585,1,14],[570,590,1,-22],[610,596,0,4],[830,610,1,88]
    ].forEach(function (c) {
      var boarded = !!c[2];
      var pal = boarded ? pick(["grey", "grey", "thatch", "brown"]) : pick(["thatch", "straw", "brown", "red"]);
      B(c[0], c[1], range(29, 37), range(20, 25), c[3], pal, { hip: rnd() < .3, ruin: boarded ? (rnd() < .85 ? (rnd() < .4 ? 2 : 1) : 0) : 0, chimney: !boarded && rnd() < .6 });
    });

    // Named buildings
    B(665, 362, 66, 50, 12, "brown", { chimney: true });           // Skull & Sword
    B(630, 398, 22, 16, 12, "grey");
    B(338, 404, 66, 30, -24, "thatch", { chimney: true });         // Crowe & Sons
    B(372, 438, 26, 20, 40, "slate");
    B(395, 398, 66, 30, 22, "red");                                // Old Tithe House
    B(427, 430, 30, 48, 22, "red", { hip: true });
    B(568, 458, 78, 34, -20, "plum", { chimney: true });           // Gilded Lily
    B(612, 440, 28, 44, -20, "plum", { hip: true });
    B(785, 530, 50, 38, 40, "thatch", { hip: true, chimney: true }); // Bark & Buzzard
    B(322, 562, 82, 34, -40, "burnt", { ruin: 3, dens: .8 });      // Eventide Manor
    B(362, 540, 32, 48, -40, "burnt", { ruin: 2, dens: .8 });
    B(642, 188, 40, 28, 0, "brown");                               // Watchtower hall
    B(708, 612, 56, 30, 0, "grey", { hip: true });                 // Hendrix barn
    B(752, 590, 30, 22, 14, "thatch", { chimney: true });
    B(902, 74, 24, 18, 18, "thatch", { chimney: true });           // Zoya's hut

    /* Pale trampled earth wherever people live */
    BLD.forEach(function (b) { wash(ctx, b.x, b.y, 62, "rgba(226,219,200,.62)"); });
    ROADS.concat([RING]).forEach(function (r) { r.forEach(function (p, n) { if (n % 2 === 0) wash(ctx, p[0], p[1], 42, "rgba(226,219,200,.38)"); }); });

    /* Stony speckle on the ground */
    ctx.fillStyle = "rgba(70,58,44,.32)";
    for (i = 0; i < 2600; i++) {
      x = range(VIEW.x, VIEW.x + VIEW.w); y = range(VIEW.y, VIEW.y + VIEW.h);
      ctx.fillRect(x, y, range(.4, 1.5), range(.4, 1.1));
    }

    /* Cracked, dead earth */
    ctx.beginPath();
    for (i = 0; i < 300; i++) {
      x = range(VIEW.x, VIEW.x + VIEW.w); y = range(VIEW.y, VIEW.y + VIEW.h);
      var ca = range(0, 6.28);
      ctx.moveTo(x, y);
      for (var cs = 0; cs < 4; cs++) {
        ca += range(-.8, .8);
        x += Math.cos(ca) * range(5, 14); y += Math.sin(ca) * range(5, 14);
        ctx.lineTo(x, y);
      }
    }
    ctx.strokeStyle = "rgba(44,34,30,.42)"; ctx.lineWidth = .7; ctx.stroke();

    /* The hill under the Red Lion */
    [[140, 124, .3], [126, 111, .22], [112, 98, .18]].forEach(function (c, n) {
      var pts = [];
      for (var a = 0; a < 46; a++) {
        var t = a / 46 * 6.283, w = 1 + Math.sin(t * 3 + n) * .05 + range(-.015, .015);
        pts.push([197 + Math.cos(t + .5) * c[0] * w * .96, 168 + Math.sin(t + .5) * c[1] * w * .86]);
      }
      trace(ctx, pts, true);
      ctx.fillStyle = "rgba(118,92,62," + c[2] + ")"; ctx.fill();
      ctx.strokeStyle = "rgba(40,30,24,.7)"; ctx.lineWidth = 1.2; ctx.stroke();
    });

    /* The Timberwash */
    var stream = spline([[70, 62], [160, 52], [232, 70], [318, 68], [450, 90], [562, 88], [690, 112], [780, 122], [880, 140], [944, 128]], .05);
    var bankA = offsetLine(stream, 12, 1.5), bankB = offsetLine(stream, -12, 1.5);
    trace(ctx, bankA.concat(bankB.slice().reverse()), true);
    ctx.fillStyle = "#68717a"; ctx.fill();
    trace(ctx, offsetLine(stream, 5, 1).concat(offsetLine(stream, -5, 1).reverse()), true);
    ctx.fillStyle = "rgba(122,126,124,.5)"; ctx.fill();
    [bankA, bankB].forEach(function (b) { trace(ctx, b); ctx.strokeStyle = INK; ctx.lineWidth = 1.5; ctx.stroke(); });
    ctx.beginPath();
    for (i = 3; i < stream.length - 4; i += 3) {
      var off = range(-8, 8), s0 = offsetLine(stream, off, 0)[i], s1 = offsetLine(stream, off, 0)[i + 2];
      ctx.moveTo(s0[0], s0[1]); ctx.lineTo(s1[0], s1[1]);
    }
    ctx.strokeStyle = "rgba(40,62,66,.48)"; ctx.lineWidth = .7; ctx.stroke();
    /* Roads */
    ROADS.concat([RING]).forEach(function (r) { trace(ctx, r); ctx.strokeStyle = "#ded4bb"; ctx.lineWidth = 23; ctx.stroke(); });
    ctx.setLineDash([7, 6]);
    ROADS.concat([RING]).forEach(function (r) {
      [11.5, -11.5].forEach(function (d) { trace(ctx, offsetLine(r, d, .5)); ctx.strokeStyle = "rgba(40,30,24,.72)"; ctx.lineWidth = 1.1; ctx.stroke(); });
    });
    // Footpaths
    ctx.setLineDash([1.6, 6]);
    [[[738, 420], [752, 490], [742, 556], [728, 590]], [[650, 150], [720, 118], [790, 96], [832, 88]], [[780, 430], [790, 470], [788, 500]]].forEach(function (p) {
      trace(ctx, spline(p, .1)); ctx.strokeStyle = INK; ctx.lineWidth = 1.5; ctx.stroke();
    });
    ctx.setLineDash([]);
    // Loose cobbles along the road edges
    ctx.fillStyle = "rgba(104,92,76,.75)"; ctx.strokeStyle = "rgba(35,27,24,.75)"; ctx.lineWidth = .6;
    ROADS.forEach(function (r) {
      r.forEach(function (p, n) {
        if (rnd() < .55) return;
        var q = offsetLine(r, pick([14, -14]) + range(-3, 3), 0)[n];
        ctx.beginPath(); ctx.ellipse(q[0], q[1], range(1.4, 2.8), range(1, 2), range(0, 3), 0, 6.3); ctx.fill(); ctx.stroke();
      });
    });

    /* Caravan Court */
    ctx.beginPath(); ctx.ellipse(505, 366, 48, 44, 0, 0, 6.3);
    ctx.fillStyle = "#cdc2a8"; ctx.fill();
    ctx.strokeStyle = INK; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.strokeStyle = "rgba(40,30,24,.34)"; ctx.lineWidth = .6;
    for (i = 0; i < 90; i++) {
      x = 505 + range(-44, 44); y = 366 + range(-40, 40);
      if (Math.pow((x - 505) / 46, 2) + Math.pow((y - 366) / 42, 2) > 1) continue;
      ctx.strokeRect(x, y, range(3, 6), range(2, 4));
    }
    withShadow(ctx, function () { ctx.beginPath(); ctx.arc(505, 372, 9, 0, 6.3); ctx.fillStyle = "#8c867c"; ctx.fill(); }, 2.6);
    ctx.strokeStyle = INK; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.arc(505, 372, 9, 0, 6.3); ctx.stroke();
    ctx.fillStyle = "#79603f"; ctx.fillRect(498, 369, 14, 3); ctx.fillRect(498, 374, 14, 3);
    ctx.lineWidth = .8; ctx.strokeRect(498, 369, 14, 3); ctx.strokeRect(498, 374, 14, 3);
    [[474, 348, [111, 127, 156]], [535, 342, [176, 154, 62]], [465, 378, [88, 122, 88]], [544, 374, [138, 108, 152]], [486, 398, [156, 90, 80]], [526, 398, [111, 127, 156]], [505, 330, [176, 154, 62]]].forEach(function (s) {
      building(ctx, { x: s[0], y: s[1], w: 21, h: 13, r: range(-.8, .8), col: s[2], dens: 1.2 });
    });

    /* Red Lion's walled grounds */
    var wall = [[168, 76], [298, 150], [222, 262], [98, 180]];
    trace(ctx, wall, true); ctx.fillStyle = "rgba(146,134,110,.75)"; ctx.fill();
    var wallR = rough(wall, .5).concat([wall[0]]);
    trace(ctx, wallR); ctx.strokeStyle = INK; ctx.lineWidth = 5.2; ctx.stroke();
    trace(ctx, wallR); ctx.strokeStyle = "#a79d8c"; ctx.lineWidth = 2.8; ctx.stroke();

    /* Buildings */
    BLD.forEach(function (b) { building(ctx, b); });

    // Old Tithe House bell cupola, a small square like any other roof detail
    building(ctx, { x: 395, y: 398, w: 10, h: 10, r: .38, pal: "slate", hip: true, dens: 1.3 });

    // Red Lion: a large red-brick manor
    building(ctx, { x: 193, y: 150, w: 110, h: 42, r: 30 * Math.PI / 180, pal: "red", chimney: true });
    building(ctx, { x: 163, y: 188, w: 72, h: 34, r: -60 * Math.PI / 180, pal: "red", hip: true });
    building(ctx, { x: 228, y: 196, w: 56, h: 30, r: -60 * Math.PI / 180, pal: "red", chimney: true });

    /* Chapel: round with a verdigris copper dome */
    withShadow(ctx, function () { ctx.beginPath(); ctx.arc(468, 262, 33, 0, 6.3); ctx.fillStyle = "#7f9a8e"; ctx.fill(); }, 5);
    for (i = 0; i < 12; i++) {
      var a0 = i / 12 * 6.283, a1 = (i + 1) / 12 * 6.283;
      var poly = [[468, 262]];
      for (var st = 0; st <= 4; st++) { var aa = a0 + (a1 - a0) * st / 4; poly.push([468 + Math.cos(aa) * 33, 262 + Math.sin(aa) * 33]); }
      var mid = (a0 + a1) / 2;
      plane(ctx, poly, Math.cos(mid), Math.sin(mid), [126, 154, 142], 0, 1.05);
    }
    ctx.strokeStyle = INK; ctx.lineWidth = 1;
    ctx.beginPath();
    for (i = 0; i < 12; i++) { ctx.moveTo(468, 262); ctx.lineTo(468 + Math.cos(i / 12 * 6.283) * 33, 262 + Math.sin(i / 12 * 6.283) * 33); }
    ctx.stroke();
    ctx.lineWidth = 1.8; ctx.beginPath(); ctx.arc(468, 262, 33, 0, 6.3); ctx.stroke();
    ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(468, 262, 23, 0, 6.3); ctx.stroke();

    /* Watchtower: round, crenellated stone */
    withShadow(ctx, function () { ctx.beginPath(); ctx.arc(625, 172, 24, 0, 6.3); ctx.fillStyle = "#9b958a"; ctx.fill(); }, 7);
    ctx.strokeStyle = INK; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.arc(625, 172, 24, 0, 6.3); ctx.stroke();
    ctx.fillStyle = "#5e584f"; ctx.beginPath(); ctx.arc(625, 172, 15, 0, 6.3); ctx.fill();
    ctx.lineWidth = 1; ctx.stroke();
    for (i = 0; i < 16; i++) {
      if (i % 2) continue;
      ctx.save(); ctx.translate(625, 172); ctx.rotate(i / 16 * 6.283);
      ctx.fillStyle = "#b8b2a4"; ctx.fillRect(16.5, -3.4, 7, 6.8);
      ctx.strokeStyle = INK; ctx.lineWidth = .8; ctx.strokeRect(16.5, -3.4, 7, 6.8);
      ctx.restore();
    }
    // Yard fence
    ctx.setLineDash([5, 3]);
    ctx.strokeStyle = INK; ctx.lineWidth = 1.5;
    ctx.strokeRect(664, 170, 42, 44);
    ctx.setLineDash([]);

    /* Covered bridge */
    building(ctx, { x: 566, y: 88, w: 42, h: 25, r: 92 * Math.PI / 180, pal: "brown" });

    /* Hendrix's fallow field and pilgrim tents */
    ctx.save();
    ctx.translate(800, 610); ctx.rotate(.05);
    ctx.fillStyle = "rgba(112,98,70,.5)"; ctx.fillRect(-36, -30, 96, 60);
    ctx.strokeStyle = "rgba(35,27,24,.65)"; ctx.lineWidth = .9;
    ctx.beginPath();
    for (i = -28; i < 30; i += 6) { ctx.moveTo(-34, i); ctx.lineTo(58, i + range(-1, 1)); }
    ctx.stroke();
    ctx.restore();
    [[660, 622], [676, 642], [646, 646], [770, 636], [826, 640], [790, 596]].forEach(function (p) {
      building(ctx, { x: p[0], y: p[1], w: 15, h: 11, r: range(-.5, .5), pal: "straw", dens: .8 });
    });

    /* Standing stones */
    [[830, 92], [842, 74], [860, 68], [878, 74], [888, 92], [844, 110], [874, 110]].forEach(function (p) {
      withShadow(ctx, function () {
        ctx.beginPath(); ctx.ellipse(p[0], p[1], 5.6, 4.2, range(0, 3), 0, 6.3);
        ctx.fillStyle = "#8d8a86"; ctx.fill();
      }, 5);
      ctx.strokeStyle = INK; ctx.lineWidth = 1.3; ctx.stroke();
    });

    /* Dying forest round the edge */
    var placed = 0, guard = 0;
    while (placed < 92 && guard++ < 3000) {
      x = range(VIEW.x, VIEW.x + VIEW.w); y = range(VIEW.y, VIEW.y + VIEW.h);
      var dist = Math.pow((x - 505) / 405, 2) + Math.pow((y - 342) / 292, 2);
      if (dist < 1.02) continue;
      if (y > 40 && y < 150 && Math.abs(y - (60 + (x - 80) * .09)) < 34) continue;   // keep the stream clear
      if (x > 400 && x < 460 && y > 610) continue;                                   // keep the south road clear
      if (x > 545 && x < 595 && y < 70) continue;                                    // keep the north road clear
      if (x > 815 && x < 925 && y < 130) continue;                                   // keep the shrine clear
      if (x > 640 && y > 575) continue;                                              // keep the farm clear
      placed++;
      var kind = rnd();
      if (kind < .52) snag(ctx, x, y, range(15, 26));
      else if (kind < .9) scrub(ctx, x, y, range(7, 12));
      else stump(ctx, x, y, range(3, 5));
    }
    [[690, 305, 3], [865, 345, 3], [288, 526, 2]].forEach(function (c) {
      for (var t = 0; t < c[2]; t++) snag(ctx, c[0] + range(-24, 24), c[1] + range(-16, 16), range(13, 18));
      scrub(ctx, c[0] + range(-18, 18), c[1] + range(-12, 12), 7);
    });
    [[820, 118], [894, 112], [908, 96], [816, 72]].forEach(function (p) { snag(ctx, p[0], p[1], 16); });

    /* Compass */
    ctx.save();
    ctx.translate(148, 585);
    ctx.fillStyle = "rgba(224,214,188,.85)";
    ctx.beginPath(); ctx.arc(0, 0, 25, 0, 6.3); ctx.fill();
    ctx.strokeStyle = INK; ctx.lineWidth = 1.2; ctx.stroke();
    ctx.fillStyle = INK;
    ctx.beginPath(); ctx.moveTo(0, -23); ctx.lineTo(5, -5); ctx.lineTo(23, 0); ctx.lineTo(5, 5); ctx.lineTo(0, 23); ctx.lineTo(-5, 5); ctx.lineTo(-23, 0); ctx.lineTo(-5, -5); ctx.closePath(); ctx.fill();
    ctx.fillStyle = "#e6dcc2";
    ctx.beginPath(); ctx.moveTo(0, -23); ctx.lineTo(5, -5); ctx.lineTo(0, 0); ctx.closePath(); ctx.moveTo(23, 0); ctx.lineTo(5, 5); ctx.lineTo(0, 0); ctx.closePath(); ctx.moveTo(0, 23); ctx.lineTo(-5, 5); ctx.lineTo(0, 0); ctx.closePath(); ctx.moveTo(-23, 0); ctx.lineTo(-5, -5); ctx.lineTo(0, 0); ctx.closePath(); ctx.fill();
    ctx.restore();

    /* Paper grain over everything */
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    var tile = document.createElement("canvas");
    tile.width = tile.height = 300;
    var tx = tile.getContext("2d"), img = tx.createImageData(300, 300);
    for (i = 0; i < img.data.length; i += 4) {
      var v = 170 + rnd() * 85;
      img.data[i] = v; img.data[i + 1] = v * .985; img.data[i + 2] = v * .95; img.data[i + 3] = 255;
    }
    tx.putImageData(img, 0, 0);
    ctx.globalCompositeOperation = "multiply";
    ctx.globalAlpha = .2;
    ctx.fillStyle = ctx.createPattern(tile, "repeat");
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
    // Age-darkened edges
    var ve = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, canvas.width * .42, canvas.width / 2, canvas.height / 2, canvas.width * .68);
    ve.addColorStop(0, "rgba(255,255,255,1)");
    ve.addColorStop(1, "rgba(204,190,164,1)");
    ctx.fillStyle = ve;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "source-over";

    drawBorder(ctx, VIEW.w + 2 * FRAME, VIEW.h + 2 * FRAME, FRAME);
  }

  /* Carved stone border with delerium set into it. Delerium is ornament only;
     none of it appears on the land itself. */
  function chamfer(x0, y0, x1, y1, c) {
    return [[x0 + c, y0], [x1 - c, y0], [x1, y0 + c], [x1, y1 - c], [x1 - c, y1], [x0 + c, y1], [x0, y1 - c], [x0, y0 + c]];
  }

  function hexagon(cx, cy, r) {
    var pts = [];
    for (var i = 0; i < 6; i++) pts.push([cx + Math.cos(i / 6 * 6.283 + .5236) * r, cy + Math.sin(i / 6 * 6.283 + .5236) * r]);
    return pts;
  }

  function drawBorder(ctx, W, H, F) {
    ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    var i, x, y;

    // A shadow the frame throws on the map
    ctx.strokeStyle = "rgba(24,18,28,.42)";
    ctx.lineWidth = 9;
    ctx.strokeRect(F + 2, F + 2, W - 2 * F - 4, H - 2 * F - 4);

    // Weathered stone
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, W, H);
    ctx.rect(F, F, W - 2 * F, H - 2 * F);
    ctx.fillStyle = "#544d59";
    ctx.fill("evenodd");
    ctx.clip("evenodd");
    for (i = 0; i < 240; i++) {
      x = range(0, W); y = range(0, H);
      wash(ctx, x, y, range(12, 46), pick(["rgba(36,30,44,.2)", "rgba(132,124,138,.2)", "rgba(92,74,118,.18)", "rgba(24,20,28,.14)"]));
    }
    ctx.fillStyle = "rgba(20,16,22,.34)";
    for (i = 0; i < 1500; i++) ctx.fillRect(range(0, W), range(0, H), range(.4, 1.5), range(.4, 1));
    ctx.beginPath();
    for (i = 0; i < 90; i++) {
      x = range(0, W); y = range(0, H);
      var ca = range(0, 6.28);
      ctx.moveTo(x, y);
      for (var s = 0; s < 4; s++) { ca += range(-.8, .8); x += Math.cos(ca) * range(4, 11); y += Math.sin(ca) * range(4, 11); ctx.lineTo(x, y); }
    }
    ctx.strokeStyle = "rgba(18,14,20,.6)"; ctx.lineWidth = .75; ctx.stroke();
    ctx.restore();

    // Bevelled edges
    function bevel(inset, dark) {
      ctx.strokeStyle = dark ? INK : "rgba(198,188,206,.38)";
      ctx.lineWidth = dark ? 2.2 : 1;
      ctx.strokeRect(inset, inset, W - 2 * inset, H - 2 * inset);
    }
    bevel(1.2, true); bevel(3.4, false); bevel(F - 3.2, false); bevel(F - 1, true);

    function panel(x0, y0, x1, y1) {
      var p = rough(chamfer(x0, y0, x1, y1, 5), .3);
      trace(ctx, p, true);
      ctx.fillStyle = "rgba(24,18,30,.5)"; ctx.fill();
      ctx.strokeStyle = INK; ctx.lineWidth = 1.1; ctx.stroke();
      trace(ctx, chamfer(x0 + 2.4, y0 + 2.4, x1 - 2.4, y1 - 2.4, 4), true);
      ctx.strokeStyle = "rgba(190,150,236,.3)"; ctx.lineWidth = .7; ctx.stroke();
    }

    var a = F * 1.55, inset = 8.5, mx = W / 2, my = H / 2, gap = F * .85;
    // Top panels flank the title plaque; other sides split around a central gem
    panel(a, inset, mx - 136, F - inset);
    panel(mx + 136, inset, W - a, F - inset);
    panel(a, H - F + inset, mx - gap, H - inset);
    panel(mx + gap, H - F + inset, W - a, H - inset);
    panel(inset, a, F - inset, my - gap);
    panel(inset, my + gap, F - inset, H - a);
    panel(W - F + inset, a, W - inset, my - gap);
    panel(W - F + inset, my + gap, W - inset, H - a);

    // Delerium running through the panels like veins through rock
    function vein(x0, y0, x1, y1) {
      var n = Math.round(Math.hypot(x1 - x0, y1 - y0) / 13), pts = [];
      var horiz = Math.abs(x1 - x0) > Math.abs(y1 - y0);
      for (var v = 0; v <= n; v++) {
        var f = v / n;
        pts.push([x0 + (x1 - x0) * f + (horiz ? 0 : range(-5.5, 5.5)), y0 + (y1 - y0) * f + (horiz ? range(-5.5, 5.5) : 0)]);
      }
      ctx.save();
      ctx.shadowColor = "rgba(176,111,240,.95)";
      ctx.shadowBlur = 2.6 * SCALE;
      trace(ctx, pts);
      ctx.strokeStyle = "rgba(204,162,250,.92)"; ctx.lineWidth = 1.1; ctx.stroke();
      ctx.restore();
    }
    var c = F / 2;
    vein(a + 4, c, a + 150, c); vein(W - a - 4, c, W - a - 150, c);
    vein(a + 4, H - c, a + 118, H - c); vein(W - a - 4, H - c, W - a - 118, H - c);
    vein(c, a + 4, c, a + 104); vein(W - c, a + 4, W - c, a + 104);
    vein(c, H - a - 4, c, H - a - 104); vein(W - c, H - a - 4, W - c, H - a - 104);

    // Set stones
    function mount(cx, cy, r, gem) {
      var hx = hexagon(cx, cy, r);
      withShadow(ctx, function () { trace(ctx, hx, true); ctx.fillStyle = "#3a3341"; ctx.fill(); }, 2.4);
      trace(ctx, hx, true); ctx.strokeStyle = INK; ctx.lineWidth = 1.8; ctx.stroke();
      trace(ctx, hexagon(cx, cy, r - 3.2), true); ctx.strokeStyle = "rgba(198,170,232,.5)"; ctx.lineWidth = .8; ctx.stroke();
      crystal(ctx, cx, cy, gem);
    }
    [[c, c], [W - c, c], [c, H - c], [W - c, H - c]].forEach(function (p) { mount(p[0], p[1], F * .72, F * .36); });
    [[mx, H - c], [c, my], [W - c, my]].forEach(function (p) { mount(p[0], p[1], F * .5, F * .23); });

    // Title plaque
    var plaque = chamfer(mx - 126, 5, mx + 126, F - 5, 7);
    withShadow(ctx, function () { trace(ctx, plaque, true); ctx.fillStyle = "#3a3341"; ctx.fill(); }, 2);
    trace(ctx, plaque, true); ctx.strokeStyle = INK; ctx.lineWidth = 1.8; ctx.stroke();
    trace(ctx, chamfer(mx - 123, 8, mx + 123, F - 8, 5), true);
    ctx.strokeStyle = "rgba(198,170,232,.5)"; ctx.lineWidth = .8; ctx.stroke();
    crystal(ctx, mx - 104, F / 2, 6.5);
    crystal(ctx, mx + 104, F / 2, 6.5);
  }

  /* After dark: the same map, with the lights that are still burning */
  function paintNight(base) {
    var c = document.createElement("canvas");
    c.width = base.width; c.height = base.height;
    c.className = "map-night";
    c.setAttribute("aria-hidden", "true");
    var ctx = c.getContext("2d");
    ctx.drawImage(base, 0, 0);
    ctx.save();
    ctx.beginPath();
    ctx.rect(FRAME * SCALE, FRAME * SCALE, VIEW.w * SCALE, VIEW.h * SCALE);
    ctx.clip();
    ctx.globalCompositeOperation = "multiply";
    ctx.fillStyle = "#2c2a52";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.globalCompositeOperation = "screen";
    ctx.setTransform(SCALE, 0, 0, SCALE, (FRAME - VIEW.x) * SCALE, (FRAME - VIEW.y) * SCALE);
    var amber = "rgba(240,170,84,.8)", gold = "rgba(250,206,110,.85)", fire = "rgba(232,120,52,.75)";
    [[192,150,78,gold],[568,458,60,amber],[612,440,34,amber],[665,362,50,amber],[785,530,48,amber],[468,262,44,gold],[625,172,38,amber],[408,412,16,amber],[340,404,16,fire],
     [484,142,14,amber],[612,258,14,amber],[793,212,14,amber],[743,285,14,amber],[803,335,14,amber],[715,382,14,amber],[352,313,14,amber],[440,482,14,amber],[545,512,14,amber],[624,528,14,amber],[704,466,14,amber],[846,490,14,amber],[610,596,14,amber],
     [660,622,18,fire],[676,642,16,fire],[646,646,14,fire],[770,636,16,fire],[826,640,16,fire],[790,596,14,fire],[752,590,18,amber],[902,74,14,fire],[860,90,20,"rgba(250,214,150,.55)"]
    ].forEach(function (l) { wash(ctx, l[0], l[1], l[2], l[3]); });
    ctx.restore();
    return c;
  }

  /* Emma Crowe's tour. The book says she ends every tour at her father's smithy. */
  var TOUR = [
    ["caravan-court", "This is where Big Odo bought the cheapest rope in the Court. Saved himself four whole silver! It broke on the first wall he tried it on, and the rats had him down to his belt buckle by supper. Da kept the buckle. It's a nice buckle."],
    ["bark-and-buzzard", "Mistress Alsberg makes the best stew in camp, and Sella Rook said so every night for a year. She took a pot of it up to the ruins for the road. They found the pot."],
    ["gilded-lily", "Tam Quillon sang here the night before he went in. Awful voice. Like a goat in a well. Something up in the mist must've liked it, because his crew still hears him sometimes, and he's been dead since harvest."],
    ["skull-and-sword", "You got to say hello to the skull. Hob Fenn never did, but that's not what killed him. He put a stone in his mouth to sneak it past the Lanterns, and it grew out his cheek."],
    ["red-lion", "The Reeve bet forty gold that the Merriday crew would be dead inside a week. They lasted eight days. He was awful put out. He made them a lovely funeral though, to show there's no hard feelings."],
    ["chapel", "Flamekeeper Hanna's real kind. She prayed over Dunstan Ley for three days after he came back with too many teeth. Then he bit her acolyte, so."],
    ["eventide-manor", "Pim Harker stayed a whole night in here on a dare. He came out fine, and he never said one thing about it, not ever, not even for money, and then one day he moved to Elyria. That's the scariest one."],
    ["crowe-and-sons", "And this is my da's forge, and that's the end of the tour. You owe me one gold. If anybody you met today sold you something broken, Da can fix it. He'll say he can't, but he can. Come back and see me after your first trip in! Most people don't, so you'd be special."]
  ];
  var tourAt = -1;
  function showTour(i) {
    tourAt = i;
    var stop = TOUR[i], place = PLACES.filter(function (p) { return p.id === stop[0]; })[0];
    pressPin(place.id);
    noteEl.textContent = "";
    function add(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; n.textContent = text; noteEl.appendChild(n); return n; }
    add("p", "place-note__tag", "Emma Crowe's Tour, Stop " + (i + 1) + " of " + TOUR.length);
    add("h3", null, place.name);
    add("p", "tour-voice", "“" + stop[1] + "”");
    var nav = add("div", "tour-nav", "");
    function btn(label, fn, off) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "ctl"; b.textContent = label; b.disabled = !!off;
      b.addEventListener("click", fn);
      nav.appendChild(b);
    }
    btn("Back", function () { showTour(i - 1); }, i === 0);
    if (i < TOUR.length - 1) btn("Next Stop", function () { showTour(i + 1); });
    btn(i < TOUR.length - 1 ? "Leave Tour" : "Pay Emma", endTour);
    var startBtn = document.querySelector("[data-tour]");
    if (startBtn) startBtn.setAttribute("aria-pressed", "true");
    scrollToNote(false);
  }
  function endTour() {
    var id = TOUR[tourAt] ? TOUR[tourAt][0] : "caravan-court";
    tourAt = -1;
    var startBtn = document.querySelector("[data-tour]");
    if (startBtn) startBtn.setAttribute("aria-pressed", "false");
    select(id, false);
  }

  /* The street, as seen from the mud at dusk */
  function paintStreet(canvas) {
    var W = 1440, H = 300, k = 1.5;
    canvas.width = W * k; canvas.height = H * k;
    var ctx = canvas.getContext("2d");
    ctx.setTransform(k, 0, 0, k, 0, 0);
    ctx.lineCap = "round";
    var sky = ctx.createLinearGradient(0, 0, 0, 230);
    sky.addColorStop(0, "#1b1433"); sky.addColorStop(.55, "#4a3560"); sky.addColorStop(.86, "#a26a4e"); sky.addColorStop(1, "#c98a55");
    ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
    var i, x, y;
    // Dead pines on the rise behind the camp
    ctx.strokeStyle = "#1c1524";
    for (i = 0; i < 70; i++) {
      x = range(0, W); y = 200; var h = range(46, 118), lean = range(-6, 6);
      ctx.lineWidth = range(1.4, 2.8);
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + lean, y - h); ctx.stroke();
      ctx.lineWidth = .9; ctx.beginPath();
      for (var b = .3; b < 1; b += range(.09, .17)) {
        var by = y - h * b, bx = x + lean * b, len = (1.1 - b) * range(10, 22);
        ctx.moveTo(bx, by); ctx.lineTo(bx - len, by + range(-7, 3));
        ctx.moveTo(bx, by); ctx.lineTo(bx + len, by + range(-7, 3));
      }
      ctx.stroke();
    }
    var ROW = [
      [40, 92, 84, 0, ""], [140, 118, 112, 1, "Gainsbury Supply"], [266, 86, 76, 0, ""], [360, 150, 126, 1, "Bark & Buzzard"], [518, 96, 96, 0, ""],
      [622, 170, 146, 1, "The Gilded Lily"], [800, 80, 80, 0, ""], [890, 150, 118, 1, "Skull & Sword"], [1048, 94, 88, 0, ""], [1150, 128, 104, 1, "Crowe & Sons"], [1288, 112, 82, 0, ""]
    ];
    var base = 238;
    ROW.forEach(function (r) {
      var bx = r[0], w = r[1], h = r[2], open = r[3], name = r[4], top = base - h;
      ctx.fillStyle = "#17121f"; ctx.beginPath(); ctx.moveTo(bx + 6, top + 12); ctx.lineTo(bx + w / 2, top - 16); ctx.lineTo(bx + w - 6, top + 12); ctx.closePath(); ctx.fill();
      ctx.fillStyle = open ? "#3a2c33" : "#2e2730";
      ctx.fillRect(bx, top, w, h);
      if (open) { ctx.fillRect(bx + w * .12, top - 14, w * .76, 15); ctx.fillRect(bx + w * .32, top - 24, w * .36, 11); }
      ctx.strokeStyle = "rgba(10,7,14,.55)"; ctx.lineWidth = .9; ctx.beginPath();
      for (y = top + 5; y < base; y += range(5, 7)) { ctx.moveTo(bx, y); ctx.lineTo(bx + w, y + range(-.6, .6)); }
      ctx.stroke();
      ctx.strokeStyle = "#0e0a12"; ctx.lineWidth = 2; ctx.strokeRect(bx, top, w, h);
      var doorW = 20, dx = bx + w / 2 - doorW / 2;
      ctx.fillStyle = "#120d17"; ctx.fillRect(dx, base - 44, doorW, 44);
      [bx + w * .2, bx + w * .8].forEach(function (wx) {
        var wy = base - 58;
        if (open) {
          ctx.save(); ctx.globalCompositeOperation = "screen"; wash(ctx, wx, wy + 11, 40, "rgba(240,160,70,.55)"); ctx.restore();
          ctx.fillStyle = "#efb563"; ctx.fillRect(wx - 9, wy, 18, 22);
          ctx.strokeStyle = "#17121f"; ctx.lineWidth = 1.5; ctx.strokeRect(wx - 9, wy, 18, 22);
          ctx.beginPath(); ctx.moveTo(wx, wy); ctx.lineTo(wx, wy + 22); ctx.moveTo(wx - 9, wy + 11); ctx.lineTo(wx + 9, wy + 11); ctx.stroke();
        } else {
          ctx.fillStyle = "#141018"; ctx.fillRect(wx - 9, wy, 18, 22);
          ctx.strokeStyle = "#6a5a4a"; ctx.lineWidth = 2.6; ctx.beginPath();
          ctx.moveTo(wx - 11, wy + 3); ctx.lineTo(wx + 11, wy + 16); ctx.moveTo(wx + 11, wy + 2); ctx.lineTo(wx - 11, wy + 18); ctx.stroke();
        }
      });
      if (name) {
        ctx.fillStyle = "#d9c7a0";
        var sw = w * .84, sx = bx + (w - sw) / 2, sy = top + 8;
        ctx.fillRect(sx, sy, sw, 25);
        ctx.strokeStyle = "#17121f"; ctx.lineWidth = 2; ctx.strokeRect(sx, sy, sw, 25);
        ctx.fillStyle = "#241a20";
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        var size = 18;
        ctx.font = size + 'px "League Gothic", "Arial Narrow", sans-serif';
        while (ctx.measureText(name).width > sw - 10 && size > 8) { size--; ctx.font = size + 'px "League Gothic", "Arial Narrow", sans-serif'; }
        ctx.fillText(name, bx + w / 2, sy + 13);
      }
    });
    // Mud
    var mud = ctx.createLinearGradient(0, base, 0, H);
    mud.addColorStop(0, "#3a2a24"); mud.addColorStop(1, "#1f1518");
    ctx.fillStyle = mud; ctx.fillRect(0, base, W, H - base);
    ctx.strokeStyle = "rgba(10,6,8,.6)";
    for (i = 0; i < 5; i++) {
      y = base + 10 + i * 11; ctx.lineWidth = range(1.5, 3.2);
      ctx.beginPath(); ctx.moveTo(0, y + range(-3, 3));
      for (x = 80; x <= W + 80; x += 80) ctx.quadraticCurveTo(x - 40, y + range(-6, 6), x, y + range(-3, 3));
      ctx.stroke();
    }
    [[250, 262, 70], [700, 274, 110], [1120, 258, 60]].forEach(function (p) {
      var g = ctx.createRadialGradient(p[0], p[1], 2, p[0], p[1], p[2]);
      g.addColorStop(0, "rgba(232,160,88,.5)"); g.addColorStop(1, "rgba(232,160,88,0)");
      ctx.fillStyle = g; ctx.save(); ctx.translate(p[0], p[1]); ctx.scale(1, .16); ctx.translate(-p[0], -p[1]);
      ctx.beginPath(); ctx.arc(p[0], p[1], p[2], 0, 6.3); ctx.fill(); ctx.restore();
    });
    // A loaded wagon, hitching rail, and lamp post
    ctx.fillStyle = "#120d15"; ctx.strokeStyle = "#120d15";
    ctx.fillRect(452, 226, 118, 28);
    ctx.beginPath(); ctx.moveTo(458, 226); ctx.quadraticCurveTo(510, 170, 562, 226); ctx.closePath(); ctx.fill();
    ctx.lineWidth = 3;
    [[476, 258, 18], [546, 258, 18]].forEach(function (w) {
      ctx.beginPath(); ctx.arc(w[0], w[1], w[2], 0, 6.3); ctx.stroke();
      ctx.beginPath(); for (var a = 0; a < 6; a++) { ctx.moveTo(w[0], w[1]); ctx.lineTo(w[0] + Math.cos(a * 1.05) * w[2], w[1] + Math.sin(a * 1.05) * w[2]); } ctx.stroke();
    });
    ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(570, 246); ctx.lineTo(640, 262); ctx.stroke();
    ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(850, 262); ctx.lineTo(850, 240); ctx.moveTo(960, 262); ctx.lineTo(960, 240); ctx.moveTo(842, 243); ctx.lineTo(968, 243); ctx.stroke();
    ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(1120, 262); ctx.lineTo(1120, 172); ctx.stroke();
    ctx.fillStyle = "#f0bb6b"; ctx.fillRect(1114, 160, 12, 14);
    ctx.save(); ctx.globalCompositeOperation = "screen"; wash(ctx, 1120, 167, 56, "rgba(240,160,70,.7)"); ctx.restore();
    // Torn edge back to the dark page
    ctx.fillStyle = "#0b0916";
    ctx.beginPath(); ctx.moveTo(0, H);
    for (x = 0; x <= W + 30; x += range(20, 48)) ctx.lineTo(x, H - range(4, 20));
    ctx.lineTo(W, H); ctx.closePath(); ctx.fill();
  }

  function drawMap(host) {
    var canvas = document.createElement("canvas");
    canvas.width = (VIEW.w + 2 * FRAME) * SCALE;
    canvas.height = (VIEW.h + 2 * FRAME) * SCALE;
    canvas.className = "map-art";
    canvas.setAttribute("role", "img");
    canvas.setAttribute("aria-label", "Hand-inked map of Emberwood village, with numbered places. The same places are listed in the directory below.");
    host.appendChild(canvas);
    mapCanvas = canvas;
    // Let the words on the page appear first, then ink the map
    setTimeout(function () { seed = 2311; paint(canvas); mapPainted = true; }, 0);

    var svg = svgEl("svg", { viewBox: (VIEW.x - FRAME) + " " + (VIEW.y - FRAME) + " " + (VIEW.w + 2 * FRAME) + " " + (VIEW.h + 2 * FRAME), "class": "map-overlay" });
    var defs = svgEl("defs", {}, svg);
    var grad = svgEl("linearGradient", { id: "shim", x1: "0", y1: "0", x2: "1", y2: "1" }, defs);
    svgEl("stop", { offset: "0", "stop-color": "#66399d" }, grad);
    svgEl("stop", { offset: ".55", "stop-color": "#b06fe0" }, grad);
    svgEl("stop", { offset: "1", "stop-color": "#3f9e94" }, grad);

    [[588, 48, "To Drakkenheim", "start"], [262, 46, "Timberwash", "middle"], [404, 642, "Champion's Way", "end"]].forEach(function (l) {
      svgEl("text", { x: l[0], y: l[1], "text-anchor": l[3], "class": "map-label map-label--edge" }, svg).textContent = l[2];
    });

    svgEl("text", { x: VIEW.x + VIEW.w / 2, y: VIEW.y - FRAME / 2 + 9, "text-anchor": "middle", "class": "map-title" }, svg).textContent = "Emberwood";

    PLACES.forEach(function (p, i) {
      var g = svgEl("g", { "class": "pin", role: "button", tabindex: 0, "aria-label": (i + 1) + ". " + p.name, "aria-pressed": "false", "data-id": p.id, transform: "translate(" + p.pin[0] + " " + p.pin[1] + ")" }, svg);
      svgEl("title", {}, g).textContent = p.name;
      svgEl("circle", { "class": "pin__hit", r: 30 }, g);
      svgEl("circle", { "class": "pin__ring", r: 21 }, g);
      svgEl("circle", { "class": "pin__disc", r: 16 }, g);
      svgEl("text", { "class": "pin__num", y: 6 }, g).textContent = i + 1;
      g.addEventListener("click", function () { select(p.id, true); });
      g.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(p.id, true); }
      });
    });
    host.appendChild(svg);
    mapOverlay = svg;

    // On a phone the pins are drawn larger, so the numbers can be read
    var phone = window.matchMedia("(max-width: 620px)");
    function sizePins() {
      var big = phone.matches;
      svg.querySelectorAll(".pin").forEach(function (g) {
        g.classList.toggle("pin--big", big);
        g.querySelector(".pin__disc").setAttribute("r", big ? 27 : 16);
        g.querySelector(".pin__ring").setAttribute("r", big ? 32 : 21);
        g.querySelector(".pin__num").setAttribute("y", big ? 11 : 6);
      });
    }
    sizePins();
    if (phone.addEventListener) phone.addEventListener("change", sizePins);

    // A tap that lands near a pin counts as a tap on it: a thumb-sized target around every number
    svg.addEventListener("click", function (e) {
      if (e.target.closest(".pin")) return;
      var m = svg.getScreenCTM();
      if (!m) return;
      var pt = svg.createSVGPoint();
      pt.x = e.clientX; pt.y = e.clientY;
      pt = pt.matrixTransform(m.inverse());
      var reach = Math.max(34, 26 / m.a), best = null, bestD = reach * reach;
      PLACES.forEach(function (p) {
        var dx = p.pin[0] - pt.x, dy = p.pin[1] - pt.y, d = dx * dx + dy * dy;
        if (d < bestD) { best = p; bestD = d; }
      });
      if (best) select(best.id, true);
    });

    // The pins beckon a few times on a reader's first visit
    var seen = false;
    try { seen = sessionStorage.getItem("courier-pins") === "1"; sessionStorage.setItem("courier-pins", "1"); } catch (e) { /* private window */ }
    if (!seen) svg.querySelectorAll(".pin").forEach(function (g) { g.classList.add("pin--hint"); });
  }

  /* The directory is written into the page. This only makes its entries open the matching note. */
  function hookDirectory(host) {
    host.querySelectorAll("button[data-id]").forEach(function (b) {
      b.addEventListener("click", function () { select(b.getAttribute("data-id"), true); scrollToNote(true); });
    });
  }

  var noteEl = document.querySelector("[data-note]");

  function scrollToNote(fromDirectory) {
    var narrow = window.matchMedia("(max-width: 960px)").matches;
    if (!narrow && !fromDirectory) return;
    var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var target = narrow ? noteEl : document.querySelector("[data-map]");
    target.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: narrow ? "center" : "start" });
  }

  function renderNote(p) {
    noteEl.textContent = "";
    function add(tag, cls, text) {
      var n = document.createElement(tag);
      if (cls) n.className = cls;
      n.textContent = text;
      noteEl.appendChild(n);
      return n;
    }
    add("p", "place-note__tag", p.tag);
    add("h3", null, p.name);
    add("p", null, p.text);
    var who = add("p", "place-note__who", "");
    var b = document.createElement("b");
    b.textContent = "Look for: ";
    who.appendChild(b);
    who.appendChild(document.createTextNode(p.who + "."));
    if (isNight) {
      var night = add("p", "place-note__night", "");
      var nb = document.createElement("b");
      nb.textContent = "After dark: ";
      night.appendChild(nb);
      night.appendChild(document.createTextNode(p.night));
    }
  }

  var isNight = false, currentId = "caravan-court";
  function pressPin(id) {
    document.querySelectorAll(".pin[data-id], .directory button[data-id]").forEach(function (n) {
      n.setAttribute("aria-pressed", n.getAttribute("data-id") === id ? "true" : "false");
    });
  }

  function select(id, userAction) {
    var place = PLACES.filter(function (p) { return p.id === id; })[0];
    if (!place) return;
    currentId = id;
    if (tourAt >= 0) { tourAt = -1; var t = document.querySelector("[data-tour]"); if (t) t.setAttribute("aria-pressed", "false"); }
    renderNote(place);
    pressPin(id);
    if (userAction) {
      try { history.replaceState(null, "", "#" + id); } catch (e) { /* local preview */ }
      scrollToNote(false);
    }
  }

  var mapCanvas = null, mapOverlay = null, mapPainted = false, nightCanvas = null;
  drawMap(document.querySelector("[data-map]"));
  hookDirectory(document.querySelector("[data-directory]"));
  select(location.hash.slice(1) || "caravan-court", false);

  // The place notes only show on a tap, so tell the reading-time counter how many words they hold
  document.body.setAttribute("data-extra-words", PLACES.reduce(function (n, p) { return n + (p.text + " " + p.who).split(/\s+/).length; }, 0));

  var nightBtn = document.querySelector("[data-night]");
  if (nightBtn) nightBtn.addEventListener("click", function () {
    if (!mapPainted) return;
    isNight = !isNight;
    nightBtn.setAttribute("aria-pressed", isNight ? "true" : "false");
    nightBtn.textContent = isNight ? "Back to Daylight" : "After Dark";
    // The night view is only drawn the first time somebody asks for it
    if (isNight && !nightCanvas) {
      nightCanvas = paintNight(mapCanvas);
      mapOverlay.parentNode.insertBefore(nightCanvas, mapOverlay);
      void nightCanvas.offsetWidth;
    }
    document.querySelector("[data-map]").classList.toggle("is-night", isNight);
    if (tourAt < 0) select(currentId, false);
  });
  var tourBtn = document.querySelector("[data-tour]");
  if (tourBtn) tourBtn.addEventListener("click", function () { if (tourAt >= 0) endTour(); else showTour(0); });

  var street = document.querySelector("[data-street]");
  if (street) {
    var drawStreet = function () { seed = 907; paintStreet(street); };
    if (document.fonts && document.fonts.load) document.fonts.load('18px "League Gothic"').then(drawStreet, drawStreet);
    else drawStreet();
  }
})();
