const User = require("../models/userModel");
const Publication = require("../models/publicationModel");
const Follow = require("../models/followModel");

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

const getPublicationsFolloweds = async (context) => {
  const followers = await Follow.find({ idUser: context.user.id }).populate(
    "follow"
  );

  const FollowersList = [];

  for await (const data of followers) {
    FollowersList.push(data.follow);
  }

  const publicationList = [];

  for await (const data of FollowersList) {
    const publicationsUser = await Publication.find()
      .where({ idUser: data._id })
      .sort({ createAt: -1 })
      .populate("idUser")
      .limit(5);
    publicationList.push(...publicationsUser);
  }

  const result = publicationList.sort((a, b) => {
    return new Date(b.createAt) - new Date(a.createAt);
  });

  return result;
};

module.exports = {
  publish,
  getPublications,
  getPublicationsFolloweds,
};
