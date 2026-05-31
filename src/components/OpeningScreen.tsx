type OpeningScreenProps = {
  onStart: () => void;
};

export default function OpeningScreen({ onStart }: OpeningScreenProps) {
  return (
    <main className="opening-screen">
      <section className="opening-content">
        <h1>게임 이름</h1>
        <button type="button" onClick={onStart}>
          게임 시작
        </button>
      </section>
    </main>
  );
}
