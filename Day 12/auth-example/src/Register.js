import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [form, setForm] = useState({ username: '', password: '', role: '' });
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3005/register', form);
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error registering user');
        }
    };

    return (
        <div>
            <h1>Register</h1>
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
                <input
                    type="text"
                    placeholder="Role (user/admin)"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                />
                <button type="submit">Register</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

export default Register;
