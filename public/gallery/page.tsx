'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

const galleryImages = [
  { src: '/gallery/barber1.jpg', alt: 'Precision haircut in progress' },
  { src: '/gallery/spa1.jpg',    alt: 'Relaxing spa treatment scene' },
  { src: '/gallery/barber2.jpg', alt: 'Classic shave and trim' },
  { src: '/gallery/spa2.jpg',    alt: 'Aromatherapy stones and candles' },
  { src: '/gallery/barber3.jpg', alt: 'Barber tools on wooden tray' },
  { src: '/gallery/spa3.jpg',    alt: 'Facial scrub application' },
  { src: '/gallery/barber4.jpg', alt: 'Sharp fade haircut' },
  { src: '/gallery/spa4.jpg',    alt: 'Foot massage with hot stones' },
];

export default function GalleryPage() {
  const [selected, setSelected] = useState<{ src: string; alt: string } | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 font-playfair">
      {/* Page Header */}
      <header className="text-center py-12 px-6">
        <h1 className="text-5xl font-bold text-gray-800 mb-2">Our Gallery</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Explore moments of craftsmanship and calm — click any image to enlarge.
        </p>
      </header>

      {/* Masonry Grid */}
      <section className="px-4 sm:px-8 lg:px-16">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="relative group cursor-pointer break-inside-avoid"
              onClick={() => setSelected(img)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={800}
                className="w-full mb-4 rounded-xl object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-end">
                <p className="text-white p-4 text-sm">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelected(null)}
        >
          <button className="absolute top-4 right-4 text-white">
            <X size={32} />
          </button>
          <div className="relative max-w-3xl w-full">
            <Image
              src={selected.src}
              alt={selected.alt}
              width={1200}
              height={1600}
              className="w-full rounded-xl"
            />
            <p className="mt-2 text-center text-white">{selected.alt}</p>
          </div>
        </div>
      )}
    </div>
  );
}
