import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import BookNook from "./pages/BookNook";
import Journal from "./pages/Journal";
import FlowerGarden from "./pages/FlowerGarden";
import PuzzleRoom from "./pages/PuzzleRoom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="container py-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BookNook />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/garden" element={<FlowerGarden />} />
          <Route path="/puzzle" element={<PuzzleRoom />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;