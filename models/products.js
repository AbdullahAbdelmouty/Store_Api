const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"the product name must be provided"]
    },
    price:{
        type: Number,
        required:[true,"the price must be provided"]
    },
    featured:{
        type:Boolean,
        default: false
    },
    rating:{
        type:Number,
        default: false
    },
    createdAt:{ 
    type:Date,
    default: Date.now()
    },
    company:{
        type: String,
        enum: ['ikea', 'liddy', 'caressa', 'marcos'],
        msg: '{VALUE} is not supported'
    }
})

module.exports = mongoose.model("product",productSchema)