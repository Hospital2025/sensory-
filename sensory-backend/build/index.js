"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const bookings_1 = __importDefault(require("./routes/bookings"));
const app = (0, express_1.default)();
// ————————————————————————————————————————————————
// Manual CORS + OPTIONS handler
// ————————————————————————————————————————————————
app.use((req, res, next) => {
    // allow your Netlify frontend
    res.header('Access-Control-Allow-Origin', 'https://sensoryspa1.netlify.app');
    // allow GET/POST/PATCH/OPTIONS
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    // short‑circuit preflight
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});
// parse JSON bodies
app.use(express_1.default.json());
// mount your bookings API
app.use('/api/bookings', bookings_1.default);
// start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
