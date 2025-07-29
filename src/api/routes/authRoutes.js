const upload = require('../../middlewares/uploadImg');
const { register, login } = require('../controllers/authController');

const authRoutes = require("express").Router();


authRoutes.post('/register', upload.single('image'), register);
authRoutes.post('/login', login);

module.exports = authRoutes;
