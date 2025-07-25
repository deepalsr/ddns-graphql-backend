const Domain = require('../models/Domain');

const resolvers = {
  Query: {
    getAllDomains: async () => {
      return await Domain.find();
    },
    getDomainByName: async (_, { name }) => {
      return await Domain.findOne({ name });
    },
   getDomainsByOwner: async (_, { owner }) => {
     return await Domain.find({ owner });
    },


  },
  Mutation: {
    registerDomain: async (_, { name, owner, cid }) => {
      const newDomain = new Domain({ name, owner, cid });
      return await newDomain.save();
    },
    updateCID: async (_, { name, cid }) => {
      return await Domain.findOneAndUpdate({ name }, { cid }, { new: true });
    },
    transferDomain: async (_, { name, newOwner }) => {
      return await Domain.findOneAndUpdate({ name }, { owner: newOwner }, { new: true });
    },
  },
};

module.exports = resolvers;
