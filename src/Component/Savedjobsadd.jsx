import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for making API requests
import "./Savedjobsadd.css";

const Savedjobsadd = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        // Make the GET request to your backend to fetch all jobs
        const response = await axios.get('http://localhost:5000/api/job/getAll'); // Updated endpoint
        setJobs(response.data); // Assuming the response contains job data directly
        setIsLoading(false);
      } catch (error) {
        setError('Error fetching jobs.');
        setIsLoading(false);
        console.error(error);
      }
    };

    fetchAllJobs();
  }, []); // Empty dependency array ensures this runs only once

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="saved-jobs">
      {error && <p className="error">{error}</p>} {/* Display error if any */}
      {jobs.length === 0 ? (
        <p>No jobs found.</p> // Display message if no jobs are available
      ) : (
        jobs.map((job, index) => (
          <div className="job-card" key={index}>
            <h3>{job.title}</h3>
            <p>{job.type}</p>
            <p>{job.salary}</p>
            <p>{job.company}</p>
            <p>{job.location}</p>
            {job.addedByMe && <span className="badge">Added by Me</span>}
            <span className="bookmark">🔖</span>
          </div>
        ))
      )}
    </div>
  );
};

export default Savedjobsadd;
