'use client'

import React, { useEffect, useState } from 'react'
import { Activity } from './ChatBox'
import { Clock, ExternalLinkIcon, Ticket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import axios from 'axios'

type Props={
    activity:Activity
}

 
function ActivityCardItem({activity}: Props) {
   const [photoUrl , setPhotoUrl] = useState<string>();
  useEffect(()=>{
    activity&&GetPlaceDetail()

  }, [activity])
  const GetPlaceDetail= async()=>{
    const result = await axios.post('/api/google-place-detail', {
      placeName:activity?.place_name+":"+activity?.place_address
    });
    if(result?.data?.e){
      return ;
    }
    setPhotoUrl(result?.data);
  }
  return (
                    <div>
                    <img 
                    src={photoUrl?photoUrl : "/demophoto.jfif"} 
                    alt={activity.place_name} 
                    className=" w-full h-48 rounded-xl object-cover"
                    />  
                    <h2 className='font-semibold text-lg'>{activity?.place_name}</h2> 
                    <p className='text-gray-500 line-clamp-2'>{activity?.place_details}</p>
                    <h2 className='flex gap-2 text-blue-500 line-clamp-1'><Ticket/> {activity?.ticket_pricing}</h2>
                    <p className='flex text-orange-500 gap-2 line-clamp-1'> <Clock/>{activity?.best_time_to_visit}</p>
                    <a href={`https://www.google.com/maps/search/?api=1&query=${activity?.place_name}`} target='_blank'>
                    <Button size={'sm'} variant={'outline'} className='w-full mt-2'>View <ExternalLinkIcon/></Button>
                    </a>
                    </div>
  )
}

export default ActivityCardItem