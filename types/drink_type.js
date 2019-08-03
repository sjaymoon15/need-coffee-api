const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const DrinkType = new GraphQLObjectType({
  name: 'DrinkType',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    available_sizes: { type: new GraphQLList(GraphQLString) }
  }
});

module.exports = DrinkType;
