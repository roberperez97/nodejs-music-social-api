const roleCheck = (requiredRol) => {
    return (req, res, next) => {
        if(!req.user){
            return res.status(401).json('Usuario no existe');
        }

        if(requiredRol !== req.user.role) {
            return res.status(401).json('No tienes permisos para esta acción');
        }

        next();
    }
}

module.exports = roleCheck;