// OrderList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import orderListBackground from '../images/orderlist.webp';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const username = localStorage.getItem('username');
                const userrole = localStorage.getItem('role');
                if (userrole === 'admin') {

                    const response = await axios.get('http://localhost:8000/api/users/admin/orders');
                    setOrders(response.data);

                } else {
                    const response = await axios.get('http://localhost:8000/api/users/orders/', {
                        params: { username },
                     });
                    setOrders(response.data);
            }
                
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleConfirm = async (orderId) => {
        try {
            await axios.post(`http://localhost:8000/api/users/orders/confirm/${orderId}/`);
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId ? { ...order, is_confirmed: true } : order
                )
            );
        } catch (error) {
            console.error('Error confirming order:', error);
        }
    };

    const handleEdit = (orderId) => {
        navigate(`/orders/edit/${orderId}`);
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <h2 style={styles.heading}>Your Orders</h2>
                {orders.length > 0 ? (
                    <ul style={styles.orderList}>
                        {orders.map((order) => (
                            <li key={order.id} style={styles.orderItem}>
                                <p><strong>Order #{order.id}</strong> - Status: {order.status}</p>
                                <p><strong>Measurements:</strong> {order.measurements}</p>
                                <p><strong>Comments:</strong> {order.comments}</p>
                                <p><strong>Confirmed:</strong> {order.is_confirmed ? "Yes" : "No"}</p>
                                {!order.is_confirmed && (
                                    <div style={styles.buttonGroup}>
                                        <button onClick={() => handleConfirm(order.id)} style={styles.button}>
                                            Confirm Order
                                        </button>
                                        <button onClick={() => handleEdit(order.id)} style={styles.button}>
                                            Edit Order
                                        </button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p style={styles.noOrders}>You have no orders yet.</p>
                )}
                <div style={styles.actionButtons}>
                    <button onClick={() => navigate('/neworders')} style={styles.actionButton}>
                        Place a New Order
                    </button>
                    <button onClick={() => navigate(-1)} style={styles.actionButton}>
                        Go to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

// Inline styles
const styles = {
    page: {
        minHeight: '100vh',
        backgroundImage: `url(${orderListBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
    },
    container: {
        maxWidth: '800px',
        width: '100%',
        padding: '30px',
        borderRadius: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Increased opacity for better readability
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
        color: '#333', // Darkened text color for better readability
    },
    heading: {
        fontSize: '2rem',
        marginBottom: '20px',
        textAlign: 'center',
    },
    orderList: {
        listStyleType: 'none',
        padding: 0,
    },
    orderItem: {
        padding: '15px',
        marginBottom: '10px',
        borderBottom: '1px solid #ccc',
        color: '#333',
    },
    buttonGroup: {
        display: 'flex',
        gap: '10px', // Added space between the buttons
        marginTop: '10px',
    },
    noOrders: {
        fontSize: '1.2rem',
        textAlign: 'center',
    },
    button: {
        padding: '10px 20px',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        flexGrow: 1,
    },
    actionButtons: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    actionButton: {
        padding: '12px 20px',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#28a745',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
};

export default OrderList;
