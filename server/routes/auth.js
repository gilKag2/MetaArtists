import express from 'express';
import User from '../mongodb/models/user.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { userName, email, password } = req.body;

  if (!email || !password || !userName) {
    return res.sendStatus(400);
  }

  try {
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      userName,
      email,
      password: hashedPassword
    });
    res.sendStatus(201);
  } catch (e) {
    if (e.code === 11000) {
      return res.status(403).send(e.keyValue);
    }
    console.error(e);
    res.status(400).send('failed to create user');
  }
});

router.post('/login', async (req, res) => {

  const { email, password } = req.body;
  if (!email || !password) {
    return res.sendStatus(400);
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.sendStatus(550);
    }
    const isSamePassword = await validateUserPassword(password, user.password);
    if (!isSamePassword) {
      return res.sendStatus(401);
    }

    res.send(user);

  } catch (e) {
    res.sendStatus(500);
  }
});

const validateUserPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export default router;