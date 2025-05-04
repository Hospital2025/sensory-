'use client';

import { ChevronDown, Scissors, Sun, Hand, Footprints, Droplet, Activity } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    title: 'Haircut & Styling',
    Icon: Scissors,
    description: 'Precision cuts, fades, and custom styles to keep you looking sharp.',
    price: 'from Ksh 350',
    img: '/services/haircut.jpg',
  },
  {
    title: 'Full Spa Treatment',
    Icon: Sun,
    description: 'A complete relaxation package: massage, steam, and aromatherapy.',
    price: 'from Ksh 2,000',
    img: '/services/spa.jpg',
  },
  {
    title: 'Manicure',
    Icon: Hand,
    description: 'Groomed nails, cuticle care, and polish for that perfect finish.',
    price: 'from Ksh 800',
    img: '/services/manicure.jpg',
  },
  {
    title: 'Pedicure',
    Icon: Footprints,
    description: 'Foot soak, exfoliation, nail shaping and polish—step out in style.',
    price: 'from Ksh 1,000',
    img: '/services/pedicure.jpg',
  },
  {
    title: 'Facial Scrub',
    Icon: Droplet,
    description: 'Deep cleansing exfoliation for smooth, glowing skin.',
    price: 'from Ksh 400',
    img: '/services/facial.jpg',
  },
  {
    title: 'Deep Tissue Massage',
    Icon: Activity,
    description: 'Release muscle tension and improve circulation with expert massage.',
    price: 'from Ksh 2,000',
    img: '/services/massage.jpg',
  },
];

export default function ServicesPage() {
  return (
    <div className="font-playfair">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-700 via-yellow-200 to-stone-600 text-black py-10 px-6 text-center">
  <div className="max-w-3xl mx-auto">
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight font-playfair">
      Discover Treatments Crafted for You
    </h1>
    <p className="text-lg sm:text-xl text-black font-light">
      From detailed grooming to total body rejuvenation — choose the experience that fits your style, mood, and schedule.
    </p>
  </div>
</section>


      {/* Services Grid */}
      <section id="services" className="py-16 px-6 sm:px-12 bg-gray-50">
        <h2 className="sr-only">Our Signature Services</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(({ title, Icon, description, price, img }) => (
            <div
              key={title}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={img}
                  alt={title}
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL="/placeholder.jpg"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Icon size={24} className="text-purple-600" />
                  <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{description}</p>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl font-bold text-gray-900">{price}</span>
                  <Link
                    href="/booking"
                    className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-700 transition"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
