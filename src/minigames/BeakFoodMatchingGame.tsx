import { useMemo, useState } from "react";
import type { MiniGameProps } from "../types/game";

type Beak = {
  id: string;
  label: string;
  note: string;
};

type Food = {
  id: string;
  label: string;
  island: string;
  correctBeakId: string;
};

const beaks: Beak[] = [
  {
    id: "strong",
    label: "굵고 강한 부리",
    note: "단단한 껍질을 깨는 힘",
  },
  {
    id: "thin",
    label: "가늘고 뾰족한 부리",
    note: "틈새의 작은 먹이를 집기 좋음",
  },
  {
    id: "long",
    label: "길고 뾰족한 부리",
    note: "깊은 꽃과 열매에 닿기 좋음",
  },
];

const foods: Food[] = [
  {
    id: "seed",
    label: "딱딱한 씨앗",
    island: "건조한 섬",
    correctBeakId: "strong",
  },
  {
    id: "insect",
    label: "곤충",
    island: "숲이 많은 섬",
    correctBeakId: "thin",
  },
  {
    id: "cactus",
    label: "선인장 열매/꽃",
    island: "선인장 지대",
    correctBeakId: "long",
  },
];

export default function BeakFoodMatchingGame({ onComplete }: MiniGameProps) {
  const [selectedBeakId, setSelectedBeakId] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const matchedBeakByFood = useMemo(() => {
    return Object.fromEntries(
      foods.map((food) => [
        food.id,
        beaks.find((beak) => beak.id === matches[food.id])?.label ?? "미연결",
      ]),
    );
  }, [matches]);

  const allMatched = foods.every((food) => Boolean(matches[food.id]));

  const handleFoodClick = (foodId: string) => {
    if (!selectedBeakId || submitted) {
      return;
    }

    setMatches((currentMatches) => {
      const nextMatches = { ...currentMatches };

      for (const key of Object.keys(nextMatches)) {
        if (nextMatches[key] === selectedBeakId) {
          delete nextMatches[key];
        }
      }

      nextMatches[foodId] = selectedBeakId;
      return nextMatches;
    });
    setSelectedBeakId(null);
  };

  const handleSubmit = () => {
    const success = foods.every(
      (food) => matches[food.id] === food.correctBeakId,
    );

    setSubmitted(true);
    onComplete({
      success,
      gainedElements: success
        ? ["natural_selection_clue"]
        : ["incomplete_adaptation"],
    });
  };

  const handleReset = () => {
    setMatches({});
    setSelectedBeakId(null);
    setSubmitted(false);
  };

  return (
    <section className="mini-game-card beak-game">
      <div className="mini-game-heading">
        <div>
          <p>Mini Game</p>
          <h2>부리와 먹이 매칭</h2>
        </div>
        <button type="button" onClick={handleReset}>
          다시 연결
        </button>
      </div>

      <div className="beak-game-board">
        <div className="match-column">
          <h3>부리 카드</h3>
          {beaks.map((beak) => (
            <button
              className={`match-card beak-card ${
                selectedBeakId === beak.id ? "selected" : ""
              }`}
              key={beak.id}
              type="button"
              onClick={() => !submitted && setSelectedBeakId(beak.id)}
            >
              <strong>{beak.label}</strong>
              <span>{beak.note}</span>
            </button>
          ))}
        </div>

        <div className="match-column food-column">
          <h3>먹이 카드</h3>
          {foods.map((food) => (
            <button
              className="match-card food-card"
              key={food.id}
              type="button"
              onClick={() => handleFoodClick(food.id)}
            >
              <strong>{food.label}</strong>
              <span>{food.island}</span>
              <em>{matchedBeakByFood[food.id]}</em>
            </button>
          ))}
        </div>
      </div>

      <div className="mini-game-footer">
        <p>
          {selectedBeakId
            ? "선택한 부리를 연결할 먹이 카드를 누르세요."
            : "부리 카드를 누른 뒤 어울리는 먹이를 선택하세요."}
        </p>
        <button
          className="submit-match-button"
          type="button"
          disabled={!allMatched || submitted}
          onClick={handleSubmit}
        >
          제출하기
        </button>
      </div>
    </section>
  );
}
