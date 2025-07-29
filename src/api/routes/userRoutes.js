const isAuth = require('../../middlewares/auth');
const { getUser, putUser, deleteUser, getFavoriteSongs, addFavoriteSong, deleteFavoriteSong } = require('../controllers/userController');

const userRoutes = require('express').Router();

userRoutes.get('/profile', isAuth, getUser);
userRoutes.put('/profile', isAuth, putUser);
userRoutes.delete('/profile', isAuth, deleteUser);
userRoutes.get('/favorites', isAuth, getFavoriteSongs);
userRoutes.post('/favorites/:songId', isAuth, addFavoriteSong);
userRoutes.delete('/favorites/:songId', isAuth, deleteFavoriteSong);

module.exports = userRoutes;