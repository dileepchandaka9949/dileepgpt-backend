const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/chat', async (req, res) => {
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
          Authorization: `Bearer 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`
        }
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('GPT Error:', error.message);
    res.status(500).json({ reply: '❌ GPT Error. Try again.' });
  }
});

module.exports = router;
