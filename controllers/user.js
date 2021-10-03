const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (input) => {
  const newUser = input;
  newUser.email = newUser.email.toLowerCase();
  newUser.userName = newUser.userName.toLowerCase();

  const { email, userName, password } = newUser;

  //if the email is in use
  const foundEmail = await User.findOne({ email });
  if (foundEmail) {
    throw new Error("Email already exist");
  }
  // if the userName is in use
  const founduserName = await User.findOne({ userName });
  if (founduserName) {
    throw new Error("User name already exist");
  }

  //encript password user
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  newUser.password = hash;

  try {
    const user = await new User(newUser);
    user.save();
    return user;
  } catch (error) {
    console.log("error", error);
  }
};

const login = async (input) => {
  const { email, password } = input;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User or password not exists");

  

  //compare password

  if (bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        userName: user.userName,
        email: user.email,
      },
      process.env.SECRETA,
      {
        expiresIn: "8h",
      }
    );
    return { token: token };
  } else {
    throw new Error("User or password not exists");
  }
};

module.exports = { register, login };
