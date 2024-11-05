import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import image from "../images/signin.webp";
import "../styles/global.css"
import "../styles/LoginPage.css";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/api/users/verify/', {
                username,
                password,
            });

            // Save JWT token and role in localStorage
            localStorage.setItem('token', response.data.access);
            localStorage.setItem('role', response.data.role);
            localStorage.setItem('username', username);

            // Navigate based on the role
            if (response.data.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/client-home');
            }
        } catch (error) {
            setErrorMessage('Invalid username or password');
            console.error('Invalid credentials', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackHome = () => {
        navigate('/');
    };

    return (
        <div className="page" style={{ backgroundImage: `url(${image})` }}>
            <div className="container-login">
                <button type="button" onClick={handleBackHome} className="button" aria-label="Go back to home page">
                    Back Home
                </button>
                <br></br>
                <h2 className="heading-login">Login to Your Account</h2>
                <form onSubmit={handleSubmit} className="form">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input"
                        required
                    />
                    {errorMessage && <p className="error" role="alert" aria-live="assertive">{errorMessage}</p>}
                    <button type="submit" className="button" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
