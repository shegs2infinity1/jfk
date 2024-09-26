// ClientHomePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import clientHomePageBackground from "../images/clienthome.webp"

const ClientHomePage = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8000/api/users/profile/${username}`, {
                    // headers: {
                    //     "Content-Type" : 'application/json'
                    // } 
                })
                setProfile(response.data);
            } catch (err) {
                setError('Unable to fetch profile information.');
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('username')
        navigate('/login');
    };

    if (error) {
        return <div style={styles.error}>{error}</div>;
    }

    if (!profile) {
        return <div style={styles.loading}>Loading...</div>;
    }

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <h1 style={styles.heading}>Welcome, {profile.firstname} {profile.lastname}</h1>
                <div style={styles.profileInfo}>
                    <p><strong>Username:</strong> {profile.username}</p>
                    <p><strong>Role:</strong> {profile.role}</p>
                    <p><strong>Phone Number:</strong> {profile.phonenumber}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Bio:</strong> {profile.bio}</p>
                </div>
                <div style={styles.buttonContainer}>
                    <button style={styles.button} onClick={() => navigate('/edit-profile')}>Edit Profile</button>
                    <button style={styles.button} onClick={() => navigate('/biodata')}>View or Submit Biodata</button>
                    <button style={styles.button} onClick={() => navigate('/neworders')}>Create New Order</button>
                    <button style={styles.button} onClick={() => navigate('/orders')}>View Orders</button>
                    <button style={styles.button} onClick={() => navigate('/createmeasurement')}>Create Measurements</button>
                    <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
};


// Inline styles
const styles = {
    page: {
        minHeight: '100vh',
        backgroundImage: `url(${clientHomePageBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        padding: '20px', // Add padding to ensure there's space around the container
    },
    container: {
        maxWidth: '700px',
        width: '100%',
        minHeight: '400px',
        padding: '40px',
        borderRadius: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Adjusted for better contrast
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        fontSize: '2.5rem',
        marginBottom: '30px',
        textAlign: 'center',
    },
    profileInfo: {
        marginBottom: '30px',
        lineHeight: '1.8',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    button: {
        padding: '15px 25px',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        flex: '1',
        marginRight: '10px',
    },
    logoutButton: {
        padding: '15px 25px',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#dc3545',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        flex: '1',
    },
    loading: {
        textAlign: 'center',
        fontSize: '1.2rem',
        color: '#fff',
    },
    error: {
        textAlign: 'center',
        color: 'red',
        fontSize: '1.2rem',
    },
};

export default ClientHomePage;