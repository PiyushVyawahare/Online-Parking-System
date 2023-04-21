import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Parking() {
  const location = useLocation();
  return (
    <>
    <div>Hello</div>
    <div>{location?.state.parkingId}</div>
    </>
  )
}
