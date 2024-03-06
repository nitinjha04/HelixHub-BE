const jwt = require("jsonwebtoken");
const HasherHelper = require("../helpers/Hasher.helper");
const HttpError = require("../helpers/HttpError.helpers");
const Response = require("../helpers/Response.helpers");
const { UserService } = require("../services/user.service");
const { JWT_EMAIL_VERIFY_SECRET } = process.env;

class UserController {
  createNewUser = async (req, res) => {
    const checkUser = await UserService.findOne({ email: req.body.email });
    console.log("---------------------");
    console.log(req.body);
    console.log("---------------------");

    if (checkUser) {
      throw new HttpError(401, "User Already Exists");
    }

    const user = await UserService.create({ ...req.body });

    const { generateRefreshToken, generateToken } = user.schema.methods;

    const accessToken = generateToken({
      _id: user._id,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      _id: user._id,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });

    const userRole = {
      role: user.role,
    };

    Response(res)
      .status(201)
      .body({
        accessToken,
        refreshToken,
        userRole,
      })
      .send();
  };

  loginViaPassword = async (req, res, next) => {
    const { email, password } = req.body;

    let user = await UserService.findOne({ email });

    if (!user) {
      throw new HttpError(404, "User Not Found");
    }

    const { generateRefreshToken, generateToken } = user.schema.methods;

    const isVerify = await HasherHelper.compare(password, user.password);
    if (!isVerify) throw new HttpError(401, "Invalid Credentials");

    const accessToken = generateToken({
      _id: user._id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = generateRefreshToken({
      _id: user._id,
      email: user.email,
      role: user.role,
    });
    Response(res)
      .status(201)
      .body({
        accessToken,
        refreshToken,
        role: user.role,
      })
      .send();
  };
  editCurrentUser = async (req, res) => {
    if (req.body.password) {
      const salt = await HasherHelper.getSalt(10);

      const hash = await HasherHelper.hash(req.body.password, salt);

      req.body.password = hash;
    }

    const user = await UserService.findByIdAndUpdate(req.user._id, {
      ...req.body,
    });

    if (!user) throw new HttpError(409, "User doesn't Exists!");

    Response(res).status(201).message("Successfully Updated!").send();
  };
  createAdminUser = async (req, res) => {
    await UserService.create({ ...req.body, role: "Admin" });
    Response(res).status(201).message("Successfully Created").send();
  };
  getCurrentUser = async (req, res) => {
    const user = await UserService.findById(req.user._id);
    Response(res).body(user).send();
  };
  getAllUsers = async (req, res) => {
    const user = await UserService.find({
      _id: { $nin: [req.user._id] },
    }).sort({ createdAt: -1 });
    Response(res).body(user).send();
  };
  getUserDetails = async (req, res) => {
    const { userId } = req.params;
    const user = await UserService.findById(userId);
    if (!user) throw new HttpError(400, "No User Exists!");

    Response(res).body(user).send();
  };
}

module.exports.UserController = new UserController();
