/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';

import { MAPBOX_APIKEY } from '../lib/utils/env';
import { FOCUS_ZOOM, INITIAL_CENTER, INITIAL_ZOOM } from '../constants/map';

export function useMap() {
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement | null>(null)

  const [isMapLoaded, setMapLoaded] = useState(false)

  const [center, setCenter] = useState(INITIAL_CENTER)
  const [zoom, setZoom] = useState(INITIAL_ZOOM)

  const flyTo = (latLng: [number, number]) => {
    mapRef.current?.flyTo({
      center: latLng,
      zoom: FOCUS_ZOOM
    })
  }

  const resetMapPosition = () => {
    mapRef.current?.flyTo({
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM
    })
  }

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = MAPBOX_APIKEY

    const map = (mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: center,
      zoom: zoom
    }));

    map.addControl(new mapboxgl.NavigationControl())

    map.on('load', () => {
      setMapLoaded(true)
    })

 
    mapRef.current.on('move', () => {
      const mapCenter = mapRef.current?.getCenter()
      const mapZoom = mapRef.current?.getZoom()

      if (mapCenter) {
        setCenter([mapCenter.lng, mapCenter.lat])
      }

      if (typeof mapZoom === 'number') {
        setZoom(mapZoom)
      }
    })

    return () => {
      mapRef.current?.remove()
    }
  }, [])

  return {
    resetMapPosition,
    mapContainerRef,
    isMapLoaded,
    mapRefCurrent: mapRef.current,
    flyTo
  }
}
