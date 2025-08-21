'use client'

import React, { useEffect, useRef, useState } from 'react'
import mapboxgl, { Map } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useTripDetail } from '@/app/Provider'
import { Activity, Itinerary } from './ChatBox'

function GlobalMap() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<Map | null>(null) // ✅ keep map instance here
  const { tripDetailInfo } = useTripDetail()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!mapContainerRef.current) return

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY as string

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.5, 40],
      zoom: 1.7,
      projection: 'globe',
    })

    const markers: mapboxgl.Marker[] = []

    if (tripDetailInfo) {
      tripDetailInfo.itinerary.forEach((itinerary: Itinerary, itineraryIdx) => {
        itinerary.activities.forEach((activity: Activity, activityIdx) => {
          const coordinate: [number, number] = [
            activity.geo_coordinates.longitude,
            activity.geo_coordinates.latitude,
          ]

          const newMarker = new mapboxgl.Marker({ color: 'green' })
            .setLngLat(coordinate)
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setText(activity.place_name)
            )
            .addTo(mapRef.current!)

          markers.push(newMarker)

          // ✅ Only flyTo the FIRST activity (optional, otherwise map jumps repeatedly)
          if (itineraryIdx === 0 && activityIdx === 0) {
            mapRef.current!.flyTo({
              center: coordinate,
              zoom: 7,
              essential: true,
            })
          }
        })
      })
    }

    mapRef.current.on('load', () => setIsLoading(false))

    return () => {
      markers.forEach((m) => m.remove()) // cleanup markers
      mapRef.current?.remove()
    }
  }, [tripDetailInfo])

  return (
    <div className="w-full h-[83vh]">
      {isLoading && (
        <div className="w-full h-full rounded-2xl bg-gray-100 animate-pulse" />
      )}
      <div
        ref={mapContainerRef}
        className="w-full h-full rounded-2xl shadow-md"
      />
    </div>
  )
}

export default GlobalMap
