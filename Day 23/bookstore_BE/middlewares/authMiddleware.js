const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET

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

const authorizeRole = (role) =>{
    return (req,res,next) =>{
        if (req.user.role != role) {
            return res.status(403).json({ message: 'Access forbidden: Insufficient permissions' });
        }
        next();
    }
    
}

module.exports = {
    authenticateToken,
    authorizeRole
}