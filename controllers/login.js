const { request, response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-JWT')

const login = async (req = request, res = response) => {
    const { correo, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ correo })
        const passwordValida = bcrypt.compareSync(password, usuario.password)
        if (!usuario || !passwordValida) {
            return res.status(400).json({
                msg: "El correo o password son incorrectos o usuario inactivo"
            })
        }
        if (!usuario.estado) {
            return res.status(400).json({
                msg: "El usuario esta inactivo"
            })
        }
        const token = await generarJWT(usuario.id);

        res.json({
            msg: "login OK",
            token,
            usuario
        })
    } catch (error) {
        return res.status(500).json({
            msg: "ponerse en contacto con el administrador",
            error
        })
    }

}

module.exports = { login }