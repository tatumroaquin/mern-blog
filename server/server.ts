import dotenv from 'dotenv';
import express from 'express';
import cors from './middleware/cors.ts';
import mongoose from 'mongoose';
import morgan from 'morgan';

import userRoutes from './routes/user.routes.ts';
import authRoutes from './routes/auth.routes.ts';

dotenv.config({ path: '../.env' });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('tiny'));

mongoose.connect(process.env.MONGODB_URI!).then(() => {
  console.log('[mongodb]: connection successful');
}).catch((err) => console.log(`[mongodb]: connection failed! ${err.message}`));

app.use(userRoutes);
app.use(authRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log('[express]: listening on port 8000');
});
