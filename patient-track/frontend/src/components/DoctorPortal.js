import React, { useState } from 'react';
import axios from 'axios';

const DoctorPortal = () => {
  const [patientName, setPatientName] = useState('');

  const handleCreatePatient = () => {
    axios.post('/api/create_patient', { name: patientName })
      .then(response => {
        console.log(response.data.message);
        // Handle successful patient creation
      })
      .catch(error => {
        console.error('Error creating patient:', error);
        // Handle patient creation error
      });
  };

  return (
    <div>
      <h2>Doctor Portal</h2>
      <div>
        <label>
          Patient Name:
          <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
        </label>
        <button onClick={handleCreatePatient}>Create Patient</button>
      </div>
    </div>
  );
};

export default DoctorPortal;
