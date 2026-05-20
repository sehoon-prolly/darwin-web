import type { GameElement } from "../types/game";

export const gameElements: Record<string, GameElement> = {
  classification_need: {
    id: "classification_need",
    label: "분류의 필요성",
    category: "science",
    description: "비슷해 보이는 표본도 지역과 특징에 따라 나누어 기록해야 한다.",
  },
  environment_adaptation_clue: {
    id: "environment_adaptation_clue",
    label: "환경 적응의 단서",
    category: "science",
    description: "부리 형태가 먹이와 서식 환경에 연결될 수 있다는 단서.",
  },
  natural_selection_clue: {
    id: "natural_selection_clue",
    label: "자연선택의 핵심 단서",
    category: "science",
    description: "환경에 더 잘 맞는 형질이 생존과 번식에 유리할 수 있다.",
  },
  human_diversity: {
    id: "human_diversity",
    label: "인간 다양성의 이해",
    category: "human",
    description: "인간 집단의 차이를 단순한 우열이 아니라 환경과 문화의 차이로 본다.",
  },
  balanced_view_of_evolution: {
    id: "balanced_view_of_evolution",
    label: "진화에 대한 고른 관점",
    category: "human",
    description: "인간도 생물학적 변화와 다양성의 맥락 안에서 균형 있게 바라본다.",
  },
  imperialism_shadow: {
    id: "imperialism_shadow",
    label: "제국주의의 이면",
    category: "empire",
    description: "과학 탐사와 제국 확장이 같은 시대적 배경 위에 있었음을 이해한다.",
  },
  competition_structure: {
    id: "competition_structure",
    label: "경쟁의 구조",
    category: "empire",
    description: "자원 제한과 경쟁 개념을 사회적 오해 없이 조심스럽게 다룬다.",
  },
  sexual_selection_concept: {
    id: "sexual_selection_concept",
    label: "성선택 관념",
    category: "sexualSelection",
    description: "생존뿐 아니라 짝짓기 성공이 형질 유지에 영향을 줄 수 있다는 관점.",
  },
  classification_failure: {
    id: "classification_failure",
    label: "분류 실패",
    category: "negative",
    description: "표본의 차이를 기록하지 않아 중요한 과학적 단서를 놓쳤다.",
  },
  incomplete_classification: {
    id: "incomplete_classification",
    label: "불완전한 분류 기준",
    category: "negative",
    description: "차이는 보았지만 먹이와 환경 적응으로 연결하지 못했다.",
  },
  incomplete_adaptation: {
    id: "incomplete_adaptation",
    label: "불완전한 환경 적응 이해",
    category: "negative",
    description: "부리와 먹이의 관계를 충분히 설명하지 못했다.",
  },
  biased_view: {
    id: "biased_view",
    label: "편향된 견해",
    category: "negative",
    description: "인간 집단의 차이를 우열로 해석하는 위험한 관점.",
  },
  social_darwinism_misunderstanding: {
    id: "social_darwinism_misunderstanding",
    label: "사회 다윈주의적 오해",
    category: "negative",
    description: "자연선택을 인간 사회의 지배와 경쟁 정당화로 오해했다.",
  },
};

export const elementList = Object.values(gameElements);
