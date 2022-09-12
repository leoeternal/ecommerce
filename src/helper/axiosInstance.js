import axios from "axios";

let baseURL = "http://localhost:8000";

export default axios.create({
  baseURL,
});
