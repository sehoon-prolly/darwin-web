import { useEffect, useRef, useState } from "react";
import type { MiniGameProps } from "../types/game";

const TOTAL_TIME = 12;
const SUCCESS_THRESHOLD = 4;

type Cell = {
  id: string;
  description: string;
  isEscaped: boolean;
};

const ALL_CELLS: Cell[] = [
  { id: "e1", description: "담장을 넘어 숲으로 사라지고 있다", isEscaped: true },
  { id: "e2", description: "쇠사슬을 끊고 달아나고 있다", isEscaped: true },
  { id: "e3", description: "파수꾼의 눈을 피해 기어가고 있다", isEscaped: true },
  { id: "e4", description: "다른 죄수와 함께 어둠 속을 달리고 있다", isEscaped: true },
  { id: "e5", description: "밧줄을 타고 담장을 내려오고 있다", isEscaped: true },
  { id: "e6", description: "수용소 울타리에 구멍을 뚫고 있다", isEscaped: true },
  { id: "c1", description: "독방 안에 홀로 갇혀 있다", isEscaped: false },
  { id: "c2", description: "교도관의 감시 아래 강제 노동 중이다", isEscaped: false },
  { id: "c3", description: "무거운 쇠사슬에 묶여 이동하고 있다", isEscaped: false },
  { id: "c4", description: "수용소 마당에서 대기하고 있다", isEscaped: false },
  { id: "c5", description: "교도관의 명령에 따라 작업하고 있다", isEscaped: false },
  { id: "c6", description: "사면을 기다리며 서류를 작성하고 있다", isEscaped: false },
];

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function PrisonerClickGame({ onComplete }: MiniGameProps) {
  const [cells] = useState(() => shuffle(ALL_CELLS));
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isFinished, setIsFinished] = useState(false);
  const hasCompleted = useRef(false);

  useEffect(() => {
    if (isFinished) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isFinished]);

  useEffect(() => {
    if (!isFinished || hasCompleted.current) return;
    hasCompleted.current = true;

    const correctClicks = [...selectedIds].filter(
      (id) => ALL_CELLS.find((c) => c.id === id)?.isEscaped,
    ).length;

    const success = correctClicks >= SUCCESS_THRESHOLD;
    onComplete({
      success,
      gainedElements: success ? ["competition_structure"] : ["incomplete_natural_selection"],
    });
  }, [isFinished, selectedIds, onComplete]);

  const handleCellClick = (id: string) => {
    if (isFinished) return;
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSubmit = () => {
    setIsFinished(true);
  };

  return (
    <section className="mini-game-card click-game">
      <div className="mini-game-heading">
        <div>
          <p>Mini Game</p>
          <h2>죄수를 잡아라</h2>
        </div>
        <div className={`click-timer ${timeLeft <= 5 ? "is-urgent" : ""}`}>
          {timeLeft}초
        </div>
      </div>

      <p className="click-game-desc">
        오스트레일리아 유배지에서 탈주를 시도하는 죄수들을 찾아 클릭하세요.
      </p>

      <div className="click-tile-grid">
        {cells.map((cell) => (
          <button
            key={cell.id}
            type="button"
            className={`click-tile ${selectedIds.has(cell.id) ? "is-selected" : ""}`}
            onClick={() => handleCellClick(cell.id)}
            disabled={isFinished}
          >
            {cell.description}
          </button>
        ))}
      </div>

      <div className="mini-game-footer">
        <p>{selectedIds.size}명 선택됨</p>
        <button
          className="submit-match-button"
          type="button"
          disabled={isFinished}
          onClick={handleSubmit}
        >
          제출하기
        </button>
      </div>
    </section>
  );
}
