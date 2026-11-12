import DailyInspiration from "../components/DailyInspiration";
import HomeHero from "../components/HomeHero";
import QuoteCard from "../components/QuoteCard";
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
      <HomeHero />
      <QuoteCard quote={quote} />
      <DailyInspiration inspiration={inspiration} />
    </div>
  );
}

export default Home;