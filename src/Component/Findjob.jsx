import React, { useState, useEffect } from "react";
import NavbarBar from "./NavbarBar";
import Addnewjob from "./Addnewjob";
import axios from "axios";

const Findjob = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/job/getAll");
        setJobs(response.data); // Set the job data to state
      } catch (err) {
        setError("Error fetching jobs.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllJobs();
  }, []);

  const handleAddJob = (newJob) => {
    setJobs((prevJobs) => [...prevJobs, newJob]);
  };

  const toggleSaveJob = async (jobId) => {
    try {
      const token = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");
      const response = await axios.post(
        "http://localhost:5000/api/job/save",
        { jobId, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.isSuccess) {
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job._id === jobId
              ? { ...job, isSaved: !job.isSaved }
              : job
          )
        );
      }
    } catch (error) {
      setError("Error saving job.");
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="saved-jobs" style={{ padding: "20px" }}>
      {error && <p className="error">{error}</p>}
      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        jobs.map((job, index) => (
          <div
            className="job-card"
            key={index}
            style={{
              backgroundColor: "#f9f9f9",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "20px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              position: "relative",
              width: "400px", // Increased width
              height: "180px", // Decreased height
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <h3
              style={{
                textAlign: "center",
                marginBottom: "5px",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              {job.title}
            </h3>

            <div
              className="job-details"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <div
                className="left-section"
                style={{
                  backgroundColor: "#e0e0e0",
                  color: "green",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  textAlign: "center",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginRight: "10px",
                }}
              >
                {job.jobType}
              </div>

              <div
                className="right-section"
                style={{
                  flex: 1,
                  textAlign: "right",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#555",
                }}
              >
                Salary: ${job.salary}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* Image */}
              <img
                src={"public/images/download.png"}
                alt="Company logo"
                style={{
                  width: "40px",
                  height: "40px",
                  marginRight: "10px",
                }}
              />
                 
              {/* Location and Company Name */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flex: 1,
                }}
              >
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight:"bold",
                    color: "#333",
                    marginTop: "5px",
                    marginLeft:"5px"
                  }}
                >
                  {job.company}
                </p>
                {/* Location */}
                <p
                  className="location"
                  style={{
                    fontSize: "14px",
                    color: "#555",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <i
                    className="fa fa-map-marker"
                    style={{ marginRight: "5px", color: "#555" }}
                  ></i>
                  {job.location}
                </p>

                {/* Company Name */}
                
              </div>

              {/* Bookmark Icon */}
              <span
                className="bookmark"
                onClick={() => toggleSaveJob(job._id)}
                style={{
                  fontSize: "20px",
                  cursor: "pointer",
                  color: "#007bff",
                }}
              >
                <i
                  className={
                    job.isSaved
                      ? "fa-solid fa-bookmark" // Filled icon if saved
                      : "fa-regular fa-bookmark" // Outline icon if not saved
                  }
                ></i>
              </span>
            </div>
          </div>
        ))
      )}

      <NavbarBar onAddJob={() => setShowModal(true)} />
      {showModal && <Addnewjob onClose={() => setShowModal(false)} onAddJob={handleAddJob} />}
    </div>
  );
};

export default Findjob;
