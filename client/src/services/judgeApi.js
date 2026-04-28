import axios from "axios";

const judgeApi = axios.create({
  baseURL: "http://127.0.0.1:5001",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default judgeApi;