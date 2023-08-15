const { request, response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');


const usuariosGet = async (req = request, res = response) => {
    try {
        const { desde, limite } = req.query;
        const query = { estado: true };
        const [usuarios, total] = await Promise.all([
            Usuario.find(query).skip(desde).limit(limite),
            Usuario.countDocuments(query)
        ])
        res.status(200).json({ usuarios });
    } catch (error) {
        res.status(404).json({
            msg: 'Error al cargar los usuarios',
            status: 404
        });
    }
};

const usuariosPost = async (req = request, res = response) => {
    try {
        const datos = req.body;
        const { nombre, email, password, rol } = datos;
        const usuario = new Usuario({ nombre, email, password, rol })
        //encriptamos password
        const salt = bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(password, salt);
        usuario.password = hash;
        //guardar en BD
        await usuario.save()
        res.status(200).json({
            msg: 'Usuario generado correctamente',
            status: 200
        });
    } catch (error) {
        res.status(404).json({
            msg: 'Error al generar el usuario',
            status: 404
        });
    }
};

const usuariosDelete = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findById(id);
        if (!usuario.estado) {
            return res
                .status(404)
                .json({ msg: 'El usuario ya estaba inactivo', status: 404 });
        }
        const usuarioinactivado = await Usuario.findByIdAndUpdate(id, { estado: false }, { new: true })
        if (usuarioinactivado) {
            res.status(200).json({ msg: 'Usuario borrado correctamente', status: 200 });
        }
    } catch (error) {
        res.status(400).json({ msg: 'Error al borrar el usuario', status: 400 });
    }
};

const usuariosUpdate = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { password, ...resto } = req.body;
        if (password) {
            const salt = bcrypt.genSaltSync(10);
            resto.password = bcrypt.hashSync(password, salt);
        }
        const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });
        if (usuario) {
            res.status(200).json({
                msg: 'Usuario actualizado correctamente',
                status: 200
            });
        }
    } catch (error) {
        res.status(404).json({
            msg: 'Error al actualizar el usuario',
            status: 404
        });
    }
};

module.exports = { usuariosGet, usuariosPost, usuariosDelete, usuariosUpdate };
