import React, { useState } from 'react';
import axios from 'axios';

function Login({ setToken }) {
    const [form, setForm] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(username.length<5){
                showError("Invalid username")
            }
            else{
                const response = await axios.post('http://localhost:3005/login', form);

                // setToken(response.data.token); // Save the token in App state
                localStorage.setItem('authToken', response.data.token);
                setMessage('Login successful!');
            }
          
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error logging in');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button type="submit">Login</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

export default Login;
