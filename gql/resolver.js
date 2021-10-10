const {register, login, getUser, updateAvatar, deleteAvatar} = require("../controllers/user");


const resolvers = {
  Query: {
    //USER
    getUser: (_, {id, userName}) => getUser(id, userName),
  },

  Mutation: {
    //User
    register: (_, { input }) => register(input),
    login: (_, { input }) => login(input),
    updateAvatar: (_, { file }, context) => updateAvatar(file, context),
    deleteAvatar: (_, {}, context) => deleteAvatar(context),
  },
};

module.exports = resolvers;
