import express from 'express';
import cors from './middleware/cors.ts';
import userRoutes from './routes/user.routes.ts';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT);
