import { useEffect, useRef, useState } from "react";
import type { MiniGameProps } from "../types/game";

const HOLE_COUNT = 9;
const TARGET_SCORE = 5;
const MAX_LIVES = 3;
const SPAWN_INTERVAL_MS = 720;
const POPUP_LIFETIME_MS = 980;
const TARGET_POPUP_CHANCE = 0.34;

type PopupType = "target" | "distractor";

type Popup = {
  id: number;
  type: PopupType;
};

type HoleState = Popup | null;

function createEmptyHoles() {
  return Array.from<HoleState>({ length: HOLE_COUNT }).fill(null);
}

function getRandomItem<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

export default function PrisonerClickGame({ onComplete }: MiniGameProps) {
  const [holes, setHoles] = useState<HoleState[]>(() => createEmptyHoles());
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [result, setResult] = useState<boolean | null>(null);

  const popupIdRef = useRef(0);
  const scoreRef = useRef(0);
  const livesRef = useRef(MAX_LIVES);
  const hasCompleted = useRef(false);
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearPopupTimers = () => {
    timeoutRefs.current.forEach((timer) => clearTimeout(timer));
    timeoutRefs.current = [];
  };

  const finishGame = (success: boolean) => {
    setResult((currentResult) => currentResult ?? success);
  };

  const removePopup = (holeIndex: number, popupId: number) => {
    setHoles((currentHoles) => {
      if (currentHoles[holeIndex]?.id !== popupId) {
        return currentHoles;
      }

      const nextHoles = [...currentHoles];
      nextHoles[holeIndex] = null;
      return nextHoles;
    });
  };

  const spawnPopup = () => {
    const popupId = popupIdRef.current + 1;
    popupIdRef.current = popupId;

    setHoles((currentHoles) => {
      const emptyHoleIndexes = currentHoles
        .map((popup, index) => (popup ? null : index))
        .filter((index): index is number => index !== null);

      if (emptyHoleIndexes.length === 0) {
        return currentHoles;
      }

      const holeIndex = getRandomItem(emptyHoleIndexes);
      const popupType: PopupType =
        Math.random() < TARGET_POPUP_CHANCE ? "target" : "distractor";
      const nextHoles = [...currentHoles];
      nextHoles[holeIndex] = {
        id: popupId,
        type: popupType,
      };

      const timer = setTimeout(() => {
        removePopup(holeIndex, popupId);
      }, POPUP_LIFETIME_MS);
      timeoutRefs.current.push(timer);

      return nextHoles;
    });
  };

  useEffect(() => {
    if (result !== null) {
      clearPopupTimers();
      setHoles(createEmptyHoles());
      return;
    }

    const initialTimer = setTimeout(spawnPopup, 260);
    const interval = setInterval(spawnPopup, SPAWN_INTERVAL_MS);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [result]);

  useEffect(() => {
    return clearPopupTimers;
  }, []);

  useEffect(() => {
    if (result === null || hasCompleted.current) {
      return;
    }

    hasCompleted.current = true;
    onComplete({
      success: result,
      gainedElements: result ? ["imperialism_shadow"] : ["social_context_missing"],
    });
  }, [onComplete, result]);

  const handlePopupClick = (holeIndex: number) => {
    if (result !== null) {
      return;
    }

    const popup = holes[holeIndex];

    if (!popup) {
      return;
    }

    setHoles((currentHoles) => {
      const nextHoles = [...currentHoles];
      nextHoles[holeIndex] = null;
      return nextHoles;
    });

    if (popup.type === "target") {
      const nextScore = scoreRef.current + 1;
      scoreRef.current = nextScore;
      setScore(nextScore);

      if (nextScore >= TARGET_SCORE) {
        finishGame(true);
      }
      return;
    }

    const nextLives = livesRef.current - 1;
    livesRef.current = nextLives;
    setLives(nextLives);

    if (nextLives <= 0) {
      finishGame(false);
    }
  };

  const handleRestart = () => {
    clearPopupTimers();
    popupIdRef.current = 0;
    scoreRef.current = 0;
    livesRef.current = MAX_LIVES;
    hasCompleted.current = false;
    setHoles(createEmptyHoles());
    setScore(0);
    setLives(MAX_LIVES);
    setResult(null);
  };

  return (
    <section className="mini-game-card whack-game">
      <div className="whack-hud">
        <div className="whack-score">
          <span>Score</span>
          <strong>
            {score}/{TARGET_SCORE}
          </strong>
        </div>

        <div className="whack-title">
          <p>Mini Game</p>
          <h2>죄수를 잡아라</h2>
        </div>

        <div className="whack-lives" aria-label={`남은 목숨 ${lives}개`}>
          {Array.from({ length: MAX_LIVES }, (_, index) => (
            <span
              className={index < lives ? "is-live" : "is-lost"}
              key={`life-${index}`}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      <div className="whack-stage" aria-label="구멍에서 올라오는 캐릭터 클릭 게임">
        {holes.map((popup, index) => (
          <button
            className={`whack-hole ${popup ? `has-popup ${popup.type}` : ""}`}
            key={`hole-${index}`}
            type="button"
            disabled={result !== null}
            onClick={() => handlePopupClick(index)}
            aria-label={
              popup
                ? popup.type === "target"
                  ? "대상 죄수"
                  : "비대상 인물"
                : "빈 구멍"
            }
          >
            <span className="whack-hole-shadow" />
            {popup ? (
              <span className={`whack-character ${popup.type}`}>
                <span className="whack-head">
                  <span className="whack-eye left" />
                  <span className="whack-eye right" />
                </span>
                <span className="whack-body" />
              </span>
            ) : null}
          </button>
        ))}
      </div>

      <div className="mini-game-footer whack-footer">
        <p>줄무늬 죄수 캐릭터만 클릭하세요. 다른 인물을 누르면 목숨이 줄어듭니다.</p>
        <button
          className="submit-match-button whack-reset-button"
          type="button"
          onClick={handleRestart}
        >
          다시 시작
        </button>
      </div>
    </section>
  );
}
