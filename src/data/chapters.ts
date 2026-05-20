import type { Chapter } from "../types/game";

export const chapters: Chapter[] = [
  {
    id: "chapter0",
    title: "Chapter 0. 런던 — 조수 모집 공고",
    location: "런던 항구",
    scenes: [
      {
        id: "london_street",
        speakerName: "해설",
        dialogueText:
          "1831년의 런던. 항구 근처의 벽보마다 탐험, 표본, 식민지, 신문 광고가 어지럽게 붙어 있다.",
        backgroundImage: "/assets/backgrounds/wall-paper.png",
        leftCharacterImage: "/assets/characters/player-original.png",
        rightCharacterImage: "/assets/characters/darwin-original.png",
        nextSceneId: "assistant_notice",
      },
      {
        id: "assistant_notice",
        speakerName: "나",
        dialogueText:
          "잠깐, 이 공고는 뭐지? 비글호에서 자연사 표본을 기록할 조수를 찾는다고 적혀 있다.",
        backgroundImage: "/assets/backgrounds/london-notice-photo.png",
        leftCharacterImage: "/assets/characters/player-original.png",
        rightCharacterImage: "/assets/characters/darwin-original.png",
        nextSceneId: "apply_choice",
      },
      {
        id: "apply_choice",
        speakerName: "다윈의 조수 모집 공고",
        dialogueText:
          "지원한다면 낯선 생물과 지질 표본, 그리고 다윈의 질문들을 함께 마주하게 될 것이다.",
        backgroundImage: "/assets/backgrounds/london-notice-photo.png",
        leftCharacterImage: "/assets/characters/player-original.png",
        rightCharacterImage: "/assets/characters/darwin-original.png",
        choices: [
          {
            id: "apply_beagle",
            label: "비글호 탑승 지원",
            nextChapterId: "chapter7",
            gainedElements: ["voyage_start"],
            effect: "요소 획득: 항해의 시작",
          },
          {
            id: "decline_beagle",
            label: "탑승 지원 X",
            endingId: "bad_no_voyage",
            effect: "즉시 개그성 배드 엔딩",
          },
        ],
      },
    ],
  },
  {
    id: "chapter7",
    title: "Chapter 7. 갈라파고스 — 분류가 먼저다",
    location: "갈라파고스 제도",
    scenes: [
      {
        id: "galapagos_classification",
        speakerName: "다윈",
        dialogueText:
          "이 새들은 꽤 비슷해 보이는군. 굳이 섬별로 나누어 기록해야 할까?",
        backgroundImage: "/assets/backgrounds/galapagos-specimens.svg",
        leftCharacterImage: "/assets/characters/player-original.png",
        rightCharacterImage: "/assets/characters/darwin-original.png",
        choices: [
          {
            id: "need_classification",
            label: "분류가 필요합니다.",
            nextSceneId: "galapagos_criteria",
            gainedElements: ["classification_need"],
            effect: "요소 획득: 분류의 필요성",
          },
          {
            id: "no_classification",
            label: "분류가 필요하지 않습니다.",
            nextChapterId: "chapter9",
            gainedElements: ["classification_failure"],
            effect: "요소 획득: 분류 실패",
          },
        ],
      },
      {
        id: "galapagos_criteria",
        speakerName: "다윈",
        dialogueText: "그렇다면 무엇을 기준으로 분류해야 하지?",
        backgroundImage: "/assets/backgrounds/galapagos-worktable.svg",
        leftCharacterImage: "/assets/characters/player-original.png",
        rightCharacterImage: "/assets/characters/darwin-original.png",
        choices: [
          {
            id: "classify_by_beak",
            label: "부리 형태",
            nextSceneId: "beak_food_game",
            gainedElements: ["environment_adaptation_clue"],
            effect: "요소 획득: 환경 적응의 단서",
          },
          {
            id: "classify_by_wing",
            label: "날개 모양",
            nextChapterId: "chapter9",
            gainedElements: ["incomplete_classification"],
            effect: "요소 획득: 불완전한 분류 기준",
          },
          {
            id: "classify_by_size",
            label: "몸집의 크기",
            nextChapterId: "chapter9",
            gainedElements: ["incomplete_classification"],
            effect: "요소 획득: 불완전한 분류 기준",
          },
        ],
      },
      {
        id: "beak_food_game",
        speakerName: "다윈",
        dialogueText:
          "좋아. 이제 각 섬의 먹이와 핀치새 부리 형태를 연결해 보자. 관계가 맞아떨어진다면 더 큰 단서가 될 거야.",
        backgroundImage: "/assets/backgrounds/galapagos-finches.svg",
        leftCharacterImage: "/assets/characters/player-original.png",
        rightCharacterImage: "/assets/characters/darwin-original.png",
        miniGameType: "beakFoodMatching",
        nextChapterId: "chapter9",
      },
    ],
  },
  {
    id: "chapter9",
    title: "Chapter 9. 최종 장 — 다윈의 원고를 완성하라",
    location: "다윈의 서재",
    scenes: [
      {
        id: "final_manuscript",
        speakerName: "다윈",
        dialogueText:
          "항해에서 얻은 단서들을 원고에 넣어 보자. 어떤 요소를 포함하느냐에 따라 이 이론의 방향이 달라질 것이다.",
        backgroundImage: "/assets/backgrounds/darwin-study.svg",
        leftCharacterImage: "/assets/characters/player-original.png",
        rightCharacterImage: "/assets/characters/darwin-original.png",
      },
    ],
  },
];

export const chapterMap = Object.fromEntries(
  chapters.map((chapter) => [chapter.id, chapter]),
);
