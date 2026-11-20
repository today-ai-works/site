/* 견본 게임 "10초 연타".
   시작 화면 → 게임 → 결과 화면 흐름과, 터치 · 마우스 · 키보드 입력을 한 번에 보여 주는 예시다.
   새 게임은 이 파일을 복사해 GAME_KEY, 규칙, 그리기만 바꾸면 된다. */

const GAME_KEY = 'template-tap';
const DURATION_MS = 10_000;

const canvas = document.getElementById('game');
const view = GameKit.setupCanvas(canvas);
const { ctx, width, height } = view;
const best = GameKit.bestScore(GAME_KEY);

const startEl = document.getElementById('start');
const resultEl = document.getElementById('result');
const scoreEl = document.getElementById('score');
const bestEl = document.getElementById('best');
document.getElementById('stamp').textContent = GameKit.SITE_URL;

let state = 'ready'; // ready → playing → over
let count = 0;
let startedAt = 0;
let pulse = 0; // 누를 때 숫자가 살짝 커지는 효과

function start() {
  count = 0;
  pulse = 0;
  startedAt = performance.now();
  state = 'playing';
  startEl.hidden = true;
  resultEl.hidden = true;
  requestAnimationFrame(loop);
}

function finish() {
  state = 'over';
  const isNew = best.submit(count);
  scoreEl.textContent = String(count);
  bestEl.textContent = isNew ? '🎉 새 최고 기록!' : `최고 기록 ${best.get() ?? count}`;
  resultEl.hidden = false;
}

function hit() {
  if (state !== 'playing') return;
  count += 1;
  pulse = 1;
}

function draw(now) {
  const left = Math.max(0, DURATION_MS - (now - startedAt));

  ctx.clearRect(0, 0, width, height);

  // 남은 시간 막대
  ctx.fillStyle = '#e4e2dc';
  ctx.fillRect(24, 40, width - 48, 10);
  ctx.fillStyle = '#5b5bf0';
  ctx.fillRect(24, 40, (width - 48) * (left / DURATION_MS), 10);

  // 누른 횟수
  const size = 96 + pulse * 24;
  ctx.fillStyle = getComputedStyle(document.body).color;
  ctx.font = `800 ${size}px 'Pretendard Variable', sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(String(count), width / 2, height / 2);

  ctx.font = `600 18px 'Pretendard Variable', sans-serif`;
  ctx.fillText(`${(left / 1000).toFixed(1)}초`, width / 2, 80);

  return left;
}

function loop(now) {
  if (state !== 'playing') return;
  pulse = Math.max(0, pulse - 0.15);
  const left = draw(now);
  if (left <= 0) {
    finish();
    return;
  }
  requestAnimationFrame(loop);
}

// 입력: 터치와 마우스는 pointerdown 하나로 같이 받는다. 키보드는 스페이스.
canvas.addEventListener('pointerdown', (event) => {
  event.preventDefault();
  hit();
});

window.addEventListener('keydown', (event) => {
  if (event.code !== 'Space') return;
  event.preventDefault();
  if (state === 'playing') hit();
  else start();
});

document.getElementById('start-btn').addEventListener('click', start);
document.getElementById('again-btn').addEventListener('click', start);

// 시작 전 화면에도 0과 막대를 그려 둔다
startedAt = performance.now();
draw(startedAt);
