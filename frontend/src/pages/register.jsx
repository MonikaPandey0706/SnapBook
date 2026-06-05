import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register({ setUser }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      alert(res.data.message);

      if (res.data.user) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      alert("Registration Failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Create password"
            onChange={handleChange}
            required
          />

          <button type="submit">Register</button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;