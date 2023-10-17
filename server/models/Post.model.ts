import { Schema, Types, model } from 'mongoose';
import slugify from 'slugify';

interface PostSchema {
  author: Types.ObjectId;
  title: string;
  description?: string;
  markdown: string;
  slug: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const postSchema: Schema = new Schema<PostSchema>({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
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

postSchema.pre('validate', function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, trim: true, strict: true });
  }
  this.updatedAt = Date.now();
  next();
});

postSchema.index({ '$**': 'text' });

export default model('Post', postSchema);
