const Products =
    [
        {
            id: 1,
            manufacturerId: 1,
            productCategoryId: 1,
            model: "Samsung Galaxy S10",
            price: 44990
        },
        {
            id: 2,
            manufacturerId: 2,
            productCategoryId: 1,
            model: "Sony Xperia 10",
            price: 16990
        },
        {
            id: 3,
            manufacturerId: 3,
            productCategoryId: 1,
            model: "LG G8",
            price: 22490
        },
        // microwave
        {
            id: 4,
            manufacturerId: 1,
            productCategoryId: 2,
            model: "Samsung ME83KRQW-1",
            price: 3495
        },
        {
            id: 5,
            manufacturerId: 3,
            productCategoryId: 2,
            model: "LG NeoCHef MS2595GIS",
            price: 11490
        },
        // fridge
        {
            id: 6,
            manufacturerId: 1,
            productCategoryId: 3,
            model: "Samsung RS66N8100S9",
            price: 75990
        },
        {
            id: 7,
            manufacturerId: 3,
            productCategoryId: 3,
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

const Orders =
    [
        {
            id: 1,
            customerId: 1,
            productId: 1
        },
        {
            id: 2,
            customerId: 1,
            productId: 2
        },
        {
            id: 3,
            customerId: 2,
            productId: 1
        }
    ];

const Customers =
    [
        {
            id: 1,
            login: "qwe"
        },
        {
            id: 2,
            login: "asd"
        }
    ];

module.exports = { Products, ProductCategories, Manufacturer, Orders, Customers }