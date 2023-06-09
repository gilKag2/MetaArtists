import mongoose from "mongoose";
import { NoSuchResourceError } from "../../errors/index.js";

const userSchema = new mongoose.Schema({
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

userSchema.statics.loginWithEmail = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new NoSuchResourceError('no such user');
  }

  const isSamePassword = await validateUserPassword(password, user.password);
  if (!isSamePassword) {
    throw new Error('password mismatch');
  }
  return user;
};

userSchema.statics.findByMongoId = async function (userId) {
  const user = await this.findById(new mongoose.Types.ObjectId(userId));
  if (!user) {
    throw new NoSuchResourceError('no such user');
  }
  return user;
};


const User = mongoose.model('User', userSchema);

export default User;