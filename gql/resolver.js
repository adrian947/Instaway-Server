const {
  register,
  login,
  getUser,
  updateAvatar,
  deleteAvatar,
  updateUser,
  searchUser,
  verifyToken,
} = require("../controllers/user");
const {
  followController,
  isFollow,
  unFollowController,
  getAllFollow,
  getAllFollowing,
  getNotFollowers,
} = require("../controllers/follow");
const {
  publish,
  getPublications,
  getPublicationsFolloweds,
} = require("../controllers/publication");
const { addComment, getComment } = require("../controllers/comment");
const {
  addLike,
  deleteLike,
  isLike,
  countLike,
} = require("../controllers/likes");

const resolvers = {
  Query: {
    //USER
    getUser: (_, { id, userName }) => getUser(id, userName),
    search: (_, { search }) => searchUser(search),

    //folow

    isFollow: (_, { userName }, context) => isFollow(userName, context),
    getAllFollow: (_, { userName }) => getAllFollow(userName),
    getAllFollowing: (_, { userName }) => getAllFollowing(userName),
    getNotFollowers: (_, {}, context) => getNotFollowers(context),

    //publication

    getPublications: (_, { userName }) => getPublications(userName),
    getPublicationsFolloweds: (_, {}, context) =>
      getPublicationsFolloweds(context),

    //Comments

    getComment: (_, { idPublication }) => getComment(idPublication),

    // likes

    isLike: (_, { idPublication }, context) => isLike(idPublication, context),
    countLike: (_, { idPublication }) => countLike(idPublication),
  },

  Mutation: {
    //User
    register: (_, { input }) => register(input),
    login: (_, { input }) => login(input),
    updateAvatar: (_, { file }, context) => updateAvatar(file, context),
    deleteAvatar: (_, {}, context) => deleteAvatar(context),
    updateUser: (_, { input }, context) => updateUser(input, context),
    verifyToken: (_, { input }) => verifyToken(input),

    //follow
    follow: (_, userName, context) => followController(userName, context),
    unFollow: (_, userName, context) => unFollowController(userName, context),

    //publication

    publish: (_, { file }, context) => publish(file, context),

    //comment

    addComment: (_, { input }, context) => addComment(input, context),

    //like

    addLike: (_, { idPublication }, context) => addLike(idPublication, context),
    deleteLike: (_, { idPublication }, context) =>
      deleteLike(idPublication, context),
  },
};

module.exports = resolvers;
