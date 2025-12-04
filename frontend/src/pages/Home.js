import { useEffect, useState } from "react";
import { getJobs, deleteJob } from "../api/jobApi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Home() {
  const [jobs, setJobs] = useState([]); // when state changed, react re-renders the whole component.
  const navigate = useNavigate();

  useEffect(() => {
    getJobs()
      .then(res => setJobs(res.data)) // inside .then(), res object is from Axios
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      setJobs(jobs.filter((job) => job.id !== id)); // remove from state
    } catch (err) {
      console.error(err);
      alert('Error deleting job');
    }
  };

  const handleUpdate = (id) => {
    navigate(`/jobs/update/${id}`);
  };


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
            <button onClick={() => handleDelete(job.id)}>Delete</button>
            <button onClick={() => handleUpdate(job.id)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
