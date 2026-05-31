import { useEffect, useMemo, useRef, useState } from "react";
import GameLayout from "./components/GameLayout";
import SceneView from "./components/SceneView";
import DialogueBox from "./components/DialogueBox";
import ElementInventory from "./components/ElementInventory";
import ChoiceButton from "./components/ChoiceButton";
import MiniGameRenderer from "./components/MiniGameRenderer";
import DebugPanel from "./components/DebugPanel";
import FinalManuscriptPanel from "./components/FinalManuscriptPanel";
import OpeningScreen from "./components/OpeningScreen";
import { chapterMap, chapters } from "./data/chapters";
import { gameElements } from "./data/elements";
import { endings } from "./data/endings";
import type { Chapter, Choice, GameState, MiniGameResult, Scene } from "./types/game";
import { clearGameState, loadGameState, saveGameState } from "./utils/storage";
import { judgeEnding } from "./utils/endingJudge";

const firstChapter = chapters[0];
const CHAPTER_FADE_MS = 800;
const CHAPTER_SWAP_DELAY_MS = 0;
const ELEMENT_TOAST_DURATION_MS = 1200;
const CHOICE_OVERLAY_AFTER_TOAST_DELAY_MS = 300;
const CHOICE_OVERLAY_DELAY_MS =
  ELEMENT_TOAST_DURATION_MS + CHOICE_OVERLAY_AFTER_TOAST_DELAY_MS;
