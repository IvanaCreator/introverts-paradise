function DifficultySelector({ difficulties, selectedDifficulty, onSelect }) {
  return (
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
          onClick={() => onSelect(option)}
          aria-pressed={selectedDifficulty === option.id}
        >
          {option.label} ({option.size} × {option.size})
        </button>
      ))}
    </div>
  );
}

export default DifficultySelector;
