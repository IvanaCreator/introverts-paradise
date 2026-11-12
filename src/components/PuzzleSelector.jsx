function PuzzleSelector({ puzzles, selectedPuzzleId, onSelect }) {
  return (
    <div className="row g-4 justify-content-center mt-3">
      {puzzles.map((puzzle) => (
        <div className="col-12 col-sm-6 col-lg-3" key={puzzle.id}>
          <button
            className={`btn p-2 w-100 ${
              selectedPuzzleId === puzzle.id
                ? "border border-3 border-dark"
                : "border"
            }`}
            type="button"
            onClick={() => onSelect(puzzle.id)}
            aria-pressed={selectedPuzzleId === puzzle.id}
          >
            <img
              className="img-fluid rounded"
              src={puzzle.image}
              alt={puzzle.title}
            />
            <span className="d-block mt-2">{puzzle.title}</span>
          </button>
        </div>
      ))}
    </div>
  );
}

export default PuzzleSelector;
