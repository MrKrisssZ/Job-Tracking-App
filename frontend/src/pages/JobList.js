import { useEffect, useState } from "react";
import { getJobs } from "../api/jobApi";
import { Link } from "react-router-dom";

function JobList() {
  const [jobs, setJobs] = useState([]); // when state changed, react re-renders the whole component.

  useEffect(() => {
    getJobs()
      .then(res => setJobs(res.data)) // inside .then(), res object is from Axios
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>All Jobs</h2>

      <Link to="/create-job">
        <button>Create New Job</button>
      </Link>

      {jobs.length === 0 && <p>No jobs found.</p>}

      <ul>
        {jobs.map(job => (
          <li key={job.id}>
            {job.company} — {job.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobList;
