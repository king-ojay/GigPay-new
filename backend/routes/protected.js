const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/admin-data', authMiddleware, roleMiddleware('admin'), (req, res) => {
  res.json({ message: 'Welcome admin!', data: 'Super secret admin stuff' });
});


router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({
    message: `Welcome, ${req.user.name}!`,
    user: req.user
  });
});

module.exports = router;
