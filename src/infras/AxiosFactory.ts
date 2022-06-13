import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_BASEURL;

export default axios;
