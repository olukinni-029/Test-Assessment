require('dotenv').config();
const jwt = require( "jsonwebtoken");


const isAuthenticated = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
       res.status(401).json ( "Authentication failed")
       return;
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      if (!decoded) {
        res.status(401).json("Authentication failed")
        return;
    };
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json("Authentication failed: 🔒🔒🔒🔒🔒");
    }
  };
  
  const createJwtToken = (payload) => {
    const expiresIn = '2days';
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn
    });
    return token;
  };
  
  const verifyJwtToken = (token, next) => {
    try {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      return userId;
    } catch (err) {
      next(err);
    }
  };

  module.exports =  {isAuthenticated,createJwtToken,verifyJwtToken};