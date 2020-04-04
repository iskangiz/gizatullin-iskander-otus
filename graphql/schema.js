const graphql = require('graphql')
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull } = graphql

const queryType = require("./query");
const mutationType = require("./mutation");

const schema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType
});

module.exports = schema;

