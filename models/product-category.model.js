const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    imageUrl: String,
    size: String
  });

  const ProductCategory = mongoose.model("productCategory", schema, "productCategory");

  module.exports= ProductCategory;