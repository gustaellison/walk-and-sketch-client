/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React from 'react'
import { Link } from 'react-router-dom'


const Tours = ({ tours, user }) => {
  return (
    <div>
      <h1>Tours</h1>
      <div className="tours">
        {tours.map(tour => (
          <Link to={`/tours/${tour._id}`} key={tour._id}>
          <div className="card" key={tour.id}> {/* Added key for each tour */}
            <h3>{tour.name}</h3>
            <h5>{tour.description}</h5>
            <h5>{tour.distance} Miles</h5>
            <h5>{tour.duration.hours} Hours {tour.duration.minutes} Minutes</h5>
          </div>
          </Link>
        ))}
      </div>
      {user && user.adminStatus == true && <Link to="/add-tour">Add a Tour</Link>} {/* Show "Add a Tour" link if user is logged in */}
    </div>
  );
};

export default Tours
