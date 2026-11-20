/* 오늘의 AI 작품: 모든 게임이 같이 쓰는 도우미.
   게임 폴더의 index.html에서 game.js보다 먼저 불러온다. */
(function () {
  // 결과 화면에 보여 줄 사이트 주소. 도메인을 사면 여기 한 곳만 바꾼다.
  const SITE_URL = 'today-ai-works.pages.dev';

  // 손가락으로 쓰는 기기인지 확인하고, <html>에 touch 또는 pc 표시를 붙인다.
  // CSS에서 .touch / .pc로 조작 안내를 나눠 보여 줄 수 있다.
  const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
  document.documentElement.classList.add(isTouch ? 'touch' : 'pc');

  // 캔버스를 세로 화면 기준 좌표(기본 360 x 640)로 쓰게 맞춘다.
  // 실제 화면 크기와 선명도(devicePixelRatio)는 여기서 자동으로 처리한다.
  function setupCanvas(canvas, width = 360, height = 640) {
    const ctx = canvas.getContext('2d');
    const view = { ctx, width, height };

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      ctx.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
    }

    resize();
    window.addEventListener('resize', resize);
    view.resize = resize;
    return view;
  }

  // 클릭 · 터치 위치(화면 좌표)를 게임 좌표로 바꾼다.
  function toGamePoint(canvas, view, clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * view.width,
      y: ((clientY - rect.top) / rect.height) * view.height,
    };
  }

  // 최고 기록. 이용자 브라우저에만 저장한다.
  // 사생활 보호 모드처럼 저장이 막힌 환경에서도 게임은 계속 돌아가야 하므로 오류를 삼킨다.
  function bestScore(gameKey, higherIsBetter = true) {
    const storageKey = `taw:best:${gameKey}`;
    return {
      get() {
        try {
          const value = window.localStorage.getItem(storageKey);
          return value === null ? null : Number(value);
        } catch {
          return null;
        }
      },
      // 새 기록이면 저장하고 true를 돌려준다.
      submit(score) {
        const best = this.get();
        const isNew = best === null || (higherIsBetter ? score > best : score < best);
        if (isNew) {
          try {
            window.localStorage.setItem(storageKey, String(score));
          } catch {
            // 저장이 막혀 있어도 이번 판의 결과 표시는 그대로 한다
          }
        }
        return isNew;
      },
    };
  }

  window.GameKit = { SITE_URL, isTouch, setupCanvas, toGamePoint, bestScore };
})();
