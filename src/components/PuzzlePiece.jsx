function PuzzlePiece({
  piece,
  pieceIndex,
  size,
  image,
  isSelected,
  onClick,
}) {
  const position = size - 1;
  const backgroundPosition = `${(piece.column / position) * 100}% ${
    (piece.row / position) * 100
  }%`;

  return (
    <button
      className={`puzzle-piece ${isSelected ? "puzzle-piece-selected" : ""}`}
      type="button"
      onClick={() => onClick(pieceIndex)}
      aria-pressed={isSelected}
      aria-label={`Puzzle piece ${piece.id + 1}`}
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition,
        backgroundSize: `${size * 100}% ${size * 100}%`,
      }}
    />
  );
}

export default PuzzlePiece;
