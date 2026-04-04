import axios from "axios";

const axiosPublic = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://backendlms-nine.vercel.app",
});

const useAxiosPublic = () => axiosPublic;

export default useAxiosPublic;
