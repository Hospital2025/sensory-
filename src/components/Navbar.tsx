'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    ['Services', '/services'],
    ['Booking', '/booking'],
    ['Gallery', '/gallery'],
    ['Admin Dashboard', '/admin'],
  ];

  return (
    <nav className="bg-gradient-to-r from-purple-900 via-yellow-900 to-black shadow-md py-4 sticky top-0 z-50 font-playfair">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-3xl font-bold text-green-300 tracking-wide font-playfair"
        >
          SensorySPA
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {links.map(([name, path]) => (
            <Link
              key={name}
              href={path}
              className="text-yellow-400 text-lg font-bold hover:underline hover:underline-offset-4 transition-all font-playfair"
            >
              {name}
            </Link>
          ))}
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
        <div className="md:hidden bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 px-4 pt-2 pb-4 space-y-2 font-playfair">
          {links.map(([name, path]) => (
            <Link
              key={name}
              href={path}
              className="block text-black text-lg font-bold hover:underline hover:underline-offset-4 transition-all font-playfair"
              onClick={() => setIsOpen(false)}
            >
              {name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

