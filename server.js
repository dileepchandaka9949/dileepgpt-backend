const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const { OpenAI } = require("openai");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Mongoose Schema
const MessageSchema = new mongoose.Schema({
  user: String,
  bot: String,
});
const Message = mongoose.model("Message", MessageSchema);

// OpenAI Setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Health check
app.get("/", (req, res) => {
  res.send("✅ DileepGPT Backend is Running");
});

// Chat Route
app.post("/api/message", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    const reply = response.choices[0].message.content;

    const newMessage = new Message({ user: message, bot: reply });
    await newMessage.save();

    res.json({ reply });
  } catch (error) {
    console.error("❌ GPT Error:", error.message);
    res.status(500).json({ error: "Failed to get GPT reply" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
