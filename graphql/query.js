const graphql = require('graphql')
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull } = graphql

const data = require('./data');
const types = require('./type')

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        product: {
            type: types.productType,
            args: {
                id: {type: GraphQLInt}
            },
            resolve: (source, {id}) => {
                return data.Products.find(x => x.id === id);
            }
        }
        // },
        // products: {
        //     type: new GraphQLList(types.productType),
        //     args: {
        //         productTypeId: {type: GraphQLInt}
        //     },
        //     resolve: (source, {productTypeId}) => {
        //         if (productTypeId === undefined)
        //             return data.Products.Products;
        //         else
        //             return data.Products.Products.find(x => x.productTypeId === productTypeId);
        //     }
        // },
        // productCategories: {
        //     type: new GraphQLList(types.productCategoryType),
        //     resolve: () => {
        //         return data.ProductCategories
        //     }
        // }
    }
});

module.exports = queryType;