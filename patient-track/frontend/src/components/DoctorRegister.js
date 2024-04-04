import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DoctorRegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/register/doctor', formData)
      .then(response => {
        console.log(response.data.message);
        // Handle successful registration
      })
      .catch(error => {
        console.error('Error registering doctor:', error);
        // Handle registration error
      });
  };

  return (
    <div>
      <h2>Doctor Registration</h2>
      <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </label>
      <button type="submit">Register</button>
    </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default DoctorRegistrationForm;
