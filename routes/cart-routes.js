const router = require('express').Router();
const cartController = require('../controllers/cart-controller');
const { verifyToken } = require('../middleware/auth-middleware');

router.post('/add',verifyToken, cartController.addItemToCart);
router.post('/remove',verifyToken, cartController.removeItemFromCart);
router.post('/clearAll',verifyToken, cartController.clearCart);

module.exports = router;