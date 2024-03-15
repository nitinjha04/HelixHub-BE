const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    message: {
      text: { type: String, require: true },
    },
    users: Array,
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

exports.User = mongoose.model("Message", Schema);
