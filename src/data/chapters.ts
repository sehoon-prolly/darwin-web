import type { Chapter, Scene } from "../types/game";

const leftCharacterImage = "/assets/characters/player-original.png";
const rightCharacterImage = "/assets/characters/darwin-original.png";

type ChapterConfig = {
  id: string;
  title: string;
  location: string;
  backgroundImages: string[];
  sceneContent?: Array<
    Partial<
      Pick<
        Scene,
        "speakerName" | "dialogueText" | "choices" | "miniGameType"
      >
    >
  >;
};

const chapterConfigs: ChapterConfig[] = [
  {
    id: "chapter0",
    title: "CH.0 런던 - 조수 모집 공고",
    location: "런던",
    backgroundImages: [
      "/assets/backgrounds/chapters/ch0-scene1.png",
      "/assets/backgrounds/chapters/ch0-scene2.png",
      "/assets/backgrounds/chapters/ch0-scene2.png",
      "/assets/backgrounds/chapters/ch0-scene3.png",
      "/assets/backgrounds/chapters/ch0-scene4.png",
    ],
    sceneContent: [
      {
        speakerName: "해설",
        dialogueText:
          "런던의 어느 거리, 항구로 향하는 길목에서 낯선 공고가 눈에 들어왔다.",
      },
      {
        speakerName: "해설",
        dialogueText: "게시판에 붙은 공고들 중 하나가 이상하게 눈에 들어온다.",
      },
      {
        speakerName: "해설",
        dialogueText:
          "공고에는 비글호 항해에 동행할 조수를 찾는다는 내용이 적혀 있다.",
      },
      {
        speakerName: "",
        dialogueText: "",
        choices: [
          {
            id: "support_beagle_voyage",
            label: "비글호 탑승 지원",
            nextSceneId: "chapter0-scene5",
          },
          {
            id: "decline_beagle_voyage",
            label: "탑승 지원 X",
            endingId: "bad_no_voyage",
          },
        ],
      },
      {
        speakerName: "해설",
        dialogueText: "비글호가 출항한다. 긴 항해와 낯선 관찰의 시간이 시작된다.",
      },
    ],
  },
  {
    id: "chapter1",
    title: "CH.1 리우데자네이루 - 노예제와 피츠로이 선장",
    location: "리우데자네이루",
    backgroundImages: [
      "/assets/backgrounds/chapters/ch1-scene1.png",
      "/assets/backgrounds/chapters/ch1-scene2.png",
      "/assets/backgrounds/chapters/ch1-scene3.png",
    ],
    sceneContent: [
      {
        speakerName: "해설",
        dialogueText:
          "리우데자네이루에 도착한 다윈은 화려한 항구 뒤편의 불편한 현실을 마주한다.",
      },
      {
        speakerName: "다윈",
        dialogueText:
          "거리에서 본 장면이 머릿속을 떠나지 않는군. 사람을 소유물처럼 다루는 제도를 어떻게 보아야 할까?",
      },
      {
        speakerName: "피츠로이",
        dialogueText: "항해에는 질서가 필요하지. 자네는 다윈에게 어떤 말을 건네겠나?",
        choices: [
          {
            id: "rio_criticize_slavery",
            label: "인간을 소유물처럼 다루는 제도는 비판받아야 합니다.",
            gainedElements: ["balanced_view_of_evolution"],
            nextChapterId: "chapter2",
          },
          {
            id: "rio_stay_silent",
            label: "선장과의 관계가 중요하니 침묵하는 편이 좋겠습니다.",
            gainedElements: ["incomplete_human_understanding"],
            nextChapterId: "chapter2",
          },
          {
            id: "rio_naturalize_domination",
            label: "강한 쪽이 약한 쪽을 지배하는 것은 자연스러운 일 아닐까요?",
            gainedElements: ["biased_view"],
            nextChapterId: "chapter2",
          },
        ],
      },
    ],
  },
  {
    id: "chapter2",
    title: "CH.2 리우데자네이루 인근 동굴 - 화석과 공통 구조",
    location: "리우데자네이루 인근 동굴",
    backgroundImages: [
      "/assets/backgrounds/chapters/ch2-scene1.png",
      "/assets/backgrounds/chapters/ch2-scene2.png",
      "/assets/backgrounds/chapters/ch2-scene3.png",
    ],
  },
  {
    id: "chapter3",
    title: "CH.3 티에라델푸에고 - 선교사를 찾아라",
    location: "티에라델푸에고",
    backgroundImages: [
      "/assets/backgrounds/chapters/ch3-scene1.png",
      "/assets/backgrounds/chapters/ch3-scene2.png",
      "/assets/backgrounds/chapters/ch3-scene3.png",
    ],
  },
  {
    id: "chapter4",
    title: "CH.4 티에라델푸에고의 밤 - 식인종 이야기와 공포",
    location: "티에라델푸에고",
    backgroundImages: ["/assets/backgrounds/chapters/ch4-scene1.png"],
    sceneContent: [
      {
        speakerName: "다윈",
        dialogueText:
          "밤의 이야기는 낯선 집단에 대한 공포를 키운다. 우리는 이 이야기를 어떻게 받아들여야 할까?",
        choices: [
          {
            id: "fuegian_fear_as_nature",
            label: "이 이야기는 그들이 본질적으로 잔인하다는 증거입니다.",
            gainedElements: ["biased_view"],
            nextChapterId: "chapter5",
          },
          {
            id: "fuegian_question_fear",
            label: "공포스러운 이야기만으로 한 집단을 판단할 수는 없습니다.",
            gainedElements: ["human_diversity"],
            nextChapterId: "chapter5",
          },
          {
            id: "fuegian_conditions_matter",
            label: "야만성은 특정 집단의 본성이 아니라 조건에 따라 나타날 수 있습니다.",
            gainedElements: ["balanced_view_of_evolution"],
            nextChapterId: "chapter5",
          },
        ],
      },
    ],
  },
  {
    id: "chapter5",
    title: "CH.5 항해 중 독서 - 맬서스의 인구론",
    location: "비글호",
    backgroundImages: [
      "/assets/backgrounds/chapters/ch5-scene1.png",
      "/assets/backgrounds/chapters/ch5-scene2.png",
      "/assets/backgrounds/chapters/ch5-scene3.png",
    ],
    sceneContent: [
      {
        speakerName: "해설",
        dialogueText:
          "티에라델푸에고를 떠난 비글호는 다시 바다 위로 나아간다.",
      },
      {
        speakerName: "해설",
        dialogueText:
          "갑판 위의 바람 속에서 다윈은 생물과 인간 사회를 함께 떠올리기 시작한다.",
      },
      {
        speakerName: "다윈",
        dialogueText:
          "자원이 한정되어 있다면, 생물 세계의 변화도 경쟁과 연결될 수 있을까?",
        choices: [
          {
            id: "malthus_limited_resources",
            label: "자원이 한정되어 있다면 생존 경쟁이 발생할 수 있습니다.",
            gainedElements: ["competition_structure"],
            nextChapterId: "chapter6",
          },
          {
            id: "malthus_equal_conditions",
            label: "모든 개체는 동일한 조건에서 살아남습니다.",
            gainedElements: ["incomplete_natural_selection"],
            nextChapterId: "chapter6",
          },
          {
            id: "malthus_justify_domination",
            label: "강한 자가 약한 자를 지배하는 것은 언제나 정당합니다.",
            gainedElements: ["social_darwinism_misunderstanding"],
            nextChapterId: "chapter6",
          },
        ],
      },
    ],
  },
  {
    id: "chapter6",
    title: "CH.6 오스트레일리아로 향하는 배 - 죄수를 잡아라",
    location: "오스트레일리아 / 비글호",
    backgroundImages: [
      "/assets/backgrounds/chapters/ch7-scene1.png",
      "/assets/backgrounds/chapters/ch7-scene2.png",
      "/assets/backgrounds/chapters/ch7-scene3.png",
    ],
  },
  {
    id: "chapter7",
    title: "CH.7 갈라파고스 - 분류가 먼저다",
    location: "갈라파고스 제도",
    backgroundImages: [
      "/assets/backgrounds/chapters/ch6-scene1.png",
      "/assets/backgrounds/chapters/ch6-scene1.png",
      "/assets/backgrounds/chapters/ch6-scene1.png",
      "/assets/backgrounds/chapters/ch6-scene1.png",
    ],
    sceneContent: [
      {
        speakerName: "해설",
        dialogueText:
          "비글호는 마침내 갈라파고스 제도에 닿았다. 섬마다 비슷하면서도 어딘가 다른 새 표본들이 모였다.",
      },
      {
        speakerName: "다윈",
        dialogueText:
          "이 새들은 꽤 비슷해 보이는군. 굳이 섬별로 나누어 기록해야 할까?",
        choices: [
          {
            id: "classification_is_needed",
            label: "분류가 필요합니다.",
            gainedElements: ["classification_need"],
            nextSceneId: "chapter7-scene3",
          },
          {
            id: "classification_is_not_needed",
            label: "분류가 필요하지 않습니다.",
            gainedElements: ["classification_failure"],
            nextChapterId: "chapter8",
          },
        ],
      },
      {
        speakerName: "다윈",
        dialogueText: "그렇다면 무엇을 기준으로 분류해야 하지?",
        choices: [
          {
            id: "classify_by_beak",
            label: "부리 형태",
            gainedElements: ["environment_adaptation_clue"],
            nextSceneId: "chapter7-scene4",
          },
          {
            id: "classify_by_wing",
            label: "날개 모양",
            gainedElements: ["incomplete_classification"],
            nextChapterId: "chapter8",
          },
          {
            id: "classify_by_body_size",
            label: "몸집의 크기",
            gainedElements: ["incomplete_classification"],
            nextChapterId: "chapter8",
          },
        ],
      },
      {
        speakerName: "해설",
        dialogueText: "부리 형태와 먹이의 관계를 맞춰 표본의 차이를 설명해보자.",
        miniGameType: "beakFoodMatching",
      },
    ],
  },
  {
    id: "chapter8",
    title: "CH.8 갈라파고스 - 성선택이라는 추가 단서",
    location: "갈라파고스 제도",
    backgroundImages: ["/assets/backgrounds/galapagos-finches.svg"],
    sceneContent: [
      {
        speakerName: "다윈",
        dialogueText:
          "생존에 꼭 유리해 보이지 않는 화려한 형질도 남아 있다. 이런 특징은 어떻게 설명할 수 있을까?",
        choices: [
          {
            id: "sexual_selection_success",
            label: "어떤 형질은 생존보다 짝짓기 성공에 영향을 줄 수 있습니다.",
            gainedElements: ["sexual_selection_concept"],
            nextChapterId: "chapter9",
          },
          {
            id: "sexual_selection_only_survival",
            label: "생존에 불리한 형질은 모두 사라져야 합니다.",
            gainedElements: ["incomplete_evolution_understanding"],
            nextChapterId: "chapter9",
          },
          {
            id: "sexual_selection_exception",
            label: "화려한 생물은 그냥 예외입니다.",
            gainedElements: ["observation_disconnect"],
            nextChapterId: "chapter9",
          },
        ],
      },
    ],
  },
  {
    id: "chapter9",
    title: "CH.9 최종 장 - 다윈의 원고를 완성하라",
    location: "다윈의 서재",
    backgroundImages: ["/assets/backgrounds/darwin-study.svg"],
    sceneContent: [
      {
        speakerName: "해설",
        dialogueText: "지금까지 모은 단서 중 최종 원고에 포함할 요소를 선택하자.",
      },
    ],
  },
];

