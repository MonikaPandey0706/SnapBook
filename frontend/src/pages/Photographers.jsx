import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Photographers() {
  const [photographers, setPhotographers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/photographers")
      .then((res) => {
        setPhotographers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleBookNow = (photographer) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first to book a photographer");
      navigate("/login");
      return;
    }

    navigate("/booking", {
      state: { photographer }
    });
  };

  return (
    <div className="photographers-page">
      <h2>Explore Photographers</h2>

      <p className="photographers-subtitle">
        Find trusted photographers for your special moments.
      </p>

      <div className="photographer-grid">
        {photographers.map((photographer) => (
          <div className="photographer-card" key={photographer._id}>
            <img src={photographer.image} alt={photographer.name} />

            <div className="photographer-info">
              <h3>{photographer.name}</h3>
              <p>{photographer.category} Photographer</p>
              <p>📍 {photographer.location}</p>
              <p>⭐ {photographer.rating}</p>
              <p className="price">₹{photographer.price}</p>

              <button onClick={() => handleBookNow(photographer)}>
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Photographers;