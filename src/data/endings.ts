import type { Ending } from "../types/game";

export const endings: Record<string, Ending> = {
  bad_no_voyage: {
    id: "bad_no_voyage",
    title: "그저그런 인생",
    description:
      "당신은 지원을 안하고 그저그런 삶을 살다가 죽었습니다. 이유는 모르지만 현생으로 돌아가지도 못하고 말이죠...",
  },
  ending_failed_publication: {
    id: "ending_failed_publication",
    title: "진화론 출판 실패",
    description:
      "다윈은 충분한 관찰과 분류의 단서를 얻지 못했다. 생물의 차이를 설명할 핵심 구조가 부족해 원고는 출판되지 못했다.",
    backgroundImage: "/assets/backgrounds/endings/ending-1.png",
  },
  ending_human_superiority: {
    id: "ending_human_superiority",
    title: "인간 우월 중심 진화론",
    description:
      "생물의 변화는 설명했지만 인간을 진화론적 관점 안에 균형 있게 포함하지 못했다.",
    backgroundImage: "/assets/backgrounds/endings/ending-2.png",
  },
  ending_social_darwinism: {
    id: "ending_social_darwinism",
    title: "사회 다윈주의적 진화론",
    description:
      "자연선택 개념이 인간 사회의 지배와 경쟁을 정당화하는 방향으로 오해될 위험을 남겼다.",
    backgroundImage: "/assets/backgrounds/endings/ending-3.png",
  },
  ending_double_problem: {
    id: "ending_double_problem",
    title: "두 문제가 모두 발생한 진화론",
    description:
      "생물학적 관찰에는 성공했지만 인간에 대한 편향과 제국주의적 사고를 충분히 넘어서지 못했다.",
    backgroundImage: "/assets/backgrounds/endings/ending-4.png",
  },
  ending_normal_theory: {
    id: "ending_normal_theory",
    title: "정상적인 진화론 출판",
    description:
      "다윈은 생물의 차이, 환경 적응, 자연선택, 인간 다양성, 사회적 배경을 균형 있게 반영한 진화론을 출판했다.",
    backgroundImage: "/assets/backgrounds/endings/ending-5.png",
  },
  ending_advanced_theory: {
    id: "ending_advanced_theory",
    title: "진보된 진화론 출판",
    description:
      "다윈은 자연선택뿐 아니라 성선택의 가능성까지 원고에 포함했다. 그 결과 실제 역사보다도 더 확장된 형태의 진화론이 출판되었다.",
    backgroundImage: "/assets/backgrounds/endings/ending-6.png",
  },
};
