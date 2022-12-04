const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'product'}
  });

  module.exports= cartItemSchema;