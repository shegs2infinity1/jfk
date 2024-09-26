// LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import image from "../images/jfk2.webp"

const LandingPage = () => {
    return (
        <div style={styles.container}>
            <div style={styles.overlay}></div>
            <div style={styles.content}>
                <h1 style={styles.heading}>Welcome to JFK, where we create magic</h1>
                <p style={styles.subText}>Please log in or sign up to continue.</p>
                <div style={styles.buttonContainer}>
                    <Link to="/login" style={styles.link}>
                        <button style={styles.button}>Login</button>
                    </Link>
                    <Link to="/signup" style={styles.link}>
                        <button style={styles.button}>Sign Up</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        position: 'relative',
        height: '100vh',
        backgroundImage:`url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
        color: 'white',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark overlay for better text readability
    },
    content: {
        position: 'relative',
        textAlign: 'center',
        zIndex: 1,
    },
    heading: {
        fontSize: '3.5rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        marginBottom: '20px',
        animation: 'fadeInDown 1s',
    },
    subText: {
        fontSize: '1.2rem',
        marginBottom: '40px',
        animation: 'fadeInUp 1s',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '1rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        borderRadius: '25px',
        border: 'none',
        background: 'linear-gradient(45deg, #ff6b6b, #ff9f43)',
        color: 'white',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, background 0.3s ease',
    },
    buttonHover: {
        background: 'linear-gradient(45deg, #ff9f43, #ff6b6b)',
    },
    link: {
        textDecoration: 'none',
    },
};

export default LandingPage;
