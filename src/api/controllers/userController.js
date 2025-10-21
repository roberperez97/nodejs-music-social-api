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

        // Usamos $addToSet para evitar duplicados
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $addToSet: { favoriteSongs: songId } },
            { new: true }
        );

        res.status(200).json({
            message: 'Canción añadida a favoritos correctamente',
            favoriteSongs: user.favoriteSongs
        });
    } catch (error) {
        res.status(500).json(`Error al añadir la canción a favoritos: ${error}`);
    }
}

const deleteFavoriteSong = async (req, res) => {
    try {
        const { songId } = req.params
        const user = await User.findById(req.user.id);

        // Usamos $pull para eliminar la canción de favoritos
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { $pull: { favoriteSongs: songId } },
            { new: true }
        );

        res.status(200).json({
            message: 'Canción eliminada de favoritos correctamente',
            favoriteSongs: updatedUser.favoriteSongs
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
