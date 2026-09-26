import "./Admin.css";
import { useEffect, useState } from "react";
import { 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  writeBatch // Imported for batch updating old messages
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { FaCalendarDay, FaEnvelope, FaEnvelopeOpen } from "react-icons/fa";
import { Button, Card } from "../components/ui";
import Table from "../components/ui/Table";
import TableHead from "../components/ui/TableHead";
import TableBody from "../components/ui/TableBody";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  status?: string; // Added to track 'read' or 'unread'
  createdAt?: any;
};

function Admin() {
  const navigate = useNavigate();
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

    const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Helper function to check if a date is "Today"
  const isToday = (date: any) => {
    if (!date) return false;
    const d = date.toDate ? date.toDate() : new Date(date);
    const today = new Date();
    return (
      d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate()
    );
  };

  // Dynamic Counts
  const totalMessages = messages.length;
  const unreadMessages = messages.filter((m) => m.status !== "read").length;
  const todayMessages = messages.filter((m) => isToday(m.createdAt)).length;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "messages"));

        let data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Message, "id">),
        })) as Message[];

        // ==========================================
        // 1-WEEK AUTO-UPDATE LOGIC
        // ==========================================
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        
        let hasChanges = false;
        const batch = writeBatch(db);

        // Check each message
        data = data.map((m) => {
          // If it's unread and older than 7 days
          if (m.status !== "read" && m.createdAt) {
            const msgDate = m.createdAt.toDate ? m.createdAt.toDate() : new Date(m.createdAt);
            if (msgDate < oneWeekAgo) {
              // Queue update in Firestore
              batch.update(doc(db, "messages", m.id), { status: "read" });
              hasChanges = true;
              // Update local state immediately
              return { ...m, status: "read" };
            }
          }
          return m;
        });

        // Commit all the 1-week updates to Firebase at once
        if (hasChanges) {
          await batch.commit();
        }

        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  // Handle opening a message
  const handleViewMessage = async (msg: Message) => {
    // 1. Update Firestore database
    if (msg.status !== "read") {
      try {
        await updateDoc(doc(db, "messages", msg.id), { status: "read" });
      } catch (error) {
        console.error("Error updating message status:", error);
      }
    }

    // 2. Update local React state
    const updatedMsg = { ...msg, status: "read" };
    setSelectedMessage(updatedMsg);
    
    setMessages((prev) =>
      prev.map((m) => (m.id === msg.id ? { ...m, status: "read" } : m))
    );
  };

  return (
    <div className="dashboard">
      <Sidebar onLogout={handleLogout} />
      <main className="main-content">
        <header className="header">
          <h1>Dashboard</h1>
          <p>Welcome back.</p>
        </header>

        <section className="cards">
          <Card>
            <div className="card-summary">
              <h3>Total Messages</h3>
              <p>{totalMessages}</p>
              <FaEnvelope />
            </div>
          </Card>

          <Card>
            <div className="card-summary">
              <h3>Unread</h3>
              <p>{unreadMessages}</p>
              <FaEnvelopeOpen />
            </div>
          </Card>

          <Card>
            <div className="card-summary">
              <h3>Today's Messages</h3>
              <p>{todayMessages}</p>
              <FaCalendarDay />
            </div>
          </Card>
        </section>


        <section className="messages">
          <h2>Recent Messages</h2>

          {/* Fixed table structure to match the CSS wrapper */}
          <div className="table-container">
            <Table>
              <TableHead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </TableHead>
              <TableBody>
                {messages.map((msg) => (
                  // Added bold text for unread messages so they stand out
                  <tr key={msg.id} style={{ fontWeight: msg.status !== "read" ? "bold" : "normal" }}>
                    <td>{msg.name}</td>
                    <td>{msg.email}</td>
                    <td>
                      {msg.createdAt?.toDate
                        ? msg.createdAt.toDate().toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>{msg.status === "read" ? "Read" : "Unread"}</td>
                    <td>
                      <Button onClick={() => handleViewMessage(msg)}>
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </TableBody>
            </Table>
          </div>

          {selectedMessage && (
            <div className="message-modal">
              <h2>{selectedMessage.name}</h2>
              <p>
                <strong>Email:</strong> {selectedMessage.email}
              </p>
              <p>
                <strong>Message:</strong>
              </p>
              <p>{selectedMessage.message}</p>
              <Button onClick={() => setSelectedMessage(null)}>Close</Button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Admin;