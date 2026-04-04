'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import { Loader, Send } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import EmptyBoxState from './EmptyBoxState'
import GroupSizeUi from './GroupSizeUi'
import BudgetUi from './BudgetUi'
import DaysSelectUi from './DaysSelectUi'
import FinalUi from './FinalUi'
import { useMutation } from 'convex/react'
import { v4 as uuidv4 } from 'uuid'
import { api } from '@/convex/_generated/api'
import { userUserDetail, useTripDetail } from '@/app/Provider'
import { useSearchParams } from 'next/navigation'

export type Message = {
  role: string
  content: string
  ui?: string
}

export type TripInfo = {
  budget: string
  destination: string
  duration: string
  group_size: string
  origin: string
  hotels: Hotel[]
  itinerary: Itinerary[]
}

export type Hotel = {
  hotel_name: string
  hotel_address: string
  price_per_night: string
  hotel_image_url: string
  geo_coordinates: { latitude: number; longitude: number }
  rating: number
  description: string
}

export type Itinerary = {
  day: number
  day_plan: string
  best_time_to_visit_day: string
  activities: Activity[]
}

export type Activity = {
  place_name: string
  place_details: string
  place_image_url: string
  geo_coordinates: { latitude: number; longitude: number }
  place_address: string
  ticket_pricing: string
  time_travel_each_location: string
  best_time_to_visit: string
}

function ChatBox() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('query') || ''

  const [messages, setMessages] = useState<Message[]>([])
  const [userInput, setUserInput] = useState<string>(initialQuery)
  const [isFinal, setIsFinal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tripDetail, setTripDetail] = useState<TripInfo>()
  
  const SaveTripDetail = useMutation(api.tripDetail.CreateTripDetail)
  const { tripDetailInfo, setTripDetailInfo } = useTripDetail()
  const { userDetail } = userUserDetail()

  // 1. Handles the standard conversational back-and-forth
  const onSend = async () => {
    if (!userInput.trim()) return
    setLoading(true)
    const currentInput = userInput // Capture exact input before clearing
    setUserInput('')

    const newMsg: Message = { role: 'user', content: currentInput }
    const updatedMessages = [...messages, newMsg]
    setMessages(updatedMessages)

    try {
      const result = await axios.post('/api/animodel', {
        messages: updatedMessages,
        isFinal: false, // Standard chat is always false
      })

      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: result?.data?.resp, ui: result?.data?.ui },
      ])
    } catch (error) {
      console.error('Gemini API error:', error)
    } finally {
      setLoading(false)
    }
  }

  // 2. Dedicated function for the final heavy-lifting API call
  const generateFinalTripPlan = async (currentMessages: Message[]) => {
    setLoading(true)
    
    // Visually confirm to the user that generation is starting
    const confirmationMsg: Message = { role: 'user', content: 'Ok, Great! Please generate my trip.' }
    const finalMessages = [...currentMessages, confirmationMsg]
    setMessages(finalMessages)

    try {
      const result = await axios.post('/api/animodel', {
        messages: finalMessages,
        isFinal: true, // Force the heavy JSON prompt
      })

      if (result?.data?.trip_plan) {
        setTripDetail(result.data.trip_plan)
        setTripDetailInfo(result.data.trip_plan)

        // Only attempt to save to Convex if the user is authenticated
        if (userDetail?._id) {
          const tripId = uuidv4()
          await SaveTripDetail({
            tripDetail: result.data.trip_plan,
            tripId,
            uid: userDetail._id,
          })
        }
      }
    } catch (error) {
      console.error('Gemini API error during final generation:', error)
    } finally {
      setLoading(false)
    }
  }

  // 3. Effect watcher triggers the final generation safely
  useEffect(() => {
    const lastMsg = messages[messages.length - 1]
    
    if (lastMsg?.ui === 'final' && !isFinal) {
      setIsFinal(true)
      generateFinalTripPlan(messages)
    }
  }, [messages, isFinal])

  const RenderGenerativeUi = (ui: string) => {
    switch (ui) {
      case 'budget':
        return <BudgetUi onSelectedOption={(v: string) => { setUserInput(v); onSend() }} />
      case 'groupSize':
        return <GroupSizeUi onSelectedOption={(v: string) => { setUserInput(v); onSend() }} />
      case 'numberOfDays':
        return <DaysSelectUi onSelectDays={(v: string) => { setUserInput(v); onSend() }} />
      case 'final':
        return <FinalUi viewTrip={() => console.log('Show itinerary page')} disabled={!tripDetail} />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col h-[70vh] sm:h-[75vh] md:h-[84vh] border shadow-md rounded-2xl p-3 sm:p-4 bg-white/80 backdrop-blur-sm">

      {/* Empty state */}
      {messages.length === 0 && (
        <EmptyBoxState onSelectOption={(v: string) => { setUserInput(v); onSend() }} />
      )}

      {/* Chat messages */}
      <section className="flex-1 overflow-y-auto p-1 sm:p-2 space-y-2 sm:space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`
                max-w-[80%] sm:max-w-lg
                px-3 py-2 sm:px-4 sm:py-3
                rounded-xl
                text-sm sm:text-base
                ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-gray-200 text-black'}
              `}
            >
              {msg.content}
              {msg.role === 'assistant' && RenderGenerativeUi(msg.ui ?? '')}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] sm:max-w-lg px-3 py-2 rounded-xl bg-gray-200 text-black">
              <Loader className="animate-spin h-5 w-5 sm:h-6 sm:w-6" />
            </div>
          </div>
        )}
      </section>

      {/* Input section */}
      <section className="mt-2 sm:mt-3 relative">
        <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 
                        backdrop-blur-md border border-primary/20 rounded-2xl p-3 sm:p-4 shadow-lg transition-all">
          <Textarea
            placeholder="Create a trip from Paris to New York..."
            className="w-full h-20 sm:h-28 md:h-32 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none text-base sm:text-lg font-medium placeholder:text-primary/50"
            onChange={e => setUserInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                onSend()
              }
            }}
            value={userInput}
            disabled={isFinal && loading} // Prevent typing while generating final trip
          />
          <Button
            size="lg"
            className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-5 md:right-5 rounded-full 
                       shadow-lg bg-primary hover:bg-primary/90 text-white p-2 sm:p-3 md:p-4 transition-transform hover:scale-105"
            onClick={onSend}
            disabled={isFinal && loading}
          >
            <Send className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </Button>
        </div>
      </section>
    </div>
  )
}

export default ChatBox
