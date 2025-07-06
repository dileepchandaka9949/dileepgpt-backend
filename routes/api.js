const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/gpt', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('GPT Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error communicating with GPT' });
  }
});

module.exports = router;
