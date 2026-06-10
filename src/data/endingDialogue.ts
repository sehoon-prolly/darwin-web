export type EndingDialogueLine = {
  speaker: string;
  text: string;
};

export type EndingScript = {
  preScene: EndingDialogueLine[];
  postScene?: EndingDialogueLine[];
};

const commonPreScene: EndingDialogueLine[] = [
  { speaker: "나", text: "어...?" },
  { speaker: "나", text: "뭐지 갑자기 눈앞이 어두워졌어... 아무것도 안보여..." },
  { speaker: "???", text: "일정을 마쳤군요" },
  { speaker: "나", text: "뭐야 또 너야?" },
  { speaker: "???", text: "특별히 아주 약간 앞으로 보내드렸습니다." },
  { speaker: "나", text: "?? 무슨 얘기야" },
  { speaker: "???", text: "앞으론 시험공부는 미리미리 하시기 바랍니다. 안그러면 정말 힘듭니다..." },
  { speaker: "나", text: "무슨소리야. 넌 누구야." },
  { speaker: "???", text: "대학교에 가서도 미리미리 시험공부 하시기 바랍니다. 안그러면 정말 힘듭니다..." },
  { speaker: "나", text: "??? 대학생이야 너?" },
  { speaker: "해설", text: "갑자기 눈 앞이 밝아진다." },
  { speaker: "???", text: "야 너! 그만 자고 일어나!" },
];

export const endingDialogue: Record<string, EndingScript> = {
  ending_failed_publication: {
    preScene: [
      { speaker: "???", text: "복습 철저히 하라고 했는데..." },
      { speaker: "나", text: "?? 또 너야?" },
      { speaker: "나", text: "그리고 난 최선을 다 했다고... 공부를 안해서 잘 모르겠는데 어떡해..." },
      { speaker: "???", text: "변명은 됐습니다. 다시 공부하시길..." },
    ],
  },
  ending_human_superiority: {
    preScene: commonPreScene,
    postScene: [
      { speaker: "나", text: "??? 뭐야 교실?" },
      { speaker: "쌤", text: "자 다윈은 인간을 대상으로 한 진화론을 펼쳤지만! 전체 생물들의 계통을 파악하지는 못한 반쪽짜리 진화론이었어요~" },
      { speaker: "나", text: "원래 저랬나...? 모르겠다. 공부나 하자." },
      { speaker: "해설", text: "당신의 선택으로 인해 사실이 약간 바뀐 것 같다..." },
    ],
  },
  ending_social_darwinism: {
    preScene: commonPreScene,
    postScene: [
      { speaker: "나", text: "??? 뭐야 교실?" },
      { speaker: "쌤", text: "다윈은 과학적으로는 자연선택, 동일 조상 등 중요한 개념들을 제시했어요!" },
      { speaker: "쌤", text: "하지만 자연의 원리대로 사회 구성원들도 강자가 약자를 지배하며 자연선택되는 것이 당연하다는 논리를 펼쳤죠" },
      { speaker: "쌤", text: "다윈의 이러한 견해는 후대에도 많은 논란을 불러 일으켰어요!" },
      { speaker: "나", text: "원래도 저랬나...? 하긴 다윈 그녀석 약간 인종차별 주의자였어." },
      { speaker: "해설", text: "... 그런게 아니라 당신의 선택으로 사실이 약간 바뀐 것 같다...!" },
    ],
  },
  ending_double_problem: {
    preScene: commonPreScene,
    postScene: [
      { speaker: "나", text: "??? 뭐야 교실?" },
      { speaker: "쌤", text: "다윈은 과학적으로 중요한 진화론의 개념은 대부분 제시했지만," },
      { speaker: "쌤", text: "인간과 다른 생물을 격이 다른 존재로 보고, 또 인간 안에서 강자가 약자를 지배하는 논리를 옹호하는 등, 많은 논란을 불러 일으켰어요!" },
      { speaker: "나", text: "그정도로 나쁜 사람은 아니었던 것 같은데... 역시 사람은 겉보기랑은 다른가? 내가 그렇게 나쁜 말을 했었던건가...?" },
      { speaker: "해설", text: "사실이 많이 바뀐 것 같다... 다시 바로잡아볼까?" },
    ],
  },
  ending_normal_theory: {
    preScene: commonPreScene,
    postScene: [
      { speaker: "나", text: "??? 뭐야 교실?" },
      { speaker: "쌤", text: "이처럼 다윈은 동일 조상, 자연선택 등의 주요한 과학적 개념들을 주장했어요" },
      { speaker: "쌤", text: "그런데, 공작새의 날개는 포식자들에게 눈에 띄어 생존에 불리할 수도 있잖아요?" },
      { speaker: "쌤", text: "그렇다면 이런 반례들은 어떻게 설명했을까요?" },
      { speaker: "쌤", text: "이는 후대 진화론 학자들이 더욱 정교한 이론을 제시하며 해결했어요." },
      { speaker: "쌤", text: "어쨌든 다윈은 최초로 진화론의 주요한 개념들을 제시한 위대한 학자라고 할 수 있겠어요." },
      { speaker: "나", text: "다윈이 그정도 사람이었다니... 새삼 다시 느껴지네." },
      { speaker: "나", text: "어쨌든 그건 그거고. 공부 미리미리 좀 하자. 화이팅!" },
      { speaker: "해설", text: "여러분도 시험공부 화이팅 하세요" },
    ],
  },
  ending_advanced_theory: {
    preScene: commonPreScene,
    postScene: [
      { speaker: "나", text: "??? 뭐야 교실?" },
      { speaker: "쌤", text: "이처럼 다윈은 동일 조상, 자연선택 등의 주요한 과학적 개념들을 주장했어요" },
      { speaker: "쌤", text: "추가로 다윈은 공작새의 화려한 날개처럼, 생존에 불리해보이는 형질이 남는 것도 '성선택'이라는 개념을 도입해 설명했어요." },
      { speaker: "쌤", text: "당대의 인식에 비해 굉장히 혁신적인 개념과 아이디어들을 도입했다고 할 수 있죠!" },
      { speaker: "나", text: "뭐야 내가 했던 얘기랑 비슷한 것 같은데...?" },
      { speaker: "나", text: "좀 억울하긴 하지만 어쨌든 더 세상이 좋아진거니까. 나는 시험공부나 마저 하자. 이번에는 미리미리!" },
      { speaker: "해설", text: "매번 어렵지만 시험공부는 미리미리 합시다! 다들 화이팅!" },
    ],
  },
};
