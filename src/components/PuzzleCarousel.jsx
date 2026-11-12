import { useEffect, useState } from "react";

function PuzzleCarousel({ puzzles, selectedPuzzleId, onSelect }) {
  const [startIndex, setStartIndex] = useState(0);
  const [visiblePuzzles, setVisiblePuzzles] = useState(() =>
    window.innerWidth < 768 ? 2 : 4,
  );
  const lastStartIndex = Math.max(0, puzzles.length - visiblePuzzles);
  const currentStartIndex = Math.min(startIndex, lastStartIndex);
  const canGoBack = currentStartIndex > 0;
  const canGoForward = currentStartIndex < lastStartIndex;

  useEffect(() => {
    const updateVisiblePuzzles = () => {
      setVisiblePuzzles(window.innerWidth < 768 ? 2 : 4);
    };

    window.addEventListener("resize", updateVisiblePuzzles);
    return () => window.removeEventListener("resize", updateVisiblePuzzles);
  }, []);

  const moveCarousel = (direction) => {
    setStartIndex((currentIndex) =>
      Math.min(
        lastStartIndex,
        Math.max(0, currentIndex + direction),
      ),
    );
  };

  return (
    <div
      className="puzzle-carousel mt-4"
      role="region"
      aria-label="Puzzle image selection"
    >
      <button
        className="puzzle-carousel-arrow"
        type="button"
        onClick={() => moveCarousel(-1)}
        disabled={!canGoBack}
        aria-label="Show previous puzzles"
      >
        ‹
      </button>

      <div className="puzzle-carousel-window">
        <div
          className="puzzle-carousel-track"
          style={{
            transform: `translateX(-${
              currentStartIndex * (100 / puzzles.length)
            }%)`,
          }}
        >
          {puzzles.map((puzzle) => (
            <div className="puzzle-carousel-card" key={puzzle.id}>
              <button
                className={`puzzle-carousel-button ${
                  selectedPuzzleId === puzzle.id
                    ? "puzzle-carousel-button-selected"
                    : ""
                }`}
                type="button"
                onClick={() => onSelect(puzzle.id)}
                aria-pressed={selectedPuzzleId === puzzle.id}
              >
                <img src={puzzle.image} alt={puzzle.title} />
                <span>{puzzle.title}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        className="puzzle-carousel-arrow"
        type="button"
        onClick={() => moveCarousel(1)}
        disabled={!canGoForward}
        aria-label="Show next puzzles"
      >
        ›
      </button>
    </div>
  );
}

export default PuzzleCarousel;
