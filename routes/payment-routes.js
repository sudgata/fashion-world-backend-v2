const router = require('express').Router();
const paymentController = require('../controllers/payment-controller');
const { verifyToken } = require('../middleware/auth-middleware');

router.post('/new',verifyToken, paymentController.payUsingStripe);

module.exports = router;