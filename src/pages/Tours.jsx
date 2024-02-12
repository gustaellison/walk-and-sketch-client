/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Client from '../services/api';
import AddTour from '../components/AddTour';


const Tours = ({ tours, user, setUpdatedTours }) => {



  const [formData, setFormData] = useState({
    name: '',
    duration: {
      hours: 0,
      minutes: 0
    },
    type: '',
    date: '',
    time: '',
    image: '',
    trailName: '',
    distance: '',
    description: '',
    medium: '',
    capacity: ''
  });



  const handleDelete = async (id) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : ''

    try {
      await Client.delete(`tours/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // Update the state to reflect the deletion
      setUpdatedTours(prev => prev + 1);
    } catch (error) {
      console.error('Error deleting tour:', error);
    }
  };

  return (
<div className="row">
        {tours.map((tour) => (
      <div className="col-sm-6 mb-2 mb-sm-0">
          <div className="card" key={tour._id}>
              <img src={tour.image} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{tour.name}</h5>
              <p className="card-text"><strong>Difficulty:</strong> {tour.type} <strong>Distance: </strong>{tour.distance} miles</p>
              <p><strong>Date:</strong> {new Date(tour.date).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })} <strong>Time: </strong>{tour.time}</p>
              <p></p>
              <p>Medium: {tour.medium}</p>
              <p></p>
              <Link to={`/tours/${tour._id}`} className="btn btn-primary">Details</Link>
              {user && user.adminStatus === true && <button onClick={() => handleDelete(tour._id)} className="btn btn-danger">Delete</button>}
              
            </div>
          </div>
      </div>
        ))}

      {user && user.adminStatus === true && <AddTour setUpdatedTours={setUpdatedTours} />}
    </div>
  );
};
export default Tours
