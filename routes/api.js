const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/pay', async (req, res) => {
  const { name } = req.body;
  try {
    const newUser = new User({ name, paid: true });
    await newUser.save();
    res.json({ success: true, message: '✅ Payment received. Chat unlocked!' });
  } catch (err) {
    res.status(500).json({ success: false, message: '❌ Error saving user.' });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find().sort({ date: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

module.exports = router;
