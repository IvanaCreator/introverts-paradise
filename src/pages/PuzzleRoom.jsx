import { useState } from "react";

import { puzzles } from "../data/puzzles";

function PuzzleRoom() {
  const [selectedPuzzleId, setSelectedPuzzleId] = useState(puzzles[0].id);
  const selectedPuzzle = puzzles.find(
    (puzzle) => puzzle.id === selectedPuzzleId,
  );

  return (
    <section className="text-center">
      <h1>Puzzle Room</h1>
      <p>Choose an image to start your puzzle.</p>

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
              onClick={() => setSelectedPuzzleId(puzzle.id)}
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

      <div className="mt-5">
        <h2 className="h4">Selected image</h2>
        <img
          className="img-fluid rounded shadow-sm"
          src={selectedPuzzle.image}
          alt={selectedPuzzle.title}
          style={{ maxHeight: "360px" }}
        />
      </div>
    </section>
  );
}

export default PuzzleRoom;