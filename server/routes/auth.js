import express from 'express';
import User from '../mongodb/models/user.js';
import jwt_decode from 'jwt-decode';
import { convertUserObject, hashPassword, validateUserPassword } from '../utils/auth.js';

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
    res.status(201).send(convertUserObject(user));
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
    res.send(convertUserObject(user));
  } catch (e) {
    res.sendStatus(500);
  }
});


router.post('/googleAuth', async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.sendStatus(400);
  }
  const userObject = jwt_decode(token);
  console.log(userObject);
  try {
    const existingUser = await User.findOne({ email: userObject.email });
    if (existingUser) {
      return res.status(200).send(convertUserObject(existingUser));
    }

    // if there is no user, create a new one
    const user = await User.create({
      userName: userObject.name,
      email: userObject.email,
      googleId: userObject.sub
    });
    res.status(201).send(convertUserObject(user, true));
  } catch (e) {
    res.sendStatus(500);
  }
});


export default router;