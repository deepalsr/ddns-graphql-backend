const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Domain {
    id: ID!
    name: String!
    owner: String!
    cid: String!
  }

  type Query {
    getAllDomains: [Domain]
    getDomainByName(name: String!): Domain
  }

  type Mutation {
    registerDomain(name: String!, owner: String!, cid: String!): Domain
    updateCID(name: String!, cid: String!): Domain
    transferDomain(name: String!, newOwner: String!): Domain
  }
`;

module.exports = typeDefs;
