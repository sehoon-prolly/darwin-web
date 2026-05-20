import type { CSSProperties, ReactNode } from "react";
import type { Chapter } from "../types/game";
import ChapterHUD from "./ChapterHUD";

type GameLayoutProps = {
  chapter: Chapter;
  sceneView: ReactNode;
  dialogueBox: ReactNode;
  inventory: ReactNode;
  debugPanel: ReactNode;
  elementToast?: ReactNode;
  onNewGame: () => void;
  backgroundImage?: string;
};

export default function GameLayout({
  chapter,
  sceneView,
  dialogueBox,
  inventory,
  debugPanel,
  elementToast,
  onNewGame,
  backgroundImage,
}: GameLayoutProps) {
  const shellStyle: CSSProperties | undefined = backgroundImage
    ? {
        backgroundImage: `linear-gradient(rgba(23, 27, 25, 0.12), rgba(23, 27, 25, 0.24)), url("${backgroundImage}")`,
      }
    : undefined;

  return (
    <main className="app-shell" style={shellStyle}>
      <section className="game-frame" aria-label="비글호의 조수 게임 화면">
        <ChapterHUD chapter={chapter} onNewGame={onNewGame} />
        {sceneView}
        {dialogueBox}
        {inventory}
        {debugPanel}
        {elementToast}
      </section>
    </main>
  );
}
