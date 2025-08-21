'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ArrowDown, Globe2, Send , Plane, Hotel, Umbrella } from 'lucide-react'
import HeroVideoDialog from '@/components/magicui/hero-video-dialog'
import { TextAnimate } from '@/components/magicui/text-animate'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export const suggestions = [
  { 
    title: 'Plan New Trip', 
    icon: <Globe2 className="text-blue-500 h-5 w-5" /> 
  },
  { 
    title: 'Find Cheap Flights', 
    icon: <Plane className="text-green-500 h-5 w-5" /> 
  },
  { 
    title: 'Discover Hotels', 
    icon: <Hotel className="text-purple-500 h-5 w-5" /> 
  },
  { 
    title: 'Weekend Getaways', 
    icon: <Umbrella className="text-orange-500 h-5 w-5" /> 
  },
];

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
    // Redirect to ChatBox page with pre-filled query
    router.push(`/create-new-trip?query=${encodeURIComponent(heroInput)}`)
  }

  return (
    <section className="mt-20 w-full flex justify-center px-4">
      <div className="max-w-4xl w-full text-center space-y-8">
        <h1 className="text-3xl md:text-6xl font-extrabold leading-tight">
          Hey, I'm your personal{' '}
          <span className="text-primary">
            <TextAnimate animation="blurInUp" by="character" once>
              AI Trip Planner
            </TextAnimate>
          </span>
        </h1>
        
        <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
          <TextAnimate animation="blurInUp" by="character" once>
            Tell me what you want, and I'll handle the rest: Flights, Hotels, Trip
            Planning — all in seconds.
          </TextAnimate>
        </p>

        {/* Input box */}
        <div className="relative bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 backdrop-blur-lg 
          border border-primary/40 rounded-3xl p-6 shadow-xl hover:shadow-2xl 
          transition-all duration-300 transform hover:scale-[1.02]">

          <Textarea
            placeholder="Create a trip from Paris to New York..."
            className="w-full h-32 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none 
            text-lg font-medium placeholder:text-primary/60"
            value={heroInput}
            onChange={(e) => setHeroInput(e.target.value)}
            onKeyDown={(e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }}
          />

          <Button
            size="lg"
            className="absolute bottom-6 right-6 rounded-full shadow-lg bg-primary hover:bg-primary/90 
            text-white px-6 py-6 transition-transform hover:scale-110"
            onClick={onSend}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>

        {/* Suggestions */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {suggestions.map((s, index) => (
        <div
          key={index}
          onClick={() => setHeroInput(s.title)}   // 👈 fills the input box
          className="flex items-center gap-2 border border-white/20 rounded-full px-4 py-2 cursor-pointer 
          hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
        >
          {s.icon}
          <span className="text-sm font-medium">{s.title}</span>
        </div>

          ))}
        </div>

        {/* How it works */}
        <h2 className="my-7 mt-14 flex gap-2 items-center justify-center text-lg">
          Not sure where to start?{' '}
          <strong className="flex items-center gap-1 text-primary">
            See How it Works <ArrowDown />
          </strong>
        </h2>

        {/* Video section */}
        <HeroVideoDialog
          className="block dark:hidden mx-auto"
          animationStyle="from-center"
          videoSrc="https://www.example.com/dummy-video"
          thumbnailSrc="https://mma.prnewswire.com/media/2401528/1_MindtripProduct.jpg?p=facebook"
          thumbnailAlt="Dummy Video Thumbnail"
        />
      </div>
    </section>
  )
}

export default Hero
