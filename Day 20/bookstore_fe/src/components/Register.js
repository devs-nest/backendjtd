import React, { useState } from "react";
import axios from 'axios'
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async(e)=>{
    try {
        const response = await axios.post('http://localhost:3001/api/auth/register', {
         email, password,
        });

        console.log(response.data);
    } catch (error) {
        console.error('Error during registration:', error);
    }
  }
  return (
    <div>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
