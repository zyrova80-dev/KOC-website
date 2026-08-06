import { useState, useEffect } from "react";
import "../App.css"
import logo from "../assets/logo3.png";
import{ addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import TeamSection from "../components/public/TeamSection";
import {
  FaBalanceScale,
  FaUserTie,
  FaHandshake,
  FaClock,
  FaUsers,
  FaGlobeAfrica,
} from "react-icons/fa";
import { useCompanySettings } from "../hooks/useCompanySettings";
import { Card, Spinner } from "../components/ui";

const iconMap = {
  FaBalanceScale,
  FaUserTie,
  FaHandshake,
  FaClock,
  FaUsers,
  FaGlobeAfrica,
} as const;

type Feature = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

function Home() {
  const { settings, loading } = useCompanySettings();

  const company = settings;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feature, setFeature] = useState<Feature[]>([]);

  useEffect(() => {
    const fetchFeatures = async () => {
      const querySnapshot = await getDocs(collection(db, "features"));

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Feature, "id">),
      }));

      setFeature(data);
    };

    fetchFeatures();
  }, []);

if (loading) {
    return (
        <Spinner text="Loading..." />
    );
}
    console.log(feature);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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

    setIsSubmitting(true);

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
      setIsSubmitting(false);
    }
  }
  return (
    <>
    <nav>
      <div className="logo">
        <img
  src={company?.logo || logo}
  alt={company?.companyName || "Company Logo"}
/>
      </div>
        <ul>
          <li><a href="#hero">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#features">Why Us</a></li>
          <li><a href="#team">Team</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
    </nav>

    <section className="hero" id="hero">
      <div className="hero-content">
        <h1>{company?.companyName}</h1>
        <h2>{company?.tagline}</h2>
          <p>{company?.description}</p>
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

        <Card title="Property Valuation">
          <p>
            Accurate Property valuation for residential, commercial, industrial, and special-purpose 
            properties.
          </p>
        </Card>
        
        <Card title="Estate Management">
          <p>
            Professional management of residential and commecial properties to maximise value
            and efficiency.
          </p>
        </Card>
        
        <Card title="Property Consultancy">
          <p>
            Expert advice on property investment, acquisition, development, and real estate decisions.
          </p>
        </Card>
      </div>
    </section>

    <section className="features" id="features">
      <h2>Why Choose Us</h2>
      <div className="feature-grid">
        {feature.map((feature) => {
          const Icon = iconMap[feature.icon as keyof typeof iconMap];

          return (
            <div className="feature-card" key={feature.id}>
              {Icon && <Icon size={40} className="feature-icon" />}
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          );
    })}
      </div>
    </section>
    <TeamSection />
    <section className="contact" id="contact">
      <h2>Contact Us</h2>

     <div className="contact-container">
      
      <div className="contact-info">
        <h3>Get in touch</h3>
       <p>{company?.address}</p>

        <p><strong>Phone</strong></p>
        <p>{company?.phone1}</p>
        <p>{company?.phone2}</p>

        <p><strong>Email</strong></p>
        <p>{company?.email}</p>
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

<button type="submit" disabled={isSubmitting}>
  {isSubmitting ? "Sending..." : "Send Message"}
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