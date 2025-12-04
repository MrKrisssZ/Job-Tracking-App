import { useState } from "react";
import { createJob } from "../api/jobApi";

function CreateJob() {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("Not Applied");
  const [applied_at, setAppliedAt] = useState("");
  const [last_update, setLastUpdate] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    try {
        await createJob({
        company,
        position,
        url,
        status,
        applied_at,
        last_update,
        notes: (notes || "").trim() === "" ? null : notes
      });
      setMessage("Job created successfully!");
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
    <div style={{ padding: 20 }}>

      <h2>Create a New Job</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Company:</label><br />
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Position:</label><br />
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>

        <div>
          <label>URL:</label><br />
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>

        
        <div>
          <label>Status:</label><br />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Applied">Applied</option>
            <option value="Not Applied">Not Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div>
          <label>Applied At:</label><br />
          <input
            type="datetime-local"
            value={applied_at}
            onChange={(e) => setAppliedAt(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Last Update:</label><br />
          <input
            type="datetime-local"
            value={last_update}
            onChange={(e) => setLastUpdate(e.target.value)}
          />
        </div>

        <div>
          <label>Notes:</label><br />
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <button type="submit">Create Job</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateJob;
