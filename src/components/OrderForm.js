import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import orderFormBackground from "../images/orderform.webp";

const OrderForm = () => {
  const [measurements, setMeasurements] = useState("");
  const [userStats, setUserStats] = useState({});
  const [comments, setComments] = useState("");
  const [success, setSuccess] = useState(false);
  const [client, setClient] = useState("");
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [expectedDate, setExpectedDate] = useState("");
  const [eventType, setEventType] = useState("");
  const [material, setMaterial] = useState(false);
  const [preferredColor, setPreferredColor] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState("");
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  // Fetch User Profiles (for Admin)
  const fetchProfiles = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users/userprofile");
      setProfiles(response.data);
    } catch (error) {
      console.error("Error fetching user profiles:", error);
    }
  };

  // Fetch User Measurements
  const fetchMeasurements = async (username) => {
    try {
      setLoading(true);
      
      const response = await axios.get("http://localhost:8000/api/users/measurements/view/", {
        params: { username },
      });
      setUserStats(response.data);
    } catch (error) {
      console.error("Error fetching measurements:", error);
      setError("Unable to fetch measurements.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Profile Change (Admin)
  const handleProfileChange = (event) => {
    resetForm();
    const username = event.target.value;
    setSelectedProfile(username);
    fetchMeasurements(username);
  };

  // useEffect Hook
  useEffect(() => {
    if (role === "admin") {
      fetchProfiles();
    } else if (role === "client") {
      const username = localStorage.getItem("username");
      setClient(username);
      setUsername(username);
      fetchMeasurements(username);
    }
  }, [username, role]);

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/users/orders/new/", {
        measurements,
        comments,
        expected_date: expectedDate,
        event_type: eventType,
        material,
        preferred_Color: preferredColor,
        username: selectedProfile || username, // Use selected profile or current username
        client: selectedProfile || username,
      });
      setSuccess(true);
      resetForm(); // Clear form after successful submission
    } catch (error) {
      console.error("Error placing order:", error);
      setError("Failed to place order. Please try again.");
    }
  };

  // Reset Form Fields
  const resetForm = () => {
    setMeasurements("");
    setExpectedDate("");
    setEventType("");
    setMaterial(false);
    setPreferredColor("");
    setComments("");
    setUserStats("")
    setClient("");
    setError("");
  };

  // Handle Navigation
  const handleBackHome = () => {
    navigate(role === "client" ? "/client-home" : "/admin/dashboard");
  };

  // Modal Close
  const closeModal = () => {
    setSuccess(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Place a New Order for </h2>
        {error && <p style={styles.errorMessage}>{error}</p>}

        {role === "admin" && (
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Select Client: </label>
            <select id="profile-dropdown" value={selectedProfile} onChange={handleProfileChange} style={styles.input}>
              <option value="" disabled>Select a Client</option>
              {profiles.map((profile) => (
                <option key={profile.id} value={profile.username}>
                  {profile.username}
                </option>
              ))}
            </select>
          </div>
        )}

        {loading ? (
          <p>Loading measurements...</p>
        ) : (
          <div>
            <table style={styles.comparisonTable}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Body Part</th>
                  <th style={styles.tableHeader}>Current Measurement</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(userStats).map((key) => (
                  <tr key={key}>
                    <td style={styles.tableData}>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                    <td style={styles.tableData}>{userStats[key]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Measurements:</label>
            <textarea
              value={measurements}
              onChange={(e) => setMeasurements(e.target.value)}
              required
              style={styles.textarea}
              placeholder="Enter custom measurements if different from current stats"
            />
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Comments:</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              style={styles.textarea}
              placeholder="Enter any additional comments"
            />
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Expected Delivery Date:</label>
            <input
              type="date"
              value={expectedDate}
              onChange={(e) => setExpectedDate(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Event Type:</label>
            <input
              type="text"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Will We Provide Material?</label>
            <input
              type="checkbox"
              checked={material}
              onChange={(e) => setMaterial(e.target.checked)}
              style={styles.checkbox}
            />
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Preferred Color/Combinations:</label>
            <input
              type="text"
              value={preferredColor}
              onChange={(e) => setPreferredColor(e.target.value)}
              style={styles.input}
              placeholder="Enter preferred colors"
            />
          </div>
          <button type="submit" style={styles.button}>
            Place Order
          </button>
        </form>

        <div style={styles.buttonGroup}>
          <button onClick={() => navigate("/orders")} style={styles.button}>
            View Orders
          </button>
          <button onClick={handleBackHome} style={styles.button}>
            Go to Home
          </button>
        </div>
      </div>

      {/* Modal for Success Message */}
      {success && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>Success!</h3>
            <p>Your order has been placed successfully.</p>
            <button onClick={closeModal} style={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Inline styles (refactored for simplicity and consistency)
const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage: `url(${orderFormBackground})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  container: {
    maxWidth: "700px",
    width: "100%",
    padding: "40px",
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "2.2rem",
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
  },
  comparisonTable: {
    width: "100%",
    margin: "20px 0",
    borderCollapse: "collapse",
    textAlign: "center",
    fontSize: "1rem",
    border: "1px solid #ccc",
  },
  tableHeader: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px",
  },
  tableData: {
    padding: "10px",
    border: "1px solid #ccc",
  },
  label: {
    marginBottom: "5px",
    fontSize: "1rem",
    color: "#555",
    textAlign: "left",
  },
  textarea: {
    padding: "10px",
    fontSize: "1rem",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    resize: "vertical",
    height: "100px",
    width: "100%",
  },
  input: {
    padding: "10px",
    fontSize: "1rem",
    width: "100%",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  fieldGroup: {
    marginBottom: "20px",
  },
  checkbox: {
    marginLeft: "10px",
    transform: "scale(1.2)",
  },
  button: {
    padding: "15px",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginTop: "10px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  closeButton: {
    padding: "10px 20px",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
  errorMessage: {
    color: "red",
    fontSize: "1rem",
    textAlign: "center",
    marginBottom: "20px",
  },
};

export default OrderForm;
