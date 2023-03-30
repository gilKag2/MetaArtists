import express from 'express';
import User from '../mongodb/models/user.js';

const router = express.Router();


router.post('/register', async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const user = await User.create({
      userName,
      email,
      password
    });
    res.sendStatus(201);
  } catch (e) {
    if (e.code === 11000) {
      return res.status(403).send(e.keyValue);
    }
    res.status(400).send('failed to create user');
  }
});

router.post('/login', async (req, res) => {

  const { email, password } = req.body;
  if (!email || !password) {
    return res.sendStatus(400);
  }

  try {
    const user = await User.findOne({ email, password });
    console.log(user);

    if (user) {
      res.status(202).send(user);
    } else {
      res.sendStatus(550);
    }
  } catch (e) {
    res.sendStatus(500);
  }
});

export default router;