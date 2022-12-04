const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  _id: String,
  product: {type: mongoose.Schema.Types.ObjectId, ref: 'product'},
  quantity: Number
});

const schema = new mongoose.Schema({
    _id: String,
    displayName: String,
    email: String,
    cartItems: [cartItemSchema]
  }, { _id: false });


  const User = mongoose.model("User", schema);

  module.exports= User;