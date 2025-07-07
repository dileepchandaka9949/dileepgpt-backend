const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Razorpay instance (test credentials)
const razorpay = new Razorpay({
  key_id: 'rzp_test_6aUdAJRGe6Glqm',         // replace with your key_id
  key_secret: 'zmb8GJyWuJr48I4EFtvbDaqF'     // replace with your key_secret
});

// ✅ Welcome route for browser
app.get('/', (req, res) => {
  res.send('✅ DileepGPT backend is running!');
});

// ✅ Route to verify Razorpay payment
app.post('/verify', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const sign = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto.createHmac('sha256', razorpay.key_secret)
                                  .update(sign.toString())
                                  .digest('hex');

  if (expectedSignature === razorpay_signature) {
    res.status(200).json({ success: true, message: 'Payment verified successfully' });
  } else {
    res.status(400).json({ success: false, message: 'Payment verification failed' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
