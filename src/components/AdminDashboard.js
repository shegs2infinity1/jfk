// AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [metrics, setMetrics] = useState({
        total_clients: 0,
        total_orders: 0,
        pending_orders: 0,
        in_progress_orders: 0,
        completed_orders: 0,
        total_notifications: 0,
    });

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/users/admin/dashboard');
                setMetrics(response.data);
            } catch (error) {
                console.error('Error fetching dashboard metrics:', error);
            }
        };

        fetchMetrics();
    }, []);

    return (
        <div style={styles.container}>
            <h2>Admin Dashboard</h2>
            <div style={styles.metricsGrid}>
                <div style={styles.metricCard}>
                    <h3>Total Clients</h3>
                    <p>{metrics.total_clients}</p>
                </div>
                <div style={styles.metricCard}>
                    <h3>Total Orders</h3>
                    <p>{metrics.total_orders}</p>
                </div>
                <div style={styles.metricCard}>
                    <h3>Pending Orders</h3>
                    <p>{metrics.pending_orders}</p>
                </div>
                <div style={styles.metricCard}>
                    <h3>In Progress Orders</h3>
                    <p>{metrics.in_progress_orders}</p>
                </div>
                <div style={styles.metricCard}>
                    <h3>Completed Orders</h3>
                    <p>{metrics.completed_orders}</p>
                </div>
                <div style={styles.metricCard}>
                    <h3>Total Notifications</h3>
                    <p>{metrics.total_notifications}</p>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    metricsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
    },
    metricCard: {
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
};

export default AdminDashboard;
