const router = require('express').Router();
const orderController = require('../controllers/order-controller');
const { verifyToken } = require('../middleware/auth-middleware');

router.post('/new', verifyToken, orderController.createOrder);
router.get('/:uid', verifyToken, orderController.getOrdersForUser);

module.exports = router;