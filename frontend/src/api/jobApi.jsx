import JWT_API from "./jwtInstance";

// Example: POST a new job
export const createJob = (jobData) => JWT_API.post("/api/jobs", jobData);

export const getJobs = (status) => {
    let url = "/api/jobs";
    if (status) {
        url += `?status=${status}`;
    } 
    return JWT_API.get(url);
};

export const getJobById = (id) => JWT_API.get(`/api/jobs/${id}`);

export const deleteJob = (id) => JWT_API.delete(`/api/jobs/${id}`);

export const updateJob = (id, jobData) => JWT_API.put(`/api/jobs/${id}`, jobData);

export const deleteAccount = () => JWT_API.delete("/api/user/delete");