<<<<<<< HEAD
// High-quality animated fish swimming across the screen
const canvas = document.getElementById('fish-canvas');
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

// Более реалистичное туловище рыбки
function drawFish(ctx, x, y, size, angle, tailWave, flip) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.scale(flip ? -size : size, size); // flip по горизонтали если нужно
    // --- СНАЧАЛА анальный (задний нижний) плавник ---
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(80, 28);
    ctx.quadraticCurveTo(85, 38, 90, 28);
    ctx.lineTo(85, 26);
    ctx.closePath();
    ctx.fillStyle = '#1976d2';
    ctx.globalAlpha = 0.5;
    ctx.fill();
    ctx.restore();
    // --- Туловище (объёмное, с брюшком) ---
    ctx.beginPath();
    ctx.moveTo(0, 0); // нос
    ctx.bezierCurveTo(30, -22, 70, -22, 100, 0); // верхняя линия
    ctx.bezierCurveTo(110, 10, 110, 30, 80, 28); // верх хвоста
    ctx.bezierCurveTo(60, 32, 40, 32, 18, 18); // брюшко
    ctx.bezierCurveTo(2, 10, 0, 0, 0, 0); // низ к носу
    ctx.closePath();
    // Градиент для объёма
    let grad = ctx.createLinearGradient(0, 0, 100, 30);
    grad.addColorStop(0, '#42a5f5');
    grad.addColorStop(0.5, '#1976d2');
    grad.addColorStop(1, '#90caf9');
    ctx.fillStyle = grad;
    ctx.shadowColor = '#1976d2';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;
    // Верхний плавник
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(30, -10);
    ctx.quadraticCurveTo(40, -38, 60, -10);
    ctx.lineTo(50, -8);
    ctx.closePath();
    ctx.fillStyle = '#64b5f6';
    ctx.globalAlpha = 0.7;
    ctx.fill();
    ctx.restore();
    // Нижний плавник
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(40, 18);
    ctx.quadraticCurveTo(50, 38, 70, 18);
    ctx.lineTo(55, 16);
    ctx.closePath();
    ctx.fillStyle = '#1976d2';
    ctx.globalAlpha = 0.7;
    ctx.fill();
    ctx.restore();
    // Грудной плавник (смещён ближе к центру туловища и ниже)
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(45, 18);
    ctx.quadraticCurveTo(35, 38, 55, 26);
    ctx.closePath();
    ctx.fillStyle = '#90caf9';
    ctx.globalAlpha = 0.7;
    ctx.fill();
    ctx.restore();
    // Задний (анальный) плавник — ближе к хвосту
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(75, 22);
    ctx.quadraticCurveTo(85, 38, 95, 22);
    ctx.lineTo(85, 20);
    ctx.closePath();
    ctx.fillStyle = '#1976d2';
    ctx.globalAlpha = 0.7;
    ctx.fill();
    ctx.restore();
    // Хвост (детализированный)
    ctx.save();
    ctx.translate(80, 18);
    ctx.rotate(Math.sin(tailWave) * 0.3);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(28, 18);
    ctx.quadraticCurveTo(40, 0, 28, -18);
    ctx.closePath();
    ctx.fillStyle = '#1565c0';
    ctx.globalAlpha = 0.85;
    ctx.fill();
    // Линии хвоста
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(28, 18);
    ctx.moveTo(0, 0);
    ctx.lineTo(28, -18);
    ctx.strokeStyle = 'rgba(33,150,243,0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.restore();
    // Чешуя (точки)
    for (let i = 1; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(20 * i, (i % 2 === 0 ? 6 : 14), 2, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(255,255,255,0.18)';
        ctx.fill();
    }
    // Рот
    ctx.beginPath();
    ctx.arc(100, 4, 4, Math.PI * 0.2, Math.PI * 0.8, false);
    ctx.strokeStyle = '#0d47a1';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    // Глаз
    ctx.beginPath();
    ctx.arc(80, -6, 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(82, -6, 2, 0, 2 * Math.PI);
    ctx.fillStyle = '#222';
    ctx.fill();
    ctx.restore();
}

// Fish state
let fish = {
    x: 100,
    y: 200,
    size: 1.2 * dpr,
    angle: 0,
    speed: 1.2 + Math.random(),
    direction: 1,
    tail: 0,
    verticalWave: Math.random() * Math.PI * 2,
    flip: false,
};

function animateFish() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Move fish
    fish.x += fish.speed * fish.direction * dpr;
    fish.tail += 0.18;
    fish.verticalWave += 0.012;
    fish.y += Math.sin(fish.verticalWave) * 0.7 * dpr;
    // Change direction if out of bounds
    if (fish.x > canvas.width - 120 * fish.size) {
        fish.direction = -1;
        fish.flip = true;
    } else if (fish.x < 120 * fish.size) {
        fish.direction = 1;
        fish.flip = false;
    }
    // Draw fish
    drawFish(ctx, fish.x, fish.y, fish.size, 0, fish.tail, fish.flip);
    requestAnimationFrame(animateFish);
}

// Start position
fish.x = 120 * fish.size + Math.random() * (canvas.width - 240 * fish.size);
fish.y = canvas.height / 2;

