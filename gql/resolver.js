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
  getAllFollowing
} = require("../controllers/follow");
const { publish, getPublications } = require("../controllers/publication");
const {addComment, getComment } = require("../controllers/comment");

const resolvers = {
  Query: {
    //USER
    getUser: (_, { id, userName }) => getUser(id, userName),
    search: (_, { search }) => searchUser(search),

    //folow

    isFollow: (_, { userName }, context) => isFollow(userName, context),
    getAllFollow: (_, { userName }) => getAllFollow(userName),
    getAllFollowing: (_, { userName }) => getAllFollowing(userName),
    
    //publication
    
    getPublications: (_, {userName})=> getPublications(userName),
    
    //Comments

    getComment: (_, {idPublication})=> getComment(idPublication)
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
    
    publish: (_, {file}, context) => publish(file, context),


    //comment

    addComment:(_, {input}, context) => addComment(input, context)



  },
};

module.exports = resolvers;
