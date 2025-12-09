import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobById } from "../api/jobApi";
import { useNavigate } from "react-router-dom";

function JobDetails() {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchJob() {
            try {
                const res = await getJobById(id);
                setJob(res.data);
            } catch (err) {
                console.error("Failed to load job:", err);
            }
        }
        fetchJob();
    }, [id]);

    if (!job)
    {
        return (
            <div className="flex justify-center items-center h-screen text-gray-600">
                <p className="text-lg">Job not found.</p>
            </div>
        );
    } 

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4 py-10">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xl w-full animate-fadeIn">
                {/* Header */}
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
                    {job.position} <span className="text-blue-600">@</span> {job.company}
                </h1>

                {/* Job info */}
                <div className="space-y-4 text-gray-700">

                    <div className="flex justify-between">
                        <span className="font-semibold">Status:</span>
                        <span>{job.status}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="font-semibold">Applied At:</span>
                        <span>{job.applied_at}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="font-semibold">URL:</span>
                        <a
                            href={job.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline break-all text-right"
                        >
                            {job.url}
                        </a>
                    </div>

                    {/* Notes */}
                    <div>
                        <p className="font-semibold mb-1">Notes:</p>
                        <div className="bg-gray-50 p-4 rounded-md border border-gray-200 text-left whitespace-pre-wrap">
                            {job.notes || "No notes added."}
                        </div>
                    </div>

                </div>
            
                {/* Back button */}
                <div className="mt-8 text-center space-x-4">
                    <button
                        onClick={() => navigate(`/jobs/update/${id}`)}
                        className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition"
                    >
                        Update
                    </button>

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

export default JobDetails;
