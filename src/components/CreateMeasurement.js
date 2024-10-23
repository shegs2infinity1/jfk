// CreateMeasurment.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import image from "../images/createmeasure.webp";

const CreateMeasurment = () => {
  const [userData, setUserData] = useState({
    username: "",
    neck: "",
    chest: "",
    waist: "",
    hip: "",
    shoulder: "",
    sleeve: "",
    armhole: "",
    bicep: "",
    wrist: "",
    inseam: "",
    outseam: "",
    thigh: "",
    rise: "",
    bodylength: "",
  });
  const [error, setError] = useState(""); 
  const [successMessage, setSuccessMessage] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();
  const { username } = useParams();

  const validateForm = () => {
    const requiredFields = ["neck", "chest", "waist", "hip", "shoulder"];
    for (let field of requiredFields) {
      if (!userData[field]) {
        setError(`Please fill in the ${field} field.`);
        return false;
      }
    }
    setError("");
    return true;
  };

  useEffect(() => {
    //const username = localStorage.getItem("username");
    setUserData((prevData) => ({
      ...prevData,
      username: username,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await axios.post("http://localhost:8000/api/users/measurements/new/", userData);
      setSuccessMessage("Measurements saved successfully!");
      setShowPreview(false);
      setUserData({
        username: username,
        neck: "",
        chest: "",
        waist: "",
        hip: "",
        shoulder: "",
        sleeve: "",
        armhole: "",
        bicep: "",
        wrist: "",
        inseam: "",
        outseam: "",
        thigh: "",
        rise: "",
        bodylength: "",
      });
    } catch (error) {
      console.error("Error during measurement creation", error);
      setError("Failed to save measurements. Please try again.");
    }
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const closeModal = () => {
    setShowPreview(false);
  };

  const handleBackHome = () => {
    const role = localStorage.getItem("role")
    if (role==='client'){
      navigate("/client-home");
    }

    if (role==='admin'){
      navigate("/admin/dashboard");
    }
    
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <button type="button" onClick={handleBackHome} style={styles.backButton}>
          Back Home
        </button>
        <h2 style={styles.heading}>Submit your Measurements for {username}</h2>
        {error && <p style={styles.errorMessage}>{error}</p>}
        {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
        <button type="button" onClick={togglePreview} style={styles.previewButton}>
          {showPreview ? "Hide Preview" : "Show Preview"}
        </button>
        <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
            <div style={styles.inputWrapper}>
              <label style={styles.label}>Neck:</label>
              <input
                type="number"
                name="neck"
                value={userData.neck}
                onChange={handleChange}
                placeholder="Neck"
                style={styles.input}
                required
              />
            </div>
            <div style={styles.inputWrapper}>
              <label style={styles.label}>Chest:</label>
              <input
                type="number"
                name="chest"
                value={userData.chest}
                onChange={handleChange}
                placeholder="Chest"
                style={styles.input}
                required
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.inputWrapper}>
              <label style={styles.label}>Waist:</label>
              <input
                type="number"
                name="waist"
                value={userData.waist}
                onChange={handleChange}
                placeholder="Waist"
                style={styles.input}
                required
              />
            </div>
            <div style={styles.inputWrapper}>
              <label style={styles.label}>Hip:</label>
              <input
                type="number"
                name="hip"
                value={userData.hip}
                onChange={handleChange}
                placeholder="Hip"
                style={styles.input}
                required
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.inputWrapper}>
              <label style={styles.label}>Shoulder:</label>
              <input
                type="number"
                name="shoulder"
                value={userData.shoulder}
                onChange={handleChange}
                placeholder="Shoulder"
                style={styles.input}
                required
              />
            </div>
            <div style={styles.inputWrapper}>
              <label style={styles.label}>Sleeve:</label>
              <input
                type="number"
                name="sleeve"
                value={userData.sleeve}
                onChange={handleChange}
                placeholder="Sleeve"
                style={styles.input}
                required
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.inputWrapper}>
              <label style={styles.label}>Armhole:</label>
              <input
                type="number"
                name="armhole"
                value={userData.armhole}
                onChange={handleChange}
                placeholder="Armhole"
                style={styles.input}
                required
              />
            </div>
            <div style={styles.inputWrapper}>
              <label style={styles.label}>Bicep:</label>
              <input
                type="number"
                name="bicep"
                value={userData.bicep}
                onChange={handleChange}
                placeholder="Bicep"
                style={styles.input}
                required
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.inputWrapper}>
              <label style={styles.label}>Wrist:</label>
              <input
                type="number"
                name="wrist"
                value={userData.wrist}
                onChange={handleChange}
                placeholder="Wrist"
                style={styles.input}
                required
              />
            </div>
            <div style={styles.inputWrapper}>
              <label style={styles.label}>Inseam:</label>
              <input
                type="number"
                name="inseam"
                value={userData.inseam}
                onChange={handleChange}
                placeholder="Inseam"
                style={styles.input}
                required
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.inputWrapper}>
              <label style={styles.label}>Outseam:</label>
              <input
                type="number"
                name="outseam"
                value={userData.outseam}
                onChange={handleChange}
                placeholder="Outseam"
                style={styles.input}
                required
              />
            </div>
            <div style={styles.inputWrapper}>
              <label style={styles.label}>Thigh:</label>
              <input
                type="number"
                name="thigh"
                value={userData.thigh}
                onChange={handleChange}
                placeholder="Thigh"
                style={styles.input}
                required
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.inputWrapper}>
              <label style={styles.label}>Rise:</label>
              <input
                type="number"
                name="rise"
                value={userData.rise}
                onChange={handleChange}
                placeholder="Rise"
                style={styles.input}
                required
              />
            </div>
            <div style={styles.inputWrapper}>
              <label style={styles.label}>Body Length:</label>
              <input
                type="number"
                name="bodylength"
                value={userData.bodylength}
                onChange={handleChange}
                placeholder="Body Length"
                style={styles.input}
                required
              />
            </div>
          </div>
          

          <button type="submit" style={styles.button}>Save Measurements</button>
        </form>
        
        {showPreview && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <h3 style={styles.previewHeading}>Measurement Preview</h3>
              {Object.keys(userData).map((key) => (
                key !== "username" && <p key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}: {userData[key]}</p>
              ))}
              <button style={styles.modalCloseButton} onClick={closeModal}>Close</button>x
            </div>
          </div>
        )}
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
    padding: "50px 20px",
  },
  container: {
    maxWidth: "800px",
    width: "100%",
    padding: "40px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
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
  inputGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  inputWrapper: {
    flex: "0 0 48%", // Ensures that the input fields take up 48% of the space, with a small gap
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
    width: "100%",
    borderRadius: "5px",
    border: "1px solid #ccc",
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
  previewButton: {
    padding: "8px 12px",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#28a745",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginBottom: "20px", // Adjusted to move above the form
  },
  errorMessage: {
    color: "#dc3545", // Red color for error
    fontSize: "1rem",
    marginBottom: "15px",
  },
  successMessage: {
    color: "#28a745", // Green color for success
    fontSize: "1rem",
    marginBottom: "15px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    maxWidth: "500px",
    width: "100%",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  previewHeading: {
    fontSize: "1.5rem",
    marginBottom: "20px",
    color: "#333",
  },
  modalCloseButton: {
    padding: "10px 20px",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default CreateMeasurment;
