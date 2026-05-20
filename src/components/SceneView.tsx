import type { CSSProperties, ReactNode } from "react";
import type { Scene } from "../types/game";

type SceneViewProps = {
  scene: Scene;
  children?: ReactNode;
};

function characterStyle(imagePath?: string): CSSProperties | undefined {
  if (!imagePath) {
    return undefined;
  }

  return {
    backgroundImage: `url("${imagePath}")`,
  };
}

export default function SceneView({ scene, children }: SceneViewProps) {
  const sceneStyle: CSSProperties = scene.backgroundImage
    ? {
        backgroundImage: `linear-gradient(180deg, rgba(249, 239, 204, 0.16), rgba(54, 96, 94, 0.18)), url("${scene.backgroundImage}")`,
      }
    : {};

  return (
    <section className="scene-view" style={sceneStyle}>
      <div className="scene-region-label background-label">중앙 배경 이미지 영역</div>
      <div className="map-grid" />
      <div className="scene-prop prop-label">Specimen Log</div>
      <div
        className={`character-slot left ${scene.leftCharacterImage ? "has-image" : ""}`}
        style={characterStyle(scene.leftCharacterImage)}
        aria-label="왼쪽 캐릭터 영역"
      >
        <span>
          <b>LEFT</b>
          조수 실루엣
        </span>
      </div>
      <div
        className={`character-slot right ${scene.rightCharacterImage ? "has-image" : ""}`}
        style={characterStyle(scene.rightCharacterImage)}
        aria-label="오른쪽 캐릭터 영역"
      >
        <span>
          <b>RIGHT</b>
          다윈 실루엣
        </span>
      </div>
      {children ? <div className="center-play-area">{children}</div> : null}
    </section>
  );
}
