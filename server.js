const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

// OpenAI setup
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Route
app.post("/api/message", async (req, res) => {
  const { message } = req.body;
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });
    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error("GPT Error:", error.message);
    res.status(500).json({ error: "Failed to get GPT reply" });
  }
});

app.get("/", (req, res) => {
  res.send("DileepGPT backend is working");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
