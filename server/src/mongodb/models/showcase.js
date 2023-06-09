import mongoose from "mongoose";
import { NoSuchResourceError } from "../../errors/index.js";

const showcaseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  artistId: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    required: true
  },
  lyrics: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});


showcaseSchema.statics.findByMongoId = async function (showcaseId) {
  const showcase = await this.findById(new mongoose.Types.ObjectId(showcaseId));
  if (!showcase) {
    throw new NoSuchResourceError('no such user');
  }
  return showcase;
};


const Showcase = mongoose.model('Showcase', showcaseSchema);

export default Showcase;