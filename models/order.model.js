const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'product'},
    quantity: Number
});


const addressSchema = new mongoose.Schema({
    name: String,
    phone : Number,
    addressLine1: String,
    addressLine2: String,
    city: String,
    country: String,
    postalCode: Number,
});


const orderSchema = new mongoose.Schema({
    totalPrice: Number,
    paymentId: String,
    cardType: String,
    lastFourDigits: Number,
    shippingAddress : addressSchema,
    billingAddress : addressSchema,
    orderItems: [orderItemSchema],
    user: {type: String, ref: 'user'}
  },{timestamps: true});

  const Order = mongoose.model("order", orderSchema);

  module.exports= Order;