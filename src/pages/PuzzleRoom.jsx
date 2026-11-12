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
    <section className="text-center">
      <h1>Puzzle Room</h1>
      <p>Choose an image to start your puzzle.</p>

      <PuzzleCarousel
        puzzles={puzzles}
        selectedPuzzleId={selectedPuzzleId}
        onSelect={setSelectedPuzzleId}
      />
      <PuzzleBoard key={selectedPuzzle.id} puzzle={selectedPuzzle} />
    </section>
  );
}

export default PuzzleRoom;