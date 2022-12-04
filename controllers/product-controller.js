const ProductCategory = require('../models/product-category.model');
const Product = require('../models/product.model');

exports.AddProductCategories = async (req, res) => {
    const productCategories = req.body;
    try{
        await ProductCategory.insertMany(productCategories);
        return res.sendStatus(201);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }

}

exports.AddProducts = async (req, res) => {
    const products = req.body;
    try{
        await Product.insertMany(products);
        return res.sendStatus(201);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}

exports.getProductCategories = async (req, res) => {
    try{
        const productCategories = await ProductCategory.find();
        return res.status(200).send(productCategories.sort((a, b) => a.size.localeCompare(b.size)));
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}

exports.getProductByCategory = async (req, res) => {
    try{
        const categoryId = req.params.cid;
        const category = await ProductCategory.findById(categoryId.toString());
        const products = await Product.find( { productCategory: categoryId }).populate('productCategory').exec();
        return res.status(200).send({
            title: category.title,
            items: products
        });
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}

exports.getShopData = async (req, res) => {
    try{
        const shopResult =[]
        const productCategories = await ProductCategory.find().exec();
        const products = await Product.find().populate('productCategory').exec();
        productCategories.forEach(category=>{
            const filteredProducts = products.filter(item=> item.productCategory.id === category.id);
            const shuffledProducts = filteredProducts.sort(() => 0.5 - Math.random()).slice(0,4);
            shopResult.push({
                id: category.id,
                title: category.title,
                items: shuffledProducts
            });
        });
        return res.status(200).send(shopResult);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}