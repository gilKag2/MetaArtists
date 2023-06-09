
import axios from 'axios';
import { macMillerArtistData, macMillerRelatedArtistsData, macMillerSearchResults } from '../searchResultsBackup.js';

const axiosClient = axios.create({
  baseURL: 'https://spotify23.p.rapidapi.com/',
});

class SpotifyService {

  async searchArtist(query) {
    // const { data } = await axiosClient.get('search/', { params: { q: query, type: 'artists', limit: 5 }, headers: getApiHeaders() });
    // const artists = convertArtistsResults(data.artists.items);
    // res.send(artists);
    res.send(macMillerSearchResults);
    // console.log(artists);
  }

  async getArtist(artistId) {
    // const { data } = await axiosClient.get('artist_overview/', { params: { id: artistId }, headers: getApiHeaders() });
    // console.log(data.data.artist);
    // res.send(convertArtistData(data.data.artist));
    res.send(macMillerArtistData);
  }

  async getRelatedArtists(artistId) {
    // const { data } = await axiosClient.get('artist_related/', { params: { id: artistId }, headers: getApiHeaders() });
    // res.send(convertRelatedArtistsData(data.artists));
    res.send(macMillerRelatedArtistsData);
    // console.log(data);
    // res.send(data);
  }

}

// needed beacuse the api key env variable is not loaded with the axios client
function getApiHeaders() {
  return {
    'X-RapidAPI-Key': process.env.SPOTIFY_API_KEY,
    'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
  };
};

const spotifyService = new SpotifyService();

export default spotifyService;