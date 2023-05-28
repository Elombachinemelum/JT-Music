import axios from "axios";

const apiClient = axios.create({
  baseURL: "​https://shazam-core.p.rapidapi.com/v1",
});

export default apiClient;
