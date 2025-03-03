import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '../App';
import Login from '../pages/Login'; // Assure-toi que le chemin est correct
import { AuthProvider } from '../context/authContext';  

const AppRoutes = () => {
  return (
    <AuthProvider>
    <Router> {/* Ajoute le basename ici */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default AppRoutes;