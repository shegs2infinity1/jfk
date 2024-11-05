import React from 'react';
import { Link } from 'react-router-dom';
import image from "../images/jfk2.webp"; // Background image
import "../styles/global.css"
import "../styles/LandingPage.css";

const LandingPage = () => {
    return (
        <div className="container-landing" style={{ backgroundImage: `url(${image})` }}>
            <div className="overlay"></div>
            <div className="content">
                <h1 className="heading-landing">Welcome to JFK, where we create magic</h1>
                <p className="subText">Please log in or sign up to continue.</p>
                <div className="buttonContainer">
                    <Link to="/login" className="link">
                        <button className="button">Login</button>
                    </Link>
                    <Link to="/signup" className="link">
                        <button className="button">Sign Up</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;