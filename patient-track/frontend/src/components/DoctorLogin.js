import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DoctorLoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/login/doctor', formData)
      .then(response => {
        console.log(response.data.message);
        // Handle successful login
      })
      .catch(error => {
        console.error('Error logging in doctor:', error);
        // Handle login error
      });
  };

  return (
    <div>
      <h2 className='text-3xl text-white mb-5 font-bold'>Doctor Login</h2>
      <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" value={formData.username} onChange={handleChange} className='outline-none p-3 my-2 rounded-sm bg-gray-800 text-white' />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} className='outline-none p-3 my-2 rounded-sm bg-gray-800 text-white'/>
      </label>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
    
  );
};

export default DoctorLoginForm;
