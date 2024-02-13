import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Client from '../services/api';
import EditTour from '../components/EditTour';

const TourDetail = ({user}) => {
    const { id } = useParams();
    const [tour, setTour] = useState({});
    const [ticketCreated, setTicketCreated] = useState(false);
    const [tickets, setTickets] = useState([])


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

    const bookTicket = async () => {
        try {
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
                <h3>{tour.name}</h3>
                <img src={tour.image} alt="" />
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
            <EditTour />
        </div>
    );
};

export default TourDetail;
