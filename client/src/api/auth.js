import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/auth/',

});

axiosInstance.interceptors.response.use(response => {
  return { data: response.data, status: response.status };
});

export const registerUser = async (userData) => {
  return await axiosInstance.post(`/register`, userData);
};
export const loginUser = async (userData) => {
  return await axiosInstance.post(`/login`, userData);
};
export const authWithGoogle = async (credentials) => {
  return await axiosInstance.post(`/googleAuth`, { token: credentials });

};