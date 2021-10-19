const User = require("../models/userModel");
const Publication = require("../models/publicationModel");
const Comment = require("../models/commentModel");

const addComment = (input, context) => {
  console.log("context", context);

  try {
    const comment = new Comment({
      idPublication: input.idPublication,
      idUser: context.user.id,
      comment: input.comment,
      createAt: Date.now(),
    });

    comment.save();
    return comment;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

const getComment = async (idPublication) => {
  try {
    const comments = await Comment.find({ idPublication }).populate("idUser");
    console.log('c',comments )
    return comments;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

module.exports = {
  addComment,
  getComment,
};
