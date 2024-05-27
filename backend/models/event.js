// models/event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: String,
  date: Date,
  location: String,
  description: String
});

module.exports = mongoose.model('Event', eventSchema);
