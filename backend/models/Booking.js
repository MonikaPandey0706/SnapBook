const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    photographerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Photographer",
      required: true
    },
    photographerName: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    eventType: {
      type: String,
      required: true
    },
    eventDate: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    message: {
      type: String
    },
    status: {
      type: String,
      default: "Pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);