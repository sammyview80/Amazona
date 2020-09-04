import express from 'express';

import Product from '../models/productModel';
import {getToken} from '../utils';

const router = express.Router();

router.get("/", async (req, res) =>{
    const products = await Product.find({});
    res.send(products)
})

router.post("/", async (req, res) =>{
    const data = {
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        countInStock: req.body.countInStock,
        description: req.body.description,
        rating: req.body.rating,
        numReviews: req.body.numReviews
    }
    const product = new Product(data);
    const newProduct = await product.save();
    if (newProduct){
        return res.status(201).send({message: "new Product Created.", data: newProduct})
    }
    return res.status(500).send({message: 'Error in Creating Product'})
})

export default router;