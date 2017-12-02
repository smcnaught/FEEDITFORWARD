import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "./feed.svg";


// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
const Navbar = props =>
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <Link className="navbar-brand" to="/">
          <img className="mainLogo" src={logo} alt="logo" />  
        </Link>
      </div>
      <ul className="nav navbar-nav">
        
        <li className={window.location.pathname === "/logout" ? "active" : ""}>
          <Link to="/Logout">Log Out</Link>
        </li>
        
      </ul>
    </div>
  </nav>;

export default Navbar;