const POST_TOAST_NAVIGATION_DELAY_MS = CHOICE_OVERLAY_DELAY_MS;
const NOTICE_POSTER_SCENE_ID = "chapter0-scene15";
const REQUIRED_NOTICE_POSTER_IDS = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
];
const NOTICE_POSTER_ZOOM_IMAGES: Record<string, string> = {
  "top-left": "/assets/backgrounds/paper-zoomin.png",
  "top-right": "/assets/backgrounds/paper-zoomin.png",
  "bottom-left": "/assets/backgrounds/paper-zoomin.png",
  "bottom-right": "/assets/backgrounds/paper-zoomin.png",
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

function getSpeakerCharacterSide(speakerName: string) {
  if (!speakerName || speakerName === "해설") {
    return null;
  }

  if (speakerName.includes("다윈")) {
    return "right";
  }

  return "left";
}

function getAppearedCharacterSides(chapter: Chapter, currentSceneId: string) {
  const currentSceneIndex = chapter.scenes.findIndex(
    (chapterScene) => chapterScene.id === currentSceneId,
  );
  const scenesSoFar = chapter.scenes.slice(
    0,
    currentSceneIndex >= 0 ? currentSceneIndex + 1 : 1,
  );

  return {
    left: scenesSoFar.some(
      (chapterScene) => getSpeakerCharacterSide(chapterScene.speakerName) === "left",
    ),
    right: scenesSoFar.some(
      (chapterScene) => getSpeakerCharacterSide(chapterScene.speakerName) === "right",
    ),
  };
}

export default function App() {
  const [hasOpenedGame, setHasOpenedGame] = useState(false);
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
  const chapterTransitionTimeouts = useRef<number[]>([]);
  const choiceOverlayDelayTimeout = useRef<number | null>(null);
  const gainedElementToastDelayTimeout = useRef<number | null>(null);
  const postToastNavigationTimeout = useRef<number | null>(null);
  const [gameState, setGameState] = useState<GameState>(() => {
    return loadGameState() ?? initialState;
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
    gameState.isMiniGameActive &&
    scene.miniGameType &&
    scene.miniGameType !== "none";
  const isFinalManuscriptOpen = isFinalChapter && !ending;
  const shouldHideDialogueBox = Boolean(
    ending || shouldShowMiniGame || isFinalManuscriptOpen,
  );
  const [isChoiceOverlayDelayed, setIsChoiceOverlayDelayed] = useState(false);
  const hasChoiceOverlay = Boolean(
    scene.choices?.length &&
      !ending &&
      !isChoiceOverlayDelayed &&
      !isProgressionPending,
  );
  const isNoticeSceneLocked =
    scene.id === NOTICE_POSTER_SCENE_ID &&
    !REQUIRED_NOTICE_POSTER_IDS.every((posterId) =>
      readNoticePosterIds.includes(posterId),
    );
  const selectedNoticePosterZoomImage = selectedNoticePosterId
    ? NOTICE_POSTER_ZOOM_IMAGES[selectedNoticePosterId]
    : null;
  const displayedScene = ending?.backgroundImage
    ? { ...scene, backgroundImage: ending.backgroundImage }
    : scene;

  useEffect(() => {
    saveGameState(gameState);
  }, [gameState]);

  useEffect(() => {
    return () => {
      clearChapterTransitionTimeouts();
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

    if (isFinalChapter) {
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
    isFinalChapter,
    scene.id,
    scene.choices,
    scene.miniGameType,
    shouldShowMiniGame,
  ]);

  function moveTo(nextSceneId?: string, nextChapterId?: string) {
    if (nextChapterId) {
      runChapterTransition(() => {
        setGameState((currentState) => {
          const nextChapter = chapterMap[nextChapterId] ?? firstChapter;
          const nextScene = getFirstScene(nextChapter);

          return {
            ...currentState,
            currentChapterId: nextChapter.id,
            currentSceneId: nextScene.id,
            isMiniGameActive:
              Boolean(nextScene.miniGameType) && nextScene.miniGameType !== "none",
            selectedFinalElements:
              nextChapter.id === "chapter9"
                ? currentState.acquiredElements
                : currentState.selectedFinalElements,
          };
        });
      });
      return;
    }

    setGameState((currentState) => {
      if (nextSceneId) {
        const nextScene = findScene(chapter, nextSceneId);

        return {
          ...currentState,
          currentSceneId: nextScene.id,
          isMiniGameActive:
            Boolean(nextScene.miniGameType) && nextScene.miniGameType !== "none",
        };
      }

      return currentState;
    });
  }

  function clearChapterTransitionTimeouts() {
    chapterTransitionTimeouts.current.forEach((timeoutId) =>
      window.clearTimeout(timeoutId),
    );
    chapterTransitionTimeouts.current = [];
  }

  function runChapterTransition(updateChapter: () => void) {
    clearChapterTransitionTimeouts();
    setIsChapterTransitionActive(true);

    const swapTimeoutId = window.setTimeout(() => {
      updateChapter();

      const fadeInTimeoutId = window.setTimeout(() => {
        setIsChapterTransitionActive(false);
        chapterTransitionTimeouts.current = [];
      }, CHAPTER_SWAP_DELAY_MS);

      chapterTransitionTimeouts.current.push(fadeInTimeoutId);
    }, CHAPTER_FADE_MS);

    chapterTransitionTimeouts.current.push(swapTimeoutId);
  }

  function handleNext() {
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
      text: `획득 요소 : ${labels.join(", ")}를 획득했습니다.`,
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
          runChapterTransition(() => {
            setGameState((currentState) => {
              const nextChapter =
                chapterMap[choice.nextChapterId ?? ""] ?? firstChapter;
              const nextScene = getFirstScene(nextChapter);

              return {
                ...currentState,
                currentChapterId: nextChapter.id,
                currentSceneId: nextScene.id,
                selectedFinalElements:
                  nextChapter.id === "chapter9"
                    ? currentState.acquiredElements
                    : currentState.selectedFinalElements,
                isMiniGameActive:
                  Boolean(nextScene.miniGameType) &&
                  nextScene.miniGameType !== "none",
              };
            });
            setIsProgressionPending(false);
          });
          return;
        }

        if (choice.nextSceneId) {
          setGameState((currentState) => {
            const nextScene = findScene(chapter, choice.nextSceneId ?? "");

            return {
              ...currentState,
              currentSceneId: nextScene.id,
              isMiniGameActive:
                Boolean(nextScene.miniGameType) &&
                nextScene.miniGameType !== "none",
            };
          });
        }

        setIsProgressionPending(false);
      });
      return;
    }

    if (choice.nextChapterId) {
      runChapterTransition(() => {
        setGameState((currentState) => {
          const acquiredElements = uniqueElements([
            ...currentState.acquiredElements,
            ...(choice.gainedElements ?? []),
          ]);
          const nextChapter = chapterMap[choice.nextChapterId ?? ""] ?? firstChapter;
          const nextScene = getFirstScene(nextChapter);

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
            isMiniGameActive:
              Boolean(nextScene.miniGameType) && nextScene.miniGameType !== "none",
          };
        });
      });
      return;
    }

    announceGainedElements(choice.gainedElements);

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

      if (choice.nextSceneId) {
        const nextScene = findScene(chapter, choice.nextSceneId);

        return {
          ...currentState,
          currentSceneId: nextScene.id,
          acquiredElements,
          selectedChoices: uniqueElements([
            ...currentState.selectedChoices,
            choice.id,
          ]),
          isMiniGameActive:
            Boolean(nextScene.miniGameType) && nextScene.miniGameType !== "none",
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
        runChapterTransition(() => {
          setGameState((currentState) => {
            const nextChapter =
              chapterMap[scene.nextChapterId ?? ""] ?? firstChapter;
            const nextScene = getFirstScene(nextChapter);

            return {
              ...currentState,
              currentChapterId: nextChapter.id,
              currentSceneId: nextScene.id,
              selectedFinalElements:
                nextChapter.id === "chapter9"
                  ? currentState.acquiredElements
                  : currentState.selectedFinalElements,
              isMiniGameActive:
                Boolean(nextScene.miniGameType) &&
                nextScene.miniGameType !== "none",
            };
          });
          setIsProgressionPending(false);
        });
      });
      return;
    }

    if (scene.nextChapterId) {
      runChapterTransition(() => {
        setGameState((currentState) => {
          const acquiredElements = uniqueElements([
            ...currentState.acquiredElements,
            ...result.gainedElements,
          ]);
          const nextChapter = chapterMap[scene.nextChapterId ?? ""] ?? firstChapter;
          const nextScene = getFirstScene(nextChapter);

          return {
            ...currentState,
            currentChapterId: nextChapter.id,
            currentSceneId: nextScene.id,
            acquiredElements,
            selectedFinalElements:
              nextChapter.id === "chapter9"
                ? acquiredElements
                : currentState.selectedFinalElements,
            isMiniGameActive:
              Boolean(nextScene.miniGameType) && nextScene.miniGameType !== "none",
          };
        });
      });
      return;
    }

    announceGainedElements(result.gainedElements);

    setGameState((currentState) => {
      const acquiredElements = uniqueElements([
        ...currentState.acquiredElements,
        ...result.gainedElements,
      ]);

      if (scene.nextSceneId) {
        const nextScene = findScene(chapter, scene.nextSceneId);

        return {
          ...currentState,
          currentSceneId: nextScene.id,
          acquiredElements,
          isMiniGameActive:
            Boolean(nextScene.miniGameType) && nextScene.miniGameType !== "none",
        };
      }

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
    setGameState((currentState) => {
      const finalEnding = judgeEnding(currentState.selectedFinalElements);

      return {
        ...currentState,
        currentEnding: finalEnding.id,
        isMiniGameActive: false,
      };
    });
  }

  function handleAddDebugElement(elementId: string) {
    announceGainedElements([elementId]);

    setGameState((currentState) => {
      const acquiredElements = uniqueElements([
        ...currentState.acquiredElements,
        elementId,
      ]);

      return {
        ...currentState,
        acquiredElements,
        selectedFinalElements: isFinalChapter
          ? uniqueElements([...currentState.selectedFinalElements, elementId])
          : currentState.selectedFinalElements,
      };
    });
  }

  function handleClearElements() {
    setGameState((currentState) => ({
      ...currentState,
      acquiredElements: [],
      selectedFinalElements: [],
    }));
  }

  function handleNewGame() {
    clearChapterTransitionTimeouts();
    clearChoiceOverlayDelayTimeout();
    clearGainedElementToastDelayTimeout();
    clearPostToastNavigationTimeout();
    setIsChapterTransitionActive(false);
    setIsPaperZoomOpen(false);
    setIsChoiceOverlayDelayed(false);
    setIsProgressionPending(false);
    setReadNoticePosterIds([]);
    clearGameState();
    setGameState(initialState);
    setHasOpenedGame(false);
    setSelectedNoticePosterId(null);
  }

  if (!hasOpenedGame) {
    return <OpeningScreen onStart={() => setHasOpenedGame(true)} />;
  }

  return (
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
            onNext={handleNext}
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
      debugPanel={
        <DebugPanel
          onAddElement={handleAddDebugElement}
          onClearElements={handleClearElements}
        />
      }
      elementToast={
        gainedElementToast ? (
          <div className="element-toast" key={gainedElementToast.id}>
            {gainedElementToast.text}
          </div>
        ) : null
      }
    />
  );
}
