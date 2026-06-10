export const storyData = {
  start: {
    id: "start",
    title: "1만 킬로미터",
    text: "이곳은 북한. 당신은 자유를 찾아 목숨을 건 1만 킬로미터의 여정을 시작하려 합니다.\n\n차가운 바람이 부는 밤, 꽁꽁 언 두만강이 당신 앞에 펼쳐져 있습니다.",
    image: "/tumen_river.png",
    choices: [
      { text: "조심스럽게 강을 건넌다", nextId: "stage1_cross" },
      { text: "국경 경비대의 동태를 살피며 강둑에 숨는다", nextId: "stage1_wait" }
    ]
  },
  stage1_cross: {
    id: "stage1_cross",
    title: "두만강 도하",
    text: "얼음장 같은 물살을 헤치고 무사히 강을 건너 중국 땅에 발을 디뎠습니다. 하지만 기뻐할 틈도 없이 멀리서 탐지견이 짖는 소리가 들려옵니다.",
    image: "/tumen_river.png",
    choices: [
      { text: "소리가 나지 않는 방향으로 재빨리 도망친다", nextId: "stage2_china" },
      { text: "갈대밭에 엎드려 숨을 죽인다", nextId: "gameover_dog" }
    ]
  },
  stage1_wait: {
    id: "stage1_wait",
    title: "발각 (실패)",
    text: "너무 오래 지체했습니다. 순찰을 돌던 경비대에게 들켜 도망쳐야 합니다. 생존 기회를 1번 잃었습니다!",
    image: "/tumen_river.png",
    isFailure: true,
    choices: [
      { text: "다시 두만강 도하 시도하기", nextId: "start" }
    ]
  },
  gameover_dog: {
    id: "gameover_dog",
    title: "체포 위기 (실패)",
    text: "추격하던 중국 공안의 탐지견에게 냄새를 들켰습니다. 구사일생으로 도망쳐 기회를 1번 잃었습니다.",
    image: "/tumen_river.png",
    isFailure: true,
    choices: [
      { text: "다시 길을 찾아보기", nextId: "stage1_cross" }
    ]
  },
  stage2_china: {
    id: "stage2_china",
    title: "중국의 은신처",
    text: "도망친 끝에 브로커의 은신처에 도착했습니다. 좁은 방 안에서 숨을 돌리는데 밖에서 갑자기 누군가 문을 쾅쾅 두드립니다.",
    image: "/china_hideout.png",
    choices: [
      { text: "창문을 깨고 뒷골목으로 빠져나간다", nextId: "stage3_laos" },
      { text: "방문 뒤에 숨어 누군지 확인한다", nextId: "gameover_hide" }
    ]
  },
  gameover_hide: {
    id: "gameover_hide",
    title: "공안 급습 (실패)",
    text: "문을 두드린 것은 공안이었습니다. 간신히 창문으로 도망쳤지만 부상을 입어 기회를 1번 잃었습니다.",
    image: "/china_hideout.png",
    isFailure: true,
    choices: [
      { text: "서둘러 라오스로 향하기", nextId: "stage3_laos" }
    ]
  },
  stage3_laos: {
    id: "stage3_laos",
    title: "라오스 정글의 늪",
    text: "라오스의 험난한 정글에 진입했습니다. 벌레와 굶주림에 지쳐갑니다. 갈림길이 나타났습니다.",
    image: "/laos_jungle.png",
    choices: [
      { text: "누군가 지나간 흔적이 뚜렷한 진흙길을 따라간다", nextId: "gameover_trap" },
      { text: "수풀이 우거진 험난한 길을 직접 개척하며 나아간다", nextId: "stage4_mekong" }
    ]
  },
  gameover_trap: {
    id: "gameover_trap",
    title: "밀수꾼의 덫 (실패)",
    text: "발자국은 악명 높은 인신매매범의 것이었습니다. 돈을 빼앗기고 겨우 목숨만 건져 달아납니다. 기회를 1번 잃었습니다.",
    image: "/laos_jungle.png",
    isFailure: true,
    choices: [
      { text: "다른 길로 우회하여 메콩강으로 가기", nextId: "stage4_mekong" }
    ]
  },
  stage4_mekong: {
    id: "stage4_mekong",
    title: "메콩강, 마지막 고비",
    text: "정글을 뚫고 거대한 메콩강에 다다랐습니다. 여기서 당신의 마지막 선택이 최종 엔딩을 결정합니다.",
    image: "/mekong_river.png",
    choices: [
      { text: "수퍼맨 목사님이 은밀히 준비한 배에 탑승한다", nextId: "ending_korea" },
      { text: "위험을 피해 태국 현지인 마을에 몰래 스며든다", nextId: "ending_thai" },
      { text: "너무 무서워 아침이 밝을 때까지 강둑에서 기다린다", nextId: "ending_bad" }
    ]
  },
  ending_korea: {
    id: "ending_korea",
    title: "진엔딩: 완전한 자유",
    text: "무사히 태국 대사관을 거쳐, 대한민국 인천국제공항에 도착했습니다!\n\n수퍼맨 목사님의 도움과 당신의 용기가 기적을 낳았습니다. 진정한 자유의 땅에 오신 것을 환영합니다.",
    image: "/south_korea.png",
    isEnding: true,
    choices: [
      { text: "처음부터 다시 플레이", nextId: "start" }
    ]
  },
  ending_thai: {
    id: "ending_thai",
    title: "노말 엔딩: 미완의 자유",
    text: "태국의 작은 마을에 무사히 정착했습니다. 북송의 위험은 피했지만 낯선 곳에서 조용히 숨어 지내야 합니다. 하지만 최소한 생명은 구했습니다.",
    image: "/mekong_river.png",
    isEnding: true,
    choices: [
      { text: "진엔딩을 향해 다시 플레이", nextId: "start" }
    ]
  },
  ending_bad: {
    id: "ending_bad",
    title: "배드 엔딩: 안타까운 이별",
    text: "아침이 밝자 라오스 국경 순찰대에게 꼬리를 밟히고 말았습니다. 자유를 눈앞에 두고 다시 깊은 수용소로 돌아갑니다...",
    image: "/laos_jungle.png",
    isEnding: true,
    isBadEnding: true,
    choices: [
      { text: "처음부터 다시 플레이", nextId: "start" }
    ]
  },
  total_gameover: {
    id: "total_gameover",
    title: "게임 오버 (기회 모두 소진)",
    text: "주어진 5번의 생존 기회를 모두 잃었습니다... 체력이 완전히 바닥나고 수비대에게 포위되었습니다. 1만 킬로미터의 기나긴 여정은 여기서 끝이 났습니다.",
    image: "/tumen_river.png",
    isTotalGameOver: true,
    choices: [
      { text: "포기하지 않고 처음부터 다시 시작하기", nextId: "start" }
    ]
  }
};
