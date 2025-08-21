'use client'

import React, { useState, useEffect } from 'react'
import { Timeline } from "@/components/ui/timeline";
import HotelCardItem from './HotelCardItem';
import ActivityCardItem from './ActivityCardItem';
import { useTripDetail } from '@/app/Provider';
import { TripInfo } from './ChatBox';
import { div } from 'motion/react-client';
import { ArrowLeft, Images } from 'lucide-react';
import Image from 'next/image';




const TRIP_DATA = {
    
        "destination": "Kyoto",
        "duration": "2 days",
        "origin": "Tokyo",
        "budget": "Luxury: Don't worry about cost",
        "group_size": "1",
        "hotels": [
            {
                "hotel_name": "Ritz-Carlton Kyoto",
                "hotel_address": "Kamogawa Nijo-Ohashi Hotori, Nakagyo-ku, Kyoto 604-0902, Japan",
                "price_per_night": "$800+",
                "hotel_image_url": "https://example.com/ritz_kyoto.jpg",
                "geo_coordinates": {
                    "latitude": 35.0088,
                    "longitude": 135.7656
                },
                "rating": 4.8,
                "description": "Luxury hotel on the banks of the Kamogawa River, offering exceptional service and stunning views."
            },
            {
                "hotel_name": "Suiran, a Luxury Collection Hotel, Kyoto",
                "hotel_address": "12 Sagatenryuji Susukinobaba-cho, Ukyo-ku, Kyoto 616-8385, Japan",
                "price_per_night": "$600+",
                "hotel_image_url": "https://example.com/suiran_kyoto.jpg",
                "geo_coordinates": {
                    "latitude": 35.0167,
                    "longitude": 135.7144
                },
                "rating": 4.7,
                "description": "Secluded luxury hotel in Arashiyama with traditional Japanese gardens and modern amenities."
            },
            {
                "hotel_name": "Hyatt Regency Kyoto",
                "hotel_address": "644-2 Sanjusangendo-mawari, Higashiyama-ku, Kyoto 605-0941, Japan",
                "price_per_night": "$400+",
                "hotel_image_url": "https://example.com/hyatt_kyoto.jpg",
                "geo_coordinates": {
                    "latitude": 34.9842,
                    "longitude": 135.7706
                },
                "rating": 4.5,
                "description": "Elegant hotel near Kyoto National Museum, offering spacious rooms and excellent dining options."
            }
        ],
        "itinerary": [
            {
                "day": 1,
                "day_plan": "Explore Gion district, enjoy a Kaiseki dinner, and experience Kyoto's nightlife.",
                "best_time_to_visit_day": "Afternoon and Evening",
                "activities": [
                    {
                        "place_name": "Gion District",
                        "place_details": "Historic geisha district with traditional wooden machiya houses, teahouses, and exclusive restaurants.",
                        "place_image_url": "https://example.com/gion.jpg",
                        "geo_coordinates": {
                            "latitude": 35.0022,
                            "longitude": 135.7736
                        },
                        "place_address": "Gion, Higashiyama-ku, Kyoto, Japan",
                        "ticket_pricing": "Free to explore; costs vary for teahouses and restaurants.",
                        "time_travel_each_location": "Walking distance",
                        "best_time_to_visit": "Late afternoon/early evening for geisha sightings."
                    },
                    {
                        "place_name": "Gion Kappa (Bar)",
                        "place_details": "A local favorite bar which has an extensive drinks menu and great atmosphere",
                        "place_image_url": "https://example.com/gionkappa.jpg",
                        "geo_coordinates": {
                            "latitude": 35.0022,
                            "longitude": 135.7736
                        },
                        "place_address": "Gion, Higashiyama-ku, Kyoto, Japan",
                        "ticket_pricing": "$30-$50 per person",
                        "time_travel_each_location": "Walking distance",
                        "best_time_to_visit": "Evening"
                    },
                    {
                        "place_name": "Kaiseki Dinner at Kikunoi",
                        "place_details": "Multi-course Japanese haute cuisine experience.",
                        "place_image_url": "https://example.com/kikunoi.jpg",
                        "geo_coordinates": {
                            "latitude": 35.0014,
                            "longitude": 135.7744
                        },
                        "place_address": "459 Shimokawara-cho, Yasakatorii Mae, Higashiyama-ku, Kyoto 605-0079, Japan",
                        "ticket_pricing": "$300+ per person",
                        "time_travel_each_location": "Walking distance from Gion",
                        "best_time_to_visit": "Dinner (reservations essential)"
                    }
                ]
            },
            {
                "day": 2,
                "day_plan": "Visit Nishiki Market for a food tour, explore Kiyomizu-dera Temple, and enjoy dinner and drinks in Pontocho.",
                "best_time_to_visit_day": "Morning and Afternoon",
                "activities": [
                    {
                        "place_name": "Nishiki Market",
                        "place_details": "Lively market with hundreds of food stalls selling local produce, seafood, and Kyoto specialties.",
                        "place_image_url": "https://example.com/nishiki.jpg",
                        "geo_coordinates": {
                            "latitude": 35.0047,
                            "longitude": 135.7603
                        },
                        "place_address": "Nishiki-koji Dori, Nakagyo-ku, Kyoto, Japan",
                        "ticket_pricing": "Free to enter; cost of food varies.",
                        "time_travel_each_location": "Short taxi ride from hotel.",
                        "best_time_to_visit": "Morning for the freshest selections."
                    },
                    {
                        "place_name": "Kiyomizu-dera Temple",
                        "place_details": "Iconic wooden temple with panoramic views of Kyoto.",
                        "place_image_url": "https://example.com/kiyomizu.jpg",
                        "geo_coordinates": {
                            "latitude": 34.9947,
                            "longitude": 135.785
                        },
                        "place_address": "294 Kiyomizu 1-chome, Higashiyama-ku, Kyoto 605-0862, Japan",
                        "ticket_pricing": "400 yen",
                        "time_travel_each_location": "Taxi or bus from Nishiki Market",
                        "best_time_to_visit": "Late afternoon to avoid crowds."
                    },
                    {
                        "place_name": "Pontocho Alley",
                        "place_details": "Atmospheric alley along the Kamogawa River with restaurants and bars.",
                        "place_image_url": "https://example.com/pontocho.jpg",
                        "geo_coordinates": {
                            "latitude": 35.0056,
                            "longitude": 135.7625
                        },
                        "place_address": "Pontocho, Nakagyo-ku, Kyoto, Japan",
                        "ticket_pricing": "Costs vary for restaurants and bars.",
                        "time_travel_each_location": "Taxi from Kiyomizu-dera Temple.",
                        "best_time_to_visit": "Evening for dinner and nightlife."
                    }
                ]
            }
        ]
    }


