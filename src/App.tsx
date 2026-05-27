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
const TOAST_AFTER_CHAPTER_TRANSITION_DELAY_MS = 300;
const CHAPTER_TRANSITION_TOTAL_MS =
  CHAPTER_FADE_MS + CHAPTER_SWAP_DELAY_MS + CHAPTER_FADE_MS;
const ELEMENT_TOAST_DURATION_MS = 1800;
const CHOICE_OVERLAY_AFTER_TOAST_DELAY_MS = 300;
const CHOICE_OVERLAY_DELAY_MS =
  ELEMENT_TOAST_DURATION_MS + CHOICE_OVERLAY_AFTER_TOAST_DELAY_MS;

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

export default function App() {
  const [hasOpenedGame, setHasOpenedGame] = useState(false);
  const [gainedElementToast, setGainedElementToast] = useState<{
    id: number;
    text: string;
  } | null>(null);
  const [isChapterTransitionActive, setIsChapterTransitionActive] =
    useState(false);
  const [isPaperZoomOpen, setIsPaperZoomOpen] = useState(false);
  const [hasReadRequiredPoster, setHasReadRequiredPoster] = useState(false);
  const chapterTransitionTimeouts = useRef<number[]>([]);
  const choiceOverlayDelayTimeout = useRef<number | null>(null);
  const gainedElementToastDelayTimeout = useRef<number | null>(null);
  const [gameState, setGameState] = useState<GameState>(() => {
    return loadGameState() ?? initialState;
  });

  const chapter = chapterMap[gameState.currentChapterId] ?? firstChapter;
  const scene = findScene(chapter, gameState.currentSceneId);
  const ending = gameState.currentEnding
    ? endings[gameState.currentEnding]
    : null;

  const isFinalChapter = chapter.id === "chapter9";
  const shouldShowMiniGame =
    gameState.isMiniGameActive &&
    scene.miniGameType &&
    scene.miniGameType !== "none";
  const [isChoiceOverlayDelayed, setIsChoiceOverlayDelayed] = useState(false);
  const hasChoiceOverlay = Boolean(
    scene.choices?.length && !ending && !isChoiceOverlayDelayed,
  );
  const isNoticeSceneLocked =
    scene.id === "assistant_notice" && !hasReadRequiredPoster;

  useEffect(() => {
    saveGameState(gameState);
  }, [gameState]);

  useEffect(() => {
    return () => {
      clearChapterTransitionTimeouts();
      clearChoiceOverlayDelayTimeout();
      clearGainedElementToastDelayTimeout();
    };
  }, []);

  useEffect(() => {
    setIsPaperZoomOpen(false);
    if (gameState.currentSceneId !== "assistant_notice") {
      setHasReadRequiredPoster(false);
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
    if (choice.nextChapterId) {
      announceGainedElements(
        choice.gainedElements,
        CHAPTER_TRANSITION_TOTAL_MS + TOAST_AFTER_CHAPTER_TRANSITION_DELAY_MS,
      );

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
    if (scene.nextChapterId) {
      announceGainedElements(
        result.gainedElements,
        CHAPTER_TRANSITION_TOTAL_MS + TOAST_AFTER_CHAPTER_TRANSITION_DELAY_MS,
      );

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
    setIsChapterTransitionActive(false);
    setIsPaperZoomOpen(false);
    setIsChoiceOverlayDelayed(false);
    setHasReadRequiredPoster(false);
    clearGameState();
    setGameState(initialState);
    setHasOpenedGame(false);
  }

  if (!hasOpenedGame) {
    return <OpeningScreen onStart={() => setHasOpenedGame(true)} />;
  }

  return (
    <GameLayout
      chapter={chapter}
      onNewGame={handleNewGame}
      backgroundImage={scene.backgroundImage}
      sceneView={
        <SceneView
          scene={scene}
          onNoticePosterClick={(posterId) => {
            if (posterId === "bottom-left") {
              setHasReadRequiredPoster(true);
            }

            setIsPaperZoomOpen(true);
          }}
        >
          {sceneOverlay}
        </SceneView>
      }
      dialogueBox={
        ending ? null : (
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
            <section className="choice-panel">
              <div className="choice-list">
                {scene.choices?.map((choice) => (
                  <ChoiceButton
                    key={choice.id}
                    choice={choice}
                    onSelect={handleChoice}
                  />
                ))}
              </div>
            </section>
          </div>
        ) : null
      }
      isPaperZoomOpen={isPaperZoomOpen}
      paperZoomOverlay={
        isPaperZoomOpen ? (
          <button
            className="paper-zoom-overlay"
            type="button"
            aria-label="벽보 확대 닫기"
            onClick={() => setIsPaperZoomOpen(false)}
          >
            <img src="/assets/backgrounds/paper-zoomin.png" alt="확대된 벽보" />
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
