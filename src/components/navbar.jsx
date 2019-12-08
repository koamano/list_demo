import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/#">
        Demo
      </a>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/samples">
              Samples
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Set Options
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
