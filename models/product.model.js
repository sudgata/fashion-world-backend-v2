const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    imageUrl: String,
    price: Number,
    productCategory: {type: mongoose.Schema.Types.ObjectId, ref: 'productCategory'}
  });

// const productCollectionSchema = new mongoose.Schema({
//     _id: String,
//     title: String,
//     items: [productSchema],
//     productCategoryId: {type: mongoose.Schema.Types.ObjectId, ref: 'productCategory'}  
//   });

  const Product = mongoose.model("product", productSchema);

  module.exports= Product;