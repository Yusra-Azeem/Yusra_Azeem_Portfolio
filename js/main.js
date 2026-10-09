(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("menu");
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- Rotating role text ---------- */
  const roleEl = document.getElementById("role");
  const roles = ["Backend developer", "Full-stack builder", "AI and ML tinkerer", "Problem solver"];
  if (reduceMotion) {
    roleEl.textContent = roles.join(" / ");
  } else {
    let r = 0, i = 0, deleting = false;
    const tick = () => {
      const word = roles[r];
      i += deleting ? -1 : 1;
      roleEl.textContent = word.slice(0, i);
      let delay = deleting ? 40 : 85;
      if (!deleting && i === word.length) { deleting = true; delay = 1400; }
      else if (deleting && i === 0) { deleting = false; r = (r + 1) % roles.length; delay = 350; }
      setTimeout(tick, delay);
    };
    tick();
  }

  /* ---------- Neural network background ---------- */
  const canvas = document.getElementById("net");
  const ctx = canvas.getContext("2d");
  let w, h, nodes = [];
  const mouse = { x: -999, y: -999 };

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.width = innerWidth * dpr;
    h = canvas.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    w = innerWidth; h = innerHeight;
    const count = Math.min(70, Math.floor((w * h) / 22000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    for (const n of nodes) {
      if (!reduceMotion) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
    }
    for (let a = 0; a < nodes.length; a++) {
      for (let b = a + 1; b < nodes.length; b++) {
        const dx = nodes[a].x - nodes[b].x, dy = nodes[a].y - nodes[b].y;
        const d = Math.hypot(dx, dy);
        if (d < 140) {
          ctx.strokeStyle = `rgba(167,139,250,${(1 - d / 140) * 0.35})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(nodes[a].x, nodes[a].y); ctx.lineTo(nodes[b].x, nodes[b].y); ctx.stroke();
        }
      }
      const md = Math.hypot(nodes[a].x - mouse.x, nodes[a].y - mouse.y);
      if (md < 170) {
        ctx.strokeStyle = `rgba(192,132,252,${(1 - md / 170) * 0.6})`;
        ctx.beginPath(); ctx.moveTo(nodes[a].x, nodes[a].y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
      }
    }
    for (const n of nodes) {
      ctx.fillStyle = "rgba(216,180,254,0.85)";
      ctx.beginPath(); ctx.arc(n.x, n.y, 1.7, 0, Math.PI * 2); ctx.fill();
    }
    if (!reduceMotion) requestAnimationFrame(draw);
  };

  addEventListener("resize", resize);
  addEventListener("pointermove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
  resize();
  draw();

  /* ---------- Sparkle burst on button click ---------- */
  const COLORS = ["#c084fc", "#a78bfa", "#e9d5ff", "#f0abfc", "#8b5cf6"];
  const STAR = '<svg viewBox="0 0 24 24"><path d="M12 0l2.8 9.2L24 12l-9.2 2.8L12 24l-2.8-9.2L0 12l9.2-2.8z" fill="currentColor"/></svg>';

  const burst = (x, y) => {
    if (reduceMotion) return;
    const total = 16;
    for (let i = 0; i < total; i++) {
      const s = document.createElement("span");
      s.className = "spark";
      s.innerHTML = STAR;
      s.style.left = x + "px";
      s.style.top = y + "px";
      s.style.color = COLORS[i % COLORS.length];
      s.style.filter = `drop-shadow(0 0 4px ${COLORS[i % COLORS.length]})`;
      document.body.appendChild(s);

      const angle = (Math.PI * 2 * i) / total + Math.random() * 0.5;
      const dist = 40 + Math.random() * 60;
      const size = 0.5 + Math.random() * 1.1;
      const anim = s.animate(
        [
          { transform: "translate(0,0) scale(0) rotate(0deg)", opacity: 1 },
          { transform: `translate(${Math.cos(angle) * dist * 0.6}px, ${Math.sin(angle) * dist * 0.6}px) scale(${size}) rotate(120deg)`, opacity: 1, offset: 0.4 },
          { transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist + 18}px) scale(0) rotate(260deg)`, opacity: 0 },
        ],
        { duration: 650 + Math.random() * 350, easing: "cubic-bezier(.2,.7,.3,1)" }
      );
      anim.onfinish = () => s.remove();
    }
  };

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".sparkle");
    if (!btn) return;
    // Keyboard activation reports 0,0, so burst from the button center instead.
    if (e.clientX === 0 && e.clientY === 0) {
      const r = btn.getBoundingClientRect();
      burst(r.left + r.width / 2, r.top + r.height / 2);
    } else {
      burst(e.clientX, e.clientY);
    }
  });
})();
