const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

exports.Message = mongoose.model("Message", Schema);
