import "../assets/css/App.css";
import { Link } from "react-router-dom";
function Nav() {
  return (
    <nav>
      <Link to="/" className="logo">
        Meetings Application
      </Link>
      <div className="links">
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
    </nav>
  );
}

export default Nav;
