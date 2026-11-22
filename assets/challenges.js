// 도전 목록: 새 게임(작품)을 낼 때마다 인스타 업로드 영상 1개 = 도전 번호 1개.
// 홈 맨 위 카드(가장 큰 번호)와 /challenge/ 목록이 이 파일을 읽는다.
// 새 게임을 올리면 맨 아래에 한 줄 추가한다. 한 번 올린 번호는 바꾸지 않는다.
//
// no: 도전 번호 (영상에 적힌 번호)  game: 게임 이름  url: 누르면 갈 주소
// date: 영상 날짜  desc: 카드에 보일 한 줄
// puzzle: (게임마다 필요하면) 영상 속 문제를 고정하는 값. 마킹 탐정은 난이도와 시드
window.TAW_CHALLENGES = [
  {
    no: 1,
    game: '마킹 탐정',
    url: '/games/marking-detective/?c=1',
    date: '2026-11-20',
    desc: '보통 8문항 · 찍지 않고 다 맞힐 수 있을까?',
    puzzle: { gameKey: 'marking-detective', level: 'normal', seed: 523 }, // 단서 7개, 매 단계 단서 2~3개를 엮어야 풀림
  },
  {
    no: 2,
    game: '눈송이 오르골',
    url: '/games/snow-music-box/',
    date: '2026-11-22',
    desc: '선을 그으면 눈이 노래해요 · 소설(小雪) 기념',
  },
  {
    no: 3,
    game: '수육 도둑',
    url: '/games/suyuk-thief/',
    date: '2026-11-22',
    desc: '김장날 잠입 작전 · 수육 5점 먹을 수 있을까?',
  },
];
