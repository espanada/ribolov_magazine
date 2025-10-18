<<<<<<< HEAD
// Подводные партиклы: пузырьки и световые пятна
const canvas = document.createElement('canvas');
canvas.id = 'particles-canvas';
document.body.prepend(canvas);
const ctx = canvas.getContext('2d');
let dpr = window.devicePixelRatio || 1;

function resizeCanvas() {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Пузырьки
const bubbles = Array.from({length: 32}, () => ({
    x: Math.random() * window.innerWidth,
    y: window.innerHeight + Math.random() * window.innerHeight,
    r: 6 + Math.random() * 16,
    speed: 0.4 + Math.random() * 0.7,
    drift: (Math.random() - 0.5) * 0.3,
    alpha: 0.2 + Math.random() * 0.4
}));

// Световые пятна
const lights = Array.from({length: 4}, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight * 0.7,
    r: 120 + Math.random() * 120,
    alpha: 0.08 + Math.random() * 0.07
}));

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Световые пятна
    for (const l of lights) {
        ctx.save();
        ctx.globalAlpha = l.alpha;
        const grad = ctx.createRadialGradient(l.x * dpr, l.y * dpr, 0, l.x * dpr, l.y * dpr, l.r * dpr);
        grad.addColorStop(0, '#fff');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.beginPath();
        ctx.arc(l.x * dpr, l.y * dpr, l.r * dpr, 0, 2 * Math.PI);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
    }
    // Пузырьки
    for (const b of bubbles) {
        ctx.save();
        ctx.globalAlpha = b.alpha;
        ctx.beginPath();
        ctx.arc(b.x * dpr, b.y * dpr, b.r * dpr, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#b3e5fc';
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.restore();
    }
}

function animateParticles() {
    // Движение пузырьков
    for (const b of bubbles) {
        b.y -= b.speed * dpr;
        b.x += b.drift * dpr;
        if (b.y < -b.r * 2) {
            b.x = Math.random() * window.innerWidth;
            b.y = window.innerHeight + b.r * 2 + Math.random() * window.innerHeight * 0.3;
            b.r = 6 + Math.random() * 16;
            b.speed = 0.4 + Math.random() * 0.7;
            b.drift = (Math.random() - 0.5) * 0.3;
            b.alpha = 0.2 + Math.random() * 0.4;
        }
    }
    // Медленное движение световых пятен
    for (const l of lights) {
        l.x += (Math.random() - 0.5) * 0.2;
        l.y += (Math.random() - 0.5) * 0.1;
    }
    drawParticles();
    requestAnimationFrame(animateParticles);
}

animateParticles();
=======
// Подводные партиклы: пузырьки и световые пятна
const canvas = document.createElement('canvas');
canvas.id = 'particles-canvas';
document.body.prepend(canvas);
const ctx = canvas.getContext('2d');
let dpr = window.devicePixelRatio || 1;

function resizeCanvas() {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Пузырьки
const bubbles = Array.from({length: 32}, () => ({
    x: Math.random() * window.innerWidth,
    y: window.innerHeight + Math.random() * window.innerHeight,
    r: 6 + Math.random() * 16,
    speed: 0.4 + Math.random() * 0.7,
    drift: (Math.random() - 0.5) * 0.3,
    alpha: 0.2 + Math.random() * 0.4
}));

// Световые пятна
const lights = Array.from({length: 4}, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight * 0.7,
    r: 120 + Math.random() * 120,
    alpha: 0.08 + Math.random() * 0.07
}));

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Световые пятна
    for (const l of lights) {
        ctx.save();
        ctx.globalAlpha = l.alpha;
        const grad = ctx.createRadialGradient(l.x * dpr, l.y * dpr, 0, l.x * dpr, l.y * dpr, l.r * dpr);
        grad.addColorStop(0, '#fff');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.beginPath();
        ctx.arc(l.x * dpr, l.y * dpr, l.r * dpr, 0, 2 * Math.PI);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
    }
    // Пузырьки
    for (const b of bubbles) {
        ctx.save();
        ctx.globalAlpha = b.alpha;
        ctx.beginPath();
        ctx.arc(b.x * dpr, b.y * dpr, b.r * dpr, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#b3e5fc';
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.restore();
    }
}

function animateParticles() {
    // Движение пузырьков
    for (const b of bubbles) {
        b.y -= b.speed * dpr;
        b.x += b.drift * dpr;
        if (b.y < -b.r * 2) {
            b.x = Math.random() * window.innerWidth;
            b.y = window.innerHeight + b.r * 2 + Math.random() * window.innerHeight * 0.3;
            b.r = 6 + Math.random() * 16;
            b.speed = 0.4 + Math.random() * 0.7;
            b.drift = (Math.random() - 0.5) * 0.3;
            b.alpha = 0.2 + Math.random() * 0.4;
        }
    }
    // Медленное движение световых пятен
    for (const l of lights) {
        l.x += (Math.random() - 0.5) * 0.2;
        l.y += (Math.random() - 0.5) * 0.1;
    }
    drawParticles();
    requestAnimationFrame(animateParticles);
}

animateParticles();
>>>>>>> 63f4646d109376eec9376909fe0d82dddb2648f3
