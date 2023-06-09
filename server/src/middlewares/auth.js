import mongoose from "mongoose";
import User from "../mongodb/models/user.js";



export const auth = async (req, res, next) => {

  const userId = req.headers[ 'user-id' ];
  if (!userId) {
    return res.status(401).json({ message: 'user who made the request is not authenticated' });
  }

  try {
    const user = await User.findByMongoId(userId);
    if (!user) {
      return res.status(401).json({ message: 'no such user' });
    }
  } catch (err) {
    return next(err);
  }


  req.userId = userId;

  next();
};