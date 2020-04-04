const Products =
    [
        {
            id: 1,
            brandId: 1,
            productTypeId: 1,
            model: "Samsung Galaxy S10",
            price: 44990
        },
        {
            id: 2,
            brandId: 2,
            productTypeId: 1,
            model: "Sony Xperia 10",
            price: 16990
        },
        {
            id: 3,
            brandId: 3,
            productTypeId: 1,
            model: "LG G8",
            price: 22490
        },
        // microwave
        {
            id: 4,
            brandId: 1,
            productTypeId: 2,
            model: "Samsung ME83KRQW-1",
            price: 3495
        },
        {
            id: 5,
            brandId: 3,
            productTypeId: 2,
            model: "LG NeoCHef MS2595GIS",
            price: 11490
        },
        // fridge
        {
            id: 6,
            brandId: 1,
            productTypeId: 3,
            model: "Samsung RS66N8100S9",
            price: 75990
        },
        {
            id: 7,
            brandId: 3,
            productTypeId: 3,
            model: "LG GA-B379SYUL",
            price: 30290
        }
    ];

const ProductCategories =
    [
        {
            id: 1,
            title: "phones"
        },
        {
            id: 2,
            title: "microwave"
        },
        {
            id: 3,
            title: "fridge"
        }
    ];

const Manufacturer =
    [
        {
            id: 1,
            title: "Samsung"
        },
        {
            id: 2,
            title: "Sony"
        },
        {
            id: 3,
            title: "LG"
        }
    ];

const Order = []

const Customers = []

module.exports = { Products, ProductCategories, Manufacturer, Order, Customers }