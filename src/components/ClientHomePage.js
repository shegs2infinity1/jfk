import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import clientHomePageBackground from "../images/clienthome.webp";

const ClientHomePage = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const [modalVisible, setModalVisible] = useState(false); // For error modal visibility
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/users/profile/${username}`);
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
        localStorage.removeItem('username');
        navigate('/login');
    };

    const handleMeasurementCheck = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/users/measurements/view/', {
                params: { username }
            });
            if (response.data) {
                navigate(`/measurements/view/${username}`); // Navigate to measurements page if data exists
            } else {
                setModalVisible(true); // Show modal if no measurements found
            }
        } catch (error) {
            setModalVisible(true); // Show modal on error (e.g., no measurements found)
        }
    };

    const closeModal = () => {
        setModalVisible(false); // Close modal when user clicks "Close"
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
                    <button style={styles.button} onClick={() => navigate(`/createmeasurement/${profile.username}`)}>Create Measurements</button>
                    <button style={styles.button} onClick={handleMeasurementCheck}>View or Update Measurements</button>
                    <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
                </div>
            </div>

            {/* Modal for No Measurements Error */}
            {modalVisible && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h3 style={styles.modalHeading}>Error</h3>
                        <p style={styles.modalText}>You don't have any measurements to view or update.</p>
                        <p style={styles.modalText}>Please proceed to capture your measurment </p>
                        <button onClick={closeModal} style={styles.closeButton}>Close</button>
                    </div>
                </div>
            )}
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
        padding: '20px',
        color: '#fff',
    },
    container: {
        maxWidth: '700px',
        width: '100%',
        minHeight: '400px',
        padding: '40px',
        borderRadius: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
    },
    heading: {
        fontSize: '2.5rem',
        marginBottom: '30px',
    },
    profileInfo: {
        marginBottom: '30px',
        lineHeight: '1.8',
    },
    buttonContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    button: {
        padding: '15px 20px',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        margin: '10px',
        flexBasis: '45%',
        flexGrow: 1,
        transition: 'background-color 0.3s',
    },
    logoutButton: {
        padding: '15px 20px',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#dc3545',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        margin: '10px',
        flexBasis: '45%',
        flexGrow: 1,
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
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,  // Ensure the modal is above all content
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '10px',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '80%',  // Ensure it's not too wide on smaller screens
        maxWidth: '400px',
    },
    modalHeading: {
        fontSize: '1.5rem',
        color: '#333',
        marginBottom: '10px',
    },
    modalText: {
        fontSize: '1rem',
        color: '#333',
        marginBottom: '20px',
    },
    closeButton: {
        padding: '10px 20px',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default ClientHomePage;
