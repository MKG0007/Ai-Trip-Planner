'use client'
import React, { useState } from 'react'
import ChatBox from './_components/ChatBox'
import Itinerary from './_components/Itinerary'
import GlobalMap from './_components/GlobalMap';
import { Button } from '@/components/ui/button';
import { Globe2, Plane } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function CreateNewTrip() {
  const [activeIndex , setActiveIndex] = useState(1);
  return (
    <div className='grid grid-cols-1 md:grid-cols-5 gap-5 p-10  border'>
        <div className='col-span-2'>
            <ChatBox/>
        </div>
        <div className='col-span-3'>
            {activeIndex == 0 ?<Itinerary/>:<GlobalMap/>}
            <Tooltip>
            <TooltipTrigger className='absolute bg-black bottom-10 left-[69%] rounded-2xl'>
            <Button className='bg-black'
            onClick={()=>{
              setActiveIndex(activeIndex == 0? 1 : 0)
            }}>{activeIndex==0? <Plane/> : <Globe2/>} </Button>


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