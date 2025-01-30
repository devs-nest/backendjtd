const jwt = require("jsonwebtoken");
const JWT_SECRET =
  "bc08ac91d838862b7b43d2758983a367cf8c73368f98a228f70ced3ee3d6b753";
  
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