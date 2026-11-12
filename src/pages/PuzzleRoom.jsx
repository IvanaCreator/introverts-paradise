import { useState } from "react";

import PuzzleBoard from "../components/PuzzleBoard";
import PuzzleCarousel from "../components/PuzzleCarousel";
import { puzzles } from "../data/puzzles";

function PuzzleRoom() {
  const [selectedPuzzleId, setSelectedPuzzleId] = useState(puzzles[0].id);
  const selectedPuzzle = puzzles.find(
    (puzzle) => puzzle.id === selectedPuzzleId,
  );

  return (
    <section className="puzzle-room-page text-center">
      <p className="puzzle-room-label">A quiet little challenge</p>
      <h1>Puzzle Room</h1>
      <p className="puzzle-room-intro">
        Choose a picture, pick your difficulty and enjoy a mindful moment of
        putting it back together.
      </p>

      <div className="puzzle-room-panel">
        <h2 className="puzzle-room-section-title">Choose your picture</h2>
        <PuzzleCarousel
          puzzles={puzzles}
          selectedPuzzleId={selectedPuzzleId}
          onSelect={setSelectedPuzzleId}
        />
      </div>
      <PuzzleBoard key={selectedPuzzle.id} puzzle={selectedPuzzle} />
    </section>
  );
}

export default PuzzleRoom;