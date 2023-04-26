
import axios from 'axios';
import { Router } from 'express';
import { convertArtistData, convertArtistsResults, convertRelatedArtistsData } from '../utils/spotify.js';
import { macMillerArtistData, macMillerRelatedArtistsData, macMillerSearchResults } from '../searchResultsBackup.js';


const router = Router();

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
    // res.send(artists);
    res.send(macMillerSearchResults);
    // console.log(artists);
  } catch (e) {
    console.log(e);
    res.status(404).send(e.message);
  }
});

router.get('/artists/:artistId', async (req, res) => {
  const { artistId } = req.params;
  if (!artistId) {
    return res.status(400).send('please provide an artist');
  }

  try {
    // const { data } = await axiosClient.get('artist_overview/', { params: { id: artistId }, headers: getApiHeaders() });
    // console.log(data.data.artist);
    // res.send(convertArtistData(data.data.artist));
    res.send(macMillerArtistData);
  } catch (e) {
    console.log(e);
    res.status(404).send(e.message || e);
  }
});


router.get('/related/:artistId', async (req, res) => {
  const { artistId } = req.params;
  if (!artistId) {
    return res.status(400).send('please provide an artist');
  }
  try {
    // const { data } = await axiosClient.get('artist_related/', { params: { id: artistId }, headers: getApiHeaders() });
    // res.send(convertRelatedArtistsData(data.artists));
    res.send(macMillerRelatedArtistsData);
    // console.log(data);
    // res.send(data);
  } catch (e) {
    console.log(e);
    res.status(404).send(e.message || e);

  }
});


// needed beacuse the api key env variable is not loaded with the axios client
const getApiHeaders = () => {
  return {
    'X-RapidAPI-Key': process.env.SPOTIFY_API_KEY,
    'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
  };
};

export default router;