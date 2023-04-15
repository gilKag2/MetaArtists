
import axios from 'axios';
import express from 'express';
import { convertArtistsResults } from '../utils/spotify.js';
import { macMillerSearchResults } from '../searchResultsBackup.js';


const router = express.Router();

const axiosClient = axios.create({
  baseURL: 'https://spotify23.p.rapidapi.com/',
});


router.get('/searchArtist', async (req, res) => {
  const query = req.query[ 'q' ];
  if (query?.length == 0) {
    return res.status(400).send({ message: 'no query' });
  }
  try {
    // const { data } = await axiosClient.get('search/', { params: { q: query, type: 'artists', limit: 5 }, headers: getApiHeaders() });
    // const artists = convertArtistsResults(data.artists.items);
    res.send(macMillerSearchResults);
    // console.log(artists);
  } catch (e) {
    console.log(e);
    res.status(404).send(e.message);
  }
});

// needed beacuse the api key env variable is not loaded with the axios client
const getApiHeaders = () => {
  return {
    'X-RapidAPI-Key': process.env.SPOTIFY_API_KEY,
    'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
  };
};

export { router as SpotifyRouter };