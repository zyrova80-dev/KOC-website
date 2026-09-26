
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Features from "./pages/Features";
import ContentManager from "./pages/ContentManager";
import { Settings } from "./pages/Settings";
import Team from "./pages/Team";
import Services from "./pages/Services/Services";


import "./styles/ui/variables.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<Admin />} />

        <Route path="/features" element={<Features />} />

        <Route path="/content" element={<ContentManager />} />

        <Route path="/settings" element={<Settings />} />

        <Route path="/team" element={<Team />} />

        <Route path="/services" element={<Services />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
