import type { MiniGameProps } from "../types/game";

export default function SkeletonMatchingGame({ onComplete }: MiniGameProps) {
  return (
    <section className="mini-game-card placeholder-game">
      <h2>골격 연결</h2>
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
