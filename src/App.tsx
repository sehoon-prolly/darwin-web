import { useEffect, useMemo, useRef, useState } from "react";
import GameLayout from "./components/GameLayout";
import SceneView from "./components/SceneView";
import DialogueBox from "./components/DialogueBox";
import ElementInventory from "./components/ElementInventory";
import ChoiceButton from "./components/ChoiceButton";
import MiniGameRenderer from "./components/MiniGameRenderer";
import FinalManuscriptPanel from "./components/FinalManuscriptPanel";
import OpeningScreen from "./components/OpeningScreen";
import SplashScreen from "./components/SplashScreen";
import { chapterMap, chapters } from "./data/chapters";
import { gameElements } from "./data/elements";
import { endings } from "./data/endings";
import { endingDialogue } from "./data/endingDialogue";
import type { Chapter, Choice, GameState, MiniGameResult, Scene } from "./types/game";
import { clearGameState, loadGameState, saveGameState } from "./utils/storage";
import { judgeEnding } from "./utils/endingJudge";

const firstChapter = chapters[0];
const SCREEN_FADE_STEP_MS = 250;
const SCREEN_SWAP_DELAY_MS = 0;
const ELEMENT_TOAST_DURATION_MS = 1200;
const CHOICE_OVERLAY_AFTER_TOAST_DELAY_MS = 300;
const CHOICE_OVERLAY_DELAY_MS =
  ELEMENT_TOAST_DURATION_MS + CHOICE_OVERLAY_AFTER_TOAST_DELAY_MS;
const POST_TOAST_NAVIGATION_DELAY_MS = CHOICE_OVERLAY_DELAY_MS;
const NOTICE_POSTER_SCENE_ID = "chapter0-scene14";
const REQUIRED_NOTICE_POSTER_IDS = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
];
const NOTICE_POSTER_ZOOM_IMAGES: Record<string, string> = {
  "top-left": "/assets/backgrounds/notices/ch0-notice-top-left.png",
  "top-right": "/assets/backgrounds/notices/ch0-notice-top-right.png",
  "bottom-left": "/assets/backgrounds/notices/ch0-notice-bottom-left.png",
  "bottom-right": "/assets/backgrounds/notices/ch0-notice-bottom-right.png",
};

const initialState: GameState = {
  currentChapterId: firstChapter.id,
  currentSceneId: firstChapter.scenes[0].id,
  acquiredElements: [],
  selectedChoices: [],
  selectedFinalElements: [],
  currentEnding: null,
  isMiniGameActive: false,
};

function getFirstScene(chapter: Chapter): Scene {
  return chapter.scenes[0];
}

function uniqueElements(elements: string[]) {
  return Array.from(new Set(elements));
}

function findScene(chapter: Chapter, sceneId: string): Scene {
  return chapter.scenes.find((scene) => scene.id === sceneId) ?? getFirstScene(chapter);
}

function sceneHasMiniGame(scene: Scene) {
  return Boolean(scene.miniGameType && scene.miniGameType !== "none");
}

function normalizeLoadedGameState(state: GameState): GameState {
  return {
    ...state,
    isMiniGameActive: false,
  };
}

function getSpeakerCharacterSide(speakerName: string, chapterId: string) {
  if (!speakerName || speakerName === "해설") {
    return null;
  }

  if (speakerName.includes("다윈")) {
    return "right";
  }

  if (chapterId === "chapter0") {
    return speakerName === "나" ? "left" : null;
  }

  return "left";
}

function hasSpeakerAppearedOnSide(
  chapterScenes: Scene[],
  chapterId: string,
  side: "left" | "right",
) {
  return chapterScenes.some(
    (chapterScene) =>
      getSpeakerCharacterSide(chapterScene.speakerName, chapterId) === side,
  );
}

function getAppearedCharacterSides(chapter: Chapter, currentSceneId: string) {
  const currentSceneIndex = chapter.scenes.findIndex(
    (chapterScene) => chapterScene.id === currentSceneId,
  );
  const scenesSoFar = chapter.scenes.slice(
    0,
    currentSceneIndex >= 0 ? currentSceneIndex + 1 : 1,
  );
  const leftCharacterHasAppeared =
    chapter.id === "chapter0"
      ? currentSceneIndex >= 7
      : hasSpeakerAppearedOnSide(scenesSoFar, chapter.id, "left");

  return {
    left: leftCharacterHasAppeared,
    right: hasSpeakerAppearedOnSide(scenesSoFar, chapter.id, "right"),
  };
}

