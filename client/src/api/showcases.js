import axios from "axios";


const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/showcases/',

});

axiosInstance.interceptors.response.use(response => response.data);


export const getArtistShowcases = async (artistId) => {
  return await axiosInstance.get(`artist/${artistId}`);
};