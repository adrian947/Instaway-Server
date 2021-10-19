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

const getUser = async (id, userName) => {
  let user = null;

  if (id) {
    user = await User.findById(id);
  }
  if (userName) {
    user = await User.findOne({ userName });
  }
  if (!user) {
    throw new Error("User not exist");
  }
  return user;
};

const updateAvatar = async (file, context) => {
  const { id } = context.user;

  try {
    await User.findByIdAndUpdate(id, { avatar: file.urlAvatar });
  } catch (error) {
    console.log("error", error);
  }

  console.log("fileserver", file);
  console.log("context", context);

  return file;
};

const deleteAvatar = async (context) => {
  const { id } = context.user;

  try {
    await User.findByIdAndUpdate(id, { avatar: "" });
    return true;
  } catch (error) {
    console.log("error", error);
    return false;
  }
};

const updateUser = async (input, context) => {
  const { id } = context.user;

  try {
    if (input.currentPassword & input.newPassword) {
      const userFound = await User.findById(id);
      const validation = bcrypt.compareSync(
        input.currentPassword,
        userFound.password
      );
      if (!validation) throw new Error("Incorrect password");

      const salt = bcrypt.genSaltSync(10);
      const newHash = bcrypt.hashSync(input.newPassword, salt);
      await User.findByIdAndUpdate(id, { password: newHash });
    } else {
      await User.findByIdAndUpdate(id, input);
    }
    return true;
  } catch (error) {
    console.log("error", error);
    return false;
  }
};

const searchUser = async (search) => {
  //return Users width name incomplete

  const users = await User.find({
    name: {
      $regex: search,
      $options: "i",
    },
  });

  return users;
};

const verifyToken = async (input) => {
  const { token } = input;
  const verify = jwt.verify(
    token,
    process.env.SECRETA,
    function (err, decodedToken) {
      // console.log("err", err);
      // console.log("decode", decodedToken);

      if (decodedToken) {
        return true;
      } else {
        return false;
      }
    }
  );

  return verify;
};

module.exports = {
  register,
  login,
  getUser,
  updateAvatar,
  deleteAvatar,
  updateUser,
  searchUser,
  verifyToken,
};
