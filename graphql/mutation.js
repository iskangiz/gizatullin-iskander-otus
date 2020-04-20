const graphql = require('graphql')
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull } = graphql

const data = require('./data');
const types = require('./type')

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createOrder: {
            type: types.orderType,
            args: {
                customerId: {type: new GraphQLNonNull(GraphQLInt)},
                productId: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve: (source, params) => {
                let newOrder =
                    {
                        id: data.Orders.length + 1,
                        customerId: params.customerId,
                        productId: params.productId
                    };

                data.Orders.push(newOrder);
                return newOrder;
            }
        },
        createProduct: {
            type: types.productType,
            args: {
                productCategoryId: {type: new GraphQLNonNull(GraphQLInt)},
                manufacturerId: {type: new GraphQLNonNull(GraphQLInt)},
                model: {type: new GraphQLNonNull(GraphQLString)},
                description: {type: GraphQLString},
                price: {type: GraphQLInt}
            },
            resolve: (source, params) => {
                let newProduct =
                    {
                        id: data.Products.length + 1,
                        productCategoryId: params.productCategoryId,
                        manufacturerId: params.manufacturerId,
                        model: params.model,
                        description: params.description,
                        price: params.price
                    };

                data.Products.push(newProduct);
                return newProduct;
            }
        },
        updateProduct: {
            type: types.productType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLInt)},
                productCategoryId: {type: new GraphQLNonNull(GraphQLInt)},
                manufacturerId: {type: new GraphQLNonNull(GraphQLInt)},
                model: {type: new GraphQLNonNull(GraphQLString)},
                description: {type: GraphQLString},
                price: {type: GraphQLInt}
            },
            resolve: (source, params) => {
                let product = data.Products.find(x => x.id === params.id);
                product.productCategoryId = params.productCategoryId;
                product.manufacturerId = params.manufacturerId;
                product.model = params.model;
                product.description = params.description;
                product.price = params.price;
                return product;
            }
        }
    }
});

module.exports = mutationType;