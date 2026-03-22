import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",  // Change when deployed
});

export default api;