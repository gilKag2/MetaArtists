import mongoose from "mongoose";

const User = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const UserSchema = new mongoose.model('User', UserSchema);

export default UserSchema;