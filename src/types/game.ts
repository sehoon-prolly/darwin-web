export type ElementCategory =
  | "science"
  | "human"
  | "empire"
  | "sexualSelection"
  | "negative";

export type GameElement = {
  id: string;
  label: string;
  category: ElementCategory;
  description: string;
};

export type MiniGameType =
  | "none"
  | "beakFoodMatching"
  | "missionaryClick"
  | "prisonerClick"
  | "skeletonMatching";

export type MiniGameResult = {
  success: boolean;
  gainedElements: string[];
};

export type Choice = {
  id: string;
  label: string;
  nextSceneId?: string;
  nextChapterId?: string;
  gainedElements?: string[];
  effect?: string;
  endingId?: string;
};

export type Scene = {
  id: string;
  speakerName: string;
  dialogueText: string;
  backgroundImage?: string;
  leftCharacterImage?: string;
  rightCharacterImage?: string;
  choices?: Choice[];
  miniGameType?: MiniGameType;
  nextSceneId?: string;
  nextChapterId?: string;
};

export type Chapter = {
  id: string;
  title: string;
  location: string;
  scenes: Scene[];
};

export type Ending = {
  id: string;
  title: string;
  description: string;
  backgroundImage?: string;
};

export type GameState = {
  currentChapterId: string;
  currentSceneId: string;
  acquiredElements: string[];
  selectedChoices: string[];
  selectedFinalElements: string[];
  currentEnding: string | null;
  isMiniGameActive: boolean;
};

export type MiniGameProps = {
  onComplete: (result: MiniGameResult) => void;
};
