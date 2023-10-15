import { Schema, model } from 'mongoose';

interface VerifyTokenSchema {
  userId: Schema.Types.ObjectId;
  content: string;
  createdAt: Date;
}

const verifyTokenSchema: Schema = new Schema<VerifyTokenSchema>({
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
    expires: process.env.VERIFY_TOKEN_EXPIRY ?? '1d',
  },
});

export default model('VerifyToken', verifyTokenSchema);
