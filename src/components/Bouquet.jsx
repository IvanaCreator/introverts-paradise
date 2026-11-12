const FLOWER_SLOT_ORDER = [1, 2, 0, 3];

function Bouquet({ flowers, vase }) {
  const flowerAreaStyle = {
    "--flower-area-top": vase.flowerArea.top,
    "--flower-area-right": vase.flowerArea.right,
    "--flower-area-bottom": vase.flowerArea.bottom,
    "--flower-area-left": vase.flowerArea.left,
    "--flower-size": vase.flowerSize,
    "--flower-spacing": vase.flowerSpacing,
    "--vase-scale": vase.vaseScale,
    "--flower-boundary": vase.flowerBoundary,
    "--flower-origin-top": vase.flowerOrigin.top,
    "--flower-origin-left": vase.flowerOrigin.left,
    "--flower-angle": vase.flowerAngle,
  };

  return (
    <div className="bouquet-stage" style={flowerAreaStyle}>
      <div className="bouquet-debug-points" aria-hidden="true">
        <span className="bouquet-debug-point bouquet-debug-point-top-left" />
        <span className="bouquet-debug-point bouquet-debug-point-top-right" />
        <span className="bouquet-debug-point bouquet-debug-point-bottom-left" />
        <span className="bouquet-debug-point bouquet-debug-point-bottom-right" />
      </div>
      <div className="bouquet-boundary-debug" aria-hidden="true">
        <span className="bouquet-boundary-point bouquet-boundary-point-left" />
        <span className="bouquet-boundary-point bouquet-boundary-point-right" />
      </div>
      <span className="bouquet-origin-debug" aria-hidden="true" />
      {flowers.length === 0 ? (
        <p>Click a flower to start building your bouquet.</p>
      ) : (
        <div className="bouquet-flowers">
          {flowers.map((flower, index) => (
            <img
              key={`${flower.id}-${index}`}
              src={flower.image}
              alt={flower.name}
              style={{
                "--flower-slot":
                  FLOWER_SLOT_ORDER[index % vase.maxFlowers],
                "--flower-slots": vase.maxFlowers,
                "--flower-vertical-offset": flower.verticalOffset || "0px",
                "--flower-horizontal-offset": flower.horizontalOffset || "0px",
                zIndex: index + 1,
              }}
            />
          ))}
        </div>
      )}
      <img
        className="bouquet-vase"
        src={vase.image}
        alt={vase.name}
        style={{ "--vase-scale": vase.vaseScale }}
      />
    </div>
  );
}

export default Bouquet;
