import { Schema, model } from 'mongoose';

interface RefreshTokenSchema {
  userId: Schema.Types.ObjectId;
  content: string;
  createdAt: Date;
}

const refreshTokenSchema: Schema = new Schema<RefreshTokenSchema>({
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
    // expires: 24 * Math.pow(60, 2)
    expires: process.env.JWT_RT_EXPIRY ?? '1d',
  },
});

export default model('RefreshToken', refreshTokenSchema);
