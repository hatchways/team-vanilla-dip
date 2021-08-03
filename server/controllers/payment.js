const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const asyncHandler = require('express-async-handler');
const Contest = require('../models/Contest');
const User = require('../models/User');

//Based on ContestID, create a session and send a session id
exports.createCheckoutSession = asyncHandler(async (req, res) => {
  const { contestID } = req.params;
  const userID = req.user.id;
  try {
    const contest = await Contest.findById(contestID);
    const user = await User.findById(userID);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: user.email,
      client_reference_id: contestID,
      line_items: [
        {
          name: contest.title,
          description: contest.description,
          amount: contest.prizeAmount * 100,
          currency: 'cad',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.WEB_APP_URL}/`,
      cancel_url: `${process.env.WEB_APP_URL}/contest`,
    });

    res.status(201).json({
      status: 'success',
      session,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

//create a customer
exports.createCustomer = asyncHandler(async (req, res) => {
  const userID = req.user.id;

  try {
    const user = await User.findById(userID);

    const customer = await stripe.customers.create({
      email: user.email,
      name: user.username,
    });

    res.status(201).json({
      status: 'success',
      customer,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
});
