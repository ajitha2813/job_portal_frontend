import React from "react";
import "./NavbarBar.css"; // Import the CSS for styling
import { FaUserCircle } from "react-icons/fa"; // For user icon
import { MdOutlineAdd } from "react-icons/md"; // For add button icon
import { FaStar, FaSearch } from "react-icons/fa"; // Add search icon

const NavbarBar = () => {
  return (
    <div className="navbar-bar">
      {/* Icon before SkillHire Name */}
      <div className="icon-before-skillhire">
        <FaStar className="purple-icon" />
      </div>

      {/* SkillHire Name on the left */}
      <div className="skillhire-name">
        <h3>SkillHire</h3>
      </div>

      {/* Search bar with country dropdown */}
      <div className="navbar-bar-search">
        <select className="country-dropdown">
          <option value="us">🇺🇸 USA</option>
          <option value="in">🇮🇳 India</option>
          <option value="uk">🇬🇧 UK</option>
        </select>
        <div className="search-section">
          <div className="search-input">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by: Job title, Position, Keywords..."
              className="input"
            />
          </div>
        </div>
      </div>

      {/* Add New Job Button */}
      <button className="add-job-button">
        <MdOutlineAdd className="add-icon" />
        Add New Job
      </button>

      {/* User Info on the right */}
      <div className="user-info">
        <FaUserCircle className="user-icon" />
        <span className="username">Username</span>
      </div>
    </div>
  );
};

export default NavbarBar;
