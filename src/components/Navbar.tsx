// src/app/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Bell } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [unseenCount, setUnseenCount] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '';

  // Determine if admin is logged in (persisted via localStorage)
  useEffect(() => {
    setIsAdmin(localStorage.getItem('isAdmin') === 'true');
  }, []);

  // Fetch unseen bookings only when not admin
  useEffect(() => {
    if (!isAdmin) {
      fetch(`${API_BASE}/api/bookings/unseen`)
        .then(res => res.ok ? res.json() : [])
        .then((data: any[]) => setUnseenCount(data.length))
        .catch(console.error);
    } else {
      setUnseenCount(0);
    }
  }, [API_BASE, isAdmin]);

  const links: [string, string][] = [
    ['Services', '/services'],
    ['Booking', '/booking'],
    ['Gallery', '/gallery'],
    ['Admin Dashboard', '/admin'],
  ];

  return (
    <nav className="bg-gradient-to-r from-purple-900 via-yellow-900 to-black shadow-md py-4 sticky top-0 z-50 font-playfair">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-green-300 tracking-wide">
          SensorySPA
        </Link>

        <div className="hidden md:flex space-x-6 items-center">
          {links.map(([name, path]) => {
            const isAdminLink = name === 'Admin Dashboard';
            return (
              <Link
                key={name}
                href={path}
                className="flex items-center text-yellow-400 text-lg font-bold hover:underline hover:underline-offset-4 transition-all"
              >
                {name}
                {isAdminLink && unseenCount > 0 && (
                  <Bell className="ml-1 text-red-400 animate-pulse" size={18} />
                )}
              </Link>
            );
          })}
        </div>

        <button
          className="md:hidden text-yellow-300 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 px-4 pt-2 pb-4 space-y-2">
          {links.map(([name, path]) => {
            const isAdminLink = name === 'Admin Dashboard';
            return (
              <Link
                key={name}
                href={path}
                className="flex items-center text-black text-lg font-bold hover:underline hover:underline-offset-4 transition-all"
                onClick={() => setIsOpen(false)}
              >
                {name}
                {isAdminLink && unseenCount > 0 && (
                  <Bell className="ml-1 text-red-400 animate-pulse" size={18} />
                )}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
