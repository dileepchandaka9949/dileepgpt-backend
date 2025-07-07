const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { Configuration, OpenAIApi } = require("openai");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// ✅ OpenAI API Setup
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// ✅ Main route for chat
app.post("/api/message", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "No message provided" });
  }

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // Or "gpt-4" if you want
      messages: [{ role: "user", content: message }],
    });

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("GPT Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get GPT reply" });
  }
});

// ✅ Root route
app.get("/", (req, res) => {
  res.send("✅ DileepGPT Backend is working!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
