alert("jee");
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const blockSize = 40;

const labyrinth = [
  '################',
  '#S#...........F#',
  '#.#.#########.#',
  '#.#.#...#...#.#',
  '#.#.#.###.#.#.#',
  '#...#.#.#.#.#..',
  '#####.#.#.###.#',
  '#.....#.#.....#',
  '#####.#.#######',
  '#...#...#.#...#',
  '#.#.#####.#.#.#',
  '#.#.........#.#',
  '#####.#######.#',
  '#...#.......#.#',
  '#############.#',
  '#F#...........#',
];

let spider = {
  x: 1 * blockSize,
  y: 1 * blockSize,
  size: blockSize,
  speed: blockSize,
  dx: 0,
  dy: 0,
};

let spiderImage = new Image();
spiderImage.src = 'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/spider.png';

let fly = {
  x: 14 * blockSize,
  y: 1 * blockSize,
  size: blockSize,
};

function drawLabyrinth() {
  ctx.fillStyle = 'blue';
  for (let row = 0; row < labyrinth.length; row++) {
    for (let col = 0; col < labyrinth[row].length; col++) {
      if (labyrinth[row][col] === '#') {
        ctx.fillRect(col * blockSize, row * blockSize, blockSize, blockSize);
      }
    }
  }
}

function drawSpider() {
  ctx.drawImage(spiderImage, spider.x, spider.y, spider.size, spider.size);
}

function drawFly() {
  ctx.beginPath();
  ctx.arc(fly.x + fly.size / 2, fly.y + fly.size / 2, fly.size / 2, 0, Math.PI * 2);
  ctx.fillStyle = 'green';
  ctx.fill();
  ctx.closePath();
}

function moveSpider() {
  const nextX = spider.x + spider.dx;
  const nextY = spider.y + spider.dy;

  const nextRow = Math.floor(nextY / blockSize);
  const nextCol = Math.floor(nextX / blockSize);

  if (labyrinth[nextRow] && labyrinth[nextRow][nextCol] !== '#') {
    spider.x = nextX;
    spider.y = nextY;
  }
}

function checkCollision() {
  if (
    Math.abs(spider.x - fly.x) < blockSize &&
    Math.abs(spider.y - fly.y) < blockSize
  ) {
        fly.x = Math.floor(Math.random() * (canvas.width - fly.size) / blockSize) * blockSize;
    fly.y = Math.floor(Math.random() * (canvas.height - fly.size) / blockSize) * blockSize;
  }
}

function update() {
  moveSpider();
  checkCollision();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawLabyrinth();
  drawSpider();
  drawFly();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') {
    spider.dy = -spider.speed;
    spider.dx = 0;
  } else if (e.key === 'ArrowDown') {
    spider.dy = spider.speed;
    spider.dx = 0;
  } else if (e.key === 'ArrowLeft') {
    spider.dx = -spider.speed;
    spider.dy = 0;
  } else if (e.key === 'ArrowRight') {
    spider.dx = spider.speed;
    spider.dy = 0;
  }
});

gameLoop();

