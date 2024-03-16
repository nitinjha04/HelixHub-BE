const mongoose = require("mongoose");
const Response = require("../helpers/Response.helpers");
const { MessageService } = require("../services/message.service");

class MessageController {
  getAllMessages = async (req, res) => {
    const id = req.user._id;
    const messages = await MessageService.aggregate([
      {
        $match: {
          $or: [
            { receiver: id, sender: { $ne: id } }, // If you are the receiver and not the sender
            { sender: id, receiver: { $ne: id } }, // If you are the sender and not the receiver
          ],
        },
      },
      {
        $addFields: {
          oppositeUser: {
            $cond: [
              { $eq: ["$sender", id] }, // If you are the sender
              "$receiver", // Populate receiver
              "$sender", // Otherwise, populate sender
            ],
          },
        },
      },
      {
        $lookup: {
          from: "users", // Assuming the collection name is "users"
          localField: "oppositeUserId",
          foreignField: "_id",
          as: "oppositeUserDetails",
        },
      },
    ]).sort({ createdAt: -1 });
    // .populate("sender");
    Response(res).body({ messages }).send();
  };

  getMessage = async (req, res) => {
    const { receiver } = req.body;
    const from = req.user._id;

    const messages = await MessageService.find({
      $or: [
        { receiver: receiver, sender: from },
        { receiver: from, sender: receiver },
      ],
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });

    Response(res).body(messages).send();
  };

  sendMessage = async (req, res) => {
    const { receiver, message } = req.body;
    const from = req.user._id;
    const data = await MessageService.create({
      message: { text: message.text },
      // users: [from, receiver],
      sender: from,
      receiver: receiver,
    });
    Response(res).body(data).send();
  };
}

module.exports.MessageController = new MessageController();
