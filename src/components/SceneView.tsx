import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import type { Scene } from "../types/game";

const NOTICE_POSTER_SCENE_ID = "chapter0-scene15";

type SceneViewProps = {
  scene: Scene;
  children?: ReactNode;
  visibleCharacterSides?: {
    left: boolean;
    right: boolean;
  };
  onNoticePosterClick?: (posterId: string) => void;
};

function characterStyle(imagePath?: string): CSSProperties | undefined {
  if (!imagePath) {
    return undefined;
  }

  return {
    backgroundImage: `url("${imagePath}")`,
  };
}

function shouldPlayCharacterEntrance(
  currentImage?: string,
  previousImage?: string,
  currentVisible = true,
  previousVisible = true,
) {
  return Boolean(
    currentImage && currentVisible && (!previousVisible || currentImage !== previousImage),
  );
}

function getSpeakerSide(speakerName: string) {
  if (!speakerName || speakerName === "해설") {
    return null;
  }

  if (speakerName.includes("다윈")) {
    return "right";
  }

  return "left";
}

export default function SceneView({
  scene,
  children,
  visibleCharacterSides = { left: true, right: true },
  onNoticePosterClick,
}: SceneViewProps) {
  const previousCharacterImages = useRef<{
    left?: string;
    right?: string;
  }>({});
  const previousVisibleCharacterSides = useRef({
    left: visibleCharacterSides.left,
    right: visibleCharacterSides.right,
  });
  const [enteringCharacters, setEnteringCharacters] = useState({
    left: false,
    right: false,
  });

  const sceneStyle: CSSProperties = scene.backgroundImage
    ? {
        backgroundImage: `linear-gradient(180deg, rgba(249, 239, 204, 0.16), rgba(54, 96, 94, 0.18)), url("${scene.backgroundImage}")`,
      }
    : {};
  const speakerSide = getSpeakerSide(scene.speakerName);

  useEffect(() => {
    const nextEnteringCharacters = {
      left: shouldPlayCharacterEntrance(
        scene.leftCharacterImage,
        previousCharacterImages.current.left,
        visibleCharacterSides.left,
        previousVisibleCharacterSides.current.left,
      ),
      right: shouldPlayCharacterEntrance(
        scene.rightCharacterImage,
        previousCharacterImages.current.right,
        visibleCharacterSides.right,
        previousVisibleCharacterSides.current.right,
      ),
    };

    previousCharacterImages.current = {
      left: scene.leftCharacterImage,
      right: scene.rightCharacterImage,
    };
    previousVisibleCharacterSides.current = visibleCharacterSides;

    setEnteringCharacters(nextEnteringCharacters);

    if (!nextEnteringCharacters.left && !nextEnteringCharacters.right) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setEnteringCharacters({ left: false, right: false });
    }, 850);

    return () => window.clearTimeout(timeoutId);
  }, [
    scene.leftCharacterImage,
    scene.rightCharacterImage,
    visibleCharacterSides,
  ]);

  return (
    <section className="scene-view" style={sceneStyle}>
      <div className="scene-region-label background-label">중앙 배경 이미지 영역</div>
      <div className="map-grid" />
      {scene.id === NOTICE_POSTER_SCENE_ID ? (
        <div className="notice-poster-hotspots" aria-label="벽보 클릭 영역">
          {["top-left", "top-right", "bottom-left", "bottom-right"].map(
            (posterId) => (
              <button
                className={`notice-poster-hotspot ${posterId}`}
                key={posterId}
                type="button"
                aria-label={`${posterId} 벽보 확대해서 보기`}
                onClick={() => onNoticePosterClick?.(posterId)}
              />
            ),
          )}
        </div>
      ) : null}
      <div
        className={`character-slot left ${scene.leftCharacterImage ? "has-image" : ""} ${
          enteringCharacters.left ? "is-entering" : ""
        } ${visibleCharacterSides.left ? "" : "is-hidden"} ${
          speakerSide === "left" ? "is-speaking" : "is-dimmed"
        }`}
        style={characterStyle(scene.leftCharacterImage)}
        aria-label="왼쪽 캐릭터 영역"
      >
        <span>
          <b>LEFT</b>
          조수 실루엣
        </span>
      </div>
      <div
        className={`character-slot right ${scene.rightCharacterImage ? "has-image" : ""} ${
          enteringCharacters.right ? "is-entering" : ""
        } ${visibleCharacterSides.right ? "" : "is-hidden"} ${
          speakerSide === "right" ? "is-speaking" : "is-dimmed"
        }`}
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
