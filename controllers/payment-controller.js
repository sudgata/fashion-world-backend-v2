const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.payUsingStripe = (req, res) =>{
    const stripeReqBody = {
        source: req.body.tokenId,
        amount: req.body.amount,
        description: `Payment for ${req.body.tokenId}`,
        currency: 'inr'
    }

    stripe.charges.create(stripeReqBody, (strErr, strRes)=>{
        if(strErr)
            res.status(500).send({strErr});
        else
            res.status(200).send({strRes});
    });

}