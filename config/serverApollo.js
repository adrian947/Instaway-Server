const { ApolloServer } = require("apollo-server");
const typeDefs = require("../gql/schema");
const resolvers = require("../gql/resolver");

const server = () => {
  const serverApollo = new ApolloServer({
    typeDefs,
    resolvers,
  });

  serverApollo.listen().then(({ url }) => {
    console.log(`Server Apollo connected at ${url}`);
  });
};

module.exports = server;
