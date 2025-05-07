import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="font-playfair">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-100 via-rose-50 to-white text-center py-20 px-6 sm:px-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-black">
          Welcome to Sensory Spa & Barber
        </h1>
        <p className="text-lg sm:text-xl text-black mb-8 max-w-2xl mx-auto">
          Rejuvenate your body. Redefine your style. Book a luxury grooming or spa experience tailored for you.
        </p>
        <Link
          href="/booking"
          className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-full text-lg font-medium shadow hover:scale-105 transition"
        >
          Book Now
        </Link>
      </section>

{/* Video Section */}
<section className="bg-gradient-to-br from-stone-400 via-pink-200 to-stone-400 py-5 px-4 sm:px-12">
  <div className="max-w-2xl mx-auto">
    <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8">
      Discover the Sensory Experience
    </h2>
    <div className="aspect-video rounded-lg overflow-hidden shadow-2xl ring-2 ring-green-300">
      <video
        className="w-full h-full object-cover"
        src="/adv.mp4"
        controls
        playsInline
      />
    </div>
  </div>
</section>




      {/* Services Overview */}
      <section className="py-16 px-6 sm:px-12 bg-stone-200">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
          Our Signature Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { title: 'Haircut & Grooming', img: '/cut.jpg' },
            { title: 'Spa Treatments', img: '/spa.jpg' },
            { title: 'Pedicure & Manicure', img: '/nail.jpg' },
            { title: 'Facials', img: '/face.jpg' },

          ].map((service) => (
            <div
              key={service.title}
              className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
            >
              <Image
                src={service.img}
                alt={service.title}
                width={600}
                height={400}
                className="object-cover w-full h-56 sm:h-64"
              />
              <div className="p-6 bg-white">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">
                  Experience luxury with our professional, personalized services.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery/Experience */}
      <section className="bg-gray-100 py-16 px-6 sm:px-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
          Our Space & Experience
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {['/gallery1.jpg', '/gallery2.jpg', '/gallery3.jpg'].map((img, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow">
              <Image
                src={img}
                alt={`Gallery ${index + 1}`}
                width={600}
                height={400}
                className="object-cover w-full h-56 sm:h-64"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
