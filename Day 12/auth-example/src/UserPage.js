import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserPage({ token }) {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3005/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMessage(response.data.message);
            } catch (error) {
                setMessage('Error fetching user data');
            }
        };

        if (token) fetchData();
    }, [token]);

    return (
        <div>
            <h1>User Page</h1>
            <p>{message || 'Loading...'}</p>
        </div>
    );
}

export default UserPage;
