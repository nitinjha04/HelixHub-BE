const express = require("express");
const { UserController } = require("../controllers/user.controllers");
const { Auth } = require("../middlewares/auth.middlewares");
const fileUploadMiddleware = require("../middlewares/file-upload.middlewares");

const router = express.Router();

//get requests
router.get("/", [Auth], UserController.getAllUsers);
router.get("/own", [Auth], UserController.getCurrentUser);
router.get("/:id", [Auth], UserController.getUserDetails);

//post requests
router.post("/login", UserController.loginViaPassword);
router.post(
  "/createUser",
  
  UserController.createUserWithoutPassword
);
router.post("/register", UserController.createNewUser);

//put requests
router.put("/update/:id",  UserController.editCurrentUser);

module.exports.UserRouter = router;
