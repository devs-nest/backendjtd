import { createRequire } from "module";
const require = createRequire(import.meta.url);

global.require = require;

const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
// var nodemailer = require('nodemailer');
import { rateLimit } from 'express-rate-limit'
var cron = require('node-cron');


const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

cron.schedule('* * * * *', () => {
    console.log('running every minute 1, 2, 4 and 5');
  });


// Express app setup
const app = express();
const PORT = 3001;
const JWT_SECRET = 'bc08ac91d838862b7b43d2758983a367cf8c73368f98a228f70ced3ee3d6b753';

// PostgreSQL pool setup
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'jtd_new',
    password: '123',
    port: 5433,
});

// Middleware for parsing JSON
app.use(express.json());

// User Registration

app.get('/reset_password', limiter, (req, res) => {
	res.json({ message: `Welcome, use` });
})

app.post('/register', async (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.status(400).json({ message: 'Missing fields' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id',
            [username, hashedPassword, role]
        );
        res.status(201).json({ message: 'User registered', userId: result.rows[0].id });

        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        link = `${process.env.domain}/verify/${token}`


    } catch (error) {
        if (error.code === '23505') {
            res.status(400).json({ message: 'Username already exists' });
        } else {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

// User Login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Missing fields' });
    }

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = result.rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// app.get('/verify/:token', async (req, res) => {
//     const token = req.params.token
//     jwt.verify(token, JWT_SECRET, (err, user) => {
//         req.user = user;
//     })
//     if(user){
        
//     }
// });

// Authentication Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

// Authorization Middleware
const authorizeRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: 'Access forbidden: Insufficient permissions' });
        }
        next();
    };
};

// Admin Route
app.get('/admin', authenticateToken, authorizeRole('admin'), (req, res) => {
    res.json({ message: 'Welcome to the admin panel!' });
});

// User Route
app.get('/user', authenticateToken, (req, res) => {
    res.json({ message: `Welcome, user with ID: ${req.user.userId}` });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

