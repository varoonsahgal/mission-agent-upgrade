(() => {
  const stage = document.getElementById('stage');
  const slides = [...stage.querySelectorAll('.slide')];
  const count = document.getElementById('count');
  const bar = document.getElementById('bar');
  const hint = document.getElementById('hint');
  let cur = 0;

  function fit() {
    if (document.body.classList.contains('overview')) {
      const cols = innerWidth > 1400 ? 5 : innerWidth > 900 ? 4 : innerWidth > 560 ? 2 : 1;
      const w = (Math.min(innerWidth, 2000) - 48 - (cols - 1) * 22) / cols;
      document.documentElement.style.setProperty('--os', (w / 1920).toFixed(4));
      return;
    }
    const s = Math.min(innerWidth / 1920, innerHeight / 1080);
    stage.style.transform = `translate(${-960 * s}px, ${-540 * s}px) scale(${s})`;
  }

  function go(i, push = true) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    slides[cur].classList.remove('active');
    // reset flip cards when leaving a quiz slide
    slides[cur].querySelectorAll('.flip.on').forEach(f => f.classList.remove('on'));
    cur = i;
    // restart animations by forcing reflow
    void slides[cur].offsetWidth;
    slides[cur].classList.add('active');
    slides.forEach((s, k) => s.classList.toggle('current', k === cur));
    count.textContent = `${cur + 1} / ${slides.length}`;
    bar.style.width = `${((cur + 1) / slides.length) * 100}%`;
    document.title = `${slides[cur].dataset.title} · Mission: Agent Upgrade`;
    if (push) history.replaceState(null, '', `#${cur + 1}`);
  }

  const next = () => go(cur + 1), prev = () => go(cur - 1);

  function toggleOverview(force) {
    const on = document.body.classList.toggle('overview', force);
    fit();
    if (on) slides[cur].scrollIntoView({ block: 'center' });
  }

  addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key;
    if (document.body.classList.contains('overview')) {
      if (k === 'Escape' || k === 'o' || k === 'O') toggleOverview(false);
      return;
    }
    if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(k)) {
      if (k === 'Enter' && e.target.closest('button')) return;
      if (k === ' ' && e.target.closest('.flip')) return;
      e.preventDefault(); next();
    } else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(k)) { e.preventDefault(); prev(); }
    else if (k === 'Home') go(0);
    else if (k === 'End') go(slides.length - 1);
    else if (k === 'o' || k === 'O') toggleOverview(true);
    else if (k === 'f' || k === 'F') fullscreen();
    hint.classList.add('gone');
  });

  function fullscreen() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  }

  document.getElementById('next').onclick = next;
  document.getElementById('prev').onclick = prev;
  document.getElementById('fs').onclick = fullscreen;
  document.getElementById('ovw').onclick = () => toggleOverview();

  slides.forEach((s, i) => s.addEventListener('click', e => {
    if (document.body.classList.contains('overview')) {
      e.preventDefault(); toggleOverview(false); go(i);
    }
  }));

  document.querySelectorAll('.flip').forEach(f => f.addEventListener('click', e => {
    if (document.body.classList.contains('overview')) return;
    e.stopPropagation(); f.classList.toggle('on');
  }));

  // touch swipe
  let tx = null, ty = null;
  addEventListener('touchstart', e => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
  addEventListener('touchend', e => {
    if (tx === null || document.body.classList.contains('overview')) return;
    const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) { dx < 0 ? next() : prev(); hint.classList.add('gone'); }
    tx = null;
  });

  addEventListener('resize', fit);
  addEventListener('hashchange', () => { const n = parseInt(location.hash.slice(1)); if (n) go(n - 1, false); });
  setTimeout(() => hint.classList.add('gone'), 5000);

  fit();
  const start = parseInt(location.hash.slice(1));
  go(start ? start - 1 : 0, false);
  if (new URLSearchParams(location.search).has('overview')) toggleOverview(true);
})();
