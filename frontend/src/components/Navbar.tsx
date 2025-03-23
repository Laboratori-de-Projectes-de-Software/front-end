import { Link } from "react-router-dom";
import "../styles.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="logo">🤖 AI Battle Arena</Link>
        <nav className="nav-links">
          <Link to="/register">Registro</Link>
          <Link to="/login">Login</Link>
        </nav>
      </div>
    </header>
  );
}
