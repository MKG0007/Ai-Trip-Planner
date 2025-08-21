'use client'

import React, { Suspense, useState } from 'react'
import ChatBox from './_components/ChatBox'
import Itinerary from './_components/Itinerary'
import GlobalMap from './_components/GlobalMap'
import { Button } from '@/components/ui/button'
import { Globe2, Plane } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

function CreateNewTrip() {
  const [activeIndex, setActiveIndex] = useState(1)

  return (
    <div className="pt-16 md:pt-20 px-4 md:px-10 grid grid-cols-1 md:grid-cols-5 gap-5">

      {/* Chat Box */}
      <div className="col-span-2">
        <Suspense fallback={<div>Loading chat...</div>}>
          <ChatBox />
        </Suspense>
      </div>

      {/* Map / Itinerary */}
      <div className="col-span-3 relative">
        {activeIndex === 0 ? <Itinerary /> : <GlobalMap />}

        {/* Floating Switch Button */}
        <Tooltip>
          <TooltipTrigger
            className="
              absolute
              bottom-5
              right-4
              sm:bottom-6 sm:right-6
              md:bottom-10 md:right-10
              rounded-full
              z-50
            "
          >
            <Button
              className="bg-black p-3"
              onClick={() => setActiveIndex(activeIndex === 0 ? 1 : 0)}
            >
              {activeIndex === 0 ? <Plane /> : <Globe2 />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Switch Between Map and Trip</p>
          </TooltipContent>
        </Tooltip>
      </div>

    </div>
  )
}

export default CreateNewTrip
