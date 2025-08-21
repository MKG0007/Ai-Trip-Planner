'use client'

import { Compass, Globe2, Sparkles, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-primary/5 to-white">
      {/* Hero Section */}
      <section className="relative py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary">
          About <span className="text-gray-400">WayQuest</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          WayQuest is your AI-powered trip planner, designed to make travel smarter, easier, 
          and more personalized than ever before.
        </p>
      </section>

      {/* Mission Section */}
      <section className="max-w-5xl mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-bold text-primary">Our Mission</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          We believe travel should be stress-free and inspiring. That’s why WayQuest uses 
          the power of AI to craft unique itineraries, suggest hidden gems, and adapt to your 
          preferences — so you can focus on the joy of the journey.
        </p>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8 text-center">
        <div className="p-6 rounded-2xl shadow-lg bg-white/90 backdrop-blur border border-primary/10">
          <Globe2 className="mx-auto h-10 w-10 text-primary mb-4" />
          <h3 className="font-semibold text-lg">Global Exploration</h3>
          <p className="text-muted-foreground mt-2">
            Discover destinations worldwide, from iconic landmarks to hidden local treasures.
          </p>
        </div>
        <div className="p-6 rounded-2xl shadow-lg bg-white/90 backdrop-blur border border-primary/10">
          <Sparkles className="mx-auto h-10 w-10 text-primary mb-4" />
          <h3 className="font-semibold text-lg">AI-Powered Planning</h3>
          <p className="text-muted-foreground mt-2">
            Get personalized itineraries tailored to your budget, interests, and style of travel.
          </p>
        </div>
        <div className="p-6 rounded-2xl shadow-lg bg-white/90 backdrop-blur border border-primary/10">
          <Users className="mx-auto h-10 w-10 text-primary mb-4" />
          <h3 className="font-semibold text-lg">Made for Travelers</h3>
          <p className="text-muted-foreground mt-2">
            Whether you’re a solo explorer, a couple, or a group, WayQuest adapts to your needs.
          </p>
        </div>
      </section>

      {/* Vision / Future Section */}
      <section className="bg-primary/5 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Compass className="h-12 w-12 mx-auto text-primary mb-4" />
          <h2 className="text-2xl font-bold">The Future of Travel</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            WayQuest isn’t just a planner — it’s your intelligent travel companion. 
            With AI that learns from your choices, every journey becomes more personalized, 
            efficient, and inspiring. We’re building the future of travel planning, 
            one adventure at a time.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary">
          Ready to Plan Your Next Adventure?
        </h2>
        <p className="mt-2 text-muted-foreground">
          Let WayQuest craft the perfect itinerary for your journey.
        </p>
        <Link href="/plan">
          <Button size="lg" className="mt-6 px-8 py-6 text-lg rounded-xl">
            Start Planning
          </Button>
        </Link>
      </section>
    </div>
  )
}
