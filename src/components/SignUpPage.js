import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image from "../images/singup.webp"; // Adjust image path if needed

const SignUpPage = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    role: "client", // Default to client, admin can only be set from the backend
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

  const [errorMessage, setErrorMessage] = useState(""); // State to hold error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Clear previous error message
      setErrorMessage("");

      // Post user data to the backend for registration
      await axios.post("http://localhost:8000/api/users/signup/", userData);

      // Compose email data
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

      // Send notification email
      await axios.post(
        "http://localhost:8000/api/users/notifications/email",
        maildata
      );

      // Handle redirection based on user status
      if (localStorage.getItem("username")) {
        window.alert("New Profile Created");
        navigate(-1);
      } else {
        window.alert("New Profile Created");
        navigate("/login");
      }
    } catch (error) {
      // Display the error message if API call fails
      if (error.response && error.response.data) {
        setErrorMessage(
          error.response.data.error ||
            "An error occurred during sign-up. Please try again."
        );
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
      console.error("Error during sign-up", error);
    }
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBackToLogin = () => {
    if (localStorage.getItem("username")) {
      navigate(-1);
    } else {
      navigate("/login");
    }
  };

  const handleBackHome = () => {
    if (localStorage.getItem("username")) {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <button
          type="button"
          onClick={handleBackHome}
          style={styles.backButton}
        >
          Back Home
        </button>
        <h2 style={styles.heading}>Create Your Account</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>First name:</label>
          <input
            type="text"
            name="firstname"
            value={userData.firstname}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <br />
          <label style={styles.label}>Last name:</label>
          <input
            type="text"
            name="lastname"
            value={userData.lastname}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <br />
          <label style={styles.label}>Gender:</label>
          <select
            name="gender"
            value={userData.gender}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <br />
          <label style={styles.label}>Date of Birth:</label>
          <input
            type="date"
            name="birthdate"
            value={userData.birthdate}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <br />
          <label style={styles.label}>Phone Number:</label>
          <input
            type="number"
            name="phonenumber"
            value={userData.phonenumber}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <br />
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <br />
          <label style={styles.label}>Username:</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            style={styles.input}
            required
          />
          {/* Display error message if there's one */}
          {errorMessage && (
            <div style={styles.errorMessage}>{errorMessage}</div>
          )}
          <br />
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <br />
          <button type="submit" style={styles.button}>
            Submit
          </button>
          <br />
          <button
            type="button"
            onClick={handleBackToLogin}
            style={styles.backButton}
          >
            Back
          </button>
          <br />
        </form>
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "50px 0",
  },
  container: {
    maxWidth: "500px",
    width: "100%",
    margin: "0 auto",
    padding: "30px",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    fontSize: "1rem",
    color: "#555",
    textAlign: "left",
  },
  input: {
    padding: "10px",
    fontSize: "1rem",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "100%",
  },
  button: {
    padding: "10px 15px",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  backButton: {
    padding: "10px 15px",
    fontSize: "1rem",
    color: "#333",
    backgroundColor: "#f1f1f1",
    border: "none",
    borderRadius: "5px",
    marginTop: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  errorMessage: {
    color: "red",
    marginTop: "10px",
  },
};

export default SignUpPage;
