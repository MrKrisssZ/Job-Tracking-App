import { useState, useEffect} from "react";
import { createJob, getJobById, updateJob } from "../api/jobService";
import { useParams, useNavigate } from "react-router-dom";

function JobForm() {
    const { id } = useParams();
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [url, setUrl] = useState("");
    const [status, setStatus] = useState("Not Applied");
    const [applied_at, setAppliedAt] = useState("");
    const [last_update, setLastUpdate] = useState("");
    const [notes, setNotes] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            // fetch existing job data to prefill form
            getJobById(id)
            .then((res) => {
                const job = res.data;
                setCompany(job.company);
                setPosition(job.position);
                setUrl(job.url);
                setStatus(job.status);
                setAppliedAt(job.applied_at);
                setLastUpdate(job.last_update);
                setNotes(job.notes);
            })
            .catch((err) => console.error(err));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reload
        try {
            const payload = {
                company,
                position,
                url,
                status,
                applied_at,
                last_update,
                notes: (notes || "").trim() === "" ? null : notes
            };

            if (id) 
            {
                await updateJob(id, payload);
                setMessage("Update job successfully!");
            }
            else
            {
                await createJob(payload);
                setMessage("Job created successfully!");
            }
            // Clear the form
            setCompany("");
            setPosition("");
            setUrl("");
            setStatus("Not Applied");
            setAppliedAt("");
            setLastUpdate("");
            setNotes("");
        } catch (err) {
            console.error(last_update);
            setMessage("Error creating job.");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4 py-10">
            <div className="bg-white max-w-xl w-full p-8 rounded-2xl shadow-xl animate-fadeIn">

                {/* Title */}
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
                    {id ? "Update Your Job" : "Record a New Job"}
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="font-semibold text-gray-700">Company:</label><br />
                        <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            required
                            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                        />
                    </div>

                    <div>
                        <label className="font-semibold text-gray-700">Position:</label><br />
                        <input
                            type="text"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            required
                            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                        />
                    </div>

                    <div>
                        <label className="font-semibold text-gray-700">URL:</label><br />
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                        />
                    </div>

                
                    <div>
                        <label className="font-semibold text-gray-700">Status:</label><br />
                        <select 
                            value={status} 
                            onChange={(e) => setStatus(e.target.value)}
                            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                        >
                            <option value="Applied">Applied</option>
                            <option value="Not Applied">Not Applied</option>
                            <option value="Interview">Interview</option>
                            <option value="Offer">Offer</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>

                    <div>
                        <label className="font-semibold text-gray-700">Applied At:</label><br />
                        <input
                            type="datetime-local"
                            value={applied_at}
                            onChange={(e) => setAppliedAt(e.target.value)}
                            required
                            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                        />
                    </div>

                    <div>
                        <label className="font-semibold text-gray-700">Last Update:</label><br />
                        <input
                            type="datetime-local"
                            value={last_update}
                            onChange={(e) => setLastUpdate(e.target.value)}
                            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                        />
                    </div>

                    <div>
                        <label className="font-semibold text-gray-700">Notes:</label><br />
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 h-32 resize-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                        />
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Submit
                    </button>
                </form>
                
                {message && <p className="mt-6 text-center text-green-600 font-medium">{message}</p>}

                {/* Back button */}
                <div className="mt-6 text-center space-x-4">

                    {
                        id ? 
                            <button
                                onClick={() => navigate(`/jobs/details/${id}`)}
                                className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition"
                            >
                                View Details
                            </button>
                        :   null
                    }

                    <button
                        onClick={() => navigate("/")}
                        className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition"
                    >
                        Home
                    </button>
                    
                </div>

            </div>
        </div>
    );
}

export default JobForm;
