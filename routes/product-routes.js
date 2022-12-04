const router = require('express').Router();
const productController = require('../controllers/product-controller');
const { verifyToken } = require('../middleware/auth-middleware');


router.post('/save/category', productController.AddProductCategories);
router.post('/save/products', productController.AddProducts);
router.get('/categories', productController.getProductCategories);
router.get('/category/:cid', productController.getProductByCategory);
router.get('/shop', productController.getShopData);

module.exports = router;