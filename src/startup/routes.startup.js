//middlewares
const express = require("express");
const morgan = require("morgan"); // for consoling api request calls
const helmet = require("helmet"); // secures connection by adding additional header
const cors = require("cors"); // handling cors errors
const ErrorHandler = require("../middlewares/error.middlewares"); // error handler for routes, since we will continue to next route upon request
const { default: axios } = require("axios");

//Routers
const { UserRouter } = require("../routes/users.routes");
const { MessageRouter } = require("../routes/message.routes");
const { PaymentRouter } = require("../routes/payment.routes");

module.exports = (app) => {
  app.use(express.json({ limit: "9999000009mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("tiny")); // initiating console api requests
  app.use(helmet());
  app.use(cors());

  //start of routes
  app.use("/api/user", UserRouter);
  app.use("/api/payment", PaymentRouter);
  app.use("/api/chat", MessageRouter);

  // handling async errors in api routes
  app.use(ErrorHandler);

  //adding additional api
  app.get("/", (req, res) =>
    res.send({
      error: false,
      message: "Backend Server IS LIVE!",
      result: null,
    })
  );
  app.get("*", (req, res) =>
    res
      .status(404)
      .send({ error: true, message: "Route not Found!", result: null })
  );
};

console.log("🛣️  Routes setup completed");
