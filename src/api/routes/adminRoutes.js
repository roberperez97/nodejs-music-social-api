const isAuth = require('../../middlewares/auth');
const roleCheck = require('../../middlewares/rolecheck');
const { getUsers, promoteUser, deleteUser } = require('../controllers/adminController');

const adminRoutes = require('express').Router();

adminRoutes.get('/users', isAuth, roleCheck('admin'), getUsers);
adminRoutes.put('/users/:id/promote', isAuth, roleCheck('admin'),promoteUser);
adminRoutes.delete('/users/:id', isAuth, roleCheck('admin'), deleteUser);


module.exports = adminRoutes;