import React, { useState } from 'react';
import { UpdateUser } from '../services/Auth';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = () => {
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Destructure form values for easier use
        const { email, currentPassword, newPassword, confirmPassword } = formValues;

        // Ensure new password and confirmation match
        if (newPassword !== confirmPassword) {
            alert('New passwords do not match!');
            return;
        }

        try {
            // Call UpdateUser function with correct parameters
            await UpdateUser({
                email: email,
                currentPassword: currentPassword,
                newPassword: newPassword
            });

            // Reset form values after successful update
            setFormValues({
                email: '',
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });

            // Navigate to login page after successful update
            navigate('/login');
        } catch (error) {
            console.error('Error updating password:', error);
            // Handle error (show error message or redirect to error page)
        }
    };

    return (
        <div>
            <h2>Update Password</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formValues.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Current Password:</label>
                    <input
                        type="password"
                        name="currentPassword"
                        value={formValues.currentPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>New Password:</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={formValues.newPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Confirm New Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formValues.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Update Password</button>
            </form>
        </div>
    );
};

export default UpdatePassword;
