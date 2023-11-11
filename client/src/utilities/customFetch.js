import axios from "axios";

// export const backendBaseURL = "http://127.0.0.1:5001";
export const backendBaseURL = "http://localhost:5001";

const customFetch = axios.create({
  // baseURL: `${backendBaseURL}/api/`,
  baseURL: "/api/",

  withCredentials: true,
});

export default customFetch;
