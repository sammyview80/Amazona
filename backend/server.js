import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import data from './data';
import config from './config';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoutes';
import productRoute from './routes/productRoute';

dotenv.config();

mongoose.Promise = global.Promise;
const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error));

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
    //This fixes the cross origin error
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next()
})
app.use('/api/users', userRoute)
app.use('/api/products', productRoute)


// app.get("/api/products", (req, res) => {
//     res.send(data.products);
// })
// app.get("/api/products/:id", (req, res) => {
//     const productId = req.params.id;
//     const product = data.products.find(x => x._id === productId);
//     if (product)
//         res.send(product);
//     else
//         res.status(404).send({msg: "Product Not Found"});
// })

app.listen(5000, () => {console.log("Sever Started at http://localhost:5000")})