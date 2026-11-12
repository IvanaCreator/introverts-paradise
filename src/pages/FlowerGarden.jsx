import { useState } from "react";

import Bouquet from "../components/Bouquet";
import FlowerPicker from "../components/FlowerPicker";
import VasePicker from "../components/VasePicker";
import { flowers, vases } from "../data/flowers";

function FlowerGarden() {
  const [bouquetFlowers, setBouquetFlowers] = useState([]);
  const [selectedVaseId, setSelectedVaseId] = useState(vases[0].id);
  const selectedVase = vases.find((vase) => vase.id === selectedVaseId);

  function handleAddFlower(flower) {
    setBouquetFlowers((currentFlowers) => [...currentFlowers, flower]);
  }

  function handleReset() {
    setBouquetFlowers([]);
  }

  return (
    <section className="flower-garden-page">
      <h1>Build Your Own Bouquet</h1>
      <p>Choose your flowers, pick a vase and create something lovely.</p>

      <section aria-labelledby="bouquet-heading">
        <h2 id="bouquet-heading">Your bouquet</h2>
        <Bouquet flowers={bouquetFlowers} vase={selectedVase} />
        <button className="btn btn-outline-secondary" type="button" onClick={handleReset}>
          Start over
        </button>
      </section>

      <section aria-labelledby="flower-picker-heading">
        <h2 id="flower-picker-heading">Choose your flowers</h2>
        <FlowerPicker flowers={flowers} onAdd={handleAddFlower} />
      </section>

      <section aria-labelledby="vase-picker-heading">
        <h2 id="vase-picker-heading">Choose your vase</h2>
        <VasePicker
          vases={vases}
          selectedVaseId={selectedVaseId}
          onSelect={setSelectedVaseId}
        />
      </section>
    </section>
  );
}

export default FlowerGarden;
