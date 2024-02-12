import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Client from '../services/api';

const TourDetail = ({user}) => {
    const { id } = useParams();
    const [tour, setTour] = useState({});
    const [tickets, setTickets] = useState([]);
    const [ticketCreated, setTicketCreated] = useState(false);

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

    const fetchTicketsForTour = async (tourId) => {
    };


    const bookTicket = async () => {
        try {
            // Get current user ID from wherever you store it in your application
            // const userId = user._id // Replace with actual logic to get current user ID

            const res = await Client.post('/tickets', {
                _tour: id,
                _user: user.id
            });
            setTicketCreated(true);
        } catch (error) {
            console.error('Error booking ticket:', error);
        }
    };

    return (
        <div>
            <h1>Tour Details</h1>
            <div className="tour-details">
                <h3>Name: {tour.name}</h3>
                <p>{tour.description}</p>
                <p>{tour._id}</p>
                <p>Date: {tour.date}</p>
                <p>Time: {tour.time}</p>
            </div>
            <button onClick={bookTicket}>Book Now</button>
            {ticketCreated && <p>Ticket created successfully!</p>}
            <Link to="/tours">Back to Tours</Link>

            <div>
                <h3>Registered:</h3>
                {tickets.map(ticket => (
                        <li key={ticket._id}>
                            Ticket ID: {ticket._id}, Users: {ticket._users.join(', ')}
                        </li>
                ))}
            </div>
        </div>
    );
};

export default TourDetail;
