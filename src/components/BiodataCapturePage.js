import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BiodataCapturePage = () => {
    const [biodata, setBiodata] = useState({
        name: '',
        age: '',
        gender: '',
        role:'',
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');  // Get JWT token
            await axios.post(
                'http://localhost:8000/api/users/biodata/',
                biodata,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,  // Include JWT token in headers
                    },
                }
            );

            // Redirect the client after successful submission
            navigate('/success');
        } catch (error) {
            console.error('Error submitting biodata', error);
        }
    };

    const handleChange = (e) => {
        setBiodata({
            ...biodata,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
            <h2>Submit Your Biodata</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={biodata.name}
                    onChange={handleChange}
                    required
                />
                <br />
                <label>Age:</label>
                <input
                    type="number"
                    name="age"
                    value={biodata.age}
                    onChange={handleChange}
                    required
                />
                <br />

                <label>Select User role:</label>
                <select name="userrole" value={biodata.role} onChange={handleChange} required>
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                </select>

                <br />

                <label>Gender:</label>
                <select name="gender" value={biodata.gender} onChange={handleChange} required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default BiodataCapturePage;
