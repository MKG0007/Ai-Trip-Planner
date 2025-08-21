'use client'

import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import React, { useEffect, useState } from 'react'
import { userUserDetail } from '../Provider';
import { TripInfo } from '../create-new-trip/_components/ChatBox';
import MyTripCard from './_components/MyTripCard';

export type Trip = {
  tripId: any,
  tripDetail: TripInfo,
  _id: string
}

function MyTrips() {
  const [myTrips, setMyTrip] = useState<Trip[]>([]);
  const { userDetail } = userUserDetail();
  const convex = useConvex();

  useEffect(() => {
    if (userDetail?._id) {
      GetUserTrip();
    }
  }, [userDetail]);

  const GetUserTrip = async () => {
    const result = await convex.query(api.tripDetail.GetUserTrips, {
      uid: userDetail._id,
    });
    setMyTrip(result || []);
  };

  return (
    <div className='px-4 sm:px-6 md:px-10 lg:px-24 py-6'>
      {/* Heading */}
      <h2 className='font-bold text-2xl sm:text-3xl md:text-4xl'>My Trips</h2>

      {/* No Trips State */}
      {myTrips.length === 0 && (
        <div className='p-6 sm:p-8 border rounded-2xl flex flex-col items-center justify-center gap-4 mt-6'>
          <h2 className='text-base sm:text-lg'>You don't have any trip plan created</h2>
          <a href={'/create-new-trip'}>
            <Button size='lg'>Create Trip Plan</Button>
          </a>
        </div>
      )}

      {/* Trips Grid */}
      {myTrips.length > 0 && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6'>
          {myTrips.map((trip, index) => (
            <MyTripCard trip={trip} key={index} />
          ))}
        </div>
      )}
    </div>
  )
}

export default MyTrips
