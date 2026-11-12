import { HashRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import BookNook from "./pages/BookNook";
import Journal from "./pages/Journal";
import FlowerGarden from "./pages/FlowerGarden";
import PuzzleRoom from "./pages/PuzzleRoom";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light";

    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [isDarkMode]);

  return (
    <HashRouter>
      <Navbar
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode((current) => !current)}
      />

      <main className="container py-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BookNook />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/garden" element={<FlowerGarden />} />
          <Route path="/puzzle" element={<PuzzleRoom />} />
        </Routes>
      </main>
    </HashRouter>
  );
}

export default App;