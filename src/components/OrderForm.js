// OrderForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import orderFormBackground from '../images/orderform.webp';

const OrderForm = () => {
    const [measurements, setMeasurements] = useState('');
    const [comments, setComments] = useState('');
    const [customizationOptions, setCustomizationOptions] = useState([]);
    const [success, setSuccess] = useState(false);
    const [client, setClient] = useState(''); // Corrected typo: setClient instead of setClinet
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const username = localStorage.getItem('username');
            setClient(username);
            await axios.post('http://localhost:8000/api/users/orders/new/', {
                measurements,
                comments,
                username,
                client,
            });
            setSuccess(true);
            // Clear form fields after submission
            setMeasurements('');
            setComments('');
            setCustomizationOptions([]);
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <h2 style={styles.heading}>Place a New Order</h2>
                {success && <p style={styles.successMessage}>Your order has been placed successfully!</p>}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <label style={styles.label}>Measurements:</label>
                    <textarea
                        value={measurements}
                        onChange={(e) => setMeasurements(e.target.value)}
                        required
                        style={styles.textarea}
                    />
                    <label style={styles.label}>Comments:</label>
                    <textarea
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        style={styles.textarea}
                    />
                    <button type="submit" style={styles.button}>Place Order</button>
                </form>
                <button onClick={() => navigate('/orders')} style={styles.button}>View Orders</button>
                <button onClick={() => navigate('/client-home')} style={styles.button}>Go to Home</button>
            </div>
        </div>
    );
};

// Inline styles
const styles = {
    page: {
        minHeight: '100vh',
        backgroundImage: `url(${orderFormBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        padding: '20px',
    },
    container: {
        maxWidth: '600px',
        margin: '50px auto',
        padding: '30px',
        borderRadius: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
    },
    input: {
        padding: '10px',
        fontSize: '1rem',
        marginBottom: '20px',
        borderRadius: '5px',
        border: '1px solid #ccc',
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
        padding: '15px',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        marginTop: '10px', // Add margin between buttons
    },
    successMessage: {
        color: 'green',
        fontSize: '1rem',
        textAlign: 'center',
        marginBottom: '20px',
    },
};

export default OrderForm;
