import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarBar from "./NavbarBar";
import Addnewjob from "./Addnewjob";
import axios from "axios";

const Findjob = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState("USER_ID_HERE"); // Replace this with actual userId from context or auth

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        // Fetch all jobs
        const response = await axios.get("http://localhost:5000/api/job/getAll");
        setJobs(response.data); // Assuming the response contains job data directly
        setIsLoading(false);
      } catch (error) {
        setError("Error fetching jobs.");
        setIsLoading(false);
        console.error(error);
      }
    };

    fetchAllJobs();
  }, []); // Only fetch once on component mount

  // Handle adding a new job
  const handleAddJob = (newJob) => {
    setJobs((prevJobs) => [...prevJobs, newJob]);
  };

  // Handle toggling saved job state
  const toggleSaveJob = async (jobId) => {
    try {
      const token = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId"); // Ensure you have userId as well
      
      // Send POST request to save/unsave the job
      const response = await axios.post(
        "http://localhost:5000/api/job/save",
        { jobId, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token for authentication
          },
        }
      );
      
      if (response.data.isSuccess) {
        console.log('Job save/unsave success:', response.data.message); // Log success message
        console.log('Updated job data:', response.data); // Log the entire response, assuming it includes updated data
  
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job._id === jobId
              ? { ...job, isSaved: !job.isSaved } // Toggle saved state
              : job
          )
        );
      }
    } catch (error) {
      console.error('Error while saving job:', error.response || error);
      setError("Error saving job.");
    }
  };
  
  

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="saved-jobs">
      {error && <p className="error">{error}</p>} {/* Display error if any */}
      
      {/* If there are no jobs, show a message */}
      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        jobs.map((job, index) => (
          <div className="job-card" key={index}>
            <h3>{job.title}</h3>
            <p>{job.type}</p>
            <p>{job.salary}</p>
            <p>{job.company}</p>
            <p>{job.location}</p>
            {job.addedByMe && <span className="badge">Added by Me</span>}

            {/* Bookmark Icon (Save/Unsave) */}
            <span
              className="bookmark"
              onClick={() => toggleSaveJob(job._id)} // Toggle save/unsave on click
              style={{ cursor: 'pointer' }}
            >
              {job.isSaved ? "✅" : "🔖"} {/* Show bookmark icon depending on saved state */}
            </span>
          </div>
        ))
      )}

      {/* Navbar and Modal trigger */}
      <NavbarBar onAddJob={() => setShowModal(true)} />
      
      {/* Modal component for adding a job */}
      {showModal && <Addnewjob onClose={() => setShowModal(false)} onAddJob={handleAddJob} />}
    </div>
  );
};

export default Findjob;
