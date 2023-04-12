import mongoose from "mongoose";

const User = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
    }
  },
});

const UserSchema = mongoose.model('User', User);

export default UserSchema;