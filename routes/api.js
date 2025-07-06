const express = require("express");
const router = express.Router();
const axios = require("axios");

require("dotenv").config();

router.post("/chat", async (req, res) => {
  const { messages } = req.body;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: messages,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("Error from GPT:", error.message);
    res.status(500).json({ error: "Failed to connect to GPT" });
  }
});

module.exports = router;
