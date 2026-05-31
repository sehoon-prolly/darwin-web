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
      "/assets/backgrounds/chapters/ch0-scene1.png",
      "/assets/backgrounds/chapters/ch0-scene1.png",
      "/assets/backgrounds/chapters/ch0-scene1.png",
      "/assets/backgrounds/chapters/ch0-scene1.png",
      "/assets/backgrounds/chapters/ch0-scene1.png",
      "/assets/backgrounds/chapters/ch0-scene1.png",
      "/assets/backgrounds/chapters/ch0-scene1.png",
      "/assets/backgrounds/chapters/ch0-scene1.png",
      "/assets/backgrounds/chapters/ch0-scene1.png",
      "/assets/backgrounds/chapters/ch0-scene1.png",
      "/assets/backgrounds/chapters/ch0-scene1.png",
      "/assets/backgrounds/chapters/ch0-rain-notice.png",
      "/assets/backgrounds/chapters/ch0-rain-notice.png",
      "/assets/backgrounds/chapters/ch0-rain-notice.png",
      "/assets/backgrounds/chapters/ch0-scene2.png",
      "/assets/backgrounds/chapters/ch0-scene3.png",
      "/assets/backgrounds/chapters/ch0-scene3.png",
      "/assets/backgrounds/chapters/ch0-scene3.png",
      "/assets/backgrounds/chapters/ch0-scene3.png",
      "/assets/backgrounds/chapters/ch0-scene3.png",
      "/assets/backgrounds/chapters/ch0-scene3.png",
      "/assets/backgrounds/chapters/ch0-scene4.png",
      "/assets/backgrounds/chapters/ch0-scene5.png",
    ],
    sceneContent: [
      {
        speakerName: "해설",
        dialogueText: "평화로운 하루다....",
      },
      {
        speakerName: "해설",
        dialogueText: "지난 한달 간 많은 일이 있었다.",
      },
      {
        speakerName: "해설",
        dialogueText: "분명 내일이 생명과학 시험이었고.",
      },
      {
        speakerName: "해설",
        dialogueText:
          "20분만 자고 일어나서 공부하려 했더니 이곳에 떨어졌다.",
      },
      {
        speakerName: "해설",
        dialogueText:
          "시간이 지나면 어련히 꿈에서 깨겠지 했는데 벌써 이곳 시간으로 한달이 지났다.",
      },
      {
        speakerName: "해설",
        dialogueText:
          "돌아갈 수 없는 걸까. 시험 걱정 없이 여기서 사는 것도 좋은 것 같기도 하고...",
      },
      {
        speakerName: "해설",
        dialogueText: "그런건 다 좋은데...",
      },
      {
        speakerName: "해설",
        dialogueText: "평범한 남고생이었던 내가...",
      },
      {
        speakerName: "나",
        dialogueText: "정신차려보니 여자아이가 되어있었다...!",
      },
      {
        speakerName: "나",
        dialogueText:
          "이 여자아이의 삶을 이어서 사는 것 같다. 옛날이라 그런가? 부모님이 간섭이 심해서 삶이 너무 재미가 없다.",
      },
      {
        speakerName: "나",
        dialogueText: "게다가 부모님께선 슬슬 결혼할 나이가 아니냐고 하신다.",
      },
      {
        speakerName: "나",
        dialogueText:
          "어차피 이곳에서의 삶이 계속되는 거라면 돈많은 남자 한번 꼬셔봐? 남자는 내가 잘 아니까...",
      },
      {
        speakerName: "나",
        dialogueText:
          "어? 갑자기 빗방울이 떨어진다. 평소랑 다르게 좀 심하게 오는데...",
      },
      {
        speakerName: "나",
        dialogueText: "급하게 천막 밑으로 뛰어왔다. 비는 언제 그칠까?",
      },
      {
        speakerName: "나",
        dialogueText: "심심한대로 이 벽보들이나 읽어볼까?",
      },
      {
        speakerName: "나",
        dialogueText: "다 읽고 나니 비가 그쳤다.",
      },
      {
        speakerName: "나",
        dialogueText: "보아하니 항해 조수를 구하는 것 같은데... 이거나 지원해볼까?",
      },
      {
        speakerName: "",
        dialogueText: "",
        choices: [
          {
            id: "support_beagle_voyage",
            label: "지원하기",
            nextSceneId: "chapter0-scene19",
          },
          {
            id: "decline_beagle_voyage",
            label: "지원하지 않기",
            endingId: "bad_no_voyage",
          },
        ],
      },
      {
        speakerName: "나",
        dialogueText: "그래. 이왕 이렇게 된거 재미있게 살아보자.",
      },
      {
        speakerName: "나",
        dialogueText:
          "그리고 미래에서 고등학교까지 다녔으니 분명 이곳의 사람들보다 똑똑할거야.",
      },
      {
        speakerName: "나",
        dialogueText:
          "배에는 잘생긴 남자들도 많지 않을까? 근데 내가 왜 잘생긴 남자를 원하고있지...?",
      },
      {
        speakerName: "해설",
        dialogueText:
          "어쨌든 지원하기로 결정하게 된다. 이후 연락을 받고, 마침내 한달 후인 비글호 승선 날이 다가온다.",
      },
      {
        speakerName: "해설",
        dialogueText: "비글호가 출항한다. 긴 항해와 낯선 관찰의 시간이 시작된다.",
      },
      {
        speakerName: "해설",
        dialogueText: "비글호는 리우데자네이루를 향해 긴 항해를 이어간다.",
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
      "/assets/backgrounds/chapters/ch1-scene4.png",
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
            nextSceneId: "chapter1-scene4",
          },
          {
            id: "rio_stay_silent",
            label: "선장과의 관계가 중요하니 침묵하는 편이 좋겠습니다.",
            gainedElements: ["incomplete_human_understanding"],
            nextSceneId: "chapter1-scene4",
          },
          {
            id: "rio_naturalize_domination",
            label: "강한 쪽이 약한 쪽을 지배하는 것은 자연스러운 일 아닐까요?",
            gainedElements: ["biased_view"],
            nextSceneId: "chapter1-scene4",
          },
        ],
      },
      {
        speakerName: "해설",
        dialogueText: "비글호는 티에라델푸에고로 향하는 항로에 오른다.",
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
      "/assets/backgrounds/chapters/ch2-scene4.png",
      "/assets/backgrounds/chapters/ch2-scene5.png",
    ],
    sceneContent: [
      {
        speakerName: "해설",
        dialogueText: "리우데자네이루를 떠난 비글호는 다시 남쪽 바다로 나아간다.",
      },
      {
        speakerName: "해설",
        dialogueText: "티에라델푸에고로 향하는 항로 위에서 다음 관찰지가 가까워진다.",
      },
      {
        speakerName: "해설",
        dialogueText:
          "리우데자네이루 인근 동굴에서 다윈은 서로 다른 동물들의 화석과 골격을 발견했다. 겉모습은 전혀 달랐지만, 뼈의 배치가 묘하게 닮아 있었다.",
      },
      {
        speakerName: "다윈",
        dialogueText:
          "고래의 지느러미, 박쥐의 날개, 인간의 팔... 기능도 모양도 다르지만 뼈 구조가 비슷해 보이는군. 이것이 단순한 우연일까, 아니면 어떤 공통된 기원을 가리키는 걸까?",
      },
      {
        speakerName: "해설",
        dialogueText:
          "표본들을 직접 비교해보자. 각 동물의 앞다리와 뼈 구조 특성을 올바르게 연결해 공통점을 찾아보아라.",
        miniGameType: "skeletonMatching",
      },
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
    sceneContent: [
      {
        speakerName: "해설",
        dialogueText:
          "티에라델푸에고에 도착한 비글호. 피츠로이 선장이 '문명화'시킨 원주민 세 명을 고향 땅으로 돌려보내면서, 영국 선교사들도 함께 이 땅에 발을 들였다.",
      },
      {
        speakerName: "다윈",
        dialogueText:
          "선교사들이 이 땅에 자리를 잡으려 한다. 과학 탐사와 함께 이루어지는 이 장면... 이 상황의 배경을 제대로 이해하는 것이 중요할 것 같군.",
      },
      {
        speakerName: "해설",
        dialogueText:
          "마을 사람들 사이에서 영국에서 온 선교사들을 찾아보아라. 제한 시간 안에 선교사를 식별해야 한다.",
        miniGameType: "missionaryClick",
      },
    ],
  },
  {
    id: "chapter4",
    title: "CH.4 티에라델푸에고의 밤 - 식인종 이야기와 공포",
    location: "티에라델푸에고",
    backgroundImages: [
      "/assets/backgrounds/chapters/ch4-scene1.png",
      "/assets/backgrounds/chapters/ch4-scene2.png",
      "/assets/backgrounds/chapters/ch4-scene3.png",
    ],
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
            nextSceneId: "chapter4-scene2",
          },
          {
            id: "fuegian_question_fear",
            label: "공포스러운 이야기만으로 한 집단을 판단할 수는 없습니다.",
            gainedElements: ["human_diversity"],
            nextSceneId: "chapter4-scene2",
          },
          {
            id: "fuegian_conditions_matter",
            label: "야만성은 특정 집단의 본성이 아니라 조건에 따라 나타날 수 있습니다.",
            gainedElements: ["balanced_view_of_evolution"],
            nextSceneId: "chapter4-scene2",
          },
        ],
      },
      {
        speakerName: "해설",
        dialogueText: "비글호는 티에라델푸에고를 뒤로하고 다시 바다로 나아간다.",
      },
      {
        speakerName: "해설",
        dialogueText: "다음 항로는 갈라파고스 제도를 향한다.",
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
      "/assets/backgrounds/chapters/ch6-scene1.png",
      "/assets/backgrounds/chapters/ch6-scene2.png",
      "/assets/backgrounds/chapters/ch6-scene3.png",
    ],
    sceneContent: [
      {
        speakerName: "해설",
        dialogueText:
          "비글호는 오스트레일리아에 기항했다. 영국은 이곳을 죄수 유배지로 삼아 개척하고 있었다. 광활한 땅과 한정된 자원, 그리고 치열한 생존 경쟁이 펼쳐지는 곳.",
      },
      {
        speakerName: "다윈",
        dialogueText:
          "유배된 죄수들이 탈주를 시도하고 있다. 한정된 자원을 두고 벌어지는 경쟁과 투쟁 — 이것이 자연 세계에서 일어나는 일과 과연 다를까?",
      },
      {
        speakerName: "해설",
        dialogueText:
          "탈주를 시도하는 죄수들을 찾아내어라. 생존을 위한 경쟁이 어떤 모습인지 직접 눈으로 확인해보자.",
        miniGameType: "prisonerClick",
      },
    ],
  },
  {
    id: "chapter7",
    title: "CH.7 갈라파고스 - 분류가 먼저다",
    location: "갈라파고스 제도",
    backgroundImages: [
      "/assets/backgrounds/chapters/ch7-scene1.png",
      "/assets/backgrounds/chapters/ch7-scene2.png",
      "/assets/backgrounds/chapters/ch7-scene3.png",
      "/assets/backgrounds/chapters/ch7-scene4.png",
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
    backgroundImages: ["/assets/backgrounds/chapters/ch8-scene1.png"],
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
    backgroundImages: ["/assets/backgrounds/chapters/ch9-scene1.png"],
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
