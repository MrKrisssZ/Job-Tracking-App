import axios from "axios";

const API = axios.create({
  baseURL: "http://jobtracking.test", // change to your backend URL
});

// Example: POST a new job
export const createJob = (jobData) => API.post("/api/jobs", jobData);

// Example: GET all jobs
export const getJobs = () => API.get("/api/jobs");
