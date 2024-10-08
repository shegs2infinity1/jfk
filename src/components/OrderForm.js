import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import orderFormBackground from "../images/orderform.webp";

const OrderForm = () => {
  const [measurements, setMeasurements] = useState("");
  const [userStats, setUserStats] = useState("");
  const [comments, setComments] = useState("");
  const [success, setSuccess] = useState(false);
  const [client, setClient] = useState("");
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [expected_date, setExpectedDate] = useState("");
  const [event_type, setEventType] = useState("");
  const [material, setMaterial] = useState(false);  // Changed to a boolean for checkbox
  const [preferred_Color, setPreferredColor] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeasurements = async () => {
      const username = localStorage.getItem("username");
      setClient(username);
      setUsername(username);
      try {
        const response = await axios.get(
          "http://localhost:8000/api/users/measurements/view/",
          {
            params: { username },
          }
        );
        setUserStats(response.data);
      } catch (error) {
        console.error("Error fetching measurements:", error);
        setError("Unable to fetch measurements.");
      }
    };

    fetchMeasurements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/users/orders/new/", {
        measurements,
        comments,
        expected_date,
        event_type,
        material,
        preferred_Color,
        username,
        client,
      });
      setSuccess(true);
      // Clear form fields after submission
      setMeasurements("");
      setExpectedDate("");
      setEventType("");
      setMaterial(false);  // Clear the checkbox
      setPreferredColor("");
      setComments("");
      setClient(""); // Clear the client field properly
    } catch (error) {
      console.error("Error placing order:", error);
      setError("Failed to place order. Please try again.");
    }
  };

  const closeModal = () => {
    setSuccess(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Place a New Order</h2>

        {error && <p style={styles.errorMessage}>{error}</p>}
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
                  <td style={styles.tableData}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </td>
                  <td style={styles.tableData}>{userStats[key]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Measurements:</label>
            <textarea
              value={measurements}
              onChange={(e) => setMeasurements(e.target.value)}
              required
              style={styles.textarea}
            />
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Comments:</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              style={styles.textarea}
            />
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Expected Delivery Date:</label>
            <input
              type="date"
              value={expected_date}
              onChange={(e) => setExpectedDate(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Event Type:</label>
            <input
              type="text"
              value={event_type}
              onChange={(e) => setEventType(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Will We Provide Material?</label>
            <input
              type="checkbox"
              checked={material}  // For checkboxes, use `checked` instead of `value`
              onChange={(e) => setMaterial(e.target.checked)}  // Use `checked` for booleans
              style={styles.checkbox}  // Added checkbox styling
            />
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Preferred Color/Combinations:</label>
            <input
              type="text"
              value={preferred_Color}
              onChange={(e) => setPreferredColor(e.target.value)}
              style={styles.input}
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
          <button onClick={() => navigate("/client-home")} style={styles.button}>
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

// Inline styles
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
    margin: "50px auto",
    padding: "40px",
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Increased opacity for better readability
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Stronger shadow for better contrast
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
    border: "1px solid #ccc", // Add a border to the table
  },
  tableHeader: {
    backgroundColor: "#007bff", // Add color to table headers
    color: "#fff",
    padding: "10px",
  },
  tableData: {
    padding: "10px",
    border: "1px solid #ccc", // Add border to each cell
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
    width: "100%", // Ensure the textarea takes full width
  },
  input: {
    padding: "10px",
    fontSize: "1rem",
    width: "100%",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  fieldGroup: {
    marginBottom: "20px", // Group fields and add spacing
  },
  checkbox: {
    marginLeft: "10px",
    transform: "scale(1.2)", // Enlarge the checkbox
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
    marginBottom: "10px", // Ensure proper spacing between buttons
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between", // Space out buttons
    marginTop: "20px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
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
  successMessage: {
    color: "green",
    fontSize: "1.2rem", // Slightly increased size for visibility
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px",
  },
  errorMessage: {
    color: "red",
    fontSize: "1rem",
    textAlign: "center",
    marginBottom: "20px",
  },
};

export default OrderForm;
