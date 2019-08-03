const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const GroupType = new GraphQLObjectType({
  name: 'GroupType',
  fields: {
    name: { type: GraphQLString },
    id: { type: GraphQLID }
  }
});

module.exports = GroupType;
