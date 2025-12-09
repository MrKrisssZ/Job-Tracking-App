import axios from "axios";

const API = axios.create({
  baseURL: "http://jobtracking.test", // change to your backend URL
});

export const registerUser = (data) => API.post("/register", data);

export const loginUser = (data) => API.post("/login", data);