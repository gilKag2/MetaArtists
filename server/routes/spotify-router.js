
import axios from 'axios';
import express from 'express';
const router = express.Router();

const axiosClient = axios.create({
  baseURL: 'https://shazam-core.p.rapidapi.com/v1',
  headers: {
    'X-RapidAPI-Key': process.env.SHAZAM_API_KEY
  },

});

router.get('/', async (req, res) => {
  res.send({});
});

export { router as SpotifyRouter };