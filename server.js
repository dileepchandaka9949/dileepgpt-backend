const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

app.use('/api', require('./routes/api'));

app.get('/', (req, res) => {
  res.send('✅ DileepGPT Backend is working!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
