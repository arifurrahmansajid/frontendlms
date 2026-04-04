import axios from "axios";
import { useNavigate } from "react-router-dom";
import useContexHooks from "./useContexHooks";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://studious-engine-eight.vercel.app/",
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useContexHooks();
  // request interceptor to add authorization header for every secure call to the api
  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  // intercepts for 401 and 403 status
  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    async (err) => {
      const status = err.response.status;
      if (status === 401 || status === 403) {
        await logOut();
        navigate("/signIn");
      }
      return Promise.reject(err);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
