import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/auth/',

});

export const registerUser = async (userData) => {
  await axiosInstance.post(`/register`, userData);
};
export const loginUser = async (userData) => {
  await axiosInstance.post(`/login`, userData);
};