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
import { v4 as uuidv4 } from 'uuid';
import { api } from '@/convex/_generated/api'
import { userUserDetail, useTripDetail } from '@/app/Provider'
import { useSearchParams } from 'next/navigation'

type Message = {
  role: string,
  content: string,
  ui?: string,
}

export type TripInfo = {
  budget: string,
  destination: string,
  duration: string,
  group_size: string,
  origin: string,
  hotels: Hotel[],
  itinerary: Itinerary[]
}

export type Hotel = {
  hotel_name: string;
  hotel_address: string;
  price_per_night: string;
  hotel_image_url: string;
  geo_coordinates: {
    latitude: number;
    longitude: number;
  };
  rating: number;
  description: string;
};

export type Itinerary = {
  day: number;
  day_plan: string;
  best_time_to_visit_day: string;
  activities: Activity[];
};

export type Activity = {
  place_name: string;
  place_details: string;
  place_image_url: string;
  geo_coordinates: {
    latitude: number;
    longitude: number;
  };
  place_address: string;
  ticket_pricing: string;
  time_travel_each_location: string;
  best_time_to_visit: string;
};

function ChatBox() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("query") || ""

  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>(initialQuery);
  const [isFinal, setIsFinal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tripDetail, setTripDetail] = useState<TripInfo>();
  const SaveTripDetail = useMutation(api.tripDetail.CreateTripDetail);
  const { tripDetailInfo, setTripDetailInfo } = useTripDetail();
  const { userDetail } = userUserDetail();

  const onSend = async () => {
    if (!userInput.trim()) return;
    setLoading(true);
    setUserInput('');

    const newMsg: Message = {
      role: 'user',
      content: userInput,
    };
    setMessages((prev) => [...prev, newMsg]);

    try {
      const result = await axios.post('/api/animodel', {
        messages: [...messages, newMsg],
        isFinal,
      });

      if (!isFinal) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: result?.data?.resp,
            ui: result?.data?.ui,
          },
        ]);
      }

      if (isFinal) {
        setTripDetail(result?.data?.trip_plan);
        setTripDetailInfo(result?.data?.trip_plan);

        const tripId = uuidv4();
        await SaveTripDetail({
          tripDetail: result?.data?.trip_plan,
          tripId,
          uid: userDetail?._id,
        });
      }
    } catch (error) {
      console.error("Gemini API error:", error);
    }

    setLoading(false);
  };

  const RenderGenerativeUi = (ui: string) => {
    if (ui === 'budget') {
      return <BudgetUi onSelectedOption={(v: string) => { setUserInput(v); onSend(); }} />
    } else if (ui === 'groupSize') {
      return <GroupSizeUi onSelectedOption={(v: string) => { setUserInput(v); onSend(); }} />
    } else if (ui === 'numberOfDays') {
      return <DaysSelectUi onSelectDays={(v: string) => { setUserInput(v); onSend(); }} />
    } else if (ui === 'final') {
      return <FinalUi
        viewTrip={() => console.log("Show itinerary page")}
        disabled={!tripDetail}
      />
    }
    return null;
  };

  useEffect(() => {
    const LastMsg = messages[messages.length - 1];
    if (LastMsg?.ui === 'final') {
      setIsFinal(true);
      setUserInput('Ok, Great!');
    }
  }, [messages]);

  useEffect(() => {
    if (isFinal && userInput) {
      onSend();
    }
  }, [isFinal]);

  return (
    <div className="h-[84vh] flex flex-col border shadow-md rounded-2xl 
      p-4 bg-white/80 backdrop-blur-sm">

      {/* Empty state */}
      {messages.length === 0 && (
        <EmptyBoxState onSelectOption={(v: string) => { setUserInput(v); onSend(); }} />
      )}

      {/* Chat messages */}
      <section className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-3">
        {messages.map((msg: Message, index) => (
          msg.role === 'user' ? (
            <div key={index} className="flex justify-end">
              <div className="max-w-[85%] sm:max-w-lg bg-primary text-white px-4 py-2 rounded-xl text-sm sm:text-base">
                {msg.content}
              </div>
            </div>
          ) : (
            <div key={index} className="flex justify-start">
              <div className="max-w-[85%] sm:max-w-lg bg-gray-200 text-black px-4 py-2 rounded-xl text-sm sm:text-base">
                {msg.content}
                {RenderGenerativeUi(msg.ui ?? '')}
              </div>
            </div>
          )
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[85%] sm:max-w-lg bg-gray-200 text-black px-4 py-2 rounded-xl">
              <Loader className='animate-spin' />
            </div>
          </div>
        )}
      </section>

      {/* Input section */}
      <section className="mt-3">
        <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 
          backdrop-blur-md border border-primary/20 rounded-2xl p-4 sm:p-6 shadow-lg  
          transition-all duration-300">
          <Textarea
            placeholder="Create a trip from Paris to New York..."
            className="w-full h-24 sm:h-32 bg-transparent border-none focus-visible:ring-0 
            shadow-none resize-none text-base sm:text-lg font-medium 
            placeholder:text-primary/50"
            onChange={(event) => setUserInput(event.target.value)}
            onKeyDown={(e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }}
            value={userInput}
          />
          <Button
            size="lg"
            className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 rounded-full 
            shadow-lg bg-primary hover:bg-primary/90 text-white p-3 sm:p-4 
            transition-transform hover:scale-105"
            onClick={onSend}
          >
            <Send className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
        </div>
      </section>
    </div>
  )
}

export default ChatBox
