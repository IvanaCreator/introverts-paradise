function DailyInspiration({ inspiration }) {
  return (
    <section className="inspiration-card text-center">
      <p className="section-label">YOUR DAILY INSPIRATION</p>

      <h2>Something lovely to do today</h2>

      <p>{inspiration}</p>
    </section>
  );
}

export default DailyInspiration;
