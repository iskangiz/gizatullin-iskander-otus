const graphql = require('graphql')
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull } = graphql

const data = require('./data');

const manufacturerType =  new GraphQLObjectType({
    name: 'Manufacturer',
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
        model: {
            type: new GraphQLNonNull(GraphQLString)
        },
        price: {
            type: GraphQLInt
        },
        description: {
            type: GraphQLString
        },
        productCategory: {
            type: productCategoryType,
            resolve: (source, params) => {
                return data.ProductCategories.find(x => x.id === source.productCategoryId);
            }
        },
        manufacturer: {
            type: manufacturerType,
            resolve: (source, params) => {
                return data.Manufacturer.find(x => x.id === source.manufacturerId);
            }
        }
    }
});

const customerType = new GraphQLObjectType({
    name: 'Type',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        login: {
            type: new GraphQLNonNull(GraphQLString)
        }
    }
});

const orderType = new GraphQLObjectType({
    name: 'Order',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        product: {
            type: productType,
            resolve: (source, params) => {
                return data.Products.find(x => x.id === source.productId);
            }
        },
        customer: {
            type: customerType,
            resolve: (source, params) => {
                return data.Customers.find(x => x.id === source.customerId);
            }
        }
    }
});

module.exports = { manufacturerType, productCategoryType, productType, customerType, orderType };