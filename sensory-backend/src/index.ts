// src/index.ts
import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import bookingsRouter from './routes/bookings';

const app = express();

// ————————————————————————————————————————————————
// Custom CORS + preflight middleware
// ————————————————————————————————————————————————
function corsMiddleware(req: Request, res: Response, next: NextFunction): void {
  // Allow only your Netlify frontend
  res.setHeader('Access-Control-Allow-Origin', 'https://sensoryspa1.netlify.app');
  // Allow GET, POST, PATCH, OPTIONS
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  // Allow JSON content-type header
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Short‑circuit preflight
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;   // <-- void return, not `return res.sendStatus(...)`
  }

  next();
}

// Apply CORS to all requests
app.use(corsMiddleware);

// Parse JSON bodies
app.use(express.json());

// Mount bookings router
app.use('/api/bookings', bookingsRouter);

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
