import { useEffect, useState } from "react";

import DifficultySelector from "./DifficultySelector";
import PuzzlePiece from "./PuzzlePiece";

const difficulties = [
  { id: "easy", label: "Easy", size: 3 },
  { id: "medium", label: "Medium", size: 4 },
  { id: "hard", label: "Hard", size: 5 },
];

function createShuffledPieces(size) {
  let pieces;

  do {
    pieces = Array.from({ length: size * size }, (_, index) => ({
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
  } while (pieces.every((piece, pieceIndex) => piece.id === pieceIndex));

  return pieces;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const remainingSeconds = (seconds % 60).toString().padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
}

function formatCompletionTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const minuteLabel = minutes === 1 ? "minute" : "minutes";
  const secondLabel = remainingSeconds === 1 ? "second" : "seconds";

  if (minutes === 0) {
    return `${remainingSeconds} ${secondLabel}`;
  }

  return `${minutes} ${minuteLabel} and ${remainingSeconds} ${secondLabel}`;
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
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const isSolved =
    moves > 0 && pieces.every((piece, pieceIndex) => piece.id === pieceIndex);

  useEffect(() => {
    if (isSolved) {
      return undefined;
    }

    const timer = setInterval(() => {
      setElapsedSeconds((currentSeconds) => currentSeconds + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isSolved]);

  const startNewGame = () => {
    setPieces(createShuffledPieces(difficulty.size));
    setSelectedPieceIndex(null);
    setMoves(0);
    setElapsedSeconds(0);
  };

  const selectDifficulty = (option) => {
    setSelectedDifficulty(option.id);
    setPieces(createShuffledPieces(option.size));
    setSelectedPieceIndex(null);
    setMoves(0);
    setElapsedSeconds(0);
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
        className="puzzle-new-game-button btn mb-3"
        type="button"
        onClick={startNewGame}
      >
        {isSolved ? "Play again" : "New game"}
      </button>
      <div
        className="puzzle-board mx-auto"
        style={{ "--puzzle-size": difficulty.size }}
        role="group"
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
      <div className="puzzle-stats mt-3" aria-live="polite">
        <span>Moves: {moves}</span>
        <span>Time: {formatTime(elapsedSeconds)}</span>
      </div>
      <p className="puzzle-selection-status text-muted" aria-live="polite">
        {selectedPieceIndex === null
          ? "Select two pieces to swap their positions."
          : "Piece selected. Choose another piece to swap."}
      </p>
      {isSolved && (
        <div className="puzzle-complete mt-3" role="status">
          <h3 className="h5">Congratulations!</h3>
          <p>
            You solved the {difficulty.label.toLowerCase()} puzzle in {moves}{" "}
            moves.
          </p>
          <p>You took {formatCompletionTime(elapsedSeconds)} to complete it.</p>
          <p className="mb-0">Picture: {puzzle.title}</p>
        </div>
      )}
    </div>
  );
}

export default PuzzleBoard;
