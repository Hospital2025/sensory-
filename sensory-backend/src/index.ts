import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import bookingsRouter from './routes/bookings';

const app = express();

// ✅ Allow only your frontend domain
app.use(cors({
  origin: 'https://sensoryspa1.netlify.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());
app.use('/api/bookings', bookingsRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
