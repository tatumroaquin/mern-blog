import { Schema, model } from 'mongoose';

interface TokenSchema {
  userId: Schema.Types.ObjectId;
  content: string;
  createdAt: Date;
}

const tokenSchema: Schema = new Schema<TokenSchema>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 24 * Math.pow(60, 2)
  },
});

export default model('Token', tokenSchema);
