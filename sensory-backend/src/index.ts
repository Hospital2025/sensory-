// src/index.ts
import dotenv from 'dotenv';
dotenv.config();  // This will load environment variables from your .env file
import express from 'express';
import cors from 'cors';
import bookingsRouter from './routes/bookings';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/bookings', bookingsRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
