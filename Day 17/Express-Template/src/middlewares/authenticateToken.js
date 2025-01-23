const authenticateToken = (req, res, next) => {
   
    console.log("Running here")
    return res.status(400).json({"message":"Blocked"})
    // next();
  };
  
module.exports = authenticateToken;