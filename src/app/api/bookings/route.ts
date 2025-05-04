// src/app/api/bookings/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  const bookings = await prisma.booking.findMany({ orderBy: { date: 'asc' } });
  return NextResponse.json(bookings);
}

export async function POST(req: Request) {
  const { name, phone, service, date, time } = await req.json();
  const booking = await prisma.booking.create({
    data: { name, phone, service, date: new Date(date), time },
  });
  return NextResponse.json({ success: true, booking });
}
