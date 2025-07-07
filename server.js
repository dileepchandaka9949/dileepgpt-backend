const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// MongoDB setup (optional but required if using DB)
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("DileepGPT backend is working ✅");
});

// Chat route
app.post("/api/message", async (req, res) => {
  const userMessage = req.body.message;
  if (!userMessage) return res.status(400).json({ error: "Message missing" });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    });

    const botReply = response.choices[0].message.content;
    res.json({ reply: botReply });
  } catch (err) {
    console.error("GPT error:", err);
    res.status(500).json({ error: "Failed to get GPT reply" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
