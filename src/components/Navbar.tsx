// src/app/components/Navbar.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, Bell } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [unseenCount, setUnseenCount] = useState(0);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '';

  useEffect(() => {
    const fetchUnseen = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/bookings/unseen`);
        if (res.ok) {
          const data = await res.json();
          setUnseenCount(data.length);
        }
      } catch (err) {
        console.error('Error fetching unseen bookings:', err);
      }
    };

    fetchUnseen();
  }, [API_BASE]);

  const links: [string, string][] = [
    ['Services', '/services'],
    ['Booking', '/booking'],
    ['Gallery', '/gallery'],
    ['Admin Dashboard', '/admin'],
  ];

  return (
    <nav className="bg-gradient-to-r from-purple-900 via-yellow-900 to-black shadow-md py-1 sticky top-0 z-50 font-playfair">
      <div className="max-w-7xl mx-auto px-2 flex justify-between items-center">
        <Link href="/" className="block">
          <Image
            src="/sensory.jpg"
            alt="Sensory Spa Logo"
            width={120}
            height={50}
            className="rounded-sm"
            priority
          />
        </Link>

        {/* Desktop Menu */}
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
                  <Bell className="ml-1 text-red-500 animate-pulse" size={18} />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-yellow-300 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
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
                  <Bell className="ml-1 text-white animate-pulse" size={18} />
                )}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}

