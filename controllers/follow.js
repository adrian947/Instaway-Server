const Follow = require("../models/followModel");
const User = require("../models/userModel");

const followController = async (userName, context) => {
  const followUserName = userName.userName;
  

  const userFound = await User.findOne({ userName: followUserName });
  if (!userFound) throw new Error("User not find");

  try {
    const follow = new Follow({
      idUser: context.user.id,
      follow: userFound._id,
    });
    follow.save();
    return true;
  } catch (error) {
    console.log("error", error);
    return false;
  }
};

const isFollow = async (userName, context) => {
  const userFound = await User.findOne({ userName });
  if (!userFound) throw new Error("User not find");

  const follow = await Follow.find({ idUser: context.user.id })
    .where("follow")
    .equals(userFound._id);

  if (follow.length > 0) {
    return true;
  } else {
    return false;
  }
};

const unFollowController = async (userName, context) => {
  const followUserName = userName.userName;

  const userFound = await User.findOne({ userName: followUserName });
  if (!userFound) throw new Error("User not find");

  const unFollow = await Follow.deleteOne({ idUser: context.user.id })
    .where("follow")
    .equals(userFound._id);

  if (unFollow.deletedCount > 0) {
    return true;
  } else {
    return false;
  }
};

const getAllFollow = async (userName) => {
  const user = await User.findOne({ userName });
  //retrun all user Followers
  const followers = await Follow.find({ follow: user._id }).populate("idUser");

  const FollowersList = [];

  for await (const data of followers) {
    FollowersList.push(data.idUser);
  }

  return FollowersList;
};

const getAllFollowing = async (userName) => {
  const user = await User.findOne({ userName });
  //populate entrega todos los datos del usuario entrando por numero de id
  const followers = await Follow.find({ idUser: user._id }).populate("follow");

  const FollowersList = [];

  for await (const data of followers) {
    FollowersList.push(data.follow);
  }

  return FollowersList;
};

module.exports = {
  followController,
  isFollow,
  unFollowController,
  getAllFollow,
  getAllFollowing,
};
