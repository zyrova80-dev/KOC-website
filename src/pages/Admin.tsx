import "./Admin.css";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import "./Admin.css";
import { useNavigate } from "react-router-dom";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt?: any;
};


function Admin() {
  const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await signOut(auth);
    navigate("/");
  } catch (error) {
    console.error("Logout error:", error);
  }
};
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    useEffect(() => {
  const fetchMessages = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "messages"));

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Message, "id">),
      })) as Message[];

      console.log("Documents found:", querySnapshot.size);
      console.log("Data:", data);

      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  fetchMessages();
}, []);
  return (
    <div className="dashboard">

      <aside className="sidebar">
        <h2>KOC Admin</h2>

        <ul>
          <li>📊 Dashboard</li>
          <li>📨 Messages</li>
          <li onClick={handleLogout}>🚪 Logout</li>
        </ul>
      </aside>

      <main className="main-content">

        <header className="header">
          <h1>Dashboard</h1>
          <p>Welcome back.</p>
        </header>

        <section className="cards">

          <div className="card">
            <h3>Total Messages</h3>
            <h1>{messages.length}</h1>
          </div>

          <div className="card">
            <h3>Unread</h3>
            <h1>0</h1>
          </div>

          <div className="card">
            <h3>Today's Messages</h3>
            <h1>0</h1>
          </div>

        </section>

        <section className="messages">

          <h2>Recent Messages</h2>

          <table className="table-container">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>

                {messages.map((msg) => (
  <tr key={msg.id}>
    <td>{msg.name}</td>
    <td>{msg.email}</td>
    <td>
      {msg.createdAt?.toDate
        ? msg.createdAt.toDate().toLocaleDateString()
        : "N/A"}
    </td>
    <td>Unread</td>

<td>
  <button onClick={() => setSelectedMessage(msg)}>
  View
</button>
</td>
  </tr>
))}

            </tbody>

          </table>
          {selectedMessage && (
  <div className="message-modal">
    <h2>{selectedMessage.name}</h2>

    <p><strong>Email:</strong> {selectedMessage.email}</p>

    <p><strong>Message:</strong></p>

    <p>{selectedMessage.message}</p>

    <button onClick={() => setSelectedMessage(null)}>
      Close
    </button>
  </div>
)}

        </section>

      </main>

    </div>
  );
}

export default Admin;