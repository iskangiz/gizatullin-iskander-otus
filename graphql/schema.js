const graphql = require('graphql')
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull } = graphql

const queryType = require("./query");

const schema = new GraphQLSchema({
    query: queryType
});

module.exports = schema;