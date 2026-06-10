export const storyData = {
  start: {
    id: "start",
    title: "1만 킬로미터",
    text: "이곳은 북한. 당신은 자유를 찾아 목숨을 건 1만 킬로미터의 여정을 시작하려 합니다.\n\n차가운 바람이 부는 밤, 꽁꽁 언 두만강이 당신 앞에 펼쳐져 있습니다.",
    image: "/tumen_river.png",
    bibleVerse: `"두려워하지 말라 내가 너와 함께 함이라 놀라지 말라 나는 네 하나님이 됨이라" (이사야 41:10)`,
    choices: [
      { text: "국경 경비대의 동태를 살피며 강둑에 숨는다", nextId: "stage1_wait" },
      { text: "어둠을 틈타 짐을 줄이고 강을 건넌다", nextId: "stage1_cross_light" },
      { text: "집에서 챙겨온 비상금을 품에 꼭 안고 강을 건넌다", nextId: "stage1_cross_money", gainItem: "비상금" }
    ]
  },
  stage1_cross_light: {
    id: "stage1_cross_light",
    title: "두만강 도하",
    text: "얼음장 같은 물살을 헤치고 무사히 강을 건너 중국 땅에 발을 디뎠습니다. 하지만 기뻐할 틈도 없이 멀리서 탐지견이 짖는 소리가 들려옵니다.",
    image: "/tumen_river.png",
    choices: [
      { text: "소리가 나지 않는 방향으로 재빨리 도망친다", nextId: "stage2_china" },
      { text: "갈대밭에 엎드려 숨을 죽인다", nextId: "gameover_dog" }
    ]
  },
  stage1_cross_money: {
    id: "stage1_cross_money",
    title: "두만강 도하 (비상금 확보)",
    text: "무거운 발걸음이었지만 꽁꽁 언 강을 건넸습니다. 중국 땅에 발을 딛자 멀리서 탐지견 소리가 들려옵니다. 다행히 비상금은 젖지 않았습니다.",
    image: "/tumen_river.png",
    choices: [
      { text: "소리가 나지 않는 방향으로 재빨리 도망친다", nextId: "stage2_china" },
      { text: "갈대밭에 엎드려 숨을 죽인다", nextId: "gameover_dog" }
    ]
  },
  stage1_wait: {
    id: "stage1_wait",
    title: "발각 (노동단련대)",
    text: "너무 오래 지체했습니다. 순찰을 돌던 경비대에게 들켜 단순 국경 도하 실패로 '노동단련대'에서 1년간 강제 노역을 해야 합니다. 생존 기회를 1번 잃었습니다!",
    image: "/tumen_river.png",
    isFailure: true,
    choices: [
      { text: "형기를 마치고 다시 탈출 시도하기", nextId: "start" }
    ]
  },
  gameover_dog: {
    id: "gameover_dog",
    title: "체포 위기 (노동단련대)",
    text: "추격하던 중국 공안의 탐지견에게 냄새를 들켜 강제 북송되었습니다. 탈북 시도 죄로 노동단련대로 끌려가 기회를 1번 잃었습니다.",
    image: "/tumen_river.png",
    isFailure: true,
    choices: [
      { text: "가까스로 도망쳐 다시 기회 노리기", nextId: "stage1_cross_light" }
    ]
  },
  stage2_china: {
    id: "stage2_china",
    title: "중국의 은신처",
    text: "도망친 끝에 브로커의 낡은 은신처에 도착했습니다. 하지만 누군가 문을 쾅쾅 두드립니다.\n\n문을 두드리는 소리에 심장이 덜컥 내려앉습니다.",
    image: "/china_hideout.png",
    bibleVerse: `"환난 날에 나를 부르라 내가 너를 건지리니 네가 나를 영화롭게 하리로다" (시편 50:15)`,
    choices: [
      { text: "창문을 깨고 뒷골목으로 빠져나간다", nextId: "stage3_laos" },
      { text: "방문 뒤에 숨어 누군지 확인한다", nextId: "gameover_hide" },
      { text: "[아이템 사용] 비상금을 쥐어주며 공안의 눈을 속인다", nextId: "stage3_laos_bribe", requiredItem: "비상금" }
    ]
  },
  gameover_hide: {
    id: "gameover_hide",
    title: "공안 급습 (강제 북송)",
    text: "공안이 들이닥쳤습니다. 북송되어 관리소(정치범수용소)로 끌려갈 뻔 했으나, 운 좋게 이송 중 도망쳐 나왔습니다. 부상으로 기회를 1번 잃었습니다.",
    image: "/china_hideout.png",
    isFailure: true,
    choices: [
      { text: "서둘러 라오스 국경으로 향하기", nextId: "stage3_laos" }
    ]
  },
  stage3_laos_bribe: {
    id: "stage3_laos_bribe",
    title: "라오스 정글로 (뇌물 통과)",
    text: "비상금을 건네자 공안은 모른 척 지나갔습니다! 짐을 챙기던 중 은신처 바닥에서 [낡은 나침반]을 발견했습니다. 안전하게 라오스 정글에 진입합니다.",
    image: "/laos_jungle.png",
    bibleVerse: `"내가 사망의 음침한 골짜기로 다닐지라도 해를 두려워하지 않을 것은 주께서 나와 함께 하심이라" (시편 23:4)`,
    gainItem: "낡은 나침반",
    choices: [
      { text: "누군가 지나간 흔적이 뚜렷한 진흙길을 따라간다", nextId: "gameover_trap" },
      { text: "수풀이 우거진 험난한 길을 직접 개척하며 나아간다", nextId: "stage4_mekong" },
      { text: "[아이템 사용] 나침반을 보고 정확한 남쪽 길을 찾아간다", nextId: "stage4_mekong", requiredItem: "낡은 나침반" }
    ]
  },
  stage3_laos: {
    id: "stage3_laos",
    title: "라오스 정글의 늪",
    text: "창문을 깨고 구사일생으로 탈출해 라오스의 험난한 정글에 진입했습니다. 벌레와 굶주림에 지쳐갑니다. 갈림길이 나타났습니다.",
    image: "/laos_jungle.png",
    bibleVerse: `"내가 사망의 음침한 골짜기로 다닐지라도 해를 두려워하지 않을 것은 주께서 나와 함께 하심이라" (시편 23:4)`,
    choices: [
      { text: "누군가 지나간 흔적이 뚜렷한 진흙길을 따라간다", nextId: "gameover_trap" },
      { text: "수풀이 우거진 험난한 길을 직접 개척하며 나아간다", nextId: "stage4_mekong" }
    ]
  },
  gameover_trap: {
    id: "gameover_trap",
    title: "밀수꾼의 덫 (관리소 위기)",
    text: "발자국은 악명 높은 인신매매범의 것이었습니다. 자칫하면 북한 보위부에 넘겨져 아오지 탄광(관리소)에 영원히 갇힐 뻔했습니다. 겨우 도망쳐 기회를 1번 잃었습니다.",
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
    bibleVerse: `"네가 물 가운데로 지날 때에 내가 너와 함께 할 것이라 강을 건널 때에 물이 너를 침몰하지 못할 것이며" (이사야 43:2)`,
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
    bibleVerse: `"수고하고 무거운 짐 진 자들아 다 내게로 오라 내가 너희를 쉬게 하리라" (마태복음 11:28)`,
    isEnding: true,
    choices: [
      { text: "처음부터 다시 플레이", nextId: "start" }
    ]
  },
  ending_thai: {
    id: "ending_thai",
    title: "노말 엔딩: 미완의 자유",
    text: "태국의 작은 마을에 무사히 정착했습니다. 북송의 위험은 피했지만 신분증 없이 숨어 지내야 합니다. 언젠가는 온전한 자유를 찾을 수 있기를...",
    image: "/mekong_river.png",
    bibleVerse: `"눈물을 흘리며 씨를 뿌리는 자는 기쁨으로 단을 거두리로다" (시편 126:5)`,
    isEnding: true,
    choices: [
      { text: "진엔딩을 향해 다시 플레이", nextId: "start" }
    ]
  },
  ending_bad: {
    id: "ending_bad",
    title: "배드 엔딩: 아오지 탄광",
    text: "아침이 밝자 라오스 국경 순찰대에게 잡혀 강제 북송되었습니다. 기독교인(수퍼맨 목사)과 접촉하려 한 죄로 악명 높은 '아오지 탄광(정치범수용소)'에 수감되었습니다...",
    image: "/laos_jungle.png",
    isEnding: true,
    isBadEnding: true,
    choices: [
      { text: "처음부터 다시 플레이", nextId: "start" }
    ]
  },
  total_gameover: {
    id: "total_gameover",
    title: "완전한 게임 오버 (정치범 수용소)",
    text: "주어진 5번의 생존 기회를 모두 잃었습니다... 체력이 완전히 바닥나고 수비대에게 포위되었습니다. 반동분자로 몰려 가족과 함께 관리소로 끌려가며 1만 킬로미터의 여정은 비극으로 끝났습니다.",
    image: "/tumen_river.png",
    isTotalGameOver: true,
    choices: [
      { text: "포기하지 않고 처음부터 다시 시작하기", nextId: "start" }
    ]
  }
};
