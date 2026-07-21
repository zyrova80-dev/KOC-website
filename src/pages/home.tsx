import { useState } from "react";
import "../App.css"
import logo from "../assets/logo3.png";
import{ addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!name.trim()) {
  alert("Please enter your name.");
  return;
}

if (!email.includes("@")) {
  alert("Please enter a valid email.");
  return;
}

if (message.trim().length < 10) {
  alert("Message must be at least 10 characters.");
  return;
}

  setLoading(true);

  try {
    await addDoc(collection(db, "messages"), {
      name,
      email,
      message,
      createdAt: new Date(),
    });

    setName("");
    setEmail("");
    setMessage("");

    alert("Message sent successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to send message.");
  } finally {
    setLoading(false);
  }
};
  return (
    <>
    <nav>
      <div className="logo">
        <img src={logo} alt="Kunle Owonikoko Consultings logo" />
      </div>
        <ul>
          <li><a href="#hero">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
    </nav>

    <section className="hero" id="hero">
      <div className="hero-content">
        <h1>Kunle Owonikoko Consultings</h1>
        <h2>Estate Surveryors & Valuers</h2>
          <p>
            Helping individuals, businesses, and organisations make informed property decisions with trusted
            valuation and consultancy services.
          </p>
          <a href="#contact" className="cont">Contact us</a>
      </div>
    </section>

    <section className="about" id="about">
      <div className="about-text">
        <h2>About us</h2>

          <p>
            Kunle Owonikoko Consultings is a professional firm of Estate Surveyors and valuers
            committed to delivering reliable property valuation, estate management, and real
            estate consultancy services.
          </p>
          <p>
            we combine integrity, professionalsim, and industry expertise to help individuals, businesses, and organisations
            make informed property decisions.
          </p>
      </div>
      
    </section>

    <section className="services" id="services">
      <h2>Our Services</h2>
      <div className="service-card">

        <div className="card">
          <h3>Property Valuation</h3>
          <p>
            Accurate Property valuation for residential, commercial, industrial, and special-purpose 
            properties.
          </p>
        </div>
        
        <div className="card">
          <h3>Estate Management</h3>
          <p>
            Professional management of residential and commecial properties to maximise value
            and efficiency.
          </p>
        </div>
        
        <div className="card">
          <h3>Property Consultancy</h3>
          <p>
            Expert advice on property investment, acquisition, development, and real estate decisions.
          </p>
        </div>
      </div>
    </section>

    <section className="contact" id="contact">
      <h2>Contact Us</h2>

     <div className="contact-container">
      
      <div className="contact-info">
        <h3>Get in touch</h3>
        <p><strong>Office Address</strong></p>
        <p>6th floor, Cocoa House Building,<br />Oba Adebimpe Road,<br />
        Dugbe, Ibadan, Nigeria</p>

        <p><strong>Phone</strong></p>
        <p>08033591114</p>
        <p>09052749685</p>

        <p><strong>Email</strong></p>
        <p>koc4ng@gmail.com</p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
  <input
    type="text"
    placeholder="Your Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
  />

  <input
    type="email"
    placeholder="Your Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />

  <textarea
    rows={6}
    placeholder="Your Message"
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    required
  />

<button type="submit" disabled={loading}>
  {loading ? "Sending..." : "Send Message"}
</button>
</form>
      </div> 
    </section>
          <Link to="/login">
        <button>Admin Dashboard</button>
      </Link>
    </>
  );
}

export default Home;