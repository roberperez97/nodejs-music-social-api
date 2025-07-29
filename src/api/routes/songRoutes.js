const isAuth = require('../../middlewares/auth');
const roleCheck = require('../../middlewares/rolecheck');
const { getSongs, getSong, postSong, putSong, deleteSong } = require('../controllers/songController');

const songRoutes = require('express').Router();

songRoutes.get('/songs', isAuth, getSongs);
songRoutes.get('/songs/:id', isAuth, getSong);
songRoutes.post('/songs', isAuth, roleCheck('admin'), postSong); //solo pueden crear las canciones los admin
songRoutes.put('/songs/:id', isAuth, roleCheck('admin'), putSong); // solo pueden actualizar las canciones los admin
songRoutes.delete('/songs/:id', isAuth, roleCheck('admin'), deleteSong); // solo pueden borrar las canciones los admin

module.exports = songRoutes;
