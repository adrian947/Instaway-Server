const User = require("../models/userModel");
const Publication = require("../models/publicationModel");
const Like = require("../models/likesModel");

const addLike = async (idPublication, context) => {
  try {
    const like = new Like({
      idPublication,
      idUser: context.user.id,
    });

    like.save();
    return true;
  } catch (error) {
    console.log("error", error);
    return false;
  }
};

const deleteLike = async (idPublication, context) => {
  try {
    const deleteLike = await Like.findOneAndDelete({ idPublication }).where({
      idUser: context.user.id,
    });
    return true;
  } catch (error) {
    console.log("error", error);
    return false;
  }
};

const isLike = async (idPublication, context) => {
  try {
    const resp = await Like.findOne({ idPublication }).where({
      idUser: context.user.id,
    });

    if (!resp) return;

    return true;
  } catch (error) {
    console.log("error", error);
    return false;
  }
};

const countLike = async (idPublication) => {
  try {
    const resp = await Like.countDocuments({ idPublication });

    return resp;
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = {
  addLike,
  deleteLike,
  isLike,
  countLike,
};
