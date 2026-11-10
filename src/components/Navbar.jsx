import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg cozy-navbar">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Introvert's Paradise
        </NavLink>

        <div className="navbar-nav ms-auto">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>

          <NavLink className="nav-link" to="/books">
            Book Nook
          </NavLink>

          <NavLink className="nav-link" to="/journal">
            Journal
          </NavLink>

          <NavLink className="nav-link" to="/garden">
            Flower Garden
          </NavLink>

          <NavLink className="nav-link" to="/puzzle">
            Puzzle Room
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;