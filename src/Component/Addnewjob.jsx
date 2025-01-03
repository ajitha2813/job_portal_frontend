import React, { useState } from "react";
import axios from "axios";
import "./AddNewJob.css";

const AddNewJob = ({ onClose, onJobAdded }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [jobType, setJobType] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddJob = async () => {
    if (jobTitle && salaryRange && jobType ) {
      setIsLoading(true); // Show loading state
      setErrorMessage(null); // Clear any previous errors

      try {
        const token = localStorage.getItem("authToken"); // Retrieve token from localStorage

        if (!token) {
          setErrorMessage("You need to log in to add a job.");
          return;
        }

        // Create job payload
        const jobData = {
          title: jobTitle,
          salary: salaryRange,
          type: jobType,
        };

        // Call the API
        const response = await axios.post(
          "http://localhost:5000/api/job/create",
          jobData,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add token to request headers
            },
          }
        );

        if (response.data.isSuccess) {
          onJobAdded(response.data.data); // Notify parent component
          onClose(); // Close modal
        } else {
          setErrorMessage(response.data.message || "Failed to create job.");
        }
      } catch (error) {
        console.error("Error adding job:", error);
        setErrorMessage(
          error.response?.data?.message || "An error occurred while creating the job."
        );
      } finally {
        setIsLoading(false); // Stop loading state
      }
    } else {
      setErrorMessage("Please fill in all fields.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>Add New Job</h2>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="input-field">
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Job title"
            required
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            value={salaryRange}
            onChange={(e) => setSalaryRange(e.target.value)}
            placeholder="Salary range"
            required
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            placeholder="Job type"
            required
          />
        </div>
        <div className="modal-buttons">
          <button
            className="cancel-button"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="add-button"
            onClick={handleAddJob}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewJob;
