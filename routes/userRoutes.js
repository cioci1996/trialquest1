const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');

// GET /api/users/me
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user profile' });
  }
});

// PUT /api/users/update
router.put('/update', auth, async (req, res) => {
  const { username, bio, avatar } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (username) user.username = username;
    if (bio) user.bio = bio;
    if (avatar) user.avatar = avatar;

    await user.save();
    res.json({ message: 'Profile updated', user });
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile' });
  }
});

module.exports = router;
