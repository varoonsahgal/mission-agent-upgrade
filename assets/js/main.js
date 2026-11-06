/* ==========================================================================
   MISSION: AGENT UPGRADE — site runtime
   starfield · reveal · countdown · progress · copy · lightbox · toc · confetti
   + interactive missions (tool-fit game, decision junction, red team, pitch)
   ========================================================================== */
(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };

  /* ---------- mission registry ---------- */
  var MISSIONS = [
    { n: 1, t: "Agent Builder vs. Copilot Studio: The Upgrade", s: "The Upgrade", c: "#ff6b2c", i: "rocket" },
    { n: 2, t: "Inside Copilot Studio: Design Your Solution", s: "Blueprint", c: "#22d3ee", i: "layers" },
    { n: 3, t: "Workflow Power: From Talk to Action", s: "Workflow", c: "#a78bfa", i: "flow" },
    { n: 4, t: "Decision Junction: Make It Smarter", s: "Junction", c: "#fbbf24", i: "diamond" },
    { n: 5, t: "Mission Checkpoint", s: "Checkpoint", c: "#34d399", i: "flag" },
    { n: 6, t: "Connect the Dots: Enterprise Integrations", s: "Connect", c: "#38bdf8", i: "link" },
    { n: 7, t: "Human in the Loop: Smart Automation", s: "Human Loop", c: "#f472b6", i: "human" },
    { n: 8, t: "Break the Agent! Security & Governance", s: "Break It", c: "#f87171", i: "shield" },
    { n: 9, t: "Mission Control: Test & Troubleshoot", s: "Telemetry", c: "#a3e635", i: "pulse" },
    { n: 10, t: "Final Mission: The Agent Showcase", s: "Showcase", c: "#facc15", i: "star" }
  ];
  var ICONS = {
    rocket: "M12 2.5c3.2 2.2 5 6 5 9.8l-1.8 3.7H8.8L7 12.3C7 8.5 8.8 4.7 12 2.5zM12 8.6a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8zM8.8 16l-2.3 4.2 3.4-1.2M15.2 16l2.3 4.2-3.4-1.2M12 17.5v3.5",
    layers: "M12 3l9 4.8-9 4.8-9-4.8L12 3zM3 12.2l9 4.8 9-4.8M3 16.4l9 4.8 9-4.8",
    flow: "M3.5 4.5h6v5h-6zM14.5 14.5h6v5h-6zM14.5 4.5h6v5h-6zM9.5 7h5M17.5 9.5v5M6.5 9.5v5.5a2 2 0 0 0 2 2h6",
    diamond: "M12 2.8l9.2 9.2-9.2 9.2L2.8 12 12 2.8zM12 7.5v5.5M12 16.2v.3",
    flag: "M5 21.5V3.5M5 4h12.5l-2.6 4.3 2.6 4.3H5",
    link: "M9.5 14.5l5-5M10.6 6.2l1.3-1.3a4.3 4.3 0 0 1 6.1 6.1l-1.3 1.3M13.4 17.8l-1.3 1.3A4.3 4.3 0 0 1 6 13l1.3-1.3",
    human: "M12 11.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 21c0-4 3.4-6.5 7.5-6.5s7.5 2.5 7.5 6.5M15.5 18.5l1.8 1.8 3.2-3.4",
    shield: "M12 2.8l8 3.1v6c0 5-3.4 8.3-8 9.3-4.6-1-8-4.3-8-9.3v-6l8-3.1zM12.8 7l-2.6 5h3.6l-2.6 5",
    pulse: "M2.5 12.5h4.2l2.8-7 4.6 14 2.9-7h4.5",
    star: "M12 2.8l2.7 5.6 6.1.8-4.5 4.2 1.2 6.1L12 16.6l-5.5 2.9 1.2-6.1L3.2 9.2l6.1-.8L12 2.8z"
  };
  var pid = 0;
  function patch(n, opts) {
    opts = opts || {};
    var m = MISSIONS[n - 1]; if (!m) return "";
    var id = "p" + n + "_" + (++pid), c = m.c, nn = (n < 10 ? "0" : "") + n;
    var stars = "";
    var pos = [[22, 40], [98, 42], [30, 88], [90, 86], [60, 18], [60, 103]];
    pos.forEach(function (p, k) { if (k < 4) stars += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="1" fill="#fff" opacity=".7"/>'; });
    return '<svg viewBox="0 0 120 120" role="img" aria-label="Mission ' + nn + ' patch: ' + m.s + '" xmlns="http://www.w3.org/2000/svg">' +
      '<defs><radialGradient id="g' + id + '" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="' + c + '" stop-opacity=".55"/><stop offset=".55" stop-color="#0b1034"/><stop offset="1" stop-color="#05071c"/></radialGradient>' +
      '<path id="t' + id + '" d="M60 60m-45 0a45 45 0 1 1 90 0"/><path id="b' + id + '" d="M60 60m-49 0a49 49 0 1 0 98 0"/></defs>' +
      '<circle cx="60" cy="60" r="58" fill="#05071c" stroke="' + c + '" stroke-width="2.5"/>' +
      '<circle cx="60" cy="60" r="53" fill="url(#g' + id + ')" stroke="' + c + '" stroke-opacity=".35" stroke-width="1"/>' +
      '<circle cx="60" cy="60" r="36" fill="none" stroke="' + c + '" stroke-opacity=".5" stroke-width="1" stroke-dasharray="2 3"/>' +
      '<text font-family="JetBrains Mono,monospace" font-size="8.2" letter-spacing="2.2" fill="#fff" font-weight="600"><textPath href="#t' + id + '" startOffset="50%" text-anchor="middle">MISSION ' + nn + '</textPath></text>' +
      '<text font-family="JetBrains Mono,monospace" font-size="6.6" letter-spacing="1.6" fill="' + c + '"><textPath href="#b' + id + '" startOffset="50%" text-anchor="middle">' + m.s.toUpperCase() + '</textPath></text>' +
      stars +
      '<g transform="translate(39 37) scale(1.75)" fill="none" stroke="' + c + '" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="' + ICONS[m.i] + '" style="filter:drop-shadow(0 0 3px ' + c + ')"/></g>' +
      '<circle cx="60" cy="60" r="58" fill="none" stroke="#fff" stroke-opacity=".08" stroke-width="6"/>' +
      '</svg>';
  }
  window.MAU = { patch: patch, missions: MISSIONS };
  $$("[data-patch]").forEach(function (el) { el.innerHTML = patch(+el.getAttribute("data-patch")); });

  /* ---------- starfield ---------- */
  (function () {
    var cv = $("#stars"); if (!cv) return;
    var ctx = cv.getContext("2d"), W, H, DPR = Math.min(window.devicePixelRatio || 1, 2), stars = [], shoot = null, sy = 0;
    function init() {
      W = cv.width = innerWidth * DPR; H = cv.height = innerHeight * DPR;
      cv.style.width = innerWidth + "px"; cv.style.height = innerHeight + "px";
      var n = Math.min(420, Math.floor(innerWidth * innerHeight / 4200));
      stars = [];
      for (var i = 0; i < n; i++) stars.push({ x: Math.random() * W, y: Math.random() * H, r: (Math.random() * 1.2 + .25) * DPR, z: Math.random() * .8 + .2, p: Math.random() * 6.28, hue: Math.random() < .12 ? (Math.random() < .5 ? "255,190,160" : "170,220,255") : "255,255,255" });
    }
    function frame(t) {
      ctx.clearRect(0, 0, W, H);
      var off = sy * DPR;
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        var y = (s.y - off * s.z * .25) % H; if (y < 0) y += H;
        var a = reduce ? .7 * s.z : (.35 + .65 * Math.abs(Math.sin(t / 1400 * s.z + s.p))) * s.z;
        ctx.beginPath(); ctx.fillStyle = "rgba(" + s.hue + "," + a.toFixed(3) + ")"; ctx.arc(s.x, y, s.r, 0, 6.283); ctx.fill();
      }
      if (!reduce) {
        if (!shoot && Math.random() < .004) shoot = { x: Math.random() * W * .7 + W * .2, y: Math.random() * H * .4, l: 0 };
        if (shoot) {
          shoot.l += 1;
          var len = 140 * DPR, k = shoot.l * 14 * DPR, x = shoot.x - k, y2 = shoot.y + k * .45;
          var g = ctx.createLinearGradient(x, y2, x + len, y2 - len * .45);
          g.addColorStop(0, "rgba(255,255,255,.9)"); g.addColorStop(1, "rgba(255,255,255,0)");
          ctx.strokeStyle = g; ctx.lineWidth = 1.4 * DPR; ctx.beginPath(); ctx.moveTo(x, y2); ctx.lineTo(x + len, y2 - len * .45); ctx.stroke();
          if (shoot.l > 40) shoot = null;
        }
        requestAnimationFrame(frame);
      }
    }
    init(); addEventListener("resize", init);
    addEventListener("scroll", function () { sy = scrollY; if (reduce) frame(0); }, { passive: true });
    requestAnimationFrame(frame);
  })();

  /* ---------- nav ---------- */
  var mb = $(".menu-btn");
  if (mb) mb.addEventListener("click", function () { var n = $(".nav"); var o = n.classList.toggle("open"); mb.setAttribute("aria-expanded", o); });
  (function clock() {
    var el = $("#met"); if (!el) return;
    function tick() {
      try { el.textContent = new Date().toLocaleTimeString("en-US", { timeZone: "America/New_York", hour12: false }) + " ET"; } catch (e) { el.textContent = new Date().toTimeString().slice(0, 8); }
    }
    tick(); setInterval(tick, 1000);
  })();

  /* ---------- reveal ---------- */
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { rootMargin: "0px 0px -8% 0px", threshold: .05 });
    $$(".rv").forEach(function (el) { io.observe(el); });
  } else { $$(".rv").forEach(function (el) { el.classList.add("in"); }); }

  /* ---------- countdown ---------- */
  (function () {
    var cd = $(".countdown"); if (!cd) return;
    var target = Date.UTC(2026, 11, 15, 15, 0, 0); // Dec 15 2026 10:00 ET (EST = UTC-5)
    var end = Date.UTC(2026, 11, 16, 20, 0, 0);
    var u = { d: $("[data-u=d]", cd), h: $("[data-u=h]", cd), m: $("[data-u=m]", cd), s: $("[data-u=s]", cd) };
    function pad(x) { return (x < 10 ? "0" : "") + x; }
    function tick() {
      var now = Date.now(), diff = target - now;
      if (diff <= 0) {
        cd.classList.add("launched");
        var lbl = $(".tminus", cd); if (lbl) lbl.textContent = now < end ? "IN FLIGHT" : "MISSION ACCOMPLISHED";
        diff = Math.max(0, now < end ? now - target : 0);
      }
      var s = Math.floor(diff / 1000);
      u.d.textContent = pad(Math.floor(s / 86400)); u.h.textContent = pad(Math.floor(s % 86400 / 3600));
      u.m.textContent = pad(Math.floor(s % 3600 / 60)); u.s.textContent = pad(s % 60);
    }
    tick(); setInterval(tick, 1000);
  })();

  /* ---------- progress ---------- */
  var PKEY = "mau.progress.v1";
  function getP() { return store.get(PKEY, []); }
  function setP(a) { store.set(PKEY, a); renderProgress(); }
  function renderProgress() {
    var p = getP(), pct = Math.round(p.length / 10 * 100);
    $$("[data-progress-pct]").forEach(function (el) { el.textContent = pct; });
    $$("[data-progress-count]").forEach(function (el) { el.textContent = p.length; });
    $$("[data-progress-bar]").forEach(function (el) { el.style.width = pct + "%"; });
    $$("[data-mission-link]").forEach(function (el) {
      var n = +el.getAttribute("data-mission-link"), d = p.indexOf(n) > -1;
      el.classList.toggle("done", d);
      var st = $(".state", el); if (st) st.textContent = d ? "● MISSION COMPLETE" : "○ AWAITING LAUNCH";
    });
    var b = $(".complete-btn");
    if (b) {
      var me = +document.body.getAttribute("data-mission"), done = p.indexOf(me) > -1;
      b.classList.toggle("done", done);
      b.textContent = done ? "✓ Mission complete" : "🚀 Mark mission complete";
      var st2 = $(".complete-row .status"); if (st2) st2.textContent = done ? "LOGGED TO MISSION LOG · " + p.length + "/10" : "MISSION LOG · " + p.length + "/10 COMPLETE";
    }
  }
  var cb = $(".complete-btn");
  if (cb) cb.addEventListener("click", function () {
    var me = +document.body.getAttribute("data-mission"), p = getP(), i = p.indexOf(me);
    if (i > -1) { p.splice(i, 1); setP(p); return; }
    p.push(me); p.sort(function (a, b) { return a - b; }); setP(p);
    celebrate(p.length === 10 ? "ALL MISSIONS COMPLETE" : "MISSION " + (me < 10 ? "0" : "") + me + " COMPLETE", p.length === 10 ? "AGENT FULLY UPGRADED 🚀" : p.length + " OF 10 LOGGED");
  });
  var rb = $("[data-reset-progress]");
  if (rb) rb.addEventListener("click", function () { if (confirm("Reset your mission log on this device?")) { setP([]); } });
  renderProgress();

  /* ---------- confetti / launch ---------- */
  function celebrate(msg, sub) {
    var ov = document.createElement("div"); ov.className = "launch";
    ov.innerHTML = '<div class="msg">' + msg + "<small>" + sub + "</small></div>";
    document.body.appendChild(ov);
    requestAnimationFrame(function () { ov.classList.add("show"); });
    setTimeout(function () { ov.classList.remove("show"); setTimeout(function () { ov.remove(); }, 600); }, 2200);
    if (reduce) return;
    var cv = document.createElement("canvas"); cv.id = "confetti"; document.body.appendChild(cv);
    var ctx = cv.getContext("2d"), W = cv.width = innerWidth, H = cv.height = innerHeight, parts = [];
    var cols = ["#ff6b2c", "#22d3ee", "#8b5cf6", "#34d399", "#fbbf24", "#f472b6", "#ffffff"];
    for (var i = 0; i < 220; i++) parts.push({ x: W / 2 + (Math.random() - .5) * 120, y: H * .65, vx: (Math.random() - .5) * 16, vy: -Math.random() * 18 - 6, s: Math.random() * 7 + 3, r: Math.random() * 6.28, vr: (Math.random() - .5) * .3, c: cols[i % cols.length], a: 1 });
    var t0 = performance.now();
    (function f(t) {
      ctx.clearRect(0, 0, W, H);
      parts.forEach(function (p) {
        p.vy += .42; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.a -= .006;
        ctx.save(); ctx.globalAlpha = Math.max(0, p.a); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); ctx.restore();
      });
      if (t - t0 < 3200) requestAnimationFrame(f); else cv.remove();
    })(t0);
  }
  window.MAU.celebrate = celebrate;

  /* ---------- copy buttons ---------- */
  function addCopy(host, getText) {
    var b = document.createElement("button"); b.type = "button"; b.className = "copy-btn"; b.textContent = "Copy";
    b.setAttribute("aria-label", "Copy to clipboard");
    b.addEventListener("click", function (e) {
      e.stopPropagation();
      var txt = getText();
      var done = function () { b.textContent = "Copied ✓"; b.classList.add("ok"); setTimeout(function () { b.textContent = "Copy"; b.classList.remove("ok"); }, 1600); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, fallback); else fallback();
      function fallback() { var ta = document.createElement("textarea"); ta.value = txt; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch (x) {} ta.remove(); done(); }
    });
    host.appendChild(b);
  }
  $$("pre.copy").forEach(function (pre) { if (!pre.getAttribute("data-lang")) pre.setAttribute("data-lang", "copy"); var code = $("code", pre) || pre; addCopy(pre, function () { return code.innerText.replace(/\n$/, ""); }); });
  $$(".prompt").forEach(function (p) { var text = p.innerText.trim(); addCopy(p, function () { return text; }); });

  /* ---------- screenshots: bezel + lightbox ---------- */
  var lb = document.createElement("div"); lb.className = "lightbox"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true"); lb.setAttribute("aria-label", "Screenshot viewer");
  lb.innerHTML = '<button class="x" aria-label="Close">×</button><img alt=""><div class="cap"></div>';
  document.body.appendChild(lb);
  function closeLb() { lb.classList.remove("open"); }
  lb.addEventListener("click", closeLb);
  addEventListener("keydown", function (e) { if (e.key === "Escape") closeLb(); });
  $$("figure.shot").forEach(function (fig) {
    var img = $("img", fig); if (!img) return;
    var bz = img.closest(".bezel");
    if (!bz) { bz = document.createElement("div"); bz.className = "bezel"; img.parentNode.insertBefore(bz, img); bz.appendChild(img); }
    bz.setAttribute("data-label", fig.getAttribute("data-label") || "copilotstudio.microsoft.com");
    var z = document.createElement("span"); z.className = "zoom"; z.textContent = "⤢ ENLARGE"; bz.appendChild(z);
    bz.setAttribute("tabindex", "0"); bz.setAttribute("role", "button"); bz.setAttribute("aria-label", "Enlarge screenshot: " + (img.alt || ""));
    function open() { $("img", lb).src = img.currentSrc || img.src; $("img", lb).alt = img.alt; var fc = $("figcaption", fig); $(".cap", lb).textContent = fc ? fc.textContent : img.alt; lb.classList.add("open"); $(".x", lb).focus(); }
    bz.addEventListener("click", open);
    bz.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
  });

  /* ---------- checkpoints ---------- */
  $$(".checkpoint").forEach(function (cp, ci) {
    var boxes = $$("input[type=checkbox]", cp), key = "mau.cp." + location.pathname.split("/").pop() + "." + ci;
    var saved = store.get(key, []);
    var meter = document.createElement("div"); meter.className = "cp-meter"; cp.appendChild(meter);
    function upd() {
      var on = boxes.filter(function (b) { return b.checked; }).length;
      meter.textContent = "TELEMETRY " + on + "/" + boxes.length + (on === boxes.length ? " · ALL SYSTEMS GO ✓" : "");
      boxes.forEach(function (b) { b.parentNode.classList.toggle("on", b.checked); });
    }
    boxes.forEach(function (b, i) { b.checked = !!saved[i]; b.addEventListener("change", function () { store.set(key, boxes.map(function (x) { return x.checked; })); upd(); }); });
    upd();
  });

  /* ---------- TOC ---------- */
  (function () {
    var toc = $(".toc ol"); if (!toc) return;
    var heads = $$(".prose h2, .prose h3.toc-include");
    heads.forEach(function (h) {
      if (!h.id) h.id = (h.textContent || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48);
      var li = document.createElement("li"); if (h.tagName === "H3") li.className = "sub";
      var a = document.createElement("a"); a.href = "#" + h.id;
      var clone = h.cloneNode(true); $$(".tag", clone).forEach(function (t) { t.remove(); });
      a.textContent = clone.textContent.trim(); li.appendChild(a); toc.appendChild(li);
    });
    var links = $$("a", toc);
    function spy() {
      var y = scrollY + 140, cur = null;
      heads.forEach(function (h, i) { if (h.getBoundingClientRect().top + scrollY <= y) cur = i; });
      links.forEach(function (l, i) { l.classList.toggle("active", i === cur); });
    }
    addEventListener("scroll", spy, { passive: true }); spy();
  })();

  /* ---------- m01: which tool fits? ---------- */
  (function () {
    var host = $("#toolgame"); if (!host) return;
    var Q = [
      { q: "Maya on the Digital Content team wants a personal assistant that summarizes the weekly app-release notes she keeps in a SharePoint folder and drafts a Teams update.", who: "Personal productivity · Knowledge Q&A", a: "ab", why: "One person, read-only knowledge, output stays in Microsoft 365. Agent Builder handles this in minutes: instructions + a SharePoint knowledge source. No workflow, connector, or governance surface needed." },
      { q: "When a member-facing outage is reported, an agent must check the Digital Issue Register, create a new record if none exists, and notify the on-call channel.", who: "Business process · Writes to a system", a: "cs", why: "This takes actions (create a record, post a notification), needs decision logic (duplicate check), and connectors. That is Copilot Studio territory: tools, agent flows, and conditions." },
      { q: "The QA lead wants an agent that answers questions about the team's test-case style guide, used only by the 6 people on her squad.", who: "Small team · Read-only knowledge", a: "ab", why: "Answering questions from a single approved document for a small team is the sweet spot for Agent Builder. Upgrade later if it needs to act." },
      { q: "Any request to reset a member's sign-in verification (MFA) must stop and wait for a human Member Services specialist to approve it.", who: "Sensitive action · Human approval", a: "cs", why: "Approval gates, escalation paths, and failure handling require an agent flow with an approval step. Agent Builder cannot pause a process for human authorization." },
      { q: "Every morning at 7:00 ET, an agent should scan overnight alerts, open a Sev 2 record for anything that crosses the threshold, and post a digest — with no one chatting to it.", who: "Autonomous · Scheduled trigger", a: "cs", why: "Event and schedule triggers (autonomous agents) are Copilot Studio capabilities. Agent Builder agents only respond when someone talks to them." },
      { q: "A product owner wants to brainstorm names and taglines for the new card-controls feature with an agent that uses the brand voice guide.", who: "Creative · Personal", a: "ab", why: "Creative drafting grounded in one guideline document, used by one person, with no system writes: Agent Builder is faster and good enough." },
      { q: "The mobile team wants an agent published to the public Contoso website so members can check whether there is a known issue with mobile check deposit.", who: "External channel · Members", a: "cs", why: "Publishing to a public website or other external channels, with authentication choices and analytics, requires Copilot Studio. Agent Builder agents live inside Microsoft 365 Copilot." },
      { q: "Digital Ops wants usage analytics, evaluation test sets, and solution-based ALM (dev → test → prod) for a triage agent before rolling it out to 300 employees.", who: "Enterprise lifecycle · Governance", a: "cs", why: "Evaluation, monitoring, analytics, environments, and solutions for ALM are part of Copilot Studio's enterprise toolset." },
      { q: "A new hire wants an agent that answers 'Where do I find…?' questions using the team's onboarding OneNote and wiki pages.", who: "Personal · Onboarding", a: "ab", why: "Lightweight Q&A over existing Microsoft 365 content is a classic Agent Builder scenario. Start simple and upgrade if the agent needs to take actions." },
      { q: "An agent must look up a QuickPay transfer status in an internal REST API that has no Microsoft 365 connector.", who: "Custom integration · API", a: "cs", why: "Calling a custom API (through a custom connector, an HTTP request in a flow, or a REST API tool) is a Copilot Studio capability." }
    ];
    var i = 0, score = 0, res = [];
    function render() {
      if (i >= Q.length) return end();
      var x = Q[i];
      host.innerHTML =
        '<div class="game-top"><span class="k">Scenario ' + (i + 1) + " / " + Q.length + '</span><span class="game-score">SCORE <b>' + score + "</b></span></div>" +
        '<div class="game-progress">' + Q.map(function (_, k) { return '<i class="' + (k < i ? (res[k] ? "ok" : "bad") : k === i ? "cur" : "") + '"></i>'; }).join("") + "</div>" +
        '<div class="scenario">' + x.q + '</div><div class="scenario-who">▸ ' + x.who + "</div>" +
        '<div class="choices"><button class="choice ab" data-a="ab"><span class="ic">🧩</span><span><b>Agent Builder</b><small>Microsoft 365 Copilot · fast and lightweight</small></span></button>' +
        '<button class="choice cs" data-a="cs"><span class="ic">🚀</span><span><b>Copilot Studio</b><small>Workflows · connectors · governance</small></span></button></div>' +
        '<div class="feedback" role="status" aria-live="polite"></div><button class="btn primary game-next">Next scenario <span class="arrow">→</span></button>';
      $$(".choice", host).forEach(function (b) {
        b.addEventListener("click", function () {
          var ok = b.getAttribute("data-a") === x.a; res[i] = ok; if (ok) score++;
          $$(".choice", host).forEach(function (c) { c.disabled = true; if (c.getAttribute("data-a") === x.a) c.classList.add("right"); else if (c === b) c.classList.add("wrong"); });
          var fb = $(".feedback", host); fb.className = "feedback show " + (ok ? "ok" : "no");
          fb.innerHTML = "<b>" + (ok ? "✓ CORRECT CALL" : "✗ RECALCULATE TRAJECTORY") + "</b><p>" + x.why + "</p>";
          $(".game-score b", host).textContent = score;
          var nx = $(".game-next", host); nx.classList.add("show"); nx.focus();
          nx.onclick = function () { i++; render(); };
        });
      });
    }
    function end() {
      var r = score >= 9 ? "Flight Director" : score >= 7 ? "Mission Specialist" : score >= 5 ? "Flight Engineer" : "Cadet — review the matrix";
      host.innerHTML = '<div class="game-end"><div class="k mono" style="color:var(--muted);letter-spacing:.2em;font-size:.75rem">DEBRIEF</div><div class="big">' + score + "<span style=\"color:var(--muted);font-size:2rem\">/" + Q.length + '</span></div><div class="rank">Rank: ' + r + '</div><p>The pattern: <strong>talking to knowledge</strong> → Agent Builder. <strong>Acting on systems, branching logic, approvals, triggers, external channels, or lifecycle governance</strong> → Copilot Studio.</p><button class="btn" id="gameAgain">↻ Run the simulation again</button></div>';
      $("#gameAgain").onclick = function () { i = 0; score = 0; res = []; render(); };
      if (score >= 8 && window.MAU.celebrate) window.MAU.celebrate("TRAJECTORY CONFIRMED", score + "/" + Q.length + " · " + r.toUpperCase());
    }
    render();
  })();

  /* ---------- m04: decision junction ---------- */
  (function () {
    var host = $("#junction"); if (!host) return;
    var T = {
      start: { k: "Incoming report", h: "A Digital employee reports: “Members say QuickPay transfers are stuck in Pending.”", p: "Mission Control receives the message. What does the agent check first?", o: [["Are all required details present?", "complete"], ["Create a ticket right away", "rash"]] },
      rash: { end: true, c: "#f87171", k: "Anomaly · Premature action", h: "The agent creates a record with half the facts", p: "Creating a record before validating inputs leads to junk data and duplicates. Always validate first: service, symptom, error code, members affected, platform, and first observed time." , o: [["↺ Rewind", "start"]] },
      complete: { k: "Validation gate", h: "Required details check", p: "The report names the service (P2P) and the symptom, but not how many members are affected or the error code.", o: [["Details are complete", "known"], ["Details are missing", "incomplete"]] },
      incomplete: { end: true, c: "#fbbf24", k: "Branch C · Incomplete", h: "Collect more details before acting", p: "Use Question nodes to ask for the missing fields (members affected, error code, platform). Re-check them with a Condition. The playbook rule: if the number affected is unknown, treat the issue as one severity level higher until it's confirmed.", o: [["→ Details collected, continue", "known"], ["↺ Start over", "start"]] },
      known: { k: "Lookup", h: "Does it match a known issue?", p: "The agent searches the playbook and the Digital Issue Register. DSI-1042 “QuickPay transfers pending over 30 min” is Investigating.", o: [["Match found", "matchsev"], ["No match", "unknown"]] },
      matchsev: { k: "Risk gate", h: "Any risk to member funds or data?", p: "One reporter mentions a member who was debited twice.", o: [["No, just pending", "knownend"], ["Yes, possible double debit", "sensitive"]] },
      knownend: { end: true, c: "#34d399", k: "Branch A · Known issue", h: "Share the guidance and link DSI-1042", p: "Respond with the approved guidance (“Do not resend; pending transfers complete or reverse within 1 business day”) and reference the existing Issue ID. Do NOT create a duplicate record.", o: [["↺ Try another path", "start"]] },
      unknown: { k: "Classify", h: "New issue: what's the severity?", p: "There's no existing record. Use the severity matrix to classify the issue.", o: [["Sev 2–4", "unknownend"], ["Sev 1 or funds/data risk", "sensitive"]] },
      unknownend: { end: true, c: "#22d3ee", k: "Branch B · Unknown issue", h: "Create a new register record (status “New”)", p: "Call the triage workflow to create the record, then return the new Issue ID to the user. Only report success when the system confirms it with a returned ID.", o: [["↺ Try another path", "start"]] },
      sensitive: { end: true, c: "#f472b6", k: "Branch D · Sensitive / Sev 1", h: "Stop. Escalate to a human approver.", p: "Funds or data risk means the agent must not act alone. Trigger the approval flow, notify Digital Ops on-call, and tell the user that the issue was escalated, not that it was resolved. (This is the Human Approval Gate you'll build in Mission 07.)", o: [["↺ Try another path", "start"]] }
    };
    var trail = [];
    function go(key) {
      var n = T[key];
      if (key === "start") trail = [];
      trail.push(n.k);
      host.innerHTML = '<div class="j-trail">' + trail.map(function (t) { return "<span>" + t + "</span>"; }).join("<span style=\"border:0;background:none\">→</span>") + "</div>" +
        '<div class="j-node ' + (n.end ? "j-end" : "") + '" style="' + (n.end ? "--c:" + n.c : "") + '"><div class="k">' + n.k + "</div><h4>" + n.h + "</h4><p>" + n.p + '</p><div class="j-opts">' +
        n.o.map(function (o) { return '<button class="j-opt" data-go="' + o[1] + '">' + o[0] + "</button>"; }).join("") + "</div></div>";
      $$(".j-opt", host).forEach(function (b) { b.addEventListener("click", function () { go(b.getAttribute("data-go")); }); });
    }
    go("start");
  })();

  /* ---------- m08: red team cards ---------- */
  $$(".rt-card").forEach(function (c) {
    c.setAttribute("tabindex", "0"); c.setAttribute("role", "button"); c.setAttribute("aria-pressed", "false");
    function flip() { var f = c.classList.toggle("flipped"); c.setAttribute("aria-pressed", f); }
    c.addEventListener("click", flip);
    c.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); } });
  });

  /* ---------- m10: pitch builder + scorecard ---------- */
  (function () {
    var form = $("#pitchForm"); if (!form) return;
    var KEY = "mau.pitch";
    var saved = store.get(KEY, {});
    $$("[data-field]", form).forEach(function (f) {
      var k = f.getAttribute("data-field"); if (saved[k]) f.value = saved[k];
      f.addEventListener("input", upd);
    });
    function upd() {
      var d = {};
      $$("[data-field]", form).forEach(function (f) { d[f.getAttribute("data-field")] = f.value; });
      store.set(KEY, d);
      $$("[data-out]").forEach(function (o) { var v = d[o.getAttribute("data-out")]; o.textContent = v && v.trim() ? v : o.getAttribute("data-ph"); o.style.opacity = v && v.trim() ? 1 : .5; });
    }
    upd();
    var cp = $("#copyPitch");
    if (cp) cp.addEventListener("click", function () {
      var t = $$(".pitch-out .slide").map(function (s) { return $("b", s).textContent + "\n" + $("p", s).textContent; }).join("\n\n");
      navigator.clipboard && navigator.clipboard.writeText(t); cp.textContent = "Copied ✓"; setTimeout(function () { cp.textContent = "Copy pitch outline"; }, 1500);
    });
  })();
  (function () {
    var tbl = $(".score-table"); if (!tbl) return;
    function upd() {
      var sum = 0, max = 0;
      $$("select", tbl).forEach(function (s) { sum += +s.value; max += 4; });
      $("#scoreTotal").textContent = sum; $("#scoreMax").textContent = max;
    }
    $$("select", tbl).forEach(function (s) { s.addEventListener("change", upd); }); upd();
  })();

  /* ---------- m05: self assessment ---------- */
  (function () {
    var host = $(".radar"); if (!host) return;
    var KEY = "mau.selfassess", saved = store.get(KEY, {});
    var L = ["", "Heard of it", "Saw it demoed", "Built it with help", "Built it solo", "Could teach it"];
    $$(".skill", host).forEach(function (sk, si) {
      var dots = $(".dots", sk), lvl = $(".lvl", sk);
      for (var v = 1; v <= 5; v++) { var b = document.createElement("button"); b.type = "button"; b.textContent = v; b.setAttribute("aria-label", L[v]); b.value = v; dots.appendChild(b); }
      function set(v) { $$("button", dots).forEach(function (b) { b.classList.toggle("on", +b.value <= v); }); lvl.textContent = v ? "LEVEL " + v + " · " + L[v].toUpperCase() : "TAP TO RATE"; }
      $$("button", dots).forEach(function (b) { b.addEventListener("click", function () { saved[si] = +b.value; store.set(KEY, saved); set(+b.value); }); });
      set(saved[si] || 0);
    });
  })();
})();
