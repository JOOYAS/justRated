import axios from "axios";

const baseURL =
    import.meta.env.VITE_ENV === "development"
        ? import.meta.env.VITE_API_BASE_URL   // your backend port locally
        : "/api";           

const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
});

export default axiosInstance;
