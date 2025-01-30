import { createRequire } from "module";
const require = createRequire(import.meta.url);

global.require = require;

const { Pool } = require("pg");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require('cors');
import { rateLimit } from 'express-rate-limit'
// const { Client } = require('pg');

// Express app setup
const JWT_SECRET =
  "bc08ac91d838862b7b43d2758983a367cf8c73368f98a228f70ced3ee3d6b753";

const app = express();

app.use(express.json());
const PORT = 3005;
const client = new Pool({
  user: "postgres",
  host: "localhost",
  database: "jtd_new",
  password: "123",
  port: 5433,
});

app.use(cors()); // Enable CORS for all origins



const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.get('/reset_password', limiter, (req, res) => {
	res.json({ message: `Welcome, user` });
})



// // OR customize the configuration
// app.use(cors({
//     origin: 'https://example.com', // Allow only this origin
//     methods: ['GET', 'POST'],      // Allow only specific HTTP methods
//     allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
//     credentials: true              // Allow credentials (cookies, etc.)
// }));

// const runQuery = async () => {
//     try {
//         await client.connect(); // Connect to the database
//         const result = await client.query('SELECT * FROM users;'); // Raw SQL query
//         console.log(result.rows); // Output the results
//     } catch (err) {
//         console.error('Error executing query', err.stack);
//     } finally {
//         await client.end(); // Close the connection
//     }
// };

// runQuery();
// const authorizeRole = (role) =>{
//     // req.role_type = "admin"
//     next();
//     // return (req,res,next) =>{
//     //     if (req.user.role != role) {
//     //         return res.status(403).json({ message: 'Access forbidden: Insufficient permissions' });
//     //     }
//     //     next();
//     // }
    
// }

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    
    req.user = user
    next();
  });
};
// const runQuery = async () => {
//     try {
//         await client.connect(); // Connect to the database
//         const result = await client.query('SELECT * FROM customers;'); // Raw SQL query
//         console.log(result.rows); // Output the results
//     } catch (err) {
//         console.error('Error executing query', err.stack);
//     } finally {
//         await client.end(); // Close the connection
//     }
// };

// runQuery();

app.post("/register", async (req, res) => {
  console.log("HERE");
  const { username, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed password is", hashedPassword);
    await client.connect();
    const user = await client.query(
      "INSERT INTO users (username, password, role) VALUES ($1, $2, $3)",
      [username, hashedPassword, role]
    );

    console.log(user);
    res.status(201).json({ message: "user registered" });
  } catch (error) {
    console.log(error);
  } finally {
    client.end();
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    await client.connect();

    const result = await client.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "User doest not exist" });
    }
    user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    console.log(user)
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.log("error",error);
  } finally {
    client.end();
  }
});

app.get("/user", authenticateToken, (req, res) => {
  console.log("YAYYYYYY");
  res.json({ message: `Welcome, user with ID: ${req.user.role}` });
});

app.get("/admin", authenticateToken, (req, res) => {
    console.log("YAYYYYYY");
    res.json({ message: `Welcome, admin with ID: ${req.user.role}` });
  });
  

app.listen(PORT, () => {
  console.log("property of JTD BACKEND");
});


