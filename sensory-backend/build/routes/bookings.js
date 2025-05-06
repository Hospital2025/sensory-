"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// sensory‑backend/src/routes/bookings.ts
const express_1 = require("express");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// GET /api/bookings
// Fetch all bookings, ordered by date
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield prisma.booking.findMany({
            orderBy: { date: 'asc' },
        });
        res.json(bookings);
    }
    catch (error) {
        console.error('❌ Error fetching bookings:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch bookings' });
    }
}));
// POST /api/bookings
// Create a new booking (default seenByAdmin: false)
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone, service, date, time } = req.body;
    try {
        const booking = yield prisma.booking.create({
            data: {
                name,
                phone,
                service,
                date: new Date(date),
                time,
                seenByAdmin: false,
            },
        });
        res.json({ success: true, booking });
    }
    catch (error) {
        console.error('❌ Error creating booking:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}));
// GET /api/bookings/unseen
// Fetch all bookings where seenByAdmin is still false
router.get('/unseen', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const unseen = yield prisma.booking.findMany({
            where: { seenByAdmin: false },
            orderBy: { date: 'asc' },
        });
        res.json(unseen);
    }
    catch (error) {
        console.error('❌ Error fetching unseen bookings:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}));
// PATCH /api/bookings/:id/mark-seen
// Mark a single booking’s seenByAdmin → true
router.patch('/:id/mark-seen', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const updated = yield prisma.booking.update({
            where: { id },
            data: { seenByAdmin: true },
        });
        res.json({ success: true, booking: updated });
    }
    catch (error) {
        console.error('❌ Error marking booking as seen:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}));
exports.default = router;
