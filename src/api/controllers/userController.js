const { User } = require("../models/userModel");
const { Song } = require("../models/songModel");
const deleteImgCloudinary = require("../../utils/deleteImg");

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(`Error al obtener el usuario: ${error}`);
    }
}

const putUser = async (req, res) => {
    try {
        const userUpdated = await User.findByIdAndUpdate(req.user.id, req.body, { new: true }).select('-password');
        res.status(200).json({
            message: 'Usuario actualizado correctamente',
            userUpdated
        });
    } catch (error) {
        res.status(500).json(`Error al actualizar el usuario: ${error}`);
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user.id);
        deleteImgCloudinary(user.image);
        res.status(200).json({
            message: 'Usuario eliminado correctamente',
            user
        });
    } catch (error) {
        res.status(500).json(`Error al eliminar el usuario: ${error}`);
    }
}


const getFavoriteSongs = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate({
            path: 'favoriteSongs',
            select: 'title artist album duration' // Seleccionamos los campos que queremos devolver
        });
        res.status(200).json(user.favoriteSongs);
    } catch (error) {
        res.status(500).json(`Error al obtener las canciones del usuario: ${error}`);
    }
}

const addFavoriteSong = async (req, res) => {
    try {
        // Primero verificamos que la canción existe
        const { songId } = req.params;
        const song = await Song.findById(songId);
        if (!song) {
            return res.status(404).json({
                message: 'La canción no existe'
            });
        }
        // Verificamos que el usuario no tiene ya la canción en favoritos
        const user = await User.findById(req.user.id);
        // 

        if (user.favoriteSongs.some(song => song._id.toString() === songId.toString())) {
            return res.status(400).json({
                message: 'La canción ya está en favoritos'
            });
        }
        // Añadimos la canción a favoritos
        user.favoriteSongs.push(songId);
        await user.save();
        res.status(200).json({
            message: 'Canción añadida a favoritos correctamente',
        });
    } catch (error) {
        res.status(500).json(`Error al añadir la canción a favoritos: ${error}`);
    }
}

const deleteFavoriteSong = async (req, res) => {
    try {
        const { songId } = req.params
        const user = await User.findById(req.user.id);
        // Verificamos que la canción esté en favoritos
        if (!user.favoriteSongs.includes(songId)) {
            return res.status(400).json({
                message: 'La canción no está en favoritos'
            });
        }
        // Eliminamos la canción de favoritos
        user.favoriteSongs = user.favoriteSongs.filter(_id => _id.toString() !== songId.toString()); // Creamos un nuevo array sin la canción a eliminar
        await user.save();
        res.status(200).json({
            message: 'Canción eliminada de favoritos correctamente',
        });
    } catch (error) {
        res.status(500).json(`Error al eliminar la canción de favoritos: ${error}`);
    }
}

module.exports = {
    getUser,
    putUser,
    deleteUser,
    getFavoriteSongs,
    addFavoriteSong,
    deleteFavoriteSong
}
