import { useState } from "react";

const difficulties = [
  { id: "easy", label: "Easy", size: 3 },
  { id: "medium", label: "Medium", size: 4 },
  { id: "hard", label: "Hard", size: 5 },
];

function PuzzleBoard({ puzzle }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    difficulties[0].id,
  );
  const difficulty = difficulties.find(
    (option) => option.id === selectedDifficulty,
  );

  return (
    <div className="mt-5">
      <h2 className="h4">Choose your difficulty</h2>
      <div
        className="btn-group mb-4"
        role="group"
        aria-label="Puzzle difficulty"
      >
        {difficulties.map((option) => (
          <button
            className={`btn ${
              selectedDifficulty === option.id
                ? "btn-dark"
                : "btn-outline-dark"
            }`}
            type="button"
            key={option.id}
            onClick={() => setSelectedDifficulty(option.id)}
            aria-pressed={selectedDifficulty === option.id}
          >
            {option.label} ({option.size} × {option.size})
          </button>
        ))}
      </div>

      <p>
        Selected image: <strong>{puzzle.title}</strong>
      </p>
      <img
        className="img-fluid rounded shadow-sm"
        src={puzzle.image}
        alt={puzzle.title}
        style={{ maxHeight: "360px" }}
      />
      <p className="mt-3 text-muted">
        The puzzle will have {difficulty.size} × {difficulty.size} pieces.
      </p>
    </div>
  );
}

export default PuzzleBoard;
