'use client';

import Link from 'next/link';
import {
  Instagram,
  Facebook,
  Twitter,
  MapPin,
  Phone,
  Users,
  Star,
  Calendar,
  ShieldCheck,
  Tag,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 text-black pt-12 pb-6 font-playfair">
      {/* ─── Stats Section ─────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mb-12 text-center">
        {/* Customers Served */}
        <div className="flex flex-col items-center">
          <Users size={36} className="mb-2" />
          <p className="text-2xl font-bold">600+</p>
          <p className="text-sm">Customers Served</p>
        </div>

        {/* Satisfaction Rate */}
        <div className="flex flex-col items-center">
          <div className="flex space-x-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={20} className="text-yellow-300" />
            ))}
          </div>
          <p className="text-2xl font-bold">100%</p>
          <p className="text-sm">Satisfaction Rate</p>
        </div>

        {/* Years in Service */}
        <div className="flex flex-col items-center">
          <Calendar size={36} className="mb-2" />
          <p className="text-2xl font-bold">3+</p>
          <p className="text-sm">Years in Service</p>
        </div>

        {/* Quality Assured */}
        <div className="flex flex-col items-center">
          <ShieldCheck size={36} className="mb-2" />
          <p className="text-2xl font-bold">Top Quality</p>
          <p className="text-sm">Service Assured</p>
        </div>

        {/* Price‑Friendly */}
        <div className="flex flex-col items-center">
          <Tag size={36} className="mb-2" />
          <p className="text-2xl font-bold">Affordable</p>
          <p className="text-sm">Latest Products</p>
        </div>
      </div>

      {/* ─── Top Links ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-black">About Sensory</h3>
          <p className="text-sm text-black">
            Sensory is your haven for premium grooming and relaxation. From haircuts to spa rituals, we deliver curated experiences in a serene environment.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-black">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {[
              ['Home', '/'],
              ['Services', '/services'],
              ['Booking', '/booking'],
              ['Gallery', '/gallery'],
              ['For Admin', '/for-admin'],
            ].map(([label, href]) => (
              <li key={label}>
                <Link href={href} className="hover:underline hover:underline-offset-2">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Location & Contact */}
        <div className="sm:col-span-2 lg:col-span-1">
          <h3 className="text-xl font-bold mb-4 text-black">Location & Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MapPin size={16} />
              64 Plaza, opposite Catholic University, Eldoret
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} />
              <Link href="tel:+254722110013" className="hover:underline">
                0722 110 013
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* ─── Divider ──────────────────────────────────── */}
      <div className="border-t border-white/20 my-8 mx-6" />

      {/* ─── Social & Copyright ───────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Social Icons */}
        <div className="flex justify-center gap-6 mb-4">
          <Link href="https://instagram.com" aria-label="Instagram">
            <Instagram size={20} className="hover:opacity-80 transition" />
          </Link>
          <Link href="https://facebook.com" aria-label="Facebook">
            <Facebook size={20} className="hover:opacity-80 transition" />
          </Link>
          <Link href="https://twitter.com" aria-label="Twitter">
            <Twitter size={20} className="hover:opacity-80 transition" />
          </Link>
        </div>

        {/* Copyright & Developer Credit */}
        <div className="text-center text-sm space-y-1">
          <div className="text-black">
            &copy; {new Date().getFullYear()} Sensory Spa & Barber. All rights reserved.
          </div>
          <div className="text-white font-bold">
            Developed & Designed by Humphries.
          </div>
        </div>
      </div>
    </footer>
  );
}
