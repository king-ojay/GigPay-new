// backend/routes/payments.js
const express = require('express');
const router = express.Router();
const Stripe = require('stripe');

// Check that our secret key is loaded
console.log('🔑 STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY?.slice(0, 10) + '…');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Test route to confirm mounting
router.post('/test', (req, res) => {
  console.log('✅ [payments:test] route hit');
  res.json({ message: 'Payments test route working' });
});

// Create Payment Intent
router.post('/create-payment-intent', async (req, res) => {
  console.log('📥 [payments:create-payment-intent] body:', req.body);

  try {
    const { amount } = req.body;
    if (!amount) {
      console.warn('⚠️ Missing amount in request');
      return res.status(400).json({ error: 'Amount is required' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });

    console.log('✅ PaymentIntent created:', paymentIntent.id);
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('❌ Stripe error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
