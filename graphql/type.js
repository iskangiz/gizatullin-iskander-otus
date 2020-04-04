const graphql = require('graphql')
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull } = graphql

const data = require('./data');

const manufacturerType =  new GraphQLObjectType({
    name: 'ProductCategory',
    fields: {
        id: {
            type:  new GraphQLNonNull(GraphQLInt)
        },
        title: {
            type:  new GraphQLNonNull(GraphQLString)
        }
    }
});

const productCategoryType =  new GraphQLObjectType({
    name: 'ProductCategory',
    fields: {
        id: {
            type:  new GraphQLNonNull(GraphQLInt)
        },
        title: {
            type:  new GraphQLNonNull(GraphQLString)
        }
    }
});

const productType = new GraphQLObjectType({
    name: 'Product',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        title: {
            type: new GraphQLNonNull(GraphQLString)
        },
        description: {
            type: GraphQLString
        },
        productCategory: {
            type: productCategoryType,
            resolve: (source, params) => {
                return data.ProductCategories.find(x => x.id === source.productTypeId);
            }
        }
    }
});

module.exports = { manufacturerType, productCategoryType, productType }