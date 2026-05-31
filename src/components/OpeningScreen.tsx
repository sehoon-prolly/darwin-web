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
        <h1>게임 이름</h1>
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
