const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  customerName: String,
  email: String,
  phone: String,
  eventDate: String,
  eventType: String,
  message: String,
  photographerId: String,
});

module.exports = mongoose.model("Booking", bookingSchema);