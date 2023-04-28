import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/spotify/',

});

axiosInstance.interceptors.response.use(response => response.data);


export const searchArtist = async (query) => {
  return await axiosInstance.get(`/searchArtist?q=${query}`);
};;

export const getArtistData = async (artistId) => {
  return await axiosInstance.get(`/artists/${artistId}`);
};

export const getRelatedArtists = async (artistId) => {
  return await axiosInstance.get(`/related/${artistId}`);
};