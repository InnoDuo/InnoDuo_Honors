const mongoose = require('mongoose');

const userVerificationSchema = new mongoose.Schema({
  userId: String,
  uniqueString: String,
  createdAt: Date,
  expiresAt: Date,
});

module.exports = mongoose.model('userVerification', userVerificationSchema);