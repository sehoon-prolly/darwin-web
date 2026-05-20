import type { Ending } from "../types/game";
import { endings } from "../data/endings";

const scienceElementIds = new Set([
  "classification_need",
  "environment_adaptation_clue",
  "natural_selection_clue",
]);

const humanElementIds = new Set([
  "human_diversity",
  "balanced_view_of_evolution",
]);

const empireElementIds = new Set([
  "imperialism_shadow",
  "competition_structure",
]);

const sexualSelectionElementIds = new Set(["sexual_selection_concept"]);

export function judgeEnding(selectedElementIds: string[]): Ending {
  const selected = new Set(selectedElementIds);
  const scienceCount = [...scienceElementIds].filter((id) =>
    selected.has(id),
  ).length;
  const hasHuman = [...humanElementIds].some((id) => selected.has(id));
  const hasEmpire = [...empireElementIds].some((id) => selected.has(id));
  const hasSexualSelection = [...sexualSelectionElementIds].some((id) =>
    selected.has(id),
  );

  if (scienceCount < 2) {
    return endings.ending_failed_publication;
  }

  if (!hasHuman && hasEmpire) {
    return endings.ending_human_superiority;
  }

  if (hasHuman && !hasEmpire) {
    return endings.ending_social_darwinism;
  }

  if (!hasHuman && !hasEmpire) {
    return endings.ending_double_problem;
  }

  if (hasSexualSelection) {
    return endings.ending_advanced_theory;
  }

  return endings.ending_normal_theory;
}
