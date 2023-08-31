import fs from 'node:fs';
import https from 'node:https';
import dotenv from 'dotenv';
import express from 'express';
import cors from './middlewares/cors.js';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import tokenRoutes from './routes/token.routes.js';
import postRoutes from './routes/post.routes.js';
import { sslCertificates as SSL } from './config.js';

dotenv.config({ path: '../.env' });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('tiny'));

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log('[mongodb]: connection successful');
  })
  .catch((err) => console.log(`[mongodb]: connection failed! ${err.message}`));

app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/token', tokenRoutes);
app.use('/post', postRoutes);

const options = {
  cert: fs.readFileSync(SSL.publicKey),
  key: fs.readFileSync(SSL.privateKey),
};

const httpsServer = https.createServer(options, app);
const PORT = process.env.PORT || 3000;

httpsServer.listen(PORT, () => {
  console.log(`[express]: listening on ${PORT}`);
});
