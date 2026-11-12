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
  const [selectedPieceIndex, setSelectedPieceIndex] = useState(null);
  const [moves, setMoves] = useState(0);

  const shufflePieces = () => {
    setPieces(createShuffledPieces(difficulty.size));
    setSelectedPieceIndex(null);
    setMoves(0);
  };

  const selectDifficulty = (option) => {
    setSelectedDifficulty(option.id);
    setPieces(createShuffledPieces(option.size));
    setSelectedPieceIndex(null);
    setMoves(0);
  };

  const handlePieceClick = (pieceIndex) => {
    if (selectedPieceIndex === null) {
      setSelectedPieceIndex(pieceIndex);
      return;
    }

    if (selectedPieceIndex === pieceIndex) {
      setSelectedPieceIndex(null);
      return;
    }

    setPieces((currentPieces) => {
      const nextPieces = [...currentPieces];
      [nextPieces[selectedPieceIndex], nextPieces[pieceIndex]] = [
        nextPieces[pieceIndex],
        nextPieces[selectedPieceIndex],
      ];
      return nextPieces;
    });
    setMoves((currentMoves) => currentMoves + 1);
    setSelectedPieceIndex(null);
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
        {pieces.map((piece, pieceIndex) => {
          const position = difficulty.size - 1;
          const backgroundPosition = `${(piece.column / position) * 100}% ${
            (piece.row / position) * 100
          }%`;

          return (
            <button
              className={`puzzle-piece ${
                selectedPieceIndex === pieceIndex ? "puzzle-piece-selected" : ""
              }`}
              key={piece.id}
              type="button"
              onClick={() => handlePieceClick(pieceIndex)}
              aria-pressed={selectedPieceIndex === pieceIndex}
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
      <p className="mt-3 text-muted">Moves: {moves}</p>
      <p className="text-muted">
        Select two pieces to swap their positions.
      </p>
    </div>
  );
}

export default PuzzleBoard;
