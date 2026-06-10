import type { Chapter } from "../types/game";

type ChapterHUDProps = {
  chapter: Chapter;
  onNewGame: () => void;
};

export default function ChapterHUD({ chapter, onNewGame }: ChapterHUDProps) {
  const shortTitle = chapter.title.split(" - ")[0];
  return (
    <header className="chapter-hud">
      <div>
        <h1>{shortTitle}</h1>
      </div>
      <button className="secondary-button" type="button" onClick={onNewGame}>
        새 게임 시작
      </button>
    </header>
  );
}
