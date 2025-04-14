const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function () {
  const user = this;
  console.log(this);
  if (!user.isModified) {
    return next();
  }

  try {
    const hash_password = await bcryptjs.hash(user.password, 10);
    user.password = hash_password;
  } catch (error) {
    return next(error);
  }
});



userSchema.methods.isPasswordValid = async function (password) {

  return bcryptjs.compare(password,this.password);
  
};

userSchema.methods.generateToken = async function () {
console.log('i am token');
try {
  return jwt.sign(
    {
    userId: this._id.toString(),
    email: this.email,
    isAdmin: this.isAdmin,
  },
process.env.JWT_SECRET_KEY,
{
  expiresIn:"30d"
}
);a
} catch (error) {
  console.error("token error:", error);
}
  
}

const User = new mongoose.model("User", userSchema);
module.exports = User;
