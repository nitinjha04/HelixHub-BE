const express = require("express");
const { Auth } = require("../middlewares/auth.middlewares");
const { PaymentController } = require("../controllers/payment.controller");

const router = express.Router();

//get requests
router.get("/", [Auth], PaymentController.getAllPayments);

//post requests
router.post("/create", PaymentController.createPayment);

//put requests
// router.put("/update/:id",  PaymentController.editCurrentUser);

module.exports.PaymentRouter = router;
