import {Product} from '../types.ts';
import { v4 } from "https://deno.land/std/uuid/mod.ts";


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


// @desc    Get a single product
// @route   GET /api/v1/products/:id
const getProduct = ({params, response}: {params: {id: string},response: any}) => {
    const product: Product | undefined = products.find(p => p.id === params.id);

    if (product) {
        response.status = 200;
        response.body = {
            success: true,
            body: product
        }
    } else {
        response.status = 404;
        response.body = {
            success: false,
            msg: 'No product found'
        }
    }
};

// @desc    Add product
// @route   Post /api/v1/products
const addProduct =  async ({ request, response }: { request: any, response: any }) => {  
    const body = await request.body();
    
    if(!request.hasBody) {
        response.status = 404;
        response.body = {
            success: false,
            msg: "No Data"
        }
    } else {
        const product: Product = body.value;
        product.id = v4.generate();
        products.push(product);
        response.status = 201;
        response.body = {
            success: true,
            data: product
        }
    }
}

// @desc    Update product
// @route   PUT /api/v1/products/:id
const updateProduct = async ({ params, request, response }: { params: { id: string }, request: any, response: any }) => {
    let product: Product | undefined = products.find(p => p.id === params.id);

    if (product) {
        const body = await request.body();
        const updatedData: {name?: string; description?: string, price?: number} = body.value;
        products = products.map(p => p.id === params.id ? {...p, ...updatedData } : p);

        response.status = 200;
        response.body = {
            success: true,
            body: product
        }
    } else {
        response.status = 404;
        response.body = {
            success: false, 
            msg: 'No product found'
        }
    }
}

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
const deleteProduct =  ({ params, response }: { params: { id: string }, response: any }) => {
    const product: Product | undefined = products.find(p => p.id === params.id);

    if (product) {
        products = products.filter(p => p.id !== params.id);
        response.status = 200;
        response.body = {
            success: true,
            msg: 'Product Removed'
        }
    } else {
        response.status = 404;
        response.body = {
            success: false,
            msg: 'No product found'
        }
    }
}

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct }
