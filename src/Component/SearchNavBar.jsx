import React from "react";
import { FaBars } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { IoMdOptions } from "react-icons/io";
import "./SearchNavBar.css";

const SearchNavBar = () => {
  return (
    <div className="search-navbar">
      <div className="nav-bar">
        <div className="quick-filters">
          <FaBars className="icon" />
          <span className="quick-filters-text">Quick Filters</span>
        </div>
        <div className="search-section">
          <div className="search-input">
            <BiSearch className="icon" />
            <input
              type="text"
              placeholder="Search by: Job title, Position, Keywords..."
              className="input"
            />
          </div>
          <div className="search-input">
            <MdLocationOn className="icon" />
            <input
              type="text"
              placeholder="City, state or zip code"
              className="input"
            />
          </div>
          <div className="filter-section">
            <IoMdOptions className="filter-icon" />
            <span className="filter-text">Filters</span>
          </div>
          <button className="find-job-button">Find Job</button>
        </div>
      </div>
    </div>
  );
};

export default SearchNavBar;
