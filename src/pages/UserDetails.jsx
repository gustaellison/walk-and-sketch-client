import { useState, useEffect } from 'react'
import Client from '../services/api';


const UserDetails = ({ user }) => {
  const [tickets, setTickets] = useState([])

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

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : ''

    try {
      await Client.delete(`tickets/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // Update the state to reflect the deletion
    } catch (error) {
      console.error('Error deleting tour:', error);
    }
    refreshPage()
  };

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div>
      <h1>Your Tickets</h1>
      <ul>
        {tickets.map(ticket => {
          // Check if the ticket's status is 'active'
          if (ticket._user._id === user.id) {
            return (
              <div className="card row-gap" key={ticket._id}>
                <div className="card border border-secondary row-gap container text-center">
                  <h4 className=''>{ticket._tour.name}</h4>
                  <div className=''>
                    <div className=''>
                      <p className=''>Ticket number: {ticket._id}</p>
                      <p>Date: {ticket._tour.time} on {ticket._tour.date}</p>
                    </div>
                    <div className=''>
                      <p>
                        <a href={`tours/${ticket._tour._id}`}><button className="btn btn-primary">Tour Details</button> </a>
                        </p>
                      <a href=""><button onClick={() => handleDelete(ticket._id)} className="btn btn-danger">Delete</button></a>
                    </div>
                  </div>
                </div>

              </div>
            );
          } else {
            // If the ticket's status is not 'active', don't render it
            return null;
          }
        })}
      </ul>

    </div>
  )
}

export default UserDetails
