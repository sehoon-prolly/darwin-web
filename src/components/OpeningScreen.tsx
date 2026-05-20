type OpeningScreenProps = {
  onStart: () => void;
};

export default function OpeningScreen({ onStart }: OpeningScreenProps) {
  return (
    <main className="opening-screen">
      <section className="opening-content">
        <h1>비글호의 조수</h1>
        <button type="button" onClick={onStart}>
          게임 시작
        </button>
      </section>
    </main>
  );
}
