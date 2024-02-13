import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Client from '../services/api';

const EditTour = ({ setUpdatedTours }) => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        duration: '',
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

    useEffect(() => {
        const fetchTour = async () => {
            try {
                const res = await Client.get(`/tours/${id}`);
                const tourData = res.data;
                console.log(tourData)
                setFormData({
                    name: tourData.name,
                    type: tourData.type || '',
                    date: tourData.date || '',
                    duration: tourData.duration || '',
                    time: tourData.time || '',
                    image: tourData.image || '',
                    trailName: tourData.trailName || '',
                    distance: tourData.distance || '',
                    description: tourData.description || '',
                    medium: tourData.medium || '',
                    capacity: tourData.capacity || ''
                });
            } catch (error) {
                console.error('Error fetching tour:', error);
            }
        };
        fetchTour();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await Client.put(`/tours/${id}`, formData, 
            );
            setUpdatedTours(prev => prev + 1);
        } catch (error) {
            console.error('Error editing tour:', error);
        }
    };

    return (
        <div>
            <h2>Edit Tour</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                <label>Type:</label>
                <input type="text" name="type" value={formData.type} onChange={handleChange} required />
                <label>Duration:</label>
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
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditTour;
