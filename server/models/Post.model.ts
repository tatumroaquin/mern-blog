import { Schema, model } from 'mongoose';
import slugify from 'slugify';

interface PostSchema {
  title: string;
  description?: string;
  markdown: string;
  slug: string;
  tags: string[];
}

const postSchema: Schema = new Schema<PostSchema>({
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
});

postSchema.pre('save', function () {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, trim: true });
  }
});

export default model('Post', postSchema);
