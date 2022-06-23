const router = require('express').Router();
const User = require('../models/User');
const userController = require('../controllers/UserController');
const verifyToken = require('../middlewares/verifyToken');




router.get('/users', verifyToken, userController.getAll);
router.get('/users/:id', verifyToken, userController.getUserById);
router.delete('/users/:id', userController.deleteById);
router.put('/users/:id', userController.update);







module.exports = router;



