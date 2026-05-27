import { useEffect, useRef, useState } from "react";
import type { MiniGameProps } from "../types/game";

const TOTAL_TIME = 15;
const SUCCESS_THRESHOLD = 3;

type Tile = {
  id: string;
  description: string;
  isMissionary: boolean;
};

const ALL_TILES: Tile[] = [
  { id: "m1", description: "성경과 기도서를 손에 들고 있다", isMissionary: true },
  { id: "m2", description: "원주민 아이에게 영어를 가르치고 있다", isMissionary: true },
  { id: "m3", description: "십자가 목걸이를 한 채 설교하고 있다", isMissionary: true },
  { id: "m4", description: "영국 국왕의 이름으로 집회를 열고 있다", isMissionary: true },
  { id: "n1", description: "물고기를 손질하며 낯선 사람들을 바라보고 있다", isMissionary: false },
  { id: "n2", description: "언덕 위에서 낯선 배를 조용히 바라보고 있다", isMissionary: false },
  { id: "n3", description: "아이들과 함께 언덕을 뛰어다니고 있다", isMissionary: false },
  { id: "n4", description: "전통 방식으로 음식을 준비하고 있다", isMissionary: false },
  { id: "n5", description: "부족 말로 노래를 부르고 있다", isMissionary: false },
  { id: "s1", description: "닻줄을 정리하며 상륙 준비를 하고 있다", isMissionary: false },
  { id: "s2", description: "갑판에서 망원경으로 해안을 보고 있다", isMissionary: false },
  { id: "d1", description: "표본 채집 도구를 들고 메모를 하고 있다", isMissionary: false },
];

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function MissionaryClickGame({ onComplete }: MiniGameProps) {
  const [tiles] = useState(() => shuffle(ALL_TILES));
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
      (id) => ALL_TILES.find((t) => t.id === id)?.isMissionary,
    ).length;

    const success = correctClicks >= SUCCESS_THRESHOLD;
    onComplete({
      success,
      gainedElements: success ? ["imperialism_shadow"] : ["social_context_missing"],
    });
  }, [isFinished, selectedIds, onComplete]);

  const handleTileClick = (id: string) => {
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
          <h2>선교사를 찾아라</h2>
        </div>
        <div className={`click-timer ${timeLeft <= 5 ? "is-urgent" : ""}`}>
          {timeLeft}초
        </div>
      </div>

      <p className="click-game-desc">
        마을 사람들 중 영국에서 온 선교사를 모두 찾아 클릭하세요.
      </p>

      <div className="click-tile-grid">
        {tiles.map((tile) => (
          <button
            key={tile.id}
            type="button"
            className={`click-tile ${selectedIds.has(tile.id) ? "is-selected" : ""}`}
            onClick={() => handleTileClick(tile.id)}
            disabled={isFinished}
          >
            {tile.description}
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
