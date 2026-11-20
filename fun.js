/* Fun & interactive extras */
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (id) => document.getElementById(id);
  const dyn = () => window.I18N.dyn();

  /* ---------- sparkles ---------- */
  const SYMS = ["✿", "♥", "✦", "❀", "✧"];
  function spark(x, y, n = 8, spread = 70) {
    if (reduce) return;
    for (let i = 0; i < n; i++) {
      const s = document.createElement("span");
      s.className = "spark";
      s.textContent = SYMS[Math.floor(Math.random() * SYMS.length)];
      const a = Math.random() * Math.PI * 2, d = 20 + Math.random() * spread;
      s.style.left = x + "px"; s.style.top = y + "px";
      s.style.setProperty("--dx", Math.cos(a) * d + "px");
      s.style.setProperty("--dy", Math.sin(a) * d + "px");
      s.style.setProperty("--r", (Math.random() * 120 - 60) + "deg");
      s.style.fontSize = 12 + Math.random() * 14 + "px";
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 950);
    }
  }
  document.addEventListener("click", (e) => spark(e.clientX, e.clientY, 7));

  // gentle cursor trail (mouse only)
  if (window.matchMedia("(pointer: fine)").matches) {
    let last = 0;
    document.addEventListener("mousemove", (e) => {
      const now = performance.now();
      if (now - last > 90) { last = now; spark(e.clientX, e.clientY, 1, 24); }
    });
  }

  function confetti(n = 70) {
    for (let i = 0; i < n; i++) {
      setTimeout(() => spark(Math.random() * innerWidth, Math.random() * innerHeight * 0.7, 3, 180), i * 18);
    }
  }

  /* ---------- scroll progress + butterfly ---------- */
  const bar = $("bar"), pbf = $("pbf");
  function onScroll() {
    const h = document.documentElement;
    const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
    bar.style.width = p * 100 + "%";
    pbf.style.left = p * 100 + "%";
  }
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* ---------- typing effect ---------- */
  const typed = $("typed");
  if (typed) {
    if (reduce) {
      const show = () => { typed.textContent = dyn().words[0]; };
      show(); document.addEventListener("langchange", show);
    } else {
      let w = 0, c = 0, del = false;
      (function tick() {
        const list = dyn().words;
        const word = list[w % list.length];
        typed.textContent = word.slice(0, c);
        if (!del && c >= word.length) { del = true; return setTimeout(tick, 1400); }
        if (del && c <= 0) { del = false; w = (w + 1) % list.length; return setTimeout(tick, 300); }
        c += del ? -1 : 1;
        setTimeout(tick, del ? 35 : 75);
      })();
    }
  }

  /* ---------- hero butterfly ---------- */
  const hb = $("heroBf");
  if (hb) hb.addEventListener("click", () => {
    hb.classList.remove("fly"); void hb.offsetWidth; hb.classList.add("fly");
    const r = hb.getBoundingClientRect();
    spark(r.left + r.width / 2, r.top + r.height / 2, 18, 130);
  });

  /* ---------- flip cards ---------- */
  document.querySelectorAll(".flip").forEach((f) => f.addEventListener("click", () => f.classList.toggle("on")));

  /* ---------- passport stamps ---------- */
  const stamps = $("stamps"), msg = $("stampMsg");
  if (stamps) {
    const state = Array(10).fill(false);
    function render() {
      const n = state.filter(Boolean).length;
      const line = dyn().stamps[n];
      msg.textContent = n === 0 ? line : n + " / 10 · " + line;
    }
    for (let i = 0; i < 10; i++) {
      const b = document.createElement("button");
      b.className = "stamp"; b.type = "button"; b.textContent = i + 1;
      b.setAttribute("aria-label", "Stamp " + (i + 1));
      b.addEventListener("click", () => {
        state[i] = !state[i]; b.classList.toggle("on", state[i]);
        render();
        if (state.every(Boolean)) confetti(50);
      });
      stamps.appendChild(b);
    }
    render();
    document.addEventListener("langchange", render);
  }

  /* ---------- snowfall on the dream picture ---------- */
  const snow = $("snowBtn");
  if (snow && !reduce) {
    for (let i = 0; i < 14; i++) {
      const f = document.createElement("span");
      f.className = "flake"; f.textContent = "❄";
      f.style.left = Math.random() * 100 + "%";
      f.style.fontSize = 8 + Math.random() * 10 + "px";
      f.style.animationDuration = 5 + Math.random() * 6 + "s";
      f.style.animationDelay = -Math.random() * 8 + "s";
      snow.appendChild(f);
    }
  }

  /* ---------- playdate picker ---------- */
  const tabs = $("pdTabs"), body = $("pdBody");
  let pdKey = "paint";
  function showPD(animate) {
    const item = dyn().pd[pdKey];
    if (animate) { body.style.animation = "none"; void body.offsetWidth; body.style.animation = ""; }
    body.innerHTML = "<b>" + item[0] + "</b>" + item[1];
  }
  if (tabs) {
    showPD(false);
    tabs.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      pdKey = b.dataset.k;
      tabs.querySelectorAll("button").forEach((x) => x.classList.toggle("on", x === b));
      showPD(true);
    });
    document.addEventListener("langchange", () => showPD(false));
  }

  /* ---------- confetti button ---------- */
  const cb = $("confettiBtn");
  if (cb) cb.addEventListener("click", () => { confetti(70); cb.textContent = dyn().thanks; });
})();
