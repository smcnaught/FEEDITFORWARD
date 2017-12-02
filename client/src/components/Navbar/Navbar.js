import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
const Navbar = props =>
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <Link className="navbar-brand" to="/">
          Feed It Forward
        </Link>
      </div>
      <ul className="nav navbar-nav">
        <li>
          <Link to="/logout">Log Out</Link>
        </li>
      </ul>
    </div>
  </nav>;

export default Navbar;
