import { useState } from "react";
import type { MiniGameProps } from "../types/game";

type Suspect = {
  id: string;
  label: string;
  roleHint: string;
  statement: string;
};

const CORRECT_SUSPECT_ID = "D";

const suspects: Suspect[] = [
  {
    id: "A",
    label: "A",
    roleHint: "갑판 일을 돕던 사람",
    statement: "B는 선교사가 아니다.",
  },
  {
    id: "B",
    label: "B",
    roleHint: "영국식 물품을 옮기던 사람",
    statement: "선교사는 C 또는 D 중 한 명이다.",
  },
  {
    id: "C",
    label: "C",
    roleHint: "마을 사람들과 통역하던 사람",
    statement: "A는 선교사가 아니다.",
  },
  {
    id: "D",
    label: "D",
    roleHint: "기도문이 적힌 종이를 숨긴 사람",
    statement: "E가 선교사다.",
  },
  {
    id: "E",
    label: "E",
    roleHint: "해안 쪽에서 배를 지켜보던 사람",
    statement: "D가 선교사다.",
  },
];

export default function MissionaryClickGame({ onComplete }: MiniGameProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selectedId || isSubmitted) {
      return;
    }

    const success = selectedId === CORRECT_SUSPECT_ID;
    setIsSubmitted(true);
    onComplete({
      success,
      gainedElements: success ? ["imperialism_shadow"] : ["social_context_missing"],
    });
  };

  return (
    <section className="mini-game-card logic-game">
      <div className="logic-game-heading">
        <div>
          <p>Mini Game</p>
          <h2>선교사를 추론하라</h2>
        </div>
        <div className="logic-answer-count">1명</div>
      </div>

      <div className="logic-rule-card">
        <strong>조건</strong>
        <p>
          다섯 명 중 영국 선교사는 정확히 한 명이다. 선교사는 자신의 정체를
          숨기기 위해 거짓말을 하고, 나머지 네 사람은 모두 사실만 말한다.
        </p>
      </div>

      <div className="logic-statement-list" aria-label="선교사 추론 명제">
        {suspects.map((suspect) => (
          <button
            className={`logic-statement-card logic-statement-button ${
              selectedId === suspect.id ? "is-selected" : ""
            }`}
            key={suspect.id}
            type="button"
            disabled={isSubmitted}
            onClick={() => setSelectedId(suspect.id)}
          >
            <div className="logic-speaker">{suspect.label}</div>
            <div>
              <span>{suspect.roleHint}</span>
              <p>{suspect.statement}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="mini-game-footer logic-game-footer">
        <button
          className="submit-match-button"
          type="button"
          disabled={!selectedId || isSubmitted}
          onClick={handleSubmit}
        >
          답 제출
        </button>
      </div>
    </section>
  );
}
