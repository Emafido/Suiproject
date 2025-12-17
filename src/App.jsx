import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your Pages
import Landing from './Pages/Landing';
import Dashboard from './Pages/Dashboard';
import CreateDrop from './Pages/CreateDrop'; // Make sure this file exists in Pages folder
import Receiver from './Pages/Receiver';

function App() {
  return (
    <Router>
      <Routes>
        {/* 1. The Home Page (Landing) */}
        <Route path="/" element={<Landing />} />

        {/* 2. The Dashboard (Your Main Hub) */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* 3. The Create Page (Packing the Box) */}
        <Route path="/create" element={<CreateDrop />} />

        {/* 4. The Receiver Page (Unlocking the Box) */}
        <Route path="/claim" element={<Receiver />} />
        
      </Routes>
    </Router>
  );
}

export default App;