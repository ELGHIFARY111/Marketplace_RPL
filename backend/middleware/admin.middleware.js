const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'zenvy_secret_key_2024';

const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });

    if (user.level !== 'admin') return res.status(403).json({ message: 'Access denied: not admin' });

    req.adminId = user.id; // mirip user
    next();
  });
};

module.exports = { verifyAdmin };