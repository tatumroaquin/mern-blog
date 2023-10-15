import { Schema, Model, model } from 'mongoose';
import bcrypt from 'bcrypt';

// https://stackoverflow.com/questions/277044/do-i-need-to-store-the-salt-with-bcrypt
// https://mongoosejs.com/docs/typescript/virtuals.html#set-virtuals-type-manually

export interface UserSchema {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  passwordHash: string;
  roles: string[];
  verified: boolean;
}

export interface UserVirtuals {
  password: string;
}

export type UserModel = Model<UserSchema, object, UserVirtuals>;

const userSchema: Schema = new Schema<UserSchema, UserModel, UserVirtuals>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      enum: ['user', 'admin'],
      default: ['user'],
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods = {
  genHash: function (password: string) {
    return bcrypt.hashSync(password, 10);
  },
  authenticate: function (password: string) {
    return bcrypt.compareSync(password, this.passwordHash);
  },
};

userSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.passwordHash = this.genHash(password);
  })
  .get(function () {
    this._password;
  });

userSchema.index(
  { createdAt: 1 },
  {
    partialFilterExpression: { verified: false },
    expires: process.env.VERIFY_TOKEN_EXPIRY ?? '1d',
  }
);

export default model('User', userSchema);
