# 오늘의 AI 작품

AI로 만든 작은 게임과 작품을 모아 두는 사이트. 설치 · 가입 없이 브라우저에서 바로 동작한다.

- 사이트: https://today-ai-works.pages.dev (나중에 todayaiworks.com 연결 예정)
- 인스타그램: [@today_ai_works](https://www.instagram.com/today_ai_works/)
- 배포: Cloudflare Pages. `main`에 push하면 자동으로 배포된다. 빌드 과정 없이 파일 그대로 올라간다.

## 폴더 구조

```text
index.html              홈 (작품 목록)
about/ contact/         소개, 문의
privacy/ terms/         개인정보처리방침, 이용약관
assets/site.css         모든 페이지 공통 스타일
assets/game.css         게임 페이지 공통 배치 (세로 9:16 화면)
assets/game-kit.js      게임 공통 도우미 (기기 구분, 캔버스 선명도, 최고 기록, 사이트 주소)
tools/                  생활 도구 (홈의 "도구" 칸, 도전 번호 없음)
games/_template/        견본 게임 "10초 연타" (복사해서 새 게임 시작, 검색에서 제외)
robots.txt sitemap.xml  검색 엔진용
404.html                없는 주소
```

## 새 게임 올리는 순서

1. `games/_template/` 폴더를 복사해 `games/게임-주소/`로 이름을 바꾼다 (영문 소문자와 하이픈).
2. `index.html`에서 제목, 설명, 하는 법, "어떻게 만들었나요"를 고치고 `<meta name="robots" content="noindex">` 줄을 지운다.
3. `game.js`에서 `GAME_KEY`를 게임 주소와 같게 바꾸고 규칙과 그리기를 만든다.
4. 홈 `index.html`의 게임 목록 맨 앞에 카드 하나를 추가한다 (썸네일은 게임 폴더에 `thumb.webp`).
5. `sitemap.xml`에 `<url>` 한 줄을 추가한다.
6. 휴대폰과 PC에서 모두 해 본 뒤 push한다.

## 내 컴퓨터에서 미리 보기

```cmd
cd today-ai-works-site
npx serve .
```

`http://localhost:3000`을 연다. (Node.js가 있어야 한다. 파일을 더블클릭으로 열면 `/assets/` 경로가 깨진다.)
