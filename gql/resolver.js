const {register} = require("../controllers/user");
const {login} = require("../controllers/user");

const resolvers = {
  Query: {
    //USER
    getUser: () => {
      console.log("Obteniendo user");
      return null;
    },
  },

  Mutation: {
    //User
    register: (_, { input }) => register(input),
    login: (_, { input }) => login(input),
  },
};

module.exports = resolvers;
