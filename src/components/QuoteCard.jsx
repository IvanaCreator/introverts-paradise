function QuoteCard({ quote }) {
  return (
    <section className="quote-card">
      <p className="section-label">A LITTLE REMINDER</p>

      <h2>Today's Quote</h2>

      <blockquote>"{quote.text}"</blockquote>

      <p className="quote-author">— {quote.author}</p>
    </section>
  );
}

export default QuoteCard;
