import { getPublicAsset } from "../utils/assets";

function HomeHero() {
  return (
    <section className="welcome-section">
      <div className="welcome-content">
        <p className="welcome-label">A LITTLE PLACE JUST FOR YOU</p>

        <h1>Welcome to Your Cozy Corner</h1>

        <p className="welcome-text">
          A peaceful little space to slow down, dream, create and enjoy the
          little things in life.
        </p>
      </div>

      <div className="welcome-image-frame">
        <img
          src={getPublicAsset("welcome.jpeg")}
          alt="A warm and cozy home interior"
        />
      </div>
    </section>
  );
}

export default HomeHero;
