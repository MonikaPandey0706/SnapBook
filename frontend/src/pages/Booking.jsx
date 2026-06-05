import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const photographer = location.state?.photographer;

  const savedUser = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    userName: savedUser?.name || "",
    email: savedUser?.email || "",
    phone: "",
    eventType: photographer?.category || "",
    eventDate: "",
    location: "",
    message: ""
  });

  if (!photographer) {
    return (
      <div className="booking-page">
        <div className="booking-box">
          <h2>No Photographer Selected</h2>
          <p>Please select a photographer first.</p>
          <button onClick={() => navigate("/photographers")}>
            Go to Photographers
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const bookingData = {
        ...formData,
        photographerId: photographer._id,
        photographerName: photographer.name
      };

      const res = await axios.post(
        "http://localhost:5000/api/bookings",
        bookingData
      );

      alert(res.data.message);
      navigate("/photographers");
    } catch (error) {
      console.log(error);
      alert("Booking failed");
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-box">
        <h2>Book {photographer.name}</h2>

        <p className="booking-subtitle">
          {photographer.category} Photographer · ₹{photographer.price}
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="userName"
            placeholder="Your Name"
            value={formData.userName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="eventType"
            placeholder="Event Type"
            value={formData.eventType}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Event Location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Tell us about your event"
            value={formData.message}
            onChange={handleChange}
          ></textarea>

          <button type="submit">Submit Booking</button>
        </form>
      </div>
    </div>
  );
}

export default Booking;