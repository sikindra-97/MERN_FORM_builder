import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import formRoutes from './routes/formRoutes.js';
import responseRoutes from './routes/responseRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.use('/api/forms', formRoutes);
app.use('/api/responses', responseRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log('Server started on', PORT)))
  .catch(err => console.error(err));
