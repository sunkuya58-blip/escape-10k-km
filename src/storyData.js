export const storyData = {
  start: {
    id: "start",
    title: "약속의 땅을 향하여",
    text: "{playerName}은(는) 북한 {hometown}에서 {birthYear}년에 태어났다.\n\n하지만 지독한 가난과 끝없는 통제 속에서 {playerName}의 삶은 점차 피폐해졌다. 결국 자유를 찾아 목숨을 건 여정을 결심한 당신.\n\n차가운 바람이 부는 밤, 꽁꽁 언 두만강이 당신 앞에 펼쳐져 있다.",
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
    text: "얼음장 같은 물살을 헤치고 무사히 강을 건너 중국 땅에 발을 디뎠습니다. '{playerName}, 어서 도망쳐야 해!' 하지만 기뻐할 틈도 없이 멀리서 탐지견이 짖는 소리가 들려옵니다.",
    image: "/tumen_river.png",
    choices: [
      { text: "소리가 나지 않는 방향으로 재빨리 도망친다", nextId: "stage1_action_dog" },
      { text: "갈대밭에 엎드려 숨을 죽인다", nextId: "gameover_dog" }
    ]
  },
  stage1_cross_money: {
    id: "stage1_cross_money",
    title: "두만강 도하 (비상금 확보)",
    text: "무거운 발걸음이었지만 꽁꽁 언 강을 건넸습니다. 중국 땅에 발을 딛자 멀리서 탐지견 소리가 들려옵니다. '{playerName}, 정신 차리자. 다행히 비상금은 젖지 않았어.'",
    image: "/tumen_river.png",
    choices: [
      { text: "소리가 나지 않는 방향으로 재빨리 도망친다", nextId: "stage1_action_dog" },
      { text: "갈대밭에 엎드려 숨을 죽인다", nextId: "gameover_dog" }
    ]
  },
  stage1_action_dog: {
    id: "stage1_action_dog",
    title: "전력 질주 (탐지견 추격)",
    text: "탐지견이 맹렬하게 짖으며 당신을 쫓아옵니다! 숨이 턱 끝까지 차오르지만 여기서 잡히면 끝입니다. 무조건 뒤도 돌아보지 말고 뛰세요!!",
    image: "/tumen_river.png",
    isActionEvent: true,
    requiredClicks: 30,
    timeLimit: 10,
    successNextId: "stage2_china",
    timeoutNextId: "gameover_dog",
    choices: []
  },
  stage1_wait: {
    id: "stage1_wait",
    title: "발각 (노동단련대)",
    text: "너무 오래 지체했습니다. 순찰을 돌던 경비대에게 들켜 단순 국경 도하 실패로 '노동단련대'에서 1년간 강제 노역을 해야 합니다. '{playerName}! 일어나서 일 못 해!?' 간수의 호통이 울려 퍼집니다. 생존 기회를 1번 잃었습니다!",
    image: "/tumen_river.png",
    isFailure: true,
    choices: [
      { text: "형기를 마치고 다시 탈출 시도하기", nextId: "start" }
    ]
  },
  gameover_dog: {
    id: "gameover_dog",
    title: "체포 위기 (노동단련대)",
    text: "추격하던 중국 공안의 탐지견에게 냄새를 들켜 강제 북송되었습니다. 탈북 시도 죄로 노동단련대로 끌려가 기회를 1번 잃었습니다. {playerName}의 몸과 마음이 지쳐갑니다.",
    image: "/tumen_river.png",
    isFailure: true,
    choices: [
      { text: "가까스로 도망쳐 다시 기회 노리기", nextId: "stage1_cross_light" }
    ]
  },
  stage2_china: {
    id: "stage2_china",
    title: "중국의 은신처",
    text: "도망친 끝에 브로커의 낡은 은신처에 도착했습니다. 하지만 누군가 문을 쾅쾅 두드립니다.\n\n'{playerName}, 안에 있는 거 다 안다! 문 열어!' 공안의 목소리에 심장이 덜컥 내려앉습니다.",
    image: "/china_hideout.png",
    bibleVerse: `"환난 날에 나를 부르라 내가 너를 건지리니 네가 나를 영화롭게 하리로다" (시편 50:15)`,
    choices: [
      { text: "창문을 깨고 뒷골목으로 빠져나간다 (나침반 획득)", nextId: "stage2_train", gainItem: "낡은 나침반" },
      { text: "방문 뒤에 숨어 누군지 확인한다", nextId: "gameover_hide" },
      { text: "[아이템 사용] 비상금을 쥐어주며 브로커에게 신분증을 산다", nextId: "stage2_train", requiredItem: "비상금", gainItem: "위조 신분증" }
    ]
  },
  gameover_hide: {
    id: "gameover_hide",
    title: "공안 급습 (강제 북송)",
    text: "공안이 들이닥쳤습니다. 북송되어 관리소(정치범수용소)로 끌려갈 뻔 했으나, {playerName}은(는) 운 좋게 이송 중 도망쳐 나왔습니다. 부상으로 기회를 1번 잃었습니다.",
    image: "/china_hideout.png",
    isFailure: true,
    choices: [
      { text: "서둘러 남쪽 기차역으로 도망가기", nextId: "stage2_train" }
    ]
  },
  stage2_train: {
    id: "stage2_train",
    title: "중국 횡단 열차",
    text: "라오스 국경으로 향하는 긴 기차에 몸을 실었습니다. 긴장이 조금 풀리려던 찰나, 객차 앞쪽에서 공안이 다가옵니다. '{playerName}, 어떡하지...?'",
    image: "/china_hideout.png",
    bibleVerse: `"여호와는 나의 빛이요 나의 구원이시니 내가 누구를 두려워하리요" (시편 27:1)`,
    choices: [
      { text: "조용히 화장실로 숨어 문을 잠근다", nextId: "gameover_train_toilet" },
      { text: "[아이템 사용] 당당하게 위조 신분증을 보여준다", nextId: "stage3_laos", requiredItem: "위조 신분증" },
      { text: "말투를 고치고 진짜 북한 사람임을 증명하려 시도한다", nextId: "quiz1" },
      { text: "기차가 느려지는 틈을 타 창밖으로 뛰어내린다", nextId: "stage3_laos" }
    ]
  },
  quiz1: {
    id: "quiz1",
    title: "북한어 검열 (1/2)",
    text: "공안이 당신을 빤히 쳐다보며 묻습니다. '진짜 조선 사람이 맞소? 그렇다면 기차에서 먹으려고 싸 온 [도시락]을 조선 말로 뭐라고 부르는지 대답해 보시오.'",
    image: "/china_hideout.png",
    timeLimit: 10,
    timeoutNextId: "gameover_train_sleep",
    choices: [
      { text: "곽밥", nextId: "quiz2" },
      { text: "통밥", nextId: "gameover_train_sleep" },
      { text: "함지밥", nextId: "gameover_train_sleep" }
    ]
  },
  quiz2: {
    id: "quiz2",
    title: "북한어 검열 (2/2)",
    text: "공안이 고개를 끄덕이더니 마지막 질문을 던집니다. '좋소. 그럼 요즘 평양 처녀들이 몸매 관리를 위해 [다이어트]를 한다던데, 그걸 뭐라고 부르오?'",
    image: "/china_hideout.png",
    timeLimit: 10,
    timeoutNextId: "gameover_train_sleep",
    choices: [
      { text: "살덜기", nextId: "gameover_train_sleep" },
      { text: "몸줄이기", nextId: "gameover_train_sleep" },
      { text: "살까기", nextId: "stage3_laos" }
    ]
  },
  gameover_train_toilet: {
    id: "gameover_train_toilet",
    title: "화장실 발각 (노동단련대)",
    text: "공안이 강제로 화장실 문을 따고 들어왔습니다. 수상한 사람으로 몰려 조사를 받고, 기회를 1번 잃었습니다. 가까스로 탈출해 다시 길을 나섭니다.",
    image: "/china_hideout.png",
    isFailure: true,
    choices: [
      { text: "라오스 국경 근처로 숨어들기", nextId: "stage3_laos" }
    ]
  },
  gameover_train_sleep: {
    id: "gameover_train_sleep",
    title: "검문 체포 (강제 북송)",
    text: "질문에 우물쭈물하거나 틀린 답을 하자 공안이 매섭게 돌변합니다! 북송될 뻔한 위기에서 겨우 도망쳤으나 생존 기회를 1번 잃었습니다.",
    image: "/china_hideout.png",
    isFailure: true,
    choices: [
      { text: "가까스로 도망쳐 라오스로 향하기", nextId: "stage3_laos" }
    ]
  },
  stage3_laos: {
    id: "stage3_laos",
    title: "라오스 정글의 늪",
    text: "구사일생으로 기차를 탈출해 라오스의 험난한 정글에 진입했습니다. 벌레와 굶주림에 지쳐갑니다. {playerName}의 눈앞에 갈림길이 나타났습니다.",
    image: "/laos_jungle.png",
    bibleVerse: `"내가 사망의 음침한 골짜기로 다닐지라도 해를 두려워하지 않을 것은 주께서 나와 함께 하심이라" (시편 23:4)`,
    choices: [
      { text: "누군가 지나간 흔적이 뚜렷한 진흙길을 따라간다", nextId: "gameover_trap" },
      { text: "수풀이 우거진 험난한 길을 직접 개척하며 나아간다", nextId: "stage3_mountain" },
      { text: "[아이템 사용] 낡은 나침반을 꺼내 정남쪽 길을 찾는다", nextId: "stage3_mountain", requiredItem: "낡은 나침반" }
    ]
  },
  gameover_trap: {
    id: "gameover_trap",
    title: "밀수꾼의 덫 (관리소 위기)",
    text: "발자국은 악명 높은 인신매매범의 것이었습니다. 자칫하면 북한 보위부에 넘겨져 {playerName}은(는) 아오지 탄광(관리소)에 영원히 갇힐 뻔했습니다. 겨우 도망쳐 기회를 1번 잃었습니다.",
    image: "/laos_jungle.png",
    isFailure: true,
    choices: [
      { text: "다른 길로 우회하여 산으로 가기", nextId: "stage3_mountain" }
    ]
  },
  stage3_mountain: {
    id: "stage3_mountain",
    title: "라오스 야간 산행",
    text: "메콩강으로 가려면 이 가파른 돌산을 넘어야 합니다. 캄캄한 밤하늘에 국경 수비대의 강렬한 서치라이트 불빛이 산등성이를 훑고 지나갑니다!",
    image: "/laos_jungle.png",
    bibleVerse: `"내가 산을 향하여 눈을 들리라 나의 도움이 어디서 올까 나의 도움은 천지를 지으신 여호와에게서로다" (시편 121:1-2)`,
    timeLimit: 10,
    timeoutNextId: "gameover_mountain_timeout",
    choices: [
      { text: "서치라이트 불빛을 피해 절벽 쪽 좁은 길로 걷는다", nextId: "gameover_mountain_fall" },
      { text: "불빛이 지나갈 때까지 나무 밑에 납작 엎드려 기다린다", nextId: "stage4_mekong" },
      { text: "불빛을 피해 무작정 앞만 보고 산을 넘는다", nextId: "gameover_mountain_run" }
    ]
  },
  gameover_mountain_timeout: {
    id: "gameover_mountain_timeout",
    title: "서치라이트 발각",
    text: "머뭇거리는 사이 서치라이트 불빛이 당신을 비췄습니다! 수비대의 총격에 부상을 입고 기회를 1번 잃었습니다.",
    image: "/laos_jungle.png",
    isFailure: true,
    choices: [
      { text: "필사적으로 도망쳐 강에 도착하기", nextId: "stage4_mekong" }
    ]
  },
  gameover_mountain_fall: {
    id: "gameover_mountain_fall",
    title: "절벽 추락 (부상)",
    text: "어둠 속에서 헛디뎌 가파른 비탈길을 굴러 떨어졌습니다. 끔찍한 고통과 함께 기회를 1번 잃었습니다. {playerName}, 정신을 차려야 합니다.",
    image: "/laos_jungle.png",
    isFailure: true,
    choices: [
      { text: "고통을 참고 절뚝이며 강으로 향하기", nextId: "stage4_mekong" }
    ]
  },
  gameover_mountain_run: {
    id: "gameover_mountain_run",
    title: "수비대 발각",
    text: "뛰는 소리에 수비대에게 들키고 말았습니다. 총알이 빗발치는 가운데 가까스로 목숨을 건졌으나, 기회를 1번 잃었습니다.",
    image: "/laos_jungle.png",
    isFailure: true,
    choices: [
      { text: "필사적으로 도망쳐 강에 도착하기", nextId: "stage4_mekong" }
    ]
  },
  stage4_mekong: {
    id: "stage4_mekong",
    title: "메콩강, 마지막 고비",
    text: "험난한 산을 뚫고 마침내 거대한 메콩강에 다다랐습니다. '{playerName}, 저 강만 건너면 돼.' 여기서 당신의 마지막 선택이 최종 엔딩을 결정합니다.",
    image: "/mekong_river.png",
    bibleVerse: `"네가 물 가운데로 지날 때에 내가 너와 함께 할 것이라 강을 건널 때에 물이 너를 침몰하지 못할 것이며" (이사야 43:2)`,
    choices: [
      { text: "대영교회 목사님이 은밀히 준비한 배에 탑승한다", nextId: "ending_korea" },
      { text: "위험을 피해 태국 현지인 마을에 몰래 스며든다", nextId: "ending_thai" },
      { text: "너무 무서워 아침이 밝을 때까지 강둑에서 기다린다", nextId: "ending_bad" }
    ]
  },
  ending_korea: {
    id: "ending_korea",
    title: "진엔딩: 완전한 자유",
    text: "무사히 태국 대사관을 거쳐, 대한민국 인천국제공항에 도착했습니다!\n\n대영교회 목사님의 도움과 {playerName}님의 용기가 기적을 낳았습니다. 진정한 자유의 땅에 오신 것을 환영합니다.",
    image: "/south_korea.png",
    bibleVerse: `"수고하고 무거운 짐 진 자들아 다 내게로 오라 내가 너희를 쉬게 하리라" (마태복음 11:28)`,
    isEnding: true,
    choices: [
      { text: "처음부터 다시 플레이", nextId: "start" }
    ]
  },
  ending_hidden: {
    id: "ending_hidden",
    title: "히든 진엔딩: 기적의 생존자",
    text: "단 한 번의 위기(하트 감소)도 겪지 않고, 북한어 퀴즈와 모든 액션을 완벽하게 이겨냈습니다!\n\n빛나는 용기와 대영교회 목사님의 도움으로 완벽한 탈출에 성공한 {playerName}님. 당신은 북한 인권의 상징이자 '기적의 생존자'로 역사에 남을 것입니다.",
    image: "/south_korea.png",
    bibleVerse: `"여호와께서 너를 지켜 모든 환난을 면하게 하시며 또 네 영혼을 지키시리로다" (시편 121:7)`,
    isEnding: true,
    isHiddenEnding: true,
    choices: [
      { text: "처음부터 다시 플레이", nextId: "start" }
    ]
  },
  ending_thai: {
    id: "ending_thai",
    title: "노말 엔딩: 미완의 자유",
    text: "태국의 작은 마을에 무사히 정착했습니다. 북송의 위험은 피했지만 신분증 없이 숨어 지내야 합니다. 언젠가는 {playerName}에게도 온전한 자유가 찾아오기를...",
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
    text: "아침이 밝자 라오스 국경 순찰대에게 잡혀 강제 북송되었습니다. 기독교인(대영교회 목사)과 접촉하려 한 죄로 {playerName}은(는) 악명 높은 '아오지 탄광(정치범수용소)'에 수감되었습니다...",
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
    text: "주어진 5번의 생존 기회를 모두 잃었습니다... 체력이 완전히 바닥나고 수비대에게 포위되었습니다. {playerName}은(는) 반동분자로 몰려 가족과 함께 관리소로 끌려가며 자유를 향한 여정은 비극으로 끝났습니다.",
    image: "/tumen_river.png",
    isTotalGameOver: true,
    choices: [
      { text: "포기하지 않고 처음부터 다시 시작하기", nextId: "start" }
    ]
  }
};
