const { ApolloServer } = require("apollo-server");
const typeDefs = require("../gql/schema");
const resolvers = require("../gql/resolver");
const jwt = require("jsonwebtoken");

const server = () => {
  const serverApollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization;
      if (token) {
        try {
          const user = jwt.verify(token, process.env.SECRETA);

          return {
            user,
          };
        } catch (error) {
          console.log("####Error####");
          console.log(error);
          return false
          throw new Error("Token invalid");
        }
      }
    },
  });

  serverApollo.listen({port: process.env.PORT || 4000}).then(({ url }) => {
    console.log(`Server Apollo connected at ${url}`);
  });
};

module.exports = server;
