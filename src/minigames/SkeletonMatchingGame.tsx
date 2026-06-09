import { useMemo, useState } from "react";
import type { MiniGameProps } from "../types/game";

type Fossil = {
  id: string;
  label: string;
  description: string;
  imageSrc: string;
};

type HumanBone = {
  id: string;
  label: string;
  description: string;
  boneClass: string;
  correctFossilId: string;
};

const fossils: Fossil[] = [
  {
    id: "skull",
    label: "거대 나무늘보 두개골",
    description: "눈구멍이 넓고 독특한 턱뼈 구조를 지닌 두개골입니다.",
    imageSrc: "/assets/fossils/fossil-sloth-skull.png",
  },
  {
    id: "ribcage",
    label: "거대 나무늘보 흉곽",
    description: "여러 쌍의 갈비뼈가 흉골과 척추뼈를 둥글게 감쌉니다.",
    imageSrc: "/assets/fossils/fossil-sloth-ribcage.png",
  },
  {
    id: "arm",
    label: "토크소돈 팔",
    description: "어깨에서 내려오는 긴 팔뼈와 손가락뼈가 보입니다.",
    imageSrc: "/assets/fossils/fossil-toxodon-arm.png",
  },
  {
    id: "leg",
    label: "마크라우케니아 다리",
    description: "긴 넓적다리뼈와 이어지는 두 종아리뼈가 보입니다.",
    imageSrc: "/assets/fossils/fossil-macrauchenia-leg.png",
  },
];

const humanBones: HumanBone[] = [
  {
    id: "human-skull",
    label: "인간 두개골",
    description: "사람의 두개골 부위",
    boneClass: "bone-skull",
    correctFossilId: "skull",
  },
  {
    id: "human-ribcage",
    label: "인간 흉곽",
    description: "사람의 흉곽·등뼈 부위",
    boneClass: "bone-ribcage",
    correctFossilId: "ribcage",
  },
  {
    id: "human-arm",
    label: "인간 팔",
    description: "사람의 팔 골격 구조",
    boneClass: "bone-arm",
    correctFossilId: "arm",
  },
  {
    id: "human-leg",
    label: "인간 다리",
    description: "사람의 다리 골격 구조",
    boneClass: "bone-leg",
    correctFossilId: "leg",
  },
];

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function SkeletonMatchingGame({ onComplete }: MiniGameProps) {
  const [shuffledFossils] = useState(() => shuffle(fossils));
  const [shuffledBones] = useState(() => shuffle(humanBones));
  const [selectedFossilId, setSelectedFossilId] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const allMatched = fossils.every((f) => Boolean(matches[f.id]));

  const matchedBoneLabel = useMemo(() => {
    return Object.fromEntries(
      fossils.map((fossil) => [
        fossil.id,
        humanBones.find((b) => b.id === matches[fossil.id])?.label ?? null,
      ]),
    );
  }, [matches]);

  const handleFossilClick = (fossilId: string) => {
    if (submitted) return;
    setSelectedFossilId((current) => (current === fossilId ? null : fossilId));
  };

  const handleBoneClick = (boneId: string) => {
    if (!selectedFossilId || submitted) return;

    setMatches((current) => {
      const next = { ...current };
      for (const key of Object.keys(next)) {
        if (next[key] === boneId) delete next[key];
      }
      next[selectedFossilId] = boneId;
      return next;
    });
    setSelectedFossilId(null);
  };

  const handleSubmit = () => {
    const success = fossils.every((fossil) => {
      const bone = humanBones.find((b) => b.id === matches[fossil.id]);
      return bone?.correctFossilId === fossil.id;
    });

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
    setSelectedFossilId(null);
    setSubmitted(false);
  };

  return (
    <section className="mini-game-card fossil-game">
      <div className="fossil-game-header">
        <div className="fossil-game-title">
          <p>Mini Game</p>
          <h2>골격 연결</h2>
        </div>
        <button
          className="fossil-reset-button"
          type="button"
          onClick={handleReset}
        >
          다시 연결
        </button>
      </div>

      <div className="fossil-game-board">
        <div className="fossil-column">
          <h3 className="fossil-column-heading">동물 화석</h3>
          {shuffledFossils.map((fossil) => {
            const isSelected = selectedFossilId === fossil.id;
            const isMatched = Boolean(matches[fossil.id]);
            const connectedLabel = matchedBoneLabel[fossil.id];
            return (
              <button
                className={`fossil-card ${isSelected ? "is-selected" : ""} ${isMatched ? "is-matched" : ""}`}
                key={fossil.id}
                type="button"
                disabled={submitted}
                onClick={() => handleFossilClick(fossil.id)}
              >
                <img
                  className="fossil-card-img"
                  src={fossil.imageSrc}
                  alt={fossil.label}
                />
                <div className="fossil-card-text">
                  <strong>{fossil.label}</strong>
                  <span>{fossil.description}</span>
                  {connectedLabel && (
                    <em className="fossil-match-badge">→ {connectedLabel}</em>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="fossil-column">
          <h3 className="fossil-column-heading">인간 골격</h3>
          {shuffledBones.map((bone) => {
            const isConnected = Object.values(matches).includes(bone.id);
            return (
              <button
                className={`fossil-card human-bone-card ${isConnected ? "is-matched" : ""} ${
                  selectedFossilId && !isConnected ? "is-targetable" : ""
                }`}
                key={bone.id}
                type="button"
                disabled={submitted}
                onClick={() => handleBoneClick(bone.id)}
              >
                <div className={`fossil-card-img human-bone-img ${bone.boneClass}`} />
                <div className="fossil-card-text">
                  <strong>{bone.label}</strong>
                  <span>{bone.description}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mini-game-footer">
        <p>
          {selectedFossilId
            ? "연결할 인간 골격을 오른쪽에서 선택하세요."
            : "서로 비슷한 뼈 구조를 가진 화석과 인간 골격을 연결해보세요."}
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
