"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bookings_1 = __importDefault(require("./routes/bookings"));
const app = (0, express_1.default)();
// 🌐 Whitelist your Netlify front‑end
const ALLOWED_ORIGIN = 'https://sensoryspa1.netlify.app';
const corsOptions = {
    origin: ALLOWED_ORIGIN,
    methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
};
// 1️⃣ Global CORS middleware
app.use((0, cors_1.default)(corsOptions));
// 2️⃣ Global pre‑flight handler (for PATCH, etc)
app.options('*', (0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
// mount all booking routes under /api/bookings
app.use('/api/bookings', bookings_1.default);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
