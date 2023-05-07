const Product = require("../models/products.js");

const getAllProductsStatic = async(req,res)=>{
    res.status(200).json({msg: "get all tasks test"})

}
//filitring
const getAllProducts = async(req,res)=>{
    const {featured,company,name,sort,fields,numericFilters} = req.query;
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
    //numeric filiter
    if(numericFilters){
        const operatorMap ={
            ">": "$gt",
            ">=": "$gte",
            "=": "$eq",
            "<": "$lt",
            "<=": "$lte",
        };
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(regEx,
            (match)=>`-${operatorMap[match]}-`);
            console.log(filters);
            const options = ["price","rating"]
            filters = filters.split(",").forEach(item => {
                const [field,operator,value] = item.split("-");
                if(options.includes(field)){
                    queryObject[field] = {[operator]: Number(value)}
                    console.log(queryObject,1);
                }
            });
    }
    let result =  Product.find(queryObject);

    //sorting
    if(sort){
        const sortList = sort.split(",").join(" ");
        result =  result.sort(sortList);
    }
    //selecting
    if(fields){
        const fieldList = fields.split(",").join(" ");
        result =  result.select(fieldList);
    }
    //skip
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const skip = (page - 1)*limit;
    result.skip(skip).limit(limit);
    
    const products  = await result;

    res.status(200).json({products,nHits: products.length})
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}