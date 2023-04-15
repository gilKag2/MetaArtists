import mongoose from "mongoose";

const User = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String, unique: true },
  timestamp: { type: Date, default: Date.now },
},
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      }
    },
    validate: {
      validator: () => !!this.password || !!this.googleId,
      message: 'Either password or googleId must be provided',
    },
  });

const UserSchema = mongoose.model('User', User);

export default UserSchema;