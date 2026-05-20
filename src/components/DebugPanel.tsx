import { gameElements } from "../data/elements";

type DebugPanelProps = {
  onAddElement: (elementId: string) => void;
  onClearElements: () => void;
};

const debugElementIds = [
  "human_diversity",
  "balanced_view_of_evolution",
  "imperialism_shadow",
  "competition_structure",
  "sexual_selection_concept",
];

export default function DebugPanel({
  onAddElement,
  onClearElements,
}: DebugPanelProps) {
  return (
    <details className="debug-panel">
      <summary>개발용 DebugPanel</summary>
      <p>발표 테스트용 요소를 강제로 추가합니다.</p>
      <div className="debug-actions">
        {debugElementIds.map((elementId) => (
          <button
            key={elementId}
            type="button"
            onClick={() => onAddElement(elementId)}
          >
            + {gameElements[elementId].label}
          </button>
        ))}
        <button className="danger-button" type="button" onClick={onClearElements}>
          획득 요소 초기화
        </button>
      </div>
    </details>
  );
}
