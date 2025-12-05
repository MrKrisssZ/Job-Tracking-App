import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobById } from "../api/jobApi";

function JobDetails() {
    const { id } = useParams();
    const [job, setJob] = useState(null);

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
        return <p>Job not found.</p>;
    } 

    return (
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl w-full text-center space-y-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{job.position} @ {job.company}</h1>

            <div>
                <p><span className="font-semibold">Status:</span> {job.status}</p>
                <p><strong>URL: </strong><a href={job.url} className="text-blue-600 hover:underline">{job.url}</a></p> 
                <p><strong>Applied At:</strong> {job.applied_at}</p>
                <p><strong>Notes:</strong></p>
            </div>
            
            <div>
                <p>{job.notes}</p>

            </div>
            <div className="text-4xl text-red-500 bg-yellow-200 p-4">
                Tailwind is working!
            </div>

            <br/>
            <button onClick={() => window.history.back()} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md font-semibold">Back</button>
        </div>
            
    );
}

export default JobDetails;
