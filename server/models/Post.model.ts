import { Schema, model } from 'mongoose';
import slugify from 'slugify';

interface PostSchema {
  userId: Schema.Types.ObjectId;
  title: string;
  description?: string;
  markdown: string;
  slug: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const postSchema: Schema = new Schema<PostSchema>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  markdown: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

postSchema.pre('validate', function () {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, trim: true });
  }
});

export default model('Post', postSchema);
