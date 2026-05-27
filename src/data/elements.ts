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
  common_structure_discovery: {
    id: "common_structure_discovery",
    label: "공통 구조의 발견",
    category: "science",
    description: "서로 다른 생물의 골격과 화석에서 대응되는 구조를 발견했다.",
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
  incomplete_fossil_interpretation: {
    id: "incomplete_fossil_interpretation",
    label: "불완전한 화석 해석",
    category: "negative",
    description: "화석과 골격의 유사성을 보았지만 공통 구조로 연결하지 못했다.",
  },
  observation_failure: {
    id: "observation_failure",
    label: "관찰 실패",
    category: "negative",
    description: "표본과 화석의 중요한 차이와 대응 관계를 놓쳤다.",
  },
  incomplete_human_understanding: {
    id: "incomplete_human_understanding",
    label: "불완전한 인간 이해",
    category: "negative",
    description: "인간 집단의 차이를 환경과 문화의 맥락 안에서 충분히 해석하지 못했다.",
  },
  biased_view: {
    id: "biased_view",
    label: "편향된 견해",
    category: "negative",
    description: "인간 집단의 차이를 우열로 해석하는 위험한 관점.",
  },
  incomplete_natural_selection: {
    id: "incomplete_natural_selection",
    label: "불완전한 자연선택 이해",
    category: "negative",
    description: "자원 제한과 생존 경쟁의 의미를 생물 세계의 변화와 충분히 연결하지 못했다.",
  },
  social_darwinism_misunderstanding: {
    id: "social_darwinism_misunderstanding",
    label: "사회 다윈주의적 오해",
    category: "negative",
    description: "자연선택을 인간 사회의 지배와 경쟁 정당화로 오해했다.",
  },
  imperialism_bias: {
    id: "imperialism_bias",
    label: "제국주의적 편향",
    category: "negative",
    description: "제국의 확장과 질서를 당연한 것으로 받아들이는 관점.",
  },
  social_context_missing: {
    id: "social_context_missing",
    label: "사회적 맥락 결여",
    category: "negative",
    description: "과학 탐사가 이루어진 제국주의적, 사회적 배경을 분리해서 보았다.",
  },
  incomplete_evolution_understanding: {
    id: "incomplete_evolution_understanding",
    label: "불완전한 진화 이해",
    category: "negative",
    description: "생존에 직접 유리하지 않은 형질이 유지되는 이유를 설명하지 못했다.",
  },
  observation_disconnect: {
    id: "observation_disconnect",
    label: "관찰 단절",
    category: "negative",
    description: "독특한 생물의 형질을 관찰했지만 이론적 단서로 연결하지 못했다.",
  },
};

export const elementList = Object.values(gameElements);
