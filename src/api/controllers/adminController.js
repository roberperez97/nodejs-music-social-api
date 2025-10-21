const deleteImgCloudinary = require("../../utils/deleteImg");
const { User } = require("../models/userModel")

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json(`Error obteniendo usuarios: ${error}`);
    }
}

const promoteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { role } = 'admin'; //Solo se permite cambiar a admin
        const updateFields = { role: role };

        const userUpdated = await User.findByIdAndUpdate(id, updateFields, { new: true })

        if(!userUpdated){
            return res.status(400).json(`Usuario no encontrado`);
        }

        return res.status(200).json(userUpdated);

    } catch (error) {
        return res.status(400).json(`Error actualizando usuario: ${error}`);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userDeleted = await User.findByIdAndDelete(id);

        deleteImgCloudinary(userDeleted.image);

        return res.status(200).json({
            message: 'Usuario eliminado',
            userDeleted
        })
    } catch (error) {
        return res.status(400).json(`Se ha producido un error al eliminar al usuario: ${error}`);
    }
}

module.exports = { getUsers, promoteUser, deleteUser }