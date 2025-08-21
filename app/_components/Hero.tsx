'use client'

import React, { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { ArrowDown, Globe2, Send, Plane, Hotel, Umbrella } from 'lucide-react'
import HeroVideoDialog from '@/components/magicui/hero-video-dialog'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export const suggestions = [
  { title: 'Plan New Trip', icon: <Globe2 className="text-blue-500 h-5 w-5" /> },
  { title: 'Find Cheap Flights', icon: <Plane className="text-green-500 h-5 w-5" /> },
  { title: 'Discover Hotels', icon: <Hotel className="text-purple-500 h-5 w-5" /> },
  { title: 'Weekend Getaways', icon: <Umbrella className="text-orange-500 h-5 w-5" /> },
]

function Hero() {
  const { user } = useUser()
  const router = useRouter()
  const [heroInput, setHeroInput] = useState('')

  const onSend = () => {
    if (!heroInput.trim()) return
    if (!user) {
      router.push('/sign-in')
      return
    }
    router.push(`/create-new-trip?query=${encodeURIComponent(heroInput)}`)
  }

  return (
    <section className="mt-20 w-full flex justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full text-center space-y-8">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
          Hey, I'm your personal{' '}
          <span className="text-primary">AI Trip Planner</span>
        </h1>

        {/* Subtext */}
        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
          Tell me what you want, and I'll handle the rest: Flights, Hotels, Trip
          Planning — all in seconds.
        </p>

        {/* Input box */}
        <div
          className="relative bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 
          backdrop-blur-lg border border-primary/40 rounded-3xl p-4 sm:p-6 
          shadow-xl hover:shadow-2xl transition-all duration-300 
          transform hover:scale-[1.01] sm:hover:scale-[1.02]"
        >
          <Textarea
            placeholder="Create a trip from Paris to New York..."
            className="w-full h-28 sm:h-32 bg-transparent border-none focus-visible:ring-0 shadow-none 
            resize-none text-base sm:text-lg font-medium placeholder:text-primary/60"
            value={heroInput}
            onChange={(e) => setHeroInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                onSend()
              }
            }}
          />

          <button
            className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 
            rounded-full shadow-lg bg-primary hover:bg-primary/90 
            text-white p-4 sm:p-5 transition-transform hover:scale-110"
            onClick={onSend}
          >
            <Send className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        {/* Suggestions */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-6">
          {suggestions.map((s, index) => (
            <div
              key={index}
              onClick={() => setHeroInput(s.title)}
              className="flex items-center gap-2 border border-white/20 rounded-full 
              px-3 sm:px-4 py-1.5 sm:py-2 cursor-pointer 
              hover:bg-primary hover:text-white transition-all duration-300 
              shadow-sm hover:shadow-md text-sm sm:text-base"
            >
              {s.icon}
              <span className="font-medium">{s.title}</span>
            </div>
          ))}
        </div>

        {/* How it works */}
        <h2 className="my-7 mt-14 flex flex-wrap gap-2 items-center justify-center text-base sm:text-lg">
          Not sure where to start?{' '}
          <strong className="flex items-center gap-1 text-primary">
            See How it Works <ArrowDown />
          </strong>
        </h2>

        {/* Video section */}
        <div className="w-full flex justify-center">
          <HeroVideoDialog
            className="block dark:hidden mx-auto max-w-full rounded-lg overflow-hidden"
            animationStyle="from-center"
            videoSrc="https://www.example.com/dummy-video"
            thumbnailSrc="https://mma.prnewswire.com/media/2401528/1_MindtripProduct.jpg?p=facebook"
            thumbnailAlt="Dummy Video Thumbnail"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
