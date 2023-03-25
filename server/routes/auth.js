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
    console.log('added user ' + user.id);
    res.send(user);
  } catch (e) {
    console.log(e);
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