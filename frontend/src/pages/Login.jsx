import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setUser }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      alert(res.data.message);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      alert("Login Failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Welcome Back</h2>

        <form onSubmit={handleSubmit}>
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
            placeholder="Enter your password"
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p>
          New to SnapBook? <Link to="/register">Create Account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;