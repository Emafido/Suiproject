import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your Pages
import Landing from "./Pages/Landing";
import Dashboard from "./Pages/Dashboard";
import CreateDrop from "./Pages/CreateDrop";
import Receiver from "./Pages/Receiver";
import History from "./Pages/History";
import Security from "./Pages/Security";
import HowItWorks from "./Pages/HowItWorks";
import Terms from "./Pages/Terms";
import Privacy from "./Pages/Privacy";
import Docs from "./Pages/Docs"; // <--- NEW IMPORT

function App() {
  return (
    <Router>
      <Routes>
        {/* --- LANDING & EDUCATIONAL ROUTES --- */}
        <Route path="/" element={<Landing />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/security" element={<Security />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/docs" element={<Docs />} /> {/* <--- NEW ROUTE */}
        {/* --- APP CORE ROUTES --- */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateDrop />} />
        <Route path="/claim" element={<Receiver />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
