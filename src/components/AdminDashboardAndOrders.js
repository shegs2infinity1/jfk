import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { Navigate } from 'react-router-dom'; 
import backgroundImage from '../images/adminBackground.webp'; 

const AdminDashboardAndOrders = () => {
    const [metrics, setMetrics] = useState({
        total_clients: 0,
        total_orders: 0,
        pending_orders: 0,
        in_progress_orders: 0,
        completed_orders: 0,
        total_notifications: 0,
    });
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    // Fetch dashboard metrics
    useEffect ( () => {
        const userRole = localStorage.getItem('role')
        const username = localStorage.getItem('username')

        console.log(username)
        console.log(userRole)

        if ((!username) && (userRole !== 'admin')){

            return <Navigate to="/login" />;
        }
    }
    )
    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/users/admin/dashboard');
                setMetrics(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching dashboard metrics:', error);
                setError('Failed to load dashboard metrics.');
                setLoading(false);
            }
        };
        fetchMetrics();
    }, []);

    // Fetch order list
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/users/admin/orders');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError('Failed to load orders.');
            }
        };

        fetchOrders();
    }, []);

    // Update order status
    const updateOrderStatus = async (id, status) => {
        try {
            await axios.put(`http://localhost:8000/api/admin/orders/${id}/`, { status });
            // Update order status locally after successful status update
            setOrders(orders.map(order => order.id === id ? { ...order, status } : order));
        } catch (error) {
            console.error('Error updating order status:', error);
            setError('Failed to update order status.');
        }
    };

    // Navigate to detailed views
    const handleNavigate = (path) => {
        navigate(path);
    };

    // Log out function
    const handleLogout = () => {
        localStorage.removeItem('username');
        navigate('/login'); // Redirect to login page
    };

    if (loading) {
        return <div style={styles.loading}>Loading...</div>;
    }

    if (error) {
        return <div style={styles.error}>{error}</div>;
    }

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                {/* Log out button */}
                <button onClick={handleLogout} style={styles.logoutButton}>Log Out</button>

                {/* Admin Dashboard Section */}
                <h2 style={styles.header}>Admin Dashboard</h2>
                <div style={styles.metricsGrid}>
                    <div
                        style={styles.metricCard}
                        onClick={() => handleNavigate('/admin/clients')}
                        className="metric-card"
                    >
                        <h3>Total Clients</h3>
                        <p>{metrics.total_clients}</p>
                    </div>
                    <div
                        style={styles.metricCard}
                        onClick={() => handleNavigate('/orders')}
                        className="metric-card"
                    >
                        <h3>Total Orders</h3>
                        <p>{metrics.total_orders}</p>
                    </div>
                    <div
                        style={styles.metricCard}
                        onClick={() => handleNavigate('/admin/orders/pending')}
                        className="metric-card"
                    >
                        <h3>Pending Orders</h3>
                        <p>{metrics.pending_orders}</p>
                    </div>
                    <div
                        style={styles.metricCard}
                        onClick={() => handleNavigate('/admin/orders/in-progress')}
                        className="metric-card"
                    >
                        <h3>In Progress Orders</h3>
                        <p>{metrics.in_progress_orders}</p>
                    </div>
                    <div
                        style={styles.metricCard}
                        onClick={() => handleNavigate('/admin/orders/completed')}
                        className="metric-card"
                    >
                        <h3>Completed Orders</h3>
                        <p>{metrics.completed_orders}</p>
                    </div>
                    <div
                        style={styles.metricCard}
                        onClick={() => handleNavigate('/admin/notifications')}
                        className="metric-card"
                    >
                        <h3>Total Notifications</h3>
                        <p>{metrics.total_notifications}</p>
                    </div>
                </div>

                {/* Admin Order List Section */}
                <h2 style={styles.orderHeader}>Order Management</h2>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.tableHeader}>Order ID</th>
                            <th style={styles.tableHeader}>Client</th>
                            <th style={styles.tableHeader}>Status</th>
                            <th style={styles.tableHeader}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td style={styles.tableCell}>{order.id}</td>
                                <td style={styles.tableCell}>{order.client}</td>
                                <td style={styles.tableCell}>
                                    <span style={getStatusStyle(order.status)}>
                                        {order.status}
                                    </span>
                                </td>
                                <td style={styles.tableCell}>
                                    <button
                                        onClick={() => updateOrderStatus(order.id, 'in_progress')}
                                        style={styles.button}
                                    >
                                        Mark In Progress
                                    </button>
                                    <button
                                        onClick={() => updateOrderStatus(order.id, 'Completed')}
                                        style={{ ...styles.button, backgroundColor: '#28a745' }}
                                    >
                                        Mark Completed
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Helper function for dynamic status styles
const getStatusStyle = (status) => {
    switch (status) {
        case 'Completed':
            return { color: 'green', fontWeight: 'bold' };
        case 'in_progress':
            return { color: 'orange', fontWeight: 'bold' };
        case 'Pending':
            return { color: 'red', fontWeight: 'bold' };
        default:
            return {};
    }
};

// Inline styles
const styles = {
    page: {
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
    },
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '1200px',
    },
    header: {
        fontSize: '2rem',
        marginBottom: '20px',
        color: '#333',
    },
    metricsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        marginBottom: '40px',
    },
    metricCard: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, background-color 0.3s ease, color 0.3s ease',
    },
    metricCardHover: {
        transform: 'scale(1.05)', 
        backgroundColor: '#007bff', 
        color: '#fff', 
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
    },
    orderHeader: {
        marginTop: '40px',
        marginBottom: '20px',
        fontSize: '1.5rem',
        color: '#333',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '20px',
    },
    tableHeader: {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px',
        textAlign: 'left',
    },
    tableCell: {
        padding: '10px',
        borderBottom: '1px solid #ddd',
    },
    button: {
        padding: '8px 12px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginRight: '10px',
    },
    logoutButton: {
        padding: '10px 15px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        float: 'right',
        marginBottom: '20px',
    },
    loading: {
        textAlign: 'center',
        fontSize: '1.5rem',
        color: '#333',
        padding: '20px',
    },
    error: {
        textAlign: 'center',
        fontSize: '1.2rem',
        color: 'red',
        padding: '20px',
    },
};

export default AdminDashboardAndOrders;
