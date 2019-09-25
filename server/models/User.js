const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const keys = require("../config/keys")

const saltRounds = 10;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre("save", function (next) {
  const user = this;

  if (user.isModified("password")) {
    bcrypt.hash(user.password, saltRounds, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  }
  else next();
});

UserSchema.methods.comparePassword = function (cadidatePassword, cb) {
  bcrypt.compare(cadidatePassword, this.password, function (err, res) {
    if (err) return cb(err);

    cb(null, res);
  });
};

module.exports = User = mongoose.model("User", UserSchema);
