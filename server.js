const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ MongoDB Direct Connection (no .env)
mongoose.connect(
  'mongodb+srv://chandakadileep9949:dileepchandaka9110509792@cluster0.97rn9mq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB error:', err));

// ✅ OpenAI Configuration (Direct key here)
const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

// Routes
app.get('/', (req, res) => {
  res.send('✅ DileepGPT Backend is running');
});

app.post('/api/message', async (req, res) => {
  try {
    const userMessage = req.body.message;
    if (!userMessage) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userMessage }],
    });

    const botReply = response.data.choices[0].message.content;
    res.json({ reply: botReply });
  } catch (error) {
    console.error('❌ OpenAI Error:', error.message);
    res.status(500).json({ error: 'Failed to get GPT reply' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