export default function App() {
  const [hasOpenedGame, setHasOpenedGame] = useState(false);
  const [isShowingSplash, setIsShowingSplash] = useState(false);
  const [isOpeningTransitionActive, setIsOpeningTransitionActive] =
    useState(false);
  const [gainedElementToast, setGainedElementToast] = useState<{
    id: number;
    text: string;
  } | null>(null);
  const [isChapterTransitionActive, setIsChapterTransitionActive] =
    useState(false);
  const [isPaperZoomOpen, setIsPaperZoomOpen] = useState(false);
  const [selectedNoticePosterId, setSelectedNoticePosterId] = useState<
    string | null
  >(null);
  const [readNoticePosterIds, setReadNoticePosterIds] = useState<string[]>([]);
  const [isProgressionPending, setIsProgressionPending] = useState(false);
  const [endingReveal, setEndingReveal] = useState<{
    phase: "black" | "toast" | "dialogue" | "panel";
    endingId: string;
    dialogueIndex: number;
    isPostScene: boolean;
  } | null>(null);
  const endingRevealTimeouts = useRef<number[]>([]);
  const screenTransitionTimeouts = useRef<number[]>([]);
  const choiceOverlayDelayTimeout = useRef<number | null>(null);
  const gainedElementToastDelayTimeout = useRef<number | null>(null);
  const postToastNavigationTimeout = useRef<number | null>(null);
  const [gameState, setGameState] = useState<GameState>(() => {
    const savedState = loadGameState();
    return savedState ? normalizeLoadedGameState(savedState) : initialState;
  });

  const chapter = chapterMap[gameState.currentChapterId] ?? firstChapter;
  const scene = findScene(chapter, gameState.currentSceneId);
  const visibleCharacterSides = useMemo(
    () => getAppearedCharacterSides(chapter, scene.id),
    [chapter, scene.id],
  );
  const ending = gameState.currentEnding
    ? endings[gameState.currentEnding]
    : null;

  const isFinalChapter = chapter.id === "chapter9";
  const shouldShowMiniGame =
    gameState.isMiniGameActive && sceneHasMiniGame(scene);
  const isFinalManuscriptScene = Boolean(
    isFinalChapter && !scene.nextSceneId && !scene.nextChapterId,
  );
  const isFinalManuscriptOpen = isFinalManuscriptScene && !ending;
  const shouldHideDialogueBox = Boolean(
    ending || shouldShowMiniGame || isFinalManuscriptOpen,
  );
  const [isChoiceOverlayDelayed, setIsChoiceOverlayDelayed] = useState(false);
  const [isWaitingForChoiceConfirm, setIsWaitingForChoiceConfirm] = useState(false);
  const hasChoiceOverlay = Boolean(
    scene.choices?.length &&
      !ending &&
      !isChoiceOverlayDelayed &&
      !isProgressionPending &&
      !isWaitingForChoiceConfirm,
  );
  const isNoticeSceneLocked =
    scene.id === NOTICE_POSTER_SCENE_ID &&
    !REQUIRED_NOTICE_POSTER_IDS.every((posterId) =>
      readNoticePosterIds.includes(posterId),
    );
  const selectedNoticePosterZoomImage = selectedNoticePosterId
    ? NOTICE_POSTER_ZOOM_IMAGES[selectedNoticePosterId]
    : null;
  const displayedScene = scene;

  useEffect(() => {
    saveGameState(gameState);
  }, [gameState]);

  useEffect(() => {
    return () => {
      clearScreenTransitionTimeouts();
      clearChoiceOverlayDelayTimeout();
      clearGainedElementToastDelayTimeout();
      clearPostToastNavigationTimeout();
    };
  }, []);

  useEffect(() => {
    setIsPaperZoomOpen(false);
    setSelectedNoticePosterId(null);
    if (gameState.currentSceneId !== NOTICE_POSTER_SCENE_ID) {
      setReadNoticePosterIds([]);
    }
  }, [gameState.currentSceneId]);

  useEffect(() => {
    setIsWaitingForChoiceConfirm(Boolean(scene.choices?.length));
  }, [scene.id]);

  useEffect(() => {
    if (!gainedElementToast) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setGainedElementToast(null);
    }, ELEMENT_TOAST_DURATION_MS);

    return () => window.clearTimeout(timeoutId);
  }, [gainedElementToast]);

  useEffect(() => {
    if (!isFinalChapter || gameState.selectedFinalElements.length > 0) {
      return;
    }

    setGameState((currentState) => ({
      ...currentState,
      selectedFinalElements: currentState.acquiredElements,
    }));
  }, [
    isFinalChapter,
    gameState.selectedFinalElements.length,
    gameState.acquiredElements,
  ]);

  const sceneOverlay = useMemo(() => {
    if (ending) {
      return (
        <section className="ending-panel">
          <p>Ending</p>
          <h2>{ending.title}</h2>
          <strong>{ending.description}</strong>
          <button type="button" onClick={handleNewGame}>
            처음부터 다시 하기
          </button>
        </section>
      );
    }

    if (shouldShowMiniGame) {
      return (
        <MiniGameRenderer
          miniGameType={scene.miniGameType}
          onComplete={handleMiniGameComplete}
        />
      );
    }

    if (isFinalManuscriptOpen) {
      return (
        <FinalManuscriptPanel
          acquiredElements={gameState.acquiredElements}
          selectedFinalElements={gameState.selectedFinalElements}
          onToggleElement={handleToggleFinalElement}
          onSelectAll={handleSelectAllFinalElements}
          onClearSelection={handleClearFinalSelection}
          onSubmit={handleSubmitFinalManuscript}
        />
      );
    }

    return null;
  }, [
    ending,
    gameState.acquiredElements,
    gameState.selectedFinalElements,
    isFinalManuscriptOpen,
    scene.id,
    scene.choices,
    scene.miniGameType,
    shouldShowMiniGame,
  ]);

  function moveTo(nextSceneId?: string, nextChapterId?: string) {
    if (nextChapterId) {
      const nextChapter = chapterMap[nextChapterId] ?? firstChapter;
      const nextScene = getFirstScene(nextChapter);

      runBackgroundTransitionIfNeeded(nextScene, () => {
        setGameState((currentState) => {
          return {
            ...currentState,
            currentChapterId: nextChapter.id,
            currentSceneId: nextScene.id,
            isMiniGameActive: false,
            selectedFinalElements:
              nextChapter.id === "chapter9"
                ? currentState.acquiredElements
                : currentState.selectedFinalElements,
          };
        });
      });
      return;
    }

    if (nextSceneId) {
      const nextScene = findScene(chapter, nextSceneId);

      runBackgroundTransitionIfNeeded(nextScene, () => {
        setGameState((currentState) => {
          return {
            ...currentState,
            currentSceneId: nextScene.id,
            isMiniGameActive: false,
          };
        });
      });
    }
  }

  function runBackgroundTransitionIfNeeded(nextScene: Scene, updateScreen: () => void) {
    if (displayedScene.backgroundImage !== nextScene.backgroundImage) {
      runScreenTransition(updateScreen);
      return;
    }

    updateScreen();
  }

  function clearScreenTransitionTimeouts() {
    screenTransitionTimeouts.current.forEach((timeoutId) =>
      window.clearTimeout(timeoutId),
    );
    screenTransitionTimeouts.current = [];
  }

  function runScreenTransition(updateScreen: () => void) {
    clearScreenTransitionTimeouts();
    setIsChapterTransitionActive(true);

    const swapTimeoutId = window.setTimeout(() => {
      updateScreen();

      const fadeInTimeoutId = window.setTimeout(() => {
        setIsChapterTransitionActive(false);
        screenTransitionTimeouts.current = [];
      }, SCREEN_SWAP_DELAY_MS);

      screenTransitionTimeouts.current.push(fadeInTimeoutId);
    }, SCREEN_FADE_STEP_MS);

    screenTransitionTimeouts.current.push(swapTimeoutId);
  }

  function handleStartGame() {
    clearScreenTransitionTimeouts();
    setIsOpeningTransitionActive(true);

    const swapTimeoutId = window.setTimeout(() => {
      setHasOpenedGame(true);
      setIsChapterTransitionActive(true);

      const fadeInTimeoutId = window.setTimeout(() => {
        setIsChapterTransitionActive(false);
        setIsOpeningTransitionActive(false);
        screenTransitionTimeouts.current = [];
      }, SCREEN_SWAP_DELAY_MS);

      screenTransitionTimeouts.current.push(fadeInTimeoutId);
    }, SCREEN_FADE_STEP_MS);

    screenTransitionTimeouts.current.push(swapTimeoutId);
  }

  function handleNext() {
    if (sceneHasMiniGame(scene) && !gameState.isMiniGameActive) {
      setGameState((currentState) => ({
        ...currentState,
        isMiniGameActive: true,
      }));
      return;
    }

    moveTo(scene.nextSceneId, scene.nextChapterId);
  }

  function announceGainedElements(elementIds?: string[], delayMs = 0) {
    if (!elementIds?.length) {
      return;
    }

    const labels = elementIds
      .map((elementId) => gameElements[elementId]?.label)
      .filter(Boolean);

    if (labels.length === 0) {
      return;
    }

    if (delayMs > 0) {
      clearGainedElementToastDelayTimeout();
      gainedElementToastDelayTimeout.current = window.setTimeout(() => {
        showGainedElementToast(labels);
        gainedElementToastDelayTimeout.current = null;
      }, delayMs);
      return;
    }

    showGainedElementToast(labels);
  }

  function showGainedElementToast(labels: string[]) {
    setGainedElementToast({
      id: Date.now(),
      text: `획득요소 : ${labels.join(", ")}`,
    });
    delayChoiceOverlay();
  }

  function clearGainedElementToastDelayTimeout() {
    if (gainedElementToastDelayTimeout.current !== null) {
      window.clearTimeout(gainedElementToastDelayTimeout.current);
      gainedElementToastDelayTimeout.current = null;
    }
  }

  function clearPostToastNavigationTimeout() {
    if (postToastNavigationTimeout.current !== null) {
      window.clearTimeout(postToastNavigationTimeout.current);
      postToastNavigationTimeout.current = null;
    }
  }

  function scheduleProgressionAfterToast(startProgression: () => void) {
    clearPostToastNavigationTimeout();
    setIsProgressionPending(true);

    postToastNavigationTimeout.current = window.setTimeout(() => {
      startProgression();
      postToastNavigationTimeout.current = null;
    }, POST_TOAST_NAVIGATION_DELAY_MS);
  }

  function clearChoiceOverlayDelayTimeout() {
    if (choiceOverlayDelayTimeout.current !== null) {
      window.clearTimeout(choiceOverlayDelayTimeout.current);
      choiceOverlayDelayTimeout.current = null;
    }
  }

  function delayChoiceOverlay() {
    clearChoiceOverlayDelayTimeout();
    setIsChoiceOverlayDelayed(true);

    choiceOverlayDelayTimeout.current = window.setTimeout(() => {
      setIsChoiceOverlayDelayed(false);
      choiceOverlayDelayTimeout.current = null;
    }, CHOICE_OVERLAY_DELAY_MS);
  }

  function handleChoice(choice: Choice) {
    const shouldWaitForToast = Boolean(
      choice.gainedElements?.length &&
        (choice.nextSceneId || choice.nextChapterId || choice.endingId),
    );

    if (shouldWaitForToast) {
      announceGainedElements(choice.gainedElements);

      setGameState((currentState) => ({
        ...currentState,
        acquiredElements: uniqueElements([
          ...currentState.acquiredElements,
          ...(choice.gainedElements ?? []),
        ]),
        selectedChoices: uniqueElements([
          ...currentState.selectedChoices,
          choice.id,
        ]),
      }));

      scheduleProgressionAfterToast(() => {
        if (choice.endingId) {
          setGameState((currentState) => ({
            ...currentState,
            currentEnding: choice.endingId ?? null,
            isMiniGameActive: false,
          }));
          setIsProgressionPending(false);
          return;
        }

        if (choice.nextChapterId) {
          const nextChapter =
            chapterMap[choice.nextChapterId ?? ""] ?? firstChapter;
          const nextScene = getFirstScene(nextChapter);

          runBackgroundTransitionIfNeeded(nextScene, () => {
            setGameState((currentState) => {
              return {
                ...currentState,
                currentChapterId: nextChapter.id,
                currentSceneId: nextScene.id,
                selectedFinalElements:
                  nextChapter.id === "chapter9"
                    ? currentState.acquiredElements
                    : currentState.selectedFinalElements,
                isMiniGameActive: false,
              };
            });
            setIsProgressionPending(false);
          });
          return;
        }

        if (choice.nextSceneId) {
          const nextScene = findScene(chapter, choice.nextSceneId ?? "");

          runBackgroundTransitionIfNeeded(nextScene, () => {
            setGameState((currentState) => {
              return {
                ...currentState,
                currentSceneId: nextScene.id,
                isMiniGameActive: false,
              };
            });
            setIsProgressionPending(false);
          });
          return;
        }

        setIsProgressionPending(false);
      });
      return;
    }

    if (choice.nextChapterId) {
      const nextChapter = chapterMap[choice.nextChapterId ?? ""] ?? firstChapter;
      const nextScene = getFirstScene(nextChapter);

      runBackgroundTransitionIfNeeded(nextScene, () => {
        setGameState((currentState) => {
          const acquiredElements = uniqueElements([
            ...currentState.acquiredElements,
            ...(choice.gainedElements ?? []),
          ]);

          return {
            ...currentState,
            currentChapterId: nextChapter.id,
            currentSceneId: nextScene.id,
            acquiredElements,
            selectedChoices: uniqueElements([
              ...currentState.selectedChoices,
              choice.id,
            ]),
            selectedFinalElements:
              nextChapter.id === "chapter9"
                ? acquiredElements
                : currentState.selectedFinalElements,
            isMiniGameActive: false,
          };
        });
      });
      return;
    }

    announceGainedElements(choice.gainedElements);

    if (choice.nextSceneId) {
      const nextScene = findScene(chapter, choice.nextSceneId ?? "");

      runBackgroundTransitionIfNeeded(nextScene, () => {
        setGameState((currentState) => {
          const acquiredElements = uniqueElements([
            ...currentState.acquiredElements,
            ...(choice.gainedElements ?? []),
          ]);

          return {
            ...currentState,
            currentSceneId: nextScene.id,
            acquiredElements,
            selectedChoices: uniqueElements([
              ...currentState.selectedChoices,
              choice.id,
            ]),
            isMiniGameActive: false,
          };
        });
      });
      return;
    }

    setGameState((currentState) => {
      const acquiredElements = uniqueElements([
        ...currentState.acquiredElements,
        ...(choice.gainedElements ?? []),
      ]);

      if (choice.endingId) {
        return {
          ...currentState,
          selectedChoices: uniqueElements([
            ...currentState.selectedChoices,
            choice.id,
          ]),
          acquiredElements,
          currentEnding: choice.endingId,
          isMiniGameActive: false,
        };
      }

      return {
        ...currentState,
        acquiredElements,
        selectedChoices: uniqueElements([
          ...currentState.selectedChoices,
          choice.id,
        ]),
      };
    });
  }

  function handleMiniGameComplete(result: MiniGameResult) {
    const nextMiniGameSceneId = result.success
      ? scene.miniGameSuccessSceneId ?? scene.nextSceneId
      : scene.miniGameFailureSceneId ?? scene.nextSceneId;
    const shouldWaitForToast = Boolean(
      result.gainedElements.length && scene.nextChapterId,
    );

    if (shouldWaitForToast) {
      announceGainedElements(result.gainedElements);

      setGameState((currentState) => ({
        ...currentState,
        acquiredElements: uniqueElements([
          ...currentState.acquiredElements,
          ...result.gainedElements,
        ]),
      }));

      scheduleProgressionAfterToast(() => {
        const nextChapter = chapterMap[scene.nextChapterId ?? ""] ?? firstChapter;
        const nextScene = getFirstScene(nextChapter);

        runBackgroundTransitionIfNeeded(nextScene, () => {
          setGameState((currentState) => {
            return {
              ...currentState,
              currentChapterId: nextChapter.id,
              currentSceneId: nextScene.id,
              selectedFinalElements:
                nextChapter.id === "chapter9"
                  ? currentState.acquiredElements
                  : currentState.selectedFinalElements,
              isMiniGameActive: false,
            };
          });
          setIsProgressionPending(false);
        });
      });
      return;
    }

    if (scene.nextChapterId) {
      const nextChapter = chapterMap[scene.nextChapterId ?? ""] ?? firstChapter;
      const nextScene = getFirstScene(nextChapter);

      runBackgroundTransitionIfNeeded(nextScene, () => {
        setGameState((currentState) => {
          const acquiredElements = uniqueElements([
            ...currentState.acquiredElements,
            ...result.gainedElements,
          ]);

          return {
            ...currentState,
            currentChapterId: nextChapter.id,
            currentSceneId: nextScene.id,
            acquiredElements,
            selectedFinalElements:
              nextChapter.id === "chapter9"
                ? acquiredElements
                : currentState.selectedFinalElements,
            isMiniGameActive: false,
          };
        });
      });
      return;
    }

    announceGainedElements(result.gainedElements);

    if (nextMiniGameSceneId) {
      const nextScene = findScene(chapter, nextMiniGameSceneId);

      runBackgroundTransitionIfNeeded(nextScene, () => {
        setGameState((currentState) => {
          const acquiredElements = uniqueElements([
            ...currentState.acquiredElements,
            ...result.gainedElements,
          ]);

          return {
            ...currentState,
            currentSceneId: nextScene.id,
            acquiredElements,
            isMiniGameActive: false,
          };
        });
      });
      return;
    }

    setGameState((currentState) => {
      const acquiredElements = uniqueElements([
        ...currentState.acquiredElements,
        ...result.gainedElements,
      ]);

      return {
        ...currentState,
        acquiredElements,
        isMiniGameActive: false,
      };
    });
  }

  function handleToggleFinalElement(elementId: string) {
    setGameState((currentState) => {
      const isSelected = currentState.selectedFinalElements.includes(elementId);

      return {
        ...currentState,
        selectedFinalElements: isSelected
          ? currentState.selectedFinalElements.filter((id) => id !== elementId)
          : [...currentState.selectedFinalElements, elementId],
      };
    });
  }

  function handleSelectAllFinalElements() {
    setGameState((currentState) => ({
      ...currentState,
      selectedFinalElements: currentState.acquiredElements,
    }));
  }

  function handleClearFinalSelection() {
    setGameState((currentState) => ({
      ...currentState,
      selectedFinalElements: [],
    }));
  }

  function handleSubmitFinalManuscript() {
    endingRevealTimeouts.current.forEach(clearTimeout);

    const finalEnding = judgeEnding(gameState.selectedFinalElements);

    setGameState((currentState) => ({
      ...currentState,
      currentEnding: finalEnding.id,
      isMiniGameActive: false,
    }));
    setEndingReveal({ phase: "black", endingId: finalEnding.id, dialogueIndex: 0, isPostScene: false });

    const t1 = window.setTimeout(() => {
      setEndingReveal((prev) => (prev ? { ...prev, phase: "toast" } : null));
    }, 800);

    const t2 = window.setTimeout(() => {
      setEndingReveal((prev) => (prev ? { ...prev, phase: "dialogue" } : null));
    }, 3300);

    endingRevealTimeouts.current = [t1, t2];
  }

  function handleEndingDialogueAdvance() {
    if (!endingReveal || endingReveal.phase !== "dialogue") return;

    const script = endingDialogue[endingReveal.endingId];
    if (!script) {
      setEndingReveal((prev) => (prev ? { ...prev, phase: "panel" } : null));
      return;
    }

    const currentLines = endingReveal.isPostScene
      ? (script.postScene ?? [])
      : script.preScene;
    const nextIndex = endingReveal.dialogueIndex + 1;

    if (nextIndex >= currentLines.length) {
      if (!endingReveal.isPostScene && script.postScene?.length) {
        setEndingReveal((prev) =>
          prev ? { ...prev, isPostScene: true, dialogueIndex: 0 } : null,
        );
      } else {
        setEndingReveal((prev) => (prev ? { ...prev, phase: "panel" } : null));
      }
    } else {
      setEndingReveal((prev) =>
        prev ? { ...prev, dialogueIndex: nextIndex } : null,
      );
    }
  }

  function handleNewGame() {
    clearScreenTransitionTimeouts();
    clearChoiceOverlayDelayTimeout();
    clearGainedElementToastDelayTimeout();
    clearPostToastNavigationTimeout();
    endingRevealTimeouts.current.forEach(clearTimeout);
    endingRevealTimeouts.current = [];
    setEndingReveal(null);
    setIsChapterTransitionActive(false);
    setIsOpeningTransitionActive(false);
    setIsPaperZoomOpen(false);
    setIsChoiceOverlayDelayed(false);
    setIsProgressionPending(false);
    setReadNoticePosterIds([]);
    clearGameState();
    setGameState(initialState);
    setHasOpenedGame(false);
    setIsShowingSplash(false);
    setSelectedNoticePosterId(null);
  }

  if (!hasOpenedGame && !isShowingSplash) {
    return (
      <OpeningScreen
        isTransitionActive={isOpeningTransitionActive}
        onStart={() => setIsShowingSplash(true)}
      />
    );
  }

  return (
    <>
      {isShowingSplash && (
        <SplashScreen
          onDone={handleStartGame}
          onGone={() => setIsShowingSplash(false)}
        />
      )}
      {!hasOpenedGame ? null : (
    <GameLayout
      chapter={chapter}
      onNewGame={handleNewGame}
      backgroundImage={displayedScene.backgroundImage}
      sceneView={
        <SceneView
          scene={displayedScene}
          visibleCharacterSides={visibleCharacterSides}
          onNoticePosterClick={(posterId) => {
            setReadNoticePosterIds((currentPosterIds) =>
              currentPosterIds.includes(posterId)
                ? currentPosterIds
                : [...currentPosterIds, posterId],
            );

            setSelectedNoticePosterId(posterId);
            setIsPaperZoomOpen(true);
          }}
        >
          {sceneOverlay}
        </SceneView>
      }
      dialogueBox={
        shouldHideDialogueBox ? null : (
          <DialogueBox
            scene={scene}
            isMiniGameActive={Boolean(shouldShowMiniGame)}
            isNextLocked={isNoticeSceneLocked}
            isWaitingForChoiceConfirm={isWaitingForChoiceConfirm}
            onNext={handleNext}
            onConfirmChoiceReady={() => setIsWaitingForChoiceConfirm(false)}
          />
        )
      }
      inventory={<ElementInventory acquiredElements={gameState.acquiredElements} />}
      isChapterTransitionActive={isChapterTransitionActive}
      isChoiceOverlayOpen={hasChoiceOverlay}
      choiceOverlay={
        hasChoiceOverlay ? (
          <div className="choice-overlay">
            <div className="choice-list">
              {scene.choices?.map((choice) => (
                <ChoiceButton
                  key={choice.id}
                  choice={choice}
                  onSelect={handleChoice}
                />
              ))}
            </div>
          </div>
        ) : null
      }
      isPaperZoomOpen={isPaperZoomOpen}
      paperZoomOverlay={
        isPaperZoomOpen && selectedNoticePosterZoomImage ? (
          <button
            className="paper-zoom-overlay"
            type="button"
            aria-label="벽보 확대 닫기"
            onClick={() => {
              setIsPaperZoomOpen(false);
              setSelectedNoticePosterId(null);
            }}
          >
            <img src={selectedNoticePosterZoomImage} alt="확대된 벽보" />
          </button>
        ) : null
      }
      elementToast={
        gainedElementToast ? (
          <div className="element-toast" key={gainedElementToast.id}>
            {gainedElementToast.text}
          </div>
        ) : null
      }
    />
      )}
      {endingReveal && (
        <div className="ending-reveal-overlay">
          <div
            className={`ending-scene-bg ${endingReveal.isPostScene ? "is-visible" : ""}`}
          />
          {endingReveal.phase === "toast" && endings[endingReveal.endingId] && (
            <div className="ending-reveal-toast">
              엔딩 : {endings[endingReveal.endingId].title}
            </div>
          )}
          {endingReveal.phase === "dialogue" && (() => {
            const script = endingDialogue[endingReveal.endingId];
            const lines = endingReveal.isPostScene
              ? (script?.postScene ?? [])
              : (script?.preScene ?? []);
            const line = lines[endingReveal.dialogueIndex];
            if (!line) return null;
            return (
              <button
                className="ending-dialogue-box"
                type="button"
                onClick={handleEndingDialogueAdvance}
              >
                <span className="ending-dialogue-speaker">[{line.speaker}]</span>
                <p className="ending-dialogue-text">{line.text}</p>
                <span className="ending-dialogue-caret">▼</span>
              </button>
            );
          })()}
          {endingReveal.phase === "panel" && endings[endingReveal.endingId] && (
            <section className="ending-panel ending-panel-reveal">
              <p>Ending</p>
              <h2>{endings[endingReveal.endingId].title}</h2>
              <strong>{endings[endingReveal.endingId].description}</strong>
              <button type="button" onClick={handleNewGame}>
                처음부터 다시 하기
              </button>
            </section>
          )}
        </div>
      )}
    </>
  );
}
