
import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import showcaseService from '../services/showcase-service.js';

const router = Router();

router.get('/artist/:artistId', async (req, res, next) => {
  const { artistId } = req.params;
  try {
    const showcases = await showcaseService.getShowcases(artistId);
    res.send(showcases);
  } catch (e) {
    next(e);
  }
});

router.post('/create', auth, async (req, res, next) => {
  const { userId } = req;
  const { artistData, prompt } = req.body;
  if (!artistData || !prompt) {
    return res.sendStatus(400);
  }

  try {
    const showcase = await showcaseService.createShowcase(artistData, prompt, userId);
    res.status(201).send(showcase);
  } catch (e) {
    next(e);
  }
});

export default router;