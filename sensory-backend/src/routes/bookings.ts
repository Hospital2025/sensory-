// sensory‑backend/src/routes/bookings.ts
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /api/bookings
// Fetch all bookings, ordered by date
router.get('/', async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { date: 'asc' },
    });
    res.json(bookings);
  } catch (error) {
    console.error('❌ Error fetching bookings:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch bookings' });
  }
});

// POST /api/bookings
// Create a new booking (default seenByAdmin: false)
router.post('/', async (req, res) => {
  const { name, phone, service, date, time } = req.body;

  try {
    const booking = await prisma.booking.create({
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
  } catch (error) {
    console.error('❌ Error creating booking:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// GET /api/bookings/unseen
// Fetch all bookings where seenByAdmin is still false
router.get('/unseen', async (req, res) => {
  try {
    const unseen = await prisma.booking.findMany({
      where: { seenByAdmin: false },
      orderBy: { date: 'asc' },
    });
    res.json(unseen);
  } catch (error) {
    console.error('❌ Error fetching unseen bookings:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// PATCH /api/bookings/:id/mark-seen
// Mark a single booking’s seenByAdmin → true
router.patch('/:id/mark-seen', async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    const updated = await prisma.booking.update({
      where: { id },
      data: { seenByAdmin: true },
    });
    res.json({ success: true, booking: updated });
  } catch (error) {
    console.error('❌ Error marking booking as seen:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

export default router;

