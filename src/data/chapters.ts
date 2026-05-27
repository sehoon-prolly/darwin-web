import type { Chapter, Scene } from "../types/game";

const chapterSceneCounts = [4, 3, 3, 3, 1, 3, 1, 3];
const leftCharacterImage = "/assets/characters/player-original.png";
const rightCharacterImage = "/assets/characters/darwin-original.png";

function createScene(chapterIndex: number, sceneIndex: number): Scene {
  const sceneNumber = sceneIndex + 1;
  const sceneCount = chapterSceneCounts[chapterIndex];
  const isLastScene = sceneNumber === sceneCount;
  const nextSceneId = `chapter${chapterIndex}-scene${sceneNumber + 1}`;
  const nextChapterId =
    chapterIndex < chapterSceneCounts.length - 1
      ? `chapter${chapterIndex + 1}`
      : undefined;

  return {
    id: `chapter${chapterIndex}-scene${sceneNumber}`,
    speakerName: "",
    dialogueText: "",
    backgroundImage: `/assets/backgrounds/chapters/ch${chapterIndex}-scene${sceneNumber}.png`,
    leftCharacterImage,
    rightCharacterImage,
    ...(isLastScene
      ? nextChapterId
        ? { nextChapterId }
        : {}
      : { nextSceneId }),
  };
}

function createChapter(chapterIndex: number): Chapter {
  return {
    id: `chapter${chapterIndex}`,
    title: `CH.${chapterIndex}`,
    location: "",
    scenes: Array.from({ length: chapterSceneCounts[chapterIndex] }, (_, index) =>
      createScene(chapterIndex, index),
    ),
  };
}

export const chapters: Chapter[] = chapterSceneCounts.map((_, index) =>
  createChapter(index),
);

export const chapterMap = Object.fromEntries(
  chapters.map((chapter) => [chapter.id, chapter]),
);
