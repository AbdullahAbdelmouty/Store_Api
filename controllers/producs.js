const Product = require("../models/products.js");

const getAllProductsStatic = async(req,res)=>{
    res.status(200).json({msg: "get all tasks test"})

}
//filitring
const getAllProducts = async(req,res)=>{
    const {featured,company,name} = req.query;
    const queryObject = {};
    if(featured){
        queryObject.featured = featured === 'true' ? true:false; //to convert true from text to boolean
    }
    if(company){
        queryObject.company = company;
    }
    if(name){
        queryObject.name = {$regex:name ,Option:"i"}
    }
    const products = await Product.find(queryObject)
    res.status(200).json({products,nHits: products.length})
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}