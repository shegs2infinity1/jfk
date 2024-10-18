// LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import image from "../images/signin.webp"

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/users/verify/', {
                username,
                password,
            });

            // Save JWT token and role in localStorage
            localStorage.setItem('token', response.data.access);
            console.log(response.data.access)
            localStorage.setItem('role', response.data.role);
            localStorage.setItem('username',username)
            console.log(response.data.role)

            // Navigate based on the role
            if (response.data.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/client-home');
            }
        } catch (error) {
            setErrorMessage('Invalid username or password');
            console.error('Invalid credentials', error);
        }
    };

    const handleBackHome = () => {
        navigate('/');
    };

    return (

        <div style={styles.page} >
        <div style={styles.container}>

                <button type="button" onClick={handleBackHome} style={styles.button}>
                    Back Home
                </button>
            <h2 style={styles.heading}>Login to Your Account</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    required
                />
                {errorMessage && <p style={styles.error}>{errorMessage}</p>}
                <button type="submit" style={styles.button}>Login</button>
            </form>
        </div>
        </div>
    );
};

// Inline styles
const styles = {
    page: {
        height: '100vh',
        backgroundImage: `url(${image})`,
         backgroundSize: 'cover',
         backgroundPosition: 'center',
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
    },
    container: {
        maxWidth: '400px',
        margin: '50px auto',
        padding: '30px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        fontSize: '2rem',
        marginBottom: '20px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        padding: '10px',
        fontSize: '1rem',
        marginBottom: '20px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        width: '100%',
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
    buttonHover: {
        backgroundColor: '#0056b3',
    },
    error: {
        color: 'red',
        fontSize: '0.9rem',
        marginBottom: '20px',
    },
};

export default LoginPage;
