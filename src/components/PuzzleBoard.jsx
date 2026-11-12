function PuzzleBoard({ puzzle }) {
  return (
    <div className="mt-5">
      <h2 className="h4">Selected image</h2>
      <img
        className="img-fluid rounded shadow-sm"
        src={puzzle.image}
        alt={puzzle.title}
        style={{ maxHeight: "360px" }}
      />
    </div>
  );
}

export default PuzzleBoard;
