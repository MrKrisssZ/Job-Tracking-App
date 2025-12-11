import axios from "axios";

const JWT_API = axios.create({
  baseURL: "http://jobtracking.test", // include /api here
});

// Automatically attach JWT token to every request
JWT_API.interceptors.request.use(
    // config is the request configuration object that Axios uses for the HTTP request.
    // Inside this function, you can modify headers, URL, or anything else before the request is sent.
    // Returning config is mandatory — it tells Axios to continue with the request.

    (config) => {
        const token = localStorage.getItem("token"); // get token from localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR (auto logout if token invalid/expired)
JWT_API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token invalid or expired → remove it
      localStorage.removeItem("token");

      // Redirect user to login page
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);


export default JWT_API;
