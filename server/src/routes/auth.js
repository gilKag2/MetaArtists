import { Router } from 'express';
import authService from '../services/auth-service.js';

const router = Router();

router.post('/register', async (req, res, next) => {
  const { userName, email, password } = req.body;

  if (!email || !password || !userName) {
    return res.sendStatus(400);
  }

  try {
    const user = await authService.createUser(userName, email, password);
    res.status(201).send(user);
  } catch (e) {
    next(e);
  }
});

router.post('/login', async (req, res, next) => {

  const { email, password } = req.body;
  if (!email || !password) {
    return res.sendStatus(400);
  }
  try {
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    res.send(user);
  } catch (e) {
    next(e);
  }
});


router.post('/googleAuth', async (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    return res.sendStatus(400);
  }

  try {
    const { isCreated, user } = await authService.authWithGoogle(token);
    res.status(isCreated ? 201 : 200).send(user);
  } catch (e) {
    next(e);
  }

});


export default router;