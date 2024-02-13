// middleware/authenticateToken.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const tokens = req.header('Authorization');
  const token = tokens.split(' ')[1];
  console.log('Received Token:', token);

  if (!token) {
    return res.status(401).send('Access denied. Token is missing.');
  }

  jwt.verify(token, 'secretKey', (err, user) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(403).send('Invalid token.');
    }
    console.log('User authenticated:', user);
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
