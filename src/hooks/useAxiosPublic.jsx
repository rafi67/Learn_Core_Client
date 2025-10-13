import axios from "axios";

const useAxiosPublic = () => {
  const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_server_url,
  });
  return axiosPublic;
};

export default useAxiosPublic;
