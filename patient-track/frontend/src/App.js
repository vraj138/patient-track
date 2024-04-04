import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorRegistrationForm from './components/DoctorRegister';
import DoctorLoginForm from './components/DoctorLogin';
import DoctorPortal from './components/DoctorPortal';

const App = () => {
  return (
    <Router>
      <div>
        <h1>Patient Tracker</h1>
        <Routes>
          <Route path="/login" element={<DoctorLoginForm />} />
          <Route path="/register" element={<DoctorRegistrationForm />} />
          <Route path="/doctor" element={<DoctorPortal />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
