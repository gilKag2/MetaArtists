import mongoose from "mongoose";

const User = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const UserSchema = mongoose.model('User', User);

export default UserSchema;