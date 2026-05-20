import type { MiniGameResult, MiniGameType } from "../types/game";
import BeakFoodMatchingGame from "../minigames/BeakFoodMatchingGame";
import MissionaryClickGame from "../minigames/MissionaryClickGame";
import PrisonerClickGame from "../minigames/PrisonerClickGame";
import SkeletonMatchingGame from "../minigames/SkeletonMatchingGame";

type MiniGameRendererProps = {
  miniGameType?: MiniGameType;
  onComplete: (result: MiniGameResult) => void;
};

export default function MiniGameRenderer({
  miniGameType = "none",
  onComplete,
}: MiniGameRendererProps) {
  if (miniGameType === "beakFoodMatching") {
    return <BeakFoodMatchingGame onComplete={onComplete} />;
  }

  if (miniGameType === "missionaryClick") {
    return <MissionaryClickGame onComplete={onComplete} />;
  }

  if (miniGameType === "prisonerClick") {
    return <PrisonerClickGame onComplete={onComplete} />;
  }

  if (miniGameType === "skeletonMatching") {
    return <SkeletonMatchingGame onComplete={onComplete} />;
  }

  return null;
}
