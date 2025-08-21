"use client"

import React, { useEffect, useState } from 'react'
import { Hotel } from './ChatBox'
import { Star, Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'
import axios from 'axios'


type Props ={
    hotel:Hotel
}
function HotelCardItem({hotel}:Props) {
  const [photoUrl , setPhotoUrl] = useState<string>();
  useEffect(()=>{
    hotel&&GetPlaceDetail()

  }, [hotel])
  const GetPlaceDetail= async()=>{
    const result = await axios.post('/api/google-place-detail', {
      placeName:hotel?.hotel_name,
    });
    if(result?.data?.e){
      return ;
    }
    setPhotoUrl(result?.data);
  }

  return (
                <div  className='flex flex-col gap-1'>
                    <img 
                    src={photoUrl?photoUrl:'/demophoto.jfif'} 
                    alt={hotel.hotel_name} 
                    className="w-full h-48 rounded-lg object-cover"
                    />
                    <h2 className='font-semibold text-lg'>{hotel?.hotel_name}</h2>
                    <h2 className='text-gray-500'>{hotel.hotel_address}</h2>
                    <div>

                    <p className='flex gap-2 text-green-600'><Wallet/> {hotel.price_per_night}</p>
                    <p className='text-yellow-500 flex gap-2'><Star/>{hotel.rating}</p>
                    </div>
                    <p className='line-clamp-2 text-gray-500'>{hotel?.description}</p>
                    <a href={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotel_name}`} target='_blank'>
                    <Button variant={'outline'} className='mt-1 w-full'>View</Button>
                    </a>
                </div>
  )
}

export default HotelCardItem