const { request, response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-JWT')

const login = async (req = request, res = response) => {
    const { email, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ email })
        const passwordValida = bcrypt.compareSync(password, usuario.password)
        if (!usuario || !passwordValida || !usuario.estado) {
            return res.status(400).json({
                msg: 'El correo/password son incorrectos o el usuario esta inactivo',
                status: 400
            })
        }
        const token = await generarJWT(usuario.id);
        res.status(200).json({
            msg: "login OK",
            token,
            usuario,
            status: 200
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Ponerse en contacto con el administrador',
            status: 500
        })
    }
}

module.exports = { login }