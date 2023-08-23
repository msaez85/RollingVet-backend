const { request, response } = require('express');

const esAdminRol = (req = request, res = response, next) => {
    if (!req.usuario) {
        res.status(500).json({
            msg: "se quiere validar el rol sin validar el token"
        })
    }
    const { rol, nombre } = req.usuario;
    if (rol !== "ADMIN") {
        return res.status(401).json({
            msg: `${nombre} no es usuario administrador`
        })
    }
    next();
}

module.exports = { esAdminRol }