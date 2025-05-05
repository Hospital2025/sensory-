'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Lock, Calendar, Clock, ListChecks, Users } from 'lucide-react';

// ✅ Define the Booking type manually
type Booking = {
  id: number;
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: string;
};

const ADMIN_PIN = '2020';
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '';

export default function AdminPage() {
  const [pin, setPin] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    setPin(val);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) setAuthorized(true);
    else alert('❌ Invalid PIN');
  };

  useEffect(() => {
    if (!authorized) return;
    fetch(`${API_BASE}/api/bookings`)
      .then((res) => res.json())
      .then((data: Booking[]) => setBookings(data))
      .catch(console.error);
  }, [authorized]);

  const total = bookings.length;
  const todayString = new Date().toISOString().slice(0, 10);
  const todaysCount = bookings.filter((b) => {
    const iso = new Date(b.date).toISOString().slice(0, 10);
    return iso === todayString;
  }).length;
  const pending = bookings.filter((b) => b.status === 'pending').length;
  const completed = bookings.filter((b) => b.status === 'confirmed').length;

  if (!authorized) {
    return (
      <div className="min-h-screen bg-[url('/admin-bg.jpg')] bg-cover bg-center flex items-center justify-center">
        <div className="bg-black/70 backdrop-blur-md rounded-2xl p-8 w-full max-w-sm text-center font-playfair shadow-lg">
          <Lock size={48} className="mx-auto text-yellow-300 mb-4" />
          <h1 className="text-2xl font-semibold mb-6 text-green-400">Admin Access</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              inputMode="numeric"
              pattern="\d*"
              value={pin}
              onChange={handleChange}
              placeholder="Enter 4-digit PIN"
              className="w-full text-center text-xl tracking-widest py-2 border-b-2 border-gray-100 focus:border-brown-800 outline-none bg-transparent text-white"
            />
            <button
              type="submit"
              disabled={pin.length < 4}
              className="w-full bg-brown-800 text-white py-2 rounded-full font-semibold disabled:opacity-50 transition"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black font-playfair">
      <header className="bg-brown-800 text-green-300 py-6 px-4 sm:px-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <Users size={24} />
          <button onClick={() => setAuthorized(false)} className="text-sm underline">
            Logout
          </button>
        </div>
      </header>

      <div className="px-4 sm:px-8 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { title: 'Total Bookings', icon: <ListChecks size={24} />, value: total },
          { title: "Today's Appts", icon: <Calendar size={24} />, value: todaysCount },
          { title: 'Pending', icon: <Clock size={24} />, value: pending },
          { title: 'Completed', icon: <Users size={24} />, value: completed },
        ].map(({ title, icon, value }) => (
          <div
            key={title}
            className="bg-black rounded-2xl shadow p-4 flex items-center space-x-3 sm:space-x-4"
          >
            <div className="p-2 sm:p-3 bg-brown-800 text-white rounded-lg">{icon}</div>
            <div>
              <p className="text-sm text-white">{title}</p>
              <p className="text-lg sm:text-xl font-semibold">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 sm:px-8 pb-12 hidden sm:block">
        <div className="overflow-x-auto bg-black shadow rounded-lg">
          <table className="min-w-full">
            <thead className="bg-black">
              <tr>
                {['Booking ID','Service','Client Phone','Date','Time','Status'].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-sm font-medium text-white"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-black">
                    No bookings yet.
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b.id} className="border-b">
                    <td className="px-4 py-3 text-sm">{b.id}</td>
                    <td className="px-4 py-3 text-sm">{b.service}</td>
                    <td className="px-4 py-3 text-sm">{b.phone}</td>
                    <td className="px-4 py-3 text-sm">
                      {new Date(b.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm">{b.time}</td>
                    <td className="px-4 py-3 text-sm">{b.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="px-4 sm:hidden pb-12 space-y-4">
        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-4 text-center text-black">
            No bookings yet.
          </div>
        ) : (
          bookings.map((b) => (
            <div key={b.id} className="bg-black rounded-lg shadow p-4 space-y-2 text-white">
              <p><span className="font-semibold">ID:</span> {b.id}</p>
              <p><span className="font-semibold">Service:</span> {b.service}</p>
              <p><span className="font-semibold">Phone:</span> {b.phone}</p>
              <p><span className="font-semibold">Date:</span> {new Date(b.date).toLocaleDateString()}</p>
              <p><span className="font-semibold">Time:</span> {b.time}</p>
              <p><span className="font-semibold">Status:</span> {b.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}



