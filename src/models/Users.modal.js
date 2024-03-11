const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Hasher = require("../helpers/Hasher.helper");
const {
  JWT_SECRET,
  JWT_EXPIRY,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRY,
  JWT_EMAIL_VERIFY_SECRET,
} = process.env;

const Schema = new mongoose.Schema(
  {
    profilePicture: {
      url: {
        type: String,
      },
      urlId: {
        type: String,
      },
    },
    name: {
      first: {
        type: String,
      },
      last: {
        type: String,
      },
    },
    dob: {
      type: String,
    },
    pob: {
      type: String,
    },
    phone: {
      type: Number,
    },
    email: {
      type: String,
      unique: true,
    },
    address: {
      type: String,
    },
    parentName: {
      first: String,
      last: String,
    },
    parentEmail: {
      type: String,
    },
    parentPhone: {
      type: String,
    },
    parentAddress: {
      type: String,
    },
    university: {
      type: String,
    },
    degreeStartDate: {
      type: String,
    },
    degreeEndDate: {
      type: String,
    },
    degree: {
      type: String,
    },
    universityCity: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

Schema.pre("save", async function (next) {
  let user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  const salt = await Hasher.getSalt(10);

  // hash the password using our new salt
  const hash = await Hasher.hash(user.password, salt);

  // override the cleartext password with the hashed one
  user.password = hash;
  next();
});

// const virtual = Schema.virtual("id");
// virtual.get(function () {
//   return this._id;
// });
// Schema.set("toJSON", {
//   virtuals: true,
//   versionKey: false,
//   transform: function (doc, ret) {
//     delete ret._id;
//   },
// });

Schema.methods.comparePassword = function (candidatePassword) {
  return new Promise((resolve, reject) => {
    Hasher.compare(candidatePassword, this.password)
      .then((isMatch) => resolve(isMatch))
      .catch((err) => reject(err));
  });
};

Schema.methods.generateToken = (data) => {
  return jwt.sign(
    { ...data },
    JWT_SECRET
    // JWT_EXPIRY
  );
};
Schema.methods.generateRefreshToken = function (data) {
  return jwt.sign(
    { ...data },
    JWT_REFRESH_SECRET
    // JWT_REFRESH_EXPIRY
  );
};
Schema.methods.generateVerifyEmailToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
    },
    JWT_EMAIL_VERIFY_SECRET || "abcd"
  );
};

exports.User = mongoose.model("User", Schema);
