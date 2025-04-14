const express = require('express');
const router = express.Router();
const ShopItem = require('../models/ShopItem');
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');

// GET /api/shop - list items
router.get('/', async (req, res) => {
  try {
    const items = await ShopItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch shop items' });
  }
});

// POST /api/shop/purchase - spend points
router.post('/purchase', auth, async (req, res) => {
  const { itemId } = req.body;
  try {
    const item = await ShopItem.findById(itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    const user = await User.findById(req.userId);
    if (user.points < item.price) {
      return res.status(400).json({ message: 'Not enough points' });
    }

    user.points -= item.price;
    await user.save();

    res.json({ message: `You purchased ${item.name}`, user });
  } catch (err) {
    res.status(500).json({ message: 'Purchase failed' });
  }
});

module.exports = router;
