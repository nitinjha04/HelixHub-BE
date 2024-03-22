const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    dueDate: {
      type: String,
    },
    status: {
      type: String,
    },
    amount: {
      type: Number,
    },
    for: {
      type: String,
      enum: ["Teacher", "Student"],
    },
    type: {
      type: String,
      enum: ["Salary", "Fees"],
    },
    paymentMode: {
      type: String,
      enum: ["Card", "Cash"],
    },
  },
  {
    timestamps: true,
  }
);

exports.Payment = mongoose.model("Payment", Schema);
