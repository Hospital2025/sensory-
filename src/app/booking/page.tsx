'use client';

import { Calendar, Clock, User, Phone, Tag } from 'lucide-react';
import { useState } from 'react';

export default function BookingPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    time: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const services = [
    'Haircut & Styling',
    'Full Spa Treatment',
    'Manicure',
    'Pedicure',
    'Facial Scrub',
    'Deep Tissue Massage',
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        alert('✅ Booking confirmed!');
        setForm({ name: '', phone: '', service: '', date: '', time: '' });
      } else {
        alert('❌ Error: ' + (result.error || 'Unknown error'));
      }
    } catch (err) {
      console.error(err);
      alert('❌ Network error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="font-playfair px-6 py-12 sm:px-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-green-300">
          Book Your Experience
        </h1>
        <p className="text-lg sm:text-xl text-yellow-300">
          Select your service, pick a time, and we’ll handle the rest.
        </p>
      </div>

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-6"
      >
        {/* Name */}
        <div className="flex items-center gap-3 border-b border-gray-200 pb-2">
          <User size={20} className="text-gray-500" />
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Your Name"
            className="w-full outline-none py-2 text-gray-800 placeholder-gray-400"
          />
        </div>

        {/* Phone Number */}
        <div className="flex items-center gap-3 border-b border-gray-200 pb-2">
          <Phone size={20} className="text-gray-500" />
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="Your Phone Number"
            pattern="[0-9+()\- ]{7,20}"
            className="w-full outline-none py-2 text-gray-800 placeholder-gray-400"
          />
        </div>

        {/* Service */}
        <div className="flex items-center gap-3 border-b border-gray-200 pb-2">
          <Tag size={20} className="text-gray-500" />
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            required
            className="w-full outline-none py-2 text-gray-800"
          >
            <option value="" disabled>
              Select a Service
            </option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex items-center gap-3 border-b border-gray-200 pb-2">
            <Calendar size={20} className="text-gray-500" />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full outline-none py-2 text-gray-800"
            />
          </div>
          <div className="flex items-center gap-3 border-b border-gray-200 pb-2">
            <Clock size={20} className="text-gray-500" />
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
              className="w-full outline-none py-2 text-gray-800"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className={`w-full px-4 py-3 rounded-full font-medium transition ${
            submitting
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
              : 'bg-brown-800 hover:bg-yellow-300 text-black'
          }`}
        >
          {submitting ? 'Submitting…' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
}
