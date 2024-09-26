// OrderEdit.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const OrderEdit = () => {
    const { orderId } = useParams();
    const [measurements, setMeasurements] = useState('');
    const [comments, setComments] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/orders/${orderId}/`);
                setMeasurements(response.data.measurements);
                setComments(response.data.comments);
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/api/users/orders/update/${orderId}/`, {
                measurements,
                comments,
            });
            navigate('/orders');
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Edit Order #{orderId}</h2>
            <form onSubmit={handleUpdate}>
                <label>Measurements:</label>
                <textarea
                    value={measurements}
                    onChange={(e) => setMeasurements(e.target.value)}
                    required
                />
                <label>Comments:</label>
                <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                />
                <button type="submit">Update Order</button>
            </form>
        </div>
    );
};

// Inline styles
const styles = {
    container: {
        maxWidth: '600px',
        margin: '50px auto',
        padding: '30px',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9',
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
    },
};

export default OrderEdit;
