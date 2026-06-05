import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Photographers from "./pages/Photographers";

import baby from "./assets/baby_photoshoot.jpg";
import birthday from "./assets/birthday.jpg";
import hero from "./assets/hero.png";
import marriage from "./assets/marriage_photoshoot.jpg";
import maternity from "./assets/maternity.jpg";
import model from "./assets/model_photoshoot.jpg";
import prewedding from "./assets/prewedding.jpg";
import travel from "./assets/travel.jpg";
import Booking from "./pages/Booking";

function Home() {
  const heroStyle = {
    "--img1": `url(${marriage})`,
    "--img2": `url(${birthday})`,
    "--img3": `url(${maternity})`,
    "--img4": `url(${baby})`,
    "--img5": `url(${model})`,
    "--img6": `url(${prewedding})`,
    "--img7": `url(${travel})`,
  };

  return (
    <>
      <section className="hero" style={heroStyle}>
        <div className="hero-content">
          <p className="tagline">Photography for every special moment</p>

          <h1>
            Capture Your Best <br />
            Moments
          </h1>

          <p>
            Book trusted photographers for weddings, birthdays, maternity, baby
            shoots, travel memories, model portfolios and pre-wedding events.
          </p>

          <Link to="/photographers">
            <button>Explore Photographers</button>
          </Link>
        </div>
      </section>

      <section className="services">
        <h2>Popular Photoshoot Categories</h2>

        <div className="cards">
          <div className="card">
            <img src={marriage} alt="Marriage Photoshoot" />
            <h3>Marriage Photoshoot</h3>
            <p>Capture rituals, emotions and celebrations beautifully.</p>
          </div>

          <div className="card">
            <img src={birthday} alt="Birthday Photoshoot" />
            <h3>Birthday Photoshoot</h3>
            <p>Make birthdays, parties and surprises unforgettable.</p>
          </div>

          <div className="card">
            <img src={maternity} alt="Maternity Photoshoot" />
            <h3>Maternity Photoshoot</h3>
            <p>Celebrate motherhood with soft and elegant portraits.</p>
          </div>

          <div className="card">
            <img src={baby} alt="Baby Photoshoot" />
            <h3>Baby Photoshoot</h3>
            <p>Preserve your baby’s cutest early memories.</p>
          </div>

          <div className="card">
            <img src={model} alt="Model Photoshoot" />
            <h3>Model Portfolio</h3>
            <p>Create premium portraits for fashion and portfolios.</p>
          </div>

          <div className="card">
            <img src={prewedding} alt="Pre Wedding Photoshoot" />
            <h3>Pre-Wedding Shoot</h3>
            <p>Romantic couple shoots before the big day.</p>
          </div>

          <div className="card">
            <img src={travel} alt="Travel Photoshoot" />
            <h3>Travel Photography</h3>
            <p>Capture your journeys, trips and adventure stories.</p>
          </div>
        </div>
      </section>
    </>
  );
}

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 4300);
    const savedUser = JSON.parse(localStorage.getItem("user"));
    setUser(savedUser);

    return () => clearTimeout(timer);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <BrowserRouter>
      {showIntro && (
        <div className="lens-intro">
          <div className="intro-bg"></div>

          <div className="camera-lens">
            <div className="lens-glass">
              <img src={marriage} alt="lens view" />
            </div>
          </div>

          <div className="flash-screen"></div>
        </div>
      )}

      <div className={showIntro ? "website hidden" : "website show"}>
        <nav className="navbar">
          <div className="logo">
            <img src={hero} alt="SnapBook logo" />
            <h2>SnapBook</h2>
          </div>

          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/photographers">Photographers</Link>

            {user ? (
              <>
                <span className="username">👤 {user.name}</span>
                <button className="logout-btn" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photographers" element={<Photographers />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;