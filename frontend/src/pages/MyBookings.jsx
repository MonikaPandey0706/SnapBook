import { useEffect, useState } from "react";
import axios from "axios";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/bookings")
      .then((res) => {
        const myBookings = res.data.filter(
          (booking) => booking.email === user?.email
        );
        setBookings(myBookings);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="my-bookings-page">
      <h2>My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="no-bookings">No bookings found.</p>
      ) : (
        <div className="booking-list">
          {bookings.map((booking) => (
            <div className="booking-card" key={booking._id}>
              <h3>{booking.photographerName}</h3>
              <p><b>Event:</b> {booking.eventType}</p>
              <p><b>Date:</b> {booking.eventDate}</p>
              <p><b>Location:</b> {booking.eventLocation || booking.location}</p>
              <p><b>Status:</b> {booking.status || "Pending"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;