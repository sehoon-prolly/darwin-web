import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { Scene } from "../types/game";

const TYPING_INTERVAL_MS = 24;

type DialogueBoxProps = {
  scene: Scene;
  isMiniGameActive: boolean;
  isNextLocked?: boolean;
  onNext: () => void;
};

export default function DialogueBox({
  scene,
  isMiniGameActive,
  isNextLocked = false,
  onNext,
}: DialogueBoxProps) {
  const hasChoices = Boolean(scene.choices?.length);
  const canMoveNext = Boolean(scene.nextSceneId || scene.nextChapterId);
  const canClickToNext =
    !hasChoices && canMoveNext && !isMiniGameActive && !isNextLocked;
  const textCharacters = useMemo(
    () => Array.from(scene.dialogueText),
    [scene.dialogueText],
  );
  const [typingState, setTypingState] = useState({
    sceneId: scene.id,
    visibleCharacterCount: 0,
  });
  const typingIntervalRef = useRef<number | null>(null);
  const visibleCharacterCount =
    typingState.sceneId === scene.id
      ? Math.min(typingState.visibleCharacterCount, textCharacters.length)
      : 0;
  const displayedText = textCharacters.slice(0, visibleCharacterCount).join("");
  const isTyping = visibleCharacterCount < textCharacters.length;
  const canInteractWithDialogue = isTyping || canClickToNext;

  const clearTypingInterval = () => {
    if (typingIntervalRef.current === null) {
      return;
    }

    window.clearInterval(typingIntervalRef.current);
    typingIntervalRef.current = null;
  };

  useEffect(() => {
    clearTypingInterval();
    setTypingState({
      sceneId: scene.id,
      visibleCharacterCount: 0,
    });

    if (textCharacters.length === 0) {
      return;
    }

    let nextCharacterCount = 0;
    const intervalId = window.setInterval(() => {
      nextCharacterCount += 1;
      setTypingState({
        sceneId: scene.id,
        visibleCharacterCount: nextCharacterCount,
      });

      if (nextCharacterCount >= textCharacters.length) {
        clearTypingInterval();
      }
    }, TYPING_INTERVAL_MS);
    typingIntervalRef.current = intervalId;

    return clearTypingInterval;
  }, [scene.id, scene.dialogueText, textCharacters.length]);

  const revealFullText = () => {
    clearTypingInterval();
    setTypingState({
      sceneId: scene.id,
      visibleCharacterCount: textCharacters.length,
    });
  };

  const handleDialogueClick = () => {
    if (isTyping) {
      revealFullText();
      return;
    }

    if (canClickToNext) {
      onNext();
    }
  };

  const handleDialogueKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!canInteractWithDialogue) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      if (isTyping) {
        revealFullText();
        return;
      }

      if (canClickToNext) {
        onNext();
      }
    }
  };

  return (
    <section
      className={`dialogue-box ${canInteractWithDialogue ? "is-clickable" : ""}`}
      role={canInteractWithDialogue ? "button" : undefined}
      tabIndex={canInteractWithDialogue ? 0 : undefined}
      onClick={handleDialogueClick}
      onKeyDown={handleDialogueKeyDown}
    >
      <div className="speaker-tab">{scene.speakerName}</div>
      <p>
        {displayedText}
        {isTyping ? <span className="typing-caret" aria-hidden="true" /> : null}
      </p>
      {isNextLocked ? (
        <small className="dialogue-lock-hint">
          모든 벽보를 눌러 내용을 확인해보자.
        </small>
      ) : null}

    </section>
  );
}
