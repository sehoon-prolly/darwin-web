import type { Chapter, Scene } from "../types/game";

const leftCharacterImage = "/assets/characters/player-original.png";
const rightCharacterImage = "/assets/characters/darwin-original.png";
const repeatImage = (imagePath: string, count: number) =>
  Array<string>(count).fill(imagePath);

type ChapterConfig = {
  id: string;
  title: string;
  location: string;
  backgroundImages: string[];
  sceneContent?: Array<
    Partial<
      Pick<
        Scene,
        | "speakerName"
        | "dialogueText"
        | "choices"
        | "miniGameType"
        | "miniGameSuccessSceneId"
        | "miniGameFailureSceneId"
        | "nextSceneId"
        | "nextChapterId"
      >
    >
  >;
};

const chapterConfigs: ChapterConfig[] = [
  {
    id: "chapter0",
    title: "CH. 0 : 런던의 길거리",
    location: "런던의 길거리",
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
      "/assets/backgrounds/chapters/ch0-rain-notice.png",
      "/assets/backgrounds/chapters/ch0-rain-notice.png",
      "/assets/backgrounds/chapters/ch0-rain-notice.png",
      "/assets/backgrounds/chapters/ch0-scene2.png",
      "/assets/backgrounds/chapters/ch0-scene2.png",
      "/assets/backgrounds/chapters/ch0-scene2.png",
      "/assets/backgrounds/chapters/ch0-scene2.png",
      "/assets/backgrounds/chapters/ch0-scene2.png",
      "/assets/backgrounds/chapters/ch0-scene2.png",
      "/assets/backgrounds/chapters/ch0-scene3.png",
      "/assets/backgrounds/chapters/ch0-scene3.png",
      "/assets/backgrounds/chapters/ch0-scene3.png",
      "/assets/backgrounds/chapters/ch0-scene3.png",
      "/assets/backgrounds/chapters/ch0-scene3.png",
      "/assets/backgrounds/chapters/ch0-scene3.png",
      "/assets/backgrounds/chapters/ch0-scene3.png",
      "/assets/backgrounds/chapters/ch0-scene3.png",
      "/assets/backgrounds/chapters/ch0-scene3.png",
      "/assets/backgrounds/chapters/ch0-scene3.png",
      "/assets/backgrounds/chapters/ch0-scene3.png",
      "/assets/backgrounds/chapters/ch0-scene3.png",
      "/assets/backgrounds/chapters/ch0-scene3.png",
      "/assets/backgrounds/chapters/ch0-scene3.png",
      "/assets/backgrounds/chapters/ch0-scene3.png",
      "/assets/backgrounds/chapters/ch0-scene3.png",
      "/assets/backgrounds/chapters/ch0-scene3.png",
      "/assets/backgrounds/chapters/ch0-scene4.png",
      "/assets/backgrounds/chapters/ch0-scene4.png",
      "/assets/backgrounds/chapters/ch0-scene4.png",
      "/assets/backgrounds/chapters/ch0-scene4.png",
      "/assets/backgrounds/chapters/ch0-scene4.png",
      "/assets/backgrounds/chapters/ch0-scene4.png",
      "/assets/backgrounds/chapters/ch0-scene4.png",
      "/assets/backgrounds/chapters/ch0-scene4.png",
      "/assets/backgrounds/chapters/ch0-scene4.png",
      "/assets/backgrounds/chapters/ch0-scene4.png",
      "/assets/backgrounds/chapters/ch0-scene4.png",
      "/assets/backgrounds/chapters/ch0-scene4.png",
      "/assets/backgrounds/chapters/ch0-scene4.png",
      "/assets/backgrounds/chapters/ch0-scene4.png",
      "/assets/backgrounds/chapters/ch0-scene4.png",
    ],
    sceneContent: [
      { speakerName: "나", dialogueText: "\"평화로운 하루다....\"" },
      { speakerName: "나", dialogueText: "'지난 한달 간 많은 일이 있었다'" },
      {
        speakerName: "나",
        dialogueText:
          "'분명 내일이 생명과학 시험이어서 20분만 자고 일어나서 공부하려 했더니... 이곳에 떨어졌다.'",
      },
      { speakerName: "나", dialogueText: "'벌써 이곳 시간으로 한달이 지났다'" },
      {
        speakerName: "나",
        dialogueText: "'뭔가 잘못되고 있다. 돌아갈 수 없는 걸까.'",
      },
      {
        speakerName: "나",
        dialogueText:
          "'시험 걱정 없이 여기서 사는 것도 좋은 것 같기도 하고... 그런건 다 좋은데...'",
      },
      { speakerName: "나", dialogueText: "'평범한 남고생이었던 내가'" },
      {
        speakerName: "나",
        dialogueText: "'정신차려보니 여자아이가 되어있었다...!'",
      },
      {
        speakerName: "나",
        dialogueText:
          "'이 여자아이의 삶을 이어서 사는 것 같다. 옛날이라 그런가? 부모님이 간섭이 심해서 삶이 너무 재미가 없다.'",
      },
      {
        speakerName: "나",
        dialogueText: "'게다가 부모님께선 슬슬 결혼할 나이가 아니냐고 하신다.'",
      },
      {
        speakerName: "나",
        dialogueText:
          "'어차피 이곳에서의 삶이 계속되는 거라면 돈많은 남자 한번 꼬셔봐? 남자는 내가 잘 아니까...'",
      },
      {
        speakerName: "나",
        dialogueText:
          "'어? 갑자기 빗방울이 떨어진다. 평소랑 다르게 좀 심하게 오는데...'",
      },
      {
        speakerName: "나",
        dialogueText: "'급하게 천막 밑으로 뛰어왔다. 비는 언제 그칠까?'",
      },
      { speakerName: "나", dialogueText: "'심심한대로 이 벽보들이나 읽어볼까?'" },
      { speakerName: "나", dialogueText: "'읽다보니 비가 그쳤다.'" },
      {
        speakerName: "나",
        dialogueText: "'보아하니 항해 조수를 구하는 것 같은데... 이거나 지원해볼까?'",
      },
      {
        speakerName: "",
        dialogueText: "",
        choices: [
          {
            id: "support_beagle_voyage",
            label: "지원하기",
            nextSceneId: "chapter0-scene18",
          },
          {
            id: "decline_beagle_voyage",
            label: "지원 안하고 그냥저냥한 인생을 살다가 노잼으로 죽음을 맞이하기",
            endingId: "bad_no_voyage",
          },
        ],
      },
      {
        speakerName: "나",
        dialogueText:
          "'그래. 이왕 이렇게 된거 재미있게 살아보자. 그리고 미래에서 고등학교까지 다녔다고. 여기 사람들보다 똑똑할거야.'",
      },
      {
        speakerName: "나",
        dialogueText:
          "'배에는 잘생긴 남자들도 많지 않을까? 근데 내가 왜 잘생긴 남자를 원하지...? 진짜 여자가 된건가...?!'",
      },
      {
        speakerName: "해설",
        dialogueText:
          "'어쨌든 지원하기로 결정하게 된다. 이후 연락을 받고, 마침내 한달 후인 비글호 승선 날이 다가온다.'",
      },
      {
        speakerName: "나",
        dialogueText:
          "'드디어 승선이구나. 엄마한테 얘기도 안했는데... 뭐 진짜 엄마는 아니니까 괜찮겠지'",
      },
      { speakerName: "", dialogueText: "'뚜벅뚜벅...'" },
      {
        speakerName: "해설",
        dialogueText: "'주인공과 신원 미상의 인물이 부딪힌다'",
      },
      { speakerName: "나", dialogueText: "'아 뭐야!'" },
      {
        speakerName: "해설",
        dialogueText: "'부딪힌 자리에서 꿈쩍도 않고 신원 미상의 인물이 서있다.'",
      },
      {
        speakerName: "나",
        dialogueText: "'저기요! 사과도 안해요? 가만히 뭐하는...'",
      },
      {
        speakerName: "???",
        dialogueText: "'내내 놀다가 전날 공부 시작하면 될거라고 생각했습니까.'",
      },
      { speakerName: "나", dialogueText: "'??!!'" },
      {
        speakerName: "???",
        dialogueText: "'당신을 위해서 복습을 할 수 있는 시간을 마련했습니다'",
      },
      {
        speakerName: "나",
        dialogueText: "'그게 무슨 소리야. 당신은 누구...'",
      },
      {
        speakerName: "???",
        dialogueText:
          "'그 남자를 성공적으로 이끌지 못하면 어차피 당신의 시험도 가망이 없다고 판단, 그냥 이곳에 남겨두겠습니다.'",
      },
      {
        speakerName: "???",
        dialogueText: "'돌아가고싶다면 복습 충실히 하시기 바랍니다.'",
      },
      {
        speakerName: "해설",
        dialogueText: "'신원 미상의 남자가 배 안으로 뛰어들어간다.'",
      },
      { speakerName: "나", dialogueText: "'아니 당신...!!!'" },
      {
        speakerName: "해설",
        dialogueText:
          "'나는 남자를 따라 배로 뛰어 들어간다. 배 안으로 들어가자, 남자는 흔적도 없이 사라진다.'",
      },
      { speakerName: "나", dialogueText: "'?!'" },
      {
        speakerName: "방송",
        dialogueText: "'전 인원 지금 바로 탑승하시기 바랍니다. 이제 출발합니다!'",
      },
      {
        speakerName: "나",
        dialogueText: "'그 사람은 뭐였지...? 복습...?'",
      },
      {
        speakerName: "???",
        dialogueText: "\"혹시 당신이 조수인가요?\"",
      },
      { speakerName: "나", dialogueText: "\"네?\"" },
      {
        speakerName: "해설",
        dialogueText: "'뒤를 돌아보니 앳된 남자가 서있다.'",
      },
      { speakerName: "나", dialogueText: "\"누구세요?\"" },
      {
        speakerName: "다윈",
        dialogueText:
          "\"저는 에라스무스 다윈이라고 해요. 혹시 조수 지원을 하신 분인가요?\"",
      },
      {
        speakerName: "나",
        dialogueText: "'아 이 사람이구나. 그런데 이름이 다윈...?!'",
      },
      {
        speakerName: "나",
        dialogueText:
          "\"네 맞아요! 그런데 혹시 이름이 다윈씨...?가 맞나요?\"",
      },
      { speakerName: "다윈", dialogueText: "\"네 다윈! 왜요?\"" },
      { speakerName: "나", dialogueText: "\"아, 아니예요!\"" },
      {
        speakerName: "나",
        dialogueText:
          "'내가 아는 그 다윈? 교과서에 나오는 그 사람이라는 건가?'",
      },
      {
        speakerName: "다윈",
        dialogueText:
          "\"이 배에서 이곳저곳 항해하면서 다양한 생태를 보고싶었거든요. 주로 저와 동행하면서 자료조사를 도와주시면 될 것 같아요.\"",
      },
      { speakerName: "나", dialogueText: "\"알겠어요.\"" },
      {
        speakerName: "나",
        dialogueText:
          "'되게 엄청난 사람을 만난 것 같은데... 그 다윈이라면 여기가 비글호라는 건가...?'",
      },
      {
        speakerName: "나",
        dialogueText:
          "'너무 많은 일이 생긴 것 같아서 좀 정리해야겠어. 일단 쉬면서 생각을 정리해보자.'",
      },
    ],
  },
  {
    id: "chapter1",
    title: "CH.1 리우데자네이루 - 노예제와 피츠로이 선장",
    location: "리우데자네이루",
    backgroundImages: [
      "/assets/backgrounds/chapters/ch1-scene1.png",
      "/assets/backgrounds/chapters/ch1-scene1.png",
      "/assets/backgrounds/chapters/ch1-scene1.png",
      "/assets/backgrounds/chapters/ch1-scene1.png",
      "/assets/backgrounds/chapters/ch1-scene1.png",
      "/assets/backgrounds/chapters/ch1-scene1.png",
      "/assets/backgrounds/chapters/ch1-scene1.png",
      "/assets/backgrounds/chapters/ch1-scene1.png",
      "/assets/backgrounds/chapters/ch1-scene1.png",
      "/assets/backgrounds/chapters/ch1-scene2.png",
      "/assets/backgrounds/chapters/ch1-scene2.png",
      "/assets/backgrounds/chapters/ch1-scene2.png",
      "/assets/backgrounds/chapters/ch1-scene2.png",
      "/assets/backgrounds/chapters/ch1-scene2.png",
      "/assets/backgrounds/chapters/ch1-scene2.png",
      "/assets/backgrounds/chapters/ch1-scene2.png",
      "/assets/backgrounds/chapters/ch1-scene2.png",
      "/assets/backgrounds/chapters/ch1-scene2.png",
      "/assets/backgrounds/chapters/ch1-scene2.png",
      "/assets/backgrounds/chapters/ch1-scene2.png",
      "/assets/backgrounds/chapters/ch1-scene2.png",
      "/assets/backgrounds/chapters/ch1-scene2.png",
      "/assets/backgrounds/chapters/ch1-scene2.png",
      "/assets/backgrounds/chapters/ch1-scene2.png",
      "/assets/backgrounds/chapters/ch1-scene2.png",
      "/assets/backgrounds/chapters/ch1-scene2.png",
      "/assets/backgrounds/chapters/ch1-scene2.png",
      "/assets/backgrounds/chapters/ch1-scene2.png",
      "/assets/backgrounds/chapters/ch1-scene2.png",
      "/assets/backgrounds/chapters/ch1-scene2.png",
      "/assets/backgrounds/chapters/ch1-scene2.png",
      "/assets/backgrounds/chapters/ch1-scene2.png",
      "/assets/backgrounds/chapters/ch1-scene3.png",
      "/assets/backgrounds/chapters/ch1-scene4.png",
    ],
    sceneContent: [
      {
        speakerName: "나",
        dialogueText: "'벌써 육지에 도착했네... 지금까지의 일들을 정리해보자.'",
      },
      {
        speakerName: "나",
        dialogueText:
          "'나는 다윈의 조수고, 이 배는 아마 갈라파고스...? 섬에 가는 배겠지? 교과서에서 본 것처럼.'",
      },
      {
        speakerName: "나",
        dialogueText:
          "'그리고 그 남자가 말했던 복습은 아마 다윈을 잘 도와주라는 이야기가 아닐까?'",
      },
      {
        speakerName: "나",
        dialogueText:
          "'그 사람의 정체는 잘 모르겠지만 다른 대안이 없으니... 그리고 시험공부도 되니까 겸사겸사인 셈이지. 일단 해보자.'",
      },
      {
        speakerName: "다윈",
        dialogueText:
          "\"잘 잤어요? 오늘은 해야할 일은 없고, 저랑 돌아다니면서 좀 놀까요?\"",
      },
      {
        speakerName: "나",
        dialogueText: "\"네? 연구같은거 하시는거 아니었어요?\"",
      },
      {
        speakerName: "다윈",
        dialogueText:
          "\"연구요? 사실 연구자 지망생이지 대단하게 할 줄 아는 건 없어요. 일단 여기저기 구경 다니면서 좀 놀아요!\"",
      },
      {
        speakerName: "나",
        dialogueText:
          "'엄청난 학자라고 해서 그렇게 열의가 넘치는 건 아닌가? 일단 하라는 대로 해야겠지'",
      },
      {
        speakerName: "해설",
        dialogueText: "함께 배에서 내려 도시 곳곳을 돌아다니기 시작한다.",
      },
      {
        speakerName: "다윈",
        dialogueText:
          "\"굉장히 이국적인 분위기네요. 신기한 것도 많지만 한편으로는 영국 문화도 많이 정착한 것 같아요.\"",
      },
      {
        speakerName: "나",
        dialogueText: "\"맞아요. 새로운 것들이 많네요.\"",
      },
      {
        speakerName: "???",
        dialogueText: "\"다들 좋은 시간 보내고 있소?\"",
      },
      {
        speakerName: "해설",
        dialogueText: "두 사람 뒤로 제복을 입은 남자가 다가오며 말을 건다.",
      },
      {
        speakerName: "피츠로이 선장",
        dialogueText:
          "\"뱃일을 하다보면 다양한 풍경을 보지만, 이곳은 신기한 것들이 많은 것 같소.\"",
      },
      {
        speakerName: "다윈",
        dialogueText: "\"아, 선장님이시군요. 안그래도 구경 중이던 참입니다.\"",
      },
      {
        speakerName: "피츠로이",
        dialogueText:
          "\"저기좀 보세. 사람이 많이 모여있는 곳에 재미있는 경험이 있는 법이지. 뭘 하고있는거지?\"",
      },
      {
        speakerName: "해설",
        dialogueText:
          "세 사람은 백인 관리자가 흑인 노예들을 인솔하며 폭력을 행사하는 장면을 목격한다.",
      },
      {
        speakerName: "나",
        dialogueText:
          "'사람을 이렇게까지 직접적으로 때리는 건 원래 세상에서는 보기 힘든 장면이었는데. 이 시대에는 당연한 일이었던 걸까?'",
      },
      {
        speakerName: "다윈",
        dialogueText: "\"저 사람들은 어디로 가는거죠?\"",
      },
      {
        speakerName: "피츠로이",
        dialogueText:
          "\"아마 다른 나라에 데려가 팔겠지. 흑인들은 저래도 싼 존재들이야.\"",
      },
      {
        speakerName: "다윈",
        dialogueText:
          "\"음... 처음 보는 환경이라서 낯서네요. 그래도 때리는 모습은 좀 보기 힘드네요.\"",
      },
      {
        speakerName: "피츠로이",
        dialogueText:
          "\"사람 좋은 소리를 하시는구만. 인간같지도 않은 사람들인데 뭘 그러나. 다들 그렇게 하는 거라네.\"",
      },
      {
        speakerName: "다윈",
        dialogueText:
          "\"그래도 본능적으로 거부감이 드는 것 같습니다. 솔직히 기분이 안좋네요.\"",
      },
      {
        speakerName: "피츠로이",
        dialogueText: "\"성자 납셨군. 그래, 자네는 어떻게 생각하나?\"",
      },
      {
        speakerName: "나",
        dialogueText: "'?! 뭐라고 말해야하지...?'",
        choices: [
          {
            id: "rio_criticize_slavery",
            label: "\"흑인도 피부색만 다르지 사람인데 저런건 나쁜 거 아닌가요?\"",
            gainedElements: ["balanced_view_of_evolution"],
            nextSceneId: "chapter1-scene26",
          },
          {
            id: "rio_stay_silent",
            label: "적당히 얼버무리고 넘어간다",
            gainedElements: ["incomplete_human_understanding"],
            nextSceneId: "chapter1-scene28",
          },
          {
            id: "rio_naturalize_domination",
            label: "\"우월한 백인이 지배하는게 당연한 거 아닌가요?\"",
            gainedElements: ["biased_view"],
            nextSceneId: "chapter1-scene30",
          },
        ],
      },
      {
        speakerName: "나",
        dialogueText: "\"흑인도 피부색만 다르지 사람인데 저런건 나쁜 거 아닌가요?\"",
        nextSceneId: "chapter1-scene27",
      },
      {
        speakerName: "피츠로이",
        dialogueText: "\"말이 안통하는 사람들이구만. 경험이 부족한 탓이겠지.\"",
        nextSceneId: "chapter1-scene33",
      },
      {
        speakerName: "나",
        dialogueText:
          "'굳이 선장과의 관계도 나쁘게 하고싶지 않고, 뭐라고 해야할지 모르겠네. 그냥 대충 넘어가자'",
        nextSceneId: "chapter1-scene29",
      },
      {
        speakerName: "해설",
        dialogueText: "적당히 얼버무리며 상황이 무마된다.",
        nextSceneId: "chapter1-scene33",
      },
      {
        speakerName: "나",
        dialogueText: "\"우월한 백인이 지배하는게 당연한 거 아닌가요?\"",
        nextSceneId: "chapter1-scene31",
      },
      {
        speakerName: "다윈",
        dialogueText: "\"음...\"",
        nextSceneId: "chapter1-scene32",
      },
      {
        speakerName: "피츠로이",
        dialogueText: "\"역시 다들 그렇게 생각하는 거라네. 자네가 이상한 게야.\"",
        nextSceneId: "chapter1-scene33",
      },
      {
        speakerName: "피츠로이",
        dialogueText: "\"나는 배에 갈테니 더 구경하다 오게\"",
      },
      {
        speakerName: "해설",
        dialogueText:
          "이후 생각에 잠긴 다윈과 함께 리우데자네이루에서의 시간이 지나고, 배에 탑승해 다음 행선지로 향한다.",
      },
    ],
  },
  {
    id: "chapter2",
    title: "CH.2 리우데자네이루 인근 동굴 - 화석과 공통 구조",
    location: "리우데자네이루 인근 동굴",
    backgroundImages: [
      "/assets/backgrounds/chapters/ch2-scene1.png",
      "/assets/backgrounds/chapters/ch2-scene1.png",
      "/assets/backgrounds/chapters/ch2-scene1.png",
      "/assets/backgrounds/chapters/ch2-scene1.png",
      "/assets/backgrounds/chapters/ch2-scene1.png",
      "/assets/backgrounds/chapters/ch2-scene1.png",
      "/assets/backgrounds/chapters/ch2-scene1.png",
      "/assets/backgrounds/chapters/ch2-scene1.png",
      "/assets/backgrounds/chapters/ch2-scene3.png",
      "/assets/backgrounds/chapters/ch2-scene3.png",
      "/assets/backgrounds/chapters/ch2-scene3.png",
      "/assets/backgrounds/chapters/ch2-scene4.png",
      "/assets/backgrounds/chapters/ch2-scene4.png",
      "/assets/backgrounds/chapters/ch2-scene4.png",
      "/assets/backgrounds/chapters/ch2-scene4.png",
      "/assets/backgrounds/chapters/ch2-scene4.png",
      "/assets/backgrounds/chapters/ch2-scene4.png",
      "/assets/backgrounds/chapters/ch2-scene4.png",
      "/assets/backgrounds/chapters/ch2-scene4.png",
      "/assets/backgrounds/chapters/ch2-scene4.png",
      "/assets/backgrounds/chapters/ch2-scene4.png",
      "/assets/backgrounds/chapters/ch2-scene4.png",
      "/assets/backgrounds/chapters/ch2-scene4.png",
      "/assets/backgrounds/chapters/ch2-scene5.png",
      "/assets/backgrounds/chapters/ch2-scene5.png",
      "/assets/backgrounds/chapters/ch2-scene2.png",
    ],
    sceneContent: [
      {
        speakerName: "해설",
        dialogueText:
          "리우데자네이루에서 떠나면서, 잠시 배 정비를 위해 인근 섬에 정박하게 된다.",
      },
      { speakerName: "다윈", dialogueText: "\"이런 섬에 뭐 볼게 있다고...\"" },
      {
        speakerName: "나",
        dialogueText:
          "'같이 다니면서 느낀건데, 생각보다 이 사람 그렇게 학자같은 느낌은 없어'",
      },
      {
        speakerName: "나",
        dialogueText:
          "'오히려 그냥 철없는 학생같은 느낌...? 똑똑하긴 한 것 같은데...'",
      },
      {
        speakerName: "나",
        dialogueText:
          "'흥미가 생기면 뭔가를 하는 스타일같기는 한데... 아직 학문에 흥미가 없나?'",
      },
      { speakerName: "다윈", dialogueText: "\"잠시 산책이나 갈까요?\"" },
      { speakerName: "나", dialogueText: "'어차피 심심한데 잠깐 갔다올까?'" },
      {
        speakerName: "해설",
        dialogueText: "두 사람은 섬 안쪽으로 걸어들어간다.",
      },
      {
        speakerName: "다윈",
        dialogueText:
          "\"동굴이 있네요? 좀 위험해보이지만 들어가볼까요?\"",
      },
      {
        speakerName: "나",
        dialogueText: "'어차피 실제 인생도 아닌데, 한번 따라가볼까?'",
      },
      { speakerName: "해설", dialogueText: "두 사람은 동굴 속으로 들어간다." },
      { speakerName: "다윈", dialogueText: "\"좀 으스스한 분위기네요.\"" },
      {
        speakerName: "나",
        dialogueText: "\"그러게요. 바닥이 울퉁불퉁해서 조심해야겠어요.\"",
      },
      {
        speakerName: "해설",
        dialogueText: "다윈이 바닥에 걸려 휘청거린다.",
      },
      { speakerName: "다윈", dialogueText: "\"오악!\"" },
      {
        speakerName: "나",
        dialogueText:
          "\"괜찮아요? 바닥에 이상하게 생긴 돌들이 많네요. 이게 다 뭘까요?\"",
      },
      {
        speakerName: "해설",
        dialogueText:
          "다윈이 바닥을 자세히 관찰하더니, 뭔가를 주워 모으기 시작한다.",
      },
      { speakerName: "나", dialogueText: "\"뭐하세요? 더럽게\"" },
      {
        speakerName: "다윈",
        dialogueText: "\"이것들 좀 보세요. 동물의 모습들이 보존된 화석들이에요.\"",
      },
      { speakerName: "해설", dialogueText: "자세히 보니 동물 화석들이다." },
      {
        speakerName: "다윈",
        dialogueText:
          "\"음... 정확히 어떤 동물의 어떤 부위인지는 모르겠지만, 뭔가 인간의 몸과 비슷하게 생기지 않았어요?\"",
      },
      { speakerName: "나", dialogueText: "'? 전혀 모르겠는데'" },
      { speakerName: "다윈", dialogueText: "\"그쵸! 어떻게 생각하세요?\"" },
      {
        speakerName: "해설",
        dialogueText: "화석과 골격의 구조를 비교해보자.",
        miniGameType: "skeletonMatching",
      },
      {
        speakerName: "다윈",
        dialogueText:
          "\"일단 슬슬 돌아가야 할 것 같으니 이 화석들을 좀 챙겨가야겠어요. 도와줘요!\"",
      },
      { speakerName: "해설", dialogueText: "두 사람은 다시 배로 돌아간다." },
    ],
  },
  {
    id: "chapter3",
    title: "CH.3 티에라델푸에고 - 선교사를 찾아라",
    location: "티에라델푸에고",
    backgroundImages: [
      ...repeatImage("/assets/backgrounds/chapters/ch3-scene1.png", 18),
      ...repeatImage("/assets/backgrounds/chapters/ch3-scene2.png", 36),
      ...repeatImage("/assets/backgrounds/chapters/ch3-scene3.png", 16),
    ],
    sceneContent: [
      {
        speakerName: "해설",
        dialogueText: "어느덧 배는 티에라델푸에고에 다다른다.",
      },
      {
        speakerName: "나",
        dialogueText: "'생각보다 다윈은 학문적으로 뜻이 있는 사람은 아닌 것 같아.'",
      },
      { speakerName: "나", dialogueText: "'그리고 뭔가...'" },
      {
        speakerName: "나",
        dialogueText: "'나한테 계속 질문을 하는 상황들이 이어지고 있어.'",
      },
      {
        speakerName: "나",
        dialogueText:
          "'내가 만약에 나쁜 대답들을 하면 어떻게 되는거지? 다윈씨는 동굴에서도 내 대답에 영향을 받는 것처럼 보였어.'",
      },
      {
        speakerName: "나",
        dialogueText: "'내 대답이 중요한 거라면... 이걸 복습이라고 표현한건가?'",
      },
      { speakerName: "???", dialogueText: "\"감을 잡기 시작했군\"" },
      { speakerName: "나", dialogueText: "'???'" },
      { speakerName: "나", dialogueText: "'어디서 들리는 목소리지?'" },
      {
        speakerName: "???",
        dialogueText:
          "\"너의 예상대로, 다윈을 도와 '종의 기원'을 출판하도록 돕는 것이 너의 복습 과제다.\"",
      },
      {
        speakerName: "???",
        dialogueText: "\"시험 전날 공부하겠다고 하고선 드러눕는 모습이 한심해서\"",
      },
      { speakerName: "???", dialogueText: "\"내가 좀 도와줬지.\"" },
      { speakerName: "나", dialogueText: "\"야. 너 뭔데?\"" },
      {
        speakerName: "해설",
        dialogueText: "대답은 없이 한동안 정적이 흐른다.",
      },
      { speakerName: "나", dialogueText: "'뭐야 자기 할 말만 하고 간거야?'" },
      { speakerName: "선원", dialogueText: "\"자 이제 티에라델푸에고에 상륙합니다~!\"" },
      {
        speakerName: "다윈",
        dialogueText: "\"여기 있었네요! 이제 나갈 준비 해요.\"",
      },
      { speakerName: "나", dialogueText: "\"아. 알겠어요.\"" },
      {
        speakerName: "나",
        dialogueText:
          "'그 목소리는 뭐지... 자기 할말만 하고 가는 것도 그렇고 좀 띠껍네...'",
      },
      {
        speakerName: "다윈",
        dialogueText:
          "\"여기서는 혹시 모를 위험에 대비해 군인들의 뒤에서 따라 다녀야 한다네요.\"",
      },
      { speakerName: "나", dialogueText: "\"어떤게 위험하다는 거죠?\"" },
      { speakerName: "다윈", dialogueText: "\"저기를 보세요. 저 사람들.\"" },
      {
        speakerName: "해설",
        dialogueText: "저 멀리 원주민들이 모여 웃고 떠들며 노는 모습이 보인다.",
      },
      { speakerName: "나", dialogueText: "\"저 사람들은 원주민인가요?\"" },
      {
        speakerName: "다윈",
        dialogueText:
          "\"맞아요. 저번 항해 때 영국군이 측량을 위해서 이 곳에 왔을 때 찾은 원주민이라더군요.\"",
      },
      {
        speakerName: "해설",
        dialogueText:
          "그때 영국식 옷차림을 한 이국적인 인물 세 명이 군인들과 함께 다윈과 내 앞을 지나간다.",
      },
      { speakerName: "나", dialogueText: "\"저 사람들은 백인이 아닌 것 같은데요.\"" },
      {
        speakerName: "다윈",
        dialogueText: "\"영국군들이 지난 항해에서 포로로 데려온 원주민 3명이라네요.\"",
      },
      {
        speakerName: "다윈",
        dialogueText:
          "\"영국에서 교육하고 생활방식을 접한 인물들인데, 완전히 영국에 동화되었다더군요.\"",
      },
      {
        speakerName: "다윈",
        dialogueText:
          "\"다시 이 문명으로 복귀시켜 영국의 문명을 전파한다는 목적이라더군요.\"",
      },
      {
        speakerName: "나",
        dialogueText:
          "\"어쩐지 좀 깨끗해보이네요. 원주민들은 그냥 물에 슥슥 씻겠죠?\"",
      },
      {
        speakerName: "다윈",
        dialogueText:
          "\"아마도 그렇겠죠. 확실히 문명의 손이 닿지 않는 곳은 열악하네요. 그런데...\"",
      },
      { speakerName: "나", dialogueText: "\"그런데?\"" },
      {
        speakerName: "다윈",
        dialogueText:
          "\"이곳의 사람들은 참 행복해보여요. 문명화된 환경이 모든 사람한테 필요한 걸까요?\"",
      },
      {
        speakerName: "다윈",
        dialogueText:
          "\"가끔은 필요를 넘어서, 사람들한테 각자 다른 소질이 있는 것처럼 각자한테 맞는 환경이 있는 걸지도 모른다는 생각이 들어요\"",
      },
      { speakerName: "나", dialogueText: "'뭐야. 생각보다 감성적이잖아?'" },
      {
        speakerName: "해설",
        dialogueText: "그때 저 멀리서 선원의 목소리가 들린다.",
      },
      { speakerName: "선원", dialogueText: "\"큰일입니다!\"" },
      { speakerName: "피츠로이", dialogueText: "\"무슨 일이야?\"" },
      { speakerName: "선원", dialogueText: "\"선교사 한 명이 없어졌습니다!\"" },
      {
        speakerName: "피츠로이",
        dialogueText: "\"잘 찾아본 거 맞아? 그냥 혼자 다니는 걸지도 모르지.\"",
      },
      {
        speakerName: "선원",
        dialogueText:
          "\"여기 도착한 이후 하루 종일 안보이고 있습니다. 게다가 주변 사람들의 말에 의하면, 그 선교사는 포로 원주민 교육 담당이었는데...\"",
      },
      {
        speakerName: "선원",
        dialogueText:
          "\"포로 원주민과 아주 가까운 사이... 그니까 포로를 좋아하는 사람이었다는 증언도 있습니다.\"",
      },
      {
        speakerName: "피츠로이",
        dialogueText:
          "\"선교사들은 반드시 본국으로 돌려보내야해. 피부 색도 다른데 그냥 찾아서 끌고오면 되지 않나?\"",
      },
      {
        speakerName: "선원",
        dialogueText:
          "\"그게... 어느 집 안에 있는 것 같긴 한데, 원주민들이 통행을 막고있습니다.\"",
      },
      { speakerName: "피츠로이", dialogueText: "\"그게 무슨 말인가?\"" },
      {
        speakerName: "선원",
        dialogueText:
          "\"아마도 원주민들이 그 포로의 요청에 따라 선교사를 잡아두려는 것 같습니다. 좋아하는 사람이니 놓치지 않겠다는 거죠.\"",
      },
      {
        speakerName: "피츠로이",
        dialogueText:
          "\"젠장. 당장이라도 다 쓸어버리고 싶지만 충돌은 최소한으로 하라는 명이 있었다. 이봐 자네.\"",
      },
      {
        speakerName: "해설",
        dialogueText: "피츠로이 선장이 나를 보며 말을 건다.",
      },
      { speakerName: "나", dialogueText: "\"...네? 저요?\"" },
      {
        speakerName: "피츠로이",
        dialogueText:
          "\"그래 자네. 어쨌든 같은 여자니까 포로 원주민 여성과 대화를 좀 해보게. 자네가 설득할 수 있을지도 몰라.\"",
      },
      {
        speakerName: "나",
        dialogueText:
          "'뭔가 억지스러운 상황... 중요한 역할... 이런 것들을 헤쳐나가라는 거구나...!'",
      },
      { speakerName: "나", dialogueText: "'나도 원래 남자라고... 그래도 해야겠지...'" },
      { speakerName: "나", dialogueText: "\"알겠어요. 제가 대화해볼게요.\"" },
      {
        speakerName: "해설",
        dialogueText: "포로 원주민 여성을 설득해 선교사의 위치를 추론하자.",
        miniGameType: "missionaryClick",
        miniGameSuccessSceneId: "chapter3-scene56",
        miniGameFailureSceneId: "chapter3-scene67",
      },
      {
        speakerName: "해설",
        dialogueText: "잠시 뒤 나는 선교사와 함께 항해 무리로 돌아온다.",
      },
      {
        speakerName: "피츠로이",
        dialogueText:
          "\"거 참 대단하구만. 어떻게 구슬려서 데려온거야? 아니 어쨌든 데려왔으니 그만이지. 이제 슬슬 배에 타도록 함세.\"",
      },
      {
        speakerName: "해설",
        dialogueText:
          "항해 무리는 배로 복귀한다. 복귀하는 길에 다윈과 나는 잠시 대화를 한다.",
      },
      {
        speakerName: "다윈",
        dialogueText: "\"어떻게 설득한거죠? 완고해보였는데요.\"",
      },
      { speakerName: "나", dialogueText: "\"다윈씨의 아이디어를 참고했어요.\"" },
      { speakerName: "다윈", dialogueText: "\"그게 무슨 말이죠?\"" },
      {
        speakerName: "나",
        dialogueText:
          "\"대화를 해보니 선교사는 문명화된 포로에 관심이 있던 거라고 느꼈어요. 그렇지만 이곳 사람들은 이곳 환경에 적합한 방법으로 살아가는 거잖아요.\"",
      },
      {
        speakerName: "나",
        dialogueText:
          "\"열대의 기후에 맞는 식량과 집, 옷차림을 하는 모든 것들이. 다 환경에 맞는 생활을 하는 셈이죠. 이곳에서 선교사와 포로가 같이 살더라도, 분명 원주민들과 같은 생활에 적응할거예요.\"",
      },
      {
        speakerName: "나",
        dialogueText:
          "\"그렇게 되어도 계속 사랑하며 살 자신이 있냐... 는 식으로 회유했죠.\"",
      },
      { speakerName: "다윈", dialogueText: "\"말주변이 참 좋네요. 흠...\"" },
      {
        speakerName: "나",
        dialogueText:
          "'다윈이 또 생각이 많아보인다. 억지로라도 교훈적인 이야기를 했는데, 이정도면 잘 해결한 거겠지?'",
        nextChapterId: "chapter4",
      },
      {
        speakerName: "해설",
        dialogueText: "잠시 뒤 나는 혼자 돌아온다.",
      },
      { speakerName: "나", dialogueText: "\"죄송해요. 설득이 되지 않네요.\"" },
      {
        speakerName: "피츠로이",
        dialogueText:
          "\"괜찮네. 방금 군인들과 모두 모여 회의를 해보니, 그냥 복귀해서 사정을 잘 설명하는 쪽으로 진행하기로 했네. 자네가 고생했구만.\"",
      },
      {
        speakerName: "다윈",
        dialogueText: "\"이제 우리도 복귀하죠.\"",
      },
    ],
  },
  {
    id: "chapter4",
    title: "CH.4 티에라델푸에고의 밤 - 식인종 이야기와 공포",
    location: "티에라델푸에고",
    backgroundImages: [
      ...repeatImage("/assets/backgrounds/chapters/ch4-scene1.png", 15),
      "/assets/backgrounds/chapters/ch4-scene2.png",
      "/assets/backgrounds/chapters/ch4-scene3.png",
    ],
    sceneContent: [
      {
        speakerName: "해설",
        dialogueText:
          "배가 정비하는 동안 군인, 선교사 등의 사람들과 나와 밖에서 시간을 보낸다.",
      },
      { speakerName: "나", dialogueText: "\"그런데 낮에는 왜 위험하다고 한 거죠?\"" },
      { speakerName: "다윈", dialogueText: "\"네?\"" },
      {
        speakerName: "나",
        dialogueText: "낮에 분명 위험하니 군인들과 다녀야 한다고 했잖아요.",
      },
      {
        speakerName: "다윈",
        dialogueText: "\"음... 원주민들이 어떤 행동을 할지 모르니까요?\"",
      },
      {
        speakerName: "나",
        dialogueText:
          "\"하지만 원주민들과 직접 대화한 저는 전혀 위험함을 느끼지 못했어요.\"",
      },
      {
        speakerName: "다윈",
        dialogueText:
          "\"운이 좋았을 수도 있죠. 게다가, 이곳 원주민들은 식인 행위를 한다는 소문도 있어요.\"",
      },
      { speakerName: "나", dialogueText: "\"식인이요? 그럴 수가....\"" },
      {
        speakerName: "다윈",
        dialogueText:
          "\"믿기지 않지만 사실이에요. 사람을 잡아먹는다는 이야기가 있어서, 아까 선교사와 대화하러 갔을 때도 군인들이 계속 인근에서 대기했다고 들었어요.\"",
        choices: [
          {
            id: "fuegian_fear_as_nature",
            label: "그렇다면 도덕이 발달하지 못한 문명일 수도 있겠네요.",
            gainedElements: ["biased_view"],
            nextSceneId: "chapter4-scene10",
          },
          {
            id: "fuegian_question_fear",
            label: "그 소문이 사실인지 확인한 건가요?",
            gainedElements: ["human_diversity"],
            nextSceneId: "chapter4-scene11",
          },
          {
            id: "fuegian_conditions_matter",
            label: "문화 안에서 나온 모습일 수도 있겠네요.",
            gainedElements: ["balanced_view_of_evolution"],
            nextSceneId: "chapter4-scene16",
          },
        ],
      },
      {
        speakerName: "다윈",
        dialogueText:
          "\"그렇겠죠. 아마도 열등한 문명이다보니 아직 도덕같은 관념이 발달하지 못한 것 같아요.\"",
        nextSceneId: "chapter4-scene16",
      },
      {
        speakerName: "나",
        dialogueText:
          "\"게다가 소문이 사실인지 눈으로 확인한 건가요? 그 이야기를 퍼트린 사람은 실제로 확인한 걸까요?\"",
        nextSceneId: "chapter4-scene12",
      },
      {
        speakerName: "다윈",
        dialogueText: "\"그건 모르지만...\"",
        nextSceneId: "chapter4-scene13",
      },
      {
        speakerName: "나",
        dialogueText:
          "\"우리가 여기서 있던 기간동안 그런 흔적도 발견한 적 없고, 오히려 제가 혼자 다녔을 때도 아무 문제가 없었어요. 물론 우리가 없는 시간동안 식인을 할 수도 있지만, 편견이 믿게 한 소문이 아닐까요?\"",
        nextSceneId: "chapter4-scene16",
      },
      {
        speakerName: "해설",
        dialogueText: "잠시 생각에 잠긴 다윈은 아무 말 없이 바다 쪽을 바라본다.",
        nextSceneId: "chapter4-scene16",
      },
      {
        speakerName: "다윈",
        dialogueText:
          "\"그렇죠. 그들도 그들의 문화 안에서의 모습일 수 있죠. 하지만 그들이 식인을 했다는 사실, 그것이 야만적인 행위라는 사실은 변하지 않는 것 같네요.\"",
        nextSceneId: "chapter4-scene16",
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
  const navigation =
    sceneContent.nextChapterId
      ? { nextChapterId: sceneContent.nextChapterId }
      : sceneContent.nextSceneId
        ? { nextSceneId: sceneContent.nextSceneId }
        : isLastScene
          ? nextChapterId
            ? { nextChapterId }
            : {}
          : { nextSceneId };

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
    ...(sceneContent.miniGameSuccessSceneId
      ? { miniGameSuccessSceneId: sceneContent.miniGameSuccessSceneId }
      : {}),
    ...(sceneContent.miniGameFailureSceneId
      ? { miniGameFailureSceneId: sceneContent.miniGameFailureSceneId }
      : {}),
    ...navigation,
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
