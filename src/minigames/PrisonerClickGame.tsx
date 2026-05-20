import type { MiniGameProps } from "../types/game";

export default function PrisonerClickGame({ onComplete }: MiniGameProps) {
  return (
    <section className="mini-game-card placeholder-game">
      <h2>죄수를 잡아라</h2>
      <p>후속 확장용 placeholder 미니게임입니다.</p>
      <button
        type="button"
        onClick={() => onComplete({ success: true, gainedElements: [] })}
      >
        placeholder 완료
      </button>
    </section>
  );
}
