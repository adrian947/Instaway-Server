const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar Upload
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
  type UpdateAvatar {
    status: Boolean
    urlAvatar: String
  }

  type Publish {
    status: Boolean
    urlFile: String
  }

  type Publication {
    id: ID
    idUser: ID
    file: String
    typeFile: String
    createAt: String
  }
  type Comment {
    idPublication: ID
    idUser: User
    comment: String
    createAt: String
  }
  type feedPublication {
    id: ID
    idUser: User
    file: String
    typeFile: String
    createAt: String
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
  input UserUpdatedInput {
    name: String
    email: String
    currentPassword: String
    newPassword: String
    siteWeb: String
    description: String
  }
  input verifyToken {
    token: String
  }
  input CommentInput {
    idPublication: ID
    comment: String
  }

  #querys y Mutations

  type Query {
    #User
    getUser(id: ID, userName: String): User
    search(search: String): [User]

    #follow
    isFollow(userName: String!): Boolean
    getAllFollow(userName: String!): [User]
    getAllFollowing(userName: String!): [User]
    getNotFollowers: [User]

    #publication

    getPublications(userName: String!): [Publication]
    getPublicationsFolloweds: [feedPublication]

    #comment

    getComment(idPublication: ID!): [Comment]

    #likes

    isLike(idPublication: ID!): Boolean
    countLike(idPublication: ID!): Int

    



  }
  type Mutation {
    #User
    register(input: UserInput): User
    login(input: LoginInput): Token
    verifyToken(input: verifyToken): Boolean
    updateAvatar(file: Upload): UpdateAvatar
    deleteAvatar: Boolean
    updateUser(input: UserUpdatedInput): Boolean

    #follows
    follow(userName: String!): Boolean
    unFollow(userName: String!): Boolean

    #publications

    publish(file: Upload): Publish

    #comment

    addComment(input: CommentInput): Comment

    #Likes

    addLike(idPublication: ID!): Boolean
    deleteLike(idPublication: ID!): Boolean
    
  }
`;

module.exports = typeDefs;
