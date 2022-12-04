const Order = require('../models/order.model'); 
const mongoose = require('mongoose');
const { populate } = require('../models/order.model');

exports.createOrder = async (req, res)=> {
    try{
        const order = req.body;
        const orderDetails = {
            totalPrice: order.totalPrice,
            paymentId: order.paymentId,
            cardType: order.cardType,
            lastFourDigits: order.lastFourDigits,
            shippingAddress: order.shippingAddress,
            billingAddress: order.billingAddress,
            orderItems: order.orderItems,
            user: order.user
        }
        const newOrder= new Order(orderDetails);
        const orderResponse = await newOrder.save();
        return res.status(200).send(orderResponse);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}



exports.getOrdersForUser = async (req, res)=> {
    const userId = req.params.uid;
    try{
        const orders = await Order.find({user: userId})
                                  .sort({createdAt: -1})
                                  .populate('orderItems.product')
                                  .exec();

        return res.status(200).send(orders);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}