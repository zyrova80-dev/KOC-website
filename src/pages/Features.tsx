import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import "./Features.css";
import { useNavigate } from "react-router-dom";

type Feature = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

function Features() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [features, setFeatures] = useState<Feature[]>([]);
  const navigate = useNavigate();

  // Fetch all features from Firestore
  const fetchFeatures = async () => {
    const snapshot = await getDocs(collection(db, "features"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Feature, "id">),
    }));

    setFeatures(data);
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  // Add a new feature
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !icon) {
      alert("Please fill in all fields.");
      return;
    }

    await addDoc(collection(db, "features"), {
      title,
      description,
      icon,
    });

    alert("Feature added!");

    setTitle("");
    setDescription("");
    setIcon("");

    fetchFeatures();
  };

  // Delete a feature
  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "features", id));
    fetchFeatures();
  };

  return (
    <div className="features-page">
        <button
  className="back-btn"
  onClick={() => navigate("/admin")}
>
  ← Back to Dashboard
</button>
      <h1>Features Management</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Feature Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />
        <br />

        <textarea
          placeholder="Feature Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br />
        <br />

        <select
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
        >
          <option value="">Select an Icon</option>
          <option value="FaBalanceScale">Balance Scale</option>
          <option value="FaUserTie">User Tie</option>
          <option value="FaHandShake">Handshake</option>
          <option value="FaClock">Clock</option>
          <option value="FaUsers">Users</option>
          <option value="FaGlobeAfrica">Globe Africa</option>
        </select>

        <br />
        <br />

        <button type="submit">Add Feature</button>
      </form>

      <hr />

      <h2>Current Features</h2>

      {features.length === 0 ? (
        <p>No features found.</p>
      ) : (
        <div className="features-grid">
          {features.map((feature) => (
            <div className="feature-card" key={feature.id}>
              <div className="card-header">
                <div className="card-info">
                  <h3>{feature.title}</h3>
                  <small>{feature.icon}</small>
                </div>

                <div className="card-actions">
                  <button className="edit-btn">
                    ✏️
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(feature.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Features;