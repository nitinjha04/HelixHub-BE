const express = require("express");
const { MessageController } = require("../controllers/message.controller");
const { Auth } = require("../middlewares/auth.middlewares");

const router = express.Router();

// get request
router.get("/getAll", [Auth], MessageController.getAllMessages);

// post request
router.post("/get", [Auth], MessageController.getMessage);
router.post("/send", [Auth], MessageController.sendMessage);

module.exports.MessageRouter = router;
