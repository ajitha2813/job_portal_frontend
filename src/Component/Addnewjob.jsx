import React, { useState } from "react";
import "./Addnewjob.css";
const Addnewjob = ({ onClose, onAddJob }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [jobType, setJobType] = useState("");

  const handleAddJob = () => {
    if (jobTitle && salaryRange && jobType) {
      onAddJob({ title: jobTitle, salary: salaryRange, type: jobType });
      onClose(); // Close the modal
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>Add New Job</h2>
        <div className="input-field">
          <label></label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder=" Job title"
          />
        </div>
        <div className="input-field">
          <label></label>
          <input
            type="text"
            value={salaryRange}
            onChange={(e) => setSalaryRange(e.target.value)}
            placeholder=" Salary range"
          />
        </div>
        <div className="input-field">
          <label></label>
          <input
            type="text"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            placeholder=" Job type"
          />
        </div>
        <div className="modal-buttons">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="add-button" onClick={handleAddJob}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Addnewjob;