function Itinerary() {
  const { tripDetailInfo , setTripDetailInfo} = useTripDetail();
  const [tripData, setTripData] = useState<TripInfo | null>(null);

  useEffect(() => {
    if (tripDetailInfo) {
      setTripData(tripDetailInfo);
    }
  }, [tripDetailInfo]);

  const data = tripData ? [
    {
      title: "Recommended Hotels",
      content: (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {tripData.hotels.map((hotel, index) => (
            <HotelCardItem key={index} hotel={hotel} />
          ))}
        </div>
      ),
    },
    ...tripData.itinerary.map((dayData, index) => ({
      title: `Day ${dayData.day}`,
      content: (
        <div>
          <p>Best Time: {dayData.best_time_to_visit_day}</p>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {dayData.activities.map((activity, idx) => (
              <ActivityCardItem key={idx} activity={activity} />
            ))}
          </div>
        </div>
      )
    }))
  ] : [];

  return (
<div className="relative w-full h-[84vh] overflow-auto rounded-3xl">
  {tripData ? (
    <Timeline data={data} tripData={tripData ?? TRIP_DATA} />
  ) : (
    <div className="w-full h-full relative">
        <h2 className="flex items-center gap-2 text-3xl absolute bottom-10 left-5 text-white z-10 font-extrabold tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
          <ArrowLeft className="w-6 h-6 text-gray-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" />
          Getting to know you to build the perfect trip here...
        </h2>

      <Image
        src={'/photoes/demophoto.png'}
        alt="Travel"
        fill
        className="object-cover rounded-3xl"
        priority
      />
    </div>
  )}
</div>


);
}

export default Itinerary
