import type { Choice } from "../types/game";

type ChoiceButtonProps = {
  choice: Choice;
  onSelect: (choice: Choice) => void;
};

export default function ChoiceButton({ choice, onSelect }: ChoiceButtonProps) {
  return (
    <button className="choice-button" type="button" onClick={() => onSelect(choice)}>
      <span>{choice.label}</span>
      {choice.effect ? <small>{choice.effect}</small> : null}
    </button>
  );
}
