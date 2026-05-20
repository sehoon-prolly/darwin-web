import type { Scene } from "../types/game";

type DialogueBoxProps = {
  scene: Scene;
  isMiniGameActive: boolean;
  onNext: () => void;
};

export default function DialogueBox({
  scene,
  isMiniGameActive,
  onNext,
}: DialogueBoxProps) {
  const hasChoices = Boolean(scene.choices?.length);
  const canMoveNext = Boolean(scene.nextSceneId || scene.nextChapterId);
  const canClickToNext = !hasChoices && canMoveNext && !isMiniGameActive;

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

    </section>
  );
}
