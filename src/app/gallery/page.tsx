'use client'

import { useRef } from 'react'
import { Play, Pause, Square, Volume2 } from 'lucide-react'

const videoGallery = [
  { src: '/shave.mp4', label: 'Number 1 buzz cut with a full, defined beard' },
  { src: '/baby.mp4', label: 'Tapered low fade with hairline art' },
  { src: '/rename.mp4', label: 'Boxed braids with side tapers' },
  { src: '/mani.mp4', label: 'Manicure' },
  { src: '/face.mp4', label: 'Face Routine Therapy' },
  { src: '/videos/barber3.mp4', label: '' },
]

export default function GalleryPage() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const handleControl = (
    index: number,
    action: 'play' | 'pause' | 'stop' | 'volume'
  ) => {
    const video = videoRefs.current[index]
    if (!video) return

    switch (action) {
      case 'play':
        video.play()
        break
      case 'pause':
        video.pause()
        break
      case 'stop':
        video.pause()
        video.currentTime = 0
        break
      case 'volume':
        video.muted = !video.muted
        break
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 py-5 px-4 sm:px-12 font-playfair">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-black mb-12">
          Video Gallery
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {videoGallery.map((vid, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-xl overflow-hidden group transition-transform transform hover:scale-[1.01]"
            >
              <video
                ref={(el) => {
                  videoRefs.current[i] = el
                }}
                src={vid.src}
                className="w-full h-64 object-cover"
                controls={false}
                muted
              />
              <div className="p-4 flex items-center justify-between">
                <p className="text-gray-700 font-semibold">{vid.label}</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleControl(i, 'play')}
                    className="text-green-600 hover:text-green-800"
                    aria-label="Play"
                  >
                    <Play size={20} />
                  </button>
                  <button
                    onClick={() => handleControl(i, 'pause')}
                    className="text-yellow-600 hover:text-yellow-800"
                    aria-label="Pause"
                  >
                    <Pause size={20} />
                  </button>
                  <button
                    onClick={() => handleControl(i, 'stop')}
                    className="text-red-600 hover:text-red-800"
                    aria-label="Stop"
                  >
                    <Square size={20} />
                  </button>
                  <button
                    onClick={() => handleControl(i, 'volume')}
                    className="text-blue-600 hover:text-blue-800"
                    aria-label="Toggle Mute"
                  >
                    <Volume2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

