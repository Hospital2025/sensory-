//src/app/api/bookings/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Replace with your actual Netlify domain
const ALLOWED_ORIGIN = 'https://sensoryspa1.netlify.app';

export async function GET() {
  const bookings = await prisma.booking.findMany({ orderBy: { date: 'asc' } });

  return NextResponse.json(bookings, {
    headers: {
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(req: Request) {
  const { name, phone, service, date, time } = await req.json();

  const booking = await prisma.booking.create({
    data: { name, phone, service, date: new Date(date), time },
  });

  return NextResponse.json({ success: true, booking }, {
    headers: {
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

// Handle preflight requests (important!)
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
} 