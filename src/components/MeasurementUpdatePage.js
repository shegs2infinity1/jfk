// MeasurementUpdatePage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import backgroundImage from "../images/measurement_background_update.webp"; // Adjust the path as necessary

const MeasurementUpdatePage = () => {
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
  const [originalData, setOriginalData] = useState(null); // Store original measurements
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent multiple submissions
  // const [username, setUserName] = useState("");
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeasurements = async () => {
      //const username = localStorage.getItem("username");
      //setUserName(username);
      try {
        const response = await axios.get(
          "http://localhost:8000/api/users/measurements/view/",
          {
            params: { username },
          }
        );
        setUserData(response.data);
        setOriginalData(response.data); // Save original data for comparison
      } catch (error) {
        console.error("Error fetching measurements:", error);
        setError("Unable to fetch measurements.");
      }
    };

    fetchMeasurements();
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setShowConfirmModal(true); // Show comparison modal before submitting
  };

  const handleConfirmSubmission = async () => {
    if (isSubmitting) return; // Prevent double submission

    //const username = localStorage.getItem("username");
    try {
      setIsSubmitting(true); // Disable form during submission
      await axios.put("http://localhost:8000/api/users/measurements/update/", {
        ...userData,
        username,
      });
      setSuccessMessage("Measurements updated successfully!");
      setShowConfirmModal(false);
      setTimeout(() => {
        navigate(`/measurements/view/${username}`); // Redirect after successful update
      }, 2000);
    } catch (error) {
      console.error("Error updating measurements:", error);
      setError("Failed to update measurements.");
    } finally {
      setIsSubmitting(false); // Re-enable form submission
    }
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    setShowConfirmModal(false); // Close the modal
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2>Hello {username}, Please Update Your Measurements</h2>
        {error && <p style={styles.errorMessage}>{error}</p>}
        {successMessage && (
          <p style={styles.successMessage}>{successMessage}</p>
        )}
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Form Fields */}
          <div style={styles.inputGroup}>
            <div style={styles.inputWrapper}>
              <label style={styles.label}>Neck:</label>
              <input
                type="number"
                name="neck"
                value={userData.neck}
                onChange={handleChange}
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
                style={styles.input}
                required
              />
            </div>
          </div>
          {/* Additional form fields follow the same structure */}
          <button type="submit" style={styles.button}>
            Update Measurements
          </button>
        </form>

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              <h3>Hello {username}, Review Your Changes</h3>
              <p>Compare your current and updated measurements:</p>
              <table style={styles.comparisonTable}>
                <thead>
                  <tr>
                    <th>Body</th>
                    <th>Current</th>
                    <th>Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(userData).map((key) => (
                    <tr key={key}>
                      <td>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                      <td>{originalData?.[key]}</td>
                      <td>{userData[key]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <button
                  onClick={handleConfirmSubmission}
                  style={styles.confirmButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Confirm"}
                </button>
                <button onClick={handleCancel} style={styles.cancelButton}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Styles
const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage: `url(${backgroundImage})`,
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
    padding: "30px",
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent background
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  input: {
    padding: "10px",
    fontSize: "1rem",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "12px 20px",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  comparisonTable: {
    width: "100%",
    margin: "20px 0",
    borderCollapse: "collapse",
  },
  confirmButton: {
    padding: "10px 20px",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "green",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
  },
  cancelButton: {
    padding: "10px 20px",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#dc3545",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  inputGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  inputWrapper: {
    flex: "0 0 48%", // Ensure input fields take up 48% of the space
  },
};

export default MeasurementUpdatePage;
