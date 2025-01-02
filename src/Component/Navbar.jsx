import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("/");

  const handleSetActive = (path) => {
    setActiveLink(path);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <ul>
          <li>
            <Link
              to="/"
              className={activeLink === "/" ? "active" : ""}
              onClick={() => handleSetActive("/")}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/Findjob"
              className={activeLink === "/Findjob" ? "active" : ""}
              onClick={() => handleSetActive("/Findjob")}
            >
              Find Job
            </Link>
          </li>
          <li>
            <Link
              to="/FindEmployers"
              className={activeLink === "/FindEmployers" ? "active" : ""}
              onClick={() => handleSetActive("/FindEmployers")}
            >
              Find Employers
            </Link>
          </li>
          <li>
            <Link
              to="/JobAlerts"
              className={activeLink === "/JobAlerts" ? "active" : ""}
              onClick={() => handleSetActive("/JobAlerts")}
            >
              Job Alerts
            </Link>
          </li>
          <li>
            <Link
              to="/saved-jobs"
              className={activeLink === "/saved-jobs" ? "active" : ""}
              onClick={() => handleSetActive("/saved-jobs")}
            >
              Saved Jobs & Added by me
            </Link>
          </li>
        </ul>
      </div>

      {/* Top-right container for mobile number and language dropdown */}
      <div className="navbar-right">
        {/* Mobile number as a clickable link */}
        <a href="tel:+1234567890" className="mobile-link">
          +1 (234) 567-890
        </a>

        {/* Language dropdown */}
        <select className="language-dropdown">
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="es">Spanish</option>
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
