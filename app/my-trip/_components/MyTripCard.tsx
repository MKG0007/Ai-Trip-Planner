import React, { useEffect, useState } from 'react'
import { Trip } from '../page'
import { ArrowBigRightIcon } from 'lucide-react'
import axios from 'axios'

type Props = {
  trip: Trip
}

function MyTripCard({ trip }: Props) {
  const [photoUrl, setPhotoUrl] = useState<string>()

  useEffect(() => {
    trip && GetPlaceDetail()
  }, [trip])

  const GetPlaceDetail = async () => {
    const result = await axios.post('/api/google-place-detail', {
      placeName: trip?.tripDetail?.destination,
    })
    if (result?.data?.e) return
    setPhotoUrl(result?.data)
  }

  return (
    <a
      href={`/view-trips/${trip?.tripId}`}
      className="block group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white"
    >
      {/* Image */}
      <div className="relative w-full h-56 sm:h-64 md:h-72 overflow-hidden">
        <img
          src={photoUrl || '/demophoto.jfif'}
          alt={trip.tripId}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="flex items-center gap-2 font-semibold text-lg sm:text-xl text-gray-800">
          {trip?.tripDetail?.origin}
          <ArrowBigRightIcon className="w-5 h-5 text-primary" />
          {trip?.tripDetail?.destination}
        </h2>

        <p className="mt-2 text-sm sm:text-base text-gray-500">
          {trip?.tripDetail?.duration} Trip with {trip?.tripDetail?.budget}
        </p>
      </div>
    </a>
  )
}

export default MyTripCard
