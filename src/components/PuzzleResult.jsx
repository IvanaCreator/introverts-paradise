function PuzzleResult({ difficulty, moves, completionTime, puzzleTitle }) {
  return (
    <div className="puzzle-complete mt-3" role="status">
      <h3 className="h5">Congratulations!</h3>
      <p>
        You solved the {difficulty.toLowerCase()} puzzle in {moves} moves.
      </p>
      <p>You took {completionTime} to complete it.</p>
      <p className="mb-0">Picture: {puzzleTitle}</p>
    </div>
  );
}

export default PuzzleResult;
