/* eslint-disable react/prop-types */
import Client from '../services/api'
import { useState } from 'react';

const AddTour = ({ setUpdatedTours }) => {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token')?localStorage.getItem('token') : ''
        try {
            await Client.post(`/tours`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUpdatedTours(prev => prev + 1);
        } catch (error) {
            console.error('Error creating tour:', error);
        }
    };

    return (
        <div>
            <h2>Create a New Tour</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                <label>Duration(hours):</label>
                <input type="number" name="duration" value={formData.duration.hours} onChange={handleChange} required />
                <label>Duration(minutes):</label>
                <input type="number" name="duration" value={formData.duration.hours} onChange={handleChange} required />
                <label>Type:</label>
                <input type="text" name="type" value={formData.type} onChange={handleChange} required />
                <label>Date:</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                <label>Time:</label>
                <input type="time" name="time" value={formData.time} onChange={handleChange} required />
                <label>Image Url:</label>
                <input type="text" name="image" value={formData.image} onChange={handleChange} required />
                <label>Trail Name:</label>
                <input type="text" name="trailName" value={formData.trailName} onChange={handleChange} required />
                <label>Distance:</label>
                <input type="text" name="distance" value={formData.distance} onChange={handleChange} required />
                <label>Description:</label>
                <input type="text" name="description" value={formData.description} onChange={handleChange} required />
                <label>Medium:</label>
                <input type="text" name="medium" value={formData.medium} onChange={handleChange} required />
                <label>Capacity:</label>
                <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} required />



                <button type="submit">Create Tour</button>
            </form>
        </div>
    );
};

export default AddTour
