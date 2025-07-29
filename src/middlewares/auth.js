const { User } = require("../api/models/userModel");
const { verifyToken } = require("../utils/jwt");


const isAuth = async (req, res, next) => {
    try {
        //Obtener el token del header
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if(!token){
            return res.status(401).json('Acceso denegado');
        }

        //Verficar el token
        const decoded = verifyToken(token);

        //Buscar el usuario en BD (por si fuera eliminado)
        const user = await User.findById(decoded.id).select('-password'); // excluye el campo password
        
        if(!user){
            return res.status(401).json('Token inválido. Usuario no existe')
        }

        req.user = user;
        next()

    } catch (error) {
        return res.status(401).json('Acceso denegado');
    }
}

module.exports = isAuth;