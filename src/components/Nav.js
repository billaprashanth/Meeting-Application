import "../assets/css/App.css";
import { Link } from "react-router-dom";
import { useState } from "react";
function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav>
      <Link to="/" className="logo">
        Meetings Application
      </Link>
      <div className={`links ${isOpen ? "open" : ""}`}>
        <Link className="link" to="/upcoming-meetings">
          Upcoming Meetings
        </Link>
        <Link className="link" to="/past-meetings">
          Past Meetings
        </Link>
        <Link className="link" to="/add-meetings">
          Add Meetings
        </Link>
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
    </nav>
  );
}

export default Nav;
