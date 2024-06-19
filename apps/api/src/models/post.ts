import mongoose, { Document, Schema } from 'mongoose';

interface IPost extends Document {
  title: string;
  image: string;
  description: string;
  category: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  comments?: Comment[]
}

export const postSchema = new Schema<IPost>({
  title: {
    type: String,
    required: [true, 'Property is required']
  },
  image: {
    type: String,
    required: [true, 'Property is required']
  },
  description: {
    type: String,
    required: [true, 'Property is required']
  },
  category: {
    type: String,
    required: [true, 'Property is required']
  },
  comments:[
    {
        author: {
            type: String,
            required: [true, 'Property is required']
          },
          content: {
            type: String,
            required: [true, 'Property is required']
          }
    }
  ]
});

const Post = mongoose.model<IPost>('Post', postSchema);

export default Post;
