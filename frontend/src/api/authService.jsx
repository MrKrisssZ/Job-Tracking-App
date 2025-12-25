import axios from "axios";

const AUTH_API = axios.create({
  baseURL: "http://3.107.86.158", // change to your backend URL
});

export const registerUser = (data) => AUTH_API.post("/api/register", data);

export const loginUser = (data) => AUTH_API.post("/api/login", data);
