require("dotenv").config();
const express = require("express");
const notFound = require("./middleware/not-found");
const errorHandlerMidlleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const productsRouter = require("./routers/products");
const app = express();

//middleware
app.use(express.json());
app.use("/api/v1/products",productsRouter)
app.use(notFound);
app.use(errorHandlerMidlleware);

const port = process.env.PORT || 3000;
const start = async ()=>{
    //connect db
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port,()=>{console.log(`server listen to port ${port}`)})
    } catch (error) {
        
    }
}

start()

module.exports = start;