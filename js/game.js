
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let gameRunning = false;
let player = { x: 100, y: 100, size: 30, speed: 5 };
let enemies = [];
let treasures = [];
let score = 0;

function startGame() {
    gameRunning = true;
    spawnEnemies();
    spawnTreasures();
    gameLoop();
}

function pauseGame() {
    gameRunning = false;
}

function spawnEnemies() {
    for (let i = 0; i < 5; i++) {
        enemies.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: 20,
            speed: Math.random() * 3 + 1
        });
    }
}

function spawnTreasures() {
    for (let i = 0; i < 3; i++) {
        treasures.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: 15
        });
    }
}

function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.size, player.size);
}

function drawEnemies() {
    ctx.fillStyle = 'red';
    enemies.forEach(enemy => {
        ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
    });
}

function drawTreasures() {
    ctx.fillStyle = 'gold';
    treasures.forEach(treasure => {
        ctx.beginPath();
        ctx.arc(treasure.x, treasure.y, treasure.size, 0, Math.PI * 2);
        ctx.fill();
    });
}

function updateEnemies() {
    enemies.forEach(enemy => {
        enemy.x += Math.random() > 0.5 ? enemy.speed : -enemy.speed;
        enemy.y += Math.random() > 0.5 ? enemy.speed : -enemy.speed;

        if (enemy.x < 0 || enemy.x > canvas.width || enemy.y < 0 || enemy.y > canvas.height) {
            enemy.x = Math.random() * canvas.width;
            enemy.y = Math.random() * canvas.height;
        }
    });
}

function collectTreasures() {
    treasures = treasures.filter(treasure => {
        const dx = player.x - treasure.x;
        const dy = player.y - treasure.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < player.size + treasure.size) {
            score += 10;
            return false;
        }
        return true;
    });
}

function gameLoop() {
    if (!gameRunning) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    drawEnemies();
    drawTreasures();
    updateEnemies();
    collectTreasures();

    ctx.fillStyle = 'white';
    ctx.fillText(`Score: ${score}`, 10, 20);

    requestAnimationFrame(gameLoop);
}

document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('pauseButton').addEventListener('click', pauseGame);
