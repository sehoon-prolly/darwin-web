import type { Chapter } from "../types/game";

type ChapterHUDProps = {
  chapter: Chapter;
  onNewGame: () => void;
};

export default function ChapterHUD({ chapter, onNewGame }: ChapterHUDProps) {
  return (
    <header className="chapter-hud">
      <div>
        <p className="hud-kicker">{chapter.location}</p>
        <h1>{chapter.title}</h1>
      </div>
      <button className="secondary-button" type="button" onClick={onNewGame}>
        새 게임 시작
      </button>
    </header>
  );
}
