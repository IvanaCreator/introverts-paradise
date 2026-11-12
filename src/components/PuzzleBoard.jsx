import { useState } from "react";

import DifficultySelector from "./DifficultySelector";
import PuzzlePiece from "./PuzzlePiece";

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
  const isSolved =
    moves > 0 && pieces.every((piece, pieceIndex) => piece.id === pieceIndex);

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
    if (isSolved) {
      return;
    }

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
    <div className="puzzle-board-section mt-5">
      <h2 className="h4">Choose your difficulty</h2>
      <DifficultySelector
        difficulties={difficulties}
        selectedDifficulty={selectedDifficulty}
        onSelect={selectDifficulty}
      />

      <p className="puzzle-selected-image">
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
        {pieces.map((piece, pieceIndex) => (
          <PuzzlePiece
            key={piece.id}
            piece={piece}
            pieceIndex={pieceIndex}
            size={difficulty.size}
            image={puzzle.image}
            isSelected={selectedPieceIndex === pieceIndex}
            onClick={handlePieceClick}
          />
        ))}
      </div>
      <p className="puzzle-moves mt-3">Moves: {moves}</p>
      {isSolved ? (
        <div className="puzzle-complete mt-3" role="status">
          <h3 className="h5">Congratulations!</h3>
          <p>You solved the puzzle in {moves} moves.</p>
        </div>
      ) : (
        <p className="text-muted">
          Select two pieces to swap their positions.
        </p>
      )}
    </div>
  );
}

export default PuzzleBoard;
