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
                    const filteredTickets = res.data.filter(ticket => ticket._tour._id === id);
                    setTickets(filteredTickets);
                }
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };
        fetchTickets();
    }, [id]);

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

                        {tickets.length === 0 ? <button onClick={() => handleDeleteTour(tour._id)} className="btn btn-danger">Delete Tour</button> : null}



                    <ul>
                        <h3>Registered:</h3>
                        {tickets.map(ticket => {
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
                        {tickets.length > 0 ? <p>**To delete tour, remove all registered attendees**</p> : <p>There are to regstered attendees for this tour.</p>}
                    </ul>
                </div>}
            
                {tickets.map(ticket => {
          // Check if the ticket's status is 'active'
          if (ticket._user._id === user.id && user.adminStatus === false) {
              return (
                  <div  key={ticket._id}>
                  
                                        Your Ticket Number: {ticket._id}
                                        <button onClick={() => handleDeleteTicket(ticket._id)} className="btn">X</button>
              </div>
            );
          } else {
            // If the ticket's status is not 'active', don't render it
            return null;
          }
        })}

            {user && user.adminStatus === true && <EditTour />}


        </div>
    );
};

export default TourDetail;
