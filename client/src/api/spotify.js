import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/spotify/',

});

axiosInstance.interceptors.response.use(response => {
  return { data: response.data, status: response.status };
});


export const searchArtist = async (query) => {
  return await axiosInstance.get(`/searchArtist?q=${query}`);
};;