import mongoose from "mongoose";

const GoogleUser = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  googleId: { type: String },
  timestamp: { type: Date, default: Date.now },
});

const GoogleUserSchema = mongoose.model('GoogleUser', GoogleUser);

export default GoogleUserSchema;