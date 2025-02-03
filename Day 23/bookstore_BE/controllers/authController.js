const authServices = require("../services/authServices");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config(); 
const JWT_SECRET = process.env.JWT_SECRET
const login = async (req, res) => {
    const { email, password } = req.body;
      try {
        const result = await authServices.login({email})
        console.log(result.rows)
        if (result.rows.length === 0) {
          return res.status(401).json({ message: "User doest not exist" });
        }
        const user = result.rows[0];
        console.log("Entered Password:", password);
        console.log("Stored Hashed Password:", user.password);
        const passwordMatch = await bcrypt.compare(password.trim(), user.password.trim());
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
      } 
};

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = authServices.register({name,email,password:hashedPassword,role});
    console.log(user);
    res.status(201).json({ message: "user registered" });
  } catch (error) {
    console.log(error);
  } 
};

module.exports = {
  login,
  register,
};
