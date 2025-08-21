'use client'

import GlobalMap from '@/app/create-new-trip/_components/GlobalMap';
import Itinerary from '@/app/create-new-trip/_components/Itinerary';
import { Trip } from '@/app/my-trip/page';
import { userUserDetail, useTripDetail } from '@/app/Provider';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function ViewTrip() {
    const {tripid} = useParams();
    const {userDetail} = userUserDetail();
    const convex = useConvex();
    const [tripData , setTripData] = useState<Trip>();
    const { setTripDetailInfo } = useTripDetail();

    useEffect(()=>{
        userDetail && GetTrip();
    } , [userDetail]);

    const GetTrip = async()=>{
        const result = await convex.query(api.tripDetail.GetTripById , {
            uid: userDetail?._id,
            tripid: tripid+''
        })
        console.log(result);
        setTripData(result);
        setTripDetailInfo(result?.tripDetail);
    }

    return (
        <div className="pt-[64px] flex flex-col md:flex-row min-h-screen gap-2 px-2 sm:px-4 md:px-6 lg:px-10">
            
            {/* Timeline / Itinerary */}
            <div className="w-full md:w-3/5 overflow-y-auto h-[calc(100vh-64px)] p-2">
                <Itinerary />
            </div>

            {/* Map */}
            <div className="w-full md:w-2/5 h-[300px] sm:h-[400px] md:h-[calc(100vh-64px)] p-2">
                <GlobalMap />
            </div>
            
        </div>
    )
}

export default ViewTrip
