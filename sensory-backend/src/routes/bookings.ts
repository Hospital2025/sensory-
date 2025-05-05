import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({ orderBy: { date: 'asc' } });
    res.json(bookings);
  } catch (error) {
    console.error('❌ Error fetching bookings:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch bookings' });
  }
});

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
      },
    });
    res.json({ success: true, booking });
  } catch (error) {
    console.error('❌ Error creating booking:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

export default router;
