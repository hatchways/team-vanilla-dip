const mongoose = require('mongoose');

const stripeCustomerSchema = new mongoose.Schema(
  {
    stripeCustomerID: {
      type: String,
      required: true,
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    cardSetupID:{
      type: String,
      required: true,
    }
  },
  { timestamps: true });

module.exports = Profile = mongoose.model('stripeCustomer', stripeCustomerSchema);
