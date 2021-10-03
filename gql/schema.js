const { gql } = require("apollo-server");

const typeDefs = gql`
  #types
  type User {
    id: ID
    name: String
    userName: String
    email: String
    avatar: String
    siteWeb: String
    description: String
    password: String
    createAt: String
  }
  type Token {
    token: String
  }

  #Inputs
  input UserInput {
    name: String!
    userName: String!
    email: String!
    password: String!
  }
  input LoginInput {
    email: String!
    password: String!
  }


  #querys y Mutations


  type Query {
    #User
    getUser: User
  }
  type Mutation {
    #User
    register(input: UserInput): User
    login(input: LoginInput): Token
  }
`;

module.exports = typeDefs;
