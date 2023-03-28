import express from 'express';
import User from '../mongodb/models/user.js';

const router = express.Router();


router.post('/register', async (req, res) => {
  const { userName, email, password } = req.body;

  // const userWithSameUsername = await User.findOne({})

  try {
    const user = await User.create({
      userName,
      email,
      password
    });
    console.log(user);
    res.sendStatus(200);
  } catch (e) {
    if (e.code === 11000) {
      return res.status(403).send(e.keyValue);

    }
    res.status(400).send('failed to create user');
  }
});

router.post('/login', async (req, res) => {

  const { email, password } = req.body;
  // add user validation

  const user = await User.findOne({ email, password });
  console.log(user);
  if (user) {
    res.json('logined');
  } else {
    res.json('no such user');
  }
});

export default router;