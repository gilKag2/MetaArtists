
import { Router } from 'express';
import spotifyService from '../services/spotify-service.js';

const router = Router();

router.get('/searchArtist', async (req, res, next) => {
  const query = req.query[ 'q' ];
  if (query?.length == 0) {
    return res.status(400).send({ message: 'no query' });
  }
  try {
    const searchResults = await spotifyService.searchArtist(query);
    res.send(searchResults);
  } catch (e) {

    next(e);
  }
});

router.get('/artists/:artistId', async (req, res, next) => {
  const { artistId } = req.params;
  if (!artistId) {
    return res.status(400).send('please provide an artist');
  }

  try {
    const artist = await spotifyService.getArtist(artistId);
    res.send(artist);
  } catch (e) {

    next(e);
  }
});


router.get('/related/:artistId', async (req, res, next) => {
  const { artistId } = req.params;
  if (!artistId) {
    return res.status(400).send('please provide an artist');
  }
  try {
    const relatedArtists = await spotifyService.getRelatedArtists(artistId);
    res.send(relatedArtists);
  } catch (e) {
    next(e);
  }
});




export default router;