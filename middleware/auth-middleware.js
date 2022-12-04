const admin = require('../firebase/firebase-admin');

exports.verifyToken = async (req,res,next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(401).send("No Token found !");
    }

    try{
        const decodedToken = await admin.auth().verifyIdToken(token);
        console.log(decodedToken);
        req.uid = decodedToken.uid;
        next();

    }
    catch(err){
        console.log(err)
        return res.status(401).send("Invalid token");
    }
}