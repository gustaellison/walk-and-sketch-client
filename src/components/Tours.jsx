/* eslint-disable react/jsx-key */
import React from 'react'


const Tours = ({ tours }) => {
  return (
    <div>
      <h1>Tours</h1>
      <div className="tours">
      {tours.map(tour => (
        <>
        <div className="card">
        <h3>{tour.name}</h3>
        <h5>{tour.description}</h5>
        <h5>{tour.distance} Miles</h5>
        <h5>{tour.duration.hours} Hours {tour.duration.minutes} Minutes</h5>
        </div>
        </>
      ))}
    </div>
    </div>
  )
}

export default Tours
