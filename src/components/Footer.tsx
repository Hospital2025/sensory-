'use client';

import Link from 'next/link';
import {
  Instagram,
  Facebook,
  Twitter,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 text-black pt-12 pb-6 font-playfair">
      {/* Top Links */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-4">About Sensory</h3>
          <p className="text-sm">
            Sensory is your haven for premium grooming and relaxation. From haircuts to spa rituals, we deliver curated experiences in a serene environment.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {[
              ['Home', '/'],
              ['Services', '/services'],
              ['Booking', '/booking'],
              ['Gallery', '/gallery'],
              ['For Admin', '/For Admin'],
            ].map(([label, href]) => (
              <li key={label}>
                <Link href={href} className="hover:underline hover:underline-offset-2">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us */}
        <div className="sm:col-span-2 lg:col-span-1">
          <h3 className="text-xl font-bold mb-4">For Admin</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MapPin size={16} />
              64Plaza opposite Catholic University, Eldoret
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} />
              <Link href="tel:+254712345678" className="hover:underline">
                0722110013
              </Link>
            </li>
            
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-black/20 my-8 mx-6" />

     {/* Social & Copyright */}
<div className="max-w-7xl mx-auto px-6 py-6">
  {/* Social Icons (centered) */}
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
  <div className="text-center text-sm text-black/80 space-y-1">
    <div>
      &copy; {new Date().getFullYear()} Sensory Spa & Barber. All rights reserved.
    </div>
    <div className="text-white font-semibold">
    Developed & Designed by Humphries.
    </div>
  </div>
</div>
    </footer>
  );
}
