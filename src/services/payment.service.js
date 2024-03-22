const { Payment } = require("../models/payment.modal");
const BasicServices = require("./basic.service");

class PaymentService extends BasicServices {
  constructor() {
    super(Payment);
  }
}

module.exports.PaymentService = new PaymentService();
