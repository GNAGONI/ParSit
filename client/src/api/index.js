import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

export default api;