function createScene(
  chapterConfig: ChapterConfig,
  chapterIndex: number,
  sceneIndex: number,
): Scene {
  const sceneNumber = sceneIndex + 1;
  const sceneCount = chapterConfig.backgroundImages.length;
  const isLastScene = sceneNumber === sceneCount;
  const nextSceneId = `${chapterConfig.id}-scene${sceneNumber + 1}`;
  const nextChapterId = chapterConfigs[chapterIndex + 1]?.id;
  const sceneContent = chapterConfig.sceneContent?.[sceneIndex] ?? {};

  return {
    id: `${chapterConfig.id}-scene${sceneNumber}`,
    speakerName: sceneContent.speakerName ?? "",
    dialogueText: sceneContent.dialogueText ?? "",
    backgroundImage: chapterConfig.backgroundImages[sceneIndex],
    leftCharacterImage,
    rightCharacterImage,
    ...(sceneContent.choices ? { choices: sceneContent.choices } : {}),
    ...(sceneContent.miniGameType
      ? { miniGameType: sceneContent.miniGameType }
      : {}),
    ...(isLastScene
      ? nextChapterId
        ? { nextChapterId }
        : {}
      : { nextSceneId }),
  };
}

function createChapter(chapterConfig: ChapterConfig, chapterIndex: number): Chapter {
  return {
    id: chapterConfig.id,
    title: chapterConfig.title,
    location: chapterConfig.location,
    scenes: chapterConfig.backgroundImages.map((_, index) =>
      createScene(chapterConfig, chapterIndex, index),
    ),
  };
}

export const chapters: Chapter[] = chapterConfigs.map((chapterConfig, index) =>
  createChapter(chapterConfig, index),
);

export const chapterMap = Object.fromEntries(
  chapters.map((chapter) => [chapter.id, chapter]),
);
