import React, { useState } from "react";
import axios, { formToJSON } from 'axios'
function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer", 
  });

  const handleChange = (e) =>{
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  const handleRegister = async(e)=>{
    try {
        const response = await axios.post('http://localhost:3001/api/auth/register',formData);

        console.log(response.data);
    } catch (error) {
        console.error('Error during registration:', error);
    }
  }
  return (
    <div>
      <form onSubmit={handleRegister}>
      <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"

            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <select name="role" value={formData.role} onChange={handleChange}>
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
