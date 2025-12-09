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

  const handleViewDetails = (id) => {
    navigate(`/jobs/details/${id}`);
  }
  
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">All Jobs</h1>

        <Link to="/create-job">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
            Record a New Job
          </button>
        </Link>
      </div>

      {jobs.length === 0 && <p className="text-gray-500 text-center mt-10">No jobs found.</p>}
      
      <div className="space-y-4">
        {jobs.map(job => (
          <div key={job.id} className="p-5 bg-white rounded-xl shadow flex justify-between items-center">
            
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{job.company}</h2>
              <p className="text-sm text-gray-500">Status: {job.status}</p>
            </div>

            <div className="flex gap-2">
              
              <button 
                onClick={() => handleViewDetails(job.id)}
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition"
              >
                View Details
              </button>

              <button 
                onClick={() => handleUpdate(job.id)}
                className="px-3 py-1 rounded bg-yellow-400 hover:bg-yellow-500 transition"
              >
                Update
              </button>

              <button 
                onClick={() => handleDelete(job.id)} 
                className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
              >
                Delete
              </button>

            </div>

          </div>
        ))}
      </div>
      
    </div>
  );
}

export default Home;
