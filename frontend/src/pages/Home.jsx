import { useEffect, useState } from "react";
import { getJobs, deleteJob } from "../api/jobService";
import { Link, useNavigate  } from "react-router-dom";
import { deleteAccount } from "../api/userService";

function Home() {
  const [jobs, setJobs] = useState([]); // when state changed, react re-renders the whole component.
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getJobs(status)
      .then(res => setJobs(res.data)) // inside .then(), res object is from Axios
      .catch(err => console.error(err));
  }, [status]);

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

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT
    navigate("/login");               // redirect to login page
  }

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      return;
    }

    try {
      await deleteAccount();

      // remove the token
      localStorage.removeItem("token");

      alert("Your account has been deleted.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Failed to delete account");
    }
  };

  
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">All Jobs for deploy testing</h1>

        <Link to="/create-job">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
            Record a New Job
          </button>
        </Link>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition"
        >
          Logout
        </button>

        <button
          className="text-red-600 hover:text-red-800"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </button>
      </div>

      {/* Filter Dropdown */}
      <div className="flex justify-end mt-4">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border px-3 py-2 rounded-lg shadow-sm"
        >
          <option value="">All Statuses</option>
          <option value="not applied">Not Applied</option>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
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
