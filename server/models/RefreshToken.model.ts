import { Schema, model } from 'mongoose';

interface RefreshTokenSchema {
  userId: Schema.Types.ObjectId;
  token: string;
  createdAt: Date;
}

const refreshTokenSchema: Schema = new Schema<RefreshTokenSchema>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '30d',
  },
});

export default model('RefreshToken', refreshTokenSchema);
