import { useMemo, useState } from "react";
import type { MiniGameProps } from "../types/game";

type Animal = {
  id: string;
  label: string;
  note: string;
};

type BoneFeature = {
  id: string;
  label: string;
  description: string;
  correctAnimalId: string;
};

const animals: Animal[] = [
  { id: "whale", label: "고래 지느러미", note: "바다에서 헤엄치는 데 사용" },
  { id: "bat", label: "박쥐 날개", note: "하늘을 나는 데 사용" },
  { id: "human", label: "인간 팔", note: "도구를 쥐고 사용하는 데 사용" },
];

const boneFeatures: BoneFeature[] = [
  {
    id: "flat",
    label: "납작한 지골형",
    description: "상완골·요골·척골 구조가 넓게 퍼지고 손가락뼈가 줄어들어 납작해진 형태",
    correctAnimalId: "whale",
  },
  {
    id: "elongated",
    label: "신장된 지골형",
    description: "상완골·요골·척골 구조에서 손가락뼈만 극도로 길어지고 사이에 막이 형성된 형태",
    correctAnimalId: "bat",
  },
  {
    id: "preserved",
    label: "원형 보존형",
    description: "공통 조상의 상완골·요골·척골과 5지 구조가 가장 원형에 가깝게 유지된 형태",
    correctAnimalId: "human",
  },
];

export default function SkeletonMatchingGame({ onComplete }: MiniGameProps) {
  const [selectedAnimalId, setSelectedAnimalId] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const matchedAnimalByFeature = useMemo(() => {
    return Object.fromEntries(
      boneFeatures.map((feature) => [
        feature.id,
        animals.find((a) => a.id === matches[feature.id])?.label ?? "미연결",
      ]),
    );
  }, [matches]);

  const allMatched = boneFeatures.every((f) => Boolean(matches[f.id]));

  const handleFeatureClick = (featureId: string) => {
    if (!selectedAnimalId || submitted) return;

    setMatches((current) => {
      const next = { ...current };
      for (const key of Object.keys(next)) {
        if (next[key] === selectedAnimalId) delete next[key];
      }
      next[featureId] = selectedAnimalId;
      return next;
    });
    setSelectedAnimalId(null);
  };

  const handleSubmit = () => {
    const success = boneFeatures.every(
      (f) => matches[f.id] === f.correctAnimalId,
    );
    setSubmitted(true);
    onComplete({
      success,
      gainedElements: success
        ? ["common_structure_discovery"]
        : ["incomplete_fossil_interpretation"],
    });
  };

  const handleReset = () => {
    setMatches({});
    setSelectedAnimalId(null);
    setSubmitted(false);
  };

  return (
    <section className="mini-game-card skeleton-game">
      <div className="mini-game-heading">
        <div>
          <p>Mini Game</p>
          <h2>골격 연결</h2>
        </div>
        <button type="button" onClick={handleReset}>
          다시 연결
        </button>
      </div>

      <div className="beak-game-board">
        <div className="match-column">
          <h3>현대 동물</h3>
          {animals.map((animal) => (
            <button
              className={`match-card animal-card ${
                selectedAnimalId === animal.id ? "selected" : ""
              }`}
              key={animal.id}
              type="button"
              onClick={() => !submitted && setSelectedAnimalId(animal.id)}
            >
              <strong>{animal.label}</strong>
              <span>{animal.note}</span>
            </button>
          ))}
        </div>

        <div className="match-column feature-column">
          <h3>뼈 구조 특성</h3>
          {boneFeatures.map((feature) => (
            <button
              className="match-card feature-card"
              key={feature.id}
              type="button"
              onClick={() => handleFeatureClick(feature.id)}
            >
              <strong>{feature.label}</strong>
              <span>{feature.description}</span>
              <em>{matchedAnimalByFeature[feature.id]}</em>
            </button>
          ))}
        </div>
      </div>

      <div className="mini-game-footer">
        <p>
          {selectedAnimalId
            ? "선택한 동물을 연결할 뼈 구조를 누르세요."
            : "동물 카드를 누른 뒤 어울리는 뼈 구조를 선택하세요."}
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
