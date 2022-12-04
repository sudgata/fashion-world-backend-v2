const User = require('../models/user.model');

exports.addUser = async (req, res) =>{
    const {uid, displayName, email }= req.body;
    try{
        const existingUser =  await User.findById(uid).populate('cartItems.product').exec();
        if(existingUser)
            return res.status(200).send(mapUser(existingUser));
        else{
            const newUser = new User({
                _id: uid,
                displayName,
                email
            });
            const userResponse = await newUser.save();
            return res.status(200).send(mapUser(userResponse));
        }

    }
    catch(err){
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }
}

const mapUser= (userResponse) =>{
    return {
        uid: userResponse._id,
        email: userResponse.email,
        displayName: userResponse.displayName,
        cartItems: userResponse.cartItems
    }
}