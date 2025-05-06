// src/index.ts
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import bookingsRouter from './routes/bookings';

const app = express();

// 🌐 Whitelist your Netlify front‑end
const ALLOWED_ORIGIN = 'https://sensoryspa1.netlify.app';

const corsOptions = {
  origin: ALLOWED_ORIGIN,
  methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
};

// 1️⃣ Global CORS middleware
app.use(cors(corsOptions));

// 2️⃣ Global pre‑flight handler (for PATCH, etc)
app.options('*', cors(corsOptions));

app.use(express.json());

// mount all booking routes under /api/bookings
app.use('/api/bookings', bookingsRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
