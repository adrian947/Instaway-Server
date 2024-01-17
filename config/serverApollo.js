const { ApolloServer } = require("apollo-server");
const typeDefs = require("../gql/schema");
const resolvers = require("../gql/resolver");

const server = () => {
  const serverApollo = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const port = process.env.PORT || 4000

  serverApollo.listen(port).then(({ url }) => {
    console.log(`Server Apollo connected at ${url}`);
  });
};

module.exports = server;
