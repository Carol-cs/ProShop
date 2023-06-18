import express from 'express'
const router = express.Router()
import asyncHandler from '../middleware/asyncHandler.js'
import Product from '../models/productModel.js'

// we want to link /api/products to this file, so we reduce the path to /

// we need to use async/await because the mongoose methods are asynchronous
// we can create an asyncHandler which allows us to remove try-catches to keep our code neat
router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({}) // pass empty object to get ALL products
    res.json(products);
}))

router.get('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product){
     return res.json(product)
    } else{
        res.status(404)
        throw new Error('Resource not found')

    }
    
    
}))

export default router