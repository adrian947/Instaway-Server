const User = require("../models/userModel");
const Publication = require("../models/publicationModel");

const publish = (file, context) => {
  const user = User.findOne({ userName: context.user.userName });
  if (!user) throw new Error("User not find");

  try {
    const publication = new Publication({
      idUser: context.user.id,
      file: file.secure_url,
      typeFile: file.resource_type,
      createAt: Date.now(),
    });
    publication.save();
    return {
      status: true,
      urlFile: file.secure_url,
    };
  } catch (error) {
    console.log("error", error);
    return {
      status: null,
      urlFile: "",
    };
  }
};

const getPublications = async (userName) => {
  const user = await User.findOne({ userName });
  if (!user) throw new Error("User not find");

  // console.log('user',user )

  const publications = await Publication.find()
    .where({ idUser: user._id })
    .sort({ createAt: -1 });

  return publications;
};

module.exports = {
  publish,
  getPublications,
};
