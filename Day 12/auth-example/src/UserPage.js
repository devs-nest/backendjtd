import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserPage({ token }) {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await axios.get('http://localhost:3005/user', {
                //     headers: {
                //         Authorization: `Bearer ${token}`,
                //     },
                // });
                const response = await fetch("http://localhost:3005/user",{
                    method: 'GET',
                    headers : {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                        // 'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    // redirect to /login page and delete localStorage
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setMessage(data.message);
                
            } catch (error) {
                setMessage('Error fetching user data');
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>User Page</h1>
            <p>{message || 'Loading...'}</p>
        </div>
    );
}

export default UserPage;
