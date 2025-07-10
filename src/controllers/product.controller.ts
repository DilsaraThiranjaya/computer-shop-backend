import {Request, Response} from "express";
import * as productService from "../services/product.service";

// Controller function to handle the get all products request
export const getAllProducts = (req:Request, res:Response) => {
    try {
        const products = productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const saveProduct = (req:Request, res:Response) => {
    try {
        const newProduct = req.body;
        const validateError = productService.validateProduct(newProduct);
        console.log(validateError)
        if (validateError) {
            res.status(400).json({ error: validateError });
            return;
        }
        const savedProduct = productService.saveProduct(newProduct);
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getProduct =  (req:Request, res:Response) => {
    const productId = parseInt(req.params.id);
    if(isNaN(productId)) {
        res.status(400).json({ error: 'Invalid product ID' });
        return;
    }
    const product = productService.getProductById(productId);
    if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
    }
    res.status(200).json(product);
};

export const updateProduct =  (req:Request, res:Response) => {
    try {
        const productId = parseInt(req.params.id);
        if(isNaN(productId)) {
            res.status(400).json({ error: 'Invalid product ID' });
            return;
        }
        const updatedProduct = req.body;
        const validateError = productService.validateProduct(updatedProduct);
        if (validateError) {
            res.status(400).json({ error: validateError });
            return;
        }
        const product = productService.updateProduct(productId, updatedProduct);
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteProduct =  (req:Request, res:Response) => {
    const productId = parseInt(req.params.id);
    if(isNaN(productId)) {
        res.status(400).json({ error: 'Invalid product ID' });
        return;
    }
    const product = productService.deleteProduct(productId);
    if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
    }
    res.status(200).json({ message: 'Product deleted successfully' });
};