import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  title: String,
  body: String,
  tags: [String],
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    _id: mongoose.Types.ObjectId,
    username: String,
  },
});

PostSchema.methods.serialize = function serialize() {
  const data = this.toJSON();
  return data;
};

const Post = mongoose.model('Post', PostSchema);
export default Post;
