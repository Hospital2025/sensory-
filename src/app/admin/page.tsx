'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Lock, Calendar, Clock, ListChecks, Users } from 'lucide-react';

// 💾 Define your Booking type including seenByAdmin
type Booking = {
  id: number;
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: string;
  seenByAdmin: boolean;
};

const ADMIN_PIN = '2020';
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '';

export default function AdminPage() {
  const [pin, setPin] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);

  // PIN handlers
  const handlePinChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPin(e.target.value.replace(/\D/g, '').slice(0, 4));
  };
  const handlePinSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) setAuthorized(true);
    else alert('❌ Invalid PIN');
  };

  // When authorized, mark unseen as seen, then fetch all
  useEffect(() => {
    if (!authorized) return;

    (async () => {
      try {
        // 1) fetch unseen
        const unseenRes = await fetch(`${API_BASE}/api/bookings/unseen`);
        if (unseenRes.ok) {
          const unseen: Booking[] = await unseenRes.json();
          // 2) mark each as seen
          await Promise.all(
            unseen.map(b =>
              fetch(`${API_BASE}/api/bookings/${b.id}/mark-seen`, { method: 'PATCH' })
            )
          );
        }
        // 3) fetch all bookings
        const allRes = await fetch(`${API_BASE}/api/bookings`);
        if (allRes.ok) {
          setBookings(await allRes.json());
        }
      } catch (err) {
        console.error('Admin fetch error:', err);
      }
    })();
  }, [authorized]);

  // Statistics
  const total = bookings.length;
  const today = new Date().toISOString().slice(0, 10);
  const todayCount = bookings.filter(b => b.date.slice(0, 10) === today).length;
  const pending = bookings.filter(b => b.status === 'pending').length;
  const confirmed = bookings.filter(b => b.status === 'confirmed').length;

  // PIN screen
  if (!authorized) {
    return (
      <div className="min-h-screen bg-black bg-[url('/admin-bg.jpg')] bg-cover bg-center flex items-center justify-center">
        <div className="bg-black/70 backdrop-blur-md rounded-2xl p-8 w-full max-w-sm text-center font-playfair shadow-lg">
          <Lock size={48} className="mx-auto text-yellow-300 mb-4" />
          <h1 className="text-2xl font-semibold mb-6 text-green-400">Admin Access</h1>
          <form onSubmit={handlePinSubmit} className="space-y-4">
            <input
              type="password"
              value={pin}
              onChange={handlePinChange}
              placeholder="Enter 4-digit PIN"
              maxLength={4}
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

  // Dashboard
  return (
    <div className="min-h-screen bg-black font-playfair">
      <header className="bg-brown-800 text-green-300 py-6 px-4 sm:px-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => {
            setAuthorized(false);
            setBookings([]);
            setPin('');
          }}
          className="text-sm underline"
        >
          Logout
        </button>
      </header>

      <div className="px-4 sm:px-8 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { title: 'Total Bookings', value: total },
          { title: "Today's Appts", value: todayCount },
          { title: 'Pending', value: pending },
          { title: 'Confirmed', value: confirmed },
        ].map(card => (
          <div key={card.title} className="bg-black rounded-2xl shadow p-4">
            <p className="text-sm text-white">{card.title}</p>
            <p className="text-lg sm:text-xl font-semibold text-white">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="px-4 sm:px-8 pb-12 hidden sm:block">
        <div className="overflow-x-auto bg-black shadow rounded-lg">
          <table className="min-w-full">
            <thead className="bg-black">
              <tr>
                {['ID','Service','Phone','Date','Time','Status'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-sm text-white">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id} className="border-b border-gray-700">
                  <td className="px-4 py-3 text-sm text-white">{b.id}</td>
                  <td className="px-4 py-3 text-sm text-white">{b.service}</td>
                  <td className="px-4 py-3 text-sm text-white">{b.phone}</td>
                  <td className="px-4 py-3 text-sm text-white">{new Date(b.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-sm text-white">{b.time}</td>
                  <td className="px-4 py-3 text-sm text-white">{b.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}



