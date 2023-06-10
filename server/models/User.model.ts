import { Document, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

//https://stackoverflow.com/questions/277044/do-i-need-to-store-the-salt-with-bcrypt

interface UserSchema {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  passwordHash: string;
  roles: string[];
  tokens: string[];
}

interface UserModel extends UserSchema, Document {
  _password?: string;
  genHash: (password: string) => string;
  authenticate: (password: string) => boolean;
}

const userSchema: Schema = new Schema<UserSchema>({
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
  tokens: [String],
});

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

export default model<UserModel>('User', userSchema);
