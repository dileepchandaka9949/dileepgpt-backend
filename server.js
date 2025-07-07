const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Important: This helps read JSON in the body
app.use(express.json());

// ✅ Temporary test route to check POST
app.post('/', (req, res) => {
  console.log('Request Body:', req.body);
  res.json({
    status: 'success',
    message: 'POST request received successfully',
    data: req.body
  });
});

// ✅ Start your server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
