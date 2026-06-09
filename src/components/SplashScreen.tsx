import { useEffect, useRef, useState } from "react";

type SplashScreenProps = {
  onDone: () => void;
  onGone: () => void;
};

export default function SplashScreen({ onDone, onGone }: SplashScreenProps) {
  const [textVisible, setTextVisible] = useState(false);
  const [screenFading, setScreenFading] = useState(false);
  const onDoneRef = useRef(onDone);
  const onGoneRef = useRef(onGone);

  useEffect(() => {
    const t0 = window.setTimeout(() => setTextVisible(true), 60);
    const t1 = window.setTimeout(() => setTextVisible(false), 5600);
    const t2 = window.setTimeout(() => {
      onDoneRef.current();
      setScreenFading(true);
    }, 6600);
    const t3 = window.setTimeout(() => onGoneRef.current(), 7300);
    return () => [t0, t1, t2, t3].forEach(clearTimeout);
  }, []);

  return (
    <div className={`splash-screen ${screenFading ? "is-screen-fading" : ""}`}>
      <div className={`splash-content ${textVisible ? "is-visible" : ""}`}>
        <p className="splash-text">
          본 게임은 실제 '비글호 항해기'의 내용을 다소 폭넓게(!) 각색하여
          학습적 요소와 나름의 재미를 동시에 챙기려고 하였습니다.
        </p>
        <p className="splash-text">
          '비글호 항해기' 도서와 각종 자료를 통해 실제 기록과 비교하며 읽으며
          색다른, 깊이있는 재미를 느껴보시기 바랍니다.
        </p>
      </div>
    </div>
  );
}
