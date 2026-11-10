import { Link } from "react-router-dom";

import quotes from "../data/quotes";
import inspirations from "../data/inspirations";

function Home() {
  const today = new Date();
  const dayNumber = Math.floor(
    new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime() / 86400000
  );

  const quote = quotes[dayNumber % quotes.length];

  const inspiration = inspirations[dayNumber % inspirations.length];

  return (
    <div className="home-page">

      {/* Welcome section */}
      <section className="welcome-section text-center">
        <p className="welcome-label">A LITTLE PLACE JUST FOR YOU</p>

        <h1>Welcome to Your Cozy Corner</h1>

        <p className="welcome-text">
          A peaceful little space to slow down, dream,
          create and enjoy the little things in life.
        </p>
      </section>


      {/* Daily quote */}
      <section className="quote-card">
        <p className="section-label">A LITTLE REMINDER</p>

        <h2>Today's Quote</h2>

        <blockquote>
          "{quote.text}"
        </blockquote>

        <p className="quote-author">
          — {quote.author}
        </p>
      </section>
      

      {/* Daily inspiration */}
      <section className="inspiration-card text-center">
        <p className="section-label">YOUR DAILY INSPIRATION</p>

        <h2>Something lovely to do today</h2>

        <p>{inspiration}</p>
      </section>

    </div>
  );
}

export default Home;