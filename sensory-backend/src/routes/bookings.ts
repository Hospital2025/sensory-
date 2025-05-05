import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

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
// Create a new booking
router.post('/', async (req, res) => {
  const { name, phone, service, date, time } = req.body;

  try {
    const now = new Date();
    const booking = await prisma.booking.create({
      data: {
        name,
        phone,
        service,
        date: new Date(date),
        time,
        seenByAdmin: false, // Default value for seenByAdmin
      },
    });
    res.json({ success: true, booking });
  } catch (error) {
    console.error('❌ Error creating booking:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// GET /api/bookings/unseen
// Fetch all unseen bookings (seenByAdmin: false)
router.get('/unseen', async (req, res) => {
  try {
    const unseenBookings = await prisma.booking.findMany({
      where: {
        seenByAdmin: false,
      },
    });
    res.json(unseenBookings);
  } catch (err) {
    console.error('Error fetching unseen bookings:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PATCH /api/bookings/:id/mark-seen
// Mark a booking as seen by the admin
router.patch('/:id/mark-seen', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedBooking = await prisma.booking.update({
      where: { id: parseInt(id) },
      data: { seenByAdmin: true },
    });
    res.json(updatedBooking);
  } catch (err) {
    console.error('Error marking booking as seen:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;

