import type { Scene } from "../types/game";

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

  const handleDialogueClick = () => {
    if (canClickToNext) {
      onNext();
    }
  };

  const handleDialogueKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (canClickToNext && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onNext();
    }
  };

  return (
    <section
      className={`dialogue-box ${canClickToNext ? "is-clickable" : ""}`}
      role={canClickToNext ? "button" : undefined}
      tabIndex={canClickToNext ? 0 : undefined}
      onClick={handleDialogueClick}
      onKeyDown={handleDialogueKeyDown}
    >
      <div className="speaker-tab">{scene.speakerName}</div>
      <p>{scene.dialogueText}</p>
      {isNextLocked ? (
        <small className="dialogue-lock-hint">
          벽보를 눌러 내용을 확인해보자.
        </small>
      ) : null}

    </section>
  );
}
