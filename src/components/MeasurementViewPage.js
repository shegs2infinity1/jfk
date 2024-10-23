// MeasurementViewPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import backgroundImage from '../images/measurements_background.webp'; // Adjust the path as needed

const MeasurementViewPage = () => {
    const [measurements, setMeasurements] = useState(null);
    // const [username, setUsername] = useState('');
    const role =  localStorage.getItem("role")
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { username } = useParams();

    useEffect(() => {
        const fetchMeasurements = async () => { 
            console.log(username);
            // const username = username
            try {
                const response = await axios.get('http://localhost:8000/api/users/measurements/view/', {
                    params: { username }
                });
                setMeasurements(response.data);
            } catch (error) {
                console.error("Error fetching measurements:", error);
                setError("Unable to fetch measurements.");
            }
        };

        fetchMeasurements();
    }, []);

    const handleEdit = () => {
        navigate(`/measurements/update/${username}`);
    };
    const handleBackHome = () => {
        if (role === 'client'){
            navigate('/client-home');
        }
        if (role === 'admin'){
            navigate('/admin/dashboard');
        }
        
    };

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <h2 style={styles.heading}>Current Measurements for {username}</h2>
                {measurements ? (
                    <div style={styles.measurementList}>
                        <p>Neck: {measurements.neck}</p>
                        <p>Chest: {measurements.chest}</p>
                        <p>Waist: {measurements.waist}</p>
                        <p>Hip: {measurements.hip}</p>
                        <p>Shoulder: {measurements.shoulder}</p>
                        <p>Sleeve: {measurements.sleeve}</p>
                        <p>Armhole: {measurements.armhole}</p>
                        <p>Bicep: {measurements.bicep}</p>
                        <p>Wrist: {measurements.wrist}</p>
                        <p>Inseam: {measurements.inseam}</p>
                        <p>Outseam: {measurements.outseam}</p>
                        <p>Thigh: {measurements.thigh}</p>
                        <p>Rise: {measurements.rise}</p>
                        <p>Body Length: {measurements.bodylength}</p>
                        <div style={styles.buttonContainer}>
                            <button onClick={handleEdit} style={styles.button}>Edit Measurements</button>
                            <button onClick={handleBackHome} style={styles.button}>Home</button>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

// Inline styles
const styles = {
    page: {
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "50px 20px",
    },
    container: {
        maxWidth: '600px',
        width: "100%",
        margin: '0 auto',
        padding: '30px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent background for readability
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        fontSize: '2.2rem',
        marginBottom: '30px',
        color: '#333',
    },
    measurementList: {
        textAlign: 'left', // Align measurements to the left for readability
        fontSize: '1.1rem',
        color: '#333',
        lineHeight: '1.8',  // Add space between lines for better readability
    },
    button: {
        padding: '12px 20px',
        fontSize: '1.1rem',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px',
        transition: 'background-color 0.3s',
        marginLeft: '10px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px', // Added space between buttons
        marginTop: '30px',
    },
};

export default MeasurementViewPage;
