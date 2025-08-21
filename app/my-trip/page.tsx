'use client'
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import React, { useEffect, useState } from 'react'
import { userUserDetail } from '../Provider';
import { div } from 'motion/react-client';
import { TripInfo } from '../create-new-trip/_components/ChatBox';
import { ArrowBigRightIcon, Image } from 'lucide-react';
import MyTripCard from './_components/MyTripCard';


export type Trip={
    tripId:any,
    tripDetail:TripInfo,
    _id:string

}

function MyTrips() {
    const [myTrips , setMyTrip] = useState<Trip[]>([]);
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
        console.log(result);
        setMyTrip(result || []); // ✅ FIX: update state properly
    };

    return (
        <div className='px-10 p-10 md:px-24 lg:px-48'>
            <h2 className='font-bold text-3xl'>My Trips</h2>

            {myTrips.length === 0 && (
                <div className='p-7 border rounded-2xl flex flex-col items-center justify-center gap-5 mt-6'>
                    <h2>You don't have any trip plan created</h2>
                    <a href={'/create-new-trip'}>
                      <Button>Create Trip Plan</Button>
                    </a>
                </div>
            )}

            <div className='grid grid-cols-2 lg:grid-cols-3 gap-5 mt-6'>
                {myTrips?.map((trip , index)=>(
                    <MyTripCard trip={trip} key={index}/>
                ))}
            </div>

            
        </div>
    )
}

export default MyTrips
