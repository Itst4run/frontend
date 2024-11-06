// // src/pages/RegisterPage.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const RegisterPage = () => {
//   const [form, setForm] = useState({ username: '', email: '', password: '' });
//   const [error, setError] = useState(''); 
//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const response = await axios.post('http://localhost:5000/api/user/register', form);
//       if (response.status === 201) {
//         alert('User created successfully!'); // Alert for successful registration
//         setForm({ username: '', email: '', password: '' }); // Clear form fields
//         navigate('/login'); // Navigate to login page after successful registration
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed!'); // Handle errors
//       alert('Registration failed!'); // Alert for failed registration
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input name="username" value={form.username} onChange={handleChange} placeholder="Username" required />
//         <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
//         <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" required />
//         <button type="submit">Register</button>
//       </form>
//       {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message if exists */}
//     </div>
//   );
// };

// export default RegisterPage;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/user/register', form);
      if (response.status === 201) {
        alert('User created successfully!');
        setForm({ username: '', email: '', password: '' });
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed!');
      alert('Registration failed!');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
        {error && <p className="text-danger mt-3">{error}</p>}
      </div>
    </div>
  );
};

export default RegisterPage;
