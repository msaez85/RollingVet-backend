const { request, response } = require('express');
const Usuario = require('../models/usuario')
const jwt = require('jsonwebtoken');

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header("x-token");
    if (!token) {
        return res.status(401).json({
            msg: "no hay token en la peticion"
        })
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETPRIVATEKEY)
        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            return res.status(401).json({
                msg: "Token invalido, usuario no existe"
            })
        }
        if (!usuario.estado) {
            return res.status(401).json({
                msg: "usuario ianctivo"
            })
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        res.status(401).json({
            msg: "token no valido"
        })
    }
}

module.exports = { validarJWT }