const bcrypt = require('bcrypt');
const { generateToken } = require("../../utils/jwt");
const { User } = require("../models/userModel")

//Registro de usuario

const register = async (req, res, next) => {
    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email: req.body.email.toLowerCase() });
        if(existingUser){
            return res.status(400).json('Ya existe un usuario con ese email')
        }


        // Crear usuario en BD
        const newUser = new User(req.body);
        if(req.file){
            newUser.image = req.file.path
        }
        const userSaved = await newUser.save();
        userSaved.password = '';

        // Generar token
        const token = generateToken(userSaved._id, userSaved.role)

        return res.status(200).json({
            message: 'Usuario creado con éxito',
            token
        })

    } catch (error) {
        return res.status(400).json(`Error al registrar al usuario: ${error}`);
    }

}

//Login de usuario

const login = async (req, res, next) => {
    try {
        //Campos requeridos
        const { email, password } = req.body;

        //Verificar que exista en BD
        const user = await User.findOne({ email: email });
        if(!user){
            return res.status(400).json('Contraseña o email incorrectos')
        }

        //Validar contraseña y generar token
        if(bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user._id, user.role);
            return res.status(200).json({
                message: 'Usuario logeado con éxito',
                token
            });
            next();
        } else {
            return res.status(400).json('Contraseña o email incorrectos');
        }

    } catch (error) {
        return res.status(400).json(`Error en el login: ${error}`);
    }
}

module.exports = { register, login };