function FlowerPicker({ flowers, onAdd }) {
  return (
    <div className="row g-3">
      {flowers.map((flower) => (
        <div className="col-6 col-md-4 col-lg-3" key={flower.id}>
          <button
            className="flower-choice card h-100 w-100"
            type="button"
            onClick={() => onAdd(flower)}
          >
            <img src={flower.image} alt={flower.name} />
            <span>{flower.name}</span>
          </button>
        </div>
      ))}
    </div>
  );
}

export default FlowerPicker;
