const express = require('express');
const router = express.Router();

// Sample route to test if backend is working
router.get('/users', (req, res) => {
  res.json([]);
});

// You can add more routes here later

module.exports = router;
