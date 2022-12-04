const router = require('express').Router();
const userController = require('../controllers/user-controller');
const { verifyToken } = require('../middleware/auth-middleware');


router.post('/new',verifyToken, userController.addUser);

module.exports = router;