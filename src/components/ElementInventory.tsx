import { useState } from "react";
import { gameElements } from "../data/elements";

type ElementInventoryProps = {
  acquiredElements: string[];
};

const categoryLabels: Record<string, string> = {
  science: "과학",
  race: "인종",
  empire: "제국",
  sexualSelection: "성선택",
};

export default function ElementInventory({
  acquiredElements,
}: ElementInventoryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const elements = acquiredElements
    .map((id) => gameElements[id])
    .filter(Boolean);

  return (
    <aside className={`element-inventory ${isOpen ? "is-open" : "is-collapsed"}`}>
      <button
        className="inventory-toggle-button"
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
      >
        {isOpen ? "접기" : "펼치기"}
      </button>
      <div className="inventory-heading">
        <span>획득 요소</span>
        <strong>{elements.length}</strong>
      </div>

      {elements.length > 0 ? (
        <div className="element-card-list">
          {elements.map((element) => (
            <article
              className={`element-card category-${element.category}`}
              key={element.id}
            >
              <span>{categoryLabels[element.category]}</span>
              <strong>{element.label}</strong>
              <p>{element.description}</p>
            </article>
          ))}
        </div>
      ) : null}
    </aside>
  );
}