animateFish();
=======
// High-quality animated fish swimming across the screen
const canvas = document.getElementById('fish-canvas');
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

// Более реалистичное туловище рыбки
function drawFish(ctx, x, y, size, angle, tailWave, flip) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.scale(flip ? -size : size, size); // flip по горизонтали если нужно
    // --- СНАЧАЛА анальный (задний нижний) плавник ---
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(80, 28);
    ctx.quadraticCurveTo(85, 38, 90, 28);
    ctx.lineTo(85, 26);
    ctx.closePath();
    ctx.fillStyle = '#1976d2';
    ctx.globalAlpha = 0.5;
    ctx.fill();
    ctx.restore();
    // --- Туловище (объёмное, с брюшком) ---
    ctx.beginPath();
    ctx.moveTo(0, 0); // нос
    ctx.bezierCurveTo(30, -22, 70, -22, 100, 0); // верхняя линия
    ctx.bezierCurveTo(110, 10, 110, 30, 80, 28); // верх хвоста
    ctx.bezierCurveTo(60, 32, 40, 32, 18, 18); // брюшко
    ctx.bezierCurveTo(2, 10, 0, 0, 0, 0); // низ к носу
    ctx.closePath();
    // Градиент для объёма
    let grad = ctx.createLinearGradient(0, 0, 100, 30);
    grad.addColorStop(0, '#42a5f5');
    grad.addColorStop(0.5, '#1976d2');
    grad.addColorStop(1, '#90caf9');
    ctx.fillStyle = grad;
    ctx.shadowColor = '#1976d2';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;
    // Верхний плавник
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(30, -10);
    ctx.quadraticCurveTo(40, -38, 60, -10);
    ctx.lineTo(50, -8);
    ctx.closePath();
    ctx.fillStyle = '#64b5f6';
    ctx.globalAlpha = 0.7;
    ctx.fill();
    ctx.restore();
    // Нижний плавник
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(40, 18);
    ctx.quadraticCurveTo(50, 38, 70, 18);
    ctx.lineTo(55, 16);
    ctx.closePath();
    ctx.fillStyle = '#1976d2';
    ctx.globalAlpha = 0.7;
    ctx.fill();
    ctx.restore();
    // Грудной плавник (смещён ближе к центру туловища и ниже)
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(45, 18);
    ctx.quadraticCurveTo(35, 38, 55, 26);
    ctx.closePath();
    ctx.fillStyle = '#90caf9';
    ctx.globalAlpha = 0.7;
    ctx.fill();
    ctx.restore();
    // Задний (анальный) плавник — ближе к хвосту
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(75, 22);
    ctx.quadraticCurveTo(85, 38, 95, 22);
    ctx.lineTo(85, 20);
    ctx.closePath();
    ctx.fillStyle = '#1976d2';
    ctx.globalAlpha = 0.7;
    ctx.fill();
    ctx.restore();
    // Хвост (детализированный)
    ctx.save();
    ctx.translate(80, 18);
    ctx.rotate(Math.sin(tailWave) * 0.3);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(28, 18);
    ctx.quadraticCurveTo(40, 0, 28, -18);
    ctx.closePath();
    ctx.fillStyle = '#1565c0';
    ctx.globalAlpha = 0.85;
    ctx.fill();
    // Линии хвоста
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(28, 18);
    ctx.moveTo(0, 0);
    ctx.lineTo(28, -18);
    ctx.strokeStyle = 'rgba(33,150,243,0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.restore();
    // Чешуя (точки)
    for (let i = 1; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(20 * i, (i % 2 === 0 ? 6 : 14), 2, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(255,255,255,0.18)';
        ctx.fill();
    }
    // Рот
    ctx.beginPath();
    ctx.arc(100, 4, 4, Math.PI * 0.2, Math.PI * 0.8, false);
    ctx.strokeStyle = '#0d47a1';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    // Глаз
    ctx.beginPath();
    ctx.arc(80, -6, 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(82, -6, 2, 0, 2 * Math.PI);
    ctx.fillStyle = '#222';
    ctx.fill();
    ctx.restore();
}

// Fish state
let fish = {
    x: 100,
    y: 200,
    size: 1.2 * dpr,
    angle: 0,
    speed: 1.2 + Math.random(),
    direction: 1,
    tail: 0,
    verticalWave: Math.random() * Math.PI * 2,
    flip: false,
};

function animateFish() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Move fish
    fish.x += fish.speed * fish.direction * dpr;
    fish.tail += 0.18;
    fish.verticalWave += 0.012;
    fish.y += Math.sin(fish.verticalWave) * 0.7 * dpr;
    // Change direction if out of bounds
    if (fish.x > canvas.width - 120 * fish.size) {
        fish.direction = -1;
        fish.flip = true;
    } else if (fish.x < 120 * fish.size) {
        fish.direction = 1;
        fish.flip = false;
    }
    // Draw fish
    drawFish(ctx, fish.x, fish.y, fish.size, 0, fish.tail, fish.flip);
    requestAnimationFrame(animateFish);
}

// Start position
fish.x = 120 * fish.size + Math.random() * (canvas.width - 240 * fish.size);
fish.y = canvas.height / 2;

animateFish();
>>>>>>> 63f4646d109376eec9376909fe0d82dddb2648f3
