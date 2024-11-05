import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image from "../images/singup.webp";
import loadingGif from "../images/loading.gif";
import "../styles/global.css";
import "../styles/SignUpPage.css";

const SignUpPage = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    role: "client",
    firstname: "",
    lastname: "",
    phonenumber: "",
    email: "",
    gender: "",
    birthdate: "",
  });

  const navigate = useNavigate();
  const [maildata, setMaildata] = useState({
    message: "",
    subject: "",
    username: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMessage("");
      setLoading(true);
      await axios.post("http://localhost:8000/api/users/signup/", userData);
      maildata.message = `
        <p>Dear <strong>${userData.firstname} ${userData.lastname}</strong>,</p>
        <p>Your client profile has just been created with <strong>JFK Tailor Shop</strong>.</p>
        <p><strong>Username:</strong> ${userData.username}</p>
        <p><strong>Password:</strong> ${userData.password}</p>
        <p>Please expect to hear from us again when your order is created.</p>
        <p>Thanks for choosing <strong>JFK Tailor Shop</strong>.</p>
        <p>Best regards,<br/>JFK Tailor Shop</p>
      `;
      maildata.subject = "Your Profile with JFK";
      maildata.username = userData.username;
      setMaildata(maildata);
      await axios.post("http://localhost:8000/api/users/notifications/email", maildata);
      window.alert("New Profile Created");
      navigate(localStorage.getItem("username") ? -1 : "/login");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || "An error occurred during sign-up. Please try again."
      );
      console.error("Error during sign-up", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBackToLogin = () => navigate(localStorage.getItem("username") ? -1 : "/login");

  return (
    <div className="page" style={{ backgroundImage: `url(${image})` }}>
      <div className="container-signup">
        <h2 className="heading">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-row">
            <label className="label">First name:</label>
            <input type="text" name="firstname" value={userData.firstname} onChange={handleChange} className="input" required />
          </div>
          <div className="form-row">
            <label className="label">Last name:</label>
            <input type="text" name="lastname" value={userData.lastname} onChange={handleChange} className="input" required />
          </div>
          <div className="form-row">
            <label className="label">Gender:</label>
            <select name="gender" value={userData.gender} onChange={handleChange} className="input" required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="form-row">
            <label className="label">Date of Birth:</label>
            <input type="date" name="birthdate" value={userData.birthdate} onChange={handleChange} className="input" required />
          </div>
          <div className="form-row">
            <label className="label">Phone Number:</label>
            <input type="number" name="phonenumber" value={userData.phonenumber} onChange={handleChange} className="input" required />
          </div>
          <div className="form-row">
            <label className="label">Email:</label>
            <input type="email" name="email" value={userData.email} onChange={handleChange} className="input" required />
          </div>
          <div className="form-row">
            <label className="label">Username:</label>
            <input type="text" name="username" value={userData.username} onChange={handleChange} className="input" required />
          </div>
          {errorMessage && <div className="errorMessage">{errorMessage}</div>}
          <div className="form-row">
            <label className="label">Password:</label>
            <input type="password" name="password" value={userData.password} onChange={handleChange} className="input" required />
          </div>
          <div className="button-row">
            <button type="submit" className="button" disabled={loading}>
              {loading ? <img src={loadingGif} alt="Please wait..." className="loadingGif" /> : "Submit"}
            </button>
            <button type="button" onClick={handleBackToLogin} className="button backButton">Back</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
