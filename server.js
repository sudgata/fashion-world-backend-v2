require('dotenv').config();

const express = require("express");
const cors = require("cors");
const app = express();
//const bodyParser = require("body-parser");
const connectDB =require('./config/mongo-db');

//const db = require("./src/models/mongo-db");

const userRoute = require('./routes/user-routes');
const productRoute = require('./routes/product-routes');
const paymentRoute = require('./routes/payment-routes');
const cartRoute = require('./routes/cart-routes');
const orderRoute = require('./routes/order-routes');

app.use(cors());
app.options('*', cors());

// parse requests of content-type - application/json
app.use(express.json());


connectDB();

app.use('/user', userRoute);
app.use('/product', productRoute);
app.use('/pay', paymentRoute);
app.use('/cart', cartRoute);
app.use('/order', orderRoute);


// set port, listen for requests
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



