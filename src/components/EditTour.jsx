import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Client from '../services/api';

const EditTour = ({ setTour }) => {
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

    function refreshPage() {
        window.location.reload(false);
    }

    useEffect(() => {
        const fetchTour = async () => {
            try {
                const res = await Client.get(`/tours/${id}`);
                const tourData = res.data;
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
        } catch (error) {
            console.error('Error editing tour:', error);
        }
        refreshPage()
        // navigate(`/tours/${id}`)
    };

    return (
        <div className="mt-5 bg-light p-4">
            <h2>Edit Tour</h2>
            <form onSubmit={handleSubmit} className="px-5 mx-auto row g-3">

                <div className="col-md-6">
                    <label className="row form-label">Name:</label>
                    <input className="form-control" placeholder="" type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label className="row form-label">Image Url:</label>
                    <input className="form-control" type="text" name="image" value={formData.image} onChange={handleChange} required />
                </div>
                <div className="col-md-3">
                    <label className="row form-label">Duration:</label>
                    <input className="form-control" placeholder="" type="text" name="duration" value={formData.duration} onChange={handleChange} required />
                </div>
                <div className="col-md-3">
                    <label className="row form-label">Difficulty:</label>
                    <input className="form-control" type="text" name="type" value={formData.type} onChange={handleChange} required />
                </div>
                <div className="col-md-3">
                    <label className="row form-label">Date:</label>
                    <input className="form-control" type="date" name="date" value={formData.date} onChange={handleChange} required />
                </div>
                <div className="col-md-3">
                    <label className="row form-label">Time:</label>
                    <input className="form-control" type="time" name="time" value={formData.time} onChange={handleChange} required />
                </div>
                <div className="col-md-3">
                    <label className="row form-label">Trail Name:</label>
                    <input className="form-control" type="text" name="trailName" value={formData.trailName} onChange={handleChange} required />
                </div>
                <div className="col-md-3">
                    <label className="row form-label">Distance:</label>
                    <input className="form-control" type="text" name="distance" value={formData.distance} onChange={handleChange} required />
                </div>
                <div className="col-md-3">
                    <label className="row form-label">Medium:</label>
                    <input className="form-control" type="text" name="medium" value={formData.medium} onChange={handleChange} required />
                </div>
                <div className="col-md-3">
                    <label className="row form-label">Capacity:</label>
                    <input className="form-control" type="number" name="capacity" value={formData.capacity} onChange={handleChange} required />
                </div>
                <div className="col-md-12">
                    <label className="row form-label">Description:</label>
                    <input className="form-control" type="text" name="description" value={formData.description} onChange={handleChange} required />
                </div>

                <button className="btn btn-primary" type="button submit">Edit Tour</button>
                
            </form>
        </div>
    );
};

export default EditTour;
