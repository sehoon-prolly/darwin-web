type OpeningScreenProps = {
  isTransitionActive?: boolean;
  onStart: () => void;
};

export default function OpeningScreen({
  isTransitionActive = false,
  onStart,
}: OpeningScreenProps) {
  return (
    <main className="opening-screen">
      <section className="opening-content">
        <h1>
          [충격]<br />
          비글호에 미소녀 천재 상식인<br />
          『초(超) 성실 조수』<br />
          가 타지 않으면<br />
          인류의 과학 발전이<br />
          200년 뒤처지는 건에 대하여 ww
        </h1>
        <button type="button" disabled={isTransitionActive} onClick={onStart}>
          게임 시작
        </button>
      </section>
      <div
        className={`opening-transition-overlay ${
          isTransitionActive ? "is-active" : ""
        }`}
      />
    </main>
  );
}
