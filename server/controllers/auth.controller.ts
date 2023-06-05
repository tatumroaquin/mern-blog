import { Request, Response } from 'express';
import User from '../models/User.model.ts';

export async function userSignUpController(req: Request, res: Response) {
  const { firstName, lastName, userName, email, password } = req.body;

  const userExist = await User.exists({ userName, email });

  if (userExist) {
    return res
      .status(400)
      .json({ error: 'That email/username is already taken' });
  }

  const user = new User({ firstName, lastName, userName, email, password });
  await user.save();
  res.json({ success: 'User has been created' });
}

export async function userSignInController(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user)
    return res.status(401).json({ error: 'That user does NOT exist' });

  if (!user.authenticate(password)) {
    return res.status(401).json({ error: 'Username or password is incorrect'});
  }

  res.json({ user });
}
