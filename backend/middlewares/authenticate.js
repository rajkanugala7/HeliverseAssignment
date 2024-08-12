// middlewares/authenticate.js
const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  // Check if the Authorization header is present
  const authHeader = req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  // Extract the token from the Authorization header
  const token = authHeader.replace('Bearer ', '');

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the decoded user information to the request object
    req.user = decoded;
    
    // Call the next middleware or route handler
    next();
  } catch (error) {
    // Send a response if the token is invalid
    res.status(401).json({ message: 'Token is not valid' });
  }
};
