import { gameElements } from "../data/elements";

type FinalManuscriptPanelProps = {
  acquiredElements: string[];
  selectedFinalElements: string[];
  onToggleElement: (elementId: string) => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onSubmit: () => void;
};

export default function FinalManuscriptPanel({
  acquiredElements,
  selectedFinalElements,
  onToggleElement,
  onSelectAll,
  onClearSelection,
  onSubmit,
}: FinalManuscriptPanelProps) {
  const acquired = acquiredElements.map((id) => gameElements[id]).filter(Boolean);

  return (
    <section className="final-panel">
      <div className="final-panel-heading">
        <div>
          <p>최종 원고</p>
          <h2>다윈의 원고를 완성하라</h2>
        </div>
        <div className="final-panel-actions">
          <button type="button" onClick={onSelectAll}>
            모두 선택
          </button>
          <button type="button" onClick={onClearSelection}>
            선택 해제
          </button>
        </div>
      </div>

      {acquired.length === 0 ? (
        <p className="final-empty">
          획득한 요소가 없습니다. DebugPanel에서 테스트 요소를 추가하거나 처음부터 다시 진행해 보세요.
        </p>
      ) : (
        <div className="final-element-grid">
          {acquired.map((element) => (
            <label
              className={`final-element-card category-${element.category}`}
              key={element.id}
            >
              <input
                type="checkbox"
                checked={selectedFinalElements.includes(element.id)}
                onChange={() => onToggleElement(element.id)}
              />
              <span>
                <strong>{element.label}</strong>
                <small>{element.description}</small>
              </span>
            </label>
          ))}
        </div>
      )}

      <button className="complete-manuscript-button" type="button" onClick={onSubmit}>
        원고 완성하기
      </button>
    </section>
  );
}
