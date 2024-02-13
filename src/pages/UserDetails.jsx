import { useState, useEffect } from 'react'
import Client from '../services/api';


const UserDetails = ({user}) => {
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


  return (
    <div>
      <h1>Your Tickets</h1>
      <ul>
        {tickets.map(ticket => {
          // Check if the ticket's status is 'active'
          if (ticket._user._id === user.id ) {
            return (
              <li key={ticket._id}>
                Ticket number: {ticket._id}
                Tour ID: {ticket._tour._id}
                Ticket Holder: {ticket._user.name}
                Tour Details: <a href={`tours/${ticket._tour._id}`}>Tour Details</a>
              </li>
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
