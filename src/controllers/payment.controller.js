const HttpError = require("../helpers/HttpError.helpers");
const Response = require("../helpers/Response.helpers");
const { PaymentService } = require("../services/payment.service");
const { UserService } = require("../services/user.service");

class PaymentController {
  getAllPayments = async (req, res) => {
    if (req.user.role !== "Admin") {
      throw new HttpError(401, "unauthorized");
    }

    const payment = await PaymentService.find({});
    Response(res).body(payment).send();
  };

  createPayment = async (req, res) => {
    const { amount, paymentMode, userId } = req.body;

    const user = await UserService.findById(userId);

    if (!user) {
      throw new HttpError(401, "User Not Exists");
    }

    const payment = await PaymentService.create({
      amount,
      paymentMode,
      for: user.role,
      type: user.role === "Teacher" ? "Salary" : "Fees",
    });

    await UserService.findByIdAndUpdate(userId, {
      $push: {
        payments: payment._id,
      },
    });

    Response(res).body(payment).send();
  };
}

module.exports.PaymentController = new PaymentController();
