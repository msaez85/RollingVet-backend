const { request, response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');


const usuariosGet = async (req = request, res = response) => {
    const { desde, limite } = req.query;
    const query = { estado: true };
    const [usuarios, total] = await Promise.all([
        Usuario.find(query).skip(desde).limit(limite),
        Usuario.countDocuments(query)
    ])
    res.json({
        mensaje: 'soy un mensaje de la api get con controller y bcrypt'
    })
};

const usuariosPost = async (req = request, res = response) => {
    const datos = req.body;
    const { nombre, correo, password, rol } = datos;
    const usuario = new Usuario({ nombre, correo, password, rol })
    //encriptamos password
    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);
    usuario.password = hash;
    //guardar en BD
    await usuario.save()
    res.json({
        mensaje: 'usuario creado correctamente desde api post con controller y bcrypt',
    })
};

const usuariosDelete = async (req = request, res = response) => {
    const { id } = req.params;
    const usuarioAutenticado = req.usuario;
    const usuario = await Usuario.findById(id);
    if (!usuario.estado) {
        return res.json({
            msg: "el usuario ya estaba inactivo"
        })
    }
    const usuarioinactivado = await Usuario.findByIdAndUpdate(id, { estado: false }, { new: true })
    if (usuarioinactivado) {
        res.json({
            msg: 'usuario inactivado correctamente desde api delete con controller y bcrypt',
            usuarioinactivado,
            usuarioAutenticado
        })
    }
};

const usuariosUpdate = async (req = request, res = response) => {
    const { id } = req.params;
    const { password, correo, ...resto } = req.body;
    if (password) {
        const salt = bcrypt.genSaltSync(10);
        resto.password = bcrypt.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });
    if (usuario) {
        res.json({
            mensaje: 'usuario actualizado correctamente desde api put con controller y bcrypt'
        })
    }
};

module.exports = { usuariosGet, usuariosPost, usuariosDelete, usuariosUpdate };
