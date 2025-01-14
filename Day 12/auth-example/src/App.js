import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import UserPage from './UserPage';

function App() {
    const [token, setToken] = useState(null);

    return (
        <Router>
            <nav>
                <Link to="/register">Register</Link> | <Link to="/login">Login</Link> | <Link to="/user">User</Link>
            </nav>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login setToken={setToken} />} />
                <Route path="/user" element={<UserPage token={token} />} />
            </Routes>
        </Router>
    );
}

export default App;
