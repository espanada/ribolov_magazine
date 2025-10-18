<<<<<<< HEAD
// Dynamic gradient darkening on scroll
(function() {
  const LIGHT_TOP = '#1565c0';
  const DARK_START = [0, 38, 77]; // #00264d на старте
  const DARK_END = [0, 12, 36];   // #000c24 на самом низу
  function lerp(a, b, t) { return a + (b - a) * t; }
  function rgbToHex(r,g,b) { return '#' + [r,g,b].map(x=>x.toString(16).padStart(2,'0')).join(''); }
  function updateBg() {
    const y = window.scrollY || window.pageYOffset;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    let t = h ? Math.max(0, Math.min(1, y / h)) : 0;
    // t^0.7 — ускорим затемнение по мере скролла!
    t = Math.pow(t,0.7);
    const darkR = Math.round(lerp(DARK_START[0], DARK_END[0], t));
    const darkG = Math.round(lerp(DARK_START[1], DARK_END[1], t));
    const darkB = Math.round(lerp(DARK_START[2], DARK_END[2], t));
    const grad = `linear-gradient(to bottom, ${LIGHT_TOP} 0%, ${rgbToHex(darkR,darkG,darkB)} 100%)`;
    document.body.style.background = grad;
  }
  window.addEventListener('scroll', updateBg);
  window.addEventListener('resize', updateBg);
  document.addEventListener('DOMContentLoaded', updateBg);
})();
=======
// Dynamic gradient darkening on scroll
(function() {
  const LIGHT_TOP = '#1565c0';
  const DARK_START = [0, 38, 77]; // #00264d на старте
  const DARK_END = [0, 12, 36];   // #000c24 на самом низу
  function lerp(a, b, t) { return a + (b - a) * t; }
  function rgbToHex(r,g,b) { return '#' + [r,g,b].map(x=>x.toString(16).padStart(2,'0')).join(''); }
  function updateBg() {
    const y = window.scrollY || window.pageYOffset;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    let t = h ? Math.max(0, Math.min(1, y / h)) : 0;
    // t^0.7 — ускорим затемнение по мере скролла!
    t = Math.pow(t,0.7);
    const darkR = Math.round(lerp(DARK_START[0], DARK_END[0], t));
    const darkG = Math.round(lerp(DARK_START[1], DARK_END[1], t));
    const darkB = Math.round(lerp(DARK_START[2], DARK_END[2], t));
    const grad = `linear-gradient(to bottom, ${LIGHT_TOP} 0%, ${rgbToHex(darkR,darkG,darkB)} 100%)`;
    document.body.style.background = grad;
  }
  window.addEventListener('scroll', updateBg);
  window.addEventListener('resize', updateBg);
  document.addEventListener('DOMContentLoaded', updateBg);
})();
>>>>>>> 63f4646d109376eec9376909fe0d82dddb2648f3
