// EditProfilePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditProfilePage = () => {
    const [profile, setProfile] = useState({
        firstname: '',
        lastname: '',
        phonenumber: '',
        email: '',
        bio: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8000/api/users/profile/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfile(response.data);
            } catch (err) {
                setError('Unable to fetch profile information.');
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:8000/api/users/profile/', profile, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/client-home');
        } catch (err) {
            setError('Unable to update profile.');
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Edit Profile</h1>
            {error && <div style={styles.error}>{error}</div>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <label style={styles.label}>First Name:</label>
                <input 
                    type="text" 
                    name="firstname" 
                    value={profile.firstname} 
                    onChange={handleChange} 
                    style={styles.input} 
                />
                <label style={styles.label}>Last Name:</label>
                <input 
                    type="text" 
                    name="lastname" 
                    value={profile.lastname} 
                    onChange={handleChange} 
                    style={styles.input} 
                />
                <label style={styles.label}>Phone Number:</label>
                <input 
                    type="text" 
                    name="phonenumber" 
                    value={profile.phonenumber} 
                    onChange={handleChange} 
                    style={styles.input} 
                />
                <label style={styles.label}>Email:</label>
                <input 
                    type="email" 
                    name="email" 
                    value={profile.email} 
                    onChange={handleChange} 
                    style={styles.input} 
                />
                <label style={styles.label}>Bio:</label>
                <textarea 
                    name="bio" 
                    value={profile.bio} 
                    onChange={handleChange} 
                    style={styles.textarea} 
                ></textarea>
                <button type="submit" style={styles.button}>Update Profile</button>
            </form>
        </div>
    );
};

// Inline styles
const styles = {
    container: {
        maxWidth: '500px',
        margin: '50px auto',
        padding: '30px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        fontSize: '2rem',
        marginBottom: '20px',
        textAlign: 'center',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: '5px',
        fontSize: '1rem',
        color: '#555',
        textAlign: 'left',
    },
    input: {
        padding: '10px',
        fontSize: '1rem',
        marginBottom: '20px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    textarea: {
        padding: '10px',
        fontSize: '1rem',
        marginBottom: '20px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        resize: 'vertical',
        height: '100px',
    },
    button: {
        padding: '10px 15px',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    error: {
        color: 'red',
        fontSize: '1rem',
        marginBottom: '20px',
        textAlign: 'center',
    },
};

export default EditProfilePage;
