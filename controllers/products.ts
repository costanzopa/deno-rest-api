import {Product} from '../types.ts';

let products: Product[] = [
    {
        id: "1",
        name: "Product One",
        description: "This is product One.",
        price: 29.99
    },
    {
        id: "2",
        name: "Product Two",
        description: "This is product Two.",
        price: 59.99
    },
    {
        id: "3",
        name: "Product Three",
        description: "This is product Three.",
        price: 129.99
    }
];

// @desc    Get all products
// @route   GET /api/v1/products

const getProducts = (({response}: {response: any}) => {
    response.body = {
        success: true,
        data: products
    };
});


export {getProducts}