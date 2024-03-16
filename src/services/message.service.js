const { Message } = require("../models/message.modal");
const BasicServices = require("./basic.service");

class MessageService extends BasicServices {
  constructor() {
    super(Message);
  }
  aggregate = (filter) => {
    return this.modal.aggregate([...filter]);
  };
}

module.exports.MessageService = new MessageService();
