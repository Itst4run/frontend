// // src/pages/LoginPage.js
// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const LoginPage = () => {
//   const { login } = useContext(AuthContext);
//   const [form, setForm] = useState({ email: '', password: '' });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // const response = await axios.post('http://localhost:5000/api/user/login', form);
//     // login(response.data.token);
//     // navigate('/create');

//     try {
      
//     const response = await axios.post('http://localhost:5000/api/user/login', form);
//     console.log("response user",response.data);
//     login(response.data.token,response.data.email);

//       if (response.status === 200) {
//         // alert('User created successfully!'); // Alert for successful registration
//         // setForm({ email: '', password: '' }); // Clear form fields
//         navigate('/create');
        
//       }
//     } catch (err) {
//       console.log(err.response?.data?.message || 'Registration failed!'); // Handle errors
//       alert('Error logging in !'); // Alert for failed registration
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
//       <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default LoginPage;


import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', form);
      console.log("response user", response.data);
      login(response.data.token, response.data.email);

      if (response.status === 200) {
        navigate('/create');
      }
    } catch (err) {
      console.log(err.response?.data?.message || 'Login failed!');
      alert('Error logging in!');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
