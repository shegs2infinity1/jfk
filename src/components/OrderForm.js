// OrderForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/OrderForm.css";
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
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [maildata, setMaildata] = useState({
    message: "",
    subject: "",
    username: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users/userprofile");
      setProfiles(response.data);
    } catch (error) {
      console.error("Error fetching user profiles:", error);
    }
  };

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

  const handleProfileChange = (event) => {
    resetForm();
    const username = event.target.value;
    setSelectedProfile(username);
    fetchMeasurements(username);
  };

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

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const orderresponse = await axios.post("http://localhost:8000/api/users/orders/new/", {
        measurements,
        comments,
        expected_date: expectedDate,
        event_type: eventType,
        material,
        preferred_Color: preferredColor,
        username: selectedProfile || username,
        client: selectedProfile || username,
      });

      
      maildata.message = `
          <p>Dear <strong>${selectedProfile || username} </strong>,</p>
          <p>Your Order with order number ${orderresponse.data.id} has been successfully booked with JFK Tailor Shop.</p>
          <p><strong>Expected Delivery Date:</strong> ${expectedDate}</p>
          <p><strong>Preferred Color:</strong> ${preferredColor}</p>
          <p><strong>Event Type:</strong> ${eventType}</p>
          <p>Thank you for choosing JFK Tailor Shop.</p>
        `;
      maildata.subject = `Your Order (${orderresponse.data.id}) with JFK`;
      maildata.username = orderresponse.data.client;
      
      setMaildata(maildata);

      await axios.post("http://localhost:8000/api/users/notifications/email", maildata);
      setSuccess(true);
      setShowConfirmationModal(false);
      resetForm();
    } catch (error) {
      console.error("Error placing order:", error);
      setError("Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setMeasurements("");
    setExpectedDate("");
    setEventType("");
    setMaterial(false);
    setPreferredColor("");
    setComments("");
    setUserStats("");
    setClient("");
    setError("");
    setSelectedProfile("");
  };

  const handleBackHome = () => {
    navigate(role === "client" ? "/client-home" : "/admin/dashboard");
  };

  const closeModal = () => setSuccess(false);

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    setShowConfirmationModal(true);
  };

  return (
    <div className="order-form-page" style={{ backgroundImage: `url(${orderFormBackground})` }}>
      <div className="order-form-container">
        <h2>Place a New Order</h2>
        {error && <p className="error-message">{error}</p>}

        {role === "admin" && (
          <div className="field-group">
            <label>Select Client: </label>
            <select value={selectedProfile} onChange={handleProfileChange} className="input">
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
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Body Part</th>
                <th>Current Measurement</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(userStats).map((key) => (
                <tr key={key}>
                  <td>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                  <td>{userStats[key]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <form onSubmit={handleConfirmOrder} className="form">
          <div className="field-group">
            <label>Measurements:</label>
            <textarea
              value={measurements}
              onChange={(e) => setMeasurements(e.target.value)}
              required
              className="textarea"
              placeholder="Enter custom measurements"
            />
          </div>
          <div className="field-group">
            <label>Comments:</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="textarea"
              placeholder="Enter any additional comments"
            />
          </div>
          <div className="field-group">
            <label>Expected Delivery Date:</label>
            <input
              type="date"
              value={expectedDate}
              onChange={(e) => setExpectedDate(e.target.value)}
              className="input"
              required
            />
          </div>
          <div className="field-group">
            <label>Event Type:</label>
            <input
              type="text"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="input"
              required
            />
          </div>
          <div className="field-group">
            <label>Will We Provide Material?</label>
            <input
              type="checkbox"
              checked={material}
              onChange={(e) => setMaterial(e.target.checked)}
              className="checkbox"
            />
          </div>
          <div className="field-group">
            <label>Preferred Color/Combinations:</label>
            <input
              type="text"
              value={preferredColor}
              onChange={(e) => setPreferredColor(e.target.value)}
              className="input"
              placeholder="Enter preferred colors"
            />
          </div>
          <button type="submit" className="button">
            Place Order
          </button>
        </form>

        <div className="button-group">
          <button onClick={() => navigate("/orders")} className="button">
            View Orders
          </button>
          <button onClick={handleBackHome} className="button">
            Go to Home
          </button>
        </div>

        {showConfirmationModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Confirm Order</h3>
              <p>Are you sure you want to place this order?</p>
              <button onClick={handleSubmit} className="confirm-button" disabled={submitting}>
                {submitting ? "Please wait..." : "Submit Order"}
              </button>
              <button onClick={() => setShowConfirmationModal(false)} className="close-button">
                Cancel
              </button>
            </div>
          </div>
        )}

        {success && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Success!</h3>
              <p>Your order has been placed successfully.</p>
              <p>You should get a notification about the order shortly.</p>
              <button onClick={closeModal} className="close-button">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderForm;
