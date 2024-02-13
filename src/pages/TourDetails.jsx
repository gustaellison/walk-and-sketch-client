import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Client from '../services/api';
import EditTour from '../components/EditTour';

const TourDetail = ({ user }) => {
    const { id } = useParams();
    const [tour, setTour] = useState({});
    const [ticketCreated, setTicketCreated] = useState(false);
    const [tickets, setTickets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const res = await Client.get(`/tickets`);
                if (res.data && res.data.length > 0) {
                    const filteredTickets = res.data.filter(ticket => ticket._tour.id !== null);
                    setTickets(filteredTickets);
                }
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };
        fetchTickets();
    }, []);

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
        refreshPage();
    };

    const handleDeleteTour = async (id) => {

        try {
            await Client.delete(`tours/${id}`,);
            // Update the state to reflect the deletion
        } catch (error) {
            console.error('Error deleting tour:', error);
        }
        navigate('/tours');
    };

    const handleDeleteTicket = async (id) => {

        try {
            await Client.delete(`tickets/${id}`);
            // Update the state to reflect the deletion
        } catch (error) {
            console.error('Error deleting tour:', error);
        }
        refreshPage();
    };

    function refreshPage() {
        window.location.reload(false);
    }


    return (
        <div>
            <div className='d-flex p-2'>
                <Link to="/tours"><button className="btn">&#8592; Back to Tours</button> </Link>

            </div>
            <h1>Tour Details</h1>
            <div className="tour-details">
                <h3>{tour.name}</h3>
                <img height="200px" src={tour.image} alt="" />
                <p>{tour.description}</p>
                <p>{tour._id}</p>
                <p><strong>Date: </strong>{new Date(tour.date).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })} <strong>Time: </strong>{tour.time}</p>
            </div>
            <button className="btn btn-primary" onClick={bookTicket}>Book Now</button>
            {ticketCreated && <p>Ticket created successfully!</p>}
            {user && user.adminStatus === true &&
                <div>
                    <button onClick={() => handleDeleteTour(tour._id)} className="btn btn-danger">Delete Tour</button>
                        <p>Note: Before deleting tour, first remove all tickets.</p>

                    <h3>Registered:</h3>
                    <ul>
                        {tickets.map(ticket => {
                            // Check if the ticket's status is 'active'
                            if (tour._id === ticket._tour._id) {
                                return (
                                    <div key={ticket._id}>
                                        Ticket Holder: {ticket._user.name}
                                        <button onClick={() => handleDeleteTicket(ticket._id)} className="btn">X</button>
                                    </div>
                                );
                            } else {
                                return null
                            }
                        })}
                    </ul>
                </div>}


            {user && user.adminStatus === true && <EditTour />}


        </div>
    );
};

export default TourDetail;
