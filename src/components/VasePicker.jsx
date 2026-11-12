function VasePicker({ vases, selectedVaseId, onSelect }) {
  return (
    <div className="row g-3">
      {vases.map((vase) => (
        <div className="col-4" key={vase.id}>
          <button
            className={`vase-choice card ${
              selectedVaseId === vase.id ? "is-selected" : ""
            }`}
            type="button"
            onClick={() => onSelect(vase.id)}
          >
            <img
              src={vase.image}
              alt={vase.name}
              style={{ "--vase-scale": vase.vaseScale }}
            />
            <span>{vase.name}</span>
          </button>
        </div>
      ))}
    </div>
  );
}

export default VasePicker;
