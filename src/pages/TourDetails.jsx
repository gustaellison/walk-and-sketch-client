import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Client from '../services/api'


const TourDetail = ({ tours }) => {
    const { id } = useParams();
    const [tour, setTour] = useState({});

    useEffect(() => {
      const fetchTour = async () => {
          try {
              const res = await Client.get(`/tours/${id}`);
              setTour(res.data);
          } catch (error) {
              console.error('Error fetching tour:', error);
          }
      };

      fetchTour();
  }, [id]);

    return (
        <div>
            <h1>Tour Details</h1>
                <div className="tour-details">
                    <h3>Name: {tour.name}</h3>
                    <p>{tour.description}</p>
                </div>
            <Link to="/tours">Back to Tours</Link>
        </div>
    );
};

export default TourDetail;

