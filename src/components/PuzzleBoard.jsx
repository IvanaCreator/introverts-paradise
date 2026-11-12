import { useState } from "react";

const difficulties = [
  { id: "easy", label: "Easy", size: 3 },
  { id: "medium", label: "Medium", size: 4 },
  { id: "hard", label: "Hard", size: 5 },
];

function createShuffledPieces(size) {
  const pieces = Array.from({ length: size * size }, (_, index) => ({
    id: index,
    row: Math.floor(index / size),
    column: index % size,
  }));

  for (let index = pieces.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [pieces[index], pieces[randomIndex]] = [
      pieces[randomIndex],
      pieces[index],
    ];
  }

  return pieces;
}

function PuzzleBoard({ puzzle }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    difficulties[0].id,
  );
  const difficulty = difficulties.find(
    (option) => option.id === selectedDifficulty,
  );
  const [pieces, setPieces] = useState(() =>
    createShuffledPieces(difficulty.size),
  );

  const shufflePieces = () => {
    setPieces(createShuffledPieces(difficulty.size));
  };

  const selectDifficulty = (option) => {
    setSelectedDifficulty(option.id);
    setPieces(createShuffledPieces(option.size));
  };

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
            onClick={() => selectDifficulty(option)}
            aria-pressed={selectedDifficulty === option.id}
          >
            {option.label} ({option.size} × {option.size})
          </button>
        ))}
      </div>

      <p>
        Selected image: <strong>{puzzle.title}</strong>
      </p>
      <button
        className="btn btn-outline-dark mb-3"
        type="button"
        onClick={shufflePieces}
      >
        Shuffle pieces
      </button>
      <div
        className="puzzle-board mx-auto"
        style={{ "--puzzle-size": difficulty.size }}
        aria-label={`${puzzle.title} puzzle board`}
      >
        {pieces.map((piece) => {
          const position = difficulty.size - 1;
          const backgroundPosition = `${(piece.column / position) * 100}% ${
            (piece.row / position) * 100
          }%`;

          return (
            <div
              className="puzzle-piece"
              key={piece.id}
              role="img"
              aria-label={`Puzzle piece ${piece.id + 1}`}
              style={{
                backgroundImage: `url(${puzzle.image})`,
                backgroundPosition,
                backgroundSize: `${difficulty.size * 100}% ${
                  difficulty.size * 100
                }%`,
              }}
            />
          );
        })}
      </div>
      <p className="mt-3 text-muted">
        The {difficulty.size} × {difficulty.size} pieces are shuffled and ready
        to solve.
      </p>
    </div>
  );
}

export default PuzzleBoard;
