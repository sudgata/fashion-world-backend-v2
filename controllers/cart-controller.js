const User = require('../models/user.model');
const Product = require('../models/product.model');
const mongoose = require('mongoose');


exports.addItem = async (req,res) =>{
    const { userId, productId } = req.body;
    try{
        const product = await findProductbyId(productId);
        if(!product) return res.status(500).send("Product not found!");

        const userWithExistingProduct = await findUserWithExistingProduct(userId, productId);
        if(userWithExistingProduct){

            for (let item of userWithExistingProduct.cartItems){
                if(item.product._id.toString() === productId.toString()){
                    item.quantity++;
                    break;
                }
            }
            const updatedUser= await userWithExistingProduct.save();
            return res.status(200).send(updatedUser.cartItems);
        }
        else{
            const user = await User.findById(userId).populate('cartItems.product').exec();
            user.cartItems.push({
                _id: mongoose.Types.ObjectId(),
                product: productId,
                quantity: 1
            });
            const updatedUser= await user.save().then(doc => doc.populate('cartItems.product').execPopulate());
            return res.status(200).send(updatedUser.cartItems);
        }

    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }

}


exports.addItemToCart = async (req,res) => {
    const { userId, productId } = req.body;
    try{
        const product = await findProductbyId(productId);
        if(!product) return res.status(500).send("Product not found!");

        const user = await User.findById(userId).populate('cartItems.product').exec();
        if(user){
            let productFound = false;
            for (let item of user.cartItems){
                if (item.product._id.toString() === productId.toString()) {
                    item.quantity++;
                    productFound = true;
                    const updatedUser= await user.save();
                    return res.status(200).send(updatedUser.cartItems);
                }
            }
            if(!productFound){
                user.cartItems.push({
                    _id: mongoose.Types.ObjectId(),
                    product: productId,
                    quantity: 1
                });
                const updatedUser= await user.save().then(doc => doc.populate('cartItems.product').execPopulate());
                return res.status(200).send(updatedUser.cartItems);
            }
        }
        else{
            return res.status(500).send("User not found!");
        }

    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }

}


exports.removeItemFromCart = async (req,res) => {

    const { userId, productId, clear } = req.body;
    //const isClear = (clear === 'true');
    try{
        const user = await User.findById(userId).populate('cartItems.product').exec();
        if(user){
            let productFound = false;
            let cartItemId;
            for(let item of user.cartItems){
                if (item.product._id.toString() === productId.toString()) {
                    productFound = true;
                    if(clear || item.quantity === 1) {
                        cartItemId = item._id;
                        break;
                    }
                    else if(item.quantity > 1){
                        item.quantity--;
                        const updatedUser = await user.save();
                        return res.status(200).send(updatedUser.cartItems);
                    }
                    else{
                        return res.status(500).send("Internal Server Error");
                    }
                }
            }
            if(!productFound) 
                return res.status(500).send("Product not found in Cart to delete!");
            if(cartItemId){
                user.cartItems.id(cartItemId.toString()).remove();
                const updatedUser = await user.save();
                return res.status(200).send(updatedUser.cartItems);
            }

        }
        else{
            return res.status(500).send("User not found!");
        }

    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }

}

exports.clearCart = async (req,res) => {
    const { userId } = req.body;
    try{
        const updatedUser = await User.findOneAndUpdate(
            {_id: userId},
            {$set: { cartItems: [] }},
            {new: true}
        );
        return res.status(200).send(updatedUser.cartItems);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }

}

const findUserWithExistingProduct = async (userId, productId) =>{
    const userWithExistingProduct = await User.findById(userId).populate('cartItems.product').
                                                   findOne({"cartItems.product": { _id : productId }}).exec();
    return userWithExistingProduct;
}

const findProductbyId = async (productId) => {
    const product = await Product.findById(productId).exec();
    return product;
}