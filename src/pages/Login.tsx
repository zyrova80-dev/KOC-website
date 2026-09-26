import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "./Login.css";
import { Button, Card, Input } from "../components/ui";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Login button clicked");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-container">
      <Card >
          <h2>KOC Admin Login</h2>
        <p>Staff Login</p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleLogin}>

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required name={""}          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required name={""}          />

          <Button type="submit">
            Login
          </Button>

        </form>

      </Card>
    </div>
  );
}

export default Login;