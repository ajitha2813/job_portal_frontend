import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Savedjobsadd.css";

const Savedjobsadd = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Get userId from localStorage
        if (!userId) {
          setError('User not logged in');
          setIsLoading(false);
          return;
        }
  
        // Make the POST request to get saved jobs for the user
        const response = await axios.post('http://localhost:5000/api/job/getSavedJobs', { userId });
  
        if (response.data.isSuccess) {
          setJobs(response.data.data); // Assuming response contains saved job data
        } else {
          setError('No saved jobs found');
        }
  
        setIsLoading(false);
      } catch (error) {
        setError('Error fetching saved jobs.');
        setIsLoading(false);
        console.error(error);
      }
    };
  
    fetchSavedJobs();
  }, []);
  
  

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="saved-jobs">
      {error && <p className="error">{error}</p>} {/* Display error if any */}
      {jobs.length === 0 ? (
        <p>No saved jobs found.</p> // Display message if no jobs are available
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
