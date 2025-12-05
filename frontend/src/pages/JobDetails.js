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
        <div>
            <h1>{job.position} @ {job.company}</h1>

            <p><strong>Status:</strong> {job.status}</p>
            <p><strong>URL:</strong> {job.url}</p>
            <p><strong>Applied At:</strong> {job.applied_at}</p>
            <p><strong>Notes:</strong></p>
            <p>{job.notes}</p>

            <br/>
            <button onClick={() => window.history.back()}>Back</button>
        </div>
    );
}

export default JobDetails;